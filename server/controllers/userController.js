const userController = require('express').Router();
const { body, validationResult } = require('express-validator');
const { parseError } = require('../util/parser');

const bcrypt = require('bcrypt');
const fs = require('fs');
const path = require('path');

const userManager = require('../managers/userManager');


userController.post('/register',
    body('username').isLength({ min: 3 }).withMessage('Password must be at least 3 characters long'),
    body('email').isEmail().withMessage('Invalid email'),
    body('email').isLength({ min: 10 }).withMessage('Email must be at least 10 characters long'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    async (req, res) => {

        //console.log(req.body);

        try {
            const { errors } = validationResult(req);
            if (errors.length > 0) {
                throw errors;
            }

            const img = {
                "data": fs.readFileSync("uploads/" + req.file.filename),
                "contentType": "image/png",
            }



            const result = await userManager.register(req.body.username, req.body.email, req.body.password, img);
            res.cookie('token', result.accessToken);
            res.json(result);
        } catch (err) {
            const message = parseError(err);
            console.log(message);
            res.status(400).json({ message });
        }
    });


userController.post('/login', async (req, res) => {
    try {
        const result = await userManager.login(req.body);
        res.json(result);
    } catch (err) {
        const message = parseError(err);
        console.log(message);
        res.status(401).json({ message });
    }
});


userController.put('/update', async (req, res, next) => {
    console.log(req.body.password);
    const user = await userManager.getUserInfo(req.user.email);

    const isValid = await bcrypt.compare(req.body.password, user.password);

    if (!isValid) {
        return res.status(403).json({ message: 'Invalid password!' });
    }

    //console.log(user);
    if (!user) {
        return res.status(403).json({ message: 'Unauthorized!' });
    }

    try {
        const userData = {
            "username": req.body.username,
            "email": req.body.email,
            "img": {
                "data": fs.readFileSync("uploads/" + req.file.filename),
                "contentType": "image/png",
            },
            "_ownerId": req.user._id
        };

        const updatedUser = await userManager.update(req.user.email, userData);
        console.log('updated!');
        res.json(updatedUser);

    } catch (err) {
        const message = parseError(err);
        console.log(message);
        res.status(400).json({ message });
    }
});


userController.get('/logout', async (req, res) => {
    try {
        const token = req.token;
        await userManager.logout(token);
        res.status(204).json({ message: 'Successful logout!' });
    } catch (error) {
        const message = parseError(err);
        console.log(message);
        res.status(401).json({ message });
    }

});


userController.get('/profile', async (req, res) => {
    //console.log(req.user.email);
    try {
        if (req.user.email) {
            const user = await userManager.getUserInfo(req.user.email);
            //console.log(user);
            return res.status(200).json(user);
        }

    } catch (err) {
        const message = parseError(err);
        console.log(message);
        res.status(400).json({ message });
    }
});

module.exports = userController;
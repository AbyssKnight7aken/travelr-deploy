const fs = require('fs');
const path = require('path');
const moment = require('moment');


const logController = require('express').Router();

const logManager = require('../managers/logManager')
const { isAuth, auth } = require('../middlewares/authMiddleware')
const { parseError } = require('../util/parser');
const itemsPerPage = 6;


logController.get('/count', async (req, res) => {
    try {
        const count = await logManager.getCount();
        let pageCount = 0;
        if (count % itemsPerPage === 0) {
            pageCount = count / itemsPerPage;
        } else {
            pageCount = Math.floor(count / itemsPerPage) + 1;
        }
        res.json(pageCount);
    } catch (err) {
        const message = parseError(err);
        console.log(message);
        res.status(400).json({ message });
    }
});


logController.get('/rescent', async (req, res) => {
    const logs = await logManager.getRescent();
    res.json(logs);
});


logController.get('/search', async (req, res) => {
    try {
        const searchParam = req.query.searchParam;
        const count = await logManager.getSearchCount(searchParam);
        let pageCount = 0;
        if (count % itemsPerPage === 0) {
            pageCount = count / itemsPerPage;
        } else {
            pageCount = Math.floor(count / itemsPerPage) + 1;
        }
        res.json(pageCount);
    } catch (err) {
        const message = parseError(err);
        console.log(message);
        res.status(400).json({ message });
    }
});


logController.post('/search', async (req, res) => {
    try {
        const page = req.body.page - 1 || 0;
        const searchParam = req.body.searchParam;
        const logs = await logManager.getSearchResult(searchParam, page, itemsPerPage);
        res.json(logs);

    } catch (err) {
        const message = parseError(err);
        console.log(message);
        res.status(400).json({ message });
    }
});


logController.get('/', async (req, res) => {
    let items = [];
    const page = req.query.page - 1 || 0;

    try {
        if (req.query.where) {
            const userId = JSON.parse(req.query.where.split('=')[1]);
            items = await logManager.getByUserId(userId, page, itemsPerPage);
        } else {
            items = await logManager.getAll(page, itemsPerPage);
        }
        res.json(items);
    } catch (err) {
        const message = parseError(err);
        console.log(message);
        res.status(400).json({ message });
    }

});

//TODO: Turn on Guards and add userId...
logController.post('/', async (req, res) => {

    try {

        const data = {
            "name": req.body.name,
            //"date": moment(req.body.date).format('MMMM Do YYYY, h:mm:ss a'),
            "date": req.body.date,
            "description": req.body.description,
            "img": {
                "data": fs.readFileSync("uploads/" + req.file.filename),
                "contentType": "image/png",
            },
            "location": req.body.location,
            "_ownerId": req.user._id
        };


        const newLog = await logManager.create(data);
        console.log('Created!');
        res.json(newLog);


        //const data = Object.assign({ _ownerId: req.user._id }, req.body);
        //const data = Object.assign(req.body);
        //const item = await logManager.create(data);
        //res.json(item);
    } catch (err) {
        const message = parseError(err);
        console.log(message);
        res.status(400).json({ message });
    }
});

logController.get('/:id', async (req, res) => {
    const log = await logManager.getById(req.params.id);
    res.json(log);
});

logController.put('/:id', isAuth, async (req, res, next) => {
    const item = await logManager.getById(req.params.id);
    //console.log('req.user', req.user._id);
    //console.log('item._ownerId', item._ownerId._id.toString());
    if (req.user._id != item._ownerId._id.toString()) {
        return res.status(403).json({ message: 'You cannot modify this record' });
    }

    try {

        const data = {
            "name": req.body.name,
            //"date": moment(req.body.date).format('MMMM Do YYYY, h:mm:ss a'),
            "date": req.body.date,
            "description": req.body.description,
            "img": {
                "data": fs.readFileSync("uploads/" + req.file.filename),
                "contentType": "image/png",
            },
            "location": req.body.location,
            "_ownerId": req.user._id
        };

        const updatedLog = await logManager.update(req.params.id, data);
        console.log('updated!');
        res.json(updatedLog);

    } catch (err) {
        const message = parseError(err);
        console.log(message);
        res.status(400).json({ message });
    }
});

logController.delete('/:id', isAuth, async (req, res) => {
    const item = await logManager.getById(req.params.id);
    if (req.user._id != item._ownerId._id.toString()) {
        return res.status(403).json({ message: 'You cannot modify this record' });
    }

    try {
        await logManager.deleteById(req.params.id);
        res.status(204).end();
    } catch (err) {
        const message = parseError(err);
        console.log(message);
        res.status(400).json({ message });
    }
});


//COMMENT==================================================================
logController.post('/:id/comments', isAuth, async (req, res) => {
    const logId = req.params.id;
    const { comment } = req.body;
    const user = req.user._id;
    try {
        const result = await logManager.addComment(logId, { comment, user });
        res.json(result);
    } catch (err) {
        const message = parseError(err);
        console.log(message);
        res.status(400).json({ message });
    }
});


//LIKES==================================================================
logController.get('/:id/likes', isAuth, async (req, res) => {
    const logId = req.params.id;
    const userId = req.user._id;
    try {
        const log = await logManager.getById(logId);
        const isLiked = log.likes.map(x => x._id.toString()).includes(req.user?._id.toString());
        if (isLiked) {
            return res.status(400).json({ message: 'You have already liked this log!' });
        }

        const result = await logManager.addLike(logId, userId);
        res.json(result);
    } catch (err) {
        const message = parseError(err);
        console.log(message);
        res.status(400).json({ message });
    }
});


//DOWNLOAD==================================================================
logController.get('/:id/downloads', isAuth, async (req, res) => {
    const logId = req.params.id;
    const userId = req.user._id;
    try {
        const log = await logManager.getById(logId);
        const result = await logManager.downloadImage(logId, userId);
        res.json(result);
    } catch (err) {
        const message = parseError(err);
        console.log(message);
        res.status(400).json({ message });
    }
});


module.exports = logController;
const express = require('express');
//const path = require('path');

const cookieParser = require('cookie-parser');

const { auth } = require('../middlewares/authMiddleware');
const {useCORS} = require('../middlewares/corsMiddleware');
const { upload } = require('../middlewares/multer');

function expressConfig(app) {
    //app.use(express.static(path.resolve(__dirname, '../static')));
    app.use(useCORS);
    app.use(express.urlencoded({ extended: true }));
    app.use(express.static('uploads'));
    app.use(cookieParser());
    app.use(express.json());
    app.use(auth);
    app.use(upload.single('img'));
}

module.exports = expressConfig;
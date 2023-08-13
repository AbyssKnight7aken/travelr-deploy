const mongoose = require('mongoose');

const LogSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required!'],
        minlength: [3, 'The name must be at least 3 characters long'],
        maxLength: [20, 'The name should not be more than 20 characters long!'],
    },
    date: {
        type: Date,
        required: [true, 'Date is required!'],
    },
    description: {
        type: String,
        required: [true, 'Description is required!'],
        minlength: [10, 'Description must be at least 10 characters long'],
        maxLength: [50, 'The description should not be more than 50 characters long!'],
    },
    img: {
        data: {
            type: Buffer,
            contentType: String,
        },
    
    },
    location: {
        type: String,
        required: [true, 'Location is required!'],
        minlength: [3, 'The location must be at least 3 characters long'],
        maxLength: [30, 'The location should not be more than 30 characters long!'],
    },
    _ownerId: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    },
    commentList: [{
        user: {
            type: mongoose.Types.ObjectId,
            required: [true, 'Name is required'],
            ref: 'User'
        },
        comment: {
            type: String,
            required: [true, 'Comment message is required']
        }
    }],
    likes: [{
        user: {
            type: mongoose.Types.ObjectId,
            ref: 'User'
        }
    }],
    downloads: [{
        user: {
            type: mongoose.Types.ObjectId,
            ref: 'User'
        }
    }]
});

const Log = mongoose.model('Log', LogSchema);

module.exports = Log;
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username is required!'],
        minLength: [3, 'The username should be at least 3 characters long!'],
    },
    email: {
        type: String,
        required: [true, 'Email is required!'],
        minLength: [10, 'The email should be at least 10 characters long!'],
    },
    password: {
        type: String,
        select: false,
        required: [true, 'Password is required!'],
        minLength: [6, 'The password should be at least 6 characters long!'],
    },
    img: {
        data: {
            type: Buffer,
            contentType: String,
        },
    },
});

userSchema.index({ email: 1 }, {
    collation: {
        locale: 'en',
        strength: 2
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
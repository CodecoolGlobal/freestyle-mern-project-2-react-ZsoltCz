const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const userSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    favorites: {type: [String],
        default: []
    }
});

const User = model('User', userSchema);

module.exports = User;
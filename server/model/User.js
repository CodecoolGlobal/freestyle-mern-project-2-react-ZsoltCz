const mongoose = require('mongoose');
const { Schema, model } = mongoose;
const bcrypt = require('bcrypt');
const saltRounds = 5;

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

userSchema.pre('save', function (next) {

    if (!this.isModified('password')) {
        return next();
    }
    const user = this;
    bcrypt.hash(this.password, saltRounds, function(err, hash) {
        if (err) {
            console.log(this)
            return next(err);
        }
        user.password = hash;
        next();
    });
});

const User = model('User', userSchema);

module.exports = User;
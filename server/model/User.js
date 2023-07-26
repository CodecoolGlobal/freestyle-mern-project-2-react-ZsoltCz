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
        required: true,
        validate: {
            validator: function(value) {
                const errorArray = [];
                if (value.length < 8) {
                    errorArray.push('Password must be at least 8 characters long');
                }
                if (!/[a-zA-Z]/.test(value)) {
                    errorArray.push("Password must contain at least 1 letter");
                }
                if (!/[0-9]/.test(value)) {
                    errorArray.push('Password must contain at least 1 number');
                }
                if (errorArray.length > 0) {
                    throw new Error(errorArray.join("\n"));
                }
            },
            message: function(props) {
                return props.reason.message;
            }
        }
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
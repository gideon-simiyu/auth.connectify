const mongoose = require('mongoose');

const UserModel = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
        unique: false,
    },
    password: {
        type: String,
        required: true,
    },
}, {timestamps: true} );

module.exports = mongoose.model("users", UserModel)
const mongoose = require('mongoose');

const TokenModel = mongoose.Schema({
    token: {
        type: String,
        required: true
    },
}, {timestamps: true} );

module.exports = mongoose.model("tokens", TokenModel)
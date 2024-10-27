require('dotenv').config();

const jwt = require('jsonwebtoken');
const {response} = require("express");
const res = require("express/lib/response");

class JWTService {

    generateAccessToken(user){
        return  jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn: "15m"});
    }

    generateRefreshToken(user){
        return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn: "14d"});
    }

    async refreshToken(token) {
        await jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
            if (err) return null;
            return this.generateAccessToken(user);
        });

        return null;
    }
}

module.exports = JWTService;
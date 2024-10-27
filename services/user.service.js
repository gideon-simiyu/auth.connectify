const mongoose = require('mongoose');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const userModel = require('../models/user.model');
const TokenModel = require('../models/token.model');
const JWTService = require('./jwt.service');

const jwtService = new JWTService();

class UserService {
    async login(username, password) {
        const response = {
            response: {
                success: false,
                message: null,
            },
            status: 401,
        };

        try {
            const user = await userModel.findOne({username: username});

            if (!user) {
                response.response.message = "Invalid login credentials";
                response.status = 401;
                return response;
            }

            const passwordMatches = await bcrypt.compare(password, user.password);

            if(!passwordMatches) {
                response.response.message = "Invalid login credentials";
                response.status = 401;
                return response;
            }


            const userData = {
                id: user._id,
                username: user.username,
                email: user.email,
                name: user.name
            };


            response.status = 200;
            response.response.access_token = jwtService.generateAccessToken(userData);
            response.response.refresh_token = jwtService.generateRefreshToken(userData);

            response.response.success = true;
            response.response.message = "User was logged in successfully";
            return response;

        } catch (e) {
            console.log(e.message)
            response.response.message = "An error occurred try again later";
            response.status = 500;
            return response;
        }
    }

    async register(name, email, username, password) {
        const response = {
            response: {
                success: false,
                message: null,
            }
        }

        try{
            const userUsername = await userModel.findOne({username: username});
            if (userUsername) {
                response.response.message = "User with this username already exists";
                response.status = 401;
                return response;
            }

            const userEmail = await userModel.findOne({email: email});
            if (userEmail) {
                response.response.message = "User with this email already exists";
                response.status = 401;
                return response;
            }

            const passwordHash = await bcrypt.hash(password, 12);

            await userModel.create({name: name, username: username, email: email, password: passwordHash});
            response.response.success = true;
            response.status = 200;
            response.message = "User registered successfully";
            return response;
        } catch (e) {
            console.log(e);
            response.status = 500;
            response.response.message = "An error occurred! Try again later."
            return response;
        }
    }

    async refreshToken(token){
        const response = {
            response: {
                success: false,
            }
        };

        if(!token){
            response.response.message = "Refresh token not found";
            response.status = 401;
            return response;
        }

        const refreshToken = await TokenModel.findOne({token: token});

        if(!refreshToken) {
            response.response.message = "Refresh token not valid";
            response.status = 401;
        }

        const access_token = await jwtService.refreshToken(token);
        if(!token){
            response.status = 403;
            response.message = "Refresh token has expired.";
            return response;
        }

        response.response.access_token = access_token;
        return response;
    }
}

module.exports = UserService;
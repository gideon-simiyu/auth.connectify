const express = require('express');

const mongoose = require('mongoose');
const {route} = require("express/lib/application");
require("dotenv").config();

const UserController = require("./controllers/user.controller");
const userController = new UserController();

const api = express();
api.use(express.json());


const databaseMiddleware = require('./middlewares/database.middleware');

api.use(databaseMiddleware);

const router = express.Router();

router.post("/login", (req, res) => {
    return userController.login(req, res);
});

router.post("/register", (req, res) => {
    return userController.register(req, res);
});

router.post("/refresh-token", (req, res) => {
    return userController.refreshToken(req, res);
})

api.use("/api/", router);

const port = process.env.PORT || 5000;


api.listen(port, () => console.log(`Server started on port ${port}`));

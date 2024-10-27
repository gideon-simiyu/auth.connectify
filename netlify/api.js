import serverless from "serverless-http";
const express = require('express');

const mongoose = require('mongoose');
const {route} = require("express/lib/application");
require("dotenv").config();

const UserController = require("../controllers/user.controller");
const userController = new UserController();

const api = express();
api.use(express.json());
const connectionString = process.env.DATABASE_URL;

const router = express.Router();

router.get("/hello", async (req, res) => {
    res.send("Hello World!");
});

router.post("/login", async (req, res) => {
    return userController.login(req, res);
});

router.post("/register", async (req, res) => {
    return userController.register(req, res);
});

api.use("/api/", router);

export const handler = serverless(api);

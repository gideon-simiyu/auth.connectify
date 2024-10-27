const UserService = require('../services/user.service');
const userService = new UserService();
const { validateEmail } = require("../utils/validators")

class UserController{
    async login(req, res) {
        const {username, password} = req.body;

        if (!username || !password) {
            return res.status(400).send({error: "Username or password is required"});
        }

        const response = await userService.login(username, password);

        return res.status(response.status).send(response.response);
    }

    async register(req, res) {
        const {name, username, email, password} = req.body;

        if(!name || !email || !password || !name.trim() || !password) {
            return res.status(400).send({error: "Please fill out all required fields."});
        }

        if(!validateEmail(email)) {
            return res.status(400).send({error: "Please enter a valid email address"});
        }

        if(password.length < 6) {
            return res.status(400).send({error: "Password must be at least 6 characters"});
        }

        const response = await userService.register(name, email, username, password);

        return res.status(response.status).send(response.response);
    }

    async refreshToken(req, res) {
        const { token } = req.body;
        if (!token) {
            res.sendStatus(401).send({error: "Token is required"});
        }

        const response = await userService.refreshToken(token);
        return res.status(response.status).send(response.response);
    }
}

module.exports = UserController;
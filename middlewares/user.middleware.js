const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.replace("Bearer ", "");

        if(!token) {
            return res.sendStatus(401);
        }

        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
            if (err) return res.sendStatus(403);

            req.user = user;
            next();
        });
    } catch (err) {
        return res.sendStatus(401);
    }
};
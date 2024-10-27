const connectToDatabase = require('../utils/db'); // MongoDB connection utility

const dbMiddleware = async (req, res, next) => {
    try {
        await connectToDatabase(); // Ensure the connection is established
        next(); // Proceed to the next middleware or route handler
    } catch (err) {
        console.error('Failed to connect to database:', err);
        res.status(500).send('Internal Server Error: Could not connect to database');
    }
};

module.exports = dbMiddleware;
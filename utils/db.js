// db.js (MongoDB connection utility)
const mongoose = require('mongoose');

let isConnected = false; // Track the connection status

const connectToDatabase = async () => {
    if (isConnected) {
        return;
    }

    try {
        await mongoose.connect(process.env.DATABASE_URL);
        isConnected = true;
    } catch (err) {
        throw err;
    }
};

module.exports = connectToDatabase;

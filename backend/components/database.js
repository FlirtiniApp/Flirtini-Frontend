const mongoose = require('mongoose');
const dotenv = require('dotenv').config();

function connectDB() {
    return mongoose.connect(`mongodb+srv://${process.env.MONGO_LOGIN}:${process.env.MONGO_PASSWORD}@flirtini.5tabe6e.mongodb.net/Flirtini?retryWrites=true&w=majority&appName=Flirtini`);
}

// User creation route handler
const User = require('../models/user.model');

async function createUserHandler(req, res) {
    try {
        const user = await User.create(req.body);
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    connectDB,
    createUserHandler
};


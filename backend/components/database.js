const mongoose = require('mongoose');
const dotenv = require('dotenv').config();

// Importing the User model
const User = require('../models/user.model');

// Function to connect to the database
function connectToDatabase() {
    return mongoose.connect(`mongodb+srv://${process.env.MONGO_LOGIN}:${process.env.MONGO_PASSWORD}@flirtini.5tabe6e.mongodb.net/Flirtini?retryWrites=true&w=majority&appName=Flirtini`);
}

// Handler for creating a user
async function createUserHandler(req, res) {
    try {
        const user = await User.create(req.body);
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Handler for getting all users
async function getUserHandler(req, res) {
    try {
        const users = await User.find({});
        res.status(200).json(users);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Exporting the functions
module.exports = {
    connectToDatabase,
    createUserHandler,
    getUserHandler,
};


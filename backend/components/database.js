const mongoose = require('mongoose');
const dotenv = require('dotenv').config();

function connectDB() {
    return mongoose.connect(`mongodb+srv://${process.env.MONGO_LOGIN}:${process.env.MONGO_PASSWORD}@flirtini.5tabe6e.mongodb.net/Flirtini?retryWrites=true&w=majority&appName=Flirtini`);
}

module.exports = connectDB;
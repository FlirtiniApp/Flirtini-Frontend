require('dotenv').config();
const express = require('express');
const app = express();
const port = 3000;
const mongoose = require('mongoose');

app.get('/', (req, res) => {
    res.send('Hello World!');
});

//Connect to databes before connecting to backend

mongoose.connect(`mongodb+srv://${process.env.MONGO_LOGIN}:${process.env.MONGO_PASSWORD}@flirtini.5tabe6e.mongodb.net/Flirtini?retryWrites=true&w=majority&appName=Flirtini`)
.then(() => {
    console.log("connected to db");
    app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
})
.catch((err) => {
    console.log("something done goofed");
    console.log(err);
});

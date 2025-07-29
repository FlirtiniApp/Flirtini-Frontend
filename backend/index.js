const dotenv = require('dotenv').config();
const express = require('express');
const app = express();
const port = 3000;
const mongoose = require('mongoose');

app.use(express.json());

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


app.post('/api/users', (req, res) => {
    console.log(req.body);
    res.send(req.body);
});


//EXAMPLE USER DATA
const users = [
    { id: 1, username: 'alice', password: 'pass1' },
    { id: 2, username: 'bob', password: 'pass2' }
];

//ROUTER FOR ALCOHOL
const alcoholRouter = express.Router();
app.use('/alcohol', alcoholRouter);

alcoholRouter.get('/random', (req, res) => {
    res.send("RANDOM");
});

alcoholRouter.get('/daily', (req, res) => {
    res.send("DAILY");
});

//ROUTER FOR ACCOUNT
const accountRouter = express.Router();
app.use('/account', accountRouter);

//LOGIN CHECK
accountRouter.post('/login', (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
        res.send("LOGIN SUCCESS");
    } else {
        res.status(401).send("INVALID CREDENTIALS");
    }
});

accountRouter.post('/logout', (req, res) => {
    res.send("LOGOUT SUCCESS");
});

//REGISTER NEW USER
accountRouter.post('/register', (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).send("Username and password required");
    }
    if (users.find(u => u.username === username)) {
        return res.status(409).send("Username already exists");
    }
    const newUser = { id: users.length + 1, username, password };
    users.push(newUser);
    res.status(201).send("REGISTER SUCCESS");
});

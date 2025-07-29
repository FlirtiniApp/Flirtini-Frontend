const express = require('express');
const app = express();
const port = 3000;
const database = require('./components/database');

app.use(express.json());

// Connect to the database and start the server
database.connectDB()
    .then(() => {
        console.log("connected to database");
        app.listen(port, () => {
            console.log(`App listening on port ${port}`);
        });
    })
    .catch((err) => {
        console.log("something done goofed");
        console.log(err);
    });

//user creation route
app.post('/users/create', database.createUserHandler);


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

const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.send('Hello World!');
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
})

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

accountRouter.post('/login', (req, res) => {
    res.send("LOGIN");
});

accountRouter.post('/logout', (req, res) => {
    res.send("LOGOUT");
});

accountRouter.post('/register', (req, res) => {
    res.send("REGISTER");
});

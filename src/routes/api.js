const express = require('express');
const app = express();

const homeRouter = require('./home');
const postRouter = require('./post');
const authRouter = require('./auth');


app.use(homeRouter);
app.use(postRouter);
app.use(authRouter);


module.exports = app;
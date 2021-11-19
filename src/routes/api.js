const express = require('express');
const app = express();

const homeRouter = require('./home');
const dashboardRouter = require('./dashboard');
const postRouter = require('./post');
const authRouter = require('./auth');


app.use(homeRouter);
app.use(dashboardRouter);
app.use(postRouter);
app.use(authRouter);


module.exports = app;
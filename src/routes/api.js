const express = require('express');
const app = express();

const homeRouter = require('./home_router');
const dashboardRouter = require('./dashboard_router');
const postRouter = require('./post_router');
const commentRouter = require('./comment_router');
const authRouter = require('./auth_router');


app.use(homeRouter);
app.use(dashboardRouter);
app.use(postRouter);
app.use(commentRouter);
app.use(authRouter);


module.exports = app;
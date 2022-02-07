const express = require('express');
const app = express();

const postRouter = require('./post_router');
const tagRouter = require('./tag_router');
const commentRouter = require('./comment_router');
const loginRouter = require('./login_router');
const userRouter = require('./user_router');


app.use(tagRouter);
app.use(postRouter);
app.use(commentRouter);
app.use(loginRouter);
app.use(userRouter);


module.exports = app;
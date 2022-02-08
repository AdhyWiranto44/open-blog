import express from 'express';
const app = express();

import postRouter from './post_router';
import tagRouter from './tag_router';
import commentRouter from './comment_router';
import loginRouter from './login_router';
import userRouter from './user_router';


app.use(tagRouter);
app.use(postRouter);
app.use(commentRouter);
app.use(loginRouter);
app.use(userRouter);


export default app;
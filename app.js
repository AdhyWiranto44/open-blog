require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const User = require('./models/user.js');
const db_connect = require('./database/db_connect');
const PORT = 4000;

const apiRouter = require('./routes/api');

const app = express();

// Cookie and Session
const session = require('express-session');
const passport = require('passport');

app.use(express.urlencoded({extended:true}));
app.use(express.static("public"));
app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

app.set("view engine", "ejs");

// connection database
db_connect();

mongoose.set("useCreateIndex", true);

passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(apiRouter);

app.get("/documentation", (req, res) => {
    res.sendFile(__dirname + "/documentation/index.html");
});

app.listen(process.env.PORT || PORT, () => {
    console.log(`http://localhost:${PORT}`);
});
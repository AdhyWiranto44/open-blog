require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const User = require('./src/models/user.js');
const dbConnect = require('./src/database/db_connect');
const PORT = 4000;

const apiRouter = require('./src/routes/api');

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
app.use(express.json());
app.use(cors());

app.set("view engine", "ejs");

// connection database
dbConnect();

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
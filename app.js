require('dotenv').config();
const express = require('express');
const cors = require('cors');
const session = require('express-session');
const dbConnect = require('./src/database/db_connect');
const PORT = 4000;
const apiRouter = require('./src/routes/api');
const app = express();


app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));
app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false
}));
app.use(cors());
app.use(apiRouter);
app.set("view engine", "ejs");

// connection database
dbConnect();

app.get("/documentation", (req, res) => {
    res.sendFile(__dirname + "/documentation/index.html");
});


app.listen(process.env.PORT || PORT, () => {
    console.log(`http://localhost:${PORT}`);
});
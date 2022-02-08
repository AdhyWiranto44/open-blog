require('dotenv').config();
import express from 'express';
import cors from 'cors';
import session from 'express-session';
import dbConnect from './src/database/db_connect';
const PORT = 4000;
import apiRouter from './src/routes/api';
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
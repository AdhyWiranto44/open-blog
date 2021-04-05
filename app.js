const express = require('express');

const app = express();

app.use(express.static("public"));

app.set("view engine", "ejs");

app.get("/", (req, res) => {
    res.render("frontend");
})

app.get("/documentation", (req, res) => {
    res.sendFile(__dirname + "/documentation/index.html");
})

app.get("/post/post-title", (req, res) => {
    res.render("post-page");
})

app.listen(3000, () => {
    console.log("http://localhost:3000");
})
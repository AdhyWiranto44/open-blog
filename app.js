const express = require('express');

const app = express();

app.use(express.static("public"));

app.set("view engine", "ejs");

app.get("/", (req, res) => {
    res.render("frontend", {title: "Open Blog", tag: ""});
})

app.get("/documentation", (req, res) => {
    res.sendFile(__dirname + "/documentation/index.html");
})

app.get("/post/post-title", (req, res) => {
    res.render("post-page", {title: "Open Blog: Post"});
})

app.get("/tag/post-tag", (req, res) => {
    res.render("frontend", {title: "Open Blog: Post Tag", tag: "nodejs"});
})

app.get("/auth/login", (req, res) => {
    res.render("login", {title: "Open Blog: Login"})
})

app.get("/auth/register", (req, res) => {
    res.render("register", {title:"Open Blog: Register"})
})

app.get("/auth/reset-password", (req, res) => {
    res.render("reset-password", {title: "Open Blog: Reset Password"})
})

app.listen(3000, () => {
    console.log("http://localhost:3000");
})
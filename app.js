const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const { encrypt, decrypt } = require('./crypto.js');

const app = express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

app.set("view engine", "ejs");

mongoose.connect("mongodb://localhost:27017/openblogDB", {useNewUrlParser: true, useUnifiedTopology: true});

// DB Schema
const userSchema = {
    username: String,
    password: {
        iv: String,
        content: String
    },
    created_at: Number,
    updated_at: Number
}

const postSchema = {
    title: String,
    slug: String,
    content: String,
    img: String,
    tag: [String],
    author: String,
    created_at: Number,
    updated_at: Number
}

// // DB Model
const User = mongoose.model("User", userSchema);
const Post = mongoose.model("Post", postSchema);

const arrDay = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jum'at", "Sabtu"];
const arrMonth = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];

const post1 = new Post({
    title: "Post 1",
    slug: "post-1",
    content: "Vehicula ipsum a arcu cursus vitae congue mauris rhoncus aenean. Venenatis lectus magna fringilla urna porttitor rhoncus dolor purus non. Scelerisque eleifend donec pretium vulputate sapien nec sagittis aliquam. Nullam vehicula ipsum a arcu cursus vitae congue mauris. Cum sociis natoque penatibus et magnis dis. Nunc consequat interdum varius sit amet. Quisque egestas diam in arcu cursus euismod. Scelerisque felis imperdiet proin fermentum leo. Netus et malesuada fames ac turpis egestas integer eget. Vel fringilla est ullamcorper eget nulla facilisi etiam dignissim. Id interdum velit laoreet id donec ultrices tincidunt.",
    img: "post-img.jpg",
    tag: ["nodejs", "express", "bootstrap", "todayilearn"],
    author: "Admin",
    created_at: new Date().getTime(),
    updated_at: new Date().getTime()
})

const post2 = new Post({
    title: "Post 2",
    slug: "post-2",
    content: "Orci nulla pellentesque dignissim enim sit amet venenatis. Nec tincidunt praesent semper feugiat nibh sed. Nisi porta lorem mollis aliquam ut porttitor leo a. At augue eget arcu dictum varius duis at consectetur lorem. Nibh mauris cursus mattis molestie a iaculis at erat. Ut consequat semper viverra nam libero. Semper quis lectus nulla at volutpat. Rhoncus urna neque viverra justo nec ultrices dui sapien. Gravida rutrum quisque non tellus orci ac auctor augue. Felis imperdiet proin fermentum leo vel orci. Id semper risus in hendrerit gravida rutrum. Lorem donec massa sapien faucibus et molestie ac feugiat.",
    img: "",
    tag: ["blog", "react"],
    author: "Admin",
    created_at: new Date().getTime(),
    updated_at: new Date().getTime()
})

const default_user = new User({
    id: 1,
    username: "admin",
    password: encrypt("1234"),
    created_at: new Date().getTime(),
    updated_at: new Date().getTime()
})

// // Add default user
// default_user.save();

app.get("/", (req, res) => {
    Post.find((err, foundPosts) => {
        if (foundPosts.length === 0) {
            Post.insertMany([post1, post2], function(err){
                if(err) {
                    console.log(err);
                } else {
                    console.log("Data added successfully");
                }
            });

            res.redirect("/");
        } else {
            res.render("frontend", {title: "Open Blog", tag: "", posts: foundPosts, arrDay, arrMonth, search: ""});
        }
    });
})

app.post("/", (req, res) => {
    const search = req.body.search;
    
    Post.find({title: search}, (err, foundPosts) => { // MASIH SALAH PENCARIANNYA

        if (err) {
            console.log(err);
        } else {
            res.render("frontend", {title: "Search: " + search, tag: "", posts: foundPosts, arrDay, arrMonth, search});
        }
    })
})

app.get("/documentation", (req, res) => {
    res.sendFile(__dirname + "/documentation/index.html");
})

app.get("/post/:postSlug", (req, res) => {
    const postSlug = req.params.postSlug;

    Post.findOne({slug: postSlug}, (err, foundPost) => {
        if (err) {
            console.log(err);
        } else {
            res.render("post-page", {title: foundPost.title, post: foundPost, arrDay, arrMonth, search: ""});
        }
    })
})

app.get("/tag/:postTag", (req, res) => {
    const postTag = req.params.postTag;

    Post.find({tag: postTag}, (err, foundPosts) => {
        if (err) {
            console.log(err);
        } else {
            res.render("frontend", {title: postTag, tag: postTag, posts: foundPosts, arrDay, arrMonth, search: ""});
        }
    })
})

app.get("/auth/login", (req, res) => {
    res.render("login", {title: "Login"})
})

app.post("/auth/login", (req, res) => {
    const findUsername = req.body.username;
    const findPassword = req.body.password;
    
    User.findOne({username: findUsername}, (err, foundUser) => {
        if (err) {
            console.log(err);
        } else {
            if (foundUser === null) {
                res.redirect("/auth/login");
            } else {
                const decryptedPassword = decrypt(foundUser.password);
                if (decryptedPassword === findPassword) {
                    res.redirect("/admin/dashboard");
                } else {
                    res.redirect("/auth/login");
                }

            }
        }
    })
})

app.get("/auth/register", (req, res) => {
    res.render("register", {title:"Register"});
})

app.post("/auth/register", (req, res) => {
    const regUsername = req.body.username;
    const regPassword = req.body.password;
    const regConfirm_password = req.body.confirm_password;

    User.findOne({username: regUsername}, (err, foundUser) => {
        if (err) {
            console.log(err);
        } else {
            if (foundUser === null) { // jika belum ada user yang terdaftar
                if (regPassword === regConfirm_password) { // jika password cocok dengan confirm_password
                    const newUser = new User({
                        username: regUsername,
                        password: encrypt(regPassword),
                        created_at: new Date().getTime(),
                        updated_at: new Date().getTime()
                    })

                    newUser.save();
                    res.send("user berhasil terdaftar :)");
                } else {
                    console.log("password tidak cocok dengan confirm_password!");
                    res.redirect("/auth/register");
                }
            } else {
                console.log("sudah pernah ada user yang mendaftar dengan username tersebut!");
                res.redirect("/auth/register");
            }
        }
    })
})

app.get("/auth/reset-password", (req, res) => {
    res.render("reset-password", {title: "Reset Password"});
})

app.get("/admin/dashboard", (req, res) => {
    res.render("dashboard", {title: "Dashboard"});
})

app.get("/admin/tambah-post-baru", (req, res) => {
    res.render("tambah-post-baru", {title: "Tambah Post Baru"});
})

app.get("/admin/tampil-semua-post", (req, res) => {
    Post.find((err, foundPosts) => {
        if (foundPosts.length === 0) {
            Post.insertMany([post1, post2], function(err){
                if(err) {
                    console.log(err);
                } else {
                    console.log("Data added successfully");
                }
            });

            res.redirect("/admin/tampil-semua-post");
        } else {
            res.render("tampil-semua-post", {title: "Tampil Semua Post", posts: foundPosts, arrDay, arrMonth});
        }
    });
})


app.listen(3000, () => {
    console.log("http://localhost:3000");
})

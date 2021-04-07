const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

app.set("view engine", "ejs");

mongoose.connect("mongodb://localhost:27017/openblogDB", {useNewUrlParser: true, useUnifiedTopology: true});

// DB Schema
const userSchema = {
    username: String,
    password: String,
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

// const user1 = new User({
//     id: 1,
//     username: "admin",
//     password: "123",
//     created_at: new Date().getTime(),
//     updated_at: 0
// })

// // Add sample user data
// user1.save({user1});

// console.log(User.findOne({id: 1}));

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
            res.render("frontend", {title: "Open Blog", tag: "", posts: foundPosts, arrDay, arrMonth});
        }
    });
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



app.listen(4000, () => {
    console.log("http://localhost:4000");
})
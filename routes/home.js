const express = require('express');
const app = express();
const Post = require('../models/post');
const defaultPosts = require('../helpers/default_posts');
const {arrDay, arrMonth} = require('../helpers/dates');
const ACTIVE = 1
const LATEST = -1


app.get("/", (req, res) => {
    // mencari post aktif
    Post.find({active: ACTIVE}).sort({created_at: LATEST}).exec()
    .then(foundPosts => {
        // jika tidak ada data post
        if (foundPosts.length < 1) { 
            // tambahkan data default
            insertDefaultPosts(defaultPosts);
            res.redirect("/");
        } else {
            // mencari semua tag post yang aktif
            let allTags = [];
            foundPosts.forEach(post => {
                post.tags.forEach(tag => {
                    allTags.push(tag);
                });
            });
            allTags = filterActiveTags(allTags);
            
            res.render("frontend", {title: "Halaman Utama", tag: "", posts: foundPosts, arrDay, arrMonth, search: "", isAuthLink: req.isAuthenticated(), tags: allTags});
        }
    })
    .catch(err => {
        console.log(err);
    });
});

app.post("/", (req, res) => {
    const search = req.body.search;
    
    if (search === "") {
        res.redirect("/");
    } else {
        Post.find({title: {$regex: ".*"+search+".*", $options: 'i'}, active: ACTIVE}).sort({created_at: LATEST}).exec()
        .then(foundPosts => {
            // Push tag di setiap post ke array
            let allTags = [];
            foundPosts.forEach(post => {
                post.tags.forEach(tag => {
                    allTags.push(tag);
                });
            });
            allTags = filterActiveTags(allTags);

            res.render("frontend", {title: "Search: " + search, tag: "", posts: foundPosts, arrDay, arrMonth, search, isAuthLink: req.isAuthenticated(), tags: allTags});
        })
        .catch(err => {
            console.log(err);
        });
    }
});

app.get("/admin/dashboard", (req, res) => {
    if (req.isAuthenticated()) {
        let jmlPost = 0;
        let postAktif = 0;
        let postArsip = 0;
    
        Post.find((err, foundPosts) => {
            if (err) {
                console.log(err);
            } else {
                jmlPost = foundPosts.length;
                foundPosts.forEach(post => {
                    if (post.active === 1) {
                        postAktif++;
                    } else {
                        postArsip++;
                    }
                })
                res.render("dashboard", {title: "Dashboard", jmlPost, postAktif, postArsip});
            }
        })
    } else {
        res.redirect('/auth/login');
    }
});

const insertDefaultPosts = (data) => {
    Post.insertMany(data).then(() => {
        console.log("Data added successfully");
    }).catch(err => {
        console.log(err);
    });
}

const filterActiveTags = (data) => {
    return data.filter(function(value, index, self) {
        return self.indexOf(value) === index;
    });
}


module.exports = app;
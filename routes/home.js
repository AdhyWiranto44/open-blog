const express = require('express');
const app = express();
const Post = require('../models/post');
const defaultPost = require('../helpers/default_post');
const {arrDay, arrMonth} = require('../helpers/dates');


app.get("/", (req, res) => {
    // mencari post aktif
    Post.find({active: 1}).exec() 
    .then(foundPosts => {
        // jika tidak ada data post
        if (foundPosts.length < 1) { 
            // tambahkan data default
            Post.insertMany(defaultPost) 

            .then(() => {
                console.log("Data added successfully");
                res.redirect("/");
            })

            .catch(err => {
                console.log(err);
            });
        } else {
            // mencari semua tag post yang aktif
            Post.find({active: 1}).sort({created_at: -1}).exec()
            .then(foundForTags => {
                // Push tag di setiap post ke array
                let allTags = [];
                foundForTags.forEach(post => {
                    post.tags.forEach(tag => {
                    allTags.push(tag);
                    })
                });
                
                // Lalu hilangkan duplikat
                allTags = allTags.filter(function(value, index, self) {
                    return self.indexOf(value) === index;
                });

                res.render("frontend", {title: "Halaman Utama", tag: "", posts: foundPosts, arrDay, arrMonth, search: "", isAuthLink: req.isAuthenticated(), tags: allTags});
            })
            .catch(err => {
                console.log(err);
            });
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
        Post.find({title: {$regex: ".*"+search+".*", $options: 'i'}, active: 1}).exec()
        .then(foundPosts => {
            Post.find({active: 1}).sort({created_at: -1}).exec()
            .then(foundForTags => {
                // Push tag di setiap post ke array
                let allTags = [];
                foundForTags.forEach(post => {
                    post.tags.forEach(tag => {
                    allTags.push(tag);
                    })
                });
                
                // Lalu hilangkan duplikat
                allTags = allTags.filter(function(value, index, self) {
                    return self.indexOf(value) === index;
                });

                res.render("frontend", {title: "Search: " + search, tag: "", posts: foundPosts, arrDay, arrMonth, search, isAuthLink: req.isAuthenticated(), tags: allTags});
            })
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

module.exports = app;
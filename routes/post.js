const express = require('express');
const app = express();
const Post = require('../models/post');
const Comment = require('../models/comment');
const multer = require('multer'); // Upload image
const {arrDay, arrMonth} = require('../helpers/dates');
const showAlert = require('../helpers/alert.js');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '../public/img/post')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
  })
const upload = multer({dest: '../public/img/post', storage})


app.get("/post/:postSlug", (req, res) => {
    const postSlug = req.params.postSlug;
    let post = null;
    let posts = null;

    Post.findOne({slug: postSlug}).exec()

    .then((foundPost) => {
        post = foundPost;
        return Post.find({active: 1}).limit(5).sort({created_at: -1}).exec();
    })

    .then((foundPosts) => {
        posts = foundPosts;
        return Comment.find({postSlug: postSlug}).sort({created_at: -1}).exec();
    })

    .then(foundComments => {
        res.render("post-page", {title: post.title, tag: "", otherPosts: posts, currentPost: post, comments: foundComments, arrDay, arrMonth, search: "", isAuthLink: req.isAuthenticated()});
    })

    .catch(err => {
        console.log(err);
    });
});

app.post("/post/menambah-komentar/:currentPostSlug", (req, res) => {
    const currentPostSlug = req.params.currentPostSlug;

    const newComment = new Comment({
        name: req.body.name,
        body: req.body.comment,
        postSlug: currentPostSlug,
        hidden : 0,
        created_at: new Date().getTime(),
        updated_at: new Date().getTime()
    });

    newComment.save()

    .then(() => {
        res.redirect("/post/" + currentPostSlug);
    })

    .catch(err => {
        console.log(err);
    });
});

app.post("/post/menghapus-komentar/:currentPostSlug", (req, res) => {
    const currentPostSlug = req.params.currentPostSlug;

    Comment.findOneAndUpdate(
        {body: req.body.deleteComment, postSlug: currentPostSlug}, 
        {hidden: 1}).exec()

    .then(() => {
        res.redirect("/post/" + currentPostSlug);
    })

    .catch(err => {
        console.log(err);
    });
});

app.post("/post/menghapus-permanen-komentar/:currentPostSlug", (req, res) => {
    Comment.findByIdAndRemove({_id: req.body.permanentDeleteComment}).exec()

    .then(() => {
        res.redirect("/post/" + req.params.currentPostSlug);
    })

    .catch(err => {
        console.log(err);
    });
});

app.post("/post/mengaktifkan-komentar/:currentPostSlug", (req, res) => {
    const currentPostSlug = req.params.currentPostSlug;

    Comment.findOneAndUpdate(
        {hidden: 1, postSlug: currentPostSlug}, 
        {hidden: 0}).exec()

    .then(() => {
        res.redirect("/post/" + currentPostSlug);
    })

    .catch(err => {
        console.log(err);
    });
});

app.get("/tag/:postTag", (req, res) => {
    const postTag = req.params.postTag;

    Post.find({tags: postTag}, (err, foundPosts) => {
        if (err) {
            console.log(err);
        } else {
            Post.find({active: 1}, (err, foundForTags) => {
                if (err) {
                    console.log(err);
                } else {
                    // Push tag di setiap post ke array,
                    // Lalu hilangkan duplikat
                    let allTags = [];
                    foundForTags.forEach(post => {
                        post.tags.forEach(tag => {
                        allTags.push(tag);
                        })
                    })
                    
                    allTags = allTags.filter(function(value, index, self) {
                        return self.indexOf(value) === index;
                    });

                res.render("frontend", {title: postTag, tag: postTag, posts: foundPosts, arrDay, arrMonth, search: "", isAuthLink: req.isAuthenticated(), tags: allTags});
                }
            }).sort({created_at: -1});
        }
    })
});

app.route("/admin/tambah-post-baru")

    .get((req, res) => {
        if (req.isAuthenticated()) {
            res.render("tambah-post-baru", {title: "Tambah Post Baru", alert: "", previousLink: "/admin/tampil-semua-post", previousTitle: "Tampil Semua Post"});
        } else {
            res.redirect('/auth/login');
        }
    })

    .post(upload.single('image'), (req, res) => {
        const title = req.body.title;
        const slug = title.replace(/\s+/g, '-').toLowerCase();
        const content = req.body.content;
        const tags = req.body.tags.split(",");
        const img = req.file ? req.file.originalname : "";

        Post.findOne({title}, (err, foundPost) => {
            if (err) {
                console.log(err);
            } else {
                if (foundPost === null) {
                    const newPost = new Post({
                        title,
                        slug,
                        content,
                        img,
                        tags,
                        author: "Admin",
                        active: 1,
                        created_at: new Date().getTime(),
                        updated_at: new Date().getTime()
                    })
                
                    if (title !== "" && content !== "" && tags !== "") {
                        newPost.save();
                
                        res.render("tambah-post-baru", {title: "Tambah Post Baru", alert: showAlert("alert-success", "post baru berhasil ditambahkan.")});
                    } else {
                        res.render("tambah-post-baru", {title: "Tambah Post Baru", alert: showAlert("alert-warning", "data tidak boleh kosong!")});
                    }
                } else {
                    res.render("tambah-post-baru", {title: "Tambah Post Baru", alert: showAlert("alert-danger", "judul post sudah ada!")});
                }
            }
        })
    })

app.route("/admin/tampil-semua-post")

    .get((req, res) => {
        if (req.isAuthenticated()) {
            Post.find({active: 1}, (err, foundPosts) => {
                res.render("tampil-semua-post", {title: "Tampil Semua Post", tag: "", posts: foundPosts, arrDay, arrMonth, search: "", alert: "", previousLink: "/admin/dashboard", previousTitle: "Dashboard"});
            });    
        } else {
            res.redirect('/auth/login');
        }
        
    })

    .post((req, res) => {
        const search = req.body.search;
        
        if (search === "") {
            res.redirect("/admin/tampil-semua-post");
        } else {
            Post.find({title: {$regex: ".*"+search+".*", $options: 'i'}, active: 1}, (err, foundPosts) => { // MASIH SALAH PENCARIANNYA
        
                if (err) {
                    console.log(err);
                } else {
                    res.render("tampil-semua-post", {title: "Search: " + search, tag: "", posts: foundPosts, arrDay, arrMonth, search, alert: "", previousLink: "/admin/tampil-semua-post", previousTitle: "Tampil Semua Post"});
                }
            })
        }
    });

app.get("/admin/post/:postSlug", (req, res, next) => {
    if (req.isAuthenticated()) {
        const postSlug = req.params.postSlug;
        let post = null;

        Post.findOne({slug: postSlug}).exec()

        .then((foundPost) => {
            post = foundPost;
            return Comment.find({postSlug: postSlug}).sort({created_at: -1}).exec();
        })

        .then(foundComments => {
            res.render("admin-post-page", {title: post.title, tag: "", currentPost: post, comments: foundComments, arrDay, arrMonth, search: "", isAuthLink: req.isAuthenticated(), previousLink: "/admin/tampil-semua-post", previousTitle: "Tampil Semua Post"});
        })

        .then(null, next);
    } else {
        res.redirect('/auth/login');
    }
});

app.get("/admin/tag/:postTag", (req, res) => {
    if (req.isAuthenticated()) {
        const postTag = req.params.postTag;
    
        Post.find({tags: postTag}, (err, foundPosts) => {
            if (err) {
                console.log(err);
            } else {
                res.render("tampil-semua-post", {title: postTag, tag: postTag, posts: foundPosts, arrDay, arrMonth, search: "", alert: "", previousLink: "/admin/tampil-semua-post", previousTitle: "Tampil Semua Post"});
            }
        })    
    } else {
        res.redirect('/auth/login');
    }
})

app.post("/admin/mengarsipkan-post/:postSlug", (req, res) => {
    const postSlug = req.params.postSlug;

    Post.findOneAndUpdate({slug: postSlug}, {active: 0}, (err, postChanged) => {
        if (err) {
            console.log(err);
        } else {
            res.redirect("/admin/tampil-semua-post");
        }
    })
})

app.post("/admin/menghapus-post/:postSlug", (req, res) => {
    const postSlug = req.params.postSlug;
    
    Post.findOne({slug: postSlug}, (err, foundPost) => {
        if (err) {
            console.log(err);
        } else {
            Post.findByIdAndRemove({_id: foundPost._id}, (err) => {
                if (err) {
                    console.log(err);
                } else {
                    res.redirect("/admin/arsip-post");
                }
            })
        }
    })
    
})

app.get("/admin/arsip-post", (req, res) => {
    if (req.isAuthenticated()) {
        Post.find({active: 0}, (err, foundPosts) => {
            res.render("arsip-post", {title: "Arsip Post", posts: foundPosts, arrDay, arrMonth, tag: "", search: "", alert: "", previousLink: "/admin/dashboard", previousTitle: "Dashboard"});
        });
    } else {
        res.redirect('/auth/login');
    }
});

app.post("/admin/arsip-post", (req, res) => {
    const search = req.body.search;
    
    if (search === "") {
        res.redirect("/admin/arsip-post");
    } else {
        Post.find({title: {$regex: ".*"+search+".*", $options: 'i'}, active: 0}, (err, foundPosts) => { // MASIH SALAH PENCARIANNYA
    
            if (err) {
                console.log(err);
            } else {
                res.render("arsip-post", {title: "Search: " + search, tag: "", posts: foundPosts, arrDay, arrMonth, search, alert: "", previousLink: "/admin/arsip-post", previousTitle: "Arsip Post"});
            }
        })
    }
})

app.post("/admin/mengaktifkan-post/:postSlug", (req, res) => {
    const postSlug = req.params.postSlug;

    Post.findOneAndUpdate({slug: postSlug}, {active: 1}, (err, postChanged) => {
        if (err) {
            console.log(err);
        } else {
            res.redirect("/admin/arsip-post");
        }
    })
})


app.get("/admin/mengubah-post/:postSlug", (req, res) => {
    if (req.isAuthenticated()) {
        const postSlug = req.params.postSlug;
    
        Post.findOne({slug: postSlug}, (err, foundPost) => {
            if (err) {
                console.log(err);
            } else {
                res.render("ubah-post", {title: "Ubah Post", post: foundPost, alert: "", previousLink: "/admin/tampil-semua-post", previousTitle: "Tampil Semua Post"});
            }
        })
    } else {
        res.redirect('/auth/login');
    }
});

app.post("/admin/mengubah-post/:postSlug", upload.single('image'), (req, res) => {
    const title = req.body.title;
    const slug = req.body.slug;
    const content = req.body.content;
    const tags = req.body.tags.split(",");
    const img = req.file ? req.file.originalname : req.body.prev_img;
    const updated_at = new Date().getTime();

    Post.findOneAndUpdate({slug}, {title, content, tags, img, updated_at}, (err, postChanged) => {
        if (err) {
            console.log(err);
        } else {
            res.redirect("/admin/tampil-semua-post");
        }
    })
});


module.exports = app;
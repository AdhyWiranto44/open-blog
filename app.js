require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Post = require('./models/Post.js');
const User = require('./models/User.js');
const Comment = require('./models/Comment.js');
const showAlert = require('./helpers/alert.js');
const {arrDay, arrMonth} = require('./helpers/dates.js');
const multer = require('multer'); // Upload image

//////////////////////////////////////////////////////////

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/img/post')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
  })
const upload = multer({dest: __dirname + '/public/img/post', storage})

const app = express();

// Cookie and Session
const session = require('express-session');
const passport = require('passport');

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

app.set("view engine", "ejs");

mongoose.connect(`mongodb://127.0.0.1:27017/${process.env.DB_NAME}`, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false});
mongoose.set("useCreateIndex", true);

// mongodb://127.0.0.1:27017/${process.env.DB_NAME}
// mongodb+srv://open-blog-admin:${process.env.DB_PASSWORD}@cluster0.wvtrr.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority

passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//////////////////////////////////////////////////////////

const post1 = Post({
    title: "Post 1",
    slug: "post-1",
    content: "Vehicula ipsum a arcu cursus vitae congue mauris rhoncus aenean. Venenatis lectus magna fringilla urna porttitor rhoncus dolor purus non. Scelerisque eleifend donec pretium vulputate sapien nec sagittis aliquam. Nullam vehicula ipsum a arcu cursus vitae congue mauris. Cum sociis natoque penatibus et magnis dis. Nunc consequat interdum varius sit amet. Quisque egestas diam in arcu cursus euismod. Scelerisque felis imperdiet proin fermentum leo. Netus et malesuada fames ac turpis egestas integer eget. Vel fringilla est ullamcorper eget nulla facilisi etiam dignissim. Id interdum velit laoreet id donec ultrices tincidunt.",
    img: "post-img2.jpg",
    tags: ["nodejs", "express", "bootstrap", "todayilearn"],
    author: "Admin",
    active: 1,
    views: 0,
    vote: 0,
    created_at: Date(),
    updated_at: Date()
});

const post2 = Post({
    title: "Post 2",
    slug: "post-2",
    content: "Orci nulla pellentesque dignissim enim sit amet venenatis. Nec tincidunt praesent semper feugiat nibh sed. Nisi porta lorem mollis aliquam ut porttitor leo a. At augue eget arcu dictum varius duis at consectetur lorem. Nibh mauris cursus mattis molestie a iaculis at erat. Ut consequat semper viverra nam libero. Semper quis lectus nulla at volutpat. Rhoncus urna neque viverra justo nec ultrices dui sapien. Gravida rutrum quisque non tellus orci ac auctor augue. Felis imperdiet proin fermentum leo vel orci. Id semper risus in hendrerit gravida rutrum. Lorem donec massa sapien faucibus et molestie ac feugiat.",
    img: "",
    tags: ["blog", "react"],
    author: "Admin",
    active: 1,
    views: 0,
    vote: 0,
    created_at: Date(),
    updated_at: Date()
});

//////////////////////////////////////////////////////////

app.route("/")

    .get((req, res) => {
        // mencari post aktif
        Post.find({active: 1}).exec() 

        .then(foundPosts => {
            // jika tidak ada data post
            if (foundPosts.length < 1) { 
                // tambahkan data default
                Post.insertMany([post1, post2]) 

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
    })

    .post((req, res) => {
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

app.get("/documentation", (req, res) => {
    res.sendFile(__dirname + "/documentation/index.html");
});

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
})


app.route("/auth/login")

    .get((req, res) => {
        if (req.isAuthenticated()) {
            res.redirect('/admin/dashboard');
        } else {
            User.findOne((err, foundUser) => {
                if (err) {
                    console.log(err);
                } else {
                    if (!foundUser) {
                        User.register({
                            username: "admin",
                            img: "",
                            created_at: Date(),
                            updated_at: Date()
                        }, 
                        "1234",
                        (err) => {
                            if (err) {
                                console.log(err);
                            } else {
                                res.render("login", {title: "Login", alert: ""});
                            }
                        })
                    } else {
                        res.render("login", {title: "Login", alert: ""});
                    }
                }
            })
        }
    })

    .post((req, res) => {
        const user = new User({
            username: req.body.username,
            password: req.body.password
        })
        
        User.findOne({username: user.username}, (err, foundUser) => {
            if (err) {
                console.log(err);
            } else {
                if (foundUser === null) {
                    res.render("login", {title: "Login", alert: showAlert("alert-danger", "username tidak terdaftar, silahkan coba lagi.")});
                } else {
                    req.login(user, (err) => {
                        if (err) {
                            console.log(err);
                            res.redirect("/auth/login");
                        } else {
                            passport.authenticate('local')(req, res, function() {
                                res.redirect('/admin/dashboard');
                            });
                        }
                    })
                }
            }
        })
    })

app.route("/auth/register")

    .get((req, res) => {
        if (req.isAuthenticated()) {
            res.redirect('/admin/dashboard');
        } else {
            res.render("register", {title:"Register", alert: ""});
        }
    })

    .post((req, res) => {
        const regUsername = req.body.username;
        const regPassword = req.body.password;
        const regConfirm_password = req.body.confirm_password;

        User.findOne({username: regUsername}, (err, foundUser) => {
            if (err) {
                console.log(err);
            } else {
                if (foundUser === null) { // jika belum ada user yang terdaftar
                    if (regPassword === regConfirm_password) { // jika password cocok dengan confirm_password
                        User.register({
                            username: regUsername,
                            img: "",
                            created_at: Date(),
                            updated_at: Date()
                        }, regPassword, (err, user) => {
                            if (err) {
                                console.log(err);
                                res.redirect('/register');
                            } else {
                                passport.authenticate('local')(req, res, () => {
                                    res.redirect('/admin/dashboard');
                                })
                            }
                        })
                    } else {
                        res.render("register", {title: "Register", alert: showAlert("alert-danger", "password tidak cocok dengan confirm_password!")});
                    }
                } else {
                    res.render("register", {title: "Register", alert: showAlert("alert-danger", "sudah pernah ada akun dengan username tersebut!")});
                }
            }
        })
    })

app.post('/auth/logout', (req, res) => {
    req.logout();
    res.redirect('/auth/login');
})

app.get("/auth/reset-password", (req, res) => {
    if (req.isAuthenticated()) {
        res.redirect('/admin/dashboard');
    } else {
        res.redirect('/auth/login');
    }
    // res.render("reset-password", {title: "Reset Password"});
})

app.get('/auth/ubah-password', (req, res) => {
    if (req.isAuthenticated()) {
        res.redirect('/admin/dashboard');
    } else {
        res.redirect('/auth/login');
    }
})

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

})

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

app.route("/admin/arsip-post")

    .get((req, res) => {
        if (req.isAuthenticated()) {
            Post.find({active: 0}, (err, foundPosts) => {
                res.render("arsip-post", {title: "Arsip Post", posts: foundPosts, arrDay, arrMonth, tag: "", search: "", alert: "", previousLink: "/admin/dashboard", previousTitle: "Dashboard"});
            });
        } else {
            res.redirect('/auth/login');
        }
    })

    .post((req, res) => {
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


app.route("/admin/mengubah-post/:postSlug")

    .get((req, res) => {
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
    })

    .post(upload.single('image'), (req, res) => {
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
    })

app.listen(process.env.PORT || 3000, () => {
    console.log("http://localhost:3000");
})

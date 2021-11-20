const Post = require('../models/post');
const defaultPosts = require('../helpers/default_posts');
const {arrDay, arrMonth} = require('../helpers/dates');
const ACTIVE = 1
const LATEST = -1


exports.index = (req, res) => {
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
}

exports.find = (req, res) => {
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
}

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
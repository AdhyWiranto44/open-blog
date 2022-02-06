const Post = require('../models/post');
const Comment = require('../models/comment');
// const multer = require('multer'); // Upload image
const {arrDay, arrMonth} = require('../helpers/dates');
const showAlert = require('../helpers/alert.js');
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, '../public/img/post')
//     },
//     filename: function (req, file, cb) {
//       cb(null, file.originalname)
//     }
//   })
// const upload = multer({dest: '../public/img/post', storage})

class PostController {
    constructor() {}

    async getPosts(req, res) {
        const userLogin = req.session.username;
        const title = req.query.title;
        const active = req.query.active ? req.query.active : 1;

        // if not logged in and find archived post
        if (typeof userLogin === 'undefined' && active == 0) {
            console.log(`Please login first to get archived posts.`);
            return res.status(401).json({
                success: false,
                message: `Please login first to get archived posts.`
            });
        }

        try {
            let posts = [];
            let filter = { active }

            if (typeof title !== 'undefined') {
                filter['title'] = {$regex: ".*"+title+".*", $options: 'i'};
            }

            // find posts whether available or unavailable
            await Post.find(filter).exec()
                .then(foundPosts => {
                    posts = foundPosts;
                });

            // if psot not found
            if (posts.length < 1) {
                console.log('Post not found');
                return res.status(404).json({
                    success: false,
                    message: 'Post not found'
                });
            }

            console.log('Found posts');
            return res.status(200).json({
                success: true,
                message: 'Found posts',
                data: { posts }
            });
        } catch(err) {
            console.error(err.message);
            return res.status(500).json({
                success: false,
                message: `Internal Server Error.`
            });
        }
    }

    async getPost(req, res) {
        const userLogin = req.session.username;
        const slug = req.params.slug;
    
        try {
            let post = null;
            await Post.findOne({slug}).exec()
            .then(foundPost => {
                post = foundPost;
            });

            if (post == null) {
                console.log('Post not found');
                return res.status(404).json({
                    success: false,
                    message: 'Post not found'
                });
            }

            if (typeof userLogin === 'undefined' && post.active == 0) {
                console.log(`Please login first to get archived posts.`);
                return res.status(401).json({
                    success: false,
                    message: `Please login first to get archived posts.`
                });
            }

            console.log(`Found post by slug ${slug}`);
            return res.status(200).json({
                success: true,
                message: `Found post by slug ${slug}`,
                data: { post }
            });
        } catch(err) {
            console.error(err.message);
            return res.status(500).json({
                success: false,
                message: 'Internal Server Error'
            });
        }
    }
    
    async insertPost(req, res) {
        const userLogin = req.session.username;
        if (typeof userLogin === 'undefined') {
            console.log(`Please login first to add new post.`);
            return res.status(406).json({
                success: false,
                message: `Please login first to add new post.`
            });
        }

        try {
            const newPost = new Post({
                title: req.body.title,
                slug: req.body.title.replace(/\s+/g, '-').toLowerCase(),
                content: req.body.content,
                img: req.file ? req.file.originalname : "",
                tags: req.body.tags.split(","),
                author: "Admin",
                active: 1,
                created_at: new Date().getTime(),
                updated_at: new Date().getTime()
            });

            const slug = newPost.slug;
            let post = null;

            // Check duplicate post by slug
            await Post.findOne({slug}).exec()
                .then(foundPost => {
                    post = foundPost
                });
            
            // If post with slug already available
            if (post !== null) {
                console.log(`Post with slug ${slug} already available.`);
                return res.status(406).json({
                    success: false,
                    message: `Post with slug ${slug} already available.`
                });
            } else { // Else, continue to create post
                newPost.save();
            }

            console.log(`New post created.`);
            return res.status(201).json({
                success: true,
                message: `New post created.`,
                data: {
                    post: newPost
                }
            });
        } catch(err) {
            console.error(err.message);
            return res.status(500).json({
                success: false,
                message: 'Internal Server Error'
            });
        }
    }

    async updatePost(req, res) {
        const userLogin = req.session.username;
        const filter = { slug: req.params.slug };

        if (typeof userLogin === 'undefined') {
            console.log(`Please login first to update post.`);
            return res.status(406).json({
                success: false,
                message: `Please login first to update post.`
            });
        }
        
        // Find current post to update
        let postToUpdate = null;
        await Post.findOne(filter).exec()
            .then(foundPost => {
                postToUpdate = foundPost
            })
            .catch(err => {
                console.error(err.message);
            });

        const update = {
            title: req.body.title !== undefined ? req.body.title : postToUpdate.title,
            content: req.body.content !== undefined ? req.body.content : postToUpdate.content,
            img: req.body.img !== undefined ? req.body.img : postToUpdate.img,
            tags: req.body.tags !== undefined ? req.body.tags.split(",") : postToUpdate.tags,
            author: req.body.author !== undefined ? req.body.author : postToUpdate.author,
            active: req.body.active !== undefined ? parseInt(req.body.active) : postToUpdate.active,
            views: req.body.views !== undefined ? parseInt(req.body.views) : postToUpdate.views,
            vote: req.body.vote !== undefined ? parseInt(req.body.vote) : postToUpdate.vote,
            updated_at: new Date().getTime(),
        };
      
        try {
            let post = null;
            await Post.findOneAndUpdate(filter, update).exec()
                .then(oldPost => {
                    post = oldPost;
                });

            if (post === null) {
                console.log(`Post with slug ${filter['slug']} not found.`);
                return res.status(406).json({
                    success: false,
                    message: `Post with slug ${filter['slug']} not found.`
                });
            }

            console.log(`Success update post with slug ${filter['slug']}.`);
            return res.status(201).json({
                success: true,
                message: `Success update post with slug ${filter['slug']}.`,
                data: { post }
            });
        } catch(err) {
            console.error(err.message);
            return res.status(500).json({
                success: false,
                message: 'Internal Server Error'
            });
        }
    }

    removePost(req, res) {
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
        }); 
      }

    // showTag(req, res) {
    //   const postTag = req.params.postTag;
    
    //   Post.find({tags: postTag}, (err, foundPosts) => {
    //       if (err) {
    //           console.log(err);
    //       } else {
    //           Post.find({active: 1}, (err, foundForTags) => {
    //               if (err) {
    //                   console.log(err);
    //               } else {
    //                   // Push tag di setiap post ke array,
    //                   // Lalu hilangkan duplikat
    //                   let allTags = [];
    //                   foundForTags.forEach(post => {
    //                       post.tags.forEach(tag => {
    //                       allTags.push(tag);
    //                       })
    //                   })
                      
    //                   allTags = allTags.filter(function(value, index, self) {
    //                       return self.indexOf(value) === index;
    //                   });
    
    //               res.render("frontend", {title: postTag, tag: postTag, posts: foundPosts, arrDay, arrMonth, search: "", isAuthLink: req.session.username, tags: allTags});
    //               }
    //           }).sort({created_at: -1});
    //       }
    //   })
    // }
    
    // showTagAdmin(req, res) {
    //   if (typeof req.session.username !== 'undefined') {
    //       const postTag = req.params.postTag;
      
    //       Post.find({tags: postTag}, (err, foundPosts) => {
    //           if (err) {
    //               console.log(err);
    //           } else {
    //               res.render("tampil-semua-post", {title: postTag, tag: postTag, posts: foundPosts, arrDay, arrMonth, search: "", alert: "", previousLink: "/admin/tampil-semua-post", previousTitle: "Tampil Semua Post"});
    //           }
    //       })    
    //   } else {
    //       res.redirect('/login');
    //   }
    // }
    
    indexArchieveAdmin(req, res) {
      if (typeof req.session.username !== 'undefined') {
          Post.find({active: 0}, (err, foundPosts) => {
              res.render("arsip-post", {title: "Arsip Post", posts: foundPosts, arrDay, arrMonth, tag: "", search: "", alert: "", previousLink: "/dashboard", previousTitle: "Dashboard"});
          });
      } else {
          res.redirect('/login');
      }
    }
    
    findArchieveAdmin(req, res) {
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
    }
    
    activatePost(req, res) {
      const postSlug = req.params.postSlug;
    
      Post.findOneAndUpdate({slug: postSlug}, {active: 1}, (err, postChanged) => {
          if (err) {
              console.log(err);
          } else {
              res.redirect("/admin/arsip-post");
          }
      })
    }
    
    modify(req, res) {
      if (typeof req.session.username !== 'undefined') {
          const postSlug = req.params.postSlug;
      
          Post.findOne({slug: postSlug}, (err, foundPost) => {
              if (err) {
                  console.log(err);
              } else {
                  res.render("ubah-post", {title: "Ubah Post", post: foundPost, alert: "", previousLink: "/admin/tampil-semua-post", previousTitle: "Tampil Semua Post"});
              }
          })
      } else {
          res.redirect('/login');
      }
    }
    
    update(req, res) {
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
    }
}


module.exports = PostController;
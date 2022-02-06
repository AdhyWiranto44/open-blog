const Post = require('../models/post');


class TagController {
    constructor() {}

    async getTags(req, res) {
        try {
            let posts = [];
            let tags = [];
            await Post.find({}).exec()
                .then(foundPosts => {
                    posts = [...foundPosts];
                });

            // if post not found
            if (posts.length < 1) {
                console.log('Post not found.');
                return res.status(404).json({
                    success: false,
                    message: 'Post not found.'
                });
            }

            posts.forEach(post => {
                const postTags = post.tags;
                tags = [...tags, ...postTags];
            });
            console.log('Tags found.');
            return res.status(200).json({
                success: false,
                message: 'Tags found.',
                data: { tags }
            });

        } catch(err) {
            console.error(err.message);
            return res.status(500).json({
                success: false,
                message: `Internal Server Error.`
            });
        }
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
}


module.exports = TagController;
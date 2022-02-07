const Post = require('../models/post');
const ApiResponse = require('../helpers/api_response');
// const Comment = require('../models/comment');
// const multer = require('multer'); // Upload image
// const {arrDay, arrMonth} = require('../helpers/dates');
// const showAlert = require('../helpers/alert.js');
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
            return new ApiResponse(
                res, 401, false, 
                `Please login first to get archived posts.`
            ).sendResponse();
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

            // if post not found
            if (posts.length < 1) {
                return new ApiResponse(
                    res, 404, false, 
                    `Posts not found.`
                ).sendResponse();
            }

            return new ApiResponse(
                res, 200, true, 
                `Found posts.`,
                { posts }
            ).sendResponse();
        } catch(err) {
            return new ApiResponse(
                res, 500, false, 
                err.message
            ).sendResponse();
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
                return new ApiResponse(
                    res, 404, false, 
                    `Post not found.`
                ).sendResponse();
            }

            if (typeof userLogin === 'undefined' && post.active == 0) {
                return new ApiResponse(
                    res, 401, false, 
                    `Please login first to get archived posts.`
                ).sendResponse();
            }

            return new ApiResponse(
                res, 200, true, 
                `Found post by slug ${slug}.`,
                { post }
            ).sendResponse();
        } catch(err) {
            return new ApiResponse(
                res, 500, false, 
                err.message
            ).sendResponse();
        }
    }

    async getPostsByTag(req, res) {
        const userLogin = req.session.username;
        const filter = { tag: req.params.tag }

        if (typeof userLogin === 'undefined') {
            filter['active'] = 1;
        }

        try {
            let posts = [];
            await Post.find(filter).exec()
                .then(foundPosts => {
                    posts = foundPosts.filter(post => post.tags.includes(filter['tag']));
                });

            // if post not found
            if (posts.length < 1) {
                return new ApiResponse(
                    res, 404, false, 
                    `Post not found.`
                ).sendResponse();
            }

            return new ApiResponse(
                res, 200, true, 
                `Found posts.`,
                { posts }
            ).sendResponse();
        } catch(err) {
            return new ApiResponse(
                res, 500, false, 
                err.message
            ).sendResponse();
        }
    }
    
    async insertPost(req, res) {
        const userLogin = req.session.username;
        if (typeof userLogin === 'undefined') {
            return new ApiResponse(
                res, 406, false,
                'Please login first to add new post.'
            ).sendResponse();
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
                return new ApiResponse(
                    res, 406, false, 
                    `Post with slug ${slug} have already available.`
                ).sendResponse();
            } else { // Else, continue to create post
                newPost.save();
            }

            return new ApiResponse(
                res, 201, true, 
                'New post created.'
            ).sendResponse();
        } catch(err) {
            return new ApiResponse(
                res, 500, false, 
                err.message
            ).sendResponse();
        }
    }

    async updatePost(req, res) {
        const userLogin = req.session.username;
        const filter = { slug: req.params.slug };

        if (typeof userLogin === 'undefined') {
            return new ApiResponse(
                res, 406, false, 
                'Please login first to update post.'
            ).sendResponse();
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
                return new ApiResponse(
                    res, 404, false, 
                    `Post with slug ${filter['slug']} not found.`
                ).sendResponse();
            }

            return new ApiResponse(
                res, 201, true, 
                `Success update post with slug ${filter['slug']}.`
            ).sendResponse();
        } catch(err) {
            return new ApiResponse(
                res, 500, false, 
                err.message
            ).sendResponse();
        }
    }

    async removePost(req, res) {
        const _id = req.params.id;
        const userLogin = req.session.username;

        if (typeof userLogin === 'undefined') {
            return new ApiResponse(
                res, 406, false, 
                'Please login first to remove post.'
            ).sendResponse();
        }
        
        try {
            let post = null;
            await Post.findByIdAndRemove({_id}).exec()
                .then(deletedPost => {
                    post = deletedPost;
                });
            
            if (post === null) {
                return new ApiResponse(
                    res, 404, false, 
                    'Post not found.'
                ).sendResponse();
            }

            return new ApiResponse(
                res, 201, true, 
                'Success deleted post.',
                { post }
            ).sendResponse();

        } catch(err) {
            return new ApiResponse(
                res, 500, false, 
                err.message
            ).sendResponse();
        }
    }
}


module.exports = PostController;
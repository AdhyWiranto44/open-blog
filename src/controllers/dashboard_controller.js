const Post = require('../models/post');


class DashboardController {
    constructor() {}

    async index(req, res) {
        const userLogin = req.session.username;
        if (typeof userLogin === 'undefined') {
            console.log(`Please login first.`);
            return res.status(406).json({
                success: false,
                message: `Please login first.`
            });
        }
    
        try {
            let total = 0;
            let active = 0;
            let archived = 0;
            
            await Post.find({}).exec()
                .then(foundPosts => {
                    console.log(foundPosts.length);
                    if (foundPosts.length > 0) {
                        total = foundPosts.length;
                    }
                });

            await Post.find({active: 1}).exec()
                .then(foundPosts => {
                    console.log(foundPosts.length);
                    if (foundPosts.length > 0) {
                        active = foundPosts.length;
                    }
                });

            await Post.find({active: 0}, ).exec()
                .then(foundPosts => {
                    console.log(foundPosts.length);
                    if (foundPosts.length > 0) {
                        archived = foundPosts.length;
                    }
                });
            
            console.log('Total amount of posts, active posts, and archive posts');
            return res.status(200).json({
                success: true,
                message: 'Total amount of posts, active posts, and archive posts',
                data: {
                    posts: { total, active, archived }
                }
            })
        } catch(err) {
            console.error(err.message);
            return res.status(500).json({
                success: false,
                message: `Internal Server Error.`
            });
        }
    }
}


module.exports = DashboardController;
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
}


module.exports = TagController;
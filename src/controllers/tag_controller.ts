import Post from '../models/post';
import ApiResponse from '../helpers/api_response';


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
                return new ApiResponse(
                    res, 404, false, 
                    `Post not found.`
                ).sendResponse();
            }

            posts.forEach(post => {
                const postTags = post.tags;
                tags = [...tags, ...postTags];
            });

            let filteredTags = [];
            tags.forEach(tag => {
                if (!filteredTags.includes(tag)) {
                    filteredTags.push(tag);
                }
                console.log(filteredTags);
            })

            return new ApiResponse(
                res, 200, true, 
                `Tags found.`,
                { tags: filteredTags }
            ).sendResponse();

        } catch(err) {
            return new ApiResponse(
                res, 500, false, 
                err.message
            ).sendResponse();
        }
    }
}


export default TagController;
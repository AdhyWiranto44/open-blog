import Comment from '../models/comment';
import ApiResponse from '../helpers/api_response';
import Post from '../models/post';
import PostRepository from '../repositories/post_repository';
const postRepository = new PostRepository();


class CommentController {
    constructor() {}

    async getComments(req, res) {
        const slug: string = req.params.slug;

        try {
            let comments = [];
            let filter = { postSlug: slug }
            let post = await postRepository.findOne(filter);
            

            // if post not found
            if (post === null) {
                return new ApiResponse(
                    res, 404, false, 
                    `Posts not found.`
                ).sendResponse();
            }

            // Find corresponding comments
            await Comment.find(filter).exec()
                .then(foundComments => {
                    comments = foundComments;
                });

            // if comments not found
            if (comments.length < 1) {
                return new ApiResponse(
                    res, 404, false, 
                    `Comments not found.`
                ).sendResponse();
            }

            return new ApiResponse(
                res, 200, true, 
                `Found comments by post slug ${filter.postSlug}.`,
                { 
                    post: { slug: filter.postSlug },
                    comments 
                }
            ).sendResponse();
        } catch(err) {
            return new ApiResponse(
                res, 500, false, 
                err.message
            ).sendResponse();
        }
    }

    async getComment(req, res) {
        const filter = {
            _id: req.params.id,
            postSlug: req.params.slug
        }
    
        try {
            let comment = null;
            await Comment.findOne(filter).exec()
            .then(foundComment => {
                comment = foundComment;
            });

            if (comment == null) {
                return new ApiResponse(
                    res, 404, false, 
                    `Comment not found.`
                ).sendResponse();
            }

            return new ApiResponse(
                res, 200, true, 
                `Found comment.`,
                { comment }
            ).sendResponse();
        } catch(err) {
            return new ApiResponse(
                res, 500, false, 
                err.message
            ).sendResponse();
        }
    }

    async insertComment(req, res) {
        const slug = req.params.slug;
        try {
            const newComment = new Comment({
                name: req.body.name,
                body: req.body.body,
                postSlug: req.body.postSlug,
                hidden: req.body.hidden,
                created_at: new Date().getTime(),
                updated_at: new Date().getTime()
            });

            let post = await postRepository.findOne({ slug });
            
            // If post with slug already available
            if (post === null) {
                return new ApiResponse(
                    res, 406, false, 
                    `The corresponding post not found.`
                ).sendResponse();
            }

            if (post.active === 0) {
                return new ApiResponse(
                    res, 406, false, 
                    `Cannot insert comment to archived post.`
                ).sendResponse();
            }

            newComment.save();
            return new ApiResponse(
                res, 201, true, 
                'New comment created.'
            ).sendResponse();
        } catch(err) {
            return new ApiResponse(
                res, 500, false, 
                err.message
            ).sendResponse();
        }
    }

    async updateComment(req, res) {
        const userLogin = req.session.username;
        const filter = {
            _id: req.params.id,
            postSlug: req.params.slug
        }
        const update = {
            hidden: req.body.hidden
        }

        if (typeof userLogin === 'undefined') {
            return new ApiResponse(
                res, 401, false, 
                `Please login first to get all users.`
            ).sendResponse();
        }
    
        try {
            let comment = null;
            await Comment.findOneAndUpdate(filter, update).exec()
            .then(oldComment => {
                comment = oldComment
            });

            if (comment === null) {
                return new ApiResponse(
                    res, 406, false, 
                    `Comment not found.`
                ).sendResponse();
            }

            return new ApiResponse(
                res, 201, true, 
                'Comment updated successfully.'
            ).sendResponse();
        } catch(err) {
            return new ApiResponse(
                res, 500, false, 
                err.message
            ).sendResponse();
        };
    }

    async removeComment(req, res) {
        const userLogin = req.session.username;
        const filter = {
            _id: req.params.id,
            postSlug: req.params.slug
        }

        if (typeof userLogin === 'undefined') {
            return new ApiResponse(
                res, 401, false, 
                `Please login first to remove comment.`
            ).sendResponse();
        }
        
        try {
            let comment = null;
            await Comment.findByIdAndRemove(filter).exec()
                .then(deletedComment => {
                    comment = deletedComment;
                });
            
            if (comment === null) {
                return new ApiResponse(
                    res, 404, false, 
                    'comment not found.'
                ).sendResponse();
            }

            return new ApiResponse(
                res, 201, true, 
                'Success deleted comment.',
                { comment }
            ).sendResponse();

        } catch(err) {
            return new ApiResponse(
                res, 500, false, 
                err.message
            ).sendResponse();
        }
    }
}


export default CommentController;
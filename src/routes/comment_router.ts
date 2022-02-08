const router = require('express').Router();
import CommentController from '../controllers/comment_controller';


router.get("/posts/:slug/comments", new CommentController().getComments);
router.post("/posts/:slug/comments", new CommentController().insertComment);
router.get("/posts/:slug/comments/:id", new CommentController().getComment);
router.patch("/posts/:slug/comments/:id", new CommentController().updateComment);
router.delete("/posts/:slug/comments/:id", new CommentController().removeComment);


export default router;
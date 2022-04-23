import multer from 'multer';
const router = require('express').Router();
// const multer = require('multer'); // Upload image
import PostController from '../controllers/post_controller';
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, '../public/img/post')
//     },
//     filename: function (req, file, cb) {
//       cb(null, file.originalname)
//     }
//   })
const upload = multer({dest: `../../uploads/img/`});


router.get("/posts", new PostController().getPosts);
router.get("/posts/:slug", new PostController().getPost);
router.get("/posts/tags/:tag", new PostController().getPostsByTag);
router.post("/posts", upload.single('image'), new PostController().insertPost);
router.patch("/posts/:slug", new PostController().updatePost);
router.delete("/posts/:id", new PostController().removePost);


export default router;
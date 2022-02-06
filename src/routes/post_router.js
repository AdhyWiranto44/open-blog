const router = require('express').Router();
// const multer = require('multer'); // Upload image
const PostController = require('../controllers/post_controller');
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, '../public/img/post')
//     },
//     filename: function (req, file, cb) {
//       cb(null, file.originalname)
//     }
//   })
// const upload = multer({dest: '../public/img/post', storage})


router.get("/posts", new PostController().getPosts);
router.get("/posts/:slug", new PostController().getPost);
router.post("/posts", new PostController().insertPost);
router.patch("/posts/:slug", new PostController().updatePost);
router.delete("/posts/:id", new PostController().removePost);
// router.get("/tag/:postTag", new PostController().showTag);
// router.get("/admin/tag/:postTag", new PostController().showTagAdmin);


module.exports = router;
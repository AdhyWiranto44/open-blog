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


router.get("/posts", new PostController().index);
router.get("/posts/:slug", new PostController().show);
router.post("/posts", new PostController().addNewPost);
// router.get("/tag/:postTag", new PostController().showTag);
// router.get("/admin/tambah-post-baru", new PostController().create);
// router.post("/admin/tambah-post-baru", new PostController().store);
// router.get("/admin/post/:postSlug", new PostController().showAdmin);
// router.get("/admin/tag/:postTag", new PostController().showTagAdmin);
// router.post("/admin/mengarsipkan-post/:postSlug", new PostController().archievingPostAdmin);
// router.post("/admin/menghapus-post/:postSlug", new PostController().destroy);
// router.post("/admin/mengaktifkan-post/:postSlug", new PostController().activatePost);
// router.get("/admin/mengubah-post/:postSlug", new PostController().modify);
// router.post("/admin/mengubah-post/:postSlug", new PostController().update);
// router.post("/admin/mengubah-post/:postSlug", upload.single('image'), new PostController().update);


module.exports = router;
const router = require('express').Router();
// const multer = require('multer'); // Upload image
const postController = require('../controllers/post_controller');
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, '../public/img/post')
//     },
//     filename: function (req, file, cb) {
//       cb(null, file.originalname)
//     }
//   })
// const upload = multer({dest: '../public/img/post', storage})


router.get("/post/:postSlug", postController.show);
router.get("/tag/:postTag", postController.showTag);
router.get("/admin/tambah-post-baru", postController.create);
router.post("/admin/tambah-post-baru", postController.store);
// router.post("/admin/tambah-post-baru", upload.single('image'), postController.store);
router.get("/admin/tampil-semua-post", postController.indexAdmin);
router.post("/admin/tampil-semua-post", postController.findAdmin);
router.get("/admin/post/:postSlug", postController.showAdmin);
router.get("/admin/tag/:postTag", postController.showTagAdmin);
router.post("/admin/mengarsipkan-post/:postSlug", postController.archievingPostAdmin);
router.post("/admin/menghapus-post/:postSlug", postController.destroy);
router.get("/admin/arsip-post", postController.indexArchieveAdmin);
router.post("/admin/arsip-post", postController.findArchieveAdmin);
router.post("/admin/mengaktifkan-post/:postSlug", postController.activatePost);
router.get("/admin/mengubah-post/:postSlug", postController.modify);
router.post("/admin/mengubah-post/:postSlug", postController.update);
// router.post("/admin/mengubah-post/:postSlug", upload.single('image'), postController.update);


module.exports = router;
const router = require('express').Router();
const commentController = require('../controllers/comment_controller');


router.post("/post/menambah-komentar/:currentPostSlug", commentController.store);
router.post("/post/menghapus-komentar/:currentPostSlug", commentController.hide);
router.post("/post/menghapus-permanen-komentar/:currentPostSlug", commentController.destroy);
router.post("/post/mengaktifkan-komentar/:currentPostSlug", commentController.activate);


module.exports = router;
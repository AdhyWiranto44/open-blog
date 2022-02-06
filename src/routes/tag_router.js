const router = require('express').Router();
const TagController = require('../controllers/tag_controller');


router.get('/posts/tags', new TagController().getTags);
// router.get("/tag/:postTag", new TagController().showTag);
// router.get("/admin/tag/:postTag", new TagController().showTagAdmin);


module.exports = router;
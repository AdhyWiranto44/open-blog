const express = require('express');
const app = express();
const commentController = require('../controllers/comment_controller');


app.post("/post/menambah-komentar/:currentPostSlug", commentController.store);
app.post("/post/menghapus-komentar/:currentPostSlug", commentController.hide);
app.post("/post/menghapus-permanen-komentar/:currentPostSlug", commentController.destroy);
app.post("/post/mengaktifkan-komentar/:currentPostSlug", commentController.activate);


module.exports = app;
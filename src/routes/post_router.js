const express = require('express');
const app = express();
const multer = require('multer'); // Upload image
const postController = require('../controllers/post_controller');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '../public/img/post')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
  })
const upload = multer({dest: '../public/img/post', storage})


app.get("/post/:postSlug", postController.show);
app.get("/tag/:postTag", postController.showTag);
app.get("/admin/tambah-post-baru", postController.create);
app.post("/admin/tambah-post-baru", upload.single('image'), postController.store);
app.get("/admin/tampil-semua-post", postController.indexAdmin);
app.post("/admin/tampil-semua-post", postController.findAdmin);
app.get("/admin/post/:postSlug", postController.showAdmin);
app.get("/admin/tag/:postTag", postController.showTagAdmin);
app.post("/admin/mengarsipkan-post/:postSlug", postController.archievingPostAdmin);
app.post("/admin/menghapus-post/:postSlug", postController.destroy);
app.get("/admin/arsip-post", postController.indexArchieveAdmin);
app.post("/admin/arsip-post", postController.findArchieveAdmin);
app.post("/admin/mengaktifkan-post/:postSlug", postController.activatePost);
app.get("/admin/mengubah-post/:postSlug", postController.modify);
app.post("/admin/mengubah-post/:postSlug", upload.single('image'), postController.update);


module.exports = app;
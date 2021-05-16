const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    title: String,
    slug: String,
    content: String,
    img: String,
    tags: [String],
    author: String,
    active: Number,
    created_at: Number,
    updated_at: Number
});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
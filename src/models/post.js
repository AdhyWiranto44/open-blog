const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    title: String,
    slug: String,
    content: String,
    img: String,
    tags: [String],
    author: String,
    active: Number,
    views: Number,
    vote: Number,
    created_at: Date,
    updated_at: Date
});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
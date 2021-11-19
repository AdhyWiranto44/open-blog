const mongoose = require('mongoose');

const commentSchema = mongoose.Schema({
    name: String,
    body: String,
    postSlug: String,
    hidden: Number,
    created_at: Date,
    updated_at: Date
});

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
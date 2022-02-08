import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
    name: String,
    body: String,
    postSlug: String,
    hidden: Number,
    created_at: Date,
    updated_at: Date
});

const Comment = mongoose.model("Comment", commentSchema);

export default Comment;
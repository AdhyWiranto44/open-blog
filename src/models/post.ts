import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    content: { type: String, required: true },
    img: {
      data: Buffer,
      contentType: String
    },
    tags: [String],
    author: { type: String, required: true },
    active: { type: Number, required: true, enum: [0,1] },
    views: { type: Number },
    vote: { type: String },
    created_at: { type: Date, required: true },
    updated_at: { type: Date, required: true }
});

const Post = mongoose.model("Post", postSchema);

export default Post;
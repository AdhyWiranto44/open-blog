import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    img: String,
    created_at: Date,
    updated_at: Date
});

const User = mongoose.model("User", userSchema);

export default User;
const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username: String,
    password: String,
    img: String,
    created_at: Date,
    updated_at: Date
});

const User = mongoose.model("User", userSchema);

module.exports = User;
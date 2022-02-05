const bcrypt = require('bcrypt'); const ROUNDS = 12;
const User = require('../models/user');


class UserRepository {
    constructor() {}

    insertOne(username, password) {
        const newUser = new User({
            username,
            password: bcrypt.hashSync(password, ROUNDS),
            img: "",
            created_at: Date(),
            updated_at: Date()
        });
        newUser.save();
    }
}


module.exports = UserRepository;
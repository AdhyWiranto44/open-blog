const bcrypt = require('bcrypt'); const ROUNDS = 12;
const User = require('../models/user');


class UserRepository {
    constructor() {}

    insertOne(data) {
        const newUser = new User({
            username: data.username,
            password: bcrypt.hashSync(data.password, ROUNDS),
            img: "",
            created_at: Date(),
            updated_at: Date()
        });
        newUser.save();
    }

    async findOneAndUpdate(filter, data) {
        let user = null;
        data.password = bcrypt.hashSync(data.password, ROUNDS);
        await User.findOneAndUpdate(filter, data).exec()
            .then(oldUser => {
                user = oldUser;
            })
            .catch(err => {
                console.error(err.message);
            });
        
        return user;
    }

    async removeUser(data) {
        let user = null;
        await User.findByIdAndRemove(data).exec()
            .then(deletedUser => {
                user = deletedUser;
            })
            .catch(err => {
                console.error(err.message);
            });
        
        return user;
    }
}


module.exports = UserRepository;
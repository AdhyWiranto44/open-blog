import { hashSync } from 'bcrypt'; const ROUNDS = 12;
import User from '../models/user';


interface User {
    username: string,
    password: string,
    img: string,
    created_at: Date,
    updated_at: Date,
}

class UserRepository {
    constructor() {}

    insertOne(data: User) {
        const newUser = new User({
            username: data.username,
            password: hashSync(data.password, ROUNDS),
            img: "",
            created_at: Date(),
            updated_at: Date()
        });
        newUser.save();
    }

    async findOneAndUpdate(filter: any, data: User) {
        let user = null;
        data.password = hashSync(data.password, ROUNDS);
        await User.findOneAndUpdate(filter, data).exec()
            .then(oldUser => {
                user = oldUser;
            })
            .catch(err => {
                console.error(err.message);
            });
        
        return user;
    }

    async removeUser(data: any) {
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


export default UserRepository;
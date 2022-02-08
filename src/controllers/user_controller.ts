import User from '../models/user';
import UserRepository from '../repositories/user_repository';
const userRepository = new UserRepository();
import ApiResponse from '../helpers/api_response';


class UserController {
    constructor() {}

    async getUsers(req, res) {
        const userLogin = req.session.username;

        // if not logged in and find archived post
        if (typeof userLogin === 'undefined') {
            return new ApiResponse(
                res, 401, false, 
                `Please login first to get all users.`
            ).sendResponse();
        }

        try {
            let users = [];

            await User.find({}).exec()
                .then(foundUsers => {
                    users = foundUsers;
                });

            // if users not found
            if (users.length < 1) {
                return new ApiResponse(
                    res, 404, false, 
                    `Users not found.`
                ).sendResponse();
            }

            return new ApiResponse(
                res, 200, true, 
                `Found users.`,
                { users }
            ).sendResponse();
        } catch(err) {
            return new ApiResponse(
                res, 500, false, 
                err.message
            ).sendResponse();
        }
    }

    async getUser(req, res) {
        interface User {
            username: string,
            password: string,
            img: string,
            created_at: Date,
            updated_at: Date,
        }

        const userLogin = req.session.username;
        const username = req.params.username;

        if (typeof userLogin === 'undefined') {
            return new ApiResponse(
                res, 401, false, 
                `Please login first to get user.`
            ).sendResponse();
        }
    
        try {
            let user = null;
            await User.findOne({username}).exec()
            .then(foundUser => {
                user = foundUser;
            });

            if (user == null) {
                return new ApiResponse(
                    res, 404, false, 
                    `User not found.`
                ).sendResponse();
            }

            return new ApiResponse(
                res, 200, true, 
                `Found user.`,
                { user }
            ).sendResponse();
        } catch(err) {
            return new ApiResponse(
                res, 500, false, 
                err.message
            ).sendResponse();
        }
    }
    
    async insertUser(req, res) {
        const userLogin = req.session.username;
        const formInput: any = {
            username: req.body.username,
            password: req.body.password,
            confirm_password: req.body.confirm_password
        }

        if (typeof userLogin === 'undefined') {
            return new ApiResponse(
                res, 401, false, 
                `Please login first to insert new user.`
            ).sendResponse();
        }

        if (formInput['password'] !== formInput['confirm_password']) {
            return new ApiResponse(
                res, 406, false, 
                `Password and confirm_password field should be same.`
            ).sendResponse();
        }

        // Check duplicate user by username
        try {
            let user = null;
            await User.findOne({username: formInput['username']}).exec()
                .then(foundUser => {
                    user = foundUser;
                });
            
            // Jika user sudah ada
            if (user !== null) {
                return new ApiResponse(
                    res, 406, false, 
                    `Username must be unique.`
                ).sendResponse();
            }

            userRepository.insertOne(formInput);
            return new ApiResponse(
                res, 201, true, 
                'New user created.'
            ).sendResponse();
        } catch (err) {
            return new ApiResponse(
                res, 500, false, 
                err.message
            ).sendResponse();
        }
    }

    async updateUser(req, res) {
        const userLogin = req.session.username;
        const filter = { username: req.params.username };
        const formInput = {
            username: req.body.username,
            password: req.body.password,
            confirm_password: req.body.confirm_password,
        }

        if (typeof userLogin === 'undefined') {
            return new ApiResponse(
                res, 406, false, 
                'Please login first to update user.'
            ).sendResponse();
        }

        if (formInput['password'] !== formInput['confirm_password']) {
            return new ApiResponse(
                res, 406, false, 
                `Password and confirm_password field should be same.`
            ).sendResponse();
        }
      
        try {
            // Find current user to update
            let userToUpdate = null;
            await User.findOne(filter).exec()
                .then(foundUser => {
                    userToUpdate = foundUser
                });
            
            // Jika user tidak ada
            if (userToUpdate === null) {
                return new ApiResponse(
                    res, 406, false, 
                    `User not found.`
                ).sendResponse();
            }
            
            const update: any = {
                password: req.body.password !== undefined ? req.body.password : userToUpdate.password,
                updated_at: new Date().getTime(),
            };

            let user = await userRepository.findOneAndUpdate(filter, update);

            if (user === null) {
                return new ApiResponse(
                    res, 404, false, 
                    `User not found.`
                ).sendResponse();
            }

            return new ApiResponse(
                res, 201, true, 
                `Success update user with username ${formInput.username}.`,
                { user }
            ).sendResponse();
        } catch(err) {
            return new ApiResponse(
                res, 500, false, 
                err.message
            ).sendResponse();
        }
    }

    async removeUser(req, res) {
        const _id = req.params.id;
        const userLogin = req.session.username;

        if (typeof userLogin === 'undefined') {
            return new ApiResponse(
                res, 406, false, 
                'Please login first to remove user.'
            ).sendResponse();
        }
        
        try {
            let user = await userRepository.removeUser({ _id });
            
            if (user === null) {
                return new ApiResponse(
                    res, 404, false, 
                    'User not found.'
                ).sendResponse();
            }

            return new ApiResponse(
                res, 201, true, 
                'Success deleted user.',
                { user }
            ).sendResponse();

        } catch(err) {
            return new ApiResponse(
                res, 500, false, 
                err.message
            ).sendResponse();
        }
    }
}


export default UserController;
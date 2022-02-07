const bcrypt = require('bcrypt');
const User = require('../models/user');
const UserRepository = require('../repositories/user_repository');
const userRepository = new UserRepository();
const showAlert = require('../helpers/alert.js');


class LoginController {
    constructor() {}

    index(req, res) {
        const userLogin = req.session.username;

        if (typeof userLogin !== 'undefined') {
            res.status(406).json({
                success: true,
                message: `Already logged in as ${userLogin}`,
                data: {
                    'redirect-path': '/dashboard'
                }
            });
        }
        
        User.findOne({}).exec()
            .then(foundUser => {
                if (!foundUser) {
                    const newUser = { username: 'admin', password: '12345' }
                    userRepository.insertOne(newUser.username, newUser.password);

                    return res.status(201).json({
                        success: true,
                        message: `Default user added!`,
                        data: {
                            'username': newUser.username,
                            'password': newUser.password
                        }
                    });
                }

                res.status(200).json({
                    success: true,
                    data: {
                        'redirect-path': '/login'
                    }
                });
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({
                    success: false,
                    message: `Internal Server Error`,
                    data: {
                        'redirect-path': '/'
                    }
                });
            });
    }
    
    login(req, res) {
        const user = {
            username: req.body.username,
            password: req.body.password
        }

        const userLogin = req.session.username;
        if (typeof userLogin !== 'undefined') {
            console.log(`Already logged in as ${userLogin}`);
            return res.status(406).json({
                success: false,
                message: `Already logged in as ${userLogin}`
            });
        }
        
        User.findOne({username: user.username}).exec()
            .then((foundUser) => {
                if (foundUser === null) {
                    console.log(`user not registered, please try again.`);
                    return res.status(404).json({
                        success: false,
                        message: `user not registered, please try again.`
                    });
                }
    
                if (!bcrypt.compareSync(user.password, foundUser.password)) {
                    console.log(`username or password invalid.`);
                    return res.status(404).json({
                        success: false,
                        message: `username or password invalid.`
                    });
                }
                
                console.log(`Success logged in.`);
                req.session.username = user.username;
                return res.status(200).json({
                    success: true,
                    message: `Success logged in.`
                });
            })
            .catch(err => {
                console.error(err.message);
                return res.status(500).json({
                    success: false,
                    message: `Internal Server Error.`
                });
            });
    }
    
    logout(req, res) {
        const userLogin = req.session.username;
        if (typeof userLogin === 'undefined') {
            console.log(`Already logged out.`);
            return res.status(406).json({
                success: false,
                message: `Already logged out.`
            });
        }

        try {
            console.log(`Success logged out.`);
            delete req.session.username;
            res.status(200).json({
                success: true,
                message: `Success logged out.`
            });
        } catch(err) {
            console.error(err.message);
            return res.status(500).json({
                success: false,
                message: `Internal Server Error.`
            });
        }
    }
}


module.exports = LoginController;
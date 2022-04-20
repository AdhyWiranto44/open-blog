import bcrypt from 'bcrypt';
import User from '../models/user';
import ApiResponse from '../helpers/api_response';
import { randomBytes } from 'crypto';
import { sign } from 'jsonwebtoken';


class LoginController {
    constructor() {}
    
    login(req, res) {
        const user = {
            username: req.body.username,
            password: req.body.password
        }

        // const userLogin = req.session.username;
        
        // if (typeof userLogin !== 'undefined') {
        //     return new ApiResponse(
        //         res, 406, false, 
        //         `Already logged in as ${userLogin}`
        //     ).sendResponse();
        // }
        
        User.findOne({username: user.username}).exec()
            .then((foundUser) => {
                if (foundUser === null) {
                    return new ApiResponse(
                        res, 404, false, 
                        `user not registered, please try again.`
                    ).sendResponse();
                }
    
                if (!bcrypt.compareSync(user.password, foundUser.password)) {
                    return new ApiResponse(
                        res, 404, false, 
                        `username or password invalid.`
                    ).sendResponse();
                }
                
                // req.session.username = user.username;
                const payload = {
                  "uid": randomBytes(16).toString('hex'),
                  "username": user.username,
                }
                const encoded = sign(payload, process.env.SECRET, { expiresIn: process.env.TOKEN_EXPIRED_IN })
                // Cookies.set( "X-OPEN-BLOG-TOKEN", encoded, { expires: 1 } )
                // console.log(Cookies.get( "X-OPEN-BLOG-TOKEN"))
                return new ApiResponse(
                    res, 200, true, 
                    `Success logged in.`,
                    { "token": encoded }
                ).sendResponse();
            })
            .catch(err => {
                return new ApiResponse(
                    res, 500, false, 
                    err.message
                ).sendResponse();
            });
    }
    
    logout(req, res) {
        const userLogin = req.session.username;
        if (typeof userLogin === 'undefined') {
            return new ApiResponse(
                res, 406, false, 
                `Already logged out.`
            ).sendResponse();
        }

        try {
            delete req.session.username;
            return new ApiResponse(
                res, 200, true, 
                `Success logged out.`
            ).sendResponse();
        } catch(err) {
            return new ApiResponse(
                res, 500, false, 
                err.message
            ).sendResponse();
        }
    }

    checkLoginSession = (req, res) => {
        const userLogin = req.session.username;
        try {
            if (typeof userLogin !== 'undefined') {
                return new ApiResponse(
                    res, 200, true, 
                    `Already logged in.`
                ).sendResponse();
            } else {
                return new ApiResponse(
                    res, 406, false, 
                    `Not logged in.`
                ).sendResponse();
            }
        } catch(err) {
            return new ApiResponse(
                res, 500, false, 
                err.message
            ).sendResponse();
        }
    }
}


export default LoginController;
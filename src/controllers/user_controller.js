const User = require('../models/user');
const UserRepository = require('../repositories/user_repository');
const userRepository = new UserRepository();


exports.create = (req, res) => {
    if (typeof req.session.username !== 'undefined') {
        res.redirect('/dashboard');
    }

    res.render("register", {title:"Register", alert: ""});
}

exports.store = (req, res) => {
    const registration = {
        username: req.body.username,
        password: req.body.password,
        confirm_password: req.body.confirm_password
    }

    User.findOne({username: registration.username}, (err, foundUser) => {
        if (err) {
            console.log(err);
        } else {
            if (foundUser === null) { // jika belum ada user yang terdaftar
                if (registration.password === registration.confirm_password) { // jika password cocok dengan confirm_password
                    userRepository.insertOne(registration.username, registration.password);
                    req.session.username = registration.username;
                    res.redirect('/dashboard');
                } else {
                    res.render("register", {title: "Register", alert: showAlert("alert-danger", "password tidak cocok dengan confirm_password!")});
                }
            } else {
                res.render("register", {title: "Register", alert: showAlert("alert-danger", "sudah pernah ada akun dengan username tersebut!")});
            }
        }
    })
}

exports.getResetPassword = (req, res) => {
    if (typeof req.session.username !== 'undefined') {
        res.redirect('/dashboard');
    }
    res.redirect('/login');
}

exports.getUpdatePassword = (req, res) => {
    if (typeof req.session.username !== 'undefined') {
        res.redirect('/dashboard');
    }
    res.redirect('/login');
}
const bcrypt = require('bcrypt'); const rounds = 12;
const User = require('../models/user');
const showAlert = require('../helpers/alert.js');


exports.getLogin = (req, res) => {
    if (typeof req.session.username !== 'undefined') {
        res.redirect('/admin/dashboard');
    }
    
    User.findOne({}).exec()
        .then(foundUser => {
            if (!foundUser) storeUser("admin", "12345");
            res.render("login", {title: "Login", alert: ""});
        })
        .catch(err => {
            console.log("error" + err);
            return res.redirect('/auth/login');
        });
}

exports.postLogin = (req, res) => {
    const user = {
        username: req.body.username,
        password: req.body.password
    }
    
    User.findOne({username: user.username}).exec()
        .then((foundUser) => {
            if (foundUser === null) {
                return res.render("login", {title: "Login", alert: showAlert("alert-danger", "username tidak terdaftar, silahkan coba lagi.")});
            }

            if (!bcrypt.compareSync(user.password, foundUser.password)) {
                console.log("password tidak sama");
                return res.redirect('/auth/login');
            }
            
            req.session.username = user.username;
            res.redirect('/admin/dashboard');
        })
        .catch(err => {
            console.log("error" + err);
            return res.redirect('/auth/login');
        });
}

exports.getRegister = (req, res) => {
    if (typeof req.session.username !== 'undefined') {
        res.redirect('/admin/dashboard');
    }

    res.render("register", {title:"Register", alert: ""});
}

exports.postRegister = (req, res) => {
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
                    storeUser(registration.username, registration.password);
                    req.session.username = registration.username;
                    res.redirect('/admin/dashboard');
                } else {
                    res.render("register", {title: "Register", alert: showAlert("alert-danger", "password tidak cocok dengan confirm_password!")});
                }
            } else {
                res.render("register", {title: "Register", alert: showAlert("alert-danger", "sudah pernah ada akun dengan username tersebut!")});
            }
        }
    })
}

exports.postLogout = (req, res) => {
    delete req.session.username;
    res.redirect('/auth/login');
}

exports.getResetPassword = (req, res) => {
    if (typeof req.session.username !== 'undefined') {
        res.redirect('/admin/dashboard');
    }
    res.redirect('/auth/login');
}

exports.getUpdatePassword = (req, res) => {
    if (typeof req.session.username !== 'undefined') {
        res.redirect('/admin/dashboard');
    }
    res.redirect('/auth/login');
}

const storeUser = (username, password) => {
    const newUser = new User({
        username,
        password: bcrypt.hashSync(password, rounds),
        img: "",
        created_at: Date(),
        updated_at: Date()
    });
    newUser.save();
}
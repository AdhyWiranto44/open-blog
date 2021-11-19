const User = require('../models/user');
const showAlert = require('../helpers/alert.js');


exports.getLogin = (req, res) => {
    if (req.isAuthenticated()) {
        res.redirect('/admin/dashboard');
    } else {
        User.findOne((err, foundUser) => {
            if (err) {
                console.log(err);
            } else {
                if (!foundUser) {
                    User.register({
                        username: "admin",
                        img: "",
                        created_at: Date(),
                        updated_at: Date()
                    }, 
                    "1234",
                    (err) => {
                        if (err) {
                            console.log(err);
                        } else {
                            res.render("login", {title: "Login", alert: ""});
                        }
                    })
                } else {
                    res.render("login", {title: "Login", alert: ""});
                }
            }
        })
    }
}

exports.postLogin = (req, res) => {
    const user = new User({
        username: req.body.username,
        password: req.body.password
    })
    
    User.findOne({username: user.username}, (err, foundUser) => {
        if (err) {
            console.log(err);
        } else {
            if (foundUser === null) {
                res.render("login", {title: "Login", alert: showAlert("alert-danger", "username tidak terdaftar, silahkan coba lagi.")});
            } else {
                req.login(user, (err) => {
                    if (err) {
                        console.log(err);
                        res.redirect("/auth/login");
                    } else {
                        passport.authenticate('local')(req, res, function() {
                            res.redirect('/admin/dashboard');
                        });
                    }
                })
            }
        }
    })
}

exports.getRegister = (req, res) => {
    if (req.isAuthenticated()) {
        res.redirect('/admin/dashboard');
    } else {
        res.render("register", {title:"Register", alert: ""});
    }
}

exports.postRegister = (req, res) => {
    const regUsername = req.body.username;
    const regPassword = req.body.password;
    const regConfirm_password = req.body.confirm_password;

    User.findOne({username: regUsername}, (err, foundUser) => {
        if (err) {
            console.log(err);
        } else {
            if (foundUser === null) { // jika belum ada user yang terdaftar
                if (regPassword === regConfirm_password) { // jika password cocok dengan confirm_password
                    User.register({
                        username: regUsername,
                        img: "",
                        created_at: Date(),
                        updated_at: Date()
                    }, regPassword, (err, user) => {
                        if (err) {
                            console.log(err);
                            res.redirect('/register');
                        } else {
                            passport.authenticate('local')(req, res, () => {
                                res.redirect('/admin/dashboard');
                            })
                        }
                    })
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
    req.logout();
    res.redirect('/auth/login');
}

exports.getResetPassword = (req, res) => {
    if (req.isAuthenticated()) {
        res.redirect('/admin/dashboard');
    } else {
        res.redirect('/auth/login');
    }
}

exports.getUpdatePassword = (req, res) => {
    if (req.isAuthenticated()) {
        res.redirect('/admin/dashboard');
    } else {
        res.redirect('/auth/login');
    }
}
const express = require('express');
const app = express();
const authController = require('../controllers/auth_controller');


app.get("/auth/login", authController.getLogin);
app.post("/auth/login", authController.postLogin);
app.get("/auth/register", authController.getRegister);
app.post("/auth/register", authController.postRegister);
app.post('/auth/logout', authController.postLogout);
app.get("/auth/reset-password", authController.getResetPassword);
app.get('/auth/ubah-password', authController.getUpdatePassword);


module.exports = app;
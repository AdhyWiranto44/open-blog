const express = require('express');
const app = express();
const homeController = require('../controllers/home_controller');


app.get("/", homeController.index);
app.post("/", homeController.find);


module.exports = app;
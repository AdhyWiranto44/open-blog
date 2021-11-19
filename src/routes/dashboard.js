const express = require('express');
const app = express();
const dashboardController = require('../controllers/dashboard_controller');


app.get("/admin/dashboard", dashboardController.index);


module.exports = app;
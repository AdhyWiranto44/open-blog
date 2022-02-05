const router = require('express').Router();
const DashboardController = require('../controllers/dashboard_controller');


router.get("/dashboard", new DashboardController().index);


module.exports = router;
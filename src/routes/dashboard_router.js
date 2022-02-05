const router = require('express').Router();
const dashboardController = require('../controllers/dashboard_controller');


router.get("/admin/dashboard", dashboardController.index);


module.exports = router;
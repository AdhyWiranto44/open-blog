const router = require('express').Router();
const homeController = require('../controllers/home_controller');


router.get("/", homeController.index);
router.post("/", homeController.find);


module.exports = router;
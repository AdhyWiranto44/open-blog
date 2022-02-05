const router = require('express').Router();
const userController = require('../controllers/user_controller');


router.get("/register", userController.create);
router.post("/register", userController.store);
router.get("/reset-password", userController.getResetPassword);
router.get('/ubah-password', userController.getUpdatePassword);


module.exports = router;
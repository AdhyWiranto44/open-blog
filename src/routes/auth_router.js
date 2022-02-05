const router = require('express').Router();
const authController = require('../controllers/auth_controller');


router.get("/auth/login", authController.getLogin);
router.post("/auth/login", authController.postLogin);
router.get("/auth/register", authController.getRegister);
router.post("/auth/register", authController.postRegister);
router.post('/auth/logout', authController.postLogout);
router.get("/auth/reset-password", authController.getResetPassword);
router.get('/auth/ubah-password', authController.getUpdatePassword);


module.exports = router;
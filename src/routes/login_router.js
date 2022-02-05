const router = require('express').Router();
const LoginController = require('../controllers/login_controller');


// router.get("/login", new LoginController().index);
router.post("/login", new LoginController().login);
router.delete('/logout', new LoginController().logout);


module.exports = router;
const router = require('express').Router();
import LoginController from '../controllers/login_controller';


// router.get("/login", new LoginController().index);
router.post("/login", new LoginController().login);
router.delete('/logout', new LoginController().logout);
router.get("/login/session", new LoginController().checkLoginSession);


export default router;
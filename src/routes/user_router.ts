const router = require('express').Router();
import UserController from '../controllers/user_controller';


router.get("/users", new UserController().getUsers);
router.post("/users", new UserController().insertUser);
router.get("/users/:username", new UserController().getUser);
router.patch("/users/:username", new UserController().updateUser);
router.delete("/users/:id", new UserController().removeUser);


export default router;
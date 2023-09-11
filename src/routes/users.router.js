import { Router } from "express";
import UsersController from "../controllers/users.controller.js";
const usersController = new UsersController();

const router = Router();

router.get('/', usersController.getUsers);
router.get('/:uid', usersController.getUserById);
router.put('/:uid', usersController.updateUser);
router.delete('/:uid', usersController.deleteUser);
router.delete('/', usersController.deleteInactiveUsers);

export default router;
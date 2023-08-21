import { Router } from "express";
import UsersController from "../controllers/users.controller.js";

const usersController = new UsersController();

const router = Router();

router.put('/premium/:uid', usersController.updateUserPremium)
router.post('/:uid/documents', usersController.uploadFiles)

export default router;
import express from "express";
import * as usersController from "../controllers/user.controller";
import { requireAuth } from "../middlewares/auth.middleware";

const router = express.Router();
// /users/:id
router
  .route("/")
  .get(requireAuth, usersController.getUsers)
  .post(usersController.createUser);

router.route("/username").get(requireAuth, usersController.getUserByUserName);
router.route("/login").get(usersController.loginUser);

router
  .route("/:id")
  .get(requireAuth, usersController.getUserById)
  .put(requireAuth, usersController.updateUser)
  .delete(requireAuth, usersController.removeUser);

export default router;

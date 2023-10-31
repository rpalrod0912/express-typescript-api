import express from "express";
import * as usersController from "../controllers/user.controller";

const router = express.Router();
// /users/:id
router
  .route("/")
  .get(usersController.getUsers)
  .post(usersController.createUser);

router
  .route("/:id")
  .get(usersController.getUserById)
  .put(usersController.updateUser)
  .delete(usersController.removeUser);

export default router;

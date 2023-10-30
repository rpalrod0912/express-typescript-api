import express from "express";
import * as usersController from "../controllers/user.controller";

const router = express.Router();
// /users/:id
router
  .route("/")
  .get(usersController.getUsers)
  .post(usersController.createUser);

export default router;

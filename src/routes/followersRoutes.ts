import express from "express";
import * as followersController from "../controllers/followers.controller";

const router = express.Router();
// /users/:id
router
  .route("/")
  .get(followersController.getFollowers)
  .post(followersController.postFollow)
  .delete(followersController.deleteFollow);

router.route("/followed").get(followersController.checkIfUserIsFollowing);

export default router;

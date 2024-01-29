import express from "express";
import * as followersController from "../controllers/followers.controller";
import { requireAuth } from "../middlewares/auth.middleware";

const router = express.Router();
// /users/:id
router
  .route("/")
  .get(requireAuth, followersController.getFollowers)
  .post(requireAuth, followersController.postFollow)
  .delete(requireAuth, followersController.deleteFollow);

router
  .route("/followerDetail")
  .get(requireAuth, followersController.getFollowersDetailed);

router
  .route("/followedDetail")
  .get(requireAuth, followersController.getFollowedsDetailed);

router
  .route("/followed")
  .get(requireAuth, followersController.checkIfUserIsFollowing);

export default router;

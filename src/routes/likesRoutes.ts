import express from "express";
import * as likesController from "../controllers/likes.controller";
import { requireAuth } from "../middlewares/auth.middleware";

const router = express.Router();
// /users/:id
router
  .route("/")
  .get(requireAuth, likesController.getPostLikes)
  .post(requireAuth, likesController.likePost)
  .delete(requireAuth, likesController.deleteUserLike);

router.route("/liked").get(requireAuth, likesController.hasUserLikedPost);

export default router;

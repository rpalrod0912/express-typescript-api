import express from "express";
import * as likesController from "../controllers/likes.controller";

const router = express.Router();
// /users/:id
router
  .route("/")
  .get(likesController.getPostLikes)
  .post(likesController.likePost)
  .delete(likesController.deleteUserLike);

router.route("/liked").get(likesController.hasUserLikedPost);

export default router;

import express from "express";
import * as postsController from "../controllers/posts.controller";
import { requireAuth } from "../middlewares/auth.middleware";

const router = express.Router();
// /users/:id
router
  .route("/")
  .get(postsController.getPosts)
  .post(requireAuth, postsController.addNewPost);
//   .delete(postsController.deletePost);

router.route("/user/:id").get(postsController.getUserPosts);

router
  .route("/:id")
  .get(requireAuth, postsController.getPostByPostId)
  .delete(requireAuth, postsController.deletePost);

export default router;

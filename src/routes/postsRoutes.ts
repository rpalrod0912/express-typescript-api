import express from "express";
import * as postsController from "../controllers/posts.controller";

const router = express.Router();
// /users/:id
router
  .route("/")
  .get(postsController.getPosts)
  .post(postsController.addNewPost);
//   .delete(postsController.deletePost);

router.route("/user/:id").get(postsController.getUserPosts);

router
  .route("/:id")
  .get(postsController.getPostByPostId)
  .delete(postsController.deletePost);

export default router;

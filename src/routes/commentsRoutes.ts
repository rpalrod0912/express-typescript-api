import express from "express";
import * as commentsController from "../controllers/comments.controller";

const router = express.Router();
// /users/:id
router
  .route("/")
  .get(commentsController.getCommentsFromPost)
  .post(commentsController.addCommentsToPost)
  .delete(commentsController.deleteUserComment);

router.route("/commented").get(commentsController.userHasCommented);

export default router;

import express from "express";
import * as commentsController from "../controllers/comments.controller";
import { requireAuth } from "../middlewares/auth.middleware";

const router = express.Router();
// /users/:id
router
  .route("/")
  .get(requireAuth, commentsController.getCommentsFromPost)
  .post(requireAuth, commentsController.addCommentsToPost)
  .delete(requireAuth, commentsController.deleteUserComment);

router.route("/commented").get(commentsController.userHasCommented);

export default router;

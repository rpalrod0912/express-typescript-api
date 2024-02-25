import express from "express";
import * as postsController from "../controllers/posts.controller";
import { requireAuth } from "../middlewares/auth.middleware";

const router = express.Router();
// /users/:id

const multer = require("multer");

const fileStorageEngine = multer.diskStorage({
  destination: (req: any, file: any, cb: any) => {
    cb(null, "uploads/");
  },
  filename: (req: any, file: any, cb: any) => {
    cb(null, Date.now() + "--" + file.originalname);
  },
});

const upload = multer({ storage: fileStorageEngine });

router
  .route("/")
  .get(postsController.getPosts)
  .post([requireAuth, upload.single("files")], postsController.addNewPost);
//   .delete(postsController.deletePost);

router.route("/paginated").get(postsController.getPostsPaginated);

router.route("/user/:id").get(postsController.getUserPosts);

router
  .route("/:id")
  .get(requireAuth, postsController.getPostByPostId)
  .delete(requireAuth, postsController.deletePost);

export default router;

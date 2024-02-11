import express from "express";
import * as usersController from "../controllers/user.controller";
import { requireAuth } from "../middlewares/auth.middleware";

const router = express.Router();

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

// /users/:id
router
  .route("/")
  .get(requireAuth, usersController.getUsers)
  .post(usersController.createUser);

router.route("/username").get(requireAuth, usersController.getUserByUserName);
router.route("/login").get(usersController.loginUser);
router
  .route("/updateImage/:id")
  .put(
    [requireAuth, upload.single("files")],
    usersController.updateProfileImage
  );

router
  .route("/limitedData")
  .get(requireAuth, usersController.getUsernameAndImageById);

router
  .route("/:id")
  .get(requireAuth, usersController.getUserById)
  .put(requireAuth, usersController.updateUser)
  .delete(requireAuth, usersController.removeUser);

export default router;

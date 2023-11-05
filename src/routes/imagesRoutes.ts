import express from "express";
import { pool } from "../../database/db-connection";
import { updateUserProfileImage } from "../../database/queries";
import * as userService from "../services/user.service";

const fs = require("fs");

const path = require("path");

const multer = require("multer");

const router = express.Router();

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
async function uploadUserImage(req: any, res: any) {
  const userId = req.body.userId;
  console.log(req.file);
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  } else {
    const response = await pool.query(updateUserProfileImage, [
      req.file.filename,
      userId,
    ]);
    if (response) {
      return res.status(200).json("File Uploaded Correctly!!!");
    } else {
      return res.status(400).json("Something went Wrong");
    }
  }
}

//Si quiero usar absolute path
/*  const fileName = req.params.fileName;
  const rootUploadsPath = path.join(__dirname, '..', '..', 'uploads'); // Adjust the number of '..' as needed
  const filePath = path.join(rootUploadsPath, fileName); */
async function getImage(req: any, res: any) {
  // const fileName = req.params.fileName;
  const userId = req.params.userId;
  const getUser = await userService.getUserById(userId);

  if (userId && getUser) {
    const fileName = getUser[0].image;
    const filePath = fileName
      ? path.join(__dirname, "../../uploads", fileName)
      : null;
    // Check if the file exists
    if (fs.existsSync(filePath)) {
      // If the file exists, send it as a response
      res.sendFile(filePath);
    } else {
      // If the file doesn't exist, send a 404 error
      res.status(404).send("File not found");
    }
  }
}

//I want to load multiple images change upload.single to upload.array
//Si quieres cambiar el paramtro files a otro nombre ten cuidado y cambialo tambien en la peticion del form data que le enviaras en este caso fields sera el campo que contiene la iamgen

router.route("/userProfile").post(upload.single("files"), uploadUserImage);
router.route("/userProfile/:userId").get(getImage);

export default router;

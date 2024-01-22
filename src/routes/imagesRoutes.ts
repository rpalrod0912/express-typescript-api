import express from "express";
import {
  getUserProfileImage,
  uploadUserImage,
} from "../services/images.service";

const multer = require("multer");

const router = express.Router();

//Endpoint por edit user profile image api/images/userProfile/:userId

const fileStorageEngine = multer.diskStorage({
  destination: (req: any, file: any, cb: any) => {
    cb(null, "uploads/");
  },
  filename: (req: any, file: any, cb: any) => {
    cb(null, Date.now() + "--" + file.originalname);
  },
});

const upload = multer({ storage: fileStorageEngine });

//Si quiero usar absolute path
/*  const fileName = req.params.fileName;
  const rootUploadsPath = path.join(__dirname, '..', '..', 'uploads'); // Adjust the number of '..' as needed
  const filePath = path.join(rootUploadsPath, fileName); */

//I want to load multiple images change upload.single to upload.array
//Si quieres cambiar el paramtro files a otro nombre ten cuidado y cambialo tambien en la peticion del form data que le enviaras en este caso fields sera el campo que contiene la iamgen

/*
To use userProfile Post /api/images/userProfile and in body aprams set form-data:
files -> imagefile 
userId -> user's id
*/
router.route("/userProfile").post(upload.single("files"), uploadUserImage);
router.route("/userProfile/:userId").get(getUserProfileImage);

export default router;

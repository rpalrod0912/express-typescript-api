import { pool } from "../../database/db-connection";
import { updateUserProfileImage } from "../../database/queries";
import { Posts } from "../interfaces/posts.interface";
import * as userService from "../services/user.service";

const fs = require("fs");

const path = require("path");

//Important get rootPath independent if proyect is in develop or production mode
const rootPath = process.cwd();

const uploadPostImage = async (req: any, res: any) => {
  const userId = req.body.userId;
  const getUser = await userService.getUserById(userId);
  const fileName = getUser[0].image;
  const filePath = fileName ? path.join(rootPath, "uploads/", fileName) : null;

  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  } else {
    if (filePath !== null) {
      await deleteImageFromStorage(filePath);
    }
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
};

const uploadUserImage = async (req: any, res: any) => {
  const userId = req.body.userId;
  const getUser = await userService.getUserById(userId);
  const fileName = getUser[0].image;
  const filePath = fileName ? path.join(rootPath, "uploads/", fileName) : null;

  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  } else {
    if (filePath !== null) {
      await deleteImageFromStorage(filePath);
    }
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
};

const getUserProfileImage = async (userImage: string) => {
  console.log(userImage);
  // const fileName = req.params.fileName;
  const filePath = userImage
    ? path.join(rootPath, "uploads/", userImage)
    : null;
  // Check if the file exists
  if (fs.existsSync(filePath)) {
    //Other way to send, send only the file in the response
    // res.sendFile(filePath);
    // If the file exists, read it and convert it to base64
    const fileData = fs.readFileSync(filePath, { encoding: "base64" });

    return fileData;
  }
  return null;
};

const getPostImage = async (post: Posts) => {
  // const fileName = req.params.fileName;
  const filePath = post.image
    ? path.join(rootPath, "uploads/", post.image)
    : null;
  // Check if the file exists
  if (fs.existsSync(filePath)) {
    //Other way to send, send only the file in the response
    // res.sendFile(filePath);
    // If the file exists, read it and convert it to base64
    const fileData = fs.readFileSync(filePath, { encoding: "base64" });

    return fileData;
  }
  return null;
};

//Delete Image
const deleteImageFromStorage = async (filePath: string) => {
  try {
    fs.unlinkSync(filePath);
  } catch (err) {
    // Handle any errors that occur during file deletion
    console.error("Error deleting the existing image:", err);
    return false;
  }
  return true;
};

export {
  uploadPostImage,
  getUserProfileImage,
  uploadUserImage,
  deleteImageFromStorage,
  getPostImage,
};

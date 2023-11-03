import express from "express";

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
function uploadFiles(req: any, res: any) {
  console.log(req.name);
  console.log(req.file);
  res.json({ message: "Successfully uploaded files" });
}

function getImage(req: any, res: any) {
  const fileName = req.params.fileName;
  const filePath = path.join(__dirname, "../../uploads", fileName);

  // Check if the file exists
  if (fs.existsSync(filePath)) {
    // If the file exists, send it as a response
    res.sendFile(filePath);
  } else {
    // If the file doesn't exist, send a 404 error
    res.status(404).send("File not found");
  }
}

router.route("/").post(upload.single("files"), uploadFiles);
router.route("/profileImage/:fileName").get(getImage);

export default router;

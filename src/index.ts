import express from "express";
import userRouter from "./routes/userRoutes";
import postsRouter from "./routes/postsRoutes";
import likesRouter from "./routes/likesRoutes";
import commentsRouter from "./routes/commentsRoutes";
import followersRouter from "./routes/followersRoutes";
import imagesRouter from "./routes/imagesRoutes";

const fs = require("fs");

const dotenv = require("dotenv");

const cors = require("cors");

const app = express();

const path = require("path");

// Set up the multer middleware
dotenv.config();

export const serverKey = process.env.TOKEN_KEY;

const corOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};

// const upload = multer({ dest: "uploads/" });

const createUploadsFolder = () => {
  const folderPath = "uploads";
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath);
  }
};

createUploadsFolder();

app.use(cors(corOptions)); //middleware que permite la conexión y el uso de endpoint desde cualquier cliente

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(express.json()); //middleware que transofrma la req.bidy a un json

const PORT = 3000;

app.use("/api/users", userRouter);
app.use("/api/posts", postsRouter);
app.use("/api/likes", likesRouter);
app.use("/api/comments", commentsRouter);
app.use("/api/followers", followersRouter);
app.use("/api/images", imagesRouter);

// Set up a route to handle file uploads
//I want to load multiple images change upload.single to upload.array
//Si quieres cambiar el paramtro files a otro nombre ten cuidado y cambialo tambien en la peticion del form data que le enviaras en este caso fields sera el campo que contiene la iamgen
app.post("/api/upload");

app.get("/api/getImage/:fileName", (req, res) => {
  const fileName = req.params.fileName;
  const filePath = path.join(__dirname, "../uploads", fileName);

  // Check if the file exists
  if (fs.existsSync(filePath)) {
    // If the file exists, send it as a response
    res.sendFile(filePath);
  } else {
    // If the file doesn't exist, send a 404 error
    res.status(404).send("File not found");
  }
});

app.get("/ping", (req, res) => {
  console.log("someone pinged here!!!");
  res.send("pong");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

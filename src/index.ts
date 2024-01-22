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

//Call Upload Folder if it not exists in the server
createUploadsFolder();

//Disable Corss Options, enable conexion to api in every client
app.use(cors(corOptions));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(express.json()); //middleware que transofrma la req.body a un json

const PORT = 3000;

app.use("/api/users", userRouter);
app.use("/api/posts", postsRouter);
app.use("/api/likes", likesRouter);
app.use("/api/comments", commentsRouter);
app.use("/api/followers", followersRouter);
app.use("/api/images", imagesRouter);

app.get("/ping", (req, res) => {
  console.log("someone pinged here!!!");
  res.send("pong");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

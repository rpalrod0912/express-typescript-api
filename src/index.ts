import express from "express";
import userRouter from "./routes/userRoutes";
import postsRouter from "./routes/postsRoutes";
import likesRouter from "./routes/likesRoutes";
import commentsRouter from "./routes/commentsRoutes";
import followersRouter from "./routes/followersRoutes";

const dotenv = require("dotenv");

const cors = require("cors");

const app = express();

dotenv.config();

export const serverKey = process.env.TOKEN_KEY;

app.use(cors()); //middleware que permite la conexión y el uso de endpoint desde cualquier cliente

app.use(express.json()); //middleware que transofrma la req.bidy a un json

const PORT = 3000;

app.use("/api/users", userRouter);
app.use("/api/posts", postsRouter);
app.use("/api/likes", likesRouter);
app.use("/api/comments", commentsRouter);
app.use("/api/followers", followersRouter);

app.get("/ping", (req, res) => {
  console.log("someone pinged here!!!");
  res.send("pong");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

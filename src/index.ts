import express from "express";
import userRouter from "./routes/userRoutes";

const app = express();
app.use(express.json()); //middleware que transofrma la req.bidy a un json

const PORT = 3000;

app.use("/api/users", userRouter);

app.get("/ping", (req, res) => {
  console.log("someone pinged here!!!");
  res.send("pong");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

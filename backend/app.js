import express from "express";
import cookieParser from "cookie-parser";
import userRouter from "./src/routes/userRoutes.js";
import blogRouter from "./src/routes/blogRoutes.js";
import errorMiddleware from "./src/middlewares/errorMiddleware.js";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://localhost:3001",
      "http://localhost:3002",
      "http://localhost:3003",
    ],
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use("/api", userRouter);
app.use("/api", blogRouter);

app.use(errorMiddleware);

export default app;

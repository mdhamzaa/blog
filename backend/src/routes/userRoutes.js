import express from "express";
import { isAuthenticated } from "../middlewares/authMiddleware.js";
import {
  getProfile,
  login,
  logout,
  register,
  updateProfile,
} from "../controller/userController.js";

const userRouter = express.Router();

userRouter.route("/register").post(register);

userRouter.route("/login").post(login);

userRouter.route("/logout").get(logout);

userRouter.route("/userProfile").get(isAuthenticated, getProfile);

userRouter.route("/updateProfile").put(isAuthenticated, updateProfile);

export default userRouter;

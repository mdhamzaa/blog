import { userCollection } from "../models/UserModel.js";
import ErrorHandler from "../utils/errorHandler.js";
import { catchAsyncError } from "./catchTryMiddleware.js";
import jwt, { decode } from "jsonwebtoken";

export const isAuthenticated = catchAsyncError(async (req, res, next) => {
  const { token } = req.cookies;
  console.log("calling req.cookies and token"), req.cookies;
  try {
    if (!token) {
      throw new ErrorHandler("Not Logged In", 401);
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    // Check if the decoded token has the required properties
    console.log("calling decoded"), decode;
    if (!decoded || !decoded._id) {
      throw new ErrorHandler("Invalid Token", 401);
    }

    req.user = await userCollection.findById(decoded._id);

    if (!req.user) {
      throw new ErrorHandler("User not found", 401);
    }

    next();
  } catch (error) {
    next(error);
  }
});

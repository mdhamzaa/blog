import getDataUri from "../utils/dataUri.js";
import cloudinary from "cloudinary";
import ErrorHandler from "../utils/errorHandler.js";
import { sendToken } from "../utils/sendToken.js";
import { catchAsyncError } from "../middlewares/catchTryMiddleware.js";
import { userCollection } from "../models/UserMOdel.js";
import bcrypt from "bcrypt";

export const register = catchAsyncError(async (req, res, next) => {
  const { name, email, password, profilePicUrl } = req.body;
  console.log("calling req body", req.body);

  if (!name || !email || !password || !profilePicUrl)
    return next(new ErrorHandler("Please enter all fields", 400));

  let user = await userCollection.findOne({ email });

  console.log("calling user in the registered user", user);

  if (user) return next(new ErrorHandler("User Already Exists", 409));

  // Hash the password manually before creating the user
  const hashedPassword = await bcrypt.hash(password, 10);

  user = await userCollection.create({
    name,
    email,
    password: hashedPassword, // Include the hashed password field here
    profilePicUrl,
  });

  console.log("calling user in the registered user", user);

  sendToken(res, user, "Registered Successfully", 201);
});

export const login = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;

  console.log("calling login body", req.body);

  if (!email || !password)
    return next(new ErrorHandler("Please enter all fields", 400));

  const user = await userCollection.findOne({ email }).select("+password");

  if (!user) return next(new ErrorHandler("Incorrect Email or Password", 401));

  const isMatch = await user.comparePassword(password);

  if (!isMatch)
    return next(new ErrorHandler("Incorrect Email or Password", 401));

  sendToken(res, user, `Welcome back, ${user?.name}`, 200);
});

export const logout = catchAsyncError(async (req, res, next) => {
  res
    .status(200)
    .cookie("token", null, {
      maxAge: 0,
      httpOnly: true,
      secure: true,
      sameSite: "none",
    })
    .json({
      success: true,
      message: "Logged Out Successfully",
    });
});

export const updateProfile = catchAsyncError(async (req, res, next) => {
  const { name } = req.body;

  const user = await userCollection.findById(req?.user?._id);

  if (!user) {
    return next(new ErrorHandler("User not found", 404));
  }

  if (name) user.name = name;

  const file = req?.file;

  if (file) {
    const fileUri = getDataUri(file);
    const mycloud = await cloudinary.v2.uploader.upload(fileUri?.content);

    await cloudinary.v2.uploader.destroy(user?.profilePic?.public_id);

    user.profilePic = {
      public_id: mycloud.public_id,
      imageUrl: mycloud.secure_url,
    };
  }

  await user.save();

  res.status(200).json({
    success: true,
    message: "Profile Updated Successfully",
    user,
  });
});

export const getProfile = catchAsyncError(async (req, res, next) => {
  const user = await userCollection.findById(req?.user?._id);

  res.status(200).json({
    success: true,
    user,
  });
});

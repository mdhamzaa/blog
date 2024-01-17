import mongoose, { Schema } from "mongoose";

import validator from "validator";

import jwt from "jsonwebtoken";

import bcrypt from "bcrypt";

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, "Please Enter your name"],
  },
  email: {
    type: String,
    required: [true, "Please enter your email"],
    unique: true,
    validate: validator.isEmail,
  },
  password: {
    type: String,
    minLength: [4, "passwoes must be atleast of the 4 characters"],
    select: false,
  },
  profilePicUrl: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },

  resetPasswordToken: String,
  resetPasswordExpire: String,
});

userSchema.methods.getJwt = function () {
  return jwt.sign({ _id: this._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: "7d",
  });
};

userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

export const userCollection = mongoose.model("userCollection", userSchema);

import mongoose from "mongoose";

export const connectDB = async () => {
  mongoose.connect(`${process.env.MONGODB_URI}`);
  mongoose.connection.on("connected", () => console.log("DB Connected!"));
  mongoose.connection.on("error", console.error);
  mongoose.connection.on("disconnected", () => console.log("DB Disconnected!"));
};

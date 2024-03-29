import app from "./app.js";
import { connectDB } from "./src/config.js/database.js";
import cloudinary from "cloudinary";

connectDB();
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLIENT_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

app.listen(process.env.PORT, () => {
  console.log("server connected and running on port :", process.env.PORT);
});

import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config()

export const ConnectDB = async () => {
  const mongoUrl = process.env.MONGO_URL;
  try {
    if (!mongoUrl) {
      console.log(
        "❌ Please provide a valid MONGO_URL in environment variables."
      );
    }
    await mongoose.connect(mongoUrl);
    const user = mongoose.connection.host;
    console.log(`✅ Mongoose connected to ${user}`);
  } catch (e) {
    console.log("❌ Failed to connect to MongoDB:", e.message);
  }
};

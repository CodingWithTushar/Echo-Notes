import jwt from "jsonwebtoken";
import UserModel from "../models/user.model.js";
import dotenv from "dotenv";

dotenv.config()

export const protectRoute = async (req, res, next) => {
  try {
    const JWT_SECRET = process.env.JWT_SECRET;
    const token = req.cookies.token;

    if (!JWT_SECRET) {
      return res
        .status(500)
        .json({ message: "Server configuration error: JWT secret missing." });
    }

    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized: No token provided." });
    }

    const decoded = jwt.verify(token, JWT_SECRET);

    const user = await UserModel.findOne({ _id: decoded.id }).select(
      "-password"
    );

    if (!user) {
      return res
        .status(400)
        .json({ message: "User not found or token invalid" });
    }

    req.user = user;

    next();
  } catch (e) {
    console.error("Authorization error:", e);
    res
      .status(500)
      .json({ message: `Error occurred during authorization ${e.message}` });
  }
};

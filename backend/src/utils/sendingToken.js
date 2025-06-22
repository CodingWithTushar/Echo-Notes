import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config()

export const SendToken = async (userId , res) => {
  try {
    const JWT_SECRET = process.env.JWT_SECRET;
    
    if (!JWT_SECRET) {
        return res.status(400).json({
            message: "Please provide JWT_SECRET",
        });
    }
    if (!userId) {
      return res.status(400).json({
        message: "Error Happened While Creating a User!",
      });
    }
    const token = jwt.sign({id:userId}, JWT_SECRET, {
      expiresIn: "7d",
    });

    res.cookie("token", token, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      sameSite: "strict",
    //   secure: process.env.NODE_ENV === "production",
    });
  } catch (error) {}
};

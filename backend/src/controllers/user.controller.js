import UserModel from "../models/user.model.js";
import { SendToken } from "../utils/sendingToken.js";
import bcrypt from "bcryptjs";

export const SignUp = async (req, res) => {
  const { fullName, email, password } = req.body;
  try {
    if (!fullName || !email || !password) {
      return res.status(400).json({
        message: "All fields (Full Name, Email, Password) are required.",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        message: "Password must be at least 6 characters long.",
      });
    }

    const existinguser = await UserModel.findOne({ email });

    if (existinguser) {
      return res.status(409).json({
        message: "An account with this email already exists. Please log in.",
      });
    }
    const RandomNumber = Math.floor(Math.random() * 100) + 1;
    const avatarLink = `https://avatar.iran.liara.run/public/${RandomNumber}.png`;

    const salt = bcrypt.genSaltSync(7);
    const hasedpassword = await bcrypt.hash(password, salt);

    const user = await UserModel.create({
      fullName: fullName,
      email: email,
      password: hasedpassword,
      profilePic: avatarLink,
    });

    if (!user) {
      return res.status(500).json({
        message: "Failed to create user account. Please try again.",
      });
    }

    const userId = user._id;
    SendToken(userId, res);

    res.status(200).json({
      user,
    });
  } catch (e) {
    res.status(500).json({
      message: "Internal server error",
      error: e.message,
    });
  }
};

export const LogIn = async (req, res) => {
  const { password, email } = req.body;
  try {
    if (!email || !password) {
      return res.status(400).json({
        message: "Email and Password are required.",
      });
    }

    const user = await UserModel.findOne({
      email: email,
    }).select("+password");

    if (!user) {
      return res.status(401).json({
        message: "Invalid email or password.",
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({
        message: "Invalid email or password",
      });
    }

    const userId = user._id;

    SendToken(userId, res);
    res.status(200).json({
      user,
    });
  } catch (e) {
    res.status(500).json({
      message: "Internal server error",
      error: e.message,
    });
  }
};

export const LogOut = async (req, res) => {
  try {
    await res.clearCookie("token");
    res.status(200).json({
      message: "You have been logout successfully",
    });
  } catch (e) {
    res.status(500).json({
      message: "Internal server error",
      error: e.message,
    });
  }
};

export const Me = async (req, res) => {
  const user = req.user;
  try {
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found." });
    }
    res.status(200).json({
      user,
    });
  } catch (e) {
    res.status(500).json({
      message: "Internal server error",
      error: e.message,
    });
  }
};

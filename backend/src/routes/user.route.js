import express from "express";

import { LogIn, LogOut, Me, SignUp } from "../controllers/user.controller.js";
import { protectRoute } from "../middleware/middleware.js";

export const UserRouter = express.Router();

UserRouter.post("/signup", SignUp);
UserRouter.post("/login", LogIn);
UserRouter.post("/logout", LogOut);
UserRouter.get("/me" , protectRoute, Me);

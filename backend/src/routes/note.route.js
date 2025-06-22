import express from "express";

import { protectRoute } from "../middleware/middleware.js";
import {
  CreateNote,
  DeleteNoteById,
  EditNoteById,
  GetAllNoteById,
  GetNoteById,
} from "../controllers/note.controller.js";

export const NoteRouter = express.Router();

NoteRouter.use(protectRoute);

NoteRouter.post("/create", CreateNote);
NoteRouter.put("/:id", EditNoteById);
NoteRouter.delete("/:id", DeleteNoteById);
NoteRouter.get("/user/:id", GetAllNoteById);
NoteRouter.get("/:id", GetNoteById);

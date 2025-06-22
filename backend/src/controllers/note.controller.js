import mongoose from "mongoose";
import NoteModel from "../models/note.model.js";

export const CreateNote = async (req, res) => {
  const { title, content, category } = req.body;
  const user = req.user;
  try {
    if (!title || !content || !category) {
      return res.status(400).json({
        message: "All fields (Title, Content, Category) are required.",
      });
    }

    const existingTitle = await NoteModel.findOne({
      title: title,
      author: user._id,
    });

    if (existingTitle) {
      return res.status(409).json({
        message: "You can not write one title two times.",
      });
    }

    const note = await NoteModel.create({
      title: title,
      content: content,
      category: category,
      author: user._id,
    });

    if (!note) {
      return res
        .status(500)
        .json({ message: "Failed to create note. Please try again." });
    }

    res.status(200).json({
      note,
    });
  } catch (e) {
    res.status(500).json({
      message: "Internal server error",
      error: e.message,
    });
  }
};

export const EditNoteById = async (req, res) => {
  const { id } = req.params;
  const { title, content, category } = req.body;
  try {
    if (!id) {
      return res.status(400).json({
        message: "Valid Note ID is required.",
      });
    }

    if (!title && !content && !category) {
      return res.status(400).json({
        message:
          "At least one field (title, content, or category) must be provided for update.",
      });
    }

    const note = await NoteModel.findByIdAndUpdate(
      id,
      {
        title: title,
        content: content,
        category: category || "Personal",
      },
      { new: true }
    );

    if (!note) {
      return res.status(404).json({
        message: "Note not found or you are not authorized to edit this note.",
      });
    }

    res.status(200).json({
      message: "Note updated successfully",
      note: note,
    });
  } catch (e) {
    res.status(500).json({
      message: "Internal server error",
      error: e.message,
    });
  }
};

export const DeleteNoteById = async (req, res) => {
  const { id } = req.params;
  try {
    if (!id) {
      return res.status(400).json({
        message: "Note ID is required",
      });
    }

    const note = await NoteModel.findByIdAndDelete(id);

    if (!note) {
      return res.status(404).json({
        message:
          "Note not found or you are not authorized to delete this note.",
      });
    }

    res.status(200).json({
      message: "You have successfully Deleted Note",
    });
  } catch (e) {
    res.status(500).json({
      message: "Internal server error",
      error: e.message,
    });
  }
};

export const GetNoteById = async (req, res) => {
  const { id } = req.params;
  const authorId = req.user._id;
  try {
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Valid Note ID is required.",
      });
    }

    const note = await NoteModel.findById({ _id: id, author: authorId });

    if (!note) {
      return res.status(404).json({
        message: "Note not found or you are not authorized to view this note.",
      });
    }

    res.status(200).json({
      note,
    });
  } catch (e) {
    res.status(500).json({
      message: "Internal server error",
      error: e.message,
    });
  }
};

export const GetAllNoteById = async (req, res) => {
  const id = req.user._id;
  try {
    if (!id) {
      return res.status(400).json({
        message: "USER ID is required",
      });
    }

    const notes = await NoteModel.find({
      author: id,
    });

    if (!notes) {
      return res.status(400).json({
        message: "failed to fetch Notes",
      });
    }

    res.status(200).json({
      notes,
    });
  } catch (e) {
    res.status(500).json({
      message: "Internal server error",
      error: e.message,
    });
  }
};

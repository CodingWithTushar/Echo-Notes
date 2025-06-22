import mongoose from "mongoose";

const ObjectId = mongoose.Schema.Types.ObjectId;
const model = mongoose.model;
const Schema = mongoose.Schema;

const NoteSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    content: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      enum: [
        "Work",
        "Personal",
        "Study",
        "Ideas",
        "Health",
        "Finance",
        "Travel",
        "Shopping",
        "Projects",
        "Journal",
      ],
      default: "Personal",
    },
    author: {
      type: ObjectId,
      ref: "user",
      required: true,
    },
  },
  { timestamps: true }
);

const NoteModel = model("note", NoteSchema);

export default NoteModel;

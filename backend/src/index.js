import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import path from "path";

import { UserRouter } from "./routes/user.route.js";
import { NoteRouter } from "./routes/note.route.js";
import { ConnectDB } from "./db/mongoose.db.js";

dotenv.config()

const app = express();
const PORT = process.env.PORT || 3001;
const __dirname = path.resolve()

app.use(express.json());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(cookieParser());


app.use("/api/user", UserRouter);
app.use("/api/note", NoteRouter);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

app.get("/{*splat}", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
});
}

app.use((err, req, res, next) => {
  console.error(err); 
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(statusCode).json({
    success: false,
    message,

  });
});

app.listen(PORT, () => {
  ConnectDB();
  console.log(`🚀 Server is running on ${PORT}`);
});

import { axiosInstance } from "./axios";

export const AuthUser = async () => {
  try {
    const response = await axiosInstance.get("/user/me");
    return response.data;
  } catch (e) {
    console.error("Failed to fetch authenticated user:", e.message);
    return null;
  }
};

export const SignUp = async (formData) => {
  try {
    const response = await axiosInstance.post("/user/signup", formData);
    return response.data;
  } catch (e) {
    console.error("Sign up failed:", e.message);
    return null;
  }
};

export const LogIn = async (formData) => {
  try {
    const response = await axiosInstance.post("/user/login", formData);
    return response.data;
  } catch (e) {
    console.error("Login failed:", e.message);
    return null;
  }
};

export const LogOut = async () => {
  try {
    const response = await axiosInstance.post("/user/logout");
    return response.data;
  } catch (e) {
    console.error("Logout failed:", e.message);
    return null;
  }
};

export const GetAllNoteById = async (id) => {
  try {
    const response = await axiosInstance.get(`/note/user/${id}`);
    return response.data;
  } catch (e) {
    console.error(`Failed to get notes for user ID ${id}:`, e.message);
    return null;
  }
};

export const CreateNote = async (noteData) => {
  try {
    const response = await axiosInstance.post("/note/create", noteData);
    return response.data;
  } catch (e) {
    console.error("Failed to create note:", e.message);
    return null;
  }
};

export const EditNoteById = async (id, noteData) => {
  try {
    const response = await axiosInstance.put(`/note/${id}`, noteData);
    return response.data;
  } catch (e) {
    console.error(`Failed to edit note with ID ${id}:`, e.message);
    return null;
  }
};

export const GetNoteById = async (id) => {
  try {
    const response = await axiosInstance.get(`/note/${id}`);
    return response.data;
  } catch (e) {
    console.error(`Failed to get note with ID ${id}:`, e.message);
    return null;
  }
};

export const DeleteNoteById = async (id) => {
  try {
    const response = await axiosInstance.delete(`/note/${id}`);
    return response.data;
  } catch (e) {
    console.error(`Failed to delete note with ID ${id}:`, e.message);
    return null;
  }
};

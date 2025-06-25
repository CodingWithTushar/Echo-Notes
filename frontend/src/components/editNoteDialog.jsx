import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { X } from "lucide-react";
import Input from "./input";
import toast from "react-hot-toast";

import { EditNoteById, GetNoteById } from "../lib/apiCalls.js";
import LoadingPage from "./loadingPage.jsx";

const EditNoteDialog = ({ onClose }) => {
  const { id } = useParams();

  const {
    data: noteDataFromServer,
    isLoading: isNoteLoading,
    error: noteError,
  } = useQuery({
    queryKey: ["note", id],
    queryFn: () => GetNoteById(id),
    enabled: !!id,
  });

  const [noteForm, setNoteForm] = useState({
    title: "",
    content: "",
    category: "Personal",
  });

  useEffect(() => {
    if (noteDataFromServer && noteDataFromServer.note) {
      const { title, content, category } = noteDataFromServer.note;
      setNoteForm({
        title: title || "",
        content: content || "",
        category: category || "Personal",
      });
    }
  }, [noteDataFromServer]);

  const queryClient = useQueryClient();

  const {
    mutate: editNoteFn,
    isPending: isEditingPending,
    error: editError,
  } = useMutation({
    mutationFn: (data) => EditNoteById(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      queryClient.invalidateQueries({ queryKey: ["note", id] });
      toast.success("Note has been edited successfully!");
      onClose();
    },
    onError: (err) => {
      const errorMessage =
        err.response?.data?.message || "Failed to edit note.";
      toast.error(errorMessage);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    editNoteFn(noteForm);
  };

  if (isNoteLoading) {
    return <LoadingPage />;
  }

  if (noteError) {
    return (
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.6)",
          backdropFilter: "blur(5px)",
          WebkitBackdropFilter: "blur(5px)",
        }}
      >
        <div className="relative bg-base-100 text-base-content rounded-xl shadow-2xl p-6 w-full max-w-lg mx-auto">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 btn btn-sm btn-ghost btn-circle text-base-content/70 hover:text-base-content transition-colors duration-200"
            title="Close Dialog"
          >
            <X className="w-5 h-5" />
          </button>
          <div role="alert" className="alert alert-error text-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="stroke-current shrink-0 h-6 w-6 mx-auto"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>
              Error loading note for editing:{" "}
              {noteError.message || "Note not found."}
            </span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{
        backgroundColor: "rgba(0, 0, 0, 0.6)",
        backdropFilter: "blur(5px)",
        WebkitBackdropFilter: "blur(5px)",
      }}
    >
      <div className="relative bg-base-100 text-base-content rounded-xl shadow-2xl p-6 w-full max-w-lg mx-auto transform transition-all scale-100 hover:scale-105 opacity-100 animate-fade-in-up">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 btn btn-sm btn-ghost btn-circle text-base-content/70 hover:text-base-content transition-colors duration-200"
          title="Close Dialog"
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-3xl font-extrabold text-center text-primary animate-fade-in-down mb-6">
          Edit Note
        </h2>

        {editError && (
          <div role="alert" className="alert alert-error mb-4 animate-fade-in">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="stroke-current shrink-0 h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>
              {editError.response?.data?.message || "Failed to save changes!"}
            </span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Input
            label="Title"
            type="text"
            placeholder="Title of your note..."
            className={
              "bg-base-200 text-base-content placeholder-base-400 border border-base-300 focus:border-primary-500 focus:ring-primary-500"
            }
            value={noteForm.title}
            onChange={(e) =>
              setNoteForm({ ...noteForm, title: e.target.value })
            }
          />

          <div className="form-control flex flex-col">
            <label className="label">
              <span className="label-text text-base-content font-medium my-1">
                Content
              </span>
            </label>
            <textarea
              placeholder="Start writing your note here..."
              className="textarea textarea-bordered w-full h-32 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500
                         bg-base-200 text-base-content resize-y rounded-lg text-base
                         transition-all duration-200 custom-scrollbar-textarea placeholder-base-400"
              value={noteForm.content}
              onChange={(e) =>
                setNoteForm({ ...noteForm, content: e.target.value })
              }
            ></textarea>
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text text-base-content font-medium my-1">
                Category
              </span>
            </label>
            <select
              className="select select-bordered w-full bg-base-200 text-base-content focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 rounded-lg"
              value={noteForm.category}
              onChange={(e) =>
                setNoteForm({ ...noteForm, category: e.target.value })
              }
            >
              <option value="Personal">Personal</option>
              <option value="Work">Work</option>
              <option value="Study">Study</option>
              <option value="Ideas">Ideas</option>
              <option value="Health">Health</option>
              <option value="Finance">Finance</option>
              <option value="Travel">Travel</option>
              <option value="Shopping">Shopping</option>
              <option value="Projects">Projects</option>
              <option value="Journal">Journal</option>
            </select>
          </div>

          <div className="flex items-center justify-end gap-3 mt-4">
            <button
              type="button"
              title="Cancel"
              className="px-6 py-2 bg-base-300 text-base-content-light rounded-lg hover:bg-base-400 transition-colors cursor-pointer"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              title="Save Changes"
              className="px-6 py-2 bg-action-edit-500 text-white font-semibold rounded-lg shadow-md hover:bg-action-edit-600 transition-colors cursor-pointer"
              disabled={isEditingPending}
            >
              {isEditingPending ? (
                <>
                  <span className="loading loading-spinner"></span>
                  Saving...
                </>
              ) : (
                "Save Changes"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditNoteDialog;

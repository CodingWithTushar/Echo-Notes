import { X } from "lucide-react";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import Input from "./input.jsx";
import { CreateNote } from "../lib/apiCalls.js";

const CreateNoteDialog = ({ onClose }) => {
  const [noteData, setNoteData] = useState({
    title: "",
    content: "",
    category: "Personal",
  });

  const queryClient = useQueryClient();

  const {
    mutate: createNoteFn,
    isPending,
    error,
  } = useMutation({
    mutationFn: CreateNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      toast.success("Note has been created successfully!");
      setNoteData({
        title: "",
        content: "",
        category: "Personal",
      });
      onClose();
    },
    onError: (err) => {
      toast.error(err.response?.data?.message || "Failed to create note!");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    createNoteFn(noteData);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{
        backgroundColor: "rgba(0, 0, 0, 0.6)",
        backdropFilter: "blur(5px)",
        WebkitBackdropFilter: "blur(5px)",
      }}
    >
      <div className="relative bg-base-100 text-base-content rounded-xl shadow-2xl p-3 w-full max-w-lg mx-auto transform transition-all scale-100 hover:scale-105 opacity-100 animate-fade-in-up">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 btn btn-sm btn-ghost btn-circle text-base-content/70 hover:text-base-content transition-colors duration-200"
          title="Close Dialog"
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-3xl font-extrabold text-center text-primary animate-fade-in-down">
          Create New Note
        </h2>

        {error && (
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
              {error.response?.data?.message || "Something went wrong!"}
            </span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <Input
            label="Title"
            type="text"
            placeholder="Title of your note..."
            className={""}
            autoFocus
            value={noteData.title}
            onChange={(e) =>
              setNoteData({ ...noteData, title: e.target.value })
            }
          />

          <div className="form-control flex flex-col">
            <label className="label">
              <span className="label-text text-gray-700 dark:text-gray-300 font-medium my-1">
                Content
              </span>
            </label>
            <textarea
              placeholder="Start writing your note here..."
              className="textarea textarea-bordered w-full h-32 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary
                         bg-base-200 text-base-content resize-y rounded-lg text-base
                         transition-all duration-200 custom-scrollbar-textarea"
              value={noteData.content}
              onChange={(e) =>
                setNoteData({ ...noteData, content: e.target.value })
              }
            ></textarea>
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text text-gray-700 dark:text-gray-300 font-medium my-1">
                Categroy
              </span>
            </label>
            <select
              className="select select-bordered w-full bg-base-200 text-base-content focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary rounded-lg"
              value={noteData.category}
              onChange={(e) =>
                setNoteData({ ...noteData, category: e.target.value })
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
              className="btn btn-ghost text-base-content hover:bg-base-200 transition-colors duration-200 px-6"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              title="Create Note"
              className="btn btn-primary text-primary-content hover:bg-primary-focus transition-colors duration-200 px-6"
              disabled={isPending}
            >
              {isPending ? (
                <>
                  <span className="loading loading-spinner"></span>
                  Creating...
                </>
              ) : (
                "Create Note"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateNoteDialog;

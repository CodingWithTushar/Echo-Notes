import { Tag, Calendar, Edit, Trash2 } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

import { DeleteNoteById } from "../lib/apiCalls";
import LoadingPage from "./loadingPage";
import DeleteDialog from "./deleteNoteDialog.jsx";

const NoteCard = ({ note }) => {
  const [showModel, setshowModel] = useState(false);
  const { _id, title, content, category, createdAt, updatedAt } = note;

  const queryClient = useQueryClient();

  const {
    mutate: DeleteNoteFn,
    isPending,
    error,
  } = useMutation({
    mutationFn: DeleteNoteById,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      setshowModel(false);
      toast.success("Note have been Deleted ");
    },
  });
  const id = _id;

  const handleDelete = async (e) => {
    e.preventDefault();
    DeleteNoteFn(id);
  };

  if (isPending) {
    return <LoadingPage />;
  }

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <>
      <div
        className="
        bg-base-100
        text-base-content
        rounded-xl shadow-lg hover:shadow-xl
        transition-all duration-300 transform hover:-translate-y-1
        p-6 flex flex-col h-full border border-base-200
        relative overflow-hidden
      "
      >
        <span
          className="
          absolute top-0 right-0
          bg-primary text-primary-content
          text-xs font-semibold
          px-3 py-1 rounded-bl-lg rounded-tr-xl
          shadow-md
          flex items-center gap-1
        "
        >
          <Tag size={14} /> {category}
        </span>

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
        <Link to={`/note/${note._id}`}>
          <h3 className="text-2xl font-bold text-base-content mb-2 mt-4 leading-tight pr-10 truncate">
            {title}
          </h3>
        </Link>
        <p className="text-base-content/80 text-base mb-4 flex-grow line-clamp-5">
          {" "}
          {content}
        </p>

        <div className="mt-auto pt-4 border-t border-base-200 flex justify-between items-end text-sm text-base-content/60">
          {" "}
          <div className="flex items-center gap-2">
            <Calendar size={16} className="text-base-content/40" />{" "}
            <span className="text-xs">
              Created: {formatDate(createdAt)}
              {createdAt !== updatedAt && (
                <span className="block text-base-content/40">
                  Updated: {formatDate(updatedAt)}
                </span>
              )}
            </span>
          </div>
          <div className="flex gap-2">
            <Link to={`/note/${id}`}>
              <button
                className="btn btn-sm btn-ghost text-green-300 hover:bg-green-100/10 transition-colors duration-200 p-2 rounded-full"
                title="Edit Note"
              >
                <Edit size={18} />
              </button>{" "}
            </Link>
            <button
              className="btn btn-sm btn-ghost text-error hover:bg-error/10 transition-colors duration-200 p-2 rounded-full" // Using error for delete
              title="Delete Note"
              onClick={() => setshowModel(true)}
            >
              <Trash2 size={18} />
            </button>
          </div>
        </div>
      </div>
      {showModel && (
        <DeleteDialog
          handleDelete={handleDelete}
          onClose={() => setshowModel(false)}
        />
      )}
    </>
  );
};

export default NoteCard;

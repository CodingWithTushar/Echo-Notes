import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { Edit, Trash2 } from "lucide-react";
import { useState } from "react";

import { DeleteNoteById, GetNoteById } from "../lib/apiCalls.js";
import LoadingPage from "../components/loadingPage.jsx";
import EditNoteDialog from "../components/editNoteDialog.jsx";

const DeleteConfirmationModal = ({ onClose, onConfirm, isPending }) => (
  <div className="fixed inset-0 bg-base-900 bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-base-100 p-8 rounded-lg shadow-xl max-w-sm w-full text-center text-base-content hover:scale-105 transition-all duration-200">
      <h2 className="text-2xl font-bold mb-4">Confirm Delete</h2>
      <p className="text-base-content/80 mb-6">
        Are you sure you want to delete this note? This action cannot be undone.
      </p>
      <div className="flex justify-center gap-4">
        <button
          onClick={onClose}
          disabled={isPending}
          className="px-6 py-2 bg-base-300 text-base-content-light rounded-lg hover:bg-base-400 transition-colors cursor-pointer"
        >
          Cancel
        </button>
        <button
          onClick={onConfirm}
          disabled={isPending}
          className="px-6 py-2 bg-error-500 text-white rounded-lg hover:bg-error-600 transition-colors cursor-pointer"
        >
          {isPending ? "Deleting..." : "Delete"}
        </button>
      </div>
    </div>
  </div>
);

const NotePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModel, setshowEditModel] = useState(false);

  const {
    data,
    isLoading,
    error: getNoteError,
  } = useQuery({
    queryKey: ["note", id],
    queryFn: () => GetNoteById(id),
    enabled: !!id,
  });

  const note = data?.note;

  const queryClient = useQueryClient();

  const {
    mutate: deleteNoteFn,
    isPending: isDeleting,
    error: deleteNoteError,
  } = useMutation({
    mutationFn: DeleteNoteById,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      navigate("/");
    },
    retry: false,
  });

  const handleDeleteConfirm = () => {
    deleteNoteFn(id);
    setShowDeleteModal(false);
  };

  if (isLoading) {
    return <LoadingPage />;
  }

  if (getNoteError || deleteNoteError || !note) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-base-50 text-base-content">
        <div className="text-center p-8 bg-base-100 rounded-lg shadow-md">
          <p className="text-xl font-semibold text-error-500 mb-4">
            Error loading note.
          </p>
          <p className="text-base-content/80">
            Please check the note ID or try again later.
            {(getNoteError || deleteNoteError) && (
              <span className="block mt-2 text-sm text-error-400">
                Details:{" "}
                {getNoteError?.message ||
                  deleteNoteError?.message ||
                  "Unknown error"}
              </span>
            )}
          </p>
        </div>
      </div>
    );
  }

  const formatDate = (dateString) =>
    dateString ? new Date(dateString).toLocaleDateString() : "N/A";

  return (
    <div className="flex items-center h-[85vh] justify-center bg-primary-50 text-base-content">
      <div className="w-full max-w-4xl bg-base-100 rounded-2xl shadow-xl overflow-hidden md:flex flex-col md:flex-row border hover:scale-105 transition-all duration-200">
        <div className="p-4 md:p-10 flex-1 flex flex-col justify-between max-h-[75vh] overflow-y-auto custom-scrollbar">
          <div>
            {note.category && (
              <span className="inline-block bg-primary-100 text-primary-700 text-sm font-semibold px-4 py-1 rounded-full mb-3 shadow-sm">
                {note.category}
              </span>
            )}

            <h1 className="text-xl md:text-3xl font-bold text-base-content leading-tight mb-3 break-words">
              {note.title || "Untitled Note"}
            </h1>

            <p className="text-md text-base-content/80 leading-relaxed whitespace-pre-wrap mb-8">
              {note.content || "No content for this note."}
            </p>
          </div>

          <div className="text-sm text-base-content/60 pt-4 border-t border-base-200">
            <p>Created: {formatDate(note.createdAt)}</p>
            <p>Last Updated: {formatDate(note.updatedAt)}</p>
          </div>
        </div>

        <div className="bg-base-50 p-6 md:p-10 flex flex-col justify-end items-center md:items-start space-y-4 md:w-64 border-t md:border-t-0 md:border-l border-base-200">
          <button
            onClick={() => setshowEditModel(true)}
            className="w-full flex items-center justify-center gap-3 px-6 py-3 bg-primary-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-500 focus:outline-none focus:ring-4 focus:ring-primary-300 transition-all duration-300 transform hover:scale-105 cursor-pointer"
          >
            <Edit size={20} />
            Edit Note
          </button>
          <button
            onClick={() => setShowDeleteModal(true)}
            className="w-full flex items-center justify-center gap-3 px-6 py-3 bg-error-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-500 focus:outline-none focus:ring-4 focus:ring-error-300 transition-all duration-300 transform hover:scale-105 cursor-pointer"
          >
            <Trash2 size={20} />
            Delete Note
          </button>
        </div>
      </div>

      {showDeleteModal && (
        <DeleteConfirmationModal
          onClose={() => setShowDeleteModal(false)}
          onConfirm={handleDeleteConfirm}
          isPending={isDeleting}
        />
      )}

      {showEditModel && (
        <EditNoteDialog
          noteData={note} 
          onClose={() => setshowEditModel(false)}
        />
      )}
    </div>
  );
};

export default NotePage;

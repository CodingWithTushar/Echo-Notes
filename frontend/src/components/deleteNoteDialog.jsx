import { Trash2, X } from "lucide-react";

const DeleteNoteDialog = ({ handleDelete, onClose }) => {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{
        backgroundColor: "rgba(0, 0, 0, 0.6)",
        backdropFilter: "blur(5px)",
        WebkitBackdropFilter: "blur(5px)",
      }}
    >
      <div className="relative flex flex-col bg-base-300 text-base-content border border-base-200 rounded-lg p-8 shadow-2xl max-w-sm w-full transform transition-all scale-100 opacity-100 animate-fade-in-up hover:scale-105">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 btn btn-sm btn-ghost btn-circle text-base-content/70 hover:text-base-content"
          title="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-3xl font-extrabold text-center text-primary mb-6 animate-fade-in-down">
          Delete Note
        </h2>
        <p className="text-lg text-center mb-6 text-base-content/90">
          Are you sure you want to delete this Note? This action cannot be
          undone.
        </p>
        <div className="flex items-center justify-center gap-4 py-2">
          <button
            title="Cancel"
            className="btn btn-ghost text-base-content hover:bg-base-200 transition-colors duration-200 px-6"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            title="Delete Note"
            className="btn btn-error text-error-content hover:bg-error-focus transition-colors duration-200 px-6"
            onClick={handleDelete}
          >
            <Trash2 className="w-4 h-4 mr-2" /> Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteNoteDialog;

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { PlusCircle, Search } from "lucide-react";

import Input from "../components/input.jsx";
import { AuthUser, GetAllNoteById } from "../lib/apiCalls.js";
import LoadingPage from "../components/loadingPage.jsx";
import NoteCard from "../components/noteCard.jsx";
import CreateNoteDialog from "../components/createNoteDialog.jsx";

const HomePage = () => {
  const [searchingValue, setSearchingValue] = useState("");
  const [showModel, setshowModel] = useState(false);

  const { data: authUser, isLoading: authUserLoading } = useQuery({
    queryKey: ["authUser"],
    queryFn: AuthUser,
  });

  const id = authUser?.user?._id;

  const {
    data,
    isLoading: getAllNotesByIdLoading,
    error,
  } = useQuery({
    queryKey: ["notes", id],
    queryFn: () => GetAllNoteById(id),
    enabled: !!id,
  });

  const notes = data?.notes;

  const filterNote = notes?.filter((note) => {
    const matchedValue = searchingValue.toLowerCase();
    const Includednotes =
      note.title.toLowerCase().includes(matchedValue) ||
      note.content.toLowerCase().includes(matchedValue) ||
      note.category.toLowerCase().includes(matchedValue);
    return Includednotes;
  });

  console.log(filterNote);

  if (authUserLoading || getAllNotesByIdLoading) {
    return <LoadingPage />;
  }

  return (
    <div className="container mx-auto px-4 py-4">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-4">
        <div className="relative w-full md:w-1/2">
          <Input
            type={"text"}
            placeholder={"Search notes by title, content, or category..."}
            value={searchingValue}
            onChange={(e) => setSearchingValue(e.target.value)}
            className={
              "pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent w-full shadow-sm"
            }
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
        </div>
        <button
          className="btn btn-primary text-white flex items-center gap-2 px-6 py-2 rounded-lg shadow-md hover:bg-primary-dark transition-all duration-300"
          onClick={() => setshowModel(true)}
        >
          <PlusCircle size={20} />
          Create New Note
        </button>
        {showModel && <CreateNoteDialog onClose={() => setshowModel(false)} />}
      </div>

      <hr className="my-4 border-t border-gray-200" />

      {filterNote && filterNote.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filterNote.map((note) => (
            <NoteCard key={note._id} note={note} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 text-gray-500 text-lg">
          {searchingValue ? (
            <p>No notes found matching your search.</p>
          ) : (
            <>
              <p>You don't have any notes yet!</p>
              <p className="mt-2">Click "Create New Note" to get started.</p>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default HomePage;

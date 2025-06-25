import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { LogOutIcon, NotebookIcon } from "lucide-react";
import toast from "react-hot-toast";

import { AuthUser, LogOut } from "../lib/apiCalls.js";
import LoadingPage from "./loadingPage.jsx";
import ThemeSelector from "./themeSelector.jsx";

const NavBar = () => {
  const { data: authUser, isLoading } = useQuery({
    queryKey: ["authUser"],
    queryFn: AuthUser,
  });

  const queryClient = useQueryClient();

  const { mutate: LogOutFn, isPending } = useMutation({
    mutationFn: LogOut,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
      toast.success("You have been Logout successfully");
    },
  });

  const avatar = authUser?.user?.profilePic || "https://tinyurl.com/3mkn8rbf";

  if (isLoading && isPending) {
    return <LoadingPage />;
  }

  return (
    <div className="navbar bg-base-100 shadow-lg px-4 md:px-8 py-3 rounded-b-lg sticky top-0 z-50">
      <div className="navbar-start">
        <Link
          to={"/"}
          className="flex items-center gap-2 text-lg md:text-xl font-bold text-gray-800 dark:text-gray-100 hover:text-primary transition-colors duration-200"
        >
          <NotebookIcon className="w-7 h-7 text-primary animate-pulse" />
          Echo Notes
        </Link>
      </div>

      <div className="navbar-center hidden md:flex">
        {authUser?.user ? (
          <div className="text-md font-semibold text-gray-700 dark:text-gray-300">
            Welcome,{" "}
            <span className="text-primary">{authUser.user.fullName}</span>!
          </div>
        ) : (
          <div className="text-md font-semibold text-gray-700 dark:text-gray-300">
            Please Log In
          </div>
        )}
      </div>

      <div className="navbar-end flex items-center gap-3">
        {/* User Avatar */}
        {authUser?.user && (
          <div
            className="tooltip tooltip-bottom"
            data-tip={authUser.user.fullName}
          >
            <img
              src={avatar}
              alt="User Avatar"
              className="w-9 h-9 rounded-full object-cover border-2 border-primary shadow-md"
              title="User Avatar"
            />
          </div>
        )}

        <div>
          <ThemeSelector />
        </div>

        {authUser?.user ? (
          <button
            className="btn btn-ghost btn-circle text-primary hover:bg-primary/20 transition-all duration-200 tooltip tooltip-bottom"
            data-tip="Log Out"
            onClick={LogOutFn}
            disabled={isPending}
          >
            {isPending ? (
              <span className="loading loading-spinner loading-sm text-primary"></span>
            ) : (
              <LogOutIcon className="w-7 h-7" />
            )}
          </button>
        ) : (
          <div className="flex gap-2">
            <Link to="/login" className="btn btn-outline btn-sm btn-primary">
              Log In
            </Link>
            <Link
              to="/signup"
              className="btn btn-primary btn-sm hidden sm:inline-flex"
            >
              Sign Up
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavBar;

import { useState } from "react";
import Input from "../components/input.jsx";
import { SignUp } from "../lib/apiCalls.js";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { NotebookIcon } from "../components/noteBookIcon.jsx";

const SignUpPage = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const queryClient = useQueryClient();

  const {
    mutate: SignUpFn,
    isPending,
    error,
  } = useMutation({
    mutationFn: SignUp,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
      toast.success("You have been Signed Up successfully");
      setformData({ fullName: "", email: "", password: "" });
    },
  });

  const HandleSubmit = async (e) => {
    e.preventDefault();
    SignUpFn(formData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-100 to-indigo-100 flex items-center justify-center p-4 dark:from-gray-800 dark:via-gray-900 dark:to-black">
      <div
        className="flex flex-col md:flex-row items-center bg-base-100/70 backdrop-blur-sm rounded-3xl shadow-2xl p-8 max-w-5xl w-full
                   transition-all duration-300 ease-in-out hover:shadow-primary-focus/50 hover:scale-[1.01] border border-base-200 dark:border-base-700"
      >
        <div className="w-full md:w-1/2 p-4 flex flex-col justify-center">
          <div className="flex items-center gap-3 mb-6 justify-center md:justify-start">
            <NotebookIcon className="w-9 h-9 text-primary animate-pulse" />
            <h1 className="text-4xl font-extrabold text-gray-800 dark:text-gray-100 drop-shadow-md">
              Echo Notes
            </h1>
          </div>

          <h2 className="text-3xl font-bold text-center md:text-left text-gray-900 dark:text-gray-50 mb-6">
            Create Your Account
          </h2>

          {error && (
            <div
              role="alert"
              className="alert alert-error mb-4 animate-fade-in"
            >
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

          <form onSubmit={HandleSubmit} className="space-y-4">
            <Input
              label={"Full Name"}
              type={"text"}
              placeholder={"John Doe"}
              value={formData.fullName}
              onChange={(e) =>
                setFormData({ ...formData, fullName: e.target.value })
              }
            />
            <Input
              label={"Email"}
              type={"email"}
              placeholder={"you@example.com"}
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
            <Input
              label={"Password"}
              type={"password"}
              placeholder={"StrongPassword123"}
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
            <button
              className="btn btn-primary btn-block text-lg font-semibold mt-6 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
              type="submit"
              disabled={isPending}
            >
              {isPending ? (
                <span className="loading loading-spinner loading-md"></span>
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-6">
            Already have an account?{" "}
            <a href="/login" className="link link-hover text-primary font-bold">
              Log in
            </a>
          </p>
        </div>

        <div className="w-full md:w-1/2 p-4 flex items-center justify-center mt-8 md:mt-0">
          <img
            src="signup.png"
            alt="Sign Up Illustration"
            className="w-full h-auto object-contain rounded-2xl shadow-xl border border-base-200 dark:border-base-700 animate-fade-in"
          />
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;

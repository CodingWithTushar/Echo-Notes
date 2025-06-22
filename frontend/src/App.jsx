import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import { AuthUser } from "./lib/apiCalls.js";
import LoadingPage from "./components/loadingPage.jsx";
import SignUpPage from "./pages/signUpPage";
import LogInPage from "./pages/logInPage";
import HomePage from "./pages/homePage";
import NotePage from "./pages/NotePage";
import Layout from "./components/layout.jsx";

function App() {
  const { data, isLoading } = useQuery({
    queryKey: ["authUser"],
    queryFn: AuthUser,
  });

  const authUser = data?.user;
  console.log(authUser);

  if (isLoading) {
    return <LoadingPage />;
  }

  return (
    <Routes>
      <Route
        path="/signup"
        element={!authUser ? <SignUpPage /> : <Navigate to={"/"} />}
      />
      <Route
        path="/login"
        element={!authUser ? <LogInPage /> : <Navigate to={"/"} />}
      />
      <Route
        path="/"
        element={
          authUser ? (
            <Layout>
              <HomePage />
            </Layout>
          ) : (
            <Navigate to={"/login"} />
          )
        }
      />
      <Route
        path="/note/:id"
        element={
          authUser ? (
            <Layout>
              <NotePage />
            </Layout>
          ) : (
            <Navigate to={"/login"} />
          )
        }
      />
    </Routes>
  );
}

export default App;

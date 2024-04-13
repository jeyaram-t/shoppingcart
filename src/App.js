import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import NotFound from "./pages/NotFound";

const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "login", element: <Login /> },
  { path: "signup", element: <SignUp /> },
  { path: "*", element: <NotFound /> }
]);

const App = () => {
  return (
    <RouterProvider router={router} />
  );
};

export default App;

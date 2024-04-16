import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Login from "./pages/Login";
import Template from "./pages/Template";
import SignUp from "./pages/SignUp";
import NotFound from "./pages/NotFound";
import Home from "./pages/Home";
import Cart from "./pages/Cart";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Template />,
    children: [
      {
        index: true,
        element: <Home />,
      }
    ]
  },
  { path: "login", element: <Login /> },
  { path: "signup", element: <SignUp /> },
  { path: "*", element: <NotFound /> },
  { path: "cart", element: <Cart /> }
]);

const App = () => {
  return (
    <RouterProvider router={router} />
  );
};

export default App;

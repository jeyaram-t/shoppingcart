import React from "react";
import ReactDOM from "react-dom/client";
import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import { ToastContainer } from "react-toastify";
import App from "./App";
import NotFounded from "./NotFounded";
import SignUp from "./pages/SignUp";
import "./sass/SignUp.css";
import "./styles/index.scss";


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "signup",
    element: <SignUp />,
  },
  {
    path: "*",
    element: <NotFounded />,

  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <div className="app">
      <RouterProvider router={router} />
      <ToastContainer />
    </div>
  </React.StrictMode >
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

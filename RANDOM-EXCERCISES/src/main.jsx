/* eslint-disable no-unused-vars */
import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./components/App";
import Profile from "./components/Profile";
import ErrorPage from "./components/ErrorPage.jsx";
import routes from "./components/routes.jsx";

import Popeye from "./components/Popeye.jsx";
import Spinach from "./components/Spinach.jsx";

import ClassInput from "./components/ClassInput.jsx"
import DefaultProfile from "./components/DefaultProfile.jsx";



const router = createBrowserRouter(routes);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

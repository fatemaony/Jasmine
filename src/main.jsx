import { createBrowserRouter, RouterProvider } from "react-router";

import "./index.css";

import React from "react";
import ReactDOM from "react-dom/client";
import Root from "./Root";
import { AuthProvider } from "./context/AuthContext";
import Login from "./pages/Login";
import ProfilePage from "./pages/ProfilePage";
import { ToastContainer } from "react-toastify";
import HomePage from "./pages/HomePage";
import EventDetails from "./pages/EventDetails";
import ErrorPage from "./pages/ErrorPage";
import Events from "./components/Events";

const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      {
        path: "/",
        loader: async () => {
          const res = await fetch("/events.json");
          return res.json();
        },
        Component: HomePage,
      },
      { path: "/login", Component: Login },
      {path:"/events", Component:Events},
      { path: "/profile", Component: ProfilePage },
      {path: 'event-details/:id', Component: EventDetails},
      {path:"/*", Component: ErrorPage}
    ],
  },
]);

const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
  <AuthProvider>
    <ToastContainer />
    <RouterProvider router={router} />
  </AuthProvider>
);

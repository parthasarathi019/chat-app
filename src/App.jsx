import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Banner from "./components/Banner";
import Chat from "./components/Chat";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

const router = createBrowserRouter([
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: <Home />,
    children: [
      {
        path: "/",
        element: <Banner />,
      },
      {
        path: "/chat/:id",
        element: <Chat />,
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;

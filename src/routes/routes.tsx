import { createBrowserRouter } from "react-router";
import Login from "../pages/Login/Login";
import App from "../App";
import ProtectedRoutes from "./ProtectedRoutes";
import Dashboard from "@/pages/Dashboard/Dashboard";
import Register from "@/pages/Register/Register";
import Home from "@/pages/Dashboard/Home";
import Users from "@/pages/Dashboard/Users";
import UserInfo from "@/pages/Dashboard/UserInfo";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/dashboard",
    children: [
      { index: true, element: <Home /> },
      { path: "users", element: <Users /> },
      { path: "users/:id", element: <UserInfo /> },
    ],
    element: (
      <ProtectedRoutes>
        <Dashboard />
      </ProtectedRoutes>
    ),
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);

export default router;

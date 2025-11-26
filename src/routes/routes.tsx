import { createBrowserRouter } from "react-router";
import Login from "../pages/Login/Login";
import App from "../App";
import ProtectedRoutes from "./ProtectedRoutes";
import Dashboard from "@/pages/Dashboard/Dashboard";
import Register from "@/pages/Register/Register";
import Home from "@/pages/Dashboard/Home";
import Users from "@/pages/Dashboard/Users";

const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
  },
  {
    path: "/dashboard",
    children: [
      { index: true, element: <Home /> },
      { path: "/dashboard/users", element: <Users /> },
    ],
    element: (
      <ProtectedRoutes>
        <Dashboard />
      </ProtectedRoutes>
    ),
  },
  {
    path: "/login",
    Component: Login,
  },
  {
    path: "/register",
    Component: Register,
  },
]);

export default router;

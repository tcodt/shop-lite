import { createBrowserRouter } from "react-router";
import Login from "../pages/Login/Login";
import App from "../App";
import ProtectedRoutes from "./ProtectedRoutes";
import Dashboard from "@/pages/Dashboard/Dashboard";
import Register from "@/pages/Register/Register";

const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
  },
  {
    path: "/dashboard",
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

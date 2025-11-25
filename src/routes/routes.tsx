import { createBrowserRouter } from "react-router";
import Login from "../pages/Login/Login";
import App from "../App";
import ProtectedRoutes from "./ProtectedRoutes";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoutes>
        <App />
      </ProtectedRoutes>
    ),
  },
  {
    path: "/login",
    Component: Login,
  },
]);

export default router;

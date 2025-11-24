import { createBrowserRouter } from "react-router";
import Login from "../pages/Login/Login";
import App from "../App";

const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
  },
  {
    path: "/login",
    Component: Login,
  },
]);

export default router;

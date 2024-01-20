import { Navigate } from "react-router-dom";
import Login from "@/views/login";
const routes = [
  {
    path: "/",
    element: <Navigate to="/login" />,
  },
  {
    path: "/login",
    element: <Login />,
  },
];
export default routes;

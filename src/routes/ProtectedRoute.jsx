import { Navigate } from "react-router";
import facade from "../apiFacade.js";

export default function ProtectedRoute({ children }) {
  if (!facade.loggedIn()) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

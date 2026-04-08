import { Navigate } from "react-router-dom";
import { Loader } from "./index";
import { useAuthContext } from "../context/authContext";

export default function ProtectedRoute({ children }) {
  const { isCurrentUser, authLoader } = useAuthContext();

  if (authLoader) {
    return <Loader />;
  }

  if (!isCurrentUser) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

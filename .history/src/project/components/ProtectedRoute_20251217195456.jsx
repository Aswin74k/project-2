import { Navigate } from "react-router-dom";
import { useLibrary } from "../context/LibraryContext";

const ProtectedRoute = ({ children }) => {
  const { user } = useLibrary();
  return user ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;

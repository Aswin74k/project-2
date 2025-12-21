import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { LibraryContext } from "../context/LibraryContext";

const ProtectedRoute = ({ children }) => {
  const { user } = useContext(LibraryContext);

  return user ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;


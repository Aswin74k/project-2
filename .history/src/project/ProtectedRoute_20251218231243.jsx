import { useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children }) {
  const { user } = useAuth();
  const location = useLocation();

  useEffect(() => {
    if (!user) {
      // 🔔 open login modal
      window.dispatchEvent(new Event("showLoginModal"));
    }
  }, [user]);

  if (!user) {
    // 🚫 redirect back to previous page (home)
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return children;
}

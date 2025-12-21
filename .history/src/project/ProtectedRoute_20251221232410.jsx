import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) return null;

  if (!user) {
    if (location.pathname !== "/") {
      sessionStorage.setItem(
        "redirectAfterLogin",
        location.pathname
      );
    }

    window.dispatchEvent(new Event("showLoginModal"));

    return <Navigate to="/" replace />;
  }

  return children;
}

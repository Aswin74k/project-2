import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  // ⏳ wait until auth state restores
  if (loading) return null;

  if (!user) {
    sessionStorage.setItem(
      "redirectAfterLogin",
      location.pathname
    );

    window.dispatchEvent(new Event("showLoginModal"));

    return <Navigate to="/" replace />;
  }

  return children;
}

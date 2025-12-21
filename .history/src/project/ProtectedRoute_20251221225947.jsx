import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute() {
  const { user, loading } = useAuth();
  const location = useLocation();

  /* wait until auth state is ready */
  if (loading) return null;

  if (!user) {
    sessionStorage.setItem(
      "redirectAfterLogin",
      location.pathname
    );
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}

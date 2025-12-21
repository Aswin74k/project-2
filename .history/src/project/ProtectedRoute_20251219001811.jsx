import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children }) {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!user) {
      // save intended route
      sessionStorage.setItem("redirectAfterLogin", location.pathname);

      // open login modal
      window.dispatchEvent(new Event("showLoginModal"));

      navigate("/", { replace: true });
    }
  }, [user, navigate, location]);

  if (!user) return null;

  return children;
}

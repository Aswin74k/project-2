import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children }) {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      window.dispatchEvent(new Event("showLoginModal"));
      navigate("/", { replace: true });
    }
  }, [user, navigate]);

  if (!user) return null;

  return children;
}


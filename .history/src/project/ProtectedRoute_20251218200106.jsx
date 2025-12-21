import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // ✅ use context

export default function ProtectedRoute({ children }) {
  const { user } = useAuth(); // ✅ get user from context
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      // 🔔 open login modal
      window.dispatchEvent(new Event("showLoginModal"));

      // 🔁 redirect to home
      navigate("/", { replace: true });
    }
  }, [user, navigate]);

  // ⛔ block rendering if not logged in
  if (!user) return null;

  return children;
}

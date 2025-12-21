import { useEffect } from "react";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children }) {
  const { user } = useAuth();

  useEffect(() => {
    if (!user) {
      // 🔔 just open login modal
      window.dispatchEvent(new Event("showLoginModal"));
    }
  }, [user]);

  // ⛔ block page access until login
  if (!user) return null;

  return children;
}


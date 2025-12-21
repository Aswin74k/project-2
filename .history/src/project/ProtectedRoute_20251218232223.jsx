import { useEffect } from "react";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children }) {
  const { user } = useAuth();

  useEffect(() => {
    if (!user) {
      // 🔔 Open login modal
      window.dispatchEvent(new Event("showLoginModal"));
    }
  }, [user]);

  // ⛔ Stop rendering if not logged in
  if (!user) return null;

  return children;
}


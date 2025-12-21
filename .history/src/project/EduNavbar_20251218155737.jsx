import { useEffect } from "react";

export default function ProtectedRoute({ children }) {
  const user = JSON.parse(localStorage.getItem("loggedInUser"));

  useEffect(() => {
    if (!user) {
      // 🔥 tell navbar to open login modal
      window.dispatchEvent(new Event("showLoginModal"));
    }
  }, [user]);

  // block access if not logged in
  if (!user) return null;

  return children;
}
import { Navigate } from "react-router-dom";
import { useEffect } from "react";

export default function ProtectedRoute({ children }) {
  const user = JSON.parse(localStorage.getItem("loggedInUser"));

  useEffect(() => {
    if (!user) {
      window.dispatchEvent(new CustomEvent("showLoginModal"));
    }
  }, [user]);

  if (!user) {
    return <Navigate to="/" replace />;
  }

  return children;
}



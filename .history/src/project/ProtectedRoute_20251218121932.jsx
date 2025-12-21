import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const user = JSON.parse(localStorage.getItem("loggedInUser"));

  if (!user) {
    // trigger login modal
    window.dispatchEvent(new CustomEvent("showLoginModal"));
    return <Navigate to="/" replace />;
  }

  return children;
}


import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const user = JSON.parse(localStorage.getItem("loggedInUser")); // check logged-in user

  // Optional: trigger login modal using custom event
  useEffect(() => {
    if (!user) {
      window.dispatchEvent(new CustomEvent("showLoginModal"));
    }
  }, [user]);

  if (!user) {
    return <Navigate to="/" replace />; // redirect to home
  }

  return children;
}


import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const user = JSON.parse(localStorage.getItem("loggedInUser"));
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      // open login modal
      window.dispatchEvent(new Event("showLoginModal"));

      // redirect to home
      navigate("/", { replace: true });
    }
  }, [user, navigate]);

  if (!user) return null;

  return children;
}

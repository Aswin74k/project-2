import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter } from "react-router-dom";   // ✅ CHANGE HERE
import App from "./project/App";
import { AuthProvider } from "./context/AuthContext";
import "bootstrap/dist/css/bootstrap.min.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HashRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </HashRouter>
  </React.StrictMode>
);
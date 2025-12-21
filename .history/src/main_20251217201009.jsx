import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./project/App";
import { LibraryProvider } from "./project/context/LibraryContext"; // ✅ ADD THIS
import "bootstrap/dist/css/bootstrap.min.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <LibraryProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </LibraryProvider>
  </React.StrictMode>
);




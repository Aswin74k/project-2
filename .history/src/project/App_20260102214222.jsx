import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import EduNavbar from "./EduNavbar";
import Home from "./Home";
import Course from "./Course";
import About from "./About";
import Enroll from "./Enroll";
import Contact from "./Contact";
im
import ProtectedRoute from "./ProtectedRoute";

export default function App() {
  const location = useLocation();

  // Navbar hide cheyyenda routes
  const HIDE_NAVBAR_ROUTES = ["/enroll"];

  const hideNavbar = HIDE_NAVBAR_ROUTES.includes(location.pathname);

  return (
    <>
      {/* Navbar */}
      {!hideNavbar && <EduNavbar />}

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/courses/:id" element={<Course />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />

        {/* Protected Route */}
        <Route
          path="/enroll"
          element={
            <ProtectedRoute>
              <Enroll />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}
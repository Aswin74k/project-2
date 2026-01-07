import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import EduNavbar from "./EduNavbar";

import Home from "./Home";
import Course from "./Course";
import About from "./About";
import Contact from "./Contact";
import Enroll from "./Enroll";

import ProtectedRoute from "./ProtectedRoute";

export default function App() {
  const location = useLocation();

  // Pages where Navbar should NOT appear
  const hideNavbarRoutes = ["/enroll"];

  const shouldHideNavbar = hideNavbarRoutes.includes(location.pathname);

  return (
    <>
      {/* Navbar */}
      {!shouldHideNavbar && <EduNavbar />}

      <Routes>
        {/* PUBLIC ROUTES */}
        <Route path="/" element={<Home />} />
        <Route path="/courses/:id" element={<Course />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />

        {/* PROTECTED ROUTE */}
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
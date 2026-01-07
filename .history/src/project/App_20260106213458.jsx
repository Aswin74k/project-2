import React, { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import EduNavbar from "./EduNavbar";

import Home from "./Home";
import Course from "./Course";
import About from "./About";
import Contact from "./Contact";
import Enroll from "./Enroll";

import ProtectedRoute from "./ProtectedRoute";
import ProfileDrawer from "./ProfileSidebar"; // 👈 NEW

export default function App() {
  const location = useLocation();

  // Navbar hide cheyyenda pages
  const hideNavbarRoutes = ["/enroll"];
  const shouldHideNavbar = hideNavbarRoutes.includes(location.pathname);

  // Profile drawer state
  const [openProfile, setOpenProfile] = useState(false);

  // Listen profile open event from Navbar
  useEffect(() => {
    const openDrawer = () => setOpenProfile(true);
    window.addEventListener("openProfileDrawer", openDrawer);

    return () => {
      window.removeEventListener("openProfileDrawer", openDrawer);
    };
  }, []);

  return (
    <>
      {/* Navbar */}
      {!shouldHideNavbar && <EduNavbar />}

      {/* Profile Sidebar Drawer */}
      <ProfileSidebar
        open={openProfile}
        onClose={() => setOpenProfile(false)}
      />

      {/* Routes */}
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
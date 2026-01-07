import React, { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import EduNavbar from "./EduNavbar";

import Home from "./Home";
import Course from "./Course";
import About from "./About";
import Contact from "./Contact";
import Enroll from "./Enroll";

import ProtectedRoute from "./ProtectedRoute";
import ProfileSidebar from "./ProfileSidebar"; // ✅ sidebar import

export default function App() {
  const location = useLocation();

  // Navbar hide cheyyenda pages
  const hideNavbarRoutes = ["/enroll"];
  const shouldHideNavbar = hideNavbarRoutes.includes(location.pathname);

  // Sidebar open / close state
  const [openProfile, setOpenProfile] = useState(false);

  // Navbar-il ninn event kelkkaan
  useEffect(() => {
    const openDrawer = () => setOpenProfile(true);
    window.addEventListener("openProfileDrawer", openDrawer);

    return () => {
      window.removeEventListener("openProfileSi", openDrawer);
    };
  }, []);

  return (
    <>
      {/* Navbar */}
      {!shouldHideNavbar && <EduNavbar />}

      {/* ✅ Profile Sidebar */}
      <ProfileSidebar
        open={openProfile}
        onClose={() => setOpenProfile(false)}
      />

      {/* Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/courses/:id" element={<Course />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />

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
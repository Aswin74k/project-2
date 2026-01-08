import React, { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import EduNavbar from "./EduNavbar";

import Home from "./Home";
import Course from "./Course";
import About from "./About";
import Contact from "./Contact";
import Enroll from "./Enroll";

import ProtectedRoute from "./ProtectedRoute";
import ProfileSidebar from "./ProfileSidebar";

export default function App() {
  const location = useLocation();

  // 👉 Navbar hide cheyyenda routes (currently NONE)
  // Future il venam enkil ivide add cheyyam
  const hideNavbarRoutes = [];
  const shouldHideNavbar = hideNavbarRoutes.includes(location.pathname);

  // Profile sidebar open / close
  const [openProfile, setOpenProfile] = useState(false);

  // Navbar-il ninn sidebar open event
  useEffect(() => {
    const openSidebar = () => setOpenProfile(true);
    window.addEventListener("openProfileSidebar", openSidebar);

    return () => {
      window.removeEventListener("openProfileSidebar", openSidebar);
    };
  }, []);

  return (
    <>
      {/* ✅ Navbar (Enroll page-ilum varum) */}
      {!shouldHideNavbar && <EduNavbar />}

      <ProfileSidebar
        open={openProfile}
        onClose={() => setOpenProfile(false)}
      />

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
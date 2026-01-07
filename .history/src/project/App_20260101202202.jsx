import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import EduNavbar from "./EduNavbar";
import Home from "./Home";
import Course from "./Course";
import About from "./About";
import Enroll from "./Enroll";
import Contact from "./Contact";
// import Profile from "./Profile";
// import Payment from "./Payment";
import ProtectedRoute from "./ProtectedRoute";

export default function App() {
  const location = useLocation();

  // Pages where Navbar should NOT appear
  const hideNavbarRoutes = ["/enroll", "/payment"];

  const shouldHideNavbar = hideNavbarRoutes.includes(location.pathname);

  return (
    <>
      {/* Show Navbar only when needed */}
      {!shouldHideNavbar && <EduNavbar />}

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/courses/:id" element={<Course />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />

        {/* Protected Routes */}
        <Route
          path="/enroll"
          element={
            <ProtectedRoute>
              <Enroll />
              <Profile/>
            </ProtectedRoute>
          }
        />

        <Route
          path="/payment"
          element={
            <ProtectedRoute>
              {/* <Payment /> */}
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}
import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import EduNavbar from "./EduNavbar";
import Home from "./Home";
import Course from "./Course";
import About from "./About";
import Enroll from "./Enroll";
import Contact from "./Contact";
import Payment from "./Payment";
import Profile from "./Profile";
import ProtectedRoute from "./ProtectedRoute";

export default function App() {
  const location = useLocation();

  // Pages where Navbar should NOT appear
  const hideNavbarRoutes = ["/enroll", "/payment"];

  const shouldHideNavbar = hideNavbarRoutes.includes(location.pathname);

  return (
    <>
      {/* Navbar */}
      {!shouldHideNavbar && <EduNavbar />}

     <Routes>
  {/* Public */}
  <Route path="/" element={<Home />} />
  <Route path="/about" element={<About />} />
  <Route path="/contact" element={<Contact />} />

  {/* Protected */}
  <Route
    path="/enroll"
    element={
      <ProtectedRoute>
        <Enroll />
      </ProtectedRoute>
    }
  />

  <Route
    path="/payment"
    element={
      <ProtectedRoute>
        <Payment />
      </ProtectedRoute>
    }
  />

  <Route
    path="/profile"
    element={
      <ProtectedRoute>
        <Profile />
      </ProtectedRoute>
    }
  />
</Routes>
    </>
  );
}
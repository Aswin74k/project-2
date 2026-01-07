import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import EduNavbar from "./EduNavbar";
import Home from "./Home";
import Course from "./Course";
import About from "./About";
import Enroll from "./Enroll";
import Contact from "./Contact";
import Profile from "./Profile";
// import Payment from "./Payment";
import ProtectedRoute from "./ProtectedRoute";

export default function App() {
  const location = useLocation();

  // Navbar hide cheyyanda routes
  const HIDE_NAVBAR_ROUTES = ["/enroll", "/payment"];

  const hideNavbar = HIDE_NAVBAR_ROUTES.includes(location.pathname);

  return (
    <>
      {/* Navbar */}
      {!hideNavbar && <EduNavbar />}

      {/* Routes */}
      <Routes>
        {/* Public Pages */}
        <Route path="/" element={<Home />} />
        <Route path="/courses/:id" element={<Course />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />

        {/* Protected Pages */}
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
              {/* <Payment /> */}
            </ProtectedRoute>
          }
        />

        {/* Future */}
        {/* 
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        /> 
        */}
      </Routes>
    </>
  );
}
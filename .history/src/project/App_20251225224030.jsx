import React from "react";
import { Routes, Route } from "react-router-dom";

import EduNavbar from "./EduNavbar";
import Home from "./Home";
import Course from "./Course";
import About from "./About";
import Enroll from "./Enroll";
import Contact from "./Contact";
import AdminCourses from "./AdminCourses";
import ProtectedRoute from "./ProtectedRoute";

export default function App() {
  return (
    <>
      <EduNavbar />

      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Home />} />
        <Route path="/courses/:id" element={<Course />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />

        {/* Protected routes */}
        <Route
          path="/enroll"
          element={
            <ProtectedRoute>
              <Enroll />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminCourses />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}


import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import EduNavbar from "./EduNavbar";
import Home from "./Home";
import Course from "./Course";
import About from "./About";
import Enroll from "./Enroll";


function ProtectedRoute({ children }) {
  const user = JSON.parse(localStorage.getItem("loggedInUser"));
  if (!user) return <Navigate to="/" replace />; // redirect to home if not logged in
  return children;
}

export default function App() {
  return (
    <>
      <EduNavbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/courses/:id" element={<Course />} />
        <Route path="/about" element={<About />} />
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

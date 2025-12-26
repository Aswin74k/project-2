import React from "react";
import { Routes, Route } from "react-router-dom";

import EduNavbar from "./EduNavbar";
import Home from "./Home";
import Course from "./Course";
import About from "./About";
import Enroll from "./Enroll";
import Contact from "./Contact";
import ProtectedRoute from "./ProtectedRoute";

export default function App() {
  return (
    <>
      <EduNavbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/courses/:id" element={<Course />} />
        <Route path="/about" element={<About />} />
        <Route path="/Contact" element={<Contact />} />
                      <Route path="/payment" element={<Payment />} />



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

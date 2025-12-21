// src/project/App.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";

import EduNavbar from "./EduNavbar";
import Home from "./Home";
import Course from "./Course";
import About from "./About";
im
// import Contact from "./Contact";

export default function App() {
  return (
    <>
      <EduNavbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/courses/:id" element={<Course />} />
        <Route path="/about" element={<About />} />
        <Route path="/enroll" element={<Enroll />} />
        {/* <Route path="/contact" element={<Contact />} /> */}
      </Routes>
    </>
  );
}

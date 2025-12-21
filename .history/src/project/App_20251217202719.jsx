// src/project/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Components
import EduNavbar from "./project/EduNavbar";
import Home from "./project/Home";
import Course from "./project/Course";
import About from "./project/About";
import Contact from "./project/Contact";

// CSS

export default function App() {
  return (
    <Router>
      <EduNavbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/courses" element={<Course />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </Router>
  );
}

import React from "react";
import { Routes, Route } from "react-router-dom";

import EduNavbar from "./EduNavbar";
import Home from "./Home";
import About from "./About";
import Course from "./Course";
import Contact from "./Contact";   

export default function App() {
  return (
    <>
      <EduNavbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/course/:id" element={<Course />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </>
  );
}















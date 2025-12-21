import React from "react";
import { Routes, Route } from "react-router-dom";

import EduNavbar from "./project/EduNavbar";
import Home from "./project/Home";
import About from "./project/About";
import Course from "./project/Course";
import Contact from "./project/Contact";   

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


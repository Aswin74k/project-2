import React from "react";
import { Routes, Route } from "react-router-dom";

import EduNavbar from "./EduNavbar";
import Home from "./Home";
import About from "./About";
import Course from "./Course";   // <-- You MUST import this

export default function App() {
  return (
    <>
      <EduNavbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />

        {/* Dynamic course route */}
        <Route path="/course/:id" element={<Course />} />
      </Routes>
    </>
  );
}














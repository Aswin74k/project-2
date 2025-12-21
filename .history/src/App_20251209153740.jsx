import React from "react";
import { Routes, Route } from "react-router-dom";

import EduNavbar from "./EduNavbar";
import Home from "./Home";
import About from "./project/About";

export default function App() {
  return (
    <>
      <EduNavbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </>
  );
}













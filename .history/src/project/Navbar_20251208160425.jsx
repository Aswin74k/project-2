import React, { useState } from "react";
import "./Navbar.css";

export default function Navbar() {
  const [darkMode, setDarkMode] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className={`navbar ${darkMode ? "dark" : "light"}`}>
      <div className="nav-container">

        {/* Logo */}
        <div className="logo">EduTech</div>

        {/* Desktop Navigation Links */}
        <ul className="nav-links">
          <li>Home</li>
          <li>Courses</li>
          <li>About</li>
          <li>Contact</li>
        </ul>

        {/* Search Box */}
        <div className="search-box">
          <input type="text" placeholder="Search..." />
          <span className="search-icon">🔍</span>
        </div>

        {/* Theme Toggle Button */}
        <button
          className="theme-toggle"
          onClick={() => setDarkMode(!darkMode)}
        >
          {darkMode ? "🌙" : "☀️"}
        </button>

        {/* Hamburger Icon (Mobile Only) */}
        <span
          className="menu-icon"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </span>
      </div>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
        <a onClick={() => setMenuOpen(false)}>Home</a>
        <a onClick={() => setMenuOpen(false)}>Courses</a>
        <a onClick={() => setMenuOpen(false)}>About</a>
        <a onClick={() => setMenuOpen(false)}>Contact</a>
      </div>
    </nav>
  );
}




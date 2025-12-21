import React, { useState } from "react";
import "./Navbar.css";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="nav-container">

        {/* LOGO */}
        <div className="logo">EduTech</div>

        {/* NAV LINKS (DESKTOP) */}
        <ul className="nav-links">
          <li>Home</li>
          <li>About</li>
          <li>Contact</li>
        </ul>

        {/* SEARCH */}
        <div className="search-box">
          <input type="text" placeholder="Search" />
          <span className="search-icon">🔍</span>
        </div>

        {/* THEME BUTTON */}
        <button className="theme-toggle">⚙</button>

        {/* HAMBURGER (MOBILE) */}
        <div className="menu-icon" onClick={() => setMenuOpen(!menuOpen)}>
          ☰
        </div>
      </div>

      {/* MOBILE MENU */}
      <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
        <a onClick={() => setMenuOpen(false)}>Home</a>
        <a onClick={() => setMenuOpen(false)}>About</a>
        <a onClick={() => setMenuOpen(false)}>Contact</a>
      </div>
    </nav>
  );
}




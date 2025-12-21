import { useState } from "react";
import "./Navbar.css";
import { FaSearch, FaSun, FaMoon } from "react-icons/fa";

export default function Navbar() {
  const [darkMode, setDarkMode] = useState(true);

  return (
    <nav className={darkMode ? "navbar dark" : "navbar light"}>
      <div className="nav-container">

        {/* Logo */}
        <div className="logo">
          🎓 EduTech
        </div>

        {/* Links */}
        <ul className="nav-links">
          <li>Home</li>
          <li>About</li>
        </ul>

        {/* Search Bar */}
        <div className="search-box">
          <input type="text" placeholder="Search" />
          <FaSearch className="search-icon" />
        </div>

        {/* Theme toggle */}
        <button 
          className="theme-toggle"
          onClick={() => setDarkMode(!darkMode)}
        >
          {darkMode ? <FaSun /> : <FaMoon />}
        </button>

      </div>
    </nav>
  );
}



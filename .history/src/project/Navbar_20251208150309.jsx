import "./Navbar.css";

export default function Navbar() {
  return (
    <nav className="nav">
      <div className="nav-container">

        <div className="logo">EduTech</div>

        <ul className="nav-links">
          <li>Home</li>
          <li>Courses</li>
          <li>About</li>
          <li>Contact</li>
        </ul>

        <button className="menu-btn">☰</button>

      </div>
    </nav>
  );
}


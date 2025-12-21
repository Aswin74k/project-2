/* MAIN NAVBAR */
.nav {
  width: 100%;
  background: white;
  padding: 14px 0;
  box-shadow: 0 4px 20px rgba(0,0,0,0.08);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
}

/* Container */
.nav-container {
  width: 92%;
  max-width: 1300px;
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

/* Logo */
.logo {
  font-size: 1.8rem;
  font-weight: 700;
  color: #0d6efd;
}

/* Links */
.nav-links {
  list-style: none;
  display: flex;
  gap: 35px;
}

.nav-links li {
  font-size: 1.1rem;
  font-weight: 500;
  color: #333;
  cursor: pointer;
  transition: 0.3s;
}

.nav-links li:hover {
  color: #0d6efd;
}

/* Mobile Menu Button */
.menu-btn {
  display: none;
  background: none;
  border: none;
  font-size: 1.8rem;
  cursor: pointer;
}

/* RESPONSIVE */
@media (max-width: 768px) {
  .menu-btn {
    display: block;
  }

  .nav-links {
    display: none;
  }
}



import React, { useState, useEffect } from "react";
import { Navbar, Nav, Container, InputGroup, Form, Button, Modal } from "react-bootstrap";
import { FaSearch, FaUserCircle } from "react-icons/fa";
import "./navbar.css";

export default function EduNavbar() {
  const [scrolled, setScrolled] = useState(false);

  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* NAVBAR */}
      <Navbar expand="lg" fixed="top" className={scrolled ? "navbar navbar-scrolled" : "navbar"}>
        <Container>

          {/* LOGO */}
          <Navbar.Brand href="/" className="d-flex align-items-center gap-2">
            <img
              src="https://www.shutterstock.com/image-vector/elearning-education-icon-flat-style-260nw-1183137523.jpg"
              className="nav-icon"
            />
            EduTech
          </Navbar.Brand>

          <Navbar.Toggle />

          <Navbar.Collapse>
            {/* NAV LINKS */}
            <Nav className="ms-auto align-items-center gap-3">
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="#courses">About</Nav.Link>
              <Nav.Link href="#contact">Contact</Nav.Link>

              {/* SEARCH */}
           <div className="search-container">
  <InputGroup>
    <Form.Control className="search-input" placeholder="Search..." />
    <Button className="search-icon">
      <FaSearch />
    </Button>
  </InputGroup>
</div>
<div className="custom-search">
  <FaSearch className="search-left-icon" />
  <input type="text" placeholder="Search items..." />
</div>


              {/* USER ICON */}
              <FaUserCircle
                className="ms-3"
                size={32}
                style={{ cursor: "pointer", color: "#fff" }}
                onClick={() => setShowLogin(true)}
              />
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* LOGIN MODAL */}
      <Modal show={showLogin} onHide={() => setShowLogin(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" placeholder="Enter email" />
            </Form.Group>

            <Form.Group className="mt-3">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Enter password" />
            </Form.Group>

            <Button className="w-100 mt-4" onClick={() => setShowLogin(false)}>
              Login
            </Button>

            <p className="text-center mt-3">
              Don’t have an account?{" "}
              <span
                style={{ color: "#0d6efd", cursor: "pointer" }}
                onClick={() => {
                  setShowLogin(false);
                  setShowSignup(true);
                }}
              >
                Sign Up
              </span>
            </p>
          </Form>
        </Modal.Body>
      </Modal>

      {/* SIGNUP MODAL */}
      <Modal show={showSignup} onHide={() => setShowSignup(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Sign Up</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Full Name</Form.Label>
              <Form.Control type="text" placeholder="Enter your name" />
            </Form.Group>

            <Form.Group className="mt-3">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" placeholder="Enter email" />
            </Form.Group>

            <Form.Group className="mt-3">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Enter password" />
            </Form.Group>

            <Button className="w-100 mt-4" onClick={() => setShowSignup(false)}>
              Create Account
            </Button>

            <p className="text-center mt-3">
              Already have an account?{" "}
              <span
                style={{ color: "#0d6efd", cursor: "pointer" }}
                onClick={() => {
                  setShowSignup(false);
                  setShowLogin(true);
                }}
              >
                Login
              </span>
            </p>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}








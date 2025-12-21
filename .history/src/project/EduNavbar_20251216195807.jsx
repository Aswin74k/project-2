import React, { useState, useEffect } from "react";
import { Navbar, Nav, Container, Form, Button, Modal } from "react-bootstrap";
import { FaSearch, FaUser } from "react-icons/fa";
import { useForm } from "react-hook-form";
import "./navbar.css";

export default function EduNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [user, setUser] = useState(null);

  // react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Load user from localStorage
  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("user"));
    if (savedUser) setUser(savedUser);
  }, []);

  // Login submit
  const onLogin = (data) => {
    localStorage.setItem("user", JSON.stringify(data));
    setUser(data);
    setShowLogin(false);
    reset();
  };

  // Logout
  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <>
      {/* NAVBAR */}
      <Navbar
        expand="lg"
        fixed="top"
        className={scrolled ? "navbar navbar-scrolled" : "navbar"}
      >
        <Container>
          <Navbar.Brand href="/" className="d-flex align-items-center gap-2">
            <img
              src="https://www.shutterstock.com/image-vector/elearning-education-icon-flat-style-260nw-1183137523.jpg"
              className="nav-icon"
              alt="logo"
            />
            EduTech
          </Navbar.Brand>

          <Navbar.Toggle />
          <Navbar.Collapse>
            <Nav className="ms-auto align-items-center gap-3">
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/About">About</Nav.Link>
              <Nav.Link href="/contact">Contact</Nav.Link>

              {/* SEARCH */}
              <div className="custom-search">
                <FaSearch className="search-left-icon" />
                <input type="text" placeholder="Search courses..." />
              </div>

              {/* USER SECTION */}
              {!user ? (
                <FaUser
                  className="ms-3 user-icon"
                  size={22}
                  onClick={() => setShowLogin(true)}
                />
              ) : (
                <div className="d-flex align-items-center gap-3 ms-3">
                  <span className="username">
                    Hi, <b>{user.username}</b>
                  </span>
                  <button className="logout-btn" onClick={logout}>
                    Logout
                  </button>
                </div>
              )}
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
          <Form onSubmit={handleSubmit(onLogin)}>
            <Form.Group>
              <Form.Label>Username</Form.Label>
              <Form.Control
                placeholder="Enter username"
                {...register("username", { required: "Username required" })}
              />
              {errors.username && (
                <small className="text-danger">
                  {errors.username.message}
                </small>
              )}
            </Form.Group>

            <Form.Group className="mt-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                {...register("password", { required: "Password required" })}
              />
              {errors.password && (
                <small className="text-danger">
                  {errors.password.message}
                </small>
              )}
            </Form.Group>

            <Button className="w-100 mt-4" type="submit">
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

      {/* SIGNUP MODAL (UI ONLY for now) */}
      <Modal show={showSignup} onHide={() => setShowSignup(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Sign Up</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="text-center">
            Signup backend can be added later 🔥
          </p>
        </Modal.Body>
      </Modal>
    </>
  );
}


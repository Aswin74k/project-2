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
  const [authError, setAuthError] = useState("");

  const loginForm = useForm();
  const signupForm = useForm();

  /* ---------------- SCROLL EFFECT ---------------- */
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* ---------------- LOAD USER ---------------- */
  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("currentUser"));
    if (savedUser) setUser(savedUser);
  }, []);

  /* ---------------- SIGN UP ---------------- */
  const onSignup = (data) => {
    const users = JSON.parse(localStorage.getItem("users")) || [];

    const exists = users.find((u) => u.email === data.email);
    if (exists) {
      setAuthError("User already exists");
      return;
    }

    users.push(data);
    localStorage.setItem("users", JSON.stringify(users));
    setAuthError("");
    setShowSignup(false);
    setShowLogin(true);
    signupForm.reset();
  };

  /* ---------------- LOGIN ---------------- */
  const onLogin = (data) => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const found = users.find(
      (u) => u.email === data.email && u.password === data.password
    );

    if (!found) {
      setAuthError("Invalid email or password");
      return;
    }

    localStorage.setItem(
      "currentUser",
      JSON.stringify({ username: found.username, email: found.email })
    );

    setUser({ username: found.username, email: found.email });
    setAuthError("");
    setShowLogin(false);
    loginForm.reset();
  };

  /* ---------------- LOGOUT ---------------- */
  const logout = () => {
    localStorage.removeItem("currentUser");
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
          <Navbar.Brand href="/">EduTech</Navbar.Brand>

          <Navbar.Toggle />
          <Navbar.Collapse>
            <Nav className="ms-auto align-items-center gap-3">
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/about">About</Nav.Link>
              <Nav.Link href="/contact">Contact</Nav.Link>

              <div className="custom-search">
                <FaSearch />
                <input placeholder="Search courses..." />
              </div>

              {!user ? (
                <FaUser
                  className="user-icon"
                  onClick={() => setShowLogin(true)}
                />
              ) : (
                <div className="d-flex gap-3 align-items-center">
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

      {/* ---------------- LOGIN MODAL ---------------- */}
      <Modal show={showLogin} onHide={() => setShowLogin(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form onSubmit={loginForm.handleSubmit(onLogin)}>
            <Form.Control
              placeholder="Email"
              {...loginForm.register("email", { required: true })}
            />

            <Form.Control
              className="mt-3"
              type="password"
              placeholder="Password"
              {...loginForm.register("password", { required: true })}
            />

            {authError && (
              <p className="text-danger mt-2">{authError}</p>
            )}

            <Button type="submit" className="w-100 mt-4">
              Login
            </Button>

            <p className="text-center mt-3">
              No account?{" "}
              <span
                className="link"
                onClick={() => {
                  setShowLogin(false);
                  setShowSignup(true);
                  setAuthError("");
                }}
              >
                Sign Up
              </span>
            </p>
          </Form>
        </Modal.Body>
      </Modal>

      {/* ---------------- SIGNUP MODAL ---------------- */}
      <Modal show={showSignup} onHide={() => setShowSignup(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Sign Up</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form onSubmit={signupForm.handleSubmit(onSignup)}>
            <Form.Control
              placeholder="Username"
              {...signupForm.register("username", { required: true })}
            />

            <Form.Control
              className="mt-3"
              placeholder="Email"
              {...signupForm.register("email", { required: true })}
            />

            <Form.Control
              className="mt-3"
              type="password"
              placeholder="Password"
              {...signupForm.register("password", { required: true })}
            />

            {authError && (
              <p className="text-danger mt-2">{authError}</p>
            )}

            <Button type="submit" className="w-100 mt-4">
              Create Account
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

import React, { useState, useEffect } from "react";
import { Navbar, Nav, Container, Form, Button, Modal } from "react-bootstrap";
import { FaSearch, FaUser } from "react-icons/fa";
import { useForm } from "react-hook-form";

import "./navbar.css";

export default function EduNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("currentUser"))
  );

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* ---------------- LOGIN FORM ---------------- */
  const {
    register: loginRegister,
    handleSubmit: handleLogin,
    formState: { errors: loginErrors },
    setError: setLoginError,
  } = useForm();

  const onLogin = (data) => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find(
      (u) => u.email === data.email && u.password === data.password
    );

    if (!user) {
      setLoginError("email", {
        message: "Invalid email or password",
      });
      return;
    }

    localStorage.setItem("currentUser", JSON.stringify(user));
    setCurrentUser(user);
    setShowLogin(false);
  };

  /* ---------------- SIGNUP FORM ---------------- */
  const {
    register: signupRegister,
    handleSubmit: handleSignup,
    formState: { errors: signupErrors },
    setError: setSignupError,
    reset,
  } = useForm();

  const onSignup = (data) => {
    const users = JSON.parse(localStorage.getItem("users")) || [];

    const emailExists = users.find((u) => u.email === data.email);
    if (emailExists) {
      setSignupError("email", {
        message: "Email already exists",
      });
      return;
    }

    users.push(data);
    localStorage.setItem("users", JSON.stringify(users));
    reset();
    setShowSignup(false);
    alert("Account created successfully!");
  };

  const logout = () => {
    localStorage.removeItem("currentUser");
    setCurrentUser(null);
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

              <div className="custom-search">
                <FaSearch className="search-left-icon" />
                <input type="text" placeholder="Search courses..." />
              </div>

              {/* USER AREA */}
              {currentUser ? (
                <>
                  <span className="text-white fw-semibold">
                    Hi, {currentUser.firstName}
                  </span>
                  <Button variant="outline-light" size="sm" onClick={logout}>
                    Logout
                  </Button>
                </>
              ) : (
                <FaUser
                  className="ms-3 user-icon"
                  size={22}
                  onClick={() => setShowLogin(true)}
                />
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
          <Form onSubmit={handleLogin(onLogin)}>
            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control
                placeholder="Enter email"
                {...loginRegister("email", { required: "Email is required" })}
              />
              {loginErrors.email && (
                <small className="text-danger">
                  {loginErrors.email.message}
                </small>
              )}
            </Form.Group>

            <Form.Group className="mt-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                {...loginRegister("password", {
                  required: "Password is required",
                })}
              />
            </Form.Group>

            <Button type="submit" className="w-100 mt-4">
              Login
            </Button>

            <p className="text-center mt-3">
              Don’t have an account?{" "}
              <span
                className="text-primary"
                style={{ cursor: "pointer" }}
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
          <Form onSubmit={handleSignup(onSignup)}>
            <div className="d-flex gap-2">
              <Form.Control
                placeholder="Enter first name"
                {...signupRegister("firstName", { required: true })}
              />
              <Form.Control
                placeholder="Enter last name"
                {...signupRegister("lastName", { required: true })}
              />
            </div>

            <Form.Group className="mt-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                placeholder="Enter email"
                {...signupRegister("email", {
                  required: "Email is required",
                })}
              />
              {signupErrors.email && (
                <small className="text-danger">
                  {signupErrors.email.message}
                </small>
              )}
            </Form.Group>

            <Form.Group className="mt-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                {...signupRegister("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Minimum 6 characters",
                  },
                })}
              />
              {signupErrors.password && (
                <small className="text-danger">
                  {signupErrors.password.message}
                </small>
              )}
            </Form.Group>

            <Button type="submit" className="w-100 mt-4">
              Create Account
            </Button>

            <p className="text-center mt-3">
              Already have an account?{" "}
              <span
                className="text-primary"
                style={{ cursor: "pointer" }}
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

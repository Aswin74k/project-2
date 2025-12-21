import React, { useState, useEffect } from "react";
import { Navbar, Nav, Container, Form, Button, Modal } from "react-bootstrap";
import { FaSearch, FaUser } from "react-icons/fa";
import { useForm } from "react-hook-form";

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

  /* ---------------- LOGIN FORM ---------------- */
  const {
    register: loginRegister,
    handleSubmit: handleLoginSubmit,
    formState: { errors: loginErrors },
    reset: resetLogin,
  } = useForm();

  const onLoginSubmit = (data) => {
    console.log("Login Data:", data);
    resetLogin();
    setShowLogin(false);
  };

  /* ---------------- SIGNUP FORM ---------------- */
  const {
    register: signupRegister,
    handleSubmit: handleSignupSubmit,
    formState: { errors: signupErrors },
    reset: resetSignup,
  } = useForm();

  const onSignupSubmit = (data) => {
    console.log("Signup Data:", data);
    resetSignup();
    setShowSignup(false);
  };

  return (
    <>
      {/* NAVBAR */}
      <Navbar expand="lg" fixed="top" className={scrolled ? "navbar navbar-scrolled" : "navbar"}>
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

              <FaUser
                className="ms-3 user-icon"
                size={22}
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
          <Form onSubmit={handleLoginSubmit(onLoginSubmit)}>
            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                {...loginRegister("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: "Invalid email",
                  },
                })}
                isInvalid={!!loginErrors.email}
              />
              <Form.Control.Feedback type="invalid">
                {loginErrors.email?.message}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mt-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                {...loginRegister("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Minimum 6 characters",
                  },
                })}
                isInvalid={!!loginErrors.password}
              />
              <Form.Control.Feedback type="invalid">
                {loginErrors.password?.message}
              </Form.Control.Feedback>
            </Form.Group>

            <Button type="submit" className="w-100 mt-4">
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
          <Form onSubmit={handleSignupSubmit(onSignupSubmit)}>
            <div className="name-row">
              <Form.Group className="form-group">
                <Form.Control
                  type="text"
                  placeholder="First name"
                  {...signupRegister("firstName", { required: "First name is required" })}
                  isInvalid={!!signupErrors.firstName}
                />
                <Form.Control.Feedback type="invalid">
                  {signupErrors.firstName?.message}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="form-group">
                <Form.Control
                  type="text"
                  placeholder="Last name"
                  {...signupRegister("lastName", { required: "Last name is required" })}
                  isInvalid={!!signupErrors.lastName}
                />
                <Form.Control.Feedback type="invalid">
                  {signupErrors.lastName?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </div>

            <Form.Group className="mt-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                {...signupRegister("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: "Invalid email",
                  },
                })}
                isInvalid={!!signupErrors.email}
              />
              <Form.Control.Feedback type="invalid">
                {signupErrors.email?.message}
              </Form.Control.Feedback>
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
                isInvalid={!!signupErrors.password}
              />
              <Form.Control.Feedback type="invalid">
                {signupErrors.password?.message}
              </Form.Control.Feedback>
            </Form.Group>

            <Button type="submit" className="w-100 mt-4">
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

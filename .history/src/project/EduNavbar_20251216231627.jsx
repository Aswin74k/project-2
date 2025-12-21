import React, { useState, useEffect } from "react";
import { Navbar, Nav, Container, Form, Button, Modal, Alert } from "react-bootstrap";
import { FaSearch, FaUser } from "react-icons/fa";
import { useForm } from "react-hook-form";
import "./navbar.css";

export default function EduNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );
  const [message, setMessage] = useState("");

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
    const savedUser = JSON.parse(localStorage.getItem("user"));

    if (
      savedUser &&
      data.email === savedUser.email &&
      data.password === savedUser.password
    ) {
      setUser(savedUser);
      setMessage(`Welcome back, ${savedUser.firstName} 👋`);
      setShowLogin(false);
      resetLogin();
    } else {
      setMessage("Invalid email or password ❌");
    }
  };

  /* ---------------- SIGNUP FORM ---------------- */
  const {
    register: signupRegister,
    handleSubmit: handleSignupSubmit,
    watch,
    formState: { errors: signupErrors },
    reset: resetSignup,
  } = useForm();

  const onSignupSubmit = (data) => {
    localStorage.setItem("user", JSON.stringify(data));
    setMessage("Signup successful! Please login ✅");
    resetSignup();
    setShowSignup(false);
    setShowLogin(true); // auto switch to login
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

              {user ? (
                <span className="fw-semibold text-primary">
                  Hi, {user.firstName}
                </span>
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

      {/* MESSAGE ALERT */}
      {message && (
        <Alert
          variant="info"
          className="text-center mt-5"
          onClose={() => setMessage("")}
          dismissible
        >
          {message}
        </Alert>
      )}

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
                {...loginRegister("email", { required: "Email required" })}
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
                {...loginRegister("password", { required: "Password required" })}
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
                  placeholder="First name"
                  {...signupRegister("firstName", { required: "Required" })}
                  isInvalid={!!signupErrors.firstName}
                />
              </Form.Group>

              <Form.Group className="form-group">
                <Form.Control
                  placeholder="Last name"
                  {...signupRegister("lastName", { required: "Required" })}
                  isInvalid={!!signupErrors.lastName}
                />
              </Form.Group>
            </div>

            <Form.Group className="mt-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                {...signupRegister("email", { required: "Email required" })}
                isInvalid={!!signupErrors.email}
              />
            </Form.Group>

            <Form.Group className="mt-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                {...signupRegister("password", {
                  required: "Password required",
                  minLength: { value: 6, message: "Min 6 chars" },
                })}
                isInvalid={!!signupErrors.password}
              />
            </Form.Group>

            {/* CONFIRM PASSWORD */}
            <Form.Group className="mt-3">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                {...signupRegister("confirmPassword", {
                  validate: (value) =>
                    value === watch("password") || "Passwords do not match",
                })}
                isInvalid={!!signupErrors.confirmPassword}
              />
              <Form.Control.Feedback type="invalid">
                {signupErrors.confirmPassword?.message}
              </Form.Control.Feedback>
            </Form.Group>

            <Button type="submit" className="w-100 mt-4">
              Create Account
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

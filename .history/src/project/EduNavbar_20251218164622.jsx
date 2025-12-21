import React, { useState, useEffect } from "react";
import { Navbar, Nav, Container, Modal, Form } from "react-bootstrap";
import { FaSearch, FaUser, FaEye, FaEyeSlash } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import "./navbar.css";

export default function EduNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("loggedInUser")) || null
  );

  const [loginMsg, setLoginMsg] = useState("");
  const [signupMsg, setSignupMsg] = useState("");

  const [showPwd, setShowPwd] = useState(false);
  const [showCPwd, setShowCPwd] = useState(false);

  /* SCROLL EFFECT */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* LOGIN FORM */
  const {
    register: loginRegister,
    handleSubmit: loginSubmit,
    formState: { errors: loginErrors },
  } = useForm();

  const onLogin = (data) => {
    const users = JSON.parse(localStorage.getItem("registeredUsers")) || [];
    const found = users.find(
      (u) => u.email === data.email && u.password === data.password
    );

    if (!found) {
      setLoginMsg("Invalid email or password");
      return;
    }

    localStorage.setItem("loggedInUser", JSON.stringify(found));
    setUser(found);
    setLoginMsg(`Welcome back, ${found.firstName}`);

    setTimeout(() => {
      setShowLogin(false);
      setLoginMsg("");
    }, 1200);
  };

  /* SIGNUP FORM */
  const {
    register: signupRegister,
    handleSubmit: signupSubmit,
    watch,
    formState: { errors: signupErrors },
    reset,
  } = useForm();

  const onSignup = (data) => {
    const users = JSON.parse(localStorage.getItem("registeredUsers")) || [];

    const exists = users.some((u) => u.email === data.email);
    if (exists) {
      setSignupMsg("Email already exists");
      return;
    }

    users.push(data);
    localStorage.setItem("registeredUsers", JSON.stringify(users));
    setSignupMsg("Account created successfully");

    reset();
    setTimeout(() => {
      setShowSignup(false);
      setShowLogin(true);
      setSignupMsg("");
    }, 1200);
  };

  const logout = () => {
    localStorage.removeItem("loggedInUser");
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
          <Navbar.Brand as={Link} to="/" className="brand">
            <img
              src="https://cdn-icons-png.flaticon.com/512/3135/3135755.png"
              className="nav-icon"
              alt=""
            />
            EduTech
          </Navbar.Brand>

          <Navbar.Toggle />
          <Navbar.Collapse>
            <Nav className="ms-auto align-items-center gap-3">
              <Nav.Link as={Link} to="/">Home</Nav.Link>
              <Nav.Link as={Link} to="/about">About</Nav.Link>
              <Nav.Link as={Link} to="/contact">Contact</Nav.Link>

              <div className="custom-search">
                <FaSearch />
                <input placeholder="Search courses..." />
              </div>

              {user ? (
                <>
                  <span className="username">Hi, {user.firstName}</span>
                  <button className="logout-btn" onClick={logout}>
                    Logout
                  </button>
                </>
              ) : (
                <FaUser className="user-icon" onClick={() => setShowLogin(true)} />
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
          {loginMsg && (
            <div className={`modal-message ${loginMsg.includes("Welcome") ? "success" : "error"}`}>
              {loginMsg}
            </div>
          )}

          <Form onSubmit={loginSubmit(onLogin)}>
            <input
              className="auth-input"
              placeholder="Email"
              {...loginRegister("email", { required: "Please fill this field" })}
            />
            <p className="error-text">{loginErrors.email?.message}</p>

            <div className="password-wrapper">
              <input
                className="auth-input"
                type={showPwd ? "text" : "password"}
                placeholder="Password"
                {...loginRegister("password", { required: "Please fill this field" })}
              />
              <span onClick={() => setShowPwd(!showPwd)}>
                {showPwd ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>

            <button className="auth-btn">Login</button>

            <div className="auth-footer">
              Don’t have an account?{" "}
              <span onClick={() => { setShowLogin(false); setShowSignup(true); }}>
                Sign Up
              </span>
            </div>
          </Form>
        </Modal.Body>
      </Modal>

      {/* SIGNUP MODAL */}
      <Modal show={showSignup} onHide={() => setShowSignup(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Sign Up</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {signupMsg && (
            <div className={`modal-message ${signupMsg.includes("exists") ? "error" : "success"}`}>
              {signupMsg}
            </div>
          )}

          <Form onSubmit={signupSubmit(onSignup)}>
            <div className="name-row">
              <input
                className="auth-input"
                placeholder="First name"
                {...signupRegister("firstName", { required: "Please fill this field" })}
              />
              <input
                className="auth-input"
                placeholder="Last name"
                {...signupRegister("lastName", { required: "Please fill this field" })}
              />
            </div>

            <input
              className="auth-input"
              placeholder="Email"
              {...signupRegister("email", { required: "Please fill this field" })}
            />

            <div className="password-wrapper">
              <input
                className="auth-input"
                type={showPwd ? "text" : "password"}
                placeholder="Password"
                {...signupRegister("password", { required: "Please fill this field" })}
              />
              <span onClick={() => setShowPwd(!showPwd)}>
                {showPwd ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>

            <div className="password-wrapper">
              <input
                className="auth-input"
                type={showCPwd ? "text" : "password"}
                placeholder="Confirm Password"
                {...signupRegister("confirmPassword", {
                  validate: (v) => v === watch("password") || "Passwords do not match",
                })}
              />
              <span onClick={() => setShowCPwd(!showCPwd)}>
                {showCPwd ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>

            <button className="auth-btn">Create Account</button>

            <div className="auth-footer">
              Already have an account?{" "}
              <span onClick={() => { setShowSignup(false); setShowLogin(true); }}>
                Login
              </span>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

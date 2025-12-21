import React, { useState, useEffect } from "react";
import { Navbar, Nav, Container, Form, Modal } from "react-bootstrap";
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

  const [showLoginPwd, setShowLoginPwd] = useState(false);
  const [showSignupPwd, setShowSignupPwd] = useState(false);
  const [showSignupConfirmPwd, setShowSignupConfirmPwd] = useState(false);

  /* ================= SCROLL EFFECT ================= */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ================= OPEN LOGIN FROM PROTECTED ROUTE ================= */
  useEffect(() => {
    const openLogin = () => setShowLogin(true);
    window.addEventListener("showLoginModal", openLogin);
    return () => window.removeEventListener("showLoginModal", openLogin);
  }, []);

  /* ================= LOGIN FORM ================= */
  const {
    register: loginRegister,
    handleSubmit: handleLoginSubmit,
    formState: { errors: loginErrors },
    reset: resetLogin,
  } = useForm();

  const onLoginSubmit = (data) => {
    const users = JSON.parse(localStorage.getItem("registeredUsers")) || [];

    const foundUser = users.find(
      (u) => u.email === data.email && u.password === data.password
    );

    if (foundUser) {
      localStorage.setItem("loggedInUser", JSON.stringify(foundUser));
      setUser(foundUser);
      setLoginMsg(`Welcome back, ${foundUser.firstName}`);
      resetLogin();

      setTimeout(() => {
        setShowLogin(false);
        setLoginMsg("");
      }, 1200);
    } else {
      setLoginMsg("Invalid email or password");
    }
  };

  /* ================= SIGNUP FORM ================= */
  const {
    register: signupRegister,
    handleSubmit: handleSignupSubmit,
    watch,
    formState: { errors: signupErrors },
    reset: resetSignup,
  } = useForm();

  const onSignupSubmit = (data) => {
    const users = JSON.parse(localStorage.getItem("registeredUsers")) || [];

    const emailExists = users.some((u) => u.email === data.email);
    if (emailExists) {
      setSignupMsg("Email already exists. Please login.");
      return;
    }

    const newUser = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: data.password,
    };

    users.push(newUser);
    localStorage.setItem("registeredUsers", JSON.stringify(users));

    setSignupMsg("Account created successfully!");
    resetSignup();

    setTimeout(() => {
      setShowSignup(false);
      setShowLogin(true);
      setSignupMsg("");
    }, 1500);
  };

  /* ================= LOGOUT ================= */
  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    setUser(null);
  };

  return (
    <>
      {/* ================= NAVBAR ================= */}
      <Navbar
        expand="lg"
        fixed="top"
        className={scrolled ? "navbar navbar-scrolled" : "navbar"}
      >
        <Container>
          <Navbar.Brand as={Link} to="/" className="d-flex align-items-center gap-2">
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
              <Nav.Link as={Link} to="/">Home</Nav.Link>
              <Nav.Link as={Link} to="/about">About</Nav.Link>

              <div className="custom-search">
                <FaSearch />
                <input placeholder="Search courses..." />
              </div>

              {user ? (
                <>
                  <span className="username">Hi, {user.firstName}</span>
                  <button className="logout-btn" onClick={handleLogout}>
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

      {/* ================= LOGIN MODAL ================= */}
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

          <Form onSubmit={handleLoginSubmit(onLoginSubmit)}>
            <label>Email</label>
            <input
              className="auth-input"
              {...loginRegister("email", { required: "Please fill this field" })}
            />
            <p className="error-text">{loginErrors.email?.message}</p>

            <label>Password</label>
            <div className="password-wrapper">
              <input
                className="auth-input"
                type={showLoginPwd ? "text" : "password"}
                {...loginRegister("password", {
                  required: "Please fill this field",
                  minLength: { value: 6, message: "Minimum 6 characters" },
                })}
              />
              <span onClick={() => setShowLoginPwd(!showLoginPwd)}>
                {showLoginPwd ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            <p className="error-text">{loginErrors.password?.message}</p>

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

      {/* ================= SIGNUP MODAL ================= */}
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

          <Form onSubmit={handleSignupSubmit(onSignupSubmit)}>
            <div className="name-row">
              <div>
                <input
                  className="auth-input"
                  placeholder="First name"
                  {...signupRegister("firstName", { required: "Please fill this field" })}
                />
                <p className="error-text">{signupErrors.firstName?.message}</p>
              </div>

              <div>
                <input
                  className="auth-input"
                  placeholder="Last name"
                  {...signupRegister("lastName", { required: "Please fill this field" })}
                />
                <p className="error-text">{signupErrors.lastName?.message}</p>
              </div>
            </div>

            <label>Email</label>
            <input
              className="auth-input"
              {...signupRegister("email", {
                required: "Please fill this field",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Enter a valid email",
                },
              })}
            />
            <p className="error-text">{signupErrors.email?.message}</p>

            <label>Password</label>
            <div className="password-wrapper">
              <input
                className="auth-input"
                type={showSignupPwd ? "text" : "password"}
                {...signupRegister("password", {
                  required: "Please fill this field",
                  minLength: { value: 6, message: "Minimum 6 characters" },
                })}
              />
              <span onClick={() => setShowSignupPwd(!showSignupPwd)}>
                {showSignupPwd ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            <p className="error-text">{signupErrors.password?.message}</p>

            <label>Confirm Password</label>
            <div className="password-wrapper">
              <input
                className="auth-input"
                type={showSignupConfirmPwd ? "text" : "password"}
                {...signupRegister("confirmPassword", {
                  required: "Please fill this field",
                  validate: (v) => v === watch("password") || "Passwords do not match",
                })}
              />
              <span onClick={() => setShowSignupConfirmPwd(!showSignupConfirmPwd)}>
                {showSignupConfirmPwd ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            <p className="error-text">{signupErrors.confirmPassword?.message}</p>

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


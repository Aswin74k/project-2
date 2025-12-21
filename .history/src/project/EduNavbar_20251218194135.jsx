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

  /* ================= SCROLL ================= */
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* ================= LOGIN FORM ================= */
  const {
    register: loginRegister,
    handleSubmit: handleLoginSubmit,
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
      setLoginMsg(`Welcome back, ${foundUser.firstName} 👋`);

      resetLogin();
      setTimeout(() => {
        setShowLogin(false);
        setLoginMsg("");
      }, 1200);
    } else {
      setLoginMsg("Invalid email or password ❌");
    }
  };

  /* ================= SIGNUP FORM ================= */
  const {
    register: signupRegister,
    handleSubmit: handleSignupSubmit,
    formState: { errors },
    reset: resetSignup,
  } = useForm();

  const onSignupSubmit = (data) => {
    const users = JSON.parse(localStorage.getItem("registeredUsers")) || [];

    if (users.some((u) => u.email === data.email)) {
      setSignupMsg("Email already exists. Please login.");
      return;
    }

    users.push(data);
    localStorage.setItem("registeredUsers", JSON.stringify(users));

    setSignupMsg("Account created successfully!");
    resetSignup();

    setTimeout(() => {
      setSignupMsg("");
      setShowSignup(false);
      setShowLogin(true);
    }, 1200);
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
          <Navbar.Brand as={Link} to="/" className="d-flex gap-2">
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
            <input
              className="auth-input"
              placeholder="Enter email"
              {...loginRegister("email", { required: true })}
            />

            <div className="password-wrapper">
              <input
                className="auth-input"
                type={showLoginPwd ? "text" : "password"}
                placeholder="Enter password"
                {...loginRegister("password", { required: true })}
              />
              <span onClick={() => setShowLoginPwd(!showLoginPwd)}>
                {showLoginPwd ? <FaEyeSlash /> : <FaEye />}
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

      {/* ================= SIGNUP MODAL ================= */}
      {/* ================= SIGNUP MODAL ================= */}
<Modal show={showSignup} onHide={() => setShowSignup(false)} centered>
  <Modal.Header closeButton>
    <Modal.Title>Sign Up</Modal.Title>
  </Modal.Header>

  <Modal.Body>
    {signupMsg && (
      <div
        className={`modal-message ${
          signupMsg.includes("exists") ? "error" : "success"
        }`}
      >
        {signupMsg}
      </div>
    )}

    <Form onSubmit={handleSignupSubmit(onSignupSubmit)}>
      {/* NAME */}
      <div className="name-row">
        <input
          className="auth-input"
          placeholder="First name"
          {...signupRegister("firstName", {
            required: "First name is required",
          })}
        />

        <input
          className="auth-input"
          placeholder="Last name"
          {...signupRegister("lastName", {
            required: "Last name is required",
          })}
        />
      </div>

      {/* EMAIL */}
      <input
        className="auth-input mt-2"
        placeholder="Email"
        {...signupRegister("email", {
          required: "Email is required",
        })}
      />

      {/* PASSWORD */}
      <div className="password-wrapper">
        <input
          className="auth-input"
          type={showSignupPwd ? "text" : "password"}
          placeholder="Password"
          {...signupRegister("password", {
            required: "Password is required",
            minLength: {
              value: 6,
              message: "Minimum 6 characters required",
            },
          })}
        />

        <span onClick={() => setShowSignupPwd(!showSignupPwd)}>
          {showSignupPwd ? <FaEyeSlash /> : <FaEye />}
        </span>
      </div>

      {errors.password && (
        <small className="text-danger">
          {errors.password.message}
        </small>
      )}

      {/* CONFIRM PASSWORD */}
      <div className="password-wrapper mt-2">
        <input
          className="auth-input"
          type="password"
          placeholder="Confirm password"
          {...signupRegister("confirmPassword", {
            required: "Please confirm your password",
            validate: (value) =>
              value === signupPassword || "Passwords do not match",
          })}
        />
      </div>

      {errors.confirmPassword && (
        <small className="text-danger">
          {errors.confirmPassword.message}
        </small>
      )}

      <button className="auth-btn mt-3">Create Account</button>

      <div className="auth-footer">
        Already have an account?{" "}
        <span
          onClick={() => {
            setShowSignup(false);
            setShowLogin(true);
          }}
        >
          Login
        </span>
      </div>
    </Form>
  </Modal.Body>
</Modal>

    </>
  );
}

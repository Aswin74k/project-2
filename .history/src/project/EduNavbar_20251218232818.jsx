import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
jsx
Copy code

import { Navbar, Nav, Container, Form, Modal } from "react-bootstrap";
import { FaSearch, FaUser, FaEye, FaEyeSlash } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./navbar.css";

export default function EduNavbar() {
  const { user, login, signup, logout } = useAuth();

  const [scrolled, setScrolled] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  const [loginMsg, setLoginMsg] = useState("");
  const [signupMsg, setSignupMsg] = useState("");
  const [formError, setFormError] = useState("");

  const [showLoginPwd, setShowLoginPwd] = useState(false);
  const [showSignupPwd, setShowSignupPwd] = useState(false);
  const [showConfirmPwd, setShowConfirmPwd] = useState(false);

  /* ================= SCROLL ================= */
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* ================= 🔔 LISTEN FOR PROTECTED ROUTE ================= */
  useEffect(() => {
    const openLoginModal = () => {
      setShowLogin(true);
      setShowSignup(false);
    };

    window.addEventListener("showLoginModal", openLoginModal);

    return () => {
      window.removeEventListener("showLoginModal", openLoginModal);
    };
  }, []);

  /* ================= LOGIN ================= */
  const {
    register: loginRegister,
    handleSubmit: handleLoginSubmit,
    reset: resetLogin,
  } = useForm();

  const onLoginSubmit = (data) => {
    const res = login(data.email, data.password);

    if (res.success) {
      setLoginMsg(`Welcome back, ${res.user.firstName} 👋`);
      resetLogin();

      setTimeout(() => {
        setShowLogin(false);
        setLoginMsg("");
      }, 1200);
    } else {
      setLoginMsg(res.message);
    }
  };

  /* ================= SIGNUP ================= */
  const {
    register: signupRegister,
    handleSubmit: handleSignupSubmit,
    watch,
    formState: { errors },
    reset: resetSignup,
  } = useForm({ mode: "onSubmit" });

  const password = watch("password");

  const onSignupSubmit = (data) => {
    setFormError("");

    if (
      !data.firstName ||
      !data.lastName ||
      !data.email ||
      !data.password ||
      !data.confirmPassword
    ) {
      setFormError("Please fill all fields");
      return;
    }

    const res = signup(data);

    if (!res.success) {
      setSignupMsg(res.message);
      return;
    }

    setSignupMsg("Account created & logged in 🎉");
    resetSignup();

    setTimeout(() => {
      setShowSignup(false);
      setSignupMsg("");
    }, 1200);
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
              <Nav.Link as={Link} to="/Contact">Contact</Nav.Link>

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
                <FaUser
                  className="user-icon"
                  onClick={() => setShowLogin(true)}
                />
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
              placeholder="Email"
              {...loginRegister("email", { required: true })}
            />

            <div className="password-wrapper">
              <input
                className="auth-input"
                type={showLoginPwd ? "text" : "password"}
                placeholder="Password"
                {...loginRegister("password", { required: true })}
              />
              <span onClick={() => setShowLoginPwd(!showLoginPwd)}>
                {showLoginPwd ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>

            <button className="auth-btn">Login</button>

            <div className="auth-footer">
              Don’t have an account?{" "}
              <span
                onClick={() => {
                  setShowLogin(false);
                  setShowSignup(true);
                  setLoginMsg("");
                }}
              >
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
          {formError && <div className="modal-message error">{formError}</div>}
          {signupMsg && <div className="modal-message success">{signupMsg}</div>}

          <Form onSubmit={handleSignupSubmit(onSignupSubmit)}>
            <div className="name-row">
              <input className="auth-input" placeholder="First name" {...signupRegister("firstName")} />
              <input className="auth-input" placeholder="Last name" {...signupRegister("lastName")} />
            </div>

            <input className="auth-input mt-2" placeholder="Email" {...signupRegister("email")} />

            <div className="password-wrapper">
              <input
                className="auth-input"
                type={showSignupPwd ? "text" : "password"}
                placeholder="Password"
                {...signupRegister("password")}
              />
              <span onClick={() => setShowSignupPwd(!showSignupPwd)}>
                {showSignupPwd ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>

            <div className="password-wrapper mt-2">
              <input
                className="auth-input"
                type={showConfirmPwd ? "text" : "password"}
                placeholder="Confirm password"
                {...signupRegister("confirmPassword", {
                  validate: (value) =>
                    value === password || "Passwords do not match",
                })}
              />
              <span onClick={() => setShowConfirmPwd(!showConfirmPwd)}>
                {showConfirmPwd ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>

            {errors.confirmPassword && (
              <small className="text-danger">{errors.confirmPassword.message}</small>
            )}

            <button className="auth-btn mt-3">Create Account</button>

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

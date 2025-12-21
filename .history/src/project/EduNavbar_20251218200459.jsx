import React, { useState, useEffect } from "react";
import { Navbar, Nav, Container, Form, Modal } from "react-bootstrap";
import { FaSearch, FaUser, FaEye, FaEyeSlash } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./navbar.css";

export default function EduNavbar() {
  const { user, login, signup, logout } = useAuth(); // ✅ CONTEXT

  const [scrolled, setScrolled] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  const [loginMsg, setLoginMsg] = useState("");
  const [signupMsg, setSignupMsg] = useState("");

  const [showLoginPwd, setShowLoginPwd] = useState(false);
  const [showSignupPwd, setShowSignupPwd] = useState(false);
  const [showConfirmPwd, setShowConfirmPwd] = useState(false);

  /* ================= SCROLL ================= */
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* 🔔 OPEN LOGIN FROM PROTECTED ROUTE */
  useEffect(() => {
    const openLogin = () => setShowLogin(true);
    window.addEventListener("showLoginModal", openLogin);
    return () => window.removeEventListener("showLoginModal", openLogin);
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
  } = useForm();

  const password = watch("password");

  const onSignupSubmit = (data) => {
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
              <input
                className="auth-input"
                placeholder="First name"
                {...signupRegister("firstName", { required: true })}
              />
              <input
                className="auth-input"
                placeholder="Last name"
                {...signupRegister("lastName", { required: true })}
              />
            </div>

            <input
              className="auth-input mt-2"
              placeholder="Email"
              {...signupRegister("email", { required: true })}
            />

            {/* PASSWORD */}
            <div className="password-wrapper">
              <input
                className="auth-input"
                type={showSignupPwd ? "text" : "password"}
                placeholder="Password"
                {...signupRegister("password", {
                  required: true,
                  minLength: 6,
                })}
              />
              <span onClick={() => setShowSignupPwd(!showSignupPwd)}>
                {showSignupPwd ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>

            {/* CONFIRM PASSWORD */}
            <div className="password-wrapper mt-2">
              <input
                className="auth-input"
                type={showConfirmPwd ? "text" : "password"}
                placeholder="Confirm password"
                {...signupRegister("confirmPassword", {
                  validate: (v) => v === password || "Passwords do not match",
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
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

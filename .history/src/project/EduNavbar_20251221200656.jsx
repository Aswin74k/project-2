import React, { useState, useEffect } from "react";
import { Navbar, Nav, Container, Form, Modal } from "react-bootstrap";
import { FaSearch, FaUser, FaEye, FaEyeSlash } from "react-icons/fa";
import { BiLogOut } from "react-icons/bi";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./navbar.css";

export default function EduNavbar() {
  const { user, login, signup, logout } = useAuth();
  const navigate = useNavigate();

  const [scrolled, setScrolled] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [showLogout, setShowLogout] = useState(false);

  const [loginMsg, setLoginMsg] = useState("");
  const [signupMsg, setSignupMsg] = useState("");

  const [showLoginPwd, setShowLoginPwd] = useState(false);
  const [showSignupPwd, setShowSignupPwd] = useState(false);
  const [showConfirmPwd, setShowConfirmPwd] = useState(false);

  /* ================= SCROLL EFFECT ================= */
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* ================= LOGIN FORM ================= */
  const {
    register: loginRegister,
    handleSubmit: handleLoginSubmit,
    formState: { errors: loginErrors },
    reset: resetLogin,
  } = useForm();

  const onLoginSubmit = (data) => {
    const res = login(data.email, data.password);
    setLoginMsg(res.message);
    if (res.success) resetLogin();
  };

  /* ================= SIGNUP FORM ================= */
  const {
    register: signupRegister,
    handleSubmit: handleSignupSubmit,
    watch,
    formState: { errors: signupErrors },
    reset: resetSignup,
  } = useForm();

  const password = watch("password");

  const onSignupSubmit = (data) => {
    const res = signup(data);
    setSignupMsg(res.message);
    if (res.success) resetSignup();
  };

  /* ================= LOGOUT ================= */
  const handleLogoutConfirm = () => {
    setShowLogout(false);
    logout();
  };

  return (
    <>
      {/* ================= NAVBAR ================= */}
      <Navbar fixed="top" expand="lg" className={scrolled ? "navbar navbar-scrolled" : "navbar"}>
        <Container>
          <Navbar.Brand as={Link} to="/">EduTech</Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse>
            <Nav className="ms-auto gap-3 align-items-center">
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
                  <button className="logout-icon" onClick={() => setShowLogout(true)}>
                    <BiLogOut size={22} />
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
          {loginMsg && <div className="modal-message error">{loginMsg}</div>}

          <Form onSubmit={handleLoginSubmit(onLoginSubmit)}>
            <input
              className="auth-input"
              placeholder="Email"
              {...loginRegister("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Enter a valid email",
                },
              })}
            />
            {loginErrors.email && (
              <small className="text-danger">{loginErrors.email.message}</small>
            )}

            <div className="password-wrapper">
              <input
                className="auth-input"
                type={showLoginPwd ? "text" : "password"}
                placeholder="Password"
                {...loginRegister("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Minimum 6 characters",
                  },
                })}
              />
              <span onClick={() => setShowLoginPwd(!showLoginPwd)}>
                {showLoginPwd ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>

            {loginErrors.password && (
              <small className="text-danger">{loginErrors.password.message}</small>
            )}

            <button className="auth-btn mt-3">Login</button>
          </Form>
        </Modal.Body>
      </Modal>

      {/* ================= SIGNUP MODAL ================= */}
      <Modal show={showSignup} onHide={() => setShowSignup(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Sign Up</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {signupMsg && <div className="modal-message success">{signupMsg}</div>}

          <Form onSubmit={handleSignupSubmit(onSignupSubmit)}>
            <div className="name-row">
              <input
                className="auth-input"
                placeholder="First name"
                {...signupRegister("firstName", { required: "First name required" })}
              />
              <input
                className="auth-input"
                placeholder="Last name"
                {...signupRegister("lastName", { required: "Last name required" })}
              />
            </div>

            <input
              className="auth-input mt-2"
              placeholder="Email"
              {...signupRegister("email", {
                required: "Email required",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Invalid email",
                },
              })}
            />

            <div className="password-wrapper">
              <input
                className="auth-input"
                type={showSignupPwd ? "text" : "password"}
                placeholder="Password"
                {...signupRegister("password", {
                  required: "Password required",
                  minLength: {
                    value: 6,
                    message: "Minimum 6 characters",
                  },
                })}
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
                  required: "Confirm password required",
                  validate: (v) => v === password || "Passwords do not match",
                })}
              />
              <span onClick={() => setShowConfirmPwd(!showConfirmPwd)}>
                {showConfirmPwd ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>

            {signupErrors.confirmPassword && (
              <small className="text-danger">{signupErrors.confirmPassword.message}</small>
            )}

            <button className="auth-btn mt-3">Create Account</button>
          </Form>
        </Modal.Body>
      </Modal>

      {/* ================= LOGOUT MODAL ================= */}
      <Modal show={showLogout} onHide={() => setShowLogout(false)} centered>
        <Modal.Body className="text-center">
          <BiLogOut size={36} className="text-danger" />
          <h5 className="mt-3">Logout</h5>
          <p>Are you sure you want to logout?</p>

          <div className="d-flex justify-content-center gap-3">
            <button className="btn btn-outline-secondary" onClick={() => setShowLogout(false)}>
              Cancel
            </button>
            <button className="btn btn-danger" onClick={handleLogoutConfirm}>
              Logout
            </button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

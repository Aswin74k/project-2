import React, { useState, useEffect, useRef } from "react";
import { Navbar, Nav, Container, Form, Modal } from "react-bootstrap";
import { FaSearch, FaEye, FaEyeSlash } from "react-icons/fa";
import { BiLogOut } from "react-icons/bi";
import { CiUser } from "react-icons/ci";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Navbar.css";

export default function EduNavbar() {
  const { user, login, signup, logout } = useAuth();
  const navigate = useNavigate();

  const [scrolled, setScrolled] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [showLogout, setShowLogout] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const [loginMsg, setLoginMsg] = useState("");
  const [signupMsg, setSignupMsg] = useState("");

  const [showLoginPwd, setShowLoginPwd] = useState(false);
  const [showSignupPwd, setShowSignupPwd] = useState(false);
  const [showConfirmPwd, setShowConfirmPwd] = useState(false);

  const profileRef = useRef(null);

  /* ================= SCROLL EFFECT ================= */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ================= CLOSE PROFILE MENU ================= */
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setShowProfileMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  /* ================= EXTERNAL LOGIN TRIGGER ================= */
  useEffect(() => {
    const openLogin = () => {
      setShowSignup(false);
      setShowLogin(true);
    };
    window.addEventListener("showLoginModal", openLogin);
    return () =>
      window.removeEventListener("showLoginModal", openLogin);
  }, []);

  /* ================= AUTO CLOSE AFTER AUTH ================= */
  useEffect(() => {
    if (user) {
      const timer = setTimeout(() => {
        setShowLogin(false);
        setShowSignup(false);
        setLoginMsg("");
        setSignupMsg("");

        const redirectPath =
          sessionStorage.getItem("redirectAfterLogin");
        if (redirectPath) {
          sessionStorage.removeItem("redirectAfterLogin");
          navigate(redirectPath);
        }
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, [user, navigate]);

  /* ================= LOGIN FORM (RHF) ================= */
  const {
    register: loginRegister,
    handleSubmit: handleLoginSubmit,
    formState: { errors: loginErrors },
    reset: resetLogin,
  } = useForm({ mode: "onBlur" });

  const onLoginSubmit = (data) => {
    const res = login(data.email, data.password);
    setLoginMsg(res.message);
    if (res.success) resetLogin();
  };

  /* ================= SIGNUP FORM (RHF) ================= */
  const {
    register: signupRegister,
    handleSubmit: handleSignupSubmit,
    watch,
    formState: { errors: signupErrors },
    reset: resetSignup,
  } = useForm({ mode: "onBlur" });

  const password = watch("password");

  const onSignupSubmit = (data) => {
    const res = signup(data);
    setSignupMsg(res.message);
    if (res.success) resetSignup();
  };

  return (
    <>
      {/* ================= NAVBAR ================= */}
      <Navbar
        fixed="top"
        expand="lg"
        className={scrolled ? "navbar navbar-scrolled" : "navbar"}
      >
        <Container>
          <Navbar.Brand as={Link} to="/">
            TechMentor
          </Navbar.Brand>

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
                <div className="profile-wrapper" ref={profileRef}>
                  <span
                    className="username clickable"
                    onClick={() =>
                      setShowProfileMenu(prev => !prev)
                    }
                  >
                    Hi, {user.firstName}
                  </span>

                  {showProfileMenu && (
                    <div className="profile-dropdown">
                      <button
                        onClick={() => {
                          setShowProfileMenu(false);
                          window.dispatchEvent(
                            new Event("openProfileSidebar")
                          );
                        }}
                      >
                        <CiUser size={20} />
                        Profile
                      </button>

                      <button
                        className="logout-btn"
                        onClick={() => {
                          setShowProfileMenu(false);
                          setShowLogout(true);
                        }}
                      >
                        <BiLogOut />
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  className="join-btn"
                  onClick={() => setShowSignup(true)}
                >
                  Join Now
                </button>
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
          {loginMsg && <div className="modal-message">{loginMsg}</div>}

          <Form onSubmit={handleLoginSubmit(onLoginSubmit)} noValidate>
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
            <small className="text-danger">
              {loginErrors.email?.message}
            </small>

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
              <span
                onClick={() => setShowLoginPwd(prev => !prev)}
              >
                {showLoginPwd ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            <small className="text-danger">
              {loginErrors.password?.message}
            </small>

            <button className="auth-btn mt-3">Login</button>

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
      <Modal
  show={showSignup}
  onHide={() => {
    setShowSignup(false);
    resetSignup();
    setSignupMsg("");
  }}
  centered
>
        <Modal.Header closeButton>
          <Modal.Title>Sign Up</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {signupMsg && <div className="modal-message">{signupMsg}</div>}

          <Form onSubmit={handleSignupSubmit(onSignupSubmit)} noValidate>
            <div className="name-row">
              <input
                className="auth-input"
                placeholder="First name"
                {...signupRegister("firstName", {
                  required: "First name required",
                })}
              />
              <input
                className="auth-input"
                placeholder="Last name"
                {...signupRegister("lastName", {
                  required: "Last name required",
                })}
              />
            </div>
            <small className="text-danger">
              {signupErrors.firstName?.message ||
                signupErrors.lastName?.message}
            </small>

            <input
              className="auth-input mt-2"
              placeholder="Email"
              {...signupRegister("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Enter a valid email",
                },
              })}
            />
            <small className="text-danger">
              {signupErrors.email?.message}
            </small>

            <div className="password-wrapper">
              <input
                className="auth-input"
                type={showSignupPwd ? "text" : "password"}
                placeholder="Password"
                {...signupRegister("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Minimum 6 characters",
                  },
                })}
              />
              <span
                onClick={() => setShowSignupPwd(prev => !prev)}
              >
                {showSignupPwd ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            <small className="text-danger">
              {signupErrors.password?.message}
            </small>

            <div className="password-wrapper mt-2">
              <input
                className="auth-input"
                type={showConfirmPwd ? "text" : "password"}
                placeholder="Confirm password"
                {...signupRegister("confirmPassword", {
                  validate: v =>
                    v === password || "Passwords do not match",
                })}
              />
              <span
                onClick={() => setShowConfirmPwd(prev => !prev)}
              >
                {showConfirmPwd ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            <small className="text-danger">
              {signupErrors.confirmPassword?.message}
            </small>

            <button className="auth-btn mt-3">
              Create Account
            </button>

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

      <Modal
        show={showLogout}
        onHide={() => setShowLogout(false)}
        centered
      >
        <Modal.Body className="text-center">
          <BiLogOut style={{ fontSize: "40px", color: "#090909ff" }} />

          <h4 className="mt-3">Logout</h4>
          <p>Are you sure you want to logout of your account?</p>

          <div className="d-flex justify-content-center gap-3 mt-4">
            <button
              className="logout-cancel"
              onClick={() => setShowLogout(false)}
            >
              Cancel
            </button>

            <button
              className="logout-confirm"
              onClick={() => {
                logout();
                setShowLogout(false);
              }}
            >
              Logout
            </button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

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
  const [showLogout, setShowLogout] = useState(false); // ✅ added

  const [loginMsg, setLoginMsg] = useState("");
  const [signupMsg, setSignupMsg] = useState("");
  const [formError, setFormError] = useState("");

  const [showLoginPwd, setShowLoginPwd] = useState(false);
  const [showSignupPwd, setShowSignupPwd] = useState(false);
  const [showConfirmPwd, setShowConfirmPwd] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const openLoginModal = () => {
      setShowLogin(true);
      setShowSignup(false);
    };

    window.addEventListener("showLoginModal", openLoginModal);
    return () =>
      window.removeEventListener("showLoginModal", openLoginModal);
  }, []);

  useEffect(() => {
    if (user) {
      const timer = setTimeout(() => {
        setShowLogin(false);
        setShowSignup(false);
        setLoginMsg("");
        setSignupMsg("");
        setFormError("");

        const redirectPath = sessionStorage.getItem("redirectAfterLogin");
        if (redirectPath) {
          sessionStorage.removeItem("redirectAfterLogin");
          navigate(redirectPath);
        }
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, [user, navigate]);

  /* Login */
  const {
    register: loginRegister,
    handleSubmit: handleLoginSubmit,
    reset: resetLogin,
  } = useForm();

  const onLoginSubmit = (data) => {
    const res = login(data.email, data.password);
    setLoginMsg(res.message);
    if (res.success) resetLogin();
  };

  /* Signup */
  const {
    register: signupRegister,
    handleSubmit: handleSignupSubmit,
    watch,
    formState: { errors },
    reset: resetSignup,
  } = useForm();

  const password = watch("password");

  const onSignupSubmit = (data) => {
    setFormError("");
    setSignupMsg("");

    if (
      !data.firstName ||
      !data.lastName ||
      !data.email ||
      !data.password ||
      !data.confirmPassword
    ) {
      setFormError("Please fill all fields");
      setTimeout(() => setFormError(""), 2000);
      return;
    }

    const res = signup(data);
    setSignupMsg(res.message);

    setTimeout(() => setSignupMsg(""), 3000);
    if (res.success) resetSignup();
  };

  /* ✅ LOGOUT HANDLER (AUTO CLOSE MODAL) */
  const handleLogoutConfirm = () => {
    setShowLogout(false);
    setTimeout(() => {
      logout();
    }, 300);
  };

  return (
    <>
      <Navbar
        fixed="top"
        expand="lg"
        className={scrolled ? "navbar navbar-scrolled" : "navbar"}
      >
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
                  <button
                    className="logout-icon"
                    onClick={() => setShowLogout(true)} // ✅ changed
                  >
                    <BiLogOut size={22} />
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
                autoComplete="off"
                {...loginRegister("password",)}
              />
              <span onClick={() => setShowLoginPwd(!showLoginPwd)}>
                {showLoginPwd ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>

            <button className="auth-btn">Login</button>
          </Form>
        </Modal.Body>
      </Modal>

      {/* SIGNUP MODAL */}
      <Modal show={showSignup} onHide={() => setShowSignup(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Sign Up</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {formError && <div className="modal-message error">{formError}</div>}
          {signupMsg && (
            <div className={`modal-message ${signupMsg.includes("exists") ? "error" : "success"}`}>
              {signupMsg}
            </div>
          )}

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

    <Modal
  show={showLogout}
  onHide={() => setShowLogout(false)}
  centered
  dialogClassName="logout-modal"
>
  <Modal.Body>
    <BiLogOut size={38} />
    <h5>Logout</h5>
    <p>Are you sure you want to logout?</p>

    <div className="logout-actions">
      <button
        className="btn-cancel"
        onClick={() => setShowLogout(false)}
      >
        Cancel
      </button>

      <button
        className="btn-logout"
        onClick={handleLogoutConfirm}
      >
        Logout
      </button>
    </div>
  </Modal.Body>
</Modal>

    </>
  );
}

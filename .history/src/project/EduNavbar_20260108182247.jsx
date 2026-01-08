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
    const closeMenu = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setShowProfileMenu(false);
      }
    };
    document.addEventListener("mousedown", closeMenu);
    return () => document.removeEventListener("mousedown", closeMenu);
  }, []);

  /* ================= EXTERNAL LOGIN TRIGGER ================= */
  useEffect(() => {
    const openLogin = () => {
      setShowSignup(false);
      setShowLogin(true);
    };
    window.addEventListener("showLoginModal", openLogin);
    return () => window.removeEventListener("showLoginModal", openLogin);
  }, []);

  /* ================= AUTO CLOSE AFTER AUTH ================= */
  useEffect(() => {
    if (user) {
      const t = setTimeout(() => {
        setShowLogin(false);
        setShowSignup(false);
        setLoginMsg("");
        setSignupMsg("");

        const redirect = sessionStorage.getItem("redirectAfterLogin");
        if (redirect) {
          sessionStorage.removeItem("redirectAfterLogin");
          navigate(redirect);
        }
      }, 1200);

      return () => clearTimeout(t);
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
      <Navbar fixed="top" expand="lg" className={scrolled ? "navbar navbar-scrolled" : "navbar"}>
        <Container>
          <Navbar.Brand as={Link} to="/">TechMentor</Navbar.Brand>
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
                  <span className="username clickable" onClick={() => setShowProfileMenu(p => !p)}>
                    Hi, {user.firstName}
                  </span>

                  {showProfileMenu && (
                    <div className="profile-dropdown">
                      <button onClick={() => {
                        setShowProfileMenu(false);
                        window.dispatchEvent(new Event("openProfileSidebar"));
                      }}>
                        <CiUser size={20} /> Profile
                      </button>

                      <button className="logout-btn" onClick={() => {
                        setShowProfileMenu(false);
                        setShowLogout(true);
                      }}>
                        <BiLogOut /> Logout
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <button className="join-btn" onClick={() => setShowSignup(true)}>
                  Join Now
                </button>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* ================= LOGIN MODAL ================= */}
      <Modal show={showLogin} onHide={() => setShowLogin(false)} centered>
        <Modal.Header closeButton><Modal.Title>Login</Modal.Title></Modal.Header>
        <Modal.Body>
          {loginMsg && <div className="modal-message">{loginMsg}</div>}

          <Form onSubmit={handleLoginSubmit(onLoginSubmit)} noValidate>
            <input
              className="auth-input"
              placeholder="Email"
              {...loginRegister("email", {
                required: "Email required",
                pattern: { value: /^\S+@\S+$/i, message: "Invalid email" },
              })}
            />
            <small className="text-danger">{loginErrors.email?.message}</small>

            <div className="password-wrapper">
              <input
                className="auth-input"
                type={showLoginPwd ? "text" : "password"}
                placeholder="Password"
                {...loginRegister("password", {
                  required: "Password required",
                  minLength: { value: 6, message: "Min 6 characters" },
                })}
              />
              <span onClick={() => setShowLoginPwd(p => !p)}>
                {showLoginPwd ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            <small className="text-danger">{loginErrors.password?.message}</small>

            <button className="auth-btn mt-3">Login</button>
          </Form>
        </Modal.Body>
      </Modal>

      {/* ================= SIGNUP MODAL ================= */}
      <Modal show={showSignup} onHide={() => setShowSignup(false)} centered>
        <Modal.Header closeButton><Modal.Title>Sign Up</Modal.Title></Modal.Header>
        <Modal.Body>
          {signupMsg && <div className="modal-message">{signupMsg}</div>}

          <Form onSubmit={handleSignupSubmit(onSignupSubmit)} noValidate>
            <div className="name-row">
              <input className="auth-input" placeholder="First name"
                {...signupRegister("firstName", { required: "Required" })} />
              <input className="auth-input" placeholder="Last name"
                {...signupRegister("lastName", { required: "Required" })} />
            </div>

            <small className="text-danger">
              {signupErrors.firstName?.message || signupErrors.lastName?.message}
            </small>

            <input className="auth-input mt-2" placeholder="Email"
              {...signupRegister("email", {
                required: "Email required",
                pattern: { value: /^\S+@\S+$/i, message: "Invalid email" },
              })} />
            <small className="text-danger">{signupErrors.email?.message}</small>

            <div className="password-wrapper">
              <input className="auth-input"
                type={showSignupPwd ? "text" : "password"}
                placeholder="Password"
                {...signupRegister("password", {
                  required: "Password required",
                  minLength: { value: 6, message: "Min 6 characters" },
                })} />
              <span onClick={() => setShowSignupPwd(p => !p)}>
                {showSignupPwd ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            <small className="text-danger">{signupErrors.password?.message}</small>

            <div className="password-wrapper mt-2">
              <input className="auth-input"
                type={showConfirmPwd ? "text" : "password"}
                placeholder="Confirm password"
                {...signupRegister("confirmPassword", {
                  validate: v => v === password || "Passwords do not match",
                })} />
              <span onClick={() => setShowConfirmPwd(p => !p)}>
                {showConfirmPwd ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            <small className="text-danger">{signupErrors.confirmPassword?.message}</small>

            <button className="auth-btn mt-3">Create Account</button>
          </Form>
        </Modal.Body>
      </Modal>

      {/* ================= LOGOUT ================= */}
      <Modal show={showLogout} onHide={() => setShowLogout(false)} centered>
        <Modal.Body className="text-center">
          <BiLogOut size={40} />
          <h4 className="mt-3">Logout</h4>
          <p>Are you sure?</p>

          <div className="d-flex justify-content-center gap-3">
            <button className="logout-cancel" onClick={() => setShowLogout(false)}>Cancel</button>
            <button className="logout-confirm" onClick={() => { logout(); setShowLogout(false); }}>
              Logout
            </button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
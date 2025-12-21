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
    formState: { errors: loginErrors },
    reset: resetLogin,
  } = useForm();

  const onLoginSubmit = (data) => {
    const savedUser = JSON.parse(localStorage.getItem("registeredUser"));

    if (
      savedUser &&
      data.email === savedUser.email &&
      data.password === savedUser.password
    ) {
      localStorage.setItem("loggedInUser", JSON.stringify(savedUser));
      setUser(savedUser);
      setLoginMsg(`Welcome back, ${savedUser.firstName}`);
      resetLogin();

      setTimeout(() => {
        setShowLogin(false);
        setLoginMsg("");
      }, 1500);
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
    localStorage.setItem(
      "registeredUser",
      JSON.stringify({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: data.password,
      })
    );

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

  useEffect(() => {
  const openLogin = () => {
    setShowLogin(true);
  };

  window.addEventListener("showLoginModal", openLogin);

  return () => {
    window.removeEventListener("showLoginModal", openLogin);
  };
}, []);

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
              <Nav.Link as={Link} to="/contact">Contact</Nav.Link>

              <div className="custom-search">
                <FaSearch className="search-left-icon" />
                <input type="text" placeholder="Search courses..." />
              </div>

              {user ? (
                <>
                  <span className="username">Hi, {user.firstName}</span>
                  <button className="logout-btn" onClick={handleLogout}>
                    Logout
                  </button>
                </>
              ) : (
                <FaUser
                  className="user-icon"
                  size={22}
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
            <label>Email</label>
            <input
              className="auth-input"
              placeholder="Enter email"
              {...loginRegister("email", { required: "Email required" })}
            />
            <p className="error-text">{loginErrors.email?.message}</p>

            <label>Password</label>
            <div className="password-wrapper">
              <input
                className="auth-input"
                type={showLoginPwd ? "text" : "password"}
                placeholder="Enter password"
                {...loginRegister("password", {
                  required: "Password required",
                  minLength: { value: 6, message: "Min 6 characters" },
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
          {signupMsg && <div className="modal-message success">{signupMsg}</div>}

          <Form onSubmit={handleSignupSubmit(onSignupSubmit)}>
            <div className="name-row">
              <input
                className="auth-input"
                placeholder="Enter first name"
                {...signupRegister("firstName", { required: "Required" })}
              />
              <input
                className="auth-input"
                placeholder="Enter last name"
                {...signupRegister("lastName", { required: "Required" })}
              />
            </div>

            <label>Email</label>
            <input
              className="auth-input"
              placeholder="Enter email"
              {...signupRegister("email", { required: "Email required" })}
            />

            <label>Password</label>
            <div className="password-wrapper">
              <input
                className="auth-input"
                type={showSignupPwd ? "text" : "password"}
                placeholder="Enter password"
                {...signupRegister("password", { required: true })}
              />
              <span onClick={() => setShowSignupPwd(!showSignupPwd)}>
                {showSignupPwd ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>

            <label>Confirm Password</label>
            <div className="password-wrapper">
              <input
                className="auth-input"
                type={showSignupConfirmPwd ? "text" : "password"}
                placeholder="Confirm password"
                {...signupRegister("confirmPassword", {
                  validate: (v) =>
                    v === watch("password") || "Passwords do not match",
                })}
              />
              <span onClick={() => setShowSignupConfirmPwd(!showSignupConfirmPwd)}>
                {showSignupConfirmPwd ? <FaEyeSlash /> : <FaEye />}
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

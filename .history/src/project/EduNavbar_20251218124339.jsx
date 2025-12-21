import React, { useState, useEffect } from "react";
import { Navbar, Nav, Container, Form, Button, Modal } from "react-bootstrap";
import { FaSearch, FaUser, FaEye, FaEyeSlash } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import "./navbar.css";

export default function EduNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  // ✅ USE SAME KEY EVERYWHERE
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

  /* ================= LOAD USER ON REFRESH ================= */
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (storedUser) setUser(storedUser);
  }, []);

  /* ================= LOGIN FORM ================= */
  const {
    register: loginRegister,
    handleSubmit: handleLoginSubmit,
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

      setLoginMsg(`Welcome back, ${savedUser.firstName} 👋`);
      resetLogin();

      setTimeout(() => {
        setShowLogin(false);
        setLoginMsg("");
      }, 1500);
    } else {
      setLoginMsg("Invalid email or password ❌");
    }
  };

  /* ================= SIGNUP FORM ================= */
  const {
    register: signupRegister,
    handleSubmit: handleSignupSubmit,
    watch,
    reset: resetSignup,
  } = useForm();

  const onSignupSubmit = (data) => {
    const userData = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: data.password,
    };

    localStorage.setItem("registeredUser", JSON.stringify(userData));

    setSignupMsg("Signup successful! Please login ✅");
    resetSignup();

    setTimeout(() => {
      setSignupMsg("");
      setShowSignup(false);
      setShowLogin(true);
    }, 1500);
  };

  /* ================= LOGOUT ================= */
  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    setUser(null);
  };

  /* ================= OPEN LOGIN FROM PROTECTED ROUTE ================= */
  useEffect(() => {
    const openLogin = () => setShowLogin(true);
    window.addEventListener("showLoginModal", openLogin);
    return () => window.removeEventListener("showLoginModal", openLogin);
  }, []);

  return (
    <>
      {/* ================= NAVBAR ================= */}
      <Navbar expand="lg" fixed="top" className={scrolled ? "navbar navbar-scrolled" : "navbar"}>
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
            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" {...loginRegister("email", { required: true })} />
            </Form.Group>

            <Form.Group className="mt-3 password-wrapper">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type={showLoginPwd ? "text" : "password"}
                {...loginRegister("password", { required: true })}
              />
              <span className="password-toggle" onClick={() => setShowLoginPwd(!showLoginPwd)}>
                {showLoginPwd ? <FaEyeSlash /> : <FaEye />}
              </span>
            </Form.Group>

            <Button type="submit" className="w-100 mt-4">Login</Button>

            <p className="text-center mt-3">
              Don’t have an account?{" "}
              <span style={{ color: "#0d6efd", cursor: "pointer" }}
                onClick={() => { setShowLogin(false); setShowSignup(true); }}>
                Sign Up
              </span>
            </p>
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
            <Form.Control placeholder="First Name" {...signupRegister("firstName", { required: true })} />
            <Form.Control className="mt-2" placeholder="Last Name" {...signupRegister("lastName", { required: true })} />

            <Form.Control className="mt-3" type="email" placeholder="Email"
              {...signupRegister("email", { required: true })} />

            <Form.Control className="mt-3" type="password" placeholder="Password"
              {...signupRegister("password", { required: true })} />

            <Form.Control className="mt-3" type="password" placeholder="Confirm Password"
              {...signupRegister("confirmPassword", {
                validate: (v) => v === watch("password") || "Passwords do not match"
              })} />

            <Button type="submit" className="w-100 mt-4">Create Account</Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

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
      <div className="name-row">
        <div>
          <input
            className="auth-input"
            placeholder="Enter first name"
            {...signupRegister("firstName", { required: "First name required" })}
          />
          <p className="error-text">{signupErrors.firstName?.message}</p>
        </div>

        <div>
          <input
            className="auth-input"
            placeholder="Enter last name"
            {...signupRegister("lastName", { required: "Last name required" })}
          />
          <p className="error-text">{signupErrors.lastName?.message}</p>
        </div>
      </div>

      <label>Email</label>
      <input
        className="auth-input"
        placeholder="Enter email"
        {...signupRegister("email", {
          required: "Email required",
          pattern: {
            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: "Enter valid email",
          },
        })}
      />
      <p className="error-text">{signupErrors.email?.message}</p>

      <label>Password</label>
      <div className="password-wrapper">
        <input
          className="auth-input"
          type={showSignupPwd ? "text" : "password"}
          placeholder="Enter password"
          {...signupRegister("password", {
            required: "Password required",
            minLength: { value: 6, message: "Min 6 characters" },
          })}
        />
        <span onClick={() => setShowSignupPwd(!showSignupPwd)}>
          {showSignupPwd ? <FaEyeSlash /> : <FaEye />}
        </span>
      </div>
      <p className="error-text">{signupErrors.password?.message}</p>

      <button className="auth-btn">Create Account</button>

      {/* ✅ LOGIN LINK */}
      <div className="auth-footer">
        Already have an account?{" "}
        <span onClick={() => { setShowSignup(false); setShowLogin(true); }}>
          Login
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

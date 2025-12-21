import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";

export default function EduNavbar() {
  return (
    <Navbar expand="lg" bg="light" className="shadow-sm">
      <Container>
        {/* Logo / Brand */}
        <Navbar.Brand href="/" className="fw-bold text-primary">
          EduTech
        </Navbar.Brand>

        {/* Hamburger toggle (mobile) */}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto gap-3">
            <Nav.Link href="/" className="fw-medium">
              Home
            </Nav.Link>

            <Nav.Link href="/about" className="fw-medium">
              About
            </Nav.Link>

            <Nav.Link href="/contact" className="fw-medium">
              Contact
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}






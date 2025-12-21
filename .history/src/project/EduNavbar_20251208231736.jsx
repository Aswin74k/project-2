import React, { useEffect, useState } from "react";
import { Navbar, Nav, Container, Form, InputGroup } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";
import "./navbar.css";

export default function EduNavbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Navbar expand="lg" className={scrolled ? "navbar navbar-scrolled" : "navbar"}>
      <Container>

        {/* Logo */}
        <Navbar.Brand href="/">EduTech</Navbar.Brand>

        <Navbar.Toggle />
        <Navbar.Collapse>

          {/* CENTER SEARCH BAR */}
          <div className="search-container mx-auto">
            <InputGroup>
              <Form.Control
                type="text"
                placeholder="Search courses..."
                className="search-input"
              />
              <InputGroup.Text className="search-icon">
                <FaSearch />
              </InputGroup.Text>
            </InputGroup>
          </div>

          {/* Links */}
          <Nav className="ms-auto gap-2">
            <Nav.Link href="/" className="active">Home</Nav.Link>
            <Nav.Link href="/about">About</Nav.Link>
            <Nav.Link href="/contact">Contact</Nav.Link>
          </Nav>

        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}






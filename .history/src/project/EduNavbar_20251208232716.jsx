import React, { useEffect, useState } from "react";
import { Navbar, Nav, Container, Form, InputGroup } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";
import "./navbar.css";

export default function EduNavbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Navbar expand="lg" className={scrolled ? "navbar navbar-scrolled" : "navbar"}>
      <Container>

        {/* LOGO WITH IMAGE */}
        <Navbar.Brand href="/" className="d-flex align-items-center gap-2">
          <img 
            src="https://w7.pngwing.com/pngs/129/154/png-transparent-computer-icons-education-learning-training-others-angle-text-share-icon.png"
            alt="EduTech Icon"
            className="nav-icon"
          />
          <span>EduTech</span>
        </Navbar.Brand>

        <Navbar.Toggle />
        <Navbar.Collapse>

          {/* SEARCH BAR */}
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

          {/* NAV LINKS */}
          <Nav className="ms-auto gap-3">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/about">About</Nav.Link>
            <Nav.Link href="/contact">Contact</Nav.Link>
          </Nav>

        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}







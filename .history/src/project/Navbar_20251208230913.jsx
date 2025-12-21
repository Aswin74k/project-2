import React from "react";
import { Navbar, Nav, Container, Form, FormControl, Button } from "react-bootstrap";
import { FaSearch, FaCog } from "react-icons/fa";

const NavBar = () => {
  return (
    <Navbar expand="lg" bg="white" className="shadow-sm py-3">
      <Container>

        {/* LOGO */}
        <Navbar.Brand href="#" className="fw-bold fs-4">
          <img
            src="https://cdn-icons-png.flaticon.com/512/1048/1048949.png"
            width="35"
            className="me-2"
          />
          EduTech
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav">

          {/* CENTER NAV LINKS */}
          <Nav className="mx-auto gap-4 fs-5">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#products">Products</Nav.Link>
            <Nav.Link href="#features">Features</Nav.Link>
            <Nav.Link href="#about">About</Nav.Link>
          </Nav>

          {/* SEARCH + SETTINGS */}
          <div className="d-flex align-items-center gap-3">

            {/* Search box */}
            <Form className="d-flex search-box">
              <FormControl
                type="search"
                placeholder="Search"
                className="rounded-pill px-3"
              />
              <FaSearch className="ms-2 fs-4" />
            </Form>

            {/* Settings icon */}
            <FaCog className="fs-3 ms-2" style={{ cursor: "pointer" }} />
          </div>

        </Navbar.Collapse>

      </Container>
    </Navbar>
  );
};

export default NavBar;





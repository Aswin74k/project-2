import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

function AppNavbar() {
  return (
    <Navbar expand="lg" bg="dark" variant="dark" sticky="top">
      <Container>

        {/* LOGO */}
        <Navbar.Brand href="#">
          <strong>EduTech</strong>
        </Navbar.Brand>

        {/* HAMBURGER TOGGLER */}
        <Navbar.Toggle aria-controls="main-navbar" />

        <Navbar.Collapse id="main-navbar">

          {/* NAV LINKS */}
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#about">About</Nav.Link>
            <Nav.Link href="#contact">Contact</Nav.Link>
          </Nav>

          {/* SEARCH BAR */}
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
            />
            <Button variant="primary">Search</Button>
          </Form>

        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default AppNavbar;





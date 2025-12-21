import React, { useState } from "react";
import { Container, Form, Button, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./Enroll.css"; // optional for custom styles

export default function Enroll() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    age: "",
  });

  const [successMsg, setSuccessMsg] = useState("");

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation
    if (!formData.name || !formData.email || !formData.phone || !formData.age) {
      alert("Please fill all fields");
      return;
    }

    // Save to localStorage (optional)
    const enrollments = JSON.parse(localStorage.getItem("enrollments")) || [];
    enrollments.push(formData);
    localStorage.setItem("enrollments", JSON.stringify(enrollments));

    setSuccessMsg("Enrollment successful! We'll contact you soon.");

    // Reset form
    setFormData({ name: "", email: "", phone: "", age: "" });

    // Optional: redirect after 2 seconds
    setTimeout(() => {
      setSuccessMsg("");
      navigate("/");
    }, 2000);
  };

  return (
    <Container className="enroll-page py-5">
      <h2 className="text-center mb-4">Enroll Now</h2>

      {successMsg && <Alert variant="success">{successMsg}</Alert>}

      <Form onSubmit={handleSubmit} className="enroll-form mx-auto" style={{ maxWidth: "500px" }}>
        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your full name"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Phone</Form.Label>
          <Form.Control
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Enter your phone number"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Age</Form.Label>
          <Form.Control
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            placeholder="Enter your age"
          />
        </Form.Group>

        <Button type="submit" className="w-100 mt-3">
          Enroll
        </Button>
      </Form>
    </Container>
  );
}

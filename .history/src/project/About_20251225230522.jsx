import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import {
  FaBullseye,
  FaUsers,
  FaLightbulb,
  FaAward,
  FaRocket,
} from "react-icons/fa";
import "./About.css";

export default function About() {
  return (
    <div className="about-page">

      {/* INTRO */}
      <section className="about-intro">
        <Container>
          <h1>About TechMentor</h1>
          <p>
            TechMentor is a career-focused learning platform helping learners
            build real-world skills through industry-driven education.
          </p>
        </Container>
      </section>

      {/* WHO WE ARE */}
      <section className="about-section">
        <Container>
          <Row className="align-items-center g-5">
            <Col md={6}>
              <h2>Who We Are</h2>
              <p>
                We bridge the gap between traditional education and industry
                expectations. Our programs focus on practical skills,
                real-world projects, and mentorship from experienced
                professionals.
              </p>
              <p>
                At TechMentor, learning is outcome-driven — designed to make
                you job-ready, confident, and competitive.
              </p>
            </Col>

            <Col md={6}>
              <div className="about-highlight">
                <div>
                  <FaRocket />
                  <h4>Career Driven</h4>
                  <p>Skills that matter in the real job market</p>
                </div>
                <div>
                  <FaUsers />
                  <h4>Mentor Support</h4>
                  <p>Learn from experienced industry professionals</p>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* VALUES */}
      <section className="about-values">
        <Container>
          <h2 className="text-center mb-5">What We Stand For</h2>
          <Row className="g-4">
            <Col md={6} lg={3}>
              <div className="value-card">
                <FaBullseye />
                <h4>Mission</h4>
                <p>
                  To deliver accessible, practical, and career-focused tech
                  education.
                </p>
              </div>
            </Col>

            <Col md={6} lg={3}>
              <div className="value-card">
                <FaLightbulb />
                <h4>Vision</h4>
                <p>
                  To shape future-ready professionals through innovation.
                </p>
              </div>
            </Col>

            <Col md={6} lg={3}>
              <div className="value-card">
                <FaUsers />
                <h4>Community</h4>
                <p>
                  A collaborative ecosystem of learners and mentors.
                </p>
              </div>
            </Col>

            <Col md={6} lg={3}>
              <div className="value-card">
                <FaAward />
                <h4>Quality</h4>
                <p>
                  Industry-aligned curriculum with real project exposure.
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* WHY TECHMENTOR */}
      <section className="about-section light">
        <Container>
          <h2 className="text-center mb-4">Why Choose TechMentor?</h2>
          <Row className="why-list">
            <Col md={4}>
              <p>✔ Job-oriented curriculum</p>
              <p>✔ Hands-on project learning</p>
            </Col>
            <Col md={4}>
              <p>✔ Expert mentor guidance</p>
              <p>✔ Resume & interview support</p>
            </Col>
            <Col md={4}>
              <p>✔ Trusted by thousands of learners</p>
              <p>✔ Continuous learning support</p>
            </Col>
          </Row>
        </Container>
      </section>

    </div>
  );
}

import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import {
  FaBullseye,
  FaUsers,
  FaLightbulb,
  FaAward,
} from "react-icons/fa";
import "./About.css";

export default function About() {
  return (
    <div className="about-page">

      {/* HERO */}
      <section className="about-hero">
        <Container>
          <h1>About TechMentor</h1>
          <p>
            Empowering learners with future-ready skills through
            industry-focused education.
          </p>
        </Container>
      </section>

      {/* WHO WE ARE */}
      <section className="about-section">
        <Container>
          <Row className="align-items-center">
            <Col md={6}>
              <h2>Who We Are</h2>
              <p>
                EduTech is a modern learning platform designed to bridge the gap
                between academic knowledge and real-world industry skills.
                We focus on practical learning, hands-on projects, and career
                outcomes.
              </p>
              <p>
                Our programs are crafted by experienced professionals to ensure
                learners stay ahead in today’s competitive job market.
              </p>
            </Col>
            <Col md={6}>
              <div className="about-image"></div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* MISSION / VISION */}
      <section className="about-values">
        <Container>
          <Row className="g-4">
            <Col md={6} lg={3}>
              <div className="value-card">
                <FaBullseye />
                <h4>Our Mission</h4>
                <p>
                  To make quality tech education accessible and career-oriented.
                </p>
              </div>
            </Col>

            <Col md={6} lg={3}>
              <div className="value-card">
                <FaLightbulb />
                <h4>Our Vision</h4>
                <p>
                  To shape the next generation of skilled tech professionals.
                </p>
              </div>
            </Col>

            <Col md={6} lg={3}>
              <div className="value-card">
                <FaUsers />
                <h4>Community</h4>
                <p>
                  A strong learner network guided by expert mentors.
                </p>
              </div>
            </Col>

            <Col md={6} lg={3}>
              <div className="value-card">
                <FaAward />
                <h4>Quality</h4>
                <p>
                  Industry-aligned curriculum with real project experience.
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* WHY EDUTECH */}
      <section className="about-section light">
        <Container>
          <h2 className="text-center mb-4">Why Choose TechMentor?</h2>
          <Row>
            <Col md={4}>
              <p>✔ Industry-ready curriculum</p>
              <p>✔ Real-world projects</p>
            </Col>
            <Col md={4}>
              <p>✔ Expert mentors</p>
              <p>✔ Career guidance</p>
            </Col>
            <Col md={4}>
              <p>✔ Trusted by 25,000+ learners</p>
              <p>✔ Continuous learning support</p>
            </Col>
          </Row>
        </Container>
      </section>

    </div>
  );
}

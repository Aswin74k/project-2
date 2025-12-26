import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import {
  FaUsers,
  FaLaptopCode,
  FaChartLine,
  FaHandshake,
} from "react-icons/fa";
import "./About.css";

export default function About() {
  return (
    <div className="about-page">

      {/* TITLE */}
      <section className="about-title">
        <Container>
          <h1>About TechMentor</h1>
          <p>
            TechMentor is a career-oriented learning platform focused on
            building practical, job-ready technology skills.
          </p>
        </Container>
      </section>

      {/* INTRO */}
      <section className="about-section">
        <Container>
          <Row className="justify-content-center">
            <Col md={10}>
              <p className="about-intro">
                We help learners transition from beginners to industry-ready
                professionals through structured learning paths, real-world
                projects, and expert mentorship. Our goal is simple —
                <b> make learning practical and careers achievable.</b>
              </p>
            </Col>
          </Row>
        </Container>
      </section>

      {/* HIGHLIGHTS */}
      <section className="about-highlights">
        <Container>
          <Row className="g-4">
            <Col sm={6} md={3}>
              <div className="highlight-card">
                <FaUsers />
                <h4>25K+ Learners</h4>
                <p>Trusted by learners across India</p>
              </div>
            </Col>

            <Col sm={6} md={3}>
              <div className="highlight-card">
                <FaLaptopCode />
                <h4>Hands-on Learning</h4>
                <p>Projects, assignments & labs</p>
              </div>
            </Col>

            <Col sm={6} md={3}>
              <div className="highlight-card">
                <FaChartLine />
                <h4>Career Focus</h4>
                <p>Job-ready skills & guidance</p>
              </div>
            </Col>

            <Col sm={6} md={3}>
              <div className="highlight-card">
                <FaHandshake />
                <h4>Mentor Support</h4>
                <p>Learn from industry experts</p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* JOURNEY */}
      <section className="about-section light">
        <Container>
          <h2 className="section-heading">Our Learning Approach</h2>

          <div className="timeline">
            <div className="timeline-item">
              <span>01</span>
              <p>Strong fundamentals with structured curriculum</p>
            </div>

            <div className="timeline-item">
              <span>02</span>
              <p>Hands-on projects and real-world problem solving</p>
            </div>

            <div className="timeline-item">
              <span>03</span>
              <p>Mentor feedback, assessments & improvement</p>
            </div>

            <div className="timeline-item">
              <span>04</span>
              <p>Career guidance, portfolio & placement support</p>
            </div>
          </div>
        </Container>
      </section>

      {/* WHY */}
     {/* WHY TECHMENTOR */}
<section className="why-techmentor">
  <div className="why-container">
    <h2 className="why-title">Why TechMentor?</h2>
    <p className="why-subtitle">
      Everything you need to become job-ready, all in one platform.
    </p>

    <div className="why-grid">
      <div className="why-card">
        <div className="why-icon">🎯</div>
        <h4>Industry-Aligned Curriculum</h4>
        <p>
          Designed with real-world skills that companies actually demand.
        </p>
      </div>

      <div className="why-card">
        <div className="why-icon">🛠</div>
        <h4>Project-Based Learning</h4>
        <p>
          Build live projects that strengthen your portfolio and confidence.
        </p>
      </div>

      <div className="why-card">
        <div className="why-icon">👨‍🏫</div>
        <h4>Expert Mentor Support</h4>
        <p>
          Learn directly from experienced industry professionals.
        </p>
      </div>

      <div className="why-card">
        <div className="why-icon">🚀</div>
        <h4>Career & Placement Guidance</h4>
        <p>
          Resume building, mock interviews, and career mentoring support.
        </p>
      </div>
    </div>
  </div>
</section>


    </div>
  );
}

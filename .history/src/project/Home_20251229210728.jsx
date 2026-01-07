import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { FaGraduationCap, FaUsers, FaLaptopCode } from "react-icons/fa";
import "./home.css";

export default function Home() {
  return (
    <>
      {/* ================= HERO ================= */}
      <section className="hero-section">
        <Container>
          <Row className="align-items-center">
            <Col md={6}>
              <h1>
                Learn Skills That <span>Actually Matter</span>
              </h1>
              <p>
                TechMentor helps you learn real-world skills with structured
                courses, expert mentors, and hands-on projects.
              </p>

              <div className="hero-actions">
                <Button className="primary-btn">Explore Courses</Button>
                <Button variant="outline-dark" className="secondary-btn">
                  Become a Mentor
                </Button>
              </div>
            </Col>

            <Col md={6} className="hero-image">
              <img
                src="https://illustrations.popsy.co/gray/web-design.svg"
                alt="learning"
              />
            </Col>
          </Row>
        </Container>
      </section>

      {/* ================= STATS ================= */}
      <section className="stats-section">
        <Container>
          <Row>
            <Col md={4}>
              <div className="stat-card">
                <FaGraduationCap />
                <h3>500+</h3>
                <p>Courses</p>
              </div>
            </Col>

            <Col md={4}>
              <div className="stat-card">
                <FaUsers />
                <h3>10K+</h3>
                <p>Students</p>
              </div>
            </Col>

            <Col md={4}>
              <div className="stat-card">
                <FaLaptopCode />
                <h3>100%</h3>
                <p>Practical Learning</p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* ================= COURSES ================= */}
      <section className="courses-section">
        <Container>
          <h2 className="section-title">Popular Courses</h2>

          <Row>
            {["Web Development", "Python", "UI/UX Design"].map((c, i) => (
              <Col md={4} key={i}>
                <div className="course-card">
                  <h4>{c}</h4>
                  <p>
                    Learn industry-ready skills with real projects and mentor
                    guidance.
                  </p>
                  <Button size="sm">View Course</Button>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* ================= WHY US ================= */}
      <section className="why-section">
        <Container>
          <Row className="align-items-center">
            <Col md={6}>
              <img
                src="https://illustrations.popsy.co/gray/online-learning.svg"
                alt="why us"
              />
            </Col>

            <Col md={6}>
              <h2>Why Choose TechMentor?</h2>
              <ul>
                <li>✔ Industry-level curriculum</li>
                <li>✔ Mentor-based guidance</li>
                <li>✔ Practical projects</li>
                <li>✔ Career-focused learning</li>
              </ul>
            </Col>
          </Row>
        </Container>
      </section>

      {/* ================= CTA ================= */}
      <section className="cta-section">
        <Container>
          <h2>Start Learning Today</h2>
          <p>Upgrade your skills and build your career with TechMentor.</p>
          <Button className="primary-btn">Get Started</Button>
        </Container>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="footer">
        <Container>
          <p>© 2025 TechMentor. All rights reserved.</p>
        </Container>
      </footer>
    </>
  );
}
import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import {
  FaGraduationCap,
  FaUsers,
  FaChalkboardTeacher,
  FaBriefcase,
  FaStar,
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaWhatsapp
} from "react-icons/fa";
import "./Home.css";

export default function Home() {
  const courses = [
    {
      id: "fullstack",
      title: "Full Stack Development",
      level: "Beginner",
      duration: "6 Months",
      rating: "4.8",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPaNXGBezXv5c0v_XSQ6pqOScRBb2ShM3IWg&s",
    },
    {
      id: "mern",
      title: "MERN Stack Development",
      level: "Intermediate",
      duration: "5 Months",
      rating: "4.7",
      img: "https://images.prismic.io/loco-blogs/79328284-f97b-489f-924c-eb3b17e34b56_image2.png",
    },
    {
      id: "uiux",
      title: "UI / UX Design",
      level: "Beginner",
      duration: "4 Months",
      rating: "4.6",
      img: "https://www.almondsolutions.com/images/blog-ui-ux-150223.jpg",
    },
    {
      id: "datascience",
      title: "Data Science",
      level: "Advanced",
      duration: "6 Months",
      rating: "4.9",
      img: "https://bernardmarr.com/wp-content/uploads/2022/11/The-Top-5-Data-Science-And-Analytics-Trends-In-2023.jpg",
    },
    {
      id: "dataanalytics",
      title: "Data Analytics",
      level: "Beginner",
      duration: "4 Months",
      rating: "4.6",
      img: "https://blog.herzing.ca/hubfs/data%20analytics.jpg",
    },
    {
      id: "aiml",
      title: "AI & Machine Learning",
      level: "Advanced",
      duration: "6 Months",
      rating: "4.9",
      img: "https://www.jellyfishtechnologies.com/wp-content/uploads/2021/10/Artificial-Intelligence-versus-Machine-Learning.png",
    },
    {
      id: "cloud",
      title: "Cloud Computing",
      level: "Intermediate",
      duration: "4 Months",
      rating: "4.7",
      img: "https://bernardmarr.com/img/The%205%20Biggest%20Cloud%20Computing%20Trends%20In%202021.jpg",
    },
    {
      id: "devops",
      title: "DevOps Engineering",
      level: "Advanced",
      duration: "5 Months",
      rating: "4.8",
      img: "https://www.itrainu.in/wp-content/uploads/2021/03/DEVOPS-1.jpg",
    },
  ];

  return (
    <div className="home">

      {/* HERO */}
      <section className="hero-section">
        <Container>
          <div className="hero-content">
            <h1>
              Learn Future-Ready Skills with <span>TechMentor</span>
            </h1>
            <p>
              Industry-aligned courses, real-world projects, and expert mentors
              to accelerate your career.
            </p>

            <div className="hero-actions">
              <Link to="/about" className="btn btn-outline-light btn-lg">
                Learn More
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* STATS */}
      <section className="stats-section">
        <Container>
          <Row className="g-4">
            <Col md={3}><div className="stat-box"><FaUsers /><h3>25K+</h3><p>Learners</p></div></Col>
            <Col md={3}><div className="stat-box"><FaGraduationCap /><h3>8+</h3><p>Courses</p></div></Col>
            <Col md={3}><div className="stat-box"><FaChalkboardTeacher /><h3>50+</h3><p>Mentors</p></div></Col>
            <Col md={3}><div className="stat-box"><FaBriefcase /><h3>100+</h3><p>Projects</p></div></Col>
          </Row>
        </Container>
      </section>

      {/* COURSES */}
      <section className="courses-section">
        <Container>
          <h2 className="section-title">Popular Courses</h2>
          <Row>
            {courses.map((course) => (
              <Col lg={3} md={4} sm={6} key={course.id} className="mb-4">
                <Card className="course-card h-100">
                  <Card.Img src={course.img} className="course-img" />
                  <Card.Body>
                    <Card.Title>{course.title}</Card.Title>
                    <div className="course-meta">
                      <span>{course.level}</span>
                      <span>{course.duration}</span>
                    </div>
                    <div className="course-rating">
                      <FaStar /> {course.rating}
                    </div>
                    <Link to={`/courses/${course.id}`} className="btn btn-outline-primary w-100 mt-3">
                      View Details
                    </Link>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>
{/* LEARNING PATHS */}
<section className="paths-section">
  <div className="container">
    <h2 className="section-title">Learning Paths</h2>
    <p className="section-subtitle">
      Structured career roadmaps to take you from beginner to industry-ready professional.
    </p>

    <div className="paths-grid">
      <div className="path-card">
        <h4>Frontend Developer</h4>
        <p>Create modern and responsive user interfaces.</p>

        <ul>
          <li>HTML, CSS, JavaScript</li>
          <li>React & UI Libraries</li>
          <li>Responsive Design</li>
        </ul>

        <div className="path-outcome">Outcome: Frontend Developer</div>
      </div>

      <div className="path-card">
        <h4>Full Stack Developer</h4>
        <p>Build complete web applications from scratch.</p>

        <ul>
          <li>Frontend & Backend</li>
          <li>APIs & Databases</li>
          <li>Deployment</li>
        </ul>

        <div className="path-outcome">Outcome: Full Stack Engineer</div>
      </div>

      <div className="path-card">
        <h4>UI / UX Designer</h4>
        <p>Design intuitive and user-friendly experiences.</p>

        <ul>
          <li>Design Principles</li>
          <li>Figma & Prototyping</li>
          <li>User Research</li>
        </ul>

        <div className="path-outcome">Outcome: UI/UX Designer</div>
      </div>

      <div className="path-card">
        <h4>Data & AI Path</h4>
        <p>Master data-driven thinking and AI basics.</p>

        <ul>
          <li>Python & Analytics</li>
          <li>Machine Learning</li>
          <li>Real Data Projects</li>
        </ul>

        <div className="path-outcome">Outcome: Data Professional</div>
      </div>
    </div>
  </div>
</section>

      

      {/* FOOTER */}
   <footer className="footer">
  <Container className="text-center">
    <h3 className="footer-logo">EduTech</h3>

    <p className="footer-tagline">
      Empowering careers through technology education.
    </p>

    {/* Navigation links */}
    <ul className="footer-links">
      <li><a href="/">Home</a></li>
      <li><a href="/courses">Courses</a></li>
      <li><a href="/about">About</a></li>
      <li><a href="/contact">Contact</a></li>
    </ul>

    {/* Social icons */}
    <div className="footer-social">
      <a className="fb" aria-label="Facebook"><FaFacebookF /></a>
      <a className="ig" aria-label="Instagram"><FaInstagram /></a>
      <a className="yt" aria-label="YouTube"><FaYoutube /></a>
      <a className="wa" aria-label="WhatsApp"><FaWhatsapp /></a>
    </div>

    <p className="copy">
      © 2025 EduTech. All rights reserved.
    </p>
  </Container>
</footer>


    </div>
  );
}



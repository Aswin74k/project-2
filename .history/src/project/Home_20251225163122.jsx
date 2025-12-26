import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import {
  FaGraduationCap,
  FaUsers,
  FaChalkboardTeacher,
  FaBriefcase,
  FaStar,
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
      <section className="hero-section">
        <Container>
          <div className="hero-content">
            <h1>
              Learn Future-Ready Skills with <span>EduTech</span>
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
      <Col xs={12} sm={6} lg={3}>
        <div className="stat-box">
          <FaUsers />
          <h3>25K+</h3>
          <p>Active Learners</p>
        </div>
      </Col>

      <Col xs={12} sm={6} lg={3}>
        <div className="stat-box">
          <FaGraduationCap />
          <h3>8+</h3>
          <p>Industry-Focused Courses</p>
        </div>
      </Col>

      <Col xs={12} sm={6} lg={3}>
        <div className="stat-box">
          <FaChalkboardTeacher />
          <h3>50+</h3>
          <p>Expert Mentors</p>
        </div>
      </Col>

      <Col xs={12} sm={6} lg={3}>
        <div className="stat-box">
          <FaBriefcase />
          <h3>100+</h3>
          <p>Real-World Projects</p>
        </div>
      </Col>
    </Row>
  </Container>
</section>


      <section className="courses-section">
        <Container>
          <h2 className="section-title">Popular Courses</h2>

          <Row>
            {courses.map((course, index) => (
              <Col lg={3} md={4} sm={6} key={index} className="mb-4">
                <Card className="course-card h-100">
                  <Card.Img
                    variant="top"
                    src={course.img}
                    className="course-img"
                  />

                  <Card.Body>
                    <Card.Title>{course.title}</Card.Title>

                    <div className="course-meta">
                      <span>{course.level}</span>
                      <span>{course.duration}</span>
                    </div>

                    <div className="course-rating">
                      <FaStar />
                      <span>{course.rating}</span>
                    </div>

                    <Link
                      to={`/courses/${course.id}`}
                      className="btn btn-outline-primary w-100 mt-3"
                    >
                      View Details
                    </Link>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

    
<section className="paths-section">
  <div className="container">
    <h2 className="section-title">Career Learning Paths</h2>
    <p className="section-subtitle">
      Structured roadmaps designed to take you from beginner to job-ready professional.
    </p>

    <div className="paths-grid">

      <div className="path-card">
        <h4>Frontend Developer</h4>
        <p>Build modern, responsive, and interactive user interfaces.</p>

        <ul>
          <li>HTML, CSS & JavaScript</li>
          <li>React & UI Libraries</li>
          <li>Responsive Design</li>
        </ul>

        <div className="path-outcome">Outcome: UI Developer</div>
      </div>

      <div className="path-card">
        <h4>Full Stack Developer</h4>
        <p>Become a complete web application developer.</p>

        <ul>
          <li>Frontend + Backend</li>
          <li>APIs & Databases</li>
          <li>Project Deployment</li>
        </ul>

        <div className="path-outcome">Outcome: Full Stack Engineer</div>
      </div>

      <div className="path-card">
        <h4>UI / UX Designer</h4>
        <p>Design intuitive and user-centered experiences.</p>

        <ul>
          <li>Design Principles</li>
          <li>Figma & Prototyping</li>
          <li>User Research</li>
        </ul>

        <div className="path-outcome">Outcome: UI/UX Designer</div>
      </div>

      <div className="path-card">
        <h4>Data & AI Path</h4>
        <p>Learn data-driven thinking and AI fundamentals.</p>

        <ul>
          <li>Python & Analytics</li>
          <li>Machine Learning Basics</li>
          <li>Real Data Projects</li>
        </ul>

        <div className="path-outcome">Outcome: Data Professional</div>
      </div>

    </div>
  </div>
</section>



      
    </div>
  );
}



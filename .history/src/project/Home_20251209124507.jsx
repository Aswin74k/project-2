import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import "./Home.css";

export default function Home() {
  const courses = [
    {
      title: "Full Stack Development",
      img: "https://images.unsplash.com/photo-1522071820081-009f0129c71c"
    },
    {
      title: "MERN Stack",
      img: "https://images.unsplash.com/photo-1555066931-4365d14bab8c"
    },
    {
      title: "UI / UX Designing",
      img: "https://images.unsplash.com/photo-1581291519195-ef11498d1cf5"
    },
    {
      title: "Data Science",
      img: "https://images.unsplash.com/photo-1554495573-317f6b5a0bb2"
    },
    {
      title: "Data Analytics",
      img: "https://images.unsplash.com/photo-1556761175-4b46a572b786"
    },
    {
      title: "AI / Machine Learning",
      img: "https://images.unsplash.com/photo-1542831371-d531d36971e6"
    },
    {
      title: "Cloud Computing",
      img: "https://images.unsplash.com/photo-1518770660439-4636190af475"
    },
    {
      title: "DevOps",
      img: "https://images.unsplash.com/photo-1551434678-e076c223a692"
    }
  ];

  return (
    <div className="home">

      {/* HERO SECTION */}
      <section className="hero d-flex align-items-center">
        <Container>
          <div className="hero-content text-center text-white">
            <h1>Upgrade Your Skills With Edutech</h1>
            <p>Learn modern technologies and boost your career with our expert-designed courses.</p>
            <Button size="lg" className="hero-btn">Get Started</Button>
          </div>
        </Container>
      </section>

      {/* COURSES SECTION */}
      <section className="courses py-5">
        <Container>
          <h2 className="section-title text-center mb-4">Our Courses</h2>

          <Row>
            {courses.map((course, index) => (
              <Col key={index} lg={3} md={4} sm={6} xs={12} className="mb-4">
                <Card className="course-card h-100">
                  <Card.Img variant="top" src={course.img} className="course-img" />
                  
                  <Card.Body className="text-center">
                    <Card.Title>{course.title}</Card.Title>

                    <Button variant="primary" className="view-btn mt-2">
                      View Details
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>

        </Container>
      </section>

      {/* TESTIMONIALS SECTION */}
      <section className="testimonials py-5">
        <Container>
          <h2 className="section-title text-center mb-4">What Our Students Say</h2>

          <Row className="justify-content-center">

            <Col md={4} className="mb-4">
              <div className="testi-card">
                <img src="https://i.pravatar.cc/100?img=12" className="testi-img" />
                <p>“Amazing teaching! I learnt full stack development easily.”</p>
                <h4>- Rahul</h4>
              </div>
            </Col>

            <Col md={4} className="mb-4">
              <div className="testi-card">
                <img src="https://i.pravatar.cc/100?img=20" className="testi-img" />
                <p>“The UI/UX course helped me get my first internship!”</p>
                <h4>- Priya</h4>
              </div>
            </Col>

            <Col md={4} className="mb-4">
              <div className="testi-card">
                <img src="https://i.pravatar.cc/100?img=30" className="testi-img" />
                <p>“Best platform to learn Data Science with real projects.”</p>
                <h4>- Sanjay</h4>
              </div>
            </Col>

          </Row>
        </Container>
      </section>

      {/* FOOTER */}
      <footer className="footer py-4">
        <Container className="text-center">
          <h3>Edutech</h3>
          <p>Learn skills that matter. Build your future with us.</p>

          <div className="footer-links mb-2">
            <a href="#">Home</a>
            <a href="#">Courses</a>
            <a href="#">Contact</a>
          </div>

          <p className="copy">© 2025 Edutech. All rights reserved.</p>
        </Container>
      </footer>

    </div>
  );
}


import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import "./Home.css";

export default function Home() {
  const courses = [
    {
      title: "Full Stack Development",
      img: "https://s3.ap-south-1.amazonaws.com/nareshit.images/python.jpg"
    },
    {
      title: "MERN Stack",
      img: "https://images.prismic.io/loco-blogs/79328284-f97b-489f-924c-eb3b17e34b56_image2.png?auto=compress%2Cformat&rect=0%2C0%2C1999%2C1124&w=1920&h=1080&ar=1.91%3A1"
    },
    {
      title: "UI / UX Designing",
      img: "https://img.freepik.com/premium-vector/gradient-ui-ux-design-illustration_23-2151514787.jpg?semt=ais_hybrid&w=740&q=80"
    },
    {
      title: "Data Science",
      img: "https://jaro-website.s3.ap-south-1.amazonaws.com/2025/01/data-science-training-gurgaon.jpg"
    },
    {
      title: "Data Analytics",
      img: "https://blog.herzing.ca/hubfs/data%20analytics.jpg"
    },
    {
      title: "AI / Machine Learning",
      img: "https://www.jellyfishtechnologies.com/wp-content/uploads/2021/10/Artificial-Intelligence-versus-Machine-Learning.png"
    },
    {
      title: "Cloud Computing",
      img: "https://bernardmarr.com/img/The%205%20Biggest%20Cloud%20Computing%20Trends%20In%202021.jpg"
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


import React from "react";
import "./Home.css";

export default function Home() {
  return (
    <div className="home">

      {/* HERO SECTION */}
      <section className="hero">
        <div className="hero-content">
          <h1>Upgrade Your Skills With Edutech</h1>
          <p>Learn modern technologies and boost your career with our expert-designed courses.</p>
          <button className="hero-btn">Get Started</button>
        </div>
      </section>

      {/* OUR COURSES */}
      <section className="courses">
        <h2 className="section-title">Our Courses</h2>
        <div className="course-grid">

          {[
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
          ].map((course, index) => (
            <div className="course-card" key={index}>
              <img src={course.img} alt={course.title} />
              <h3>{course.title}</h3>
              <button className="view-btn">View Details</button>
            </div>
          ))}

        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="testimonials">
        <h2 className="section-title">What Our Students Say</h2>

        <div className="testi-grid">
          <div className="testi-card">
            <p>"Amazing teaching! I learnt full stack development easily."</p>
            <h4>- Rahul</h4>
          </div>

          <div className="testi-card">
            <p>"The UI/UX course helped me get my first internship!"</p>
            <h4>- Priya</h4>
          </div>

          <div className="testi-card">
            <p>"Best platform to learn Data Science with real projects."</p>
            <h4>- Sanjay</h4>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-content">
          <h3>Edutech</h3>
          <p>Learn skills that matter. Build your future with us.</p>

          <div className="footer-links">
            <a href="#">Home</a>
            <a href="#">Courses</a>
            <a href="#">Contact</a>
          </div>

          <p className="copy">© 2025 Edutech. All rights reserved.</p>
        </div>
      </footer>

    </div>
  );
}

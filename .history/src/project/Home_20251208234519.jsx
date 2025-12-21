import EduNavbar from "./project/Navbar";
import "./project/home.css";
import "./"

export default function App() {
  return (
    <>
      <EduNavbar />

      {/* HERO SECTION */}
      <section className="hero">
        <div className="hero-content">
          <h1>Unlock Your Future With EduTech</h1>
          <p>Learn Top IT Courses From Industry Experts. Become Job-Ready.</p>
          <button>Get Started</button>
        </div>
      </section>

      {/* COURSES */}
      <section id="courses" className="courses-section">
        <h2 className="section-title">Our Courses</h2>

        <div className="course-grid">
          {[
            "Full Stack Development",
            "MERN Stack",
            "UI/UX Design",
            "Data Analytics",
            "Data Science",
            "Cloud & DevOps",
            "AI / ML",
          ].map((course, i) => (
            <div key={i} className="course-card">
              <h3>{course}</h3>
              <p>Learn {course} from basics to advanced with real-world projects.</p>
              <button className="details-btn">View Details</button>
            </div>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section id="testimonials" className="testimonials-section">
        <h2 className="section-title">What Students Say</h2>

        <div className="testimonials-grid">
          <div className="testimonial-card">
            <p>“Amazing training! I got placed after completing Full Stack.”</p>
            <h4>— Rahul</h4>
          </div>

          <div className="testimonial-card">
            <p>“The best mentors and real-time projects. Loved learning here!”</p>
            <h4>— Priya</h4>
          </div>

          <div className="testimonial-card">
            <p>“Perfect for beginners. UI/UX course was very helpful.”</p>
            <h4>— David</h4>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <p>© 2025 EduTech — All Rights Reserved</p>
      </footer>
    </>
  );
}
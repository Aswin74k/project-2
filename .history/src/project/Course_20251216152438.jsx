import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./course.css";

const courseData = {
  fullstack: {
    title: "Full Stack Development",
    fee: "₹25,000",
    duration: "4 Months",
    banner: "/banners/fullstack.jpg",
    syllabus: [
      "HTML, CSS, Bootstrap",
      "JavaScript (ES6+)",
      "React JS",
      "Python & Django Framework",
      "Jquery",
      "MySQL",
      "Full-Stack Projects"
    ]
  },

  mern: {
    title: "MERN Stack Development",
    fee: "₹28,000",
    duration: "4.5 Months",
    banner: "/banners/mern.jpg",
    syllabus: [
      "MongoDB",
      "Express JS",
      "React JS",
      "Node JS",
      "REST API Development",
      "MERN Live Projects"
    ]
  },

  cloud: {
    title: "Cloud Computing",
    fee: "₹30,000",
    duration: "3 Months",
    banner: "/banners/cloud.jpg",
    syllabus: [
      "AWS / Azure Basics",
      "Cloud Architecture",
      "Serverless Computing",
      "IAM, VPC, S3",
      "EC2, Lambda",
      "Monitoring & Deployment"
    ]
  },

  aiml: {
    title: "Artificial Intelligence & Machine Learning",
    fee: "₹35,000",
    duration: "5 Months",
    banner: "/banners/aiml.jpg",
    syllabus: [
      "Python for AI",
      "Data Preprocessing",
      "ML Algorithms",
      "Neural Networks",
      "Deep Learning",
      "NLP",
      "AI Projects"
    ]
  }
};

export default function Course() {
  const { id } = useParams();
  const navigate = useNavigate();
  const course = courseData[id];

  if (!course) {
    return <h2 className="text-center mt-5">Course Not Found</h2>;
  }

  return (
    <div className="course-container">

      {/* ================= HEADER ================= */}
      <div className="course-header">

        {/* BACK & ENROLL BUTTONS */}
        <div className="course-buttons">
          <button className="back-btn" onClick={() => navigate("/")}>
            ← Back
          </button>

          <button
            className="enroll-btn-header"
            onClick={() => navigate("/contact")}
          >
            Enroll Now
          </button>
        </div>

        <img
          src={course.banner}
          alt={course.title}
          className="course-banner"
        />

        <h1 className="course-title">{course.title}</h1>
      </div>

      {/* ================= CONTENT ================= */}
      <div className="course-content container">

        {/* COURSE OVERVIEW */}
        <div className="info-box">
          <h3>Course Overview</h3>
          <p>
            Our <b>{course.title}</b> program is designed to make you
            job-ready through hands-on training, real-world projects, and
            expert mentorship.
          </p>

         
        </div>

        {/* SYLLABUS */}
        <div className="syllabus-box">
          <h3>Syllabus</h3>
          <ul>
            {course.syllabus.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>

        {/* ================= ENROLL SECTION ================= */}
        <div className="enroll-section">
          <div className="enroll-card">
            <h2>Enroll in {course.title}</h2>

            <div className="enroll-details">
              <div>
                <span>Course Fee</span>
                <h3>{course.fee}</h3>
              </div>

              <div>
                <span>Duration</span>
                <h3>{course.duration}</h3>
              </div>
            </div>

            <ul className="enroll-features">
              <li>✔ Job-Oriented Curriculum</li>
              <li>✔ Industry Expert Trainers</li>
              <li>✔ Live Projects & Assignments</li>
              <li>✔ Certification After Completion</li>
              <li>✔ Career Guidance & Support</li>
            </ul>

            <button
            import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import emailjs from "emailjs-com";
import { FiPhone, FiMail, FiMapPin } from "react-icons/fi";
import "./contact.css";

export default function Contact() {
  const location = useLocation();
  const selectedCourse = location.state?.course || "";

  const [formMessage, setFormMessage] = useState("");
  const [type, setType] = useState("");
  const [loading, setLoading] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault();
    setFormMessage("");
    setLoading(true);

    emailjs
      .sendForm(
        "service_31jicom",
        "template_7uyno6u",
        e.target,
        "sTTzV7QdAk2Jx3lZL"
      )
      .then(() => {
        setFormMessage("Your enrollment request has been sent successfully!");
        setType("success");
        setLoading(false);
        e.target.reset();
      })
      .catch(() => {
        setFormMessage("Failed to send request. Please try again.");
        setType("error");
        setLoading(false);
      });
  };

  return (
    <div className="contact-container">

      {/* LEFT SECTION */}
      <div className="contact-info">
        <h2>{selectedCourse ? "Enroll Now" : "Get In Touch"}</h2>
        <p>
          {selectedCourse
            ? `You are enrolling for the ${selectedCourse} course. Please fill the form and our team will contact you.`
            : "We'd love to hear from you! Whether you have questions about courses, pricing, or features — our team is ready to help."}
        </p>

        <div className="info-box">
          <FiMail className="info-icon" />
          <div>
            <h4>Email</h4>
            <p>support@edutech.com</p>
          </div>
        </div>

        <div className="info-box">
          <FiMapPin className="info-icon" />
          <div>
            <h4>Address</h4>
            <p>Calicut, Kerala, India</p>
          </div>
        </div>

        <div className="info-box">
          <FiPhone className="info-icon" />
          <div>
            <h4>Phone</h4>
            <p>7736476724</p>
          </div>
        </div>
      </div>

      {/* RIGHT SECTION - FORM */}
      <form className="contact-form" onSubmit={sendEmail}>
        <h3>{selectedCourse ? "Course Enrollment" : "Send Us a Message"}</h3>

        {/* COURSE FIELD */}
        {selectedCourse && (
          <div className="input-group">
            <input type="text" name="course" value={selectedCourse} readOnly />
            <label>Selected Course</label>
          </div>
        )}

        <div className="input-group">
          <input type="text" name="first" required />
          <label>First Name</label>
        </div>

        <div className="input-group">
          <input type="text" name="last" required />
          <label>Last Name</label>
        </div>

        <div className="input-group">
          <input type="email" name="email" required />
          <label>Email Address</label>
        </div>

        <div className="input-group">
          <input type="tel" name="phone" required />
          <label>Phone Number</label>
        </div>

        <div className="input-group textarea">
          <textarea
            name="message"
            defaultValue={
              selectedCourse
                ? `I would like to enroll in the ${selectedCourse} course.`
                : ""
            }
            required
          />
          <label>Your Message</label>
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Submitting..." : selectedCourse ? "Enroll Now" : "Send Message"}
        </button>

        {formMessage && (
          <p className={`message-box ${type}`}>{formMessage}</p>
        )}
      </form>
    </div>
  );
}

          </div>
        </div>

      </div>
    </div>
  );
}


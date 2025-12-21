import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./course.css";

const courseData = {
  fullstack: {
    title: "Full Stack Development",
    fee: "₹25,000",
    duration: "4 Months",
    syllabus: [
      "HTML, CSS, Bootstrap",
      "JavaScript (ES6+)",
      "React JS",
      "Python & Django",
      "MySQL",
      "Full Stack Projects"
    ]
  },
  mern: {
    title: "MERN Stack Development",
    fee: "₹28,000",
    duration: "4.5 Months",
    syllabus: [
      "MongoDB",
      "Express JS",
      "React JS",
      "Node JS",
      "REST API",
      "Live MERN Projects"
    ]
  },
  cloud: {
    title: "Cloud Computing",
    fee: "₹30,000",
    duration: "3 Months",
    syllabus: [
      "AWS / Azure Basics",
      "Cloud Architecture",
      "EC2, S3, IAM",
      "Serverless",
      "Monitoring & Deployment"
    ]
  }
};

export default function Course() {
  const { id } = useParams();
  const navigate = useNavigate();
  const course = courseData[id];

  if (!course) {
    return <h2 className="not-found">Course Not Found</h2>;
  }

  return (
    <div className="course-container">

      {/* HERO SECTION */}
      <section className="course-header">
        <div className="course-hero">
          <h1 className="course-title">{course.title}</h1>

          <p className="course-subtitle">
            Become job-ready with hands-on training, real-world projects, and
            expert mentorship.
          </p>

          <div className="course-stats">
            <div>
              <span>Duration</span>
              <h3>{course.duration}</h3>
            </div>
            <div>
              <span>Course Fee</span>
              <h3>{course.fee}</h3>
            </div>
            <div>
              <span>Level</span>
              <h3>Beginner → Advanced</h3>
            </div>
          </div>

          <button
            className="enroll-main-btn hero-btn"
            onClick={() => {
              const user = JSON.parse(localStorage.getItem("loggedInUser"));
              if (user) {
                navigate("/enroll", { state: { courseId: id } });
              } else {
                window.dispatchEvent(new CustomEvent("showLoginModal"));
              }
            }}
          >
            Enroll Now
          </button>
        </div>
      </section>

      {/* CONTENT */}
      <div className="course-content">

        <div className="info-box">
          <h3>Course Overview</h3>
          <p>
            Our <b>{course.title}</b> program is designed to transform beginners
            into skilled professionals through structured learning, live
            projects, and continuous guidance.
          </p>
        </div>

        <div className="syllabus-box">
          <h3>Syllabus</h3>
          <ul>
            {course.syllabus.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>

        <div className="enroll-section">
          <div className="enroll-card">
            <h2>Enroll in {course.title}</h2>

            <div className="enroll-details">
              <div>
                <span>Fee</span>
                <h3>{course.fee}</h3>
              </div>
              <div>
                <span>Duration</span>
                <h3>{course.duration}</h3>
              </div>
            </div>

            <ul className="enroll-features">
              <li>✔ Industry-Aligned Curriculum</li>
              <li>✔ Live Projects</li>
              <li>✔ Certification</li>
              <li>✔ Career Support</li>
            </ul>

            <button
              className="enroll-main-btn"
              onClick={() =>
                navigate("/enroll", { state: { courseId: id } })
              }
            >
              Enroll Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

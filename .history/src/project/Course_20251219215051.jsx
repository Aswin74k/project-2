import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./course.css";

const courseData = { fullstack: { title: "Full Stack Development", fee: "₹25,000", duration: "4 Months", syllabus: [ "HTML, CSS, Bootstrap", "JavaScript (ES6+)", "React JS", "Python & Django", "MySQL", "Full Stack Projects" ] }, mern: { title: "MERN Stack Development", fee: "₹28,000", duration: "4.5 Months", syllabus: [ "MongoDB", "Express JS", "React JS", "Node JS", "REST API", "Live MERN Projects" ] }, cloud: { title: "Cloud Computing", fee: "₹30,000", duration: "3 Months", syllabus: [ "AWS / Azure Basics", "Cloud Architecture", "EC2, S3, IAM", "Serverless", "Monitoring & Deployment" ] } };

export default function Course() {
  const { id } = useParams();
  const navigate = useNavigate();
  const course = courseData[id];

  // 🔹 Scroll to top when course changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!course) {
    return <h2 className="not-found">Course Not Found</h2>;
  }

  const handleEnroll = () => {
    const user = JSON.parse(localStorage.getItem("loggedInUser"));
    if (user) {
      navigate("/enroll", { state: { courseId: id } });
    } else {
      window.dispatchEvent(new CustomEvent("showLoginModal"));
    }
  };

  return (
    <div className="course-container">

      {/* ================= HERO ================= */}
      <section className="course-header">
        <div className="course-hero">
          <h1 className="course-title">{course.title}</h1>

          <p className="course-subtitle">
            Industry-focused training with live projects, expert mentorship,
            and career guidance.
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

          {/* 🔥 ONLY ONE ENROLL BUTTON */}
          <button className="enroll-main-btn hero-btn" onClick={handleEnroll}>
            Enroll Now
          </button>
        </div>
      </section>

      {/* ================= CONTENT ================= */}
      <div className="course-content">

        <div className="info-box">
          <h3>Course Overview</h3>
          <p>
            The <b>{course.title}</b> program helps students gain real-world
            skills through hands-on learning, expert guidance, and
            industry-relevant projects.
          </p>
        </div>

        <div className="syllabus-box">
          <h3>Syllabus</h3>
          <ul>
            {course.syllabus.map((topic, index) => (
              <li key={index}>{topic}</li>
            ))}
          </ul>
        </div>

        {/* INFO CARD (NO BUTTON HERE) */}
        <div className="enroll-section">
          <div className="enroll-card">
            <h2>Course Details</h2>

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
              <li>✔ Live Instructor-Led Sessions</li>
              <li>✔ Industry-Level Projects</li>
              <li>✔ Certificate on Completion</li>
              <li>✔ Career & Placement Support</li>
            </ul>
          </div>
        </div>

      </div>
    </div>
  );
}

import React, { useEffect } from "react";
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
  },
  uiux: {
    title: "UI / UX Designing",
    fee: "₹20,000",
    duration: "3 Months",
    banner: "/banners/uiux.jpg",
    syllabus: [
      "Design Thinking",
      "Wireframing & Prototyping",
      "Adobe XD / Figma",
      "UI Principles",
      "UX Research & Testing",
      "Responsive Design",
      "Portfolio Projects"
    ]
  },
  datascience: {
    title: "Data Science",
    fee: "₹32,000",
    duration: "4 Months",
    banner: "/banners/datascience.jpg",
    syllabus: [
      "Python for Data Science",
      "Data Analysis & Visualization",
      "Pandas & NumPy",
      "Statistics & Probability",
      "Machine Learning Basics",
      "Projects & Case Studies"
    ]
  },
  dataanalytics: {
    title: "Data Analytics",
    fee: "₹22,000",
    duration: "3 Months",
    banner: "/banners/dataanalytics.jpg",
    syllabus: [
      "Excel & Advanced Excel",
      "Power BI / Tableau",
      "Data Cleaning & Preprocessing",
      "SQL & Databases",
      "Data Visualization",
      "Business Analytics Projects"
    ]
  },
  devops: {
    title: "DevOps",
    fee: "₹30,000",
    duration: "4 Months",
    banner: "/banners/devops.jpg",
    syllabus: [
      "Linux & Scripting",
      "CI/CD with Jenkins",
      "Docker & Kubernetes",
      "AWS / Cloud Deployment",
      "Monitoring & Logging",
      "DevOps Projects"
    ]
  }
};

export default function Course() {
  const { id } = useParams();
  const navigate = useNavigate();
  const course = courseData[id];

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

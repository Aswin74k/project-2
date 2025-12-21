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

  if (!course) {
    return <h2 className="text-center mt-5">Course Not Found</h2>;
  }

  return (
    <div className="course-container">
      <div className="course-header">
        <div className="course-buttons">
          <button className="back-btn" onClick={() => navigate("/")}>
            ← Back
          </button>
          <button
  className="enroll-main-btn"
  onClick={() => {
    const user = JSON.parse(localStorage.getItem("loggedInUser"));
    if (user) {
      navigate("/enroll"); 
    } else {

      window.dispatchEvent(new CustomEvent("showLoginModal"));
    }
  }}
>
  Enroll Now
</button>
        </div>
        <img src={course.banner} alt={course.title} className="course-banner" />
        <h1 className="course-title">{course.title}</h1>
      </div>

      <div className="course-content container">
       
        <div className="info-box" id>
          <h3>Course Overview</h3>
          <p>
            Our <b>{course.title}</b> program is designed to make you job-ready through hands-on training, real-world projects, and expert mentorship.
          </p>
        </div>

        <div className="syllabus-box">
          <h3>Syllabus</h3>
          <ul>
            {course.syllabus.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>

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



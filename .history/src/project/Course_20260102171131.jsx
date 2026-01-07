import React, { useEffect } from "react";
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
      "Full-Stack Projects",
    ],
    roles: ["Full Stack Developer", "Frontend Engineer", "Backend Developer"],
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
      "REST APIs",
      "Live MERN Projects",
    ],
    roles: ["MERN Developer", "Web Developer"],
  },

  cloud: {
    title: "Cloud Computing",
    fee: "₹30,000",
    duration: "3 Months",
    syllabus: [
      "AWS / Azure Basics",
      "Cloud Architecture",
      "IAM, VPC, EC2",
      "Serverless Computing",
      "Deployment & Monitoring",
    ],
    roles: ["Cloud Engineer", "DevOps Associate"],
  },

  aiml: {
    title: "AI & Machine Learning",
    fee: "₹35,000",
    duration: "5 Months",
    syllabus: [
      "Python for AI",
      "ML Algorithms",
      "Deep Learning",
      "Neural Networks",
      "NLP",
      "AI Projects",
    ],
    roles: ["ML Engineer", "AI Engineer"],
  },

  uiux: {
    title: "UI / UX Designing",
    fee: "₹20,000",
    duration: "3 Months",
    syllabus: [
      "Design Thinking",
      "Wireframing",
      "Figma / Adobe XD",
      "UX Research",
      "Responsive Design",
    ],
    roles: ["UI Designer", "UX Designer"],
  },

  datascience: {
    title: "Data Science",
    fee: "₹32,000",
    duration: "4 Months",
    syllabus: [
      "Python",
      "Pandas & NumPy",
      "Statistics",
      "Data Visualization",
      "ML Basics",
    ],
    roles: ["Data Scientist", "Data Analyst"],
  },

  dataanalytics: {
    title: "Data Analytics",
    fee: "₹22,000",
    duration: "3 Months",
    syllabus: [
      "Excel",
      "SQL",
      "Power BI / Tableau",
      "Data Cleaning",
      "Business Analytics",
    ],
    roles: ["Data Analyst", "Business Analyst"],
  },

  devops: {
    title: "DevOps",
    fee: "₹30,000",
    duration: "4 Months",
    syllabus: [
      "Linux",
      "Docker",
      "Kubernetes",
      "CI/CD",
      "AWS Deployment",
    ],
    roles: ["DevOps Engineer", "Cloud DevOps"],
  },
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

  const description = `Learn ${course.title} with hands-on projects, expert mentorship, and industry-ready curriculum designed to make you job-ready.`;

  const handleEnroll = () => {
    const user = JSON.parse(localStorage.getItem("loggedInUser"));

    if (user) {
      navigate("/enroll", {
        state: {
          course: {
            title: course.title,
            description: description,
            duration: course.duration,
          },
        },
      });
    } else {
      window.dispatchEvent(new CustomEvent("showLoginModal"));
    }
  };

  return (
    <div className="course-container">
      {/* HERO SECTION */}
      <section className="course-header">
        <div className="course-hero">
          <h1 className="course-title">{course.title}</h1>
          <p className="course-subtitle">
            Job-focused training with live mentorship & real-world projects.
          </p>

          <p className="course-trust">
            ⭐ 4.8/5 Rating · 2500+ Learners · Career Support
          </p>

          <div className="course-stats">
            <div>
              <span>Duration</span>
              <h3>{course.duration}</h3>
            </div>
            <div>
              <span>Fee</span>
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

      {/* CONTENT */}
      <div className="course-content">
        <div className="info-box">
          <h3>Course Overview</h3>
          <p>{description}</p>
        </div>

        <div className="why-course">
          <h3>Why Choose This Course?</h3>
          <div className="why-grid">
            <div>🚀 Job-ready curriculum</div>
            <div>🧑‍🏫 Expert mentors</div>
            <div>🛠 Real-world projects</div>
            <div>📄 Resume & interview support</div>
          </div>
        </div>

        <div className="syllabus-box">
          <h3>Syllabus</h3>
          <ul>
            {course.syllabus.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>

        <div className="career-box">
          <h3>Career Outcomes</h3>
          <div className="career-tags">
            {course.roles.map((role, i) => (
              <span key={i}>{role}</span>
            ))}
          </div>
        </div>

        {/* ENROLL CARD */}
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
              <li>✔ Industry Projects</li>
              <li>✔ Certificate</li>
              <li>✔ Placement Support</li>
            </ul>

            <button className="enroll-main-btn" onClick={handleEnroll}>
              Enroll Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
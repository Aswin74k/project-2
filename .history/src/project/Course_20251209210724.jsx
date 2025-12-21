import React from "react";
import { useParams } from "react-router-dom";
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
      " Python & Django Framework",
      "Jquery",
      "MyS",
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
      "JWT Authentication",
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

  devops: {
    title: "DevOps Engineering",
    fee: "₹32,000",
    duration: "3.5 Months",
    banner: "/banners/devops.jpg",
    syllabus: [
      "Linux & Shell Scripting",
      "Git & GitHub",
      "Docker",
      "Kubernetes",
      "Jenkins",
      "CI/CD Pipeline",
      "Cloud Deployment"
    ]
  },

  datascience: {
    title: "Data Science",
    fee: "₹40,000",
    duration: "5 Months",
    banner: "/banners/datascience.jpg",
    syllabus: [
      "Python",
      "Statistics",
      "Machine Learning",
      "Data Visualization",
      "SQL",
      "Data Wrangling",
      "ML Projects"
    ]
  },

  dataanalytics: {
    title: "Data Analytics",
    fee: "₹22,000",
    duration: "3 Months",
    banner: "/banners/dataanalytics.jpg",
    syllabus: [
      "Excel",
      "Power BI / Tableau",
      "SQL",
      "Python Basics",
      "Dashboard Building",
      "Data Cleaning",
      "Case Studies"
    ]
  },

  uiux: {
    title: "UI/UX Designing",
    fee: "₹18,000",
    duration: "2.5 Months",
    banner: "/banners/uiux.jpg",
    syllabus: [
      "Design Principles",
      "Figma",
      "Wireframing",
      "Prototyping",
      "User Research",
      "UX Case Study",
      "Portfolio Building"
    ]
  }
};

export default function Course() {
  const { id } = useParams();
  const course = courseData[id];

  if (!course) {
    return <h2 className="text-center mt-5">Course Not Found</h2>;
  }

  return (
    <div className="course-container">
      <div className="course-header">
        <img src={course.banner} alt={course.title} className="course-banner" />
        <div className="course-overlay"></div>
        <h1 className="course-title">{course.title}</h1>
      </div>

      <div className="course-content container">
        <div className="info-box">
          <h3>Course Overview</h3>
          <p>
            Our <b>{course.title}</b> program is structured to make you job-ready with hands-on training, real-world projects, and expert mentorship.
          </p>

          <ul className="details-list">
            <li><strong>Fee:</strong> {course.fee}</li>
            <li><strong>Duration:</strong> {course.duration}</li>
          </ul>
        </div>

        <div className="syllabus-box">
          <h3>Syllabus</h3>
          <ul>
            {course.syllabus.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

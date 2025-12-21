import React from "react";
import "./Courses.css";

export default function Courses() {
  const courses = [
    {
      title: "Full Stack Development",
      desc: "Master frontend + backend with real-world projects.",
    },
    {
      title: "MERN Stack",
      desc: "Learn MongoDB, Express, React, and Node.js like a pro.",
    },
    {
      title: "UI / UX Design",
      desc: "Design modern interfaces and seamless user experiences.",
    },
    {
      title: "Data Analytics",
      desc: "Analyze data and create insights using top tools.",
    },
    {
      title: "Data Science",
      desc: "Learn ML, statistics, Python, and predictive modeling.",
    },
    {
      title: "Cloud & DevOps",
      desc: "AWS, Azure, Docker, Kubernetes & automation.",
    },
    {
      title: "AI / ML",
      desc: "Build intelligent applications using ML algorithms.",
    },
  ];

  return (
    <div className="courses-section">
      <h2>Our Courses</h2>

      <div className="courses-container">
        {courses.map((c, index) => (
          <div className="course-card" key={index}>
            <h3>{c.title}</h3>
            <p>{c.desc}</p>
            <button>View Details</button>
          </div>
        ))}
      </div>
    </div>
  );
}

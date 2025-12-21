import React from "react";
import "./about.css";

export default function About() {
  return (
    <div className="about-container">

      <h2 className="about-title">About Our EduTech Platform</h2>

      <p>
        Welcome to our EduTech learning platform — a place where students,
        learners, and professionals can access high-quality education anytime,
        anywhere.
      </p>

      {/* WHO WE ARE */}
      <div className="about-section">
        <h3>Who We Are</h3>
        <p>
          We are an education-driven platform focused on providing modern,
          practical, and easy-to-learn courses for students across different
          fields. Our goal is to make learning accessible, affordable, and
          career-focused.
        </p>
      </div>

      {/* WHAT WE OFFER */}
      <div className="about-section">
        <h3>What We Offer</h3>
        <div className="about-box">
          <ul>
            <li>Interactive Video Lessons</li>
            <li>Live Classes With Mentors</li>
            <li>Project-Based Learning</li>
            <li>Career-Oriented Courses</li>
            <li>Beginner to Advanced Skill Training</li>
          </ul>
        </div>
      </div>

      {/* MISSION */}
      <div className="about-section">
        <h3>Our Mission</h3>
        <p>
          To empower millions of learners with the skills they need to succeed in the modern digital world.
        </p>
      </div>

      {/* WHY CHOOSE US */}
      <div className="about-section">
        <h3>Why Choose Us?</h3>

        <div className="choose-grid">
          <div className="choose-card">
            <h4>✔ Expert Instructors</h4>
            <p>Learn from industry professionals with real-world experience.</p>
          </div>

          <div className="choose-card">
            <h4>✔ Job-Ready Skills</h4>
            <p>Courses designed to meet the current demand in the tech industry.</p>
          </div>

          <div className="choose-card">
            <h4>✔ Affordable Learning</h4>
            <p>High-quality courses at pocket-friendly prices.</p>
          </div>

          <div className="choose-card">
            <h4>✔ 24/7 Access</h4>
            <p>Learn anytime, anywhere — from any device.</p>
          </div>
        </div>
      </div>
    </div>
  );
}


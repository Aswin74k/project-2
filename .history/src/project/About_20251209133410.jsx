import React from "react";
import "./About.css"; 
export default function About() {
  return (
    <div className="about-container">
      <h1 className="about-title">About Our EduTech Platform</h1>

      <p className="about-description">
        Welcome to our EduTech learning platform — a place where students, learners, 
        and professionals can access high-quality education anytime, anywhere.
      </p>

      <section className="about-section">
        <h2>Who We Are</h2>
        <p>
          We are an education-driven platform focused on providing modern, 
          practical, and easy-to-learn courses for students across different fields.  
          Our goal is to make learning accessible, affordable, and career-focused.
        </p>
      </section>

      <section className="about-section">
        <h2>What We Offer</h2>
        <ul>
          <li>Interactive Video Lessons</li>
          <li>Live Classes With Mentors</li>
          <li>Project-Based Learning</li>
          <li>Career-Oriented Courses</li>
          <li>Beginner to Advanced Skill Training</li>
        </ul>
      </section>

      <section className="about-section">
        <h2>Our Mission</h2>
        <p>
          To empower millions of learners with the skills they need to succeed 
          in the modern digital world.
        </p>
      </section>

      <section className="about-section">
        <h2>Why Choose Us?</h2>
        <ul>
          <li>Expert Teachers & Mentors</li>
          <li>Affordable Learning Plans</li>
          <li>24/7 Learning Access</li>
          <li>Certificate for Every Course</li>
          <li>Real-World Practical Knowledge</li>
        </ul>
      </section>
    </div>
  );
}

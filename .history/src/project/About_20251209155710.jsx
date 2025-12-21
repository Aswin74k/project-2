import React from "react";
import "./about.css";

export default function About() {
  return (
    <div className="about-wrapper">
      <div className="about-container">

        <h2 className="about-title">About Our EduTech Platform</h2>
        <p className="about-subtitle">
          Empowering learners worldwide with high-quality, affordable, and future-ready education.
        </p>

        {/* WHO WE ARE */}
        <div className="section">
          <h3>Who We Are</h3>
          <p>
            We are a next-generation education platform designed to bring modern,
            practical, and interactive learning to students, professionals, and
            career-changers.
          </p>
        </div>

        {/* WHAT WE OFFER */}
        <div className="section">
          <h3>What We Offer</h3>
          <div className="glass-box">
            <ul>
              <li>Interactive HD Video Lessons</li>
              <li>Live Classes With Industry Mentors</li>
              <li>Real-Time Project-Based Learning</li>
              <li>Career-Focused Certification Courses</li>
              <li>Beginner to Advanced Skill Development</li>
            </ul>
          </div>
        </div>

        {/* MISSION */}
        <div className="section">
          <h3>Our Mission</h3>
          <p>
            Our goal is to make world-class education accessible to everyone and prepare
            them for the digital future.
          </p>
        </div>

        {/* WHY CHOOSE US */}
        <div className="section">
          <h3>Why Choose Us?</h3>

          <div className="choose-grid">
            <div className="choose-card">
              <h4>Expert Instructors</h4>
              <p>Learn from real professionals with years of experience.</p>
            </div>

            <div className="choose-card">
              <h4>Job-Ready Skills</h4>
              <p>Programs designed based on real industry demand.</p>
            </div>

            <div className="choose-card">
              <h4>Affordable Pricing</h4>
              <p>High-quality learning without heavy fees.</p>
            </div>

            <div className="choose-card">
              <h4>Flexible & 24/7 Learning</h4>
              <p>Study anytime from any device at your own pace.</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}



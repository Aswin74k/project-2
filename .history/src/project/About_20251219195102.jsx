import React from "react";
import "./about.css";

export default function About() {
  return (
    <div className="about-wrapper">
      <div className="about-container">

        {/* HEADER */}
        <h2 className="about-title">About EduTech</h2>
        <p className="about-subtitle">
          A modern learning platform focused on building real-world skills,
          practical experience, and career confidence.
        </p>


        <div className="section">
          <h3>Who We Are</h3>
          <p>
            EduTech is a career-focused digital learning platform designed for
            learners who want more than just theory. We focus on hands-on
            learning, real projects, and industry-aligned skills that help
            learners grow with confidence in today’s competitive tech world.
          </p>
        </div>

        <div className="section">
          <h3>What We Do</h3>
          <div className="glass-box">
            <ul>
              <li>Deliver structured, easy-to-follow learning paths</li>
              <li>Focus on real-world, project-based education</li>
              <li>Provide practical skills aligned with industry needs</li>
              <li>Support learners from beginner to advanced levels</li>
              <li>Help learners build strong portfolios, not just certificates</li>
            </ul>
          </div>
        </div>

        <div className="section">
          <h3>Our Mission</h3>
          <p>
            Our mission is to make high-quality, practical education accessible
            to everyone and empower learners to build meaningful careers through
            technology.
          </p>
        </div>

   
        <div className="section">
          <h3>Why Choose EduTech</h3>

          <div className="choose-grid">
            <div className="choose-card">
              <h4>Industry-Relevant Skills</h4>
              <p>
                Learn skills that are actually used in real companies and
                real-world projects.
              </p>
            </div>

            <div className="choose-card">
              <h4>Project-Based Learning</h4>
              <p>
                Build applications, dashboards, and systems — not just watch
                videos.
              </p>
            </div>

            <div className="choose-card">
              <h4>Flexible Learning</h4>
              <p>
                Learn anytime, anywhere, at your own pace using any device.
              </p>
            </div>

            <div className="choose-card">
              <h4>Career-Focused Approach</h4>
              <p>
                Designed to help learners grow skills that matter for real
                career opportunities.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

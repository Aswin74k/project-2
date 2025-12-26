import React from "react";
import "./placement.css";

export default function PlacementSection() {
  return (
    <section className="placement-section">
      <div className="placement-container">
        
        {/* LEFT CONTENT */}
        <div className="placement-content">
          <h2>Career & Placement Support</h2>
          <p className="placement-subtitle">
            We don’t just teach skills. We help you build a career.
          </p>

          <p className="placement-desc">
            Our career support program is designed to prepare learners for
            real-world job opportunities through structured mentorship,
            interview preparation, and continuous guidance.
          </p>

          <ul className="placement-points">
            <li>Dedicated career mentorship from industry experts</li>
            <li>Resume, portfolio & LinkedIn profile optimization</li>
            <li>Mock interviews with real hiring scenarios</li>
            <li>Access to hiring partners and referral networks</li>
            <li>Career guidance even after course completion</li>
          </ul>
        </div>

        {/* RIGHT HIGHLIGHTS */}
        <div className="placement-metrics">
          <div>
            <h3>85%</h3>
            <p>Placement Assistance</p>
          </div>

          <div>
            <h3>300+</h3>
            <p>Hiring Partners</p>
          </div>

          <div>
            <h3>1:1</h3>
            <p>Career Mentorship</p>
          </div>
        </div>

      </div>
    </section>
  );
}

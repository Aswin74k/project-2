import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Payment.css";

const courseFees = {
  fullstack: "₹25,000",
  mern: "₹28,000",
  cloud: "₹30,000",
  aiml: "₹35,000",
  uiux: "₹20,000",
  datascience: "₹32,000",
  dataanalytics: "₹22,000",
  devops: "₹30,000",
};

export default function Payment() {
  const location = useLocation();
  const navigate = useNavigate();
  const courseId = location.state?.courseId;

  useEffect(() => {
    if (!courseId) navigate("/");
  }, [courseId, navigate]);

  const handlePayment = () => {
    // fake success
    alert("Payment Successful 🎉");
    navigate("/");
  };

  return (
    <div className="payment-page">
      <div className="payment-card">
        <h2>Secure Payment</h2>
        <p className="payment-subtitle">
          Complete your enrollment by making the payment
        </p>

        <div className="course-summary">
          <div>
            <span>Course</span>
            <strong>{courseId?.toUpperCase()}</strong>
          </div>
          <div>
            <span>Total Fee</span>
            <strong>{courseFees[courseId]}</strong>
          </div>
        </div>

        {/* PAYMENT METHODS */}
        <div className="payment-methods">
          <button className="active">💳 Card</button>
          <button>📱 UPI</button>
          <button>🏦 Net Banking</button>
        </div>

        {/* CARD FORM */}
        <div className="payment-form">
          <input type="text" placeholder="Cardholder Name" />
          <input type="text" placeholder="Card Number" />
          <div className="payment-row">
            <input type="text" placeholder="MM / YY" />
            <input type="password" placeholder="CVV" />
          </div>
        </div>

        <button className="pay-btn" onClick={handlePayment}>
          Pay {courseFees[courseId]}
        </button>

        <p className="secure-note">
          🔒 100% Secure Payments · SSL Encrypted
        </p>
      </div>
    </div>
  );
}

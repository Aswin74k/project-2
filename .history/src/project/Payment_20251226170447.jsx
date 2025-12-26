import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Payment.css";

export default function Payment() {
  const navigate = useNavigate();
  const location = useLocation();
  const { courseId, userData } = location.state || {};

  if (!courseId) {
    return <h3 style={{ textAlign: "center" }}>Invalid Payment Request</h3>;
  }

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

  const handlePayment = () => {
    alert("Payment Successful ✅");

    navigate("/");
  };

  return (
    <div className="payment-page">
      <div className="payment-card">
        <h2>Payment Details</h2>

        <p><b>Name:</b> {userData?.name}</p>
        <p><b>Course:</b> {courseId.toUpperCase()}</p>
        <p><b>Fee:</b> {courseFees[courseId]}</p>

        <button className="pay-btn" onClick={handlePayment}>
          Pay Now
        </button>
      </div>
    </div>
  );
}

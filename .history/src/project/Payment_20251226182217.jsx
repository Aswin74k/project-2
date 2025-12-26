import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Payment.css";

export default function Payment() {
  const navigate = useNavigate();
  const location = useLocation();
  const { courseId, userData } = location.state || {};

  const [paymentMethod, setPaymentMethod] = useState("UPI");

  if (!courseId || !userData) {
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
    const payments =
      JSON.parse(localStorage.getItem("payments")) || [];

    payments.push({
      name: userData.name,
      email: userData.email,
      phone: userData.phone,
      courseId,
      amount: courseFees[courseId],
      paymentMethod,
      paymentStatus: "Paid",
      paidAt: new Date().toISOString(),
    });

    localStorage.setItem("payments", JSON.stringify(payments));

    alert("Payment Successful ✅");

    navigate("/");
  };

  return (
    <div className="payment-page">
      <div className="payment-card">
        <h2>Secure Payment</h2>

        <div className="payment-summary">
          <p><b>Name:</b> {userData.name}</p>
          <p><b>Course:</b> {courseId.toUpperCase()}</p>
          <p><b>Fee:</b> {courseFees[courseId]}</p>
        </div>

        <h4>Select Payment Method</h4>

        <div className="payment-methods">

          <label className="payment-option">
            <input
              type="radio"
              name="payment"
              value="UPI"
              checked={paymentMethod === "UPI"}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            <div className="payment-box">
              <i className="bi bi-upc-scan"></i>
              <span>UPI</span>
              <small>GPay / PhonePe / Paytm</small>
            </div>
          </label>

          <label className="payment-option">
            <input
              type="radio"
              name="payment"
              value="Google Pay"
              checked={paymentMethod === "Google Pay"}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            <div className="payment-box">
              <i className="bi bi-google"></i>
              <span>Google Pay</span>
              <small>Instant UPI</small>
            </div>
          </label>

          <label className="payment-option">
            <input
              type="radio"
              name="payment"
              value="Net Banking"
              checked={paymentMethod === "Net Banking"}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            <div className="payment-box">
              <i className="bi bi-bank"></i>
              <span>Net Banking</span>
              <small>All Indian Banks</small>
            </div>
          </label>

        </div>

        <button className="pay-btn" onClick={handlePayment}>
          Pay {courseFees[courseId]}
        </button>
      </div>
    </div>
  );
}

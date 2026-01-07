import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  FaCreditCard,
  FaGooglePay,
  FaApplePay,
  FaUniversity,
  FaCheckCircle,
} from "react-icons/fa";
import "./Payment.css";

export default function Payment() {
  const navigate = useNavigate();
  const location = useLocation();

  const courseName = location.state?.courseName || "Selected Course";
  const courseFee = location.state?.fee || 1999;

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handlePayment = (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      const payments =
        JSON.parse(localStorage.getItem("payments")) || [];

      payments.push({
        courseName,
        fee: courseFee,
        status: "success",
        paidAt: new Date().toISOString(),
      });

      localStorage.setItem("payments", JSON.stringify(payments));

      setLoading(false);
      setSuccess(true);

      setTimeout(() => {
        navigate("/");
      }, 2000);
    }, 1500);
  };

  return (
    <div className="pay-page">
      <div className="pay-card">

        <h2 className="pay-title">Payment</h2>

        <div className="pay-course">
          <span>{courseName}</span>
          <strong>₹{courseFee}</strong>
        </div>

        <div className="pay-methods">
          <div className="pay-method"><FaGooglePay /> UPI</div>
          <div className="pay-method"><FaCreditCard /> Card</div>
          <div className="pay-method"><FaUniversity /> Net Banking</div>
          <div className="pay-method"><FaApplePay /> Wallet</div>
        </div>

        <form className="pay-form" onSubmit={handlePayment}>
          <input className="pay-input" placeholder="Cardholder Name" required />
          <input
            className="pay-input"
            placeholder="Card Number"
            maxLength="16"
            required
          />

          <div className="pay-row">
            <input className="pay-input" placeholder="MM / YY" required />
            <input
              className="pay-input"
              placeholder="CVV"
              maxLength="3"
              required
            />
          </div>

          <button className="pay-btn" disabled={loading}>
            {loading ? "Processing..." : `Pay ₹${courseFee}`}
          </button>
        </form>
      </div>

      {success && (
        <div className="pay-overlay">
          <div className="pay-popup">
            <FaCheckCircle />
            <h3>Payment Successful</h3>
            <p>Enrollment Confirmed</p>
          </div>
        </div>
      )}
    </div>
  );
}
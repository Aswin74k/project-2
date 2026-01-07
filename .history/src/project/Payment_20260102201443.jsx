import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./payment.css";

export default function Payment() {
  const navigate = useNavigate();
  const location = useLocation();
  const courseId = location.state?.courseId;

  const [showSuccess, setShowSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handlePayment = (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      const payments =
        JSON.parse(localStorage.getItem("payments")) || [];

      payments.push({
        courseId,
        amount: 1999,
        paidAt: new Date().toISOString(),
        status: "success",
      });

      localStorage.setItem("payments", JSON.stringify(payments));

      setLoading(false);
      setShowSuccess(true);

      setTimeout(() => {
        navigate("/"); // or dashboard
      }, 2000);
    }, 1500);
  };

  return (
    <div className="payment-page">
      <div className="payment-card">

        <h2>Complete Payment</h2>
        <p className="price">₹1999</p>

        <form onSubmit={handlePayment}>
          <input placeholder="Cardholder Name" required />
          <input placeholder="Card Number" maxLength="16" required />
          
          <div className="row">
            <input placeholder="MM / YY" required />
            <input placeholder="CVV" maxLength="3" required />
          </div>

          <button type="submit" disabled={loading}>
            {loading ? "Processing..." : "Pay Now"}
          </button>
        </form>
      </div>

      {showSuccess && (
        <div className="payment-popup">
          <div className="popup-box">
            <h3>✅ Payment Successful</h3>
            <p>Thank you! Enrollment confirmed.</p>
          </div>
        </div>
      )}
    </div>
  );
}
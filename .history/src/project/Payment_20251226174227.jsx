import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Payment.css";

export default function Payment() {
  const location = useLocation();
  const navigate = useNavigate();
  const courseId = location.state?.courseId;

  const [method, setMethod] = useState("upi");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const amountMap = {
    fullstack: 25000,
    mern: 28000,
    uiux: 20000,
    datascience: 32000,
    dataanalytics: 22000,
    aiml: 35000,
    cloud: 30000,
    devops: 30000,
  };

  const amount = amountMap[courseId] || 25000;

  const handlePayment = () => {
    setLoading(true);

    setTimeout(() => {
      const payments =
        JSON.parse(localStorage.getItem("payments")) || [];

      payments.push({
        courseId,
        amount,
        method,
        paidAt: new Date().toISOString(),
        status: "SUCCESS",
      });

      localStorage.setItem("payments", JSON.stringify(payments));

      setLoading(false);
      setSuccess(true);

      setTimeout(() => {
        navigate("/");
      }, 2500);
    }, 2000);
  };

  return (
    <div className="payment-page">
      <div className="payment-box">
        <h2>Complete Payment</h2>
        <p className="pay-sub">
          Secure payment for course enrollment
        </p>

        <div className="pay-amount">
          <span>Total Amount</span>
          <h3>₹ {amount.toLocaleString()}</h3>
        </div>

        {/* PAYMENT METHODS */}
        <div className="methods">
          <label className={method === "upi" ? "active" : ""}>
            <input
              type="radio"
              checked={method === "upi"}
              onChange={() => setMethod("upi")}
            />
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/f/fa/UPI-Logo.png"
              alt="UPI"
            />
            UPI
          </label>

          <label className={method === "card" ? "active" : ""}>
            <input
              type="radio"
              checked={method === "card"}
              onChange={() => setMethod("card")}
            />
            <img
              src="https://cdn-icons-png.flaticon.com/512/633/633611.png"
              alt="Card"
            />
            Card
          </label>

          <label className={method === "net" ? "active" : ""}>
            <input
              type="radio"
              checked={method === "net"}
              onChange={() => setMethod("net")}
            />
            <img
              src="https://cdn-icons-png.flaticon.com/512/483/483361.png"
              alt="Net Banking"
            />
            Net Banking
          </label>
        </div>

        <button
          className="pay-btn"
          onClick={handlePayment}
          disabled={loading}
        >
          {loading ? "Processing..." : `Pay ₹${amount}`}
        </button>
      </div>

      {/* SUCCESS POPUP */}
      {success && (
        <div className="success-overlay">
          <div className="success-box">
            <div className="tick">✓</div>
            <h3>Payment Successful</h3>
            <p>Your enrollment is confirmed</p>
          </div>
        </div>
      )}
    </div>
  );
}

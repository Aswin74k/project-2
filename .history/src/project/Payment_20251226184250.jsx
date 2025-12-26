import React, { useState } from "react";
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

  const payNow = () => {
    setLoading(true);

    setTimeout(() => {
      const payments =
        JSON.parse(localStorage.getItem("payments")) || [];

      payments.push({
        courseId,
        amount,
        method,
        status: "SUCCESS",
        paidAt: new Date().toISOString(),
      });

      localStorage.setItem("payments", JSON.stringify(payments));

      setLoading(false);
      setSuccess(true);

      setTimeout(() => navigate("/"), 2500);
    }, 2200);
  };

  return (
    <div className="payment-wrapper">
      <div className="payment-card">
        <h2>Secure Payment</h2>
        <p className="payment-desc">
          Complete your enrollment using a secure payment method
        </p>

        <div className="amount-box">
          <span>Amount Payable</span>
          <h3>₹ {amount.toLocaleString()}</h3>
        </div>

        {/* METHODS */}
        <div className="payment-methods">
          <button
            className={method === "upi" ? "active" : ""}
            onClick={() => setMethod("upi")}
          >
            <img src="https://upload.wikimedia.org/wikipedia/commons/f/fa/UPI-Logo.png" />
            <span>UPI</span>
          </button>

          <button
            className={method === "card" ? "active" : ""}
            onClick={() => setMethod("card")}
          >
            <img src="https://cdn-icons-png.flaticon.com/512/633/633611.png" />
            <span>Card</span>
          </button>

          <button
            className={method === "net" ? "active" : ""}
            onClick={() => setMethod("net")}
          >
            <img src="https://cdn-icons-png.flaticon.com/512/483/483361.png" />
            <span>Net Banking</span>
          </button>

          <button
            className={method === "wallet" ? "active" : ""}
            onClick={() => setMethod("wallet")}
          >
            <img src="https://cdn-icons-png.flaticon.com/512/891/891462.png" />
            <span>Wallet</span>
          </button>
        </div>

        <button
          className="pay-btn"
          onClick={payNow}
          disabled={loading}
        >
          {loading ? "Processing Payment..." : `Pay ₹${amount}`}
        </button>

        <p className="secure-note">
          🔒 100% Secure • SSL Encrypted Payment
        </p>
      </div>

      {/* SUCCESS MODAL */}
      {success && (
        <div className="success-overlay">
          <div className="success-modal">
            <div className="success-icon">✓</div>
            <h3>Payment Successful</h3>
            <p>Your enrollment is confirmed</p>
          </div>
        </div>
      )}
    </div>
  );
}

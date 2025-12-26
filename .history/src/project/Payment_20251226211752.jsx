import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  FaLock,
  FaCheckCircle,
  FaUniversity,
  FaWallet,
  FaCreditCard,
} from "react-icons/fa";
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
        <div className="payment-header">
          <FaLock />
          <h2>Secure Checkout</h2>
        </div>

        <p className="payment-desc">
          Complete your enrollment using a trusted payment method
        </p>

        <div className="amount-box">
          <span>Total Amount</span>
          <h3>₹ {amount.toLocaleString()}</h3>
        </div>

        {/* PAYMENT METHODS */}
        <div className="payment-methods">
          <button
            className={method === "upi" ? "active" : ""}
            onClick={() => setMethod("upi")}
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/f/fa/UPI-Logo.png"
              alt="UPI"
            />
            <span>UPI</span>
          </button>

          <button
            className={method === "card" ? "active" : ""}
            onClick={() => setMethod("card")}
          >
            <FaCreditCard />
            <span>Card</span>
          </button>

          <button
            className={method === "net" ? "active" : ""}
            onClick={() => setMethod("net")}
          >
            <FaUniversity />
            <span>Net Banking</span>
          </button>

          <button
            className={method === "wallet" ? "active" : ""}
            onClick={() => setMethod("wallet")}
          >
            <FaWallet />
            <span>Wallet</span>
          </button>
        </div>

        <button
          className="pay-btn"
          onClick={payNow}
          disabled={loading}
        >
          {loading ? "Processing..." : `Pay ₹${amount}`}
        </button>

        <p className="secure-note">
          <FaLock /> 100% Secure •  Payment Simulation
        </p>
      </div>

      {/* SUCCESS MODAL */}
      {success && (
        <div className="success-overlay">
          <div className="success-modal">
            <FaCheckCircle className="success-icon" />
            <h3>Payment Successful</h3>
            <p>Your enrollment is confirmed </p>
          </div>
        </div>
      )}
    </div>
  );
}
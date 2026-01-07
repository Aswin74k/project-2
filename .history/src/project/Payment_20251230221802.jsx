import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaCreditCard,
  FaUniversity,
  FaCheckCircle,
} from "react-icons/fa";
import {
  SiGooglepay,
  SiPhonepe,
  SiPaytm,
} from "react-icons/si";
import "./payment.css";

export default function Payment() {
  const [method, setMethod] = useState("upi");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handlePayment = () => {
    setSuccess(true);

    setTimeout(() => {
      navigate("/");
    }, 2500);
  };

  return (
    <div className="payment-container">
      <div className="payment-card">
        <h2>Complete Your Payment</h2>
        <p className="sub-text">Choose a payment method</p>

        {/* PAYMENT METHODS */}
        <div className="payment-tabs">
          <button
            className={method === "upi" ? "active" : ""}
            onClick={() => setMethod("upi")}
          >
            <SiGooglepay className="pay-icon gpay" />
            <SiPhonepe className="pay-icon phonepe" />
            <SiPaytm className="pay-icon paytm" />
            UPI
          </button>

          <button
            className={method === "card" ? "active" : ""}
            onClick={() => setMethod("card")}
          >
            <FaCreditCard className="pay-icon" />
            Card
          </button>

          <button
            className={method === "net" ? "active" : ""}
            onClick={() => setMethod("net")}
          >
            <FaUniversity className="pay-icon" />
            Net Banking
          </button>
        </div>

        {/* PAYMENT FORM */}
        <div className="payment-form">
          {method === "card" && (
            <>
              <input placeholder="Card Number" />
              <div className="row">
                <input placeholder="MM/YY" />
                <input placeholder="CVV" />
              </div>
            </>
          )}

          {method === "upi" && (
            <input placeholder="Enter UPI ID (example@upi)" />
          )}

          {method === "net" && (
            <select>
              <option>Select Bank</option>
              <option>SBI</option>
              <option>HDFC</option>
              <option>ICICI</option>
              <option>Axis Bank</option>
            </select>
          )}

          <button className="pay-btn" onClick={handlePayment}>
            Pay ₹499
          </button>
        </div>
      </div>

      {/* SUCCESS POPUP */}
      {success && (
        <div className="payment-success">
          <FaCheckCircle />
          <h3>Payment Successful</h3>
          <p>Redirecting to home page...</p>
        </div>
      )}
    </div>
  );
}
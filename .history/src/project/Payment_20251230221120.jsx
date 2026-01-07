import React, { useState } from "react";
import "./payment.css";

export default function Payment() {
  const [method, setMethod] = useState("card");
  const [success, setSuccess] = useState(false);

  const handlePayment = (e) => {
    e.preventDefault();
    setTimeout(() => {
      setSuccess(true);
    }, 1500);
  };

  if (success) {
    return (
      <div className="payment-success">
        <h1>✅ Payment Successful</h1>
        <p>Thank you for enrolling 🎉</p>
        <button onClick={() => window.location.href = "/"}>
          Go to Home
        </button>
      </div>
    );
  }

  return (
    <div className="payment-wrapper">
      <div className="payment-card">
        <h2>Complete Your Payment</h2>
        <p className="amount">Amount: ₹25,000</p>

        <div className="payment-tabs">
          <button
            className={method === "card" ? "active" : ""}
            onClick={() => setMethod("card")}
          >
            💳 Card
          </button>
          <button
            className={method === "upi" ? "active" : ""}
            onClick={() => setMethod("upi")}
          >
            📱 UPI
          </button>
          <button
            className={method === "net" ? "active" : ""}
            onClick={() => setMethod("net")}
          >
            🏦 Net Banking
          </button>
        </div>

        <form onSubmit={handlePayment}>
          {method === "card" && (
            <>
              <input type="text" placeholder="Card Number" required />
              <div className="row">
                <input type="text" placeholder="MM/YY" required />
                <input type="text" placeholder="CVV" required />
              </div>
              <input type="text" placeholder="Card Holder Name" required />
            </>
          )}

          {method === "upi" && (
            <input type="text" placeholder="UPI ID (example@upi)" required />
          )}

          {method === "net" && (
            <select required>
              <option value="">Select Bank</option>
              <option>SBI</option>
              <option>HDFC</option>
              <option>ICICI</option>
              <option>Axis Bank</option>
            </select>
          )}

          <button type="submit" className="pay-btn">
            Pay Now
          </button>
        </form>
      </div>
    </div>
  );
}
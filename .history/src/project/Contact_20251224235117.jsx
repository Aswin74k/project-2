import React, { useState } from "react";
import emailjs from "emailjs-com";
import {
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
} from "react-icons/fa";
import "./contact.css";

export default function Contact() {
  const [status, setStatus] = useState("");

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        <Route path="/about" element={<About />} />
     // 🔁 your service ID
        "template_7uyno6u",    // 🔁 your template ID
        e.target,
        "sTTzV7QdAk2Jx3lZL"    // 🔁 your public key
      )
      .then(
        () => {
          setStatus("Message sent successfully ");
          e.target.reset();

          setTimeout(() => setStatus(""), 2000);
        },
        () => {
          setStatus("Something went wrong ");
          setTimeout(() => setStatus(""), 2000);
        }
      );
  };

  return (
    <div className="contact-page">
      {/* ================= HEADER ================= */}
      <h2 className="contact-title">Contact Us</h2>
      <p className="contact-subtitle">
        We’d love to hear from you. Reach out anytime!
      </p>

      <div className="contact-container">
        {/* ================= LEFT INFO ================= */}
        <div className="contact-info">
          <div className="info-box">
            <FaEnvelope />
            <div>
              <h4>Email</h4>
              <p>support@edutech.com</p>
            </div>
          </div>

          <div className="info-box">
            <FaPhoneAlt />
            <div>
              <h4>Phone</h4>
              <p>7736476724</p>
            </div>
          </div>

          <div className="info-box">
            <FaMapMarkerAlt />
            <div>
              <h4>Address</h4>
              <p>Calicut, Kerala, India</p>
            </div>
          </div>
        </div>

        {/* ================= FORM ================= */}
        <form className="contact-form" onSubmit={sendEmail}>
          <input
            type="text"
            name="name"
            placeholder="Your Name"
          
          />

          <input
            type="email"
            name="email"
            placeholder="Your Email"
          
          />

          <textarea
            name="message"
            placeholder="Your Message"
            rows="5"
           
          ></textarea>

          <button type="submit">
            Send Message
          </button>

          {/* ================= STATUS MESSAGE ================= */}
          {status && (
            <p
              className={`status-msg ${
                status.includes("successfully")
                  ? "success"
                  : "error"
              }`}
            >
              {status}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}

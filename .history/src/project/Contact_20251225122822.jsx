import React, { useState } from "react";
import emailjs from "emailjs-com";
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";
import "./contact.css";

export default function Contact() {
  const [status, setStatus] = useState("");
  const [errors, setErrors] = useState({});

  const validate = (formData) => {
    let tempErrors = {};

    // NAME
    if (!formData.name.trim()) {
      tempErrors.name = "Name is required";
    }

    // EMAIL
    if (!formData.email.trim()) {
      tempErrors.email = "Email is required";
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
    ) {
      tempErrors.email = "Enter a valid email";
    }

    // MESSAGE
    if (!formData.message.trim()) {
      tempErrors.message = "Message is required";
    } else if (formData.message.length < 10) {
      tempErrors.message = "Message must be at least 10 characters";
    }

    setErrors(tempErrors);

    return Object.keys(tempErrors).length === 0;
  };

  const sendEmail = (e) => {
    e.preventDefault();

    const formData = {
      name: e.target.name.value,
      email: e.target.email.value,
      message: e.target.message.value,
    };

    // ❌ STOP if validation fails
    if (!validate(formData)) return;

    // ✅ SEND EMAIL
    emailjs
      .sendForm(
        "service_31jicom",
        "template_7uyno6u",
        e.target,
        "sTTzV7QdAk2Jx3lZL"
      )
      .then(
        () => {
          setStatus("Message sent successfully ✅");
          e.target.reset();
          setErrors({});
          setTimeout(() => setStatus(""), 3000);
        },
        () => {
          setStatus("Something went wrong ❌");
          setTimeout(() => setStatus(""), 3000);
        }
      );
  };

  return (
    <div className="contact-page">
      <h2 className="contact-title">Contact Us</h2>
      <p className="contact-subtitle">
        We’d love to hear from you. Reach out anytime!
      </p>

      <div className="contact-container">

        {/* LEFT INFO */}
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

        {/* FORM */}
        <form className="contact-form" onSubmit={sendEmail}>
          <input
            type="text"
            name="name"
            placeholder="Your Name"
          />
          {errors.name && <small className="error">{errors.name}</small>}

          <input
            type="email"
            name="email"
            placeholder="Your Email"
          />
          {errors.email && <small className="error">{errors.email}</small>}

          <textarea
            name="message"
            placeholder="Your Message"
            rows="5"
          ></textarea>
          {errors.message && (
            <small className="error">{errors.message}</small>
          )}

          <button type="submit">Send Message</button>

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

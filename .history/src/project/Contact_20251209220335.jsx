import React, { useState } from "react";
import emailjs from "emailjs-com";
import "./contact.css";

export default function Contact() {
  const [formMessage, setFormMessage] = useState("");
  const [type, setType] = useState("");
  const [loading, setLoading] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault();
    setFormMessage("");
    setLoading(true);

    emailjs
      .sendForm(
        "service_31jicom",      // your service ID
        "template_7uyno6u",     // your template ID
        e.target,
        "sTTzV7QdAk2Jx3lZL"     // your public key
      )
      .then(
        () => {
          setFormMessage("Your message has been sent successfully!");
          setType("success");
          setLoading(false);
          e.target.reset();
        },
        () => {
          setFormMessage("Failed to send message. Please try again.");
          setType("error");
          setLoading(false);
        }
      );
  };

  return (
    <div className="contact-container">

      {/* LEFT SECTION */}
      <div className="contact-info">
        <h2>Get In Touch</h2>
        <p>
          We'd love to hear from you! Whether you have a question about courses,
          pricing, features, or anything else — our team is ready to answer all
          your questions.
        </p>

        <div className="info-box">
          <h4>📧 Email</h4>
          <p>support@edutech.com</p>
        </div>

        <div className="info-box">
          <h4>📍 Address</h4>
          <p>Calicut, Karnataka, India</p>
        </div>

        <div className="info-box">
          <h4>📞 Phone</h4>
          <p>+91 98765 43210</p>
        </div>
      </div>

      {/* RIGHT SECTION */}
      <form className="contact-form" onSubmit={sendEmail}>
        <h3>Send Us a Message</h3>

        <div className="input-group">
          <input type="text" name="first" required />
          <label>First Name</label>
        </div>

        <div className="input-group">
          <input type="text" name="last" required />
          <label>Last Name</label>
        </div>

        <div className="input-group">
          <input type="email" name="email" required />
          <label>Email Address</label>
        </div>

        <div className="input-group textarea">
          <textarea name="message" required></textarea>
          <label>Your Message</label>
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Sending..." : "Send Message"}
        </button>

        {formMessage && (
          <p className={`message-box ${type}`}>{formMessage}</p>
        )}
      </form>
    </div>
  );
}

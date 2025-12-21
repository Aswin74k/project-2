import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import emailjs from "emailjs-com";
import { FiPhone, FiMail, FiMapPin } from "react-icons/fi";
import "./contact.css";

export default function Contact() {
  const location = useLocation();
  const selectedCourse = location.state?.course || "";

  const [formMessage, setFormMessage] = useState("");
  const [type, setType] = useState("");
  const [loading, setLoading] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault();
    setFormMessage("");
    setLoading(true);

    emailjs
      .sendForm(
        "service_31jicom",
        "template_7uyno6u",
      
        "sTTzV7QdAk2Jx3lZL"
      )
      .then(() => {
        setFormMessage("Your enrollment request has been sent successfully!");
        setType("success");
        setLoading(false);
        e.target.reset();
      })
      .catch(() => {
        setFormMessage("Failed to send request. Please try again.");
        setType("error");
        setLoading(false);
      });
  };

  return (
    <div className="contact-container">

      {/* LEFT SECTION */}
      <div className="contact-info">
        <h2>{selectedCourse ? "Enroll Now" : "Get In Touch"}</h2>
        <p>
          {selectedCourse
            ? `You are enrolling for the ${selectedCourse} course. Please fill the form and our team will contact you.`
            : "We'd love to hear from you! Whether you have questions about courses, pricing, or features — our team is ready to help."}
        </p>

        <div className="info-box">
          <FiMail className="info-icon" />
          <div>
            <h4>Email</h4>
            <p>support@edutech.com</p>
          </div>
        </div>

        <div className="info-box">
          <FiMapPin className="info-icon" />
          <div>
            <h4>Address</h4>
            <p>Calicut, Kerala, India</p>
          </div>
        </div>

        <div className="info-box">
          <FiPhone className="info-icon" />
          <div>
            <h4>Phone</h4>
            <p>7736476724</p>
          </div>
        </div>
      </div>

      {/* RIGHT SECTION - FORM */}
      <form className="contact-form" onSubmit={sendEmail}>
        <h3>{selectedCourse ? "Course Enrollment" : "Send Us a Message"}</h3>

        {/* COURSE FIELD */}
        {selectedCourse && (
          <div className="input-group">
            <input type="text" name="course" value={selectedCourse} readOnly />
            <label>Selected Course</label>
          </div>
        )}

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

        <div className="input-group">
          <input type="tel" name="phone" required />
          <label>Phone Number</label>
        </div>

        <div className="input-group textarea">
          <textarea
            name="message"
            defaultValue={
              selectedCourse
                ? `I would like to enroll in the ${selectedCourse} course.`
                : ""
            }
            required
          />
          <label>Your Message</label>
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Submitting..." : selectedCourse ? "Enroll Now" : "Send Message"}
        </button>

        {formMessage && (
          <p className={`message-box ${type}`}>{formMessage}</p>
        )}
      </form>
    </div>
  );
}

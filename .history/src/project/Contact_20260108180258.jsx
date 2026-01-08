import React, { useState } from "react";
import { useForm } from "react-hook-form";
import emailjs from "emailjs-com";
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";
import "./contact.css";

export default function Contact() {
  const [status, setStatus] = useState("");
  const [statusType, setStatusType] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: "onBlur",
  });

  const onSubmit = async (data) => {
    setStatus("");
    setStatusType("");

    try {
      await emailjs.send(
        "service_31jicom",
        "template_7uyno6u",
        data,
        "sTTzV7QdAk2Jx3lZL"
      );

      setStatus("Your message has been sent successfully. Our team will contact you shortly.");
      setStatusType("success");
      reset();
    } catch (err) {
      setStatus("Something went wrong. Please try again later.");
      setStatusType("error");
    }

    setTimeout(() => {
      setStatus("");
      setStatusType("");
    }, 3500);
  };

  return (
    <div className="contact-page">
      {/* HEADER */}
      <div className="contact-header">
        <h2>Get in Touch</h2>
        <p>
          Have questions about our courses, enrollment, or career guidance?  
          Our team is here to help you every step of the way.
        </p>
      </div>

      <div className="contact-container">
        {/* LEFT CONTENT */}
        <div className="contact-info">
          <h3>Contact Information</h3>
          <p className="info-desc">
            Reach out to us through any of the following channels.  
            We usually respond within 24 hours.
          </p>

          <div className="info-box">
            <FaEnvelope />
            <div>
              <h4>Email</h4>
              <p>support@techmentor.com</p>
            </div>
          </div>

          <div className="info-box">
            <FaPhoneAlt />
            <div>
              <h4>Phone</h4>
              <p>+91 77364 76724</p>
            </div>
          </div>

          <div className="info-box">
            <FaMapMarkerAlt />
            <div>
              <h4>Address</h4>
              <p>Calicut, Kerala, India</p>
            </div>
          </div>

          <div className="trust-note">
            Trusted by students across India for quality tech education and mentorship.
          </div>
        </div>

        {/* FORM */}
        <form className="contact-form" onSubmit={handleSubmit(onSubmit)} noValidate>
          <h3>Send Us a Message</h3>
          <p className="form-subtitle">
            Fill out the form and we’ll get back to you as soon as possible.
          </p>

          <div className="form-group">
            <input
              type="text"
              placeholder="Your Name"
              className={errors.name ? "error" : ""}
              {...register("name", {
                required: "Name is required",
                minLength: { value: 3, message: "Minimum 3 characters required" },
                pattern: { value: /^[A-Za-z ]+$/, message: "Only letters allowed" },
              })}
            />
            <span className="field-error">{errors.name?.message || ""}</span>
          </div>

          <div className="form-group">
            <input
              type="email"
              placeholder="Your Email"
              className={errors.email ? "error" : ""}
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Enter a valid email",
                },
              })}
            />
            <span className="field-error">{errors.email?.message || ""}</span>
          </div>

          <div className="form-group">
            <textarea
              rows="4"
              placeholder="Your Message"
              className={errors.message ? "error" : ""}
              {...register("message", {
                required: "Message cannot be empty",
                minLength: { value: 10, message: "Minimum 10 characters required" },
              })}
            />
            <span className="field-error">{errors.message?.message || ""}</span>
          </div>

        {/* STATUS MESSAGE – move ABOVE button */}
{status && (
  <p className={`status-msg ${statusType}`}>
    {status}
  </p>
)}

<button type="submit" disabled={isSubmitting}>
  {isSubmitting ? "Sending..." : "Send Message"}
</button>
          {status && <p className={`status-msg ${statusType}`}>{status}</p>}
        </form>
      </div>
    </div>
  );
}
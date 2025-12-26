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
    mode: "onBlur", // validate on blur
  });

  const onSubmit = async (data) => {
    setStatus("");
    setStatusType("");

    try {
      await emailjs.send(
        "service_31jicom",
        "template_7uyno6u",
        data,
        process.env.REACT_APP_EMAILJS_PUBLIC_KEY
      );

      setStatus("Message sent successfully!");
      setStatusType("success");
      reset();
    } catch (error) {
      setStatus("Failed to send message. Please try again.");
      setStatusType("error");
    }

    setTimeout(() => {
      setStatus("");
      setStatusType("");
    }, 3000);
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
              <p>support@techmentor.com</p>
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
        <form className="contact-form" onSubmit={handleSubmit(onSubmit)} noValidate>

          {/* NAME */}
          <div className="form-group">
            <input
              type="text"
              placeholder="Your Name"
              {...register("name", {
                required: "Name is required",
                minLength: {
                  value: 3,
                  message: "Name must be at least 3 characters",
                },
                maxLength: {
                  value: 30,
                  message: "Name must be under 30 characters",
                },
              })}
            />
            {errors.name && (
              <span className="error-msg">{errors.name.message}</span>
            )}
          </div>

          {/* EMAIL */}
          <div className="form-group">
            <input
              type="email"
              placeholder="Your Email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Please enter a valid email address",
                },
              })}
            />
            {errors.email && (
              <span className="error-msg">{errors.email.message}</span>
            )}
          </div>

          {/* MESSAGE */}
          <div className="form-group full-width">
            <textarea
              rows="5"
              placeholder="Your Message"
              {...register("message", {
                required: "Message is required",
                minLength: {
                  value: 10,
                  message: "Message must be at least 10 characters",
                },
                maxLength: {
                  value: 500,
                  message: "Message cannot exceed 500 characters",
                },
              })}
            />
            {errors.message && (
              <span className="error-msg">{errors.message.message}</span>
            )}
          </div>

          {/* SUBMIT */}
          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Sending..." : "Send Message"}
          </button>

          {/* STATUS */}
          {status && (
            <p className={`status-msg ${statusType}`}>
              {status}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}
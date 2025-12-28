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
    mode: "onBlur", // better UX
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
        <form className="contact-form" onSubmit={handleSubmit(onSubmit)}>
          {/* NAME */}
          <input
            type="text"
            placeholder="Your Name"
            className={errors.name ? "error" : ""}
            {...register("name", {
              required: "Name is required",
              minLength: {
                value: 3,
                message: "Name must be at least 3 characters",
              },
            })}
          />
          {errors.name && (
            <span className="field-error">{errors.name.message}</span>
          )}

          {/* EMAIL */}
          <input
            type="email"
            placeholder="Your Email"
            className={errors.email ? "error" : ""}
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Enter a valid email address",
              },
            })}
          />
          {errors.email && (
            <span className="field-error">{errors.email.message}</span>
          )}

          <textarea
            rows="5"
            placeholder="Your Message"
            className={errors.message ? "error" : ""}
            {...register("message", {
              required: "Message cannot be empty",
              minLength: {
                value: 10,
                message: "Message should be at least 10 characters",
              },
            })}
          />
          {errors.message && (
            <span className="field-error">{errors.message.message}</span>
          )}

      
          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Sending..." : "Send Message"}
          </button>

      
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
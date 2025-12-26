import React, { useState } from "react";
import { useForm } from "react-hook-form";
import emailjs from "emailjs-com";
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";
import "./contact.css";

export default function Contact() {
  const [status, setStatus] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = (data) => {
    emailjs
      .send(
        "service_31jicom",
        "template_7uyno6u",
        data,
        "sTTzV7QdAk2Jx3lZL"
      )
      .then(
        () => {
          setStatus("Message sent successfully ✅");
          reset();
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
        <form className="contact-form" onSubmit={handleSubmit(onSubmit)}>
          <input
            type="text"
            placeholder="Your Name"
            {...register("name", {
              required: "Name is required",
              minLength: {
                value: 3,
                message: "Minimum 3 characters",
              },
            })}
          />
          {errors.name && (
            <small className="error">{errors.name.message}</small>
          )}

          <input
            type="email"
            placeholder="Your Email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Enter a valid email",
              },
            })}
          />
          {errors.email && (
            <small className="error">{errors.email.message}</small>
          )}

          <textarea
            rows="5"
            placeholder="Your Message"
            {...register("message", {
              required: "Message is required",
              minLength: {
                value: 10,
                message: "Minimum 10 characters",
              },
            })}
          ></textarea>
          {errors.message && (
            <small className="error">{errors.message.message}</small>
          )}

          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Sending..." : "Send Message"}
          </button>

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

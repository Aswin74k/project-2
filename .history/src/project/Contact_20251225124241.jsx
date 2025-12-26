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
  } = useForm();

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
    }, 4000);
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

      
        <form className="contact-form" onSubmit={handleSubmit(onSubmit)}>
          <input
            type="text"
            placeholder="Your Name"
            {...register("name", { required: true })}
          />

          <input
            type="email"
            placeholder="Your Email"
            {...register("email", {
              required: true,
              pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            })}
          />

          <textarea
            rows="5"
            placeholder="Your Message"
            {...register("message", { required: true })}
          ></textarea>

    
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

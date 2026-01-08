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
  } = useForm({ mode: "onBlur" });

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

      setStatus("Thank you for contacting us. Our team will respond shortly.");
      setStatusType("success");
      reset();
    } catch {
      setStatus("Something went wrong. Please try again later.");
      setStatusType("error");
    }

    setTimeout(() => {
      setStatus("");
      setStatusType("");
    }, 3000);
  };

  return (
    <div className="contact-page">
      <div className="contact-wrapper">
        {/* LEFT CONTENT */}
        <div className="contact-left">
          <h2>Contact TechMentor</h2>
          <p className="intro">
            Have questions about courses, enrollment, or career guidance?
            Our team is ready to assist you with clear and reliable support.
          </p>

          <div className="contact-info">
            <div className="info-box">
              <FaEnvelope />
              <div>
                <h4>Email</h4>
                <p>support@techmentor.com</p>
                <span>Course queries and support</span>
              </div>
            </div>

            <div className="info-box">
              <FaPhoneAlt />
              <div>
                <h4>Phone</h4>
                <p>7736476724</p>
                <span>Mon–Sat, 9:00 AM – 6:00 PM</span>
              </div>
            </div>

            <div className="info-box">
              <FaMapMarkerAlt />
              <div>
                <h4>Address</h4>
                <p>Calicut, Kerala, India</p>
                <span>Serving learners across India</span>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT FORM */}
        <form
          className="contact-form"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
          <h3>Send us a message</h3>
          <p className="form-note">
            Your information is secure and used only to respond to your query.
          </p>

          <div className="form-group">
            <input
              type="text"
              placeholder="Full Name"
              className={errors.name ? "error" : ""}
              {...register("name", {
                required: "Name is required",
                minLength: { value: 3, message: "Minimum 3 characters" },
              })}
            />
            <span className="field-error">{errors.name?.message}</span>
          </div>

          <div className="form-group">
            <input
              type="email"
              placeholder="Email Address"
              className={errors.email ? "error" : ""}
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Enter a valid email",
                },
              })}
            />
            <span className="field-error">{errors.email?.message}</span>
          </div>

          <div className="form-group">
            <textarea
              rows="4"
              placeholder="Tell us how we can help you"
              className={errors.message ? "error" : ""}
              {...register("message", {
                required: "Message is required",
                minLength: { value: 10, message: "Minimum 10 characters" },
              })}
            />
            <span className="field-error">{errors.message?.message}</span>
          </div>

          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Sending..." : "Send Message"}
          </button>

          {status && (
            <p className={`status-msg ${statusType}`}>{status}</p>
          )}
        </form>
      </div>
    </div>
  );
}
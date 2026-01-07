import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useLocation } from "react-router-dom";
import {
  FaCreditCard,
  FaGooglePay,
  FaUniversity,
  FaCheckCircle,
} from "react-icons/fa";
import "./Enroll.css";

export default function Enroll() {
  const navigate = useNavigate();
  const location = useLocation();
  const course = location.state?.course;

  const [showPayment, setShowPayment] = useState(false);
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ mode: "onSubmit" });

  const onSubmit = (data) => {
    localStorage.setItem(
      "pendingEnroll",
      JSON.stringify({ ...data, course })
    );
    setShowPayment(true);
  };

  const handlePayment = () => {
    const enrollments =
      JSON.parse(localStorage.getItem("enrollments")) || [];

    enrollments.push({
      ...JSON.parse(localStorage.getItem("pendingEnroll")),
      paidAt: new Date().toISOString(),
    });

    localStorage.setItem("enrollments", JSON.stringify(enrollments));
    localStorage.removeItem("pendingEnroll");

    reset();
    setShowPayment(false);
    setSuccess(true);

    setTimeout(() => {
      setSuccess(false);
      navigate("/");
    }, 2000);
  };

  return (
    <div className="enroll-page">
      <div className="enroll-layout">

        {/* LEFT */}
        <div className="enroll-info">
          <h2>{course?.title}</h2>
          <p className="course-desc">
            Learn with hands-on projects and expert mentorship.
          </p>

          <div className="duration-box">
            <span>⏱ Duration</span>
            <strong>{course?.duration}</strong>
          </div>

          <p className="secure-note">
            🔒 Secure enrollment • Certificate included
          </p>
        </div>

        {/* RIGHT */}
        <div className="enroll-container">
          <h3>Enroll Now</h3>

          <form onSubmit={handleSubmit(onSubmit)} noValidate>

            <div className="form-group">
              <label>Name</label>
              <input
                className={errors.name ? "error" : ""}
                {...register("name", { required: "Name required" })}
              />
              <span className="field-error">
                {errors.name?.message || ""}
              </span>
            </div>

            <div className="form-group">
              <label>Email</label>
              <input
                className={errors.email ? "error" : ""}
                {...register("email", { required: "Email required" })}
              />
              <span className="field-error">
                {errors.email?.message || ""}
              </span>
            </div>

            <button type="submit" className="enroll-btn">
              Proceed to Payment →
            </button>

            <button
              type="button"
              className="back-btn"
              onClick={() => navigate(-1)}
            >
              ← Back
            </button>
          </form>
        </div>
      </div>

      {/* PAYMENT MODAL */}
      {showPayment && (
        <div className="pay-overlay">
          <div className="pay-modal">

            <h3>Complete Payment</h3>

            <div className="pay-course">
              <span>{course?.title}</span>
              <strong>₹{course?.fee || course?.price}</strong>
            </div>

            <div className="pay-methods">
              <div><FaGooglePay /> UPI</div>
              <div><FaCreditCard /> Card</div>
              <div><FaUniversity /> Net Banking</div>
            </div>

            <button className="pay-btn" onClick={handlePayment}>
              Pay ₹{course?.fee || course?.price}
            </button>

            <button
              className="cancel-btn"
              onClick={() => setShowPayment(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* SUCCESS */}
      {success && (
        <div className="pay-overlay">
          <div className="pay-success">
            <FaCheckCircle />
            <h3>Payment Successful</h3>
            <p>You are enrolled 🎉</p>
          </div>
        </div>
      )}
    </div>
  );
}
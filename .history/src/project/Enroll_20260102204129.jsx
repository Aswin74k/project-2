import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useLocation } from "react-router-dom";
import "./Enroll.css";

export default function Enroll() {
  const navigate = useNavigate();
  const location = useLocation();
  const course = location.state?.course;

  const [showSuccess, setShowSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ mode: "onSubmit" });

  const onSubmit = (data) => {
    const enrollments =
      JSON.parse(localStorage.getItem("enrollments")) || [];

    enrollments.push({
      ...data,
      course: course?.title,
      date: new Date().toISOString(),
    });

    localStorage.setItem("enrollments", JSON.stringify(enrollments));

    reset();
    setShowSuccess(true);

    setTimeout(() => {
      setShowSuccess(false);
      navigate("/");
    }, 2500);
  };

  return (
    <div className="enroll-page">
      <div className="enroll-layout">

        {/* LEFT */}
        <div className="enroll-info">
          <h2>{course?.title || "AI & Machine Learning"}</h2>
          <p>
            Learn with hands-on projects, expert mentorship and job-ready skills.
          </p>

          <div className="duration-box">
            ⏱ Duration: <strong>{course?.duration || "5 Months"}</strong>
          </div>

          <p className="secure-note">🔒 Secure enrollment • Certificate included</p>
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
              <span className="field-error">{errors.name?.message}</span>
            </div>

            <div className="form-group">
              <label>Email</label>
              <input
                className={errors.email ? "error" : ""}
                {...register("email", {
                  required: "Email required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Invalid email",
                  },
                })}
              />
              <span className="field-error">{errors.email?.message}</span>
            </div>

            <div className="form-group">
              <label>Phone</label>
              <input
                className={errors.phone ? "error" : ""}
                {...register("phone", {
                  required: "Phone required",
                  pattern: {
                    value: /^[0-9]{10}$/,
                    message: "10 digits only",
                  },
                })}
              />
              <span className="field-error">{errors.phone?.message}</span>
            </div>

            <div className="form-group">
              <label>Age</label>
              <input
                type="number"
                className={errors.age ? "error" : ""}
                {...register("age", {
                  required: "Age required",
                  min: { value: 16, message: "Min 16" },
                  max: { value: 60, message: "Max 60" },
                })}
              />
              <span className="field-error">{errors.age?.message}</span>
            </div>

            <button className="enroll-btn">Confirm Enrollment</button>

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

      {/* SUCCESS POPUP */}
      {showSuccess && (
        <div className="success-overlay">
          <div className="success-popup">
            <h3>Enrollment Successful 🎉</h3>
            <p>We will contact you shortly</p>
          </div>
        </div>
      )}
    </div>
  );
}
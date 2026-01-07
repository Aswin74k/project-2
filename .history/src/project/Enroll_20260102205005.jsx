import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useLocation } from "react-router-dom";
import "./Enroll.css";

export default function Enroll() {
  const navigate = useNavigate();
  const location = useLocation();
  const course = location.state?.course;

  const [statusMsg, setStatusMsg] = useState("");
  const [statusType, setStatusType] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ mode: "onSubmit" });

  const onSubmit = () => {
    setStatusType("success");
    setStatusMsg("Enrollment successful! We will contact you shortly 😊");

    reset();

    setTimeout(() => {
      setStatusMsg("");
      setStatusType("");
    }, 3000);
  };

  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      setStatusType("error");
      setStatusMsg("Please fix the highlighted fields");

      setTimeout(() => {
        setStatusMsg("");
        setStatusType("");
      }, 2000);
    }
  }, [errors]);

  return (
    <div className="enroll-page">
      <div className="enroll-layout">

        {/* LEFT */}
        <div className="enroll-info">
          <h2>{course?.title || "UI / UX Designing"}</h2>
          <p className="course-desc">
            Learn with hands-on projects, expert mentorship and job-ready skills.
          </p>

          <div className="duration-box">
            <span>⏱ Duration</span>
            <strong>{course?.duration || "3 Months"}</strong>
          </div>

          <p className="secure-note">
            🔒 Secure enrollment • Certificate included
          </p>
        </div>

        {/* RIGHT */}
        <div className="enroll-container">
          <h3>Enroll Now</h3>

          {/* STATUS MESSAGE */}
          <div className="status-holder">
            {statusMsg && (
              <p className={`form-status ${statusType}`}>
                {statusMsg}
              </p>
            )}
          </div>

          <form onSubmit={handleSubmit(onSubmit)} noValidate>

            {/* NAME */}
            <div className="form-group">
              <label>Name</label>
              <input
                className={errors.name ? "error" : ""}
                {...register("name", {
                  required: "Please fill this field",
                })}
              />
              <span className="field-error">
                {errors.name?.message}
              </span>
            </div>

            {/* EMAIL */}
            <div className="form-group">
              <label>Email</label>
              <input
                className={errors.email ? "error" : ""}
                {...register("email", {
                  required: "Please fill this field",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Enter a valid email",
                  },
                })}
              />
              <span className="field-error">
                {errors.email?.message}
              </span>
            </div>

            {/* PHONE */}
            <div className="form-group">
              <label>Phone</label>
              <input
                className={errors.phone ? "error" : ""}
                {...register("phone", {
                  required: "Please fill this field",
                  pattern: {
                    value: /^[0-9]{10}$/,
                    message: "Phone must be 10 digits",
                  },
                })}
              />
              <span className="field-error">
                {errors.phone?.message}
              </span>
            </div>

            {/* AGE */}
            <div className="form-group">
              <label>Age</label>
              <input
                type="number"
                className={errors.age ? "error" : ""}
                {...register("age", {
                  required: "Please fill this field",
                  min: { value: 16, message: "Minimum age is 16" },
                  max: { value: 60, message: "Maximum age is 60" },
                })}
              />
              <span className="field-error">
  {errors.age?.message}
</span>
            </div>

            <button type="submit" className="enroll-btn">
              Confirm Enrollment →
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
    </div>
  );
}
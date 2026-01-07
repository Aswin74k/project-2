import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useLocation } from "react-router-dom";
import "./Enroll.css";

export default function Enroll() {
  const navigate = useNavigate();
  const location = useLocation();
  const course = location.state?.course;
  const [submitMsg, setSubmitMsg] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ mode: "onSubmit" });

  const onSubmit = (data) => {
    setSubmitMsg("Enrollment successful! Redirecting...");
    reset();

    setTimeout(() => {
      navigate("/payment", { state: { courseId: course?.id } });
    }, 1200);
  };

  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      setSubmitMsg("Please fix the highlighted fields");
    }
  }, [errors]);

  return (
    <div className="enroll-page">
      <div className="enroll-layout">

        {/* LEFT */}
        <div className="enroll-info">
          <h2>{course?.title || "AI & Machine Learning"}</h2>
          <p className="course-desc">
            Learn with hands-on projects, expert mentorship and job-ready skills.
          </p>

          <div className="duration-box">
            <span>⏱ Duration</span>
            <strong>{course?.duration || "5 Months"}</strong>
          </div>

          <p className="secure-note">
            🔒 Secure enrollment • Certificate included
          </p>
        </div>

        {/* RIGHT */}
        <div className="enroll-container">
          <h3>Enroll Now</h3>

          {/* STATUS MESSAGE (RESERVED SPACE) */}
          <div className="status-holder">
            {submitMsg && <p className="form-status">{submitMsg}</p>}
          </div>

          <form onSubmit={handleSubmit(onSubmit)} noValidate>

            {/* NAME */}
            <div className="form-group">
              <label>Name</label>
              <input
                className={errors.name ? "error" : ""}
                {...register("name", { required: "Name is required" })}
              />
              <span className="field-error">
                {errors.name?.message || ""}
              </span>
            </div>

            {/* EMAIL */}
            <div className="form-group">
              <label>Email</label>
              <input
                className={errors.email ? "error" : ""}
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Invalid email",
                  },
                })}
              />
              <span className="field-error">
                {errors.email?.message || ""}
              </span>
            </div>

            {/* PHONE */}
            <div className="form-group">
              <label>Phone</label>
              <input
                className={errors.phone ? "error" : ""}
                {...register("phone", {
                  required: "Phone is required",
                  pattern: {
                    value: /^[0-9]{10}$/,
                    message: "Must be 10 digits",
                  },
                })}
              />
              <span className="field-error">
                {errors.phone?.message || ""}
              </span>
            </div>

            {/* AGE */}
            <div className="form-group">
              <label>Age</label>
              <input
                type="number"
                className={errors.age ? "error" : ""}
                {...register("age", {
                  required: "Age is required",
                  min: { value: 16, message: "Min age 16" },
                  max: { value: 60, message: "Max age 60" },
                })}
              />
              <span className="field-error">
                {errors.age?.message || ""}
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
              ← Back to Course
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
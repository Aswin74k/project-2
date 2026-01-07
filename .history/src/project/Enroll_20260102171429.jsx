import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useLocation } from "react-router-dom";
import "./Enroll.css";

export default function Enroll() {
  const [submitMsg, setSubmitMsg] = useState("");
  const [msgType, setMsgType] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  // Course data from Course.jsx
  const course = location.state?.course;
  const courseId = location.state?.courseId || course?.title;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data) => {
    const enrollments =
      JSON.parse(localStorage.getItem("enrollments")) || [];

    enrollments.push({
      ...data,
      courseTitle: course?.title,
      duration: course?.duration,
      enrolledAt: new Date().toISOString(),
    });

    localStorage.setItem("enrollments", JSON.stringify(enrollments));

    setSubmitMsg("Enrollment successful! Redirecting to payment...");
    setMsgType("success");
    reset();

    setTimeout(() => {
      navigate("/payment", {
        state: {
          course: course,
        },
      });
    }, 1800);
  };

  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      setMsgType("error");
      setSubmitMsg("Please fix the highlighted fields");
      const timer = setTimeout(() => {
        setSubmitMsg("");
        setMsgType("");
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [errors]);

  return (
    <div className="enroll-page">
      <div className="enroll-layout">

        {/* LEFT – COURSE INFO */}
        <div className="enroll-info">
          <h2>{course?.title || "Course Enrollment"}</h2>

          <p className="course-desc">
            {course?.description ||
              "This course is designed to help you build real-world skills with expert mentorship and hands-on projects."}
          </p>

          <div className="duration-box">
            <span>⏱ Duration</span>
            <strong>{course?.duration || "3 Months"}</strong>
          </div>

          <p className="secure-note">
            🔒 Secure enrollment • Certificate included
          </p>
        </div>

        {/* RIGHT – FORM */}
        <div className="enroll-container">
          <h3>Enroll Now</h3>

          {submitMsg && (
            <div className={msgType === "success" ? "success-msg" : "error-msg"}>
              {submitMsg}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} noValidate>

            <div className="form-group">
              <label>Name</label>
              <input
                className={errors.name ? "error" : ""}
                {...register("name", {
                  required: "Name is required",
                  pattern: {
                    value: /^[A-Za-z ]+$/,
                    message: "Only letters allowed",
                  },
                })}
              />
              {errors.name && (
                <span className="field-error">{errors.name.message}</span>
              )}
            </div>

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
              {errors.email && (
                <span className="field-error">{errors.email.message}</span>
              )}
            </div>

            <div className="form-group">
              <label>Phone</label>
              <input
                className={errors.phone ? "error" : ""}
                {...register("phone", {
                  required: "Phone is required",
                  pattern: {
                    value: /^[0-9]{10}$/,
                    message: "Phone must be 10 digits",
                  },
                })}
              />
              {errors.phone && (
                <span className="field-error">{errors.phone.message}</span>
              )}
            </div>

            <div className="form-group">
              <label>Age</label>
              <input
                type="number"
                className={errors.age ? "error" : ""}
                {...register("age", {
                  required: "Age is required",
                  min: { value: 16, message: "Minimum age is 16" },
                  max: { value: 60, message: "Maximum age is 60" },
                })}
              />
              {errors.age && (
                <span className="field-error">{errors.age.message}</span>
              )}
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
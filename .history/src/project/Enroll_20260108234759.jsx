import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Enroll.css";

export default function Enroll() {
  const navigate = useNavigate();
  const location = useLocation();
  const course = location.state?.course;

  const { enrollCourse } = useAuth(); // ✅ FIX

  const [showTopError, setShowTopError] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ mode: "onSubmit" });

  // ✅ SINGLE onSubmit
  const onSubmit = (data) => {
  setShowTopError(false);

  if (course) {
    enrollCourse({
      ...course,          // course details
      studentName: data.name,
      email: data.email,
      phone: data.phone,
      age: data.age,
      enrolledAt: new Date().toISOString(),
    });
  }

  setShowPopup(true);
  reset();
};

  const onError = () => {
    setShowTopError(true);
  };

  useEffect(() => {
    if (showTopError) {
      const timer = setTimeout(() => setShowTopError(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [showTopError]);

  useEffect(() => {
    if (showPopup) {
      const timer = setTimeout(() => {
        navigate("/");
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [showPopup, navigate]);

  return (
    <>
      <div className="enroll-page">
        <div className="enroll-layout">

          {/* LEFT */}
          <div className="enroll-info">
            <h2>{course?.title || "Course Enrollment"}</h2>
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


            <form onSubmit={handleSubmit(onSubmit, onError)} noValidate>

              <div className="form-group">
                <label>Name</label>
                <input
                  className={errors.name ? "error" : ""}
                  {...register("name", { required: "Name is required" })}
                />
                <span className="field-error">{errors.name?.message}</span>
              </div>

              <div className="form-group">
                <label>Email</label>
                <input
                  className={errors.email ? "error" : ""}
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Invalid email address",
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
                    required: "Phone number is required",
                    pattern: {
                      value: /^[0-9]{10}$/,
                      message: "Must be 10 digits",
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
                    valueAsNumber: true,
                    required: "Age is required",
                    min: { value: 16, message: "Minimum age is 16" },
                    max: { value: 60, message: "Maximum age is 60" },
                  })}
                />
                <span className="field-error">{errors.age?.message}</span>
              </div>

              <button type="submit" className="enroll-btn">
                Confirm Enrollment
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

      {/* SUCCESS MODAL */}
      {showPopup && (
        <div className="modal-overlay">
          <div className="modal-box premium">
            <div className="modal-status">
              <span className="status-dot"></span>
              <span className="status-text">Enrollment Confirmed</span>
            </div>

            <h3>You're successfully enrolled</h3>
            <p className="modal-desc">
              Our team will reach out to you shortly with further details and next steps.
            </p>
          </div>
        </div>
      )}
    </>
  );
}
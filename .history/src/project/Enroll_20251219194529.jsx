import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useLocation } from "react-router-dom";
import "./Enroll.css";

export default function Enroll() {
  const [submitMsg, setSubmitMsg] = useState("");
  const [msgType, setMsgType] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  const courseId = location.state?.courseId;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data) => {
    setSubmitMsg(
      "Enrollment successful!  Our team will contact you shortly."
    );
    setMsgType("success");
    reset();

    setTimeout(() => {
      navigate("/");
    }, 4000);
  };

  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      setMsgType("error");
      setSubmitMsg("Please correct the highlighted fields!");
      const timer = setTimeout(() => {
        setSubmitMsg("");
        setMsgType("");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [errors]);

  return (
    <div className="enroll-page">
      <div className="enroll-container">
        <h2>Enroll Now</h2>

        {submitMsg && (
          <div className={msgType === "success" ? "success-msg" : "error-msg"}>
            {submitMsg}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              {...register("name", {
                required: "Name is required",
                pattern: {
                  value: /^[A-Za-z ]+$/,
                  message: "Name should contain only letters",
                },
              })}
            />
            {errors.name && (
              <p className="field-error">{errors.name.message}</p>
            )}
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Enter a valid email",
                },
              })}
            />
            {errors.email && (
              <p className="field-error">{errors.email.message}</p>
            )}
          </div>

          {/* PHONE */}
          <div className="form-group">
            <label>Phone</label>
            <input
              type="text"
              {...register("phone", {
                required: "Phone number is required",
                pattern: {
                  value: /^[0-9]{10}$/,
                  message: "Phone number must be 10 digits",
                },
              })}
            />
            {errors.phone && (
              <p className="field-error">{errors.phone.message}</p>
            )}
          </div>

          {/* AGE */}
          <div className="form-group">
            <label>Age</label>
            <input
              type="number"
              {...register("age", {
                required: "Age is required",
                min: { value: 16, message: "Minimum age is 16" },
                max: { value: 60, message: "Maximum age is 60" },
              })}
            />
            {errors.age && (
              <p className="field-error">{errors.age.message}</p>
            )}
          </div>

          {/* BUTTONS */}
          <div className="enroll-actions">
            <button
              type="button"
              className="back-btn"
              onClick={() =>
                courseId
                  ? navigate(`/courses/${courseId}`)
                  : navigate(-1)
              }
            >
              ← Back to Course
            </button>

            <button type="submit" className="enroll-btn">
              Enroll Now
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}


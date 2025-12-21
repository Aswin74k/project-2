import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import "./Enroll.css";

export default function Enroll() {
  const [submitMsg, setSubmitMsg] = useState("");
  const [msgType, setMsgType] = useState(""); // success | error

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data) => {
    setSubmitMsg(
      "Enrollment successful! 🎉 Our team will contact you shortly with further details."
    );
    setMsgType("success");
    reset();

    setTimeout(() => {
      setSubmitMsg("");
      setMsgType("");
    }, 4000);
  };

  /* Auto-hide error message */
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
          {/* NAME */}
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
            {errors.name && <p className="field-error">{errors.name.message}</p>}
          </div>

          {/* EMAIL */}
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Enter a valid email address",
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
                min: {
                  value: 16,
                  message: "Age must be at least 16",
                },
                max: {
                  value: 60,
                  message: "Age must be below 60",
                },
              })}
            />
            {errors.age && <p className="field-error">{errors.age.message}</p>}
          </div>

          <button type="submit" className="enroll-btn">
            Enroll Now
          </button>
        </form>
      </div>
    </div>
  );
}

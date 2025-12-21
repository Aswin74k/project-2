import React, { useState } from "react";
import { useForm } from "react-hook-form";
import "./Enroll.css";

export default function Enroll() {
  const [submitMsg, setSubmitMsg] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data) => {
    setSubmitMsg(`Thank you ${data.name}! You have successfully enrolled.`);
    reset(); // Clear form after success
  };

  return (
    <div className="enroll-page">
      <div className="enroll-container">
        <h2>Enroll Now</h2>

        {submitMsg && <div className="success-msg">{submitMsg}</div>}

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              {...register("name", { required: "Please enter your name" })}
            />
            {errors.name && <p className="error-msg">{errors.name.message}</p>}
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              {...register("email", {
                required: "Please enter your email",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Enter a valid email",
                },
              })}
            />
            {errors.email && <p className="error-msg">{errors.email.message}</p>}
          </div>

          <div className="form-group">
            <label>Phone</label>
            <input
              type="text"
              {...register("phone", {
                required: "Please enter your phone number",
                pattern: {
                  value: /^[0-9]{10}$/,
                  message: "Enter a valid 10-digit phone number",
                },
              })}
            />
            {errors.phone && <p className="error-msg">{errors.phone.message}</p>}
          </div>

          <div className="form-group">
            <label>Age</label>
            <input
              type="number"
              {...register("age", {
                required: "Please enter your age",
                min: { value: 10, message: "Age must be at least 10" },
                max: { value: 100, message: "Age must be less than 100" },
              })}
            />
            {errors.age && <p className="error-msg">{errors.age.message}</p>}
          </div>

          <button type="submit" className="enroll-btn">
            Enroll Now
          </button>
        </form>
      </div>
    </div>
  );
}

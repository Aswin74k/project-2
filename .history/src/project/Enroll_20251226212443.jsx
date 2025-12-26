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
    const enrollments =
      JSON.parse(localStorage.getItem("enrollments")) || [];

    enrollments.push({
      ...data,
      courseId,
      enrolledAt: new Date().toISOString(),
    });

    localStorage.setItem("enrollments", JSON.stringify(enrollments));

    setSubmitMsg("Enrollment successful! Proceeding to payment...");
    setMsgType("success");
    reset();

    setTimeout(() => {
      navigate("/payment", { state: { courseId } });
    }, 2000);
  };

  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      setMsgType("error");
      setSubmitMsg("Please correct the highlighted fields!");
      const timer = setTimeout(() => {
        setSubmitMsg("");
        setMsgType("");
      }, 2000);
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
              className={errors.name ? "error" : ""}
              {...register("name", {
                validate: (value) => {
                  if (!value) return "Name is required";
                  if (!/^[A-Za-z ]+$/.test(value))
                    return "Only letters allowed";
                  return true;
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
              type="email"
              className={errors.email ? "error" : ""}
              {...register("email", {
                validate: (value) => {
                  if (!value) return "Email is required";
                  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
                    return "Invalid email format";
                  return true;
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
              type="text"
              className={errors.phone ? "error" : ""}
              {...register("phone", {
                validate: (value) => {
                  if (!value) return "Phone number is required";
                  if (!/^[0-9]{10}$/.test(value))
                    return "Phone must be 10 digits";
                  return true;
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
                validate: (value) => {
                  if (!value) return "Age is required";
                  if (value < 16) return "Minimum age is 16";
                  if (value > 60) return "Maximum age is 60";
                  return true;
                },
              })}
            />
            {errors.age && (
              <span className="field-error">{errors.age.message}</span>
            )}
          </div>

          <div className="enroll-actions">
            <button type="submit" className="enroll-btn">
              Enroll Now
            </button>

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
          </div>
        </form>
      </div>
    </div>
  );
}
import React, { useEffect, useState } from "react";
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

    setSubmitMsg("Enrollment successful! Redirecting to payment...");
    setMsgType("success");
    reset();

    setTimeout(() => {
      navigate("/payment", { state: { courseId } });
    }, 2000);
  };

  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      setSubmitMsg("Please correct the highlighted fields");
      setMsgType("error");
      setTimeout(() => setSubmitMsg(""), 2000);
    }
  }, [errors]);

  return (
    <div className="enroll-page">
      <div className="enroll-wrapper">

        {/* LEFT INFO PANEL */}
        <div className="enroll-info">
          <h2>Course Enrollment</h2>
          <p className="subtitle">
            Secure your seat and start learning today 🚀
          </p>

          <ul className="benefits">
            <li>✔ Lifetime access</li>
            <li>✔ Industry-ready curriculum</li>
            <li>✔ Certificate included</li>
            <li>✔ Mentor support</li>
          </ul>

          <div className="steps">
            <span className="active">Details</span>
            <span>Payment</span>
            <span>Confirmation</span>
          </div>
        </div>

        {/* RIGHT FORM PANEL */}
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
              {errors.name && <p className="field-error">{errors.name.message}</p>}
            </div>

            <div className="form-group">
              <label>Email</label>
              <input
                className={errors.email ? "error" : ""}
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Invalid email format",
                  },
                })}
              />
              {errors.email && <p className="field-error">{errors.email.message}</p>}
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
              {errors.phone && <p className="field-error">{errors.phone.message}</p>}
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
              {errors.age && <p className="field-error">{errors.age.message}</p>}
            </div>

            <button className="enroll-btn" type="submit">
              Proceed to Payment →
            </button>

            <button
              type="button"
              className="back-btn"
              onClick={() =>
                courseId ? navigate(`/courses/${courseId}`) : navigate(-1)
              }
            >
              ← Back to Course
            </button>

            <p className="secure-text">
              🔒 Your information is secure and encrypted
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
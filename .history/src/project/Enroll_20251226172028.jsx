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

  setSubmitMsg("Enrollment successful! Proceed to payment.");
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
          <div
            className={msgType === "success" ? "success-msg" : "error-msg"}
          >
            {submitMsg}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} noValidate>

          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              {...register("name", {
                validate: (value) => {
                  if (!value) return "Name is required";
                  if (!/^[A-Za-z ]+$/.test(value))
                    return "Name should contain only letters";
                  return true;
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
                validate: (value) => {
                  if (!value) return "Email is required";
                  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
                    return "Enter a valid email";
                  return true;
                },
              })}
            />
            {errors.email && (
              <p className="field-error">{errors.email.message}</p>
            )}
          </div>

          <div className="form-group">
            <label>Phone</label>
            <input
              type="text"
              {...register("phone", {
                validate: (value) => {
                  if (!value) return "Phone number is required";
                  if (!/^[0-9]{10}$/.test(value))
                    return "Phone number must be 10 digits";
                  return true;
                },
              })}
            />
            {errors.phone && (
              <p className="field-error">{errors.phone.message}</p>
            )}
          </div>

          <div className="form-group">
            <label>Age</label>
            <input
              type="number"
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
              <p className="field-error">{errors.age.message}</p>
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
      courseId ? navigate(`/courses/${courseId}#syllabus`) : navigate(-1)
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

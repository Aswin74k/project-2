import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import "./Enroll.css";

export default function Enroll() {
  const [submitMsg, setSubmitMsg] = useState("");
  const [msgType, setMsgType] = useState(""); // "success" or "error"

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data) => {
    setSubmitMsg("Thank you! We have received your enrollment. Our team will contact you shortly.");
    setMsgType("success");
    reset();

    // Close message after 4 seconds
    setTimeout(() => {
      setSubmitMsg("");
      setMsgType("");
    }, 4000);
  };

  // Show error messages automatically hide after 3s
  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      setMsgType("error");
      setSubmitMsg("Please fill all the fields correctly!");
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

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              {...register("name", { required: true })}
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              {...register("email", { required: true })}
            />
          </div>

          <div className="form-group">
            <label>Phone</label>
            <input
              type="text"
              {...register("phone", { required: true })}
            />
          </div>

          <div className="form-group">
            <label>Age</label>
            <input
              type="number"
              {...register("age", { required: true })}
            />
          </div>

          <button type="submit" className="enroll-btn">
            Enroll Now
          </button>
        </form>
      </div>
    </div>
  );
}

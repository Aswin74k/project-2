import React, { useState } from "react";
import { useForm } from "react-hook-form";
import "./Enroll.css";

export default function Enroll() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [showPopup, setShowPopup] = useState(false);

  const onSubmit = (data) => {
    console.log(data);
    setShowPopup(true);
    reset();
  };

  return (
    <>
      <div className="enroll-container">
        <div className="enroll-form">
          <h2>Enroll Now</h2>

          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            {/* Name */}
            <div className="field">
              <input
                type="text"
                placeholder="Name"
                {...register("name", {
                  required: "Please fill this field",
                })}
              />
              <p className="error">{errors.name?.message}</p>
            </div>

            {/* Email */}
            <div className="field">
              <input
                type="email"
                placeholder="Email"
                {...register("email", {
                  required: "Please fill this field",
                })}
              />
              <p className="error">{errors.email?.message}</p>
            </div>

            {/* Phone */}
            <div className="field">
              <input
                type="tel"
                placeholder="Phone"
                {...register("phone", {
                  required: "Please fill this field",
                })}
              />
              <p className="error">{errors.phone?.message}</p>
            </div>

            {/* Age */}
            <div className="field">
              <input
                type="number"
                placeholder="Age"
                {...register("age", {
                  required: "Please fill this field",
                })}
              />
              <p className="error">{errors.age?.message}</p>
            </div>

            <button type="submit" className="submit-btn">
              Confirm Enrollment
            </button>
          </form>
        </div>
      </div>

      {/* SUCCESS POPUP */}
      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-box">
            <h3>Enrollment Successful 🎉</h3>
            <p>We will contact you shortly.</p>
            <button onClick={() => setShowPopup(false)}>OK</button>
          </div>
        </div>
      )}
    </>
  );
}
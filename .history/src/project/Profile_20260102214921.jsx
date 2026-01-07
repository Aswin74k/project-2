import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import "./Profile.css";

export default function Profile() {
  const [successMsg, setSuccessMsg] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      bio: "",
    },
  });

  // Load user data from localStorage
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (storedUser) {
      reset({
        name: storedUser.name || "",
        email: storedUser.email || "",
        phone: storedUser.phone || "",
        bio: storedUser.bio || "",
      });
    }
  }, [reset]);

  // Save profile
  const onSubmit = (data) => {
    localStorage.setItem("user", JSON.stringify(data));
    setSuccessMsg("Profile updated successfully ✅");

    setTimeout(() => setSuccessMsg(""), 2000);
  };

  return (
    <div className="profile-page">
      <div className="profile-card">
        <h2>My Profile</h2>

        {/* SUCCESS MESSAGE (NO JUMP) */}
        <div className="status-holder">
          {successMsg && <p className="success-msg">{successMsg}</p>}
        </div>

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          {/* NAME */}
          <div className="form-group">
            <label>Name</label>
            <input
              disabled
              {...register("name")}
            />
          </div>

          {/* EMAIL */}
          <div className="form-group">
            <label>Email</label>
            <input
              disabled
              {...register("email")}
            />
          </div>

          {/* PHONE */}
          <div className="form-group">
            <label>Phone</label>
            <input
              {...register("phone", {
                pattern: {
                  value: /^[0-9]{10}$/,
                  message: "Phone must be 10 digits",
                },
              })}
              placeholder="Enter phone number"
              className={errors.phone ? "error" : ""}
            />
            <span className="field-error">
              {errors.phone?.message || ""}
            </span>
          </div>

          {/* BIO */}
          <div className="form-group">
            <label>Bio</label>
            <textarea
              {...register("bio", {
                maxLength: {
                  value: 120,
                  message: "Bio max 120 characters",
                },
              })}
              placeholder="Tell something about you"
              className={errors.bio ? "error" : ""}
            />
            <span className="field-error">
              {errors.bio?.message || ""}
            </span>
          </div>

          <button type="submit">Save Changes</button>
        </form>
      </div>
    </div>
  );
}
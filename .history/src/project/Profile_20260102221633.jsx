import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import "./Profile.css";

const STORAGE_KEY = "loggedInUser";
const { user, updateUser } = useAuth();
export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
  });

  // LOAD USER FROM LOCAL STORAGE
  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (savedUser) {
      reset({
        firstName: savedUser.firstName || "",
        lastName: savedUser.lastName || "",
        email: savedUser.email || "",
        phone: savedUser.phone || "",
        bio: savedUser.bio || "",
      });
    }
  }, [reset]);

  // SAVE PROFILE
  const onSubmit = (data) => {
    const existingUser = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};

    const updatedUser = {
      ...existingUser,
      ...data,
    };

    // update localStorage
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedUser));

    setIsEditing(false);

    // force navbar re-render
    window.dispatchEvent(new Event("storage"));
  };

  return (
    <div className="profile-page">
      <div className="profile-card">

        {/* HEADER */}
        <div className="profile-header">
          <div className="avatar">
            {(
              JSON.parse(localStorage.getItem(STORAGE_KEY))?.firstName || "U"
            )
              .charAt(0)
              .toUpperCase()}
          </div>
          <div>
            <h2>
              {JSON.parse(localStorage.getItem(STORAGE_KEY))?.firstName || "Your"}{" "}
              {JSON.parse(localStorage.getItem(STORAGE_KEY))?.lastName || "Name"}
            </h2>
            <p>
              {JSON.parse(localStorage.getItem(STORAGE_KEY))?.email ||
                "your@email.com"}
            </p>
          </div>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit(onSubmit)} className="profile-form" noValidate>

          {/* NAME GRID */}
          <div className="name-grid">
            <div className="form-group">
              <label>First Name</label>
              <input
                disabled={!isEditing}
                {...register("firstName", {
                  required: "First name required",
                  minLength: {
                    value: 2,
                    message: "Min 2 characters",
                  },
                })}
              />
              <span className="field-error">
                {errors.firstName?.message || ""}
              </span>
            </div>

            <div className="form-group">
              <label>Last Name</label>
              <input
                disabled={!isEditing}
                {...register("lastName")}
              />
              <span className="field-error"></span>
            </div>
          </div>

          <div className="form-group">
            <label>Email</label>
            <input disabled {...register("email")} />
            <span className="field-error"></span>
          </div>

          <div className="form-group">
            <label>Phone</label>
            <input
              disabled={!isEditing}
              {...register("phone", {
                pattern: {
                  value: /^[0-9]{10}$/,
                  message: "Must be 10 digits",
                },
              })}
            />
            <span className="field-error">
              {errors.phone?.message || ""}
            </span>
          </div>

          <div className="form-group">
            <label>Bio</label>
            <textarea
              rows="3"
              disabled={!isEditing}
              {...register("bio")}
            />
            <span className="field-error"></span>
          </div>

          {/* ACTIONS */}
          <div className="profile-actions">
            {!isEditing ? (
              <button
                type="button"
                className="edit-btn"
                onClick={() => setIsEditing(true)}
              >
                Edit Profile
              </button>
            ) : (
              <>
                <button type="submit" className="save-btn">
                  Save Changes
                </button>
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={() => {
                    setIsEditing(false);
                    const savedUser = JSON.parse(
                      localStorage.getItem(STORAGE_KEY)
                    );
                    reset(savedUser);
                  }}
                >
                  Cancel
                </button>
              </>
            )}
          </div>

        </form>
      </div>
    </div>
  );
}
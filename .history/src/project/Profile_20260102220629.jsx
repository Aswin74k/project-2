import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import "./Profile.css";

export default function Profile() {
  const { user, updateUserFirstName } = useAuth();
  const [editMode, setEditMode] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
  });

  // Load profile
  useEffect(() => {
    if (user) {
      reset({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email || "",
        phone: user.phone || "",
        bio: user.bio || "",
      });
    }
  }, [user, reset]);

  const onSubmit = (data) => {
    // update navbar name
    updateUserFirstName(data.firstName);

    // save extra profile info
    const updatedProfile = {
      ...user,
      ...data,
    };

    localStorage.setItem(
      "loggedInUser",
      JSON.stringify(updatedProfile)
    );

    setSuccessMsg("Profile updated successfully");
    setEditMode(false);

    setTimeout(() => setSuccessMsg(""), 2000);
  };

  return (
    <div className="profile-page">
      <div className="profile-card">

        {/* HEADER */}
        <div className="profile-header">
          <div className="avatar">
            {user?.firstName?.charAt(0).toUpperCase() || "U"}
          </div>
          <div>
            <h2>{user?.firstName} {user?.lastName}</h2>
            <p>{user?.email}</p>
          </div>
        </div>

        {/* SUCCESS MESSAGE */}
        <div className="status-holder">
          {successMsg && <p className="success-msg">{successMsg}</p>}
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit(onSubmit)} noValidate>

          <div className="form-row">
            <div className="form-group">
              <label>First Name</label>
              <input
                disabled={!editMode}
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
                disabled={!editMode}
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
              disabled={!editMode}
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
              disabled={!editMode}
              {...register("bio")}
            />
            <span className="field-error"></span>
          </div>

          {/* ACTIONS */}
          <div className="profile-actions">
            {!editMode ? (
              <button
                type="button"
                className="edit-btn"
                onClick={() => setEditMode(true)}
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
                    reset();
                    setEditMode(false);
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
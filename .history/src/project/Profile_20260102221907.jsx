import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import "./Profile.css";

export default function Profile() {
  const { user, updateUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // LOAD USER DATA INTO FORM
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

  // SAVE PROFILE
  const onSubmit = (data) => {
    updateUser({
      firstName: data.firstName,
      lastName: data.lastName,
      phone: data.phone,
      bio: data.bio,
    });

    setIsEditing(false);
  };

  return (
    <div className="profile-page">
      <div className="profile-card">

        {/* HEADER */}
        <div className="profile-header">
          <div className="avatar">
            {user?.firstName
              ? user.firstName.charAt(0).toUpperCase()
              : "U"}
          </div>
          <div>
            <h2>
              {user?.firstName || "Your"} {user?.lastName || "Name"}
            </h2>
            <p>{user?.email || "your@email.com"}</p>
          </div>
        </div>

        {/* FORM */}
        <form className="profile-form" onSubmit={handleSubmit(onSubmit)}>

          {/* FIRST + LAST NAME GRID */}
          <div className="name-grid">
            <div className="form-group">
              <label>First Name</label>
              <input
                disabled={!isEditing}
                {...register("firstName", {
                  required: "First name required",
                })}
                placeholder="First name"
              />
              {errors.firstName && (
                <span className="error">{errors.firstName.message}</span>
              )}
            </div>

            <div className="form-group">
              <label>Last Name</label>
              <input
                disabled={!isEditing}
                {...register("lastName")}
                placeholder="Last name"
              />
            </div>
          </div>

          {/* EMAIL */}
          <div className="form-group">
            <label>Email</label>
            <input disabled {...register("email")} />
          </div>

          {/* PHONE */}
          <div className="form-group">
            <label>Phone</label>
            <input
              disabled={!isEditing}
              {...register("phone")}
              placeholder="Phone number"
            />
          </div>

          {/* BIO */}
          <div className="form-group">
            <label>Bio</label>
            <textarea
              rows="3"
              disabled={!isEditing}
              {...register("bio")}
              placeholder="Tell something about yourself"
            />
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
                  onClick={() => setIsEditing(false)}
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
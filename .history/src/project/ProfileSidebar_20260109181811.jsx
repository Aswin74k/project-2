  import React, { useEffect, useState } from "react";
  import { FaTimes, FaUserEdit } from "react-icons/fa";
  import { useAuth } from "../context/AuthContext";
  import { useForm } from "react-hook-form";
  import "./ProfileSidebar.css";

  export default function ProfileSidebar({ open, onClose }) {
    const { user, updateProfile } = useAuth();
    const [editMode, setEditMode] = useState(false);

    const {
      register,
      handleSubmit,
      reset,
      formState: { errors }
    } = useForm();

    useEffect(() => {
      if (user) {
        reset({
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email
        });
      }
    }, [user, reset]);

    const handleClose = () => {
      setEditMode(false);
      onClose();
    };

    useEffect(() => {
      const esc = (e) => e.key === "Escape" && handleClose();
      window.addEventListener("keydown", esc);
      return () => window.removeEventListener("keydown", esc);
    }, []);

    const onSubmit = (data) => {
      updateProfile(data);
      setEditMode(false);
    };

    if (!open) return null;

    return (
      <>
        <div className="profile-overlay" onClick={handleClose}></div>

        <div className="profile-sidebar">
          <div className="profile-header">
            <h3>Profile</h3>
            <FaTimes className="close-icon" onClick={handleClose} />
          </div>

          <div className="profile-card">
            <div className="avatar">
              {user?.firstName?.charAt(0)}
            </div>

            <h4>{user?.firstName} {user?.lastName}</h4>
            <p>{user?.email}</p>

            {!editMode && (
              <button
                className="edit-btn"
                onClick={() => setEditMode(true)}
              >
                <FaUserEdit /> Edit Profile
              </button>
            )}
          </div>

          {!editMode && (
            <div className="profile-body">
              <p><strong>Account Verification:</strong> Completed ✅</p>

              <p>
                <strong>Joined Date:</strong>{" "}
                {user?.joinedDate
                  ? new Date(user.joinedDate).toLocaleDateString("en-IN", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })
                  : "—"}
              </p>

              <div className="enrolled-section">
                <strong>Enrolled Courses:</strong>

                {Array.isArray(user?.enrolledCourses) &&
                  user.enrolledCourses.length > 0 ? (
                  <ul className="enrolled-list">
                    {user.enrolledCourses.map((course, index) => (
                      <li key={index}>{course.title}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="no-course">No courses enrolled</p>
                )}
              </div>
            </div>
          )}

          {editMode && (
            <form className="profile-body" onSubmit={handleSubmit(onSubmit)}>
              <label>First Name</label>
              <input
                {...register("firstName", {
                  required: "First name required",
                  minLength: { value: 2, message: "Min 2 letters" }
                })}
              />
              {errors.firstName && (
                <small className="text-danger">
                  {errors.firstName.message}
                </small>
              )}

              <label>Last Name</label>
              <input
                {...register("lastName", {
                  required: "Last name required"
                })}
              />
              {errors.lastName && (
                <small className="text-danger">
                  {errors.lastName.message}
                </small>
              )}

              <label>Email</label>
              <input {...register("email")} disabled />

              <button className="save-btn" type="submit">
                Save Changes
              </button>
            </form>
          )}
        </div>
      </>
    );
  }
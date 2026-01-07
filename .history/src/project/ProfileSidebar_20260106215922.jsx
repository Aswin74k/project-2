import React, { useEffect, useState } from "react";
import { FaTimes, FaUserEdit } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
import "./ProfileSidebar.css";

export default function ProfileSidebar({ open, onClose }) {
  const { user, updateProfile } = useAuth();

  const [editMode, setEditMode] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: ""
  });

  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email || ""
      });
    }
  }, [user]);

  // ESC close
  useEffect(() => {
    const esc = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", esc);
    return () => window.removeEventListener("keydown", esc);
  }, [onClose]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    updateProfile(formData); // 🔥 context + localStorage
    setEditMode(false);
    onClose();
  };

  if (!open) return null;

  return (
    <>
      <div className="profile-overlay" onClick={onClose}></div>

      <div className={`profile-sidebar open`}>
        {/* HEADER */}
        <div className="profile-header">
          <h3>Profile</h3>
          <FaTimes className="close-icon" onClick={onClose} />
        </div>

        {/* USER CARD */}
        <div className="profile-card">
          <div className="avatar">
            {formData.firstName?.charAt(0)}
          </div>
          <h4>
            {formData.firstName} {formData.lastName}
          </h4>
          <p>{formData.email}</p>

          <button
            className="edit-btn"
            onClick={() => setEditMode(true)}
          >
            <FaUserEdit /> Edit Profile
          </button>
        </div>

        {/* FORM */}
        {editMode && (
          <div className="profile-body">
            <label>First Name</label>
            <input
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
            />

            <label>Last Name</label>
            <input
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
            />

            <label>Email</label>
            <input value={formData.email} disabled />

            <button className="save-btn" onClick={handleSave}>
              Save Changes
            </button>
          </div>
        )}
      </div>
    </>
  );
}
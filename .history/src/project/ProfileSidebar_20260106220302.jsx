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

  const handleClose = () => {
    setEditMode(false);
    onClose();
  };

  useEffect(() => {
    const esc = (e) => e.key === "Escape" && handleClose();
    window.addEventListener("keydown", esc);
    return () => window.removeEventListener("keydown", esc);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    updateProfile(formData); // 🔥 navbar auto update
    handleClose();
  };

  if (!open) return null;

  return (
    <>
      <div className="profile-overlay" onClick={handleClose}></div>

      <div className="profile-sidebar open">
        <div className="profile-header">
          <h3>Profile</h3>
          <FaTimes className="close-icon" onClick={handleClose} />
        </div>

        <div className="profile-card">
          <div className="avatar">
            {formData.firstName?.charAt(0)}
          </div>
          <h4>{formData.firstName} {formData.lastName}</h4>
          <p>{formData.email}</p>

          <button
            className="edit-btn"
            onClick={() => setEditMode(true)}
          >
            <FaUserEdit /> Edit Profile
          </button>
        </div>

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
import React, { useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
import "./ProfileSidebar.css";

export default function ProfileSidebar({ open, onClose }) {
  const { user, updateProfile } = useAuth();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: ""
  });

  // Load user from localStorage
  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email || ""
      });
    }
  }, [user]);

  // ESC key close
  useEffect(() => {
    const escClose = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", escClose);
    return () => window.removeEventListener("keydown", escClose);
  }, [onClose]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSave = () => {
    updateProfile(formData); // 🔥 localStorage update
    onClose();
  };

  if (!open) return null;

  return (
    <>
      {/* Overlay */}
      <div className="profile-overlay" onClick={onClose}></div>

      {/* Sidebar */}
      <div className={`profile-sidebar ${open ? "open" : ""}`}>
        <div className="profile-header">
          <h3>My Profile</h3>
          <FaTimes className="close-icon" onClick={onClose} />
        </div>

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
          <input
            name="email"
            value={formData.email}
            disabled
          />

          <button className="save-btn" onClick={handleSave}>
            Save Changes
          </button>
        </div>
      </div>
    </>
  );
}
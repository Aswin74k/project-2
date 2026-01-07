import React, { useState } from "react";
import { CiUser } from "react-icons/ci";
import { useAuth } from "../context/AuthContext";
import "./Profile.css";

export default function Profile() {
  const { user } = useAuth();

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: user?.firstName || "Aswin",
    lastName: user?.lastName || "K",
    email: user?.email || "aswink001@gmail.com",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    console.log("Updated Profile:", formData);
    setIsEditing(false);
  };

  return (
    <div className="profile-page">
      <div className="profile-card">
        {/* Header */}
        <div className="profile-header">
          <div className="avatar">
            <CiUser size={42} />
          </div>
          <h2>My Profile</h2>
          <p>Manage your personal information</p>
        </div>

        {/* Body */}
        <div className="profile-body">
          <div className="profile-field">
            <label>First Name</label>
            <input
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </div>

          <div className="profile-field">
            <label>Last Name</label>
            <input
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </div>

          <div className="profile-field">
            <label>Email</label>
            <input value={formData.email} disabled />
          </div>
        </div>

        {/* Footer */}
        <div className="profile-actions">
          {!isEditing ? (
            <button className="edit-btn" onClick={() => setIsEditing(true)}>
              Edit Profile
            </button>
          ) : (
            <button className="save-btn" onClick={handleSave}>
              Save Changes
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
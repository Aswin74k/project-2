import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import "./Profile.css";

export default function Profile() {
  const { user } = useAuth();

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    email: user?.email || "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    // Later backend / context update cheyyam
    console.log("Saved data:", formData);
    setIsEditing(false);
  };

  return (
    <div className="profile-container">
      <div className="profile-card">
        <h2>My Profile</h2>

        <div className="profile-field">
          <label>First Name</label>
          <input
            name="firstName"
            value={formData.firstName}
            disabled={!isEditing}
            onChange={handleChange}
          />
        </div>

        <div className="profile-field">
          <label>Last Name</label>
          <input
            name="lastName"
            value={formData.lastName}
            disabled={!isEditing}
            onChange={handleChange}
          />
        </div>

        <div className="profile-field">
          <label>Email</label>
          <input value={formData.email} disabled />
        </div>

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
  );
}
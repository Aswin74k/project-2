import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import "./ProfileSidebar.css";

export default function ProfileSidebar() {
  const { user, updateProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    updateProfile(formData);
    setIsEditing(false);
  };

  return (
    <div className="profile-sidebar">
      {/* 🔝 PROFILE HEADER */}
      <div className="profile-header">
        <div className="avatar">
          {user.firstName.charAt(0)}
        </div>

        <h3>{user.firstName} {user.lastName}</h3>
        <p>{user.email}</p>

        {!isEditing && (
          <button className="edit-btn" onClick={() => setIsEditing(true)}>
            ✏️ Edit Profile
          </button>
        )}
      </div>

      {/* ✏️ EDIT SECTION */}
      {isEditing && (
        <div className="edit-section">
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

      {/* 👇 PROFILE INFO (ALWAYS VISIBLE) */}
      <div className="profile-info">
        <div className="info-card">
          <span>🎓 Enrolled Courses</span>
          <strong>{user.enrolledCourses.length}</strong>
        </div>

        <ul className="course-list">
          {user.enrolledCourses.map((c) => (
            <li key={c.id}>{c.title}</li>
          ))}
        </ul>

        <div className="info-card">
          <span>📅 Joined Date</span>
          <strong>
            {new Date(user.joinedDate).toLocaleDateString()}
          </strong>
        </div>

        <div className="info-card premium">
          <span>👤 Account Type</span>
          <strong>{user.accountType || "Free"}</strong>
        </div>
      </div>
    </div>
  );
}
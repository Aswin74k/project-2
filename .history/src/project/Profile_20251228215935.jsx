import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import "./Profile.css";

export default function Profile() {
  const { user, setUser } = useContext(AuthContext);

  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  // Load user data when page loads
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
      });
    }
  }, [user]);

  // Input change handler
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Save profile (UPDATE)
  const handleSave = () => {
    const updatedUser = {
      ...user,
      ...formData,
    };

    // Update Context
    setUser(updatedUser);

    // Update localStorage
    localStorage.setItem("user", JSON.stringify(updatedUser));

    setIsEditing(false);
    alert("Profile updated successfully ✅");
  };

  if (!user) {
    return <p className="profile-error">No user data found</p>;
  }

  return (
    <div className="profile-container">
      <h2>My Profile</h2>

      <div className="profile-card">
        {/* Name */}
        <div className="profile-field">
          <label>Name</label>
          {isEditing ? (
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          ) : (
            <p>{user.name}</p>
          )}
        </div>

        {/* Email */}
        <div className="profile-field">
          <label>Email</label>
          {isEditing ? (
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          ) : (
            <p>{user.email}</p>
          )}
        </div>

        {/* Phone */}
        <div className="profile-field">
          <label>Phone</label>
          {isEditing ? (
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />
          ) : (
            <p>{user.phone || "Not added"}</p>
          )}
        </div>

        {/* Buttons */}
        <div className="profile-actions">
          {isEditing ? (
            <>
              <button className="save-btn" onClick={handleSave}>
                Save
              </button>
              <button
                className="cancel-btn"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              className="edit-btn"
              onClick={() => setIsEditing(true)}
            >
              Edit Profile
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
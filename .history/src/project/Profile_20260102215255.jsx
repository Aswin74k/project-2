import React, { useEffect, useState } from "react";
import "./Profile.css";

const STORAGE_KEY = "edu_user_profile";

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    bio: "",
  });

  // LOAD FROM LOCAL STORAGE
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      setProfile(JSON.parse(saved));
    }
  }, []);

  // HANDLE INPUT CHANGE
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  // SAVE
  const handleSave = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
    setIsEditing(false);
  };

  // RESET
  const handleReset = () => {
    localStorage.removeItem(STORAGE_KEY);
    setProfile({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      bio: "",
    });
    setIsEditing(false);
  };

  return (
    <div className="profile-page">
      <div className="profile-card">

        {/* HEADER */}
        <div className="profile-header">
          <div className="avatar">
            {profile.firstName
              ? profile.firstName.charAt(0).toUpperCase()
              : "U"}
          </div>

          <div>
            <h2>
              Hi, {profile.firstName || "User"}
            </h2>
            <p>{profile.email || "your@email.com"}</p>
          </div>
        </div>

        {/* FORM */}
        <div className="profile-form">

          {/* FIRST NAME */}
          <div className="form-group">
            <label>First Name</label>
            <input
              name="firstName"
              value={profile.firstName}
              onChange={handleChange}
              disabled={!isEditing}
              placeholder="Enter first name"
            />
          </div>

          {/* LAST NAME */}
          <div className="form-group">
            <label>Last Name</label>
            <input
              name="lastName"
              value={profile.lastName}
              onChange={handleChange}
              disabled={!isEditing}
              placeholder="Enter last name"
            />
          </div>

          {/* EMAIL */}
          <div className="form-group">
            <label>Email</label>
            <input
              name="email"
              value={profile.email}
              onChange={handleChange}
              disabled={!isEditing}
              placeholder="Enter email"
            />
          </div>

          {/* PHONE */}
          <div className="form-group">
            <label>Phone</label>
            <input
              name="phone"
              value={profile.phone}
              onChange={handleChange}
              disabled={!isEditing}
              placeholder="Enter phone number"
            />
          </div>

          {/* BIO */}
          <div className="form-group">
            <label>Bio</label>
            <textarea
              rows="3"
              name="bio"
              value={profile.bio}
              onChange={handleChange}
              disabled={!isEditing}
              placeholder="Tell something about yourself"
            />
          </div>

          {/* ACTIONS */}
          <div className="profile-actions">
            {!isEditing ? (
              <button className="edit-btn" onClick={() => setIsEditing(true)}>
                Edit Profile
              </button>
            ) : (
              <>
                <button className="save-btn" onClick={handleSave}>
                  Save Changes
                </button>
                <button
                  className="cancel-btn"
                  onClick={() => setIsEditing(false)}
                >
                  Cancel
                </button>
              </>
            )}

            <button className="reset-btn" onClick={handleReset}>
              Clear Data
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
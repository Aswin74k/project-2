import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import "./Profile.css";

export default function Profile() {
  const { user, updateUser } = useAuth();

  const [edit, setEdit] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email || "",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    updateUser(formData); // localStorage update
    setEdit(false);
  };

  return (
    <div className="profile-container">
      <h2>My Profile</h2>

      <div className="profile-card">
        <div className="profile-pic">
          <img src="https://i.pravatar.cc/120" alt="profile" />
        </div>

        <div className="profile-info">
          <label>First Name</label>
          <input
            name="firstName"
            value={formData.firstName}
            disabled={!edit}
            onChange={handleChange}
          />

          <label>Last Name</label>
          <input
            name="lastName"
            value={formData.lastName}
            disabled={!edit}
            onChange={handleChange}
          />

          <label>Email</label>
          <input value={formData.email} disabled />
        </div>

        {!edit ? (
          <button className="edit-btn" onClick={() => setEdit(true)}>
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
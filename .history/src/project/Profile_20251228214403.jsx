import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import "./Profile.css";

export default function Profile() {
  const { user, updateUser } = useAuth();
  const [edit, setEdit] = useState(false);

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    location: "",
    bio: ""
  });

  useEffect(() => {
    if (user) setData(user);
  }, [user]);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    updateUser(data);
    setEdit(false);
  };

  return (
    <div className="profile-wrapper">
      <div className="profile-card">
        <h2>My Profile</h2>

        <div className="profile-row">
          <label>First Name</label>
          <input
            name="firstName"
            value={data.firstName}
            onChange={handleChange}
            disabled={!edit}
          />
        </div>

        <div className="profile-row">
          <label>Last Name</label>
          <input
            name="lastName"
            value={data.lastName}
            onChange={handleChange}
            disabled={!edit}
          />
        </div>

        <div className="profile-row">
          <label>Email</label>
          <input value={data.email} disabled />
        </div>

        <div className="profile-row">
          <label>Phone</label>
          <input
            name="phone"
            value={data.phone || ""}
            onChange={handleChange}
            disabled={!edit}
          />
        </div>

        <div className="profile-row">
          <label>Location</label>
          <input
            name="location"
            value={data.location || ""}
            onChange={handleChange}
            disabled={!edit}
          />
        </div>

        <div className="profile-row">
          <label>Bio</label>
          <textarea
            name="bio"
            value={data.bio || ""}
            onChange={handleChange}
            disabled={!edit}
          />
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
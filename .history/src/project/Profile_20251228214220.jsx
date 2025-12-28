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
}.profile-wrapper {
  min-height: 100vh;
  background: #f8fafc;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px 16px;
}

.profile-card {
  background: #ffffff;
  width: 100%;
  max-width: 520px;
  padding: 32px;
  border-radius: 18px;
  box-shadow: 0 20px 50px rgba(15, 23, 42, 0.15);
}

.profile-card h2 {
  text-align: center;
  margin-bottom: 28px;
  font-weight: 800;
  color: #0f172a;
}

.profile-row {
  display: flex;
  flex-direction: column;
  margin-bottom: 16px;
}

.profile-row label {
  font-size: 0.85rem;
  font-weight: 600;
  color: #64748b;
  margin-bottom: 6px;
}

.profile-row input,
.profile-row textarea {
  height: 48px;
  padding: 12px 14px;
  border-radius: 12px;
  border: 1.5px solid #cbd5e1;
  font-size: 0.95rem;
}

.profile-row textarea {
  height: 90px;
  resize: none;
}

.profile-row input:disabled,
.profile-row textarea:disabled {
  background: #f1f5f9;
  cursor: not-allowed;
}

.edit-btn,
.save-btn {
  width: 100%;
  height: 52px;
  border-radius: 14px;
  border: none;
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;
  margin-top: 12px;
}

.edit-btn {
  background: linear-gradient(135deg, #2563eb, #38bdf8);
  color: white;
}

.save-btn {
  background: #22c55e;
  color: white;
}

.edit-btn:hover,
.save-btn:hover {
  opacity: 0.9;
  transform: translateY(-1px);
}
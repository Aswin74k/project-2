import React, { useState, useEffect } from "react";
import "./ProfileSidebar.css";

export default function ProfileSidebar({ isOpen, onClose }) {
  const [profile, setProfile] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

  const [savedMsg, setSavedMsg] = useState("");

  // Load from localStorage
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("userProfile"));
    if (storedUser) {
      setProfile(storedUser);
    }
  }, []);

  // Save handler
  const handleSave = () => {
    localStorage.setItem("userProfile", JSON.stringify(profile));
    setSavedMsg("Profile updated successfully ✅");

    setTimeout(() => setSavedMsg(""), 2000);
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div className="profile-overlay" onClick={onClose}></div>

      {/* Sidebar */}
      <div className="profile-sidebar">
        <div className="profile-header">
          <h3>Profile Settings</h3>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>

        <div className="profile-body">
          <label>First Name</label>
          <input
            type="text"
            value={profile.firstName}
            onChange={(e) =>
              setProfile({ ...profile, firstName: e.target.value })
            }
          />

          <label>Last Name</label>
          <input
            type="text"
            value={profile.lastName}
            onChange={(e) =>
              setProfile({ ...profile, lastName: e.target.value })
            }
          />

          <label>Email</label>
          <input
            type="email"
            value={profile.email}
            onChange={(e) =>
              setProfile({ ...profile, email: e.target.value })
            }
          />

          {savedMsg && <p className="success-msg">{savedMsg}</p>}

          <button className="save-btn" onClick={handleSave}>
            Save Changes
          </button>
        </div>
      </div>
    </>
  );
}
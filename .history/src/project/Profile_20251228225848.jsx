import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import "./Profile.css";

export default function Profile() {
  const { user, updateUser } = useAuth();

  const [edit, setEdit] = useState(false);
  const [profileData, setProfileData] = useState(user);
  const [preview, setPreview] = useState(user.profilePic || null);
  const [showToast, setShowToast] = useState(false);

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
      setProfileData({ ...profileData, profilePic: reader.result });
    };
    reader.readAsDataURL(file);
  };

  const handleSave = () => {
    updateUser(profileData);
    setEdit(false);

    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  return (
    <div className="profile-container">
      {showToast && <div className="toast">✅ Profile updated successfully</div>}

      <div className="profile-card">
        <div className="profile-pic">
          <label htmlFor="profileUpload">
            <img
              src={preview || "/default-user.png"}
              alt="profile"
              className="profile-image"
            />
            {edit && <span className="edit-overlay">Change</span>}
          </label>

          {edit && (
            <input
              id="profileUpload"
              type="file"
              accept="image/*"
              onChange={handleImage}
              hidden
            />
          )}
        </div>

        <div className="profile-info">
          <label>First Name</label>
          <input
            value={profileData.firstName}
            disabled={!edit}
            onChange={(e) =>
              setProfileData({ ...profileData, firstName: e.target.value })
            }
          />

          <label>Email</label>
          <input value={profileData.email} readOnly />
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
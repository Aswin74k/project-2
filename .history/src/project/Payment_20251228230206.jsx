import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import "./Profile.css";

export default function Profile() {
  const { user, updateUser } = useAuth();

  const [edit, setEdit] = useState(false);
  const [profileData, setProfileData] = useState(user);
  const [preview, setPreview] = useState(user.profilePic || null);
  const [toast, setToast] = useState(false);

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
    setToast(true);
    setTimeout(() => setToast(false), 2500);
  };

  return (
    <div className="profile-container">
      {toast && <div className="toast">✅ Profile updated</div>}

      <div className="profile-card">
        {/* Profile Image */}
        <div className="profile-pic">
          <label htmlFor="upload">
            <img src={preview || "/default-user.png"} alt="profile" />
            {edit && <span className="edit-overlay">Change</span>}
          </label>

          {edit && (
            <input
              id="upload"
              type="file"
              accept="image/*"
              hidden
              onChange={handleImage}
            />
          )}
        </div>

        {/* Info */}
        <div className="profile-info">
          <div>
            <label>First Name</label>
            <input
              disabled={!edit}
              value={profileData.firstName}
              onChange={(e) =>
                setProfileData({ ...profileData, firstName: e.target.value })
              }
            />
          </div>

          <div>
            <label>Email</label>
            <input
              disabled={!edit}
              value={profileData.email}
              onChange={(e) =>
                setProfileData({ ...profileData, email: e.target.value })
              }
            />
          </div>
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
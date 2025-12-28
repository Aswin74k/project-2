import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
impo

export default function Profile() {
  const { user, updateUser } = useAuth();

  const [edit, setEdit] = useState(false);
  const [profileData, setProfileData] = useState(user);
  const [preview, setPreview] = useState(user.profilePic || null);

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
  };

  return (
    <div className="profile-container">
      <div className="profile-card">

        <div className="profile-pic">
          <img
            src={preview || "/default-user.png"}
            alt="profile"
          />

          {edit && (
            <input type="file" accept="image/*" onChange={handleImage} />
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
          <input value={profileData.email} disabled />
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
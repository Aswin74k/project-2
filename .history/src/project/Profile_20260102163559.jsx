import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import "./Profile.css";

export default function Profile() {
  const { user, setUser } = useAuth();

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

  const [backupData, setBackupData] = useState(null);

  // Load user data (READ)
  useEffect(() => {
    if (user) {
      const savedProfile =
        JSON.parse(localStorage.getItem("profileData")) || user;

      setFormData({
        firstName: savedProfile.firstName || "",
        lastName: savedProfile.lastName || "",
        email: savedProfile.email || "",
      });
    }
  }, [user]);

  // Handle input change (UPDATE)
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Edit
  const handleEdit = () => {
    setBackupData(formData); // backup for cancel
    setIsEditing(true);
  };

  // Save (UPDATE)
  const handleSave = () => {
    localStorage.setItem("profileData", JSON.stringify(formData));

    if (setUser) {
      setUser((prev) => ({ ...prev, ...formData }));
    }

    setIsEditing(false);
  };

  // Cancel (ROLLBACK)
  const handleCancel = () => {
    setFormData(backupData);
    setIsEditing(false);
  };

  return (
    <div className="profile-page">
      <div className="profile-card">
        <h2>My Profile</h2>

        <div className="profile-field">
          <label>First Name</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            disabled={!isEditing}
            onChange={handleChange}
          />
        </div>

        <div className="profile-field">
          <label>Last Name</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            disabled={!isEditing}
            onChange={handleChange}
          />
        </div>

        <div className="profile-field">
          <label>Email</label>
          <input type="email" value={formData.email} disabled />
        </div>

        <div className="profile-actions">
          {!isEditing ? (
            <button className="edit-btn" onClick={handleEdit}>
              Edit Profile
            </button>
          ) : (
            <>
              <button className="save-btn" onClick={handleSave}>
                Save Changes
              </button>
              <button className="cancel-btn" onClick={handleCancel}>
                Cancel
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import "./Profile.css";

export default function Profile() {
  const { user, setUser } = useAuth();

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

  const [backupData, setBackupData] = useState(null);

  // Load user data (READ)
  useEffect(() => {
    if (user) {
      const savedProfile =
        JSON.parse(localStorage.getItem("profileData")) || user;

      setFormData({
        firstName: savedProfile.firstName || "",
        lastName: savedProfile.lastName || "",
        email: savedProfile.email || "",
      });
    }
  }, [user]);

  // Handle input change (UPDATE)
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Edit
  const handleEdit = () => {
    setBackupData(formData); // backup for cancel
    setIsEditing(true);
  };

  // Save (UPDATE)
  const handleSave = () => {
    localStorage.setItem("profileData", JSON.stringify(formData));

    if (setUser) {
      setUser((prev) => ({ ...prev, ...formData }));
    }

    setIsEditing(false);
  };

  // Cancel (ROLLBACK)
  const handleCancel = () => {
    setFormData(backupData);
    setIsEditing(false);
  };

  return (
    <div className="profile-page">
      <div className="profile-card">
        <h2>My Profile</h2>

        <div className="profile-field">
          <label>First Name</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            disabled={!isEditing}
            onChange={handleChange}
          />
        </div>

        <div className="profile-field">
          <label>Last Name</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            disabled={!isEditing}
            onChange={handleChange}
          />
        </div>

        <div className="profile-field">
          <label>Email</label>
          <input type="email" value={formData.email} disabled />
        </div>

        <div className="profile-actions">
          {!isEditing ? (
            <button className="edit-btn" onClick={handleEdit}>
              Edit Profile
            </button>
          ) : (
            <>
              <button className="save-btn" onClick={handleSave}>
                Save Changes
              </button>
              <button className="cancel-btn" onClick={handleCancel}>
                Cancel
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
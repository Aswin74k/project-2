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
}.profile-page {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #f6f7fb;
}

.profile-card {
  width: 100%;
  max-width: 420px;
  background: #fff;
  padding: 28px;
  border-radius: 14px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.08);
}

.profile-card h2 {
  text-align: center;
  margin-bottom: 24px;
  font-weight: 700;
}

.profile-field {
  display: flex;
  flex-direction: column;
  margin-bottom: 16px;
}

.profile-field label {
  font-size: 0.85rem;
  color: #555;
  margin-bottom: 6px;
}

.profile-field input {
  padding: 10px 12px;
  border-radius: 8px;
  border: 1px solid #ddd;
  font-size: 0.95rem;
}

.profile-field input:disabled {
  background: #f2f2f2;
  color: #777;
}

.profile-actions {
  display: flex;
  justify-content: center;
  gap: 12px;
  margin-top: 20px;
}

.edit-btn,
.save-btn,
.cancel-btn {
  padding: 10px 18px;
  border-radius: 8px;
  border: none;
  font-weight: 600;
  cursor: pointer;
}

.edit-btn {
  background: #2563eb;
  color: #fff;
}

.save-btn {
  background: #16a34a;
  color: #fff;
}

.cancel-btn {
  background: #e5e7eb;
  color: #111;
}
import { useEffect, useState } from "react";
import "./ProfileDrawer.css";

const ProfileDrawer = ({ open, onClose, onUpdate }) => {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("user"));
    if (stored) setUser(stored);
  }, []);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const saveProfile = () => {
    localStorage.setItem("user", JSON.stringify(user));
    onUpdate();   // navbar refresh
    onClose();
  };

  if (!open) return null;

  return (
    <div className="drawer-overlay" onClick={onClose}>
      <div className="drawer" onClick={(e) => e.stopPropagation()}>
        <h3>Edit Profile</h3>

        <input
          name="firstName"
          placeholder="First Name"
          value={user.firstName}
          onChange={handleChange}
        />

        <input
          name="lastName"
          placeholder="Last Name"
          value={user.lastName}
          onChange={handleChange}
        />

        <input
          name="email"
          placeholder="Email"
          value={user.email}
          onChange={handleChange}
        />

        <button onClick={saveProfile}>Save</button>
      </div>
    </div>
  );
};

export default ProfileDrawer;
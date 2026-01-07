import React, { useEffect, useState } from "react";
import "./crud.css";

const Profile = () => {
  const [formData, setFormData] = useState({
    id: "",
    firstName: "",
    lastName: "",
    email: "",
  });

  const [users, setUsers] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoaded, setIsLoaded] = useState(false);

  // LOAD USERS
  useEffect(() => {
    const stored = localStorage.getItem("techmentor-users");
    if (stored) {
      try {
        setUsers(JSON.parse(stored));
      } catch {
        localStorage.removeItem("techmentor-users");
      }
    }
    setIsLoaded(true);
  }, []);

  // SAVE USERS
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(
        "techmentor-users",
        JSON.stringify(users)
      );
    }
  }, [users, isLoaded]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const errs = {};
    if (!formData.firstName.trim())
      errs.firstName = "First name required";
    if (!formData.lastName.trim())
      errs.lastName = "Last name required";
    if (!formData.email)
      errs.email = "Email required";
    else if (!/^\S+@\S+\.\S+$/.test(formData.email))
      errs.email = "Invalid email";
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const v = validate();
    if (Object.keys(v).length) {
      setErrors(v);
      return;
    }

    if (editMode) {
      setUsers(
        users.map((u) =>
          u.id === formData.id ? formData : u
        )
      );
      setEditMode(false);
    } else {
      setUsers([
        ...users,
        { ...formData, id: Date.now().toString() },
      ]);
    }

    setFormData({
      id: "",
      firstName: "",
      lastName: "",
      email: "",
    });
    setErrors({});
  };

  const handleEdit = (user) => {
    setFormData(user);
    setEditMode(true);
  };

  const handleDelete = (id) => {
    setUsers(users.filter((u) => u.id !== id));
  };

  const handleClearAll = () => {
    if (window.confirm("Clear all users?")) {
      setUsers([]);
      localStorage.removeItem("techmentor-users");
    }
  };

  return (
    <div className="formnew">
      <h1>TechMentor – User Management</h1>

      <form onSubmit={handleSubmit}>
        <input
          name="firstName"
          placeholder="First Name"
          value={formData.firstName}
          onChange={handleChange}
        />
        {errors.firstName && <p className="err">{errors.firstName}</p>}

        <input
          name="lastName"
          placeholder="Last Name"
          value={formData.lastName}
          onChange={handleChange}
        />
        {errors.lastName && <p className="err">{errors.lastName}</p>}

        <input
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />
        {errors.email && <p className="err">{errors.email}</p>}

        <button type="submit">
          {editMode ? "Update User" : "Add User"}
        </button>

        {editMode && (
          <button
            type="button"
            onClick={() => setEditMode(false)}
          >
            Cancel
          </button>
        )}
      </form>

      {users.length > 0 && (
        <>
          <div className="list-header">
            <h2>User List</h2>
            <button onClick={handleClearAll} className="danger">
              Clear All
            </button>
          </div>

          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id}>
                  <td>{u.firstName} {u.lastName}</td>
                  <td>{u.email}</td>
                  <td>
                    <button onClick={() => handleEdit(u)}>
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(u.id)}
                      className="danger"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default Profile;
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./admin.css";

const API = "http://localhost:5000/courses";

export default function AdminCourses() {
  const [courses, setCourses] = useState([]);
  const [form, setForm] = useState({
    title: "",
    fee: "",
    duration: "",
  });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    const res = await axios.get(API);
    setCourses(res.data);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editId) {
      await axios.put(`${API}/${editId}`, form);
      setEditId(null);
    } else {
      await axios.post(API, form);
    }

    setForm({ title: "", fee: "", duration: "" });
    fetchCourses();
  };

  const handleEdit = (course) => {
    setForm(course);
    setEditId(course.id);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this course?")) {
      await axios.delete(`${API}/${id}`);
      fetchCourses();
    }
  };

  return (
    <div className="admin-page">
      <h2>Admin Course Management</h2>

      <form onSubmit={handleSubmit} className="admin-form">
        <input
          name="title"
          placeholder="Course Title"
          value={form.title}
          onChange={handleChange}
          required
        />
        <input
          name="fee"
          placeholder="Fee"
          value={form.fee}
          onChange={handleChange}
          required
        />
        <input
          name="duration"
          placeholder="Duration"
          value={form.duration}
          onChange={handleChange}
          required
        />
        <button type="submit">
          {editId ? "Update Course" : "Add Course"}
        </button>
      </form>

      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Fee</th>
            <th>Duration</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((c) => (
            <tr key={c.id}>
              <td>{c.title}</td>
              <td>₹{c.fee}</td>
              <td>{c.duration}</td>
              <td>
                <button onClick={() => handleEdit(c)}>Edit</button>
                <button onClick={() => handleDelete(c.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

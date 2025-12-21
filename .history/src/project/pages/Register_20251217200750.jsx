import { useState, useContext } from "react";
import { LibraryContext } from "../context/LibraryContext";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const { register } = useContext(LibraryContext);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    register(form);
    alert("Registered successfully!");
    navigate("/login");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Register</h2>

      <input
        type="email"
        placeholder="Email"
        onChange={(e) => setForm({ ...form, email: e.target.value })}
        required
      />

      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setForm({ ...form, password: e.target.value })}
        required
      />

      <button type="submit">Register</button>
    </form>
  );
};

export default Register;


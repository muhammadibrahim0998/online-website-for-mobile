import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Signup() {
  const [form, setForm] = useState({ name: "", email: "", password: "", phone: "", address: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await axios.post("http://localhost:5000/api/auth/signup", form);
      alert("Registration successful! Please login.");
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5 py-5 d-flex justify-content-center">
      <div className="card shadow-lg border-0 p-4" style={{ maxWidth: "500px", width: "100%", borderRadius: "15px" }}>
        <h2 className="fw-bold text-center mb-4">Create Account</h2>
        {error && <div className="alert alert-danger py-2 small">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label small fw-bold text-muted">Full Name</label>
            <input
              type="text"
              className="form-control rounded-pill px-4"
              placeholder="John Doe"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label small fw-bold text-muted">Email Address</label>
            <input
              type="email"
              className="form-control rounded-pill px-4"
              placeholder="name@example.com"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label small fw-bold text-muted">Password</label>
            <input
              type="password"
              className="form-control rounded-pill px-4"
              placeholder="Min 6 characters"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
            />
          </div>
          <div className="mb-4">
            <label className="form-label small fw-bold text-muted">Phone Number</label>
            <input
              type="text"
              className="form-control rounded-pill px-4"
              placeholder="0300..."
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
            />
          </div>
          <button type="submit" className="btn btn-success w-100 rounded-pill py-2 fw-bold shadow-sm mb-3" disabled={loading}>
            {loading ? "Processing..." : "REGISTER"}
          </button>
          <div className="text-center small">
            Already have an account? <Link to="/login" className="text-decoration-none fw-bold">Login Here</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;

import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login: setAuthData } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", form);
      
      setAuthData(res.data);
      
      // Role-based redirection
      const role = res.data.user.role;
      if (role === "superadmin") navigate("/admin/super");
      else if (role === "shopadmin") navigate("/admin/shop");
      else navigate("/dashboard");
      
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5 py-5 d-flex justify-content-center">
      <div className="card shadow-lg border-0 p-4" style={{ maxWidth: "450px", width: "100%", borderRadius: "15px" }}>
        <h2 className="fw-bold text-center mb-4">Welcome Back</h2>
        {error && <div className="alert alert-danger py-2 small">{error}</div>}
        <form onSubmit={handleSubmit}>
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
          <div className="mb-4">
            <label className="form-label small fw-bold text-muted">Password</label>
            <input
              type="password"
              className="form-control rounded-pill px-4"
              placeholder="••••••••"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100 rounded-pill py-2 fw-bold shadow-sm mb-3" disabled={loading}>
            {loading ? "Authenticating..." : "LOGIN"}
          </button>
          <div className="text-center small">
            Don't have an account? <Link to="/signup" className="text-decoration-none fw-bold">Sign Up</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;

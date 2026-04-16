import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

const SuperAdminDashboard = () => {
  const { user } = useContext(AuthContext);
  const [shopAdmins, setShopAdmins] = useState([]);
  const [stats, setStats] = useState({ totalUsers: 0, totalShopAdmins: 0 });
  const [formData, setFormData] = useState({ name: "", email: "", password: "", phone: "" });
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchShopAdmins();
    fetchStats();
  }, []);

  const fetchShopAdmins = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/admin/shop-admins");
      setShopAdmins(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchStats = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/admin/stats");
      setStats(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddShopAdmin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/admin/shop-admin", formData);
      setMessage(res.data.message);
      setFormData({ name: "", email: "", password: "", phone: "" });
      fetchShopAdmins();
      fetchStats();
    } catch (err) {
      setMessage(err.response?.data?.message || "Error adding shop admin");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure?")) {
      try {
        await axios.delete(`http://localhost:5000/api/admin/shop-admin/${id}`);
        fetchShopAdmins();
        fetchStats();
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <div className="container py-5">
      <div className="row mb-5 text-center">
        <div className="col-12">
          <h1 className="fw-bold text-primary">Super Admin Dashboard</h1>
          <p className="text-muted">Welcome, {user?.name}! Manage your platform here.</p>
        </div>
      </div>

      <div className="row g-4 mb-5">
        <div className="col-md-6">
          <div className="card shadow-sm border-0 bg-primary text-white p-4 h-100">
            <h3>Total Users</h3>
            <p className="display-4 fw-bold">{stats.totalUsers}</p>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card shadow-sm border-0 bg-success text-white p-4 h-100">
            <h3>Shop Admins</h3>
            <p className="display-4 fw-bold">{stats.totalShopAdmins}</p>
          </div>
        </div>
      </div>

      <div className="row g-4">
        <div className="col-lg-4">
          <div className="card shadow border-0 p-4">
            <h4 className="mb-4">Add Shop Admin</h4>
            {message && <div className="alert alert-info">{message}</div>}
            <form onSubmit={handleAddShopAdmin}>
              <input 
                type="text" className="form-control mb-3" placeholder="Full Name" required
                value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
              <input 
                type="email" className="form-control mb-3" placeholder="Email Address" required
                value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
              <input 
                type="password" className="form-control mb-3" placeholder="Password" required
                value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})}
              />
              <input 
                type="text" className="form-control mb-4" placeholder="Phone Number"
                value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})}
              />
              <button type="submit" className="btn btn-primary w-100 py-2 fw-bold">CREATE ADMIN</button>
            </form>
          </div>
        </div>

        <div className="col-lg-8">
          <div className="card shadow border-0 p-4 h-100">
            <h4 className="mb-4">Shop Admin List</h4>
            <div className="table-responsive">
              <table className="table table-hover">
                <thead className="table-light">
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {shopAdmins.map((admin) => (
                    <tr key={admin._id}>
                      <td>{admin.name}</td>
                      <td>{admin.email}</td>
                      <td>{admin.phone || "N/A"}</td>
                      <td>
                        <button className="btn btn-sm btn-danger px-3" onClick={() => handleDelete(admin._id)}>Delete</button>
                      </td>
                    </tr>
                  ))}
                  {shopAdmins.length === 0 && <tr><td colSpan="4" className="text-center text-muted">No shop admins found.</td></tr>}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuperAdminDashboard;

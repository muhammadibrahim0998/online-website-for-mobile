import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { motion } from "framer-motion";

const UserDashboard = () => {
  const { user } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMyOrders();
  }, []);

  const fetchMyOrders = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/orders/my-orders");
      setOrders(res.data);
    } catch (err) {
      console.error("Error fetching orders:", err);
    } finally {
      setLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-wrapper py-5 px-3 min-vh-100">
      <motion.div 
        className="container"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <div className="row mb-5">
          <div className="col-12 text-center text-md-start">
            <h1 className="fw-bold display-5 brand-gradient-text">My Account</h1>
            <p className="lead text-muted">Welcome back, <span className="fw-bold text-dark">{user?.name}</span>. Here are your recent activities.</p>
          </div>
        </div>

        <div className="row g-4">
          {/* Profile Card */}
          <div className="col-lg-4">
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="glass-card p-4 h-100 shadow-sm"
            >
              <div className="d-flex align-items-center mb-4">
                <div className="profile-icon-large me-3">
                  <i className="bi bi-person-circle"></i>
                </div>
                <div>
                  <h5 className="fw-bold mb-0">Profile Details</h5>
                  <span className="badge rounded-pill bg-light text-primary border border-primary-subtle px-3">
                    {user?.role?.toUpperCase()}
                  </span>
                </div>
              </div>
              
              <div className="profile-info">
                <div className="info-item mb-3">
                  <label className="text-muted small d-block">Full Name</label>
                  <span className="fw-semibold fs-5">{user?.name}</span>
                </div>
                <div className="info-item mb-3">
                  <label className="text-muted small d-block">Email Address</label>
                  <span className="fw-semibold">{user?.email}</span>
                </div>
                <div className="info-item">
                  <label className="text-muted small d-block">Member Since</label>
                  <span className="fw-semibold">{new Date(user?.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* History Card */}
          <div className="col-lg-8">
            <div className="glass-card p-4 h-100 shadow-sm overflow-hidden">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h5 className="fw-bold mb-0">Recent Orders</h5>
                <span className="badge bg-dark px-3 rounded-pill">{orders.length} total</span>
              </div>

              {orders.length > 0 ? (
                <div className="table-responsive">
                  <table className="table table-hover align-middle custom-dashboard-table">
                    <thead>
                      <tr className="border-bottom text-muted small uppercase tracking-wider">
                        <th>Order ID</th>
                        <th>Items</th>
                        <th>Total Amount</th>
                        <th>Status</th>
                        <th>Order Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.map((order) => (
                        <tr key={order._id}>
                          <td>
                            <span className="font-monospace text-primary">#{order._id.slice(-6).toUpperCase()}</span>
                          </td>
                          <td>
                            <div className="d-flex align-items-center">
                              <i className="bi bi-box-seam me-2"></i>
                              {order.items.length} items
                            </div>
                          </td>
                          <td className="fw-bold">Rs. {order.totalAmount.toLocaleString()}</td>
                          <td>
                            <span className={`status-badge ${order.orderStatus}`}>
                              {order.orderStatus}
                            </span>
                          </td>
                          <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-5">
                  <div className="empty-state-icon bg-light rounded-circle p-4 d-inline-block mb-3">
                    <i className="bi bi-cart-x display-4 text-muted"></i>
                  </div>
                  <h5>No orders found</h5>
                  <p className="text-muted mb-4">You haven't purchased any mobile yet.</p>
                  <a href="/" className="btn btn-primary btn-lg rounded-pill px-5 shadow-sm">Shop Now</a>
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.div>

      <style>{`
        .dashboard-wrapper {
          background: linear-gradient(135deg, #f0f8ff 0%, #e6f2ff 100%);
        }
        
        .brand-gradient-text {
          background: linear-gradient(90deg, #0d6efd, #0dcaf0);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .glass-card {
          background: rgba(255, 255, 255, 0.7);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.4);
          border-radius: 25px;
        }

        .profile-icon-large {
          font-size: 3rem;
          color: #0d6efd;
          background: #e7f1ff;
          width: 70px;
          height: 70px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 20px;
        }

        .custom-dashboard-table thead th {
          border: none;
          padding-bottom: 1rem;
        }

        .custom-dashboard-table tbody tr {
          border-bottom: 1px solid rgba(0,0,0,0.05);
          transition: transform 0.2s;
        }

        .custom-dashboard-table tbody tr:hover {
          background: rgba(13, 110, 253, 0.05);
          transform: scale(1.005);
        }

        .status-badge {
          padding: 6px 12px;
          border-radius: 20px;
          font-size: 0.85rem;
          font-weight: 600;
          text-transform: capitalize;
        }

        .status-badge.processing { background-color: #fff3cd; color: #856404; }
        .status-badge.delivered { background-color: #d4edda; color: #155724; }
        .status-badge.pending { background-color: #f8d7da; color: #721c24; }
        .status-badge.shipped { background-color: #cce5ff; color: #004085; }

        .empty-state-icon {
          width: 100px;
          height: 100px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      `}</style>
    </div>
  );
};

export default UserDashboard;

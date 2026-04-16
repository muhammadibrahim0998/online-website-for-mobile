import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

const UserDashboard = () => {
  const { user } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchMyOrders();
  }, []);

  const fetchMyOrders = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/orders/my-orders");
      setOrders(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container py-5">
      <div className="row mb-5">
        <div className="col-12 text-center text-md-start">
          <h1 className="fw-bold">My Account</h1>
          <p className="text-muted">Welcome back, {user?.name}. Here are your recent activities.</p>
        </div>
      </div>

      <div className="row g-4 mb-5">
        <div className="col-md-4">
          <div className="card shadow-sm border-0 p-4 h-100 text-center text-md-start">
            <h5 className="fw-bold text-muted mb-3">Profile Details</h5>
            <div className="mb-2"><strong>Name:</strong> {user?.name}</div>
            <div className="mb-2"><strong>Email:</strong> {user?.email}</div>
            <div className="mb-2"><strong>Role:</strong> <span className="badge bg-primary">{user?.role}</span></div>
          </div>
        </div>
        <div className="col-md-8">
          <div className="card shadow-sm border-0 p-4 h-100">
            <h5 className="fw-bold text-muted mb-4">My Shopping History</h5>
            {orders.length > 0 ? (
              <div className="table-responsive">
                <table className="table table-hover">
                  <thead className="table-light">
                    <tr>
                      <th>Order ID</th>
                      <th>Items</th>
                      <th>Total</th>
                      <th>Status</th>
                      <th>Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order) => (
                      <tr key={order._id}>
                        <td className="small text-muted">#{order._id.slice(-6)}</td>
                        <td>{order.items.length} items</td>
                        <td className="fw-bold">Rs.{order.totalAmount.toFixed(2)}</td>
                        <td>
                          <span className={`badge ${order.orderStatus === "delivered" ? "bg-success" : "bg-warning"}`}>
                            {order.orderStatus}
                          </span>
                        </td>
                        <td className="small">{new Date(order.createdAt).toLocaleDateString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-5">
                <i className="bi bi-cart-x display-4 text-muted mb-3 d-block"></i>
                <p>You haven't placed any orders yet.</p>
                <a href="/" className="btn btn-outline-primary px-4 rounded-pill">Start Shopping</a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;

import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

const ShopAdminDashboard = () => {
  const { user } = useContext(AuthContext);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [file, setFile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [viewProduct, setViewProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: "", price: "", description: "", category: "iphone", stock: 10
  });
  const [activeTab, setActiveTab] = useState("products");
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchMyProducts();
    fetchOrders();
  }, []);

  const fetchMyProducts = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/products/admin/my-products");
      setProducts(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchOrders = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/orders");
      setOrders(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    
    if (!file && !isEditing) {
      setMessage("Please select an image file.");
      return;
    }

    const data = new FormData();
    data.append("name", formData.name);
    data.append("price", formData.price);
    data.append("description", formData.description);
    data.append("category", formData.category);
    data.append("stock", formData.stock);
    if (file) data.append("image", file);

    try {
      let res;
      if (isEditing) {
        res = await axios.put(`http://localhost:5000/api/products/${editId}`, data, {
          headers: { 
            "Content-Type": "multipart/form-data",
            "Authorization": `Bearer ${localStorage.getItem("token")}`
          }
        });
        setMessage("Product updated successfully!");
      } else {
        res = await axios.post("http://localhost:5000/api/products", data, {
          headers: { 
            "Content-Type": "multipart/form-data",
            "Authorization": `Bearer ${localStorage.getItem("token")}`
          }
        });
        setMessage(res.data.message);
      }
      
      resetForm();
      fetchMyProducts();
    } catch (err) {
      console.error("Product Action Error:", err);
      setMessage(err.response?.data?.message || "Operation failed.");
    }
  };

  const resetForm = () => {
    setFormData({ name: "", price: "", description: "", category: "iphone", stock: 10 });
    setFile(null);
    setIsEditing(false);
    setEditId(null);
    if (document.getElementById("imageInput")) document.getElementById("imageInput").value = "";
  };

  const handleEdit = (p) => {
    setFormData({
      name: p.name,
      price: p.price,
      description: p.description,
      category: p.category,
      stock: p.stock
    });
    setIsEditing(true);
    setEditId(p._id);
    window.scrollTo(0, 0);
  };

  const handleDeleteProduct = async (id) => {
    if (window.confirm("Delete this product?")) {
      try {
        await axios.delete(`http://localhost:5000/api/products/${id}`);
        fetchMyProducts();
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <div className="container py-5">
      <div className="row mb-4">
        <div className="col-12 text-center">
          <h1 className="fw-bold text-success">Shop Admin Dashboard</h1>
          <p className="text-muted">Manage your products and orders, {user?.name}.</p>
        </div>
      </div>

      <div className="text-center mb-5">
        <div className="btn-group shadow-sm">
          <button 
            className={`btn px-4 ${activeTab === "products" ? "btn-success" : "btn-outline-success"}`}
            onClick={() => setActiveTab("products")}
          >
            Manage Products
          </button>
          <button 
            className={`btn px-4 ${activeTab === "orders" ? "btn-success" : "btn-outline-success"}`}
            onClick={() => setActiveTab("orders")}
          >
            Store Orders
          </button>
        </div>
      </div>

      {activeTab === "products" ? (
        <div className="row g-4">
          <div className="col-lg-4">
            <div className="card shadow border-0 p-4 sticky-top" style={{ top: "100px", zIndex: 10 }}>
              <h4 className="mb-4">{isEditing ? "Update Product" : "Add New Product"}</h4>
              {message && <div className="alert alert-info py-2 small">{message}</div>}
              <form onSubmit={handleAddProduct}>
                <div className="mb-3">
                  <label className="form-label small fw-bold">Title</label>
                  <input type="text" className="form-control" required
                    value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
                </div>
                <div className="mb-3">
                  <label className="form-label small fw-bold">Price (Rs.)</label>
                  <input type="number" className="form-control" required
                    value={formData.price} onChange={(e) => setFormData({...formData, price: e.target.value})} />
                </div>
                <div className="mb-3">
                  <label className="form-label small fw-bold">Product Image {isEditing && "(Optional)"}</label>
                  <input 
                    id="imageInput"
                    type="file" 
                    className="form-control" 
                    accept="image/*"
                    onChange={(e) => setFile(e.target.files[0])} 
                    required={!isEditing}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label small fw-bold">Category</label>
                  <select className="form-select" value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})}>
                    <option value="iphone">iPhone</option>
                    <option value="samsung">Samsung</option>
                    <option value="vivo">Vivo</option>
                  </select>
                </div>
                <div className="mb-4">
                  <label className="form-label small fw-bold">Description</label>
                  <textarea className="form-control" rows="3" required
                    value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})}></textarea>
                </div>
                <div className="d-flex gap-2">
                  <button type="submit" className={`btn w-100 py-2 fw-bold ${isEditing ? "btn-warning" : "btn-success"}`}>
                    {isEditing ? "UPDATE NOW" : "ADD PRODUCT"}
                  </button>
                  {isEditing && (
                    <button type="button" className="btn btn-secondary px-3" onClick={resetForm}>Cancel</button>
                  )}
                </div>
              </form>
            </div>
          </div>

          <div className="col-lg-8">
            <div className="card shadow border-0 p-4 h-100">
              <h4 className="mb-4">My Products</h4>
              <div className="table-responsive">
                <table className="table table-hover align-middle">
                  <thead className="table-light">
                    <tr>
                      <th>Image</th>
                      <th>Name</th>
                      <th>Price</th>
                      <th>Category</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((p) => (
                      <tr key={p._id}>
                        <td><img src={p.image} alt={p.name} style={{width: "40px", height: "40px", objectFit: "contain"}} className="rounded border bg-light" /></td>
                        <td className="fw-semibold">{p.name}</td>
                        <td className="text-primary fw-bold">Rs.{p.price}</td>
                        <td><span className="badge bg-secondary opacity-75">{p.category}</span></td>
                        <td>
                          <div className="btn-group">
                            <button className="btn btn-sm btn-outline-info" title="View" onClick={() => setViewProduct(p)}>
                              <i className="bi bi-eye"></i>
                            </button>
                            <button className="btn btn-sm btn-outline-warning" title="Edit" onClick={() => handleEdit(p)}>
                              <i className="bi bi-pencil"></i>
                            </button>
                            <button className="btn btn-sm btn-outline-danger" title="Delete" onClick={() => handleDeleteProduct(p._id)}>
                              <i className="bi bi-trash"></i>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                    {products.length === 0 && <tr><td colSpan="5" className="text-center text-muted py-4">No products added.</td></tr>}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="card shadow border-0 p-4">
          <h4 className="mb-4">Recent Store Orders</h4>
          <div className="table-responsive">
            <table className="table table-hover align-middle">
              <thead className="table-light">
                <tr>
                  <th>Order ID</th>
                  <th>Customer</th>
                  <th>Total</th>
                  <th>Method</th>
                  <th>Status</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((o) => (
                  <tr key={o._id}>
                    <td className="small">#{o._id.slice(-8)}</td>
                    <td>
                      <div className="fw-bold">{o.customerName}</div>
                      <div className="small text-muted">{o.customerEmail}</div>
                    </td>
                    <td className="fw-bold text-primary">Rs.{o.totalAmount.toFixed(2)}</td>
                    <td><span className="small">{o.paymentMethod}</span></td>
                    <td>
                      <span className={`badge ${o.paymentStatus === "paid" ? "bg-success" : "bg-warning"}`}>
                        {o.paymentStatus}
                      </span>
                    </td>
                    <td className="small">{new Date(o.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))}
                {orders.length === 0 && <tr><td colSpan="6" className="text-center text-muted py-4">No orders found.</td></tr>}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Product Detail Modal */}
      {viewProduct && (
        <div className="modal show d-block" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content border-0 shadow-lg rounded-4">
              <div className="modal-header border-0">
                <h5 className="modal-title fw-bold">Product Details</h5>
                <button type="button" className="btn-close shadow-none" onClick={() => setViewProduct(null)}></button>
              </div>
              <div className="modal-body text-center p-4">
                <img src={viewProduct.image} alt={viewProduct.name} className="img-fluid mb-4 rounded bg-light p-3" style={{ maxHeight: "250px" }} />
                <h3 className="fw-bold mb-1">{viewProduct.name}</h3>
                <h4 className="text-primary fw-bold mb-3">Rs.{viewProduct.price}</h4>
                <div className="badge bg-secondary mb-3">{viewProduct.category}</div>
                <p className="text-muted small px-3">{viewProduct.description}</p>
              </div>
              <div className="modal-footer border-0">
                <button type="button" className="btn btn-light w-100 rounded-pill" onClick={() => setViewProduct(null)}>Close</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShopAdminDashboard;

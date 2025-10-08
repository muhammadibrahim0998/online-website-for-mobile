// Checkout.jsx
import React, { useContext, useState } from "react";
import { CartContext } from "../../../src/components/context/CartContext";
import { Modal, Button, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

function Checkout() {
  const { cartItems, setCartItems } = useContext(CartContext);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    nic: "",
    city: "",
    address: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
  });

  const handleQuantityChange = (id, delta) => {
    const updatedCart = cartItems.map((item) =>
      item.id === id
        ? { ...item, quantity: Math.max(1, item.quantity + delta) }
        : item
    );
    setCartItems(updatedCart);
  };

  const handleRemove = (id) => {
    const updatedCart = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedCart);
  };

  const totalItems = cartItems.reduce(
    (sum, item) => sum + (item.quantity || 1),
    0
  );
  const totalPrice = cartItems.reduce(
    (sum, item) =>
      sum + (item.quantity || 1) * parseFloat(item.price.replace("$", "")),
    0
  );

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (cartItems.length === 0) {
      alert("Cart is empty!");
      return;
    }

    setLoading(true);
    try {
      await axios.post("http://localhost:5000/api/checkout", {
        customer: formData,
        items: cartItems,
        total: totalPrice,
      });

      alert("✅ Order placed successfully!");
      setCartItems([]);
      setFormData({
        name: "",
        email: "",
        phone: "",
        nic: "",
        city: "",
        address: "",
        cardNumber: "",
        expiry: "",
        cvv: "",
      });
      setShowModal(false);
    } catch (err) {
      console.error(err);
      alert("❌ Checkout failed!");
    }
    setLoading(false);
  };

  return (
    <div className="container py-5">
      <h2 className="mb-4 text-center">
        <i className="bi bi-cart"></i> Your Shopping Cart
      </h2>

      <div className="row">
        {/* Cart Table */}
        <div className="col-md-8">
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Image</th>
                <th>Product</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
                <th>Remove</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => (
                <tr key={item.id}>
                  <td>
                    <img
                      src={item.image}
                      alt={item.name}
                      style={{
                        width: "80px",
                        height: "80px",
                        objectFit: "cover",
                      }}
                    />
                  </td>
                  <td>
                    <strong>{item.name}</strong>
                    <br />
                    <small>{item.description}</small>
                  </td>
                  <td>{item.price}</td>
                  <td>
                    <div className="d-flex align-items-center">
                      <button
                        className="btn btn-sm btn-secondary me-2"
                        onClick={() => handleQuantityChange(item.id, -1)}
                      >
                        -
                      </button>
                      <input
                        type="text"
                        className="form-control form-control-sm text-center"
                        value={item.quantity || 1}
                        readOnly
                        style={{ width: "50px" }}
                      />
                      <button
                        className="btn btn-sm btn-secondary ms-2"
                        onClick={() => handleQuantityChange(item.id, 1)}
                      >
                        +
                      </button>
                    </div>
                  </td>
                  <td>
                    $
                    {(
                      (item.quantity || 1) *
                      parseFloat(item.price.replace("$", ""))
                    ).toFixed(2)}
                  </td>
                  <td>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleRemove(item.id)}
                    >
                      <i className="bi bi-trash"></i>
                    </button>
                  </td>
                </tr>
              ))}
              {cartItems.length === 0 && (
                <tr>
                  <td colSpan="6" className="text-center">
                    Your cart is empty
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Order Summary */}
        <div className="col-md-4">
          <div className="card p-3 shadow-sm">
            <h5>Order Summary</h5>
            <hr />
            <p>
              Total Items: <strong>{totalItems}</strong>
            </p>
            <p>
              Total Price: <strong>${totalPrice.toFixed(2)}</strong>
            </p>

            <Button
              variant="success"
              className="w-100"
              onClick={() => setShowModal(true)}
              disabled={cartItems.length === 0}
            >
              Proceed to Checkout
            </Button>
          </div>
        </div>
      </div>

      {/* Checkout Modal */}
      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        size="lg"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Checkout Form</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <h6>Enter Your Details</h6>
            <Form.Group className="mb-2">
              <Form.Control
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Control
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Control
                type="text"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Control
                type="text"
                name="nic"
                placeholder="NIC Number"
                value={formData.nic}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Control
                type="text"
                name="city"
                placeholder="City"
                value={formData.city}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Control
                as="textarea"
                rows={2}
                name="address"
                placeholder="Address"
                value={formData.address}
                onChange={handleChange}
              />
            </Form.Group>

            <h6 className="mt-3">Payment Details</h6>
            <Form.Group className="mb-2">
              <Form.Control
                type="text"
                name="cardNumber"
                placeholder="Card Number"
                value={formData.cardNumber}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <div className="row">
              <div className="col-6 mb-2">
                <Form.Control
                  type="text"
                  name="expiry"
                  placeholder="MM/YY"
                  value={formData.expiry}
                  onChange={handleChange}
                />
              </div>
              <div className="col-6 mb-2">
                <Form.Control
                  type="text"
                  name="cvv"
                  placeholder="CVV"
                  value={formData.cvv}
                  onChange={handleChange}
                />
              </div>
            </div>

            <Button
              type="submit"
              variant="primary"
              className="w-100"
              disabled={loading}
            >
              {loading ? "Placing Order..." : "Submit Order"}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default Checkout;

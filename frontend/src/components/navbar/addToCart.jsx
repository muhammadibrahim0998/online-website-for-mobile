import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";

function AddToCart() {
  const navigate = useNavigate();
  const { cartItems, removeFromCart, increaseQty, decreaseQty, clearCart, getTotal } = useContext(CartContext);
  const { user } = useContext(AuthContext);

  const [shippingAddress, setShippingAddress] = useState(user?.address || "");
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  const handleNextStep = () => {
    if (step === 2 && !shippingAddress) {
      alert("Please provide a shipping address.");
      return;
    }
    setStep(step + 1);
  };

  const handlePlaceOrder = async (orderData) => {
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:5000/api/orders", {
        customerName: user?.name || "Guest",
        customerEmail: user?.email || "guest@example.com",
        totalAmount: getTotal(),
        items: cartItems.map(item => ({
          name: item.name,
          price: parseFloat(item.price.replace("Rs.", "")),
          quantity: item.qty,
          image: item.image
        })),
        shippingAddress,
        paymentMethod: orderData.method,
        stripePaymentId: orderData.stripeId
      });

      alert("Success! Your order has been placed.");
      clearCart();
      navigate("/dashboard");
    } catch (err) {
      alert("Order failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="container py-5 text-center">
        <div className="mb-4 text-muted rounded-circle bg-light d-inline-flex align-items-center justify-content-center" style={{ width: "100px", height: "100px" }}>
          <i className="bi bi-cart-x fs-1"></i>
        </div>
        <h2 className="fw-bold">Your cart is empty</h2>
        <p className="text-muted">Looks like you haven't added anything yet.</p>
        <button onClick={() => navigate("/")} className="btn btn-primary px-5 rounded-pill py-2 fw-bold mt-3 shadow-sm">Shop Now</button>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <div className="row g-5">
        <div className="col-lg-8">
          {step === 1 && (
            <div className="card border-0 shadow-sm p-4 rounded-4">
              <h4 className="fw-bold mb-4">🛒 Shopping Cart ({cartItems.length})</h4>
              {cartItems.map(item => (
                <div key={item.id} className="d-flex align-items-center mb-4 border-bottom pb-4">
                  <img src={item.image} alt={item.name} className="img-fluid rounded border p-1 bg-white" style={{ width: "80px", height: "80px", objectFit: "contain" }} />
                  <div className="ms-4 flex-grow-1">
                    <h6 className="fw-bold mb-1">{item.name}</h6>
                    <div className="text-primary fw-bold mb-2">Rs.{item.price}</div>
                    <div className="d-flex align-items-center gap-2">
                      <button className="btn btn-sm btn-light border rounded-circle" onClick={() => decreaseQty(item.id)}>-</button>
                      <span className="fw-bold mx-2">{item.qty}</span>
                      <button className="btn btn-sm btn-light border rounded-circle" onClick={() => increaseQty(item.id)}>+</button>
                    </div>
                  </div>
                  <button className="btn text-danger ms-3" onClick={() => removeFromCart(item.id)}><i className="bi bi-trash"></i></button>
                </div>
              ))}
              <div className="text-end">
                <button onClick={handleNextStep} className="btn btn-primary px-5 rounded-pill py-2 fw-bold shadow-sm">Checkout Next <i className="bi bi-arrow-right ms-2"></i></button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="card border-0 shadow-sm p-4 rounded-4 animate__animated animate__fadeIn">
              <h4 className="fw-bold mb-4">📍 Shipping Address</h4>
              <div className="mb-4">
                <label className="form-label small fw-bold text-muted">Full Delivery Address</label>
                <textarea 
                  className="form-control rounded-4 p-3" 
                  rows="4" 
                  placeholder="Street, City, Province, Zip code..."
                  value={shippingAddress}
                  onChange={(e) => setShippingAddress(e.target.value)}
                ></textarea>
              </div>
              <div className="d-flex justify-content-between">
                <button onClick={() => setStep(1)} className="btn btn-light px-4 rounded-pill">Back</button>
                <button onClick={handleNextStep} className="btn btn-primary px-5 rounded-pill py-2 fw-bold shadow-sm">Continue to Payment</button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="card border-0 shadow-sm p-4 rounded-4 animate__animated animate__fadeIn">
              <h4 className="fw-bold mb-4">💳 Payment Selection</h4>
              <p className="text-muted small mb-4">Choose your preferred payment method to complete the purchase.</p>
              
              <div className="row g-3">
                <div className="col-12">
                  <button onClick={() => navigate("/checkout")} className="btn btn-outline-primary w-100 p-4 rounded-4 text-start d-flex align-items-center shadow-sm">
                    <i className="bi bi-credit-card-2-front fs-2 me-3"></i>
                    <div>
                      <div className="fw-bold">Pay with ATM / Credit Card</div>
                      <div className="small text-muted">Secure real-time transaction via Stripe</div>
                    </div>
                    <i className="bi bi-chevron-right ms-auto fs-4"></i>
                  </button>
                </div>
                <div className="col-12">
                  <button onClick={() => handlePlaceOrder({ method: "Cash on Delivery" })} className="btn btn-outline-secondary w-100 p-4 rounded-4 text-start d-flex align-items-center border-dashed" disabled={loading}>
                    <i className="bi bi-truck fs-2 me-3"></i>
                    <div>
                      <div className="fw-bold">Cash on Delivery</div>
                      <div className="small text-muted">Pay the driver when your phone arrives</div>
                    </div>
                  </button>
                </div>
              </div>
              
              <button onClick={() => setStep(2)} className="btn btn-light px-4 rounded-pill mt-4">Back to Shipping</button>
            </div>
          )}
        </div>

        <div className="col-lg-4">
          <div className="card border-0 shadow-sm p-4 rounded-4 bg-light">
            <h5 className="fw-bold mb-4">Order Summary</h5>
            <div className="d-flex justify-content-between mb-2">
              <span className="text-muted">Subtotal</span>
              <span className="fw-bold">Rs.{getTotal().toFixed(2)}</span>
            </div>
            <div className="d-flex justify-content-between mb-2">
              <span className="text-muted">Shipping</span>
              <span className="text-success fw-bold">FREE</span>
            </div>
            <hr />
            <div className="d-flex justify-content-between mb-4">
              <span className="fw-bold fs-5">Total</span>
              <span className="fw-bold fs-5 text-primary">Rs.{getTotal().toFixed(2)}</span>
            </div>
            <p className="small text-muted mb-0"><i className="bi bi-shield-check me-2"></i> Guaranteed safe and secure checkout.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddToCart;

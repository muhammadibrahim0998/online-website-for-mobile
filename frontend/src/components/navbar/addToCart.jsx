import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../../../src/components/context/CartContext";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

function AddToCart() {
  const navigate = useNavigate();
  const {
    cartItems,
    removeFromCart,
    increaseQty,
    decreaseQty,
    clearCart,
    getTotal,
  } = useContext(CartContext);

  const [step, setStep] = useState(1); // Step state
  const [shippingAddress, setShippingAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Cash on Delivery");

  // Credit card details
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");

  // 🔹 Simulate Payment without backend
  const processPayment = async () => {
    switch (paymentMethod) {
      case "Cash on Delivery":
        return true;
      case "EasyPesa":
        alert(`Send $${getTotal().toFixed(2)} to EasyPesa number: 03098216202`);
        return true;
      case "Bank Transfer":
        alert(
          `Transfer $${getTotal().toFixed(
            2
          )} to Bank Account: 123456789, ABC Bank`
        );
        return true;
      case "Credit Card":
        if (!cardNumber || !expiry || !cvv) {
          alert("Please fill in all credit card details!");
          return false;
        }
        alert(`Charging card ${cardNumber} for $${getTotal().toFixed(2)}`);
        return true;
      default:
        return false;
    }
  };

  const handlePlaceOrder = async () => {
    if (!shippingAddress) {
      alert("Please enter your shipping address!");
      return;
    }

    const paymentSuccess = await processPayment();
    if (!paymentSuccess) return;

    try {
      const orderData = {
        customerName: "Guest User",
        customerEmail: "guest@example.com",
        totalAmount: getTotal(),
        items: cartItems,
        shippingAddress,
        paymentMethod,
      };

      const response = await axios.post(
        "http://localhost:5000/api/orders",
        orderData
      );

      if (response.status === 201) {
        alert("✅ Order placed successfully!");
        clearCart();
        navigate("/");
      }
    } catch (error) {
      console.error("Error placing order:", error);
      alert("Something went wrong while placing the order.");
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center">🛒 Shopping Cart</h2>

      {cartItems.length === 0 ? (
        <div className="alert alert-info text-center">
          Your cart is empty. Go back and add some products!
        </div>
      ) : (
        <div className="row">
          <div className="col-lg-8 col-md-12 mb-4">
            {/* Step 1: Cart */}
            {step === 1 && (
              <>
                <div className="table-responsive shadow-sm">
                  <table className="table table-bordered align-middle mb-0">
                    <thead className="table-light">
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
                                width: 70,
                                height: 70,
                                objectFit: "cover",
                                borderRadius: "5px",
                              }}
                            />
                          </td>
                          <td>
                            <strong>{item.name}</strong>
                            <br />
                            <small className="text-muted">
                              {item.description}
                            </small>
                          </td>
                          <td>{item.price}</td>
                          <td>
                            <div className="d-flex align-items-center">
                              <button
                                className="btn btn-sm btn-outline-secondary"
                                onClick={() => decreaseQty(item.id)}
                              >
                                −
                              </button>
                              <span className="mx-2">{item.qty || 1}</span>
                              <button
                                className="btn btn-sm btn-outline-secondary"
                                onClick={() => increaseQty(item.id)}
                              >
                                +
                              </button>
                            </div>
                          </td>
                          <td>
                            $
                            {(
                              (parseFloat(
                                item.price.replace(/[^0-9.-]+/g, "")
                              ) || 0) * (item.qty || 1)
                            ).toFixed(2)}
                          </td>
                          <td>
                            <button
                              className="btn btn-sm btn-danger"
                              onClick={() => removeFromCart(item.id)}
                            >
                              <i className="bi bi-trash"></i>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <button
                  className="btn btn-warning mt-3 me-2"
                  onClick={clearCart}
                >
                  Clear Cart
                </button>
                <button
                  className="btn btn-primary mt-3"
                  onClick={() => setStep(2)}
                >
                  Proceed to Checkout
                </button>
              </>
            )}

            {/* Step 2: Shipping */}
            {step === 2 && (
              <div className="card shadow-sm p-3">
                <h5 className="mb-3">Shipping Address</h5>
                <textarea
                  className="form-control mb-3"
                  rows="3"
                  value={shippingAddress}
                  onChange={(e) => setShippingAddress(e.target.value)}
                  placeholder="Enter your delivery address..."
                />
                <button
                  className="btn btn-secondary me-2"
                  onClick={() => setStep(1)}
                >
                  Back
                </button>
                <button className="btn btn-primary" onClick={() => setStep(3)}>
                  Continue to Payment
                </button>
              </div>
            )}

            {/* Step 3: Payment */}
            {step === 3 && (
              <div className="card shadow-sm p-3">
                <h5 className="mb-3">Payment Method</h5>
                <select
                  className="form-select mb-3"
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                >
                  <option value="Cash on Delivery">Cash on Delivery</option>
                  <option value="Credit Card">Credit Card</option>
                  <option value="Bank Transfer">Bank Transfer</option>
                  <option value="EasyPesa">EasyPesa</option>
                </select>

                {/* Conditional UI for payment */}
                {paymentMethod === "Credit Card" && (
                  <div className="mb-3">
                    <input
                      type="text"
                      className="form-control mb-2"
                      placeholder="Card Number"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                    />
                    <input
                      type="text"
                      className="form-control mb-2"
                      placeholder="Expiry (MM/YY)"
                      value={expiry}
                      onChange={(e) => setExpiry(e.target.value)}
                    />
                    <input
                      type="text"
                      className="form-control"
                      placeholder="CVV"
                      value={cvv}
                      onChange={(e) => setCvv(e.target.value)}
                    />
                  </div>
                )}

                {paymentMethod === "EasyPesa" && (
                  <div className="mb-3">
                    <p>
                      Send <strong>${getTotal().toFixed(2)}</strong> to EasyPesa
                      Number:
                      <strong> 03098216202</strong>
                    </p>
                  </div>
                )}

                {paymentMethod === "Bank Transfer" && (
                  <div className="mb-3">
                    <p>
                      Transfer <strong>${getTotal().toFixed(2)}</strong> to Bank
                      Account:
                      <strong> 123456789, ABC Bank</strong>
                    </p>
                  </div>
                )}

                <button
                  className="btn btn-secondary me-2"
                  onClick={() => setStep(2)}
                >
                  Back
                </button>
                <button className="btn btn-success" onClick={handlePlaceOrder}>
                  Place Order
                </button>
              </div>
            )}
          </div>

          {/* Order Summary */}
          <div className="col-lg-4 col-md-12">
            <div className="card shadow-sm p-3">
              <h5 className="mb-3">Order Summary</h5>
              <p className="d-flex justify-content-between">
                <span>Total Items:</span>
                <strong>
                  {cartItems.reduce((acc, item) => acc + (item.qty || 1), 0)}
                </strong>
              </p>
              <p className="d-flex justify-content-between">
                <span>Total Price:</span>
                <strong>${getTotal().toFixed(2)}</strong>
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AddToCart;

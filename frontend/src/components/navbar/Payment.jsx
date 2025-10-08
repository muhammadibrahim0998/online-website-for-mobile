import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Payment() {
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState("Credit Card");

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("paymentMethod", paymentMethod);
    navigate("/placeorder");
  };

  return (
    <div className="container py-5" style={{ maxWidth: "500px" }}>
      <h2 className="mb-4 text-center">Payment</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-check mb-2">
          <input
            className="form-check-input"
            type="radio"
            name="paymentMethod"
            value="Credit Card"
            checked={paymentMethod === "Credit Card"}
            onChange={(e) => setPaymentMethod(e.target.value)}
          />
          <label className="form-check-label">Credit Card</label>
        </div>
        <div className="form-check mb-4">
          <input
            className="form-check-input"
            type="radio"
            name="paymentMethod"
            value="Cash on Delivery"
            checked={paymentMethod === "Cash on Delivery"}
            onChange={(e) => setPaymentMethod(e.target.value)}
          />
          <label className="form-check-label">Cash on Delivery</label>
        </div>
        <button type="submit" className="btn btn-warning w-100">
          Continue
        </button>
      </form>
    </div>
  );
}

export default Payment;

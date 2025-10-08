import React, { useContext } from "react";
import { CartContext } from "../../../src/components/context/CartContext";

function PlaceOrder() {
  const { cartItems, getTotal, clearCart } = useContext(CartContext);

  const shipping = JSON.parse(localStorage.getItem("shipping"));
  const paymentMethod = localStorage.getItem("paymentMethod");

  const placeOrder = () => {
    alert("✅ Order placed successfully!");
    clearCart();
  };

  return (
    <div className="container py-5">
      <h2 className="mb-4 text-center">Place Order</h2>

      <div className="row">
        <div className="col-md-8">
          <h5>Shipping</h5>
          <p>
            {shipping.address}, {shipping.city}, {shipping.postalCode},{" "}
            {shipping.country}
          </p>
          <hr />
          <h5>Payment Method</h5>
          <p>{paymentMethod}</p>
          <hr />
          <h5>Items</h5>
          <ul className="list-group">
            {cartItems.map((item) => (
              <li
                key={item.id}
                className="list-group-item d-flex justify-content-between"
              >
                <span>
                  {item.name} x {item.qty}
                </span>
                <strong>{item.price}</strong>
              </li>
            ))}
          </ul>
        </div>

        <div className="col-md-4">
          <div className="card p-3 shadow-sm">
            <h5>Order Summary</h5>
            <p>Total Items: {cartItems.length}</p>
            <p>Total Price: ${getTotal().toFixed(2)}</p>
            <button className="btn btn-success w-100" onClick={placeOrder}>
              Place Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PlaceOrder;

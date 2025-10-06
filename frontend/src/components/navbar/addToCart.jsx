import React, { useContext } from "react";
import { CartContext } from "../../components/context/CartContext";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

function AddToCart() {
  const {
    cartItems,
    removeFromCart,
    increaseQty,
    decreaseQty,
    clearCart,
    getTotal,
  } = useContext(CartContext);

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center">🛒 Your Shopping Cart</h2>

      {cartItems.length === 0 ? (
        <div className="alert alert-info text-center">
          Your cart is empty. Go back and add some products!
        </div>
      ) : (
        <div className="row">
          {/* Cart Items Table */}
          <div className="col-lg-8 col-md-12 mb-4">
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
                        <small className="text-muted">{item.description}</small>
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
                          (parseFloat(item.price.replace(/[^0-9.-]+/g, "")) ||
                            0) * (item.qty || 1)
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

            <button className="btn btn-warning mt-3" onClick={clearCart}>
              Clear Cart
            </button>
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
              <button className="btn btn-success w-100">
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AddToCart;

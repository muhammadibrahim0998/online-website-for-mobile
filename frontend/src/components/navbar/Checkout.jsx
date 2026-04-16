import React, { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Checkout() {
  const { cartItems, getTotal, clearCart } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const total = getTotal();

  const [customer, setCustomer] = useState({ 
    name: user?.name || "", 
    email: user?.email || "",
    address: user?.address || ""
  });

  const [paymentData, setPaymentData] = useState({
    senderCard: "",
    expiryDate: "",
    cvv: "",
    receiverAccount: ""
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPaymentData({ ...paymentData, [name]: value });
  };

  const handleTransfer = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // 1. Simulate the P2P Transfer (Via Webhook logic on backend)
      const transferResponse = await axios.post("http://localhost:5000/api/orders/simulated-transfer", {
        senderCard: paymentData.senderCard,
        receiverAccount: paymentData.receiverAccount,
        amount: total,
        senderName: customer.name
      });

      if (transferResponse.data.success) {
        // 2. Save order to database
        await axios.post("http://localhost:5000/api/orders", {
          customerName: customer.name || "P2P Guest",
          customerEmail: customer.email || "guest@p2p.com",
          totalAmount: total,
          items: cartItems.map(item => ({
            name: item.name,
            price: typeof item.price === 'string' ? parseFloat(item.price.replace("Rs.", "")) : item.price,
            quantity: item.qty,
            image: item.image
          })),
          shippingAddress: customer.address || "Local P2P Delivery",
          paymentMethod: "P2P Transfer",
          transactionId: transferResponse.data.transactionId
        });

        alert("✅ Transfer Success! Order Placed via Secure Webhook Simulation.");
        clearCart();
        navigate("/dashboard");
      }
    } catch (err) {
      console.error(err);
      setError("Transfer failed. Please check backend logs or connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-5 d-flex justify-content-center">
      <div className="w-100" style={{ maxWidth: "550px" }}>
        <form onSubmit={handleTransfer} className="card border-0 shadow-lg p-4 rounded-4 animate__animated animate__fadeInUp bg-white">
          <h3 className="text-center mb-4 fw-bold text-primary">Secure P2P Transfer</h3>
          
          <div className="row align-items-center text-center mb-5">
            <div className="col-4">
              <div className="transfer-avatar-circle mx-auto mb-2 bg-light">
                <i className="bi bi-person-fill fs-3 text-primary"></i>
              </div>
              <div className="fw-bold small">SENDER</div>
              <div className="text-muted extra-small">{customer.name || "Anonymous"}</div>
            </div>
            <div className="col-4 position-relative">
              <div className="h-2px bg-primary bg-opacity-10 position-absolute top-50 start-0 end-0"></div>
              <div className="badge bg-primary rounded-pill p-2 px-3 shadow-sm">Rs.{total.toFixed(2)}</div>
            </div>
            <div className="col-4">
              <div className="transfer-avatar-circle mx-auto mb-2 bg-success text-white">
                <i className="bi bi-wallet2 fs-3"></i>
              </div>
              <div className="fw-bold small">RECEIVER</div>
              <div className="text-muted extra-small">MobiZone Ops</div>
            </div>
          </div>

          <div className="mb-4">
            <label className="form-label small fw-bold text-muted">Receiver Account / Card Number (Target)</label>
            <input
              type="text"
              name="receiverAccount"
              className="form-control rounded-pill px-3 bg-light border-0"
              placeholder="Enter receiver account number"
              value={paymentData.receiverAccount}
              onChange={handleInputChange}
              required
            />
          </div>

          <hr className="my-4 opacity-10" />

          <div className="mb-3">
            <label className="form-label small fw-bold text-muted">My Card Information (Sender)</label>
            <input
              type="text"
              name="senderCard"
              className="form-control rounded-pill px-3 mb-2"
              placeholder="Card Number (16 digits)"
              maxLength="16"
              value={paymentData.senderCard}
              onChange={handleInputChange}
              required
            />
            <div className="row g-2">
              <div className="col-6">
                <input
                  type="text"
                  name="expiryDate"
                  className="form-control rounded-pill px-3"
                  placeholder="MM/YY"
                  maxLength="5"
                  value={paymentData.expiryDate}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="col-6">
                <input
                  type="password"
                  name="cvv"
                  className="form-control rounded-pill px-3"
                  placeholder="CVV"
                  maxLength="3"
                  value={paymentData.cvv}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
          </div>

          <div className="mb-4 text-center">
            <p className="text-muted small">The transfer will be processed securely via our localized P2P node.</p>
          </div>

          {error && <div className="alert alert-danger small p-2 text-center rounded-pill mb-3">{error}</div>}

          <button className="btn btn-primary w-100 rounded-pill py-3 fw-bold shadow-sm mb-3 d-flex align-items-center justify-content-center gap-2" type="submit" disabled={loading}>
            {loading ? (
              <><span className="spinner-border spinner-border-sm"></span> Processing Transfer...</>
            ) : (
              <><i className="bi bi-shield-lock-fill me-1"></i> SEND Rs.{total.toFixed(2)} NOW</>
            )}
          </button>

          <div className="d-flex align-items-center justify-content-center gap-2 text-muted small mt-2">
            <i className="bi bi-lock-fill"></i> P2P Node Encrypted
          </div>
        </form>
        
        <div className="text-center mt-4">
          <img src="https://help.zazzle.com/hc/article_attachments/360010513993/Logos-01.png" alt="Payment Methods" style={{ height: "40px", opacity: 0.7 }} />
        </div>
      </div>

      <style>{`
        .transfer-avatar-circle {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 6px rgba(0,0,0,0.05);
        }
        .extra-small {
          font-size: 0.75rem;
        }
        .h-2px {
          height: 2px;
        }
      `}</style>
    </div>
  );
}

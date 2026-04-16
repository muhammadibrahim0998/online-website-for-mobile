import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";

const Payment = () => {
  const navigate = useNavigate();
  const { cartItems, clearCart } = useContext(CartContext);
  const { user } = useContext(AuthContext);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);

  // Transfer states for simulated P2P flow
  const [transferData, setTransferData] = useState({
    name: "MobiZone Admin",
    receiverAccount: "9876 5432 1098 7654",
    senderCard: "",
    expiryDate: "",
    cvv: ""
  });

  useEffect(() => {
    const total = cartItems.reduce((acc, item) => acc + (item.price * (item.qty || 1)), 0);
    setTotalPrice(total);
  }, [cartItems]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTransferData({ ...transferData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (transferData.senderCard.length < 16) {
      setError("Please enter a valid 16-digit sender card number.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // 1. Trigger Simulated P2P Transfer (Via Webhook logic)
      const { data } = await axios.post("http://localhost:5000/api/simulated-transfer", {
        senderCard: transferData.senderCard,
        receiverAccount: transferData.receiverAccount,
        amount: totalPrice,
        senderName: user?.name || "Customer"
      });

      if (data.success) {
        // 2. Simulate Webhook processing delay
        setTimeout(async () => {
          setSuccess(true);
          setLoading(false);
          
          // 3. Save Order to Database
          await axios.post("http://localhost:5000/api/orders", {
            customerName: user?.name || "Customer",
            customerEmail: user?.email || "customer@example.com",
            totalAmount: totalPrice,
            items: cartItems.map(item => ({
              name: item.name,
              price: item.price,
              quantity: item.qty,
              image: item.image
            })),
            paymentMethod: "Localized P2P (Webhook Processed)",
            transactionId: data.transactionId
          });

          setTimeout(() => {
            clearCart();
            navigate("/dashboard");
          }, 2000);
        }, 1500);
      }
    } catch (err) {
      console.error("❌ Transfer Error:", err);
      setError("Cloud transfer failed. Please check your connection.");
      setLoading(false);
    }
  };

  return (
    <div className="container py-5 min-vh-80 d-flex align-items-center justify-content-center">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }} 
        animate={{ opacity: 1, scale: 1 }}
        className="payment-card-container w-100" 
        style={{ maxWidth: "800px" }}
      >
        <div className="card border-0 shadow-lg overflow-hidden" style={{ borderRadius: "30px", background: "rgba(255,255,255,0.95)", backdropFilter: "blur(20px)" }}>
          
          <div className="card-header bg-dark p-4 text-white text-center border-0">
            <h3 className="fw-bold mb-0">Localized P2P Transfer</h3>
            <p className="small opacity-75 mb-0">Secure Cloud Webhook Verification</p>
          </div>

          <div className="card-body p-4 p-md-5">
            
            {/* Visual Transfer Map */}
            <div className="row align-items-center text-center mb-5">
              <div className="col-4">
                <div className="transfer-avatar-circle mx-auto mb-2 border-primary">
                  <i className="bi bi-person-fill fs-2 text-primary"></i>
                </div>
                <div className="fw-bold small text-truncate">SENDER</div>
                <div className="text-muted" style={{ fontSize: "0.7rem" }}>MY ACCOUNT</div>
              </div>
              
              <div className="col-4 position-relative">
                <div className="transfer-arrow-line">
                  <motion.div 
                    animate={{ left: ["0%", "100%"] }} 
                    transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                    className="transfer-dot"
                  />
                </div>
                <div className="mt-3 badge bg-primary rounded-pill px-3 py-2 fs-6 shadow-sm">
                  Rs.{totalPrice.toFixed(2)}
                </div>
              </div>

              <div className="col-4">
                <div className="transfer-avatar-circle mx-auto mb-2 bg-success text-white border-success">
                  <i className="bi bi-wallet2 fs-2"></i>
                </div>
                <div className="fw-bold small text-truncate">RECEIVER</div>
                <div className="text-muted" style={{ fontSize: "0.7rem" }}>LOCAL NODE</div>
              </div>
            </div>

            <form onSubmit={handleSubmit}>
              
              <div className="row mb-4">
                <div className="col-md-6 mb-3">
                  <label className="form-label fw-bold small">TARGET RECEIVER</label>
                  <input 
                    type="text" 
                    className="form-control rounded-4 p-3 bg-light border-0" 
                    value={transferData.name}
                    readOnly
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label fw-bold small">RECEIVER ACCOUNT</label>
                  <input 
                    type="text" 
                    className="form-control rounded-4 p-3 bg-light border-0" 
                    value={transferData.receiverAccount}
                    readOnly
                  />
                </div>
              </div>

              <hr className="my-4 opacity-10" />

              <div className="mb-5">
                <label className="form-label fw-bold mb-3 d-flex justify-content-between">
                  <span>MY CARD DETAILS (SENDER)</span>
                  <div className="d-flex gap-2 text-primary">
                    <i className="bi bi-shield-check"></i>
                    <i className="bi bi-stars"></i>
                  </div>
                </label>
                
                <div className="p-4 rounded-4 bg-light border-dashed">
                  <div className="row g-3">
                    <div className="col-12">
                      <input
                        type="text"
                        name="senderCard"
                        className="form-control rounded-pill p-3 border-0 shadow-sm"
                        placeholder="16-Digit Card Number"
                        maxLength="16"
                        required
                        value={transferData.senderCard}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="col-6">
                      <input
                        type="text"
                        name="expiryDate"
                        className="form-control rounded-pill p-3 border-0 shadow-sm"
                        placeholder="MM/YY"
                        maxLength="5"
                        required
                        value={transferData.expiryDate}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="col-6">
                      <input
                        type="password"
                        name="cvv"
                        className="form-control rounded-pill p-3 border-0 shadow-sm"
                        placeholder="CVV"
                        maxLength="3"
                        required
                        value={transferData.cvv}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                </div>
                
                <div className="mt-3 text-muted small text-center bg-blue-light p-2 rounded-pill">
                  <i className="bi bi-cpu-fill me-1 text-primary"></i> Local Pakistani Node Processing Activated
                </div>
              </div>

              <AnimatePresence>
                {error && (
                  <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="alert alert-danger rounded-4 py-3 mb-4 shadow-sm text-center">
                    <i className="bi bi-exclamation-octagon-fill me-2"></i> {error}
                  </motion.div>
                )}
                {success && (
                  <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="alert alert-success rounded-4 py-4 text-center mb-4 shadow-sm border-0 bg-success text-white">
                    <i className="bi bi-check-circle-fill fs-3 d-block mb-2"></i>
                    <div className="fw-bold fs-4">TRANSFER CONFIRMED!</div>
                    <div className="small">Cloud Webhook matched. Order is processing.</div>
                  </motion.div>
                )}
              </AnimatePresence>

              {!success && (
                <button 
                  type="submit" 
                  disabled={loading}
                  className={`btn btn-3d-premium w-100 py-3 fs-5 ${loading ? "opacity-75" : ""}`}
                >
                  {loading ? (
                    <><span className="spinner-border spinner-border-sm me-2"></span> Waiting for Webhook...</>
                  ) : (
                    <><i className="bi bi-cloud-arrow-up-fill me-2"></i> INITIATE WEBHOOK TRANSFER (Rs.{totalPrice.toFixed(2)})</>
                  )}
                </button>
              )}
            </form>

            <div className="mt-4 text-center opacity-50">
              <span className="small fw-bold letter-spacing-1">LOCALIZED SECURE NODE</span>
            </div>
          </div>
        </div>
      </motion.div>

      <style>{`
        .payment-card-container { perspective: 1000px; }
        .transfer-avatar-circle {
          width: 70px; height: 70px; background: #fff;
          border-radius: 50%; display: flex; align-items: center; justify-content: center;
          box-shadow: 0 8px 20px rgba(0,0,0,0.08); border: 2px solid #0d6efd;
        }
        .transfer-arrow-line {
          height: 6px; background: #f1f3f5; border-radius: 10px; margin: 20px 10px 0;
          overflow: hidden; position: relative;
        }
        .transfer-dot {
          position: absolute; width: 30px; height: 100%;
          background: #0d6efd; box-shadow: 0 0 15px #0d6efd; border-radius: 5px;
        }
        .border-dashed { border: 2px dashed #0d6efd66; }
        .min-vh-80 { min-height: 80vh; }
        .bg-blue-light { background: #f0f7ff; }
        .letter-spacing-1 { letter-spacing: 2px; }
      `}</style>
    </div>
  );
};

export default Payment;

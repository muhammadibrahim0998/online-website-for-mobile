import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";

const Sumsing = () => {
  const { user } = useContext(AuthContext);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/products?category=samsung");
      setProducts(res.data);
    } catch (err) {
      console.error("Error fetching Samsung:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="text-center py-5"><div className="spinner-border text-primary"></div></div>;

  return (
    <div className="container py-5">
      <h2 className="fw-bold mb-4 text-primary">Samsung Collection</h2>
      <div className="row g-4">
        {products.map((p, index) => (
          <motion.div 
            key={p._id} 
            className="col-6 col-md-4 col-lg-3"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <div className="card h-100 border-0 shadow-sm">
              <div className="p-3 text-center bg-light rounded-top" style={{ height: "200px" }}>
                <img src={p.image} className="img-fluid h-100 object-fit-contain" alt={p.name} />
              </div>
              <div className="card-body text-center d-flex flex-column">
                <h6 className="fw-bold mb-2">{p.name}</h6>
                <p className="small text-muted flex-grow-1">{p.description.substring(0, 60)}...</p>
                <div className="fw-bold text-success mb-3 fs-5">Rs.{p.price}</div>
                
                {/* Hide purchase button for admins */}
                {(!user || user.role === "user") ? (
                  <button 
                    className="btn btn-3d-premium px-4 mx-auto d-block"
                    onClick={() => addToCart({ id: p._id, name: p.name, price: p.price.toString(), image: p.image })}
                  >
                    ADD TO CART
                  </button>
                ) : (
                  <div className="small text-muted py-2">Preview Mode (Admin)</div>
                )}
              </div>
            </div>
          </motion.div>
        ))}
        {products.length === 0 && <div className="col-12 text-center text-muted py-5">No Samsung phones available in store yet.</div>}
      </div>
    </div>
  );
};

export default Sumsing;

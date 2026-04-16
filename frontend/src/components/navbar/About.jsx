import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import "bootstrap/dist/css/bootstrap.min.css";

function About() {
  const [categories, setCategories] = useState({ iphone: [], samsung: [], vivo: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/products");
        const all = res.data;
        setCategories({
          iphone: all.filter(p => p.category === "iphone").slice(0, 4),
          samsung: all.filter(p => p.category === "samsung").slice(0, 4),
          vivo: all.filter(p => p.category === "vivo").slice(0, 4),
        });
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const CategorySection = ({ title, data, color }) => (
    <div className="mb-5 py-4 px-4 rounded-5" style={{ background: `${color}08`, border: `1px solid ${color}15` }}>
      <div className="d-flex align-items-center mb-4">
        <div className="p-2 rounded-3 me-3" style={{ background: color }}>
          <i className="bi bi- phone text-white"></i>
        </div>
        <h3 className="fw-bold mb-0" style={{ color: color }}>{title}</h3>
      </div>
      <div className="row g-4">
        {data.length > 0 ? data.map((p) => (
          <div key={p._id} className="col-6 col-md-3">
            <motion.div 
              whileHover={{ y: -5 }}
              className="card border-0 shadow-sm h-100 rounded-4 overflow-hidden"
            >
              <div className="p-3 text-center bg-light" style={{ height: "140px" }}>
                <img src={p.image} alt={p.name} className="img-fluid h-100 object-fit-contain" />
              </div>
              <div className="card-body p-3 text-center">
                <h6 className="fw-bold mb-1 small">{p.name}</h6>
                <div className="text-primary fw-bold small">Rs.{p.price}</div>
              </div>
            </motion.div>
          </div>
        )) : (
          <div className="col-12 text-muted small text-center py-3">No products available in this category.</div>
        )}
      </div>
    </div>
  );

  if (loading) return null;

  return (
    <div className="container py-5">
      {/* Header */}
      <div className="text-center mb-5 pb-3">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="display-4 fw-bold mb-3"
        >
          Our <span className="text-primary">Premium</span> Collection
        </motion.h1>
        <p className="text-muted mx-auto" style={{ maxWidth: "600px" }}>
          Explore the best of technology from world-leading brands. We provide 100% genuine mobiles with official warranties.
        </p>
      </div>

      {/* Sections */}
      <div className="row">
        <div className="col-12">
          <CategorySection title="iPhone Series" data={categories.iphone} color="#000000" />
          <CategorySection title="Samsung Galaxy" data={categories.samsung} color="#0d6efd" />
          <CategorySection title="Vivo Smart" data={categories.vivo} color="#0dcaf0" />
        </div>
      </div>

      {/* Company Trust Section */}
      <div className="row mt-5 g-4">
        <div className="col-md-4">
          <div className="text-center p-4">
            <div className="bg-primary bg-opacity-10 text-primary rounded-circle d-inline-flex p-3 mb-3">
              <i className="bi bi-shield-check fs-2"></i>
            </div>
            <h5 className="fw-bold">Secured by Stripe</h5>
            <p className="text-muted small">Your payments are protected with top-tier security standards.</p>
          </div>
        </div>
        <div className="col-md-4">
          <div className="text-center p-4">
            <div className="bg-success bg-opacity-10 text-success rounded-circle d-inline-flex p-3 mb-3">
              <i className="bi bi-truck fs-2"></i>
            </div>
            <h5 className="fw-bold">Fast Delivery</h5>
            <p className="text-muted small">Get your new mobile delivered to your doorstep within 24 hours.</p>
          </div>
        </div>
        <div className="col-md-4">
          <div className="text-center p-4">
            <div className="bg-info bg-opacity-10 text-info rounded-circle d-inline-flex p-3 mb-3">
              <i className="bi bi-award fs-2"></i>
            </div>
            <h5 className="fw-bold">Original Brand</h5>
            <p className="text-muted small">We only sell original phones with valid local & international warranties.</p>
          </div>
        </div>
      </div>

      <footer className="text-center mt-5 pt-5 border-top text-muted small">
        © 2026 MobiZone - Ibrahim Mobile Store. All Rights Reserved.
      </footer>
    </div>
  );
}

export default About;

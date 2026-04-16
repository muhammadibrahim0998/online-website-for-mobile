import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [mobiles, setMobiles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFeatured();
  }, []);

  const fetchFeatured = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/products");
      if (res.data.length > 0) {
        setMobiles(res.data.slice(0, 5));
      } else {
        setMobiles([
          {
            _id: "default",
            name: "Premium Flagship Store",
            image: "https://www.apple.com/v/iphone-15-pro/c/images/overview/welcome/hero_endframe__ov6ewwmbhiu6_large.jpg",
            price: 999,
            description: "Experience the ultimate technology. Professional grade mobile phones for professional grade people.",
            category: "iphone"
          }
        ]);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (mobiles.length > 1) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % mobiles.length);
      }, 7000);
      return () => clearInterval(interval);
    }
  }, [mobiles]);

  if (loading) return null;

  const current = mobiles[currentIndex];

  const getAccentColor = (cat) => {
    if (cat === "iphone") return "#007aff";
    if (cat === "samsung") return "#0d6efd";
    if (cat === "vivo") return "#0dcaf0";
    return "#6610f2";
  };

  return (
    <div className="container-fluid p-0 overflow-hidden" style={{ background: "#f8f9fa", minHeight: "100vh" }}>
    <div className="container py-4">
      <div className="hero-viewport shadow-lg" style={{ 
        height: "80vh", 
        position: "relative", 
        overflow: "hidden", 
        background: "#f8f9fa",
        borderRadius: "30px", // Total slider border radius
        border: "1px solid rgba(0,0,0,0.05)"
      }}>
        
        {/* Soft Animated Background Gradients */}
        <div className="position-absolute w-100 h-100" style={{
          background: `radial-gradient(circle at 80% 20%, ${getAccentColor(current.category)}11 0%, transparent 60%), 
                      radial-gradient(circle at 20% 80%, ${getAccentColor(current.category)}05 0%, transparent 60%)`,
          zIndex: 0
        }}></div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            className="w-100 h-100 d-flex align-items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="container position-relative" style={{ zIndex: 2 }}>
              <div className="row align-items-center justify-content-center text-center text-lg-start">
                
                {/* Text Content */}
                <div className="col-lg-5 mb-5 mb-lg-0 ms-lg-5">
                  <motion.div
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                    className="p-4 p-lg-0"
                  >
                    <span className="badge px-3 py-2 rounded-pill mb-3" style={{ 
                      background: `${getAccentColor(current.category)}15`, 
                      color: getAccentColor(current.category),
                      fontSize: "0.8rem",
                      fontWeight: "700",
                      letterSpacing: "1px"
                    }}>
                      LATEST IN {current.category?.toUpperCase()}
                    </span>
                    <h1 className="display-3 fw-bold text-dark mb-4 tracking-tight" style={{ lineHeight: "1.1" }}>
                      {current.name}
                    </h1>
                    <p className="lead text-muted mb-4 pe-lg-5" style={{ fontSize: "1.1rem", fontWeight: "400" }}>
                      {current.description}
                    </p>
                    <div className="d-flex flex-column flex-sm-row gap-4 align-items-center">
                      <div className="d-flex align-items-baseline gap-2">
                        <span className="text-muted small">Only</span>
                        <span className="h1 fw-bold mb-0 text-dark">Rs.{current.price}</span>
                      </div>
                      <Link to={`/${current.category}`} className="btn btn-dark rounded-pill px-5 py-3 fw-bold shadow-sm hover-grow transition">
                        BUY NOW
                      </Link>
                    </div>
                  </motion.div>
                </div>

                {/* Mobile Image (Increased & Standardized Size) */}
                <div className="col-lg-6">
                  <div className="position-relative d-flex justify-content-center align-items-center mb-4">
                    {/* Soft Glow */}
                    <div className="position-absolute rounded-circle" style={{
                      width: "400px", height: "400px",
                      background: `${getAccentColor(current.category)}15`,
                      filter: "blur(80px)",
                      zIndex: -1
                    }}></div>

                    <motion.div
                      initial={{ scale: 0.9, opacity: 0, y: 20 }}
                      animate={{ scale: 1, opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, type: "spring" }}
                    >
                      <motion.img
                        src={current.image}
                        alt={current.name}
                        animate={{ y: [0, -15, 0] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        className="img-fluid"
                        style={{
                          height: "550px", // Standardized size for all images
                          width: "400px",
                          objectFit: "contain",
                          backgroundColor: "#fff", // White background for the card
                          borderRadius: "25px", // Image border radius
                          padding: "30px",
                          filter: "drop-shadow(0 15px 30px rgba(0,0,0,0.1))",
                          zIndex: 10
                        }}
                      />
                    </motion.div>
                  </div>
                </div>

              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Progress Bar Indicators */}
        <div className="position-absolute bottom-0 start-50 translate-middle-x mb-5 d-flex gap-3" style={{ zIndex: 10 }}>
          {mobiles.map((_, i) => (
            <div 
              key={i} 
              onClick={() => setCurrentIndex(i)}
              style={{
              width: currentIndex === i ? "40px" : "10px",
              height: "6px",
              background: currentIndex === i ? getAccentColor(current.category) : "#dee2e6",
              borderRadius: "10px",
              cursor: "pointer",
              transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)"
            }}></div>
          ))}
        </div>

      </div>
    </div>

      <style>{`
        .tracking-tight { letter-spacing: -2px; }
        .hover-grow:hover { transform: scale(1.05); }
        .transition { transition: all 0.3s ease; }
        @media (max-width: 991px) {
          .display-2 { font-size: 3rem; }
          .hero-viewport { height: 100vh; }
        }
      `}</style>
    </div>
  );
}

export default Home;

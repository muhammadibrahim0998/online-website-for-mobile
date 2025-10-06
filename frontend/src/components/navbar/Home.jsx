import React from "react";
import { motion } from "framer-motion";
import "bootstrap/dist/css/bootstrap.min.css";

// Side Images
const leftImage =
  "https://images.unsplash.com/photo-1607936854279-55e8a4c64888?w=500&auto=format&fit=crop&q=60"; // iPhone
const centerImage =
  "https://ketchamsupply.com/cdn/shop/files/1323531b30f07701fda43e12258fca2f-removebg-preview.png?v=1719323918&width=352";
const rightImage =
  "https://images.unsplash.com/photo-1607936854279-55e8a4c64888?w=500&auto=format&fit=crop&q=60"; // Samsung

// Demo Mobiles Array (100+ items)
const mobiles = Array.from({ length: 100 }, (_, i) => ({
  id: i + 1,
  name: i % 3 === 0 ? "iPhone" : i % 3 === 1 ? "Samsung" : "Vivo",
  price: `$${(300 + i * 5).toFixed(2)}`,
  description: "Stylish mobile with modern design and performance.",
  image:
    i % 3 === 0
      ? "https://m.media-amazon.com/images/I/61-r9zOKBCL._AC_SL1500_.jpg" // iPhone
      : i % 3 === 1
      ? "https://m.media-amazon.com/images/I/71QE00iB9IL._AC_SL1500_.jpg" // Samsung
      : "https://m.media-amazon.com/images/I/81UKVHM77GL._AC_SL1500_.jpg", // Vivo
}));

function Home() {
  return (
    <div className="container-fluid py-5 position-relative">
      {/* Head Section */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-center mb-5"
      >
        <h1 className="fw-bold mb-3">Welcome to Mobile World 📱</h1>
        <p className="text-muted">
          Discover the latest iPhone, Samsung, and Vivo smartphones with stylish
          design and performance.
        </p>
      </motion.div>

      {/* Center Image */}
      <motion.img
        src={centerImage}
        alt="Center Mobile"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.2 }}
        style={{
          display: "block",
          margin: "0 auto 40px auto",
          height: "350px",
        }}
      />

      {/* Left Image - Floating + Sliding */}
      <motion.img
        src={leftImage}
        alt="Left Mobile"
        initial={{ x: "-100%", opacity: 0 }}
        animate={{ x: 0, y: [0, -20, 0], opacity: 1 }}
        transition={{
          x: { duration: 1.5, ease: "easeOut" },
          y: { duration: 3, repeat: Infinity, ease: "easeInOut" },
          opacity: { duration: 1.5 },
        }}
        style={{
          position: "absolute",
          left: "2%", // د viewport مطابق فاصله
          bottom: "10%",
          height: "220px",
          maxWidth: "20%",
          zIndex: 1,
        }}
      />

      {/* Right Image - Floating + Sliding */}
      <motion.img
        src={rightImage}
        alt="Right Mobile"
        initial={{ x: "100%", opacity: 0 }}
        animate={{ x: 0, y: [0, 20, 0], opacity: 1 }}
        transition={{
          x: { duration: 1.5, ease: "easeOut" },
          y: { duration: 3, repeat: Infinity, ease: "easeInOut" },
          opacity: { duration: 1.5 },
        }}
        style={{
          position: "absolute",
          right: "2%",
          bottom: "10%",
          height: "220px",
          maxWidth: "20%",
          zIndex: 1,
        }}
      />

      {/* Mobile Cards Grid */}
      <div className="container mt-5">
        <div className="row">
          {mobiles.map((mobile, index) => (
            <motion.div
              key={mobile.id}
              className="col-md-3 mb-4"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.02 }}
            >
              <div className="card h-100 shadow-sm border-0 rounded-4">
                <img
                  src={mobile.image}
                  className="card-img-top p-3"
                  alt={mobile.name}
                  style={{ height: "250px", objectFit: "contain" }}
                />
                <div className="card-body text-center">
                  <h5 className="card-title">{mobile.name}</h5>
                  <p className="card-text text-muted">{mobile.description}</p>
                  <p className="fw-bold">{mobile.price}</p>
                  <button className="btn btn-primary">Add to Cart 🛒</button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;

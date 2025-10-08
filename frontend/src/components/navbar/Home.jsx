import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "bootstrap/dist/css/bootstrap.min.css";

const sliderMobiles = [
  {
    name: "Google pixel 9 Pro Max",
    image: "https://m.media-amazon.com/images/I/71SNHONa-XL._AC_UY218_.jpg",
    price: "$1299",
    description:
      "Apple's latest flagship with A17 Bionic chip and titanium frame.",
  },
  {
    name: "Samsung Galaxy S24 Ultra",
    image: "https://m.media-amazon.com/images/I/51Nt-B+VLfL._AC_UY218_.jpg",
    price: "$1199",
    description: "Flagship Samsung with S Pen and 200MP camera.",
  },
  {
    name: "Vivo V29",
    image: "https://fdn2.gsmarena.com/vv/pics/vivo/vivo-v29-1.jpg",
    price: "$499",
    description: "Elegant Vivo with curved display and pro portrait mode.",
  },
  {
    name: "iPhone 17",
    image: "https://m.media-amazon.com/images/I/61n0lmxP5-L._AC_UY218_.jpg",
    price: "$999",
    description: "Smooth performance with cinematic camera mode.",
  },
];

function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % sliderMobiles.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const current = sliderMobiles[currentIndex];

  return (
    <div className="container-fluid p-0">
      <div style={{ height: "80vh", position: "relative", overflow: "hidden" }}>
        <AnimatePresence mode="wait">
          {/* 🔸 Background Blur Layer */}
          <motion.div
            key={`bg-${currentIndex}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            style={{
              backgroundImage: `url(${current.image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              filter: "blur(20px) brightness(0.4)",
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              zIndex: 0,
              transform: "scale(1.1)", // little zoom for better blur
            }}
          ></motion.div>

          {/* 🔸 Foreground Content */}
          <motion.div
            key={`content-${currentIndex}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.8 }}
            className="position-absolute top-50 start-50 translate-middle text-center text-white container"
            style={{ zIndex: 1 }}
          >
            <div className="row justify-content-center">
              <div className="col-10 col-md-6">
                <img
                  src={current.image}
                  alt={current.name}
                  className="img-fluid mb-4"
                  style={{
                    maxHeight: "300px",
                    objectFit: "contain",
                    filter: "drop-shadow(0 0 10px rgba(0,0,0,0.6))",
                  }}
                />
                <h1 className="fw-bold mb-3">{current.name}</h1>
                <p className="mb-3">{current.description}</p>
                <span className="fw-bold fs-4 bg-primary px-4 py-2 rounded-3 d-inline-block">
                  {current.price}
                </span>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

export default Home;

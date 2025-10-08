import React, { useState, useContext } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { CartContext } from "../../../src/components/context/CartContext";

const products = [
  {
    id: 1,
    name: "iPhone 12",
    price: "$300.00",
    description: "High quality iPhone 12 with excellent camera.",
    image:
      "https://images.unsplash.com/photo-1679258499439-404f222b3c40?w=500&auto=format&fit=crop&q=60",
  },
  {
    id: 2,
    name: "iPhone 12 Mini",
    price: "$220.00",
    description: "Compact iPhone 12 Mini, lightweight and fast.",
    image:
      "https://images.unsplash.com/photo-1574005054503-0c1d9ba84af8?w=500&auto=format&fit=crop&q=60",
  },
  {
    id: 3,
    name: "iPhone 11",
    price: "$400.00",
    description: "Reliable iPhone 11 with long battery life.",
    image:
      "https://images.unsplash.com/photo-1571964759103-c1dac73416cf?w=500&auto=format&fit=crop&q=60",
  },
  {
    id: 4,
    name: "iPhone 13 Pro Max",
    price: "$450.00",
    description: "Latest iPhone 13 Pro Max with amazing camera.",
    image:
      "https://images.unsplash.com/photo-1607936854279-55e8a4c64888?w=500&auto=format&fit=crop&q=60",
  },
  {
    id: 5,
    name: "iPhone 13 Pro",
    price: "$115.00",
    description: "High performance iPhone 13 Pro for power users.",
    image:
      "https://images.unsplash.com/photo-1739816334403-3d8b1eb8ef77?w=500&auto=format&fit=crop&q=60",
  },
  {
    id: 6,
    name: "iPhone SE",
    price: "$350.00",
    description: "Affordable iPhone SE with solid performance.",
    image:
      "https://images.unsplash.com/photo-1664472252707-5ded875aaffe?w=500&auto=format&fit=crop&q=60",
  },
  {
    id: 7,
    name: "iPhone 17 Pro Max",
    price: "$1000.00",
    description: "Premium iPhone 17 Pro Max with latest tech.",
    image:
      "https://images.unsplash.com/photo-1709178295004-893b38ec2a4b?w=500&auto=format&fit=crop&q=60",
  },
  {
    id: 8,
    name: "iPhone 17 Pro",
    price: "$1125.00",
    description: "High-end iPhone 17 Pro, super fast and reliable.",
    image:
      "https://images.unsplash.com/photo-1630328699543-c054cd3ea0b2?w=500&auto=format&fit=crop&q=60",
  },
  {
    id: 9,
    name: "iPhone 17",
    price: "$1200.00",
    description: "Flagship iPhone 17 with top-notch camera & battery.",
    image:
      "https://images.unsplash.com/photo-1630513094315-6fe9a9fdc562?w=500&auto=format&fit=crop&q=60",
  },
  {
    id: 10,
    name: "iPhone XR",
    price: "$440.00",
    description: "iPhone XR, still a strong and reliable device.",
    image:
      "https://images.unsplash.com/photo-1572962481805-618aa41b8ebb?w=500&auto=format&fit=crop&q=60",
  },
  {
    id: 11,
    name: "iPhone 17 Ultra",
    price: "$1250.00",
    description: "iPhone 17 Ultra, perfect for photography enthusiasts.",
    image:
      "https://images.unsplash.com/photo-1612827682226-f461037c339a?w=500&auto=format&fit=crop&q=60",
  },
  {
    id: 12,
    name: "iPhone 17 Max",
    price: "$1430.75",
    description: "Latest iPhone 17 Max with advanced features.",
    image:
      "https://images.unsplash.com/photo-1740650698113-33198ad23663?w=500&auto=format&fit=crop&q=60",
  },
  {
    id: 13,
    name: "iPhone 18 Pro",
    price: "$1550.00",
    description: "Next generation iPhone 18 Pro with amazing camera.",
    image:
      "https://images.unsplash.com/photo-1740650698113-33198ad23663?w=500&auto=format&fit=crop&q=60",
  },
];

function Iphone() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const { addToCart } = useContext(CartContext);

  const handleProductClick = (product) => setSelectedProduct(product);
  const handleClose = () => setSelectedProduct(null);

  const handleAddToCart = async (product) => {
    try {
      setLoading(true);
      addToCart(product);
      await axios.post("http://localhost:5000/api/iphones", product);
      alert(`${product.name} added to cart successfully!`);
    } catch (err) {
      console.error(err);
      alert("Failed to add product");
    } finally {
      setLoading(false);
      setSelectedProduct(null);
    }
  };

  return (
    <div className="container py-4">
      {/* ✅ Title Section */}
      <div className="text-center mb-4">
        <h1 className="fw-bold">🍎 iPhone Collection</h1>
        <p className="text-muted">
          Explore the latest and classic iPhone models in one place.
        </p>
      </div>

      {/* ✅ Product Grid */}
      <div className="row g-4">
        {products.map((p) => (
          <div key={p.id} className="col-lg-3 col-md-4 col-sm-6">
            <div
              className="card h-100 shadow-sm border-0 product-card"
              onClick={() => handleProductClick(p)}
            >
              <div className="image-container">
                <img src={p.image} alt={p.name} className="img-fluid" />
              </div>
              <div className="card-body text-center d-flex flex-column">
                <h6 className="fw-semibold mb-2">{p.name}</h6>
                <p className="text-primary fw-bold mb-3">{p.price}</p>
                <button
                  className="btn btn-dark mt-auto rounded-pill"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAddToCart(p);
                  }}
                  disabled={loading}
                >
                  {loading ? "Adding..." : "🛒 Add to Cart"}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ✅ Modal */}
      {selectedProduct && (
        <div
          className="modal fade show d-block"
          style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
        >
          <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content border-0 shadow-lg rounded-4 overflow-hidden">
              <div className="modal-header border-0">
                <h5 className="modal-title fw-bold">{selectedProduct.name}</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={handleClose}
                ></button>
              </div>
              <div className="modal-body text-center">
                <img
                  src={selectedProduct.image}
                  alt={selectedProduct.name}
                  className="img-fluid mb-3"
                  style={{ maxHeight: "300px", objectFit: "contain" }}
                />
                <p className="text-muted">{selectedProduct.description}</p>
                <h4 className="text-primary fw-bold">
                  {selectedProduct.price}
                </h4>
              </div>
              <div className="modal-footer border-0">
                <button
                  className="btn btn-secondary rounded-pill"
                  onClick={handleClose}
                >
                  Close
                </button>
                <button
                  className="btn btn-dark rounded-pill"
                  onClick={() => handleAddToCart(selectedProduct)}
                  disabled={loading}
                >
                  {loading ? "Adding..." : "🛒 Add to Cart"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ✅ Styles */}
      <style>{`
        .product-card {
          cursor: pointer;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .product-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 10px 25px rgba(0,0,0,0.15);
        }
        .image-container {
          height: 230px;
          background: #f8f9fa;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }
        .image-container img {
          max-width: 100%;
          max-height: 100%;
          object-fit: contain;
        }
        @media (max-width: 576px) {
          .image-container {
            height: 180px;
          }
        }
      `}</style>
    </div>
  );
}

export default Iphone;

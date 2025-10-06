// iPhone.jsx
import React, { useState, useContext } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { CartContext } from "../context/CartContext"; // ✅ Import context

const initialProducts = [
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
      addToCart(product);
      alert(`${product.name} added to cart`);
      setLoading(true);

      await axios.post("http://localhost:5000/api/iphones", {
        name: product.name,
        price: product.price,
        description: product.description,
        image: product.image,
      });

      setLoading(false);
      setSelectedProduct(null);
    } catch (err) {
      console.error(err);
      setLoading(false);
      alert("Failed to add product");
    }
  };

  return (
    <div className="container py-4">
      <div className="text-center mb-4">
        <h1 className="fw-bold">iPhones</h1>
        <p className="text-muted">
          Explore iPhone models with best camera, battery, and performance.
        </p>
      </div>

      <div className="row">
        {initialProducts.map((p) => (
          <div key={p.id} className="col-md-4 col-sm-6 mb-4">
            <div
              className="card shadow-sm h-100 border-0"
              style={{ cursor: "pointer" }}
              onClick={() => handleProductClick(p)}
            >
              <img
                src={p.image}
                alt={p.name}
                className="card-img-top"
                style={{ height: "250px", objectFit: "cover" }}
              />
              <div className="card-body text-center">
                <h6 className="fw-bold">{p.name}</h6>
                <p className="text-primary fw-bold">{p.price}</p>
                <button
                  className="btn btn-primary w-100"
                  onClick={() => handleAddToCart(p)}
                  disabled={loading}
                >
                  {loading ? "Adding..." : "Add to Cart"}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedProduct && (
        <div
          className="modal show fade d-block"
          tabIndex="-1"
          role="dialog"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog modal-md" role="document">
            <div className="modal-content p-3">
              <div className="modal-header">
                <h5 className="modal-title">{selectedProduct.name}</h5>
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
                  style={{ maxHeight: "250px", objectFit: "cover" }}
                />
                <p>{selectedProduct.description}</p>
                <h4 className="text-primary fw-bold">
                  {selectedProduct.price}
                </h4>
                <button
                  className="btn btn-primary w-100"
                  onClick={() => handleAddToCart(selectedProduct)}
                  disabled={loading}
                >
                  {loading ? "Adding..." : "Add to Cart"}
                </button>
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={handleClose}>
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Iphone;

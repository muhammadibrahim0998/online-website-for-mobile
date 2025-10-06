// Vivo.jsx
import React, { useState, useContext } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { CartContext } from "../context/CartContext"; // ✅ Import CartContext

const initialProducts = [
  {
    id: 1,
    name: "Vivo Y17s",
    price: "$425.00",
    description: "Vivo Y17s - 4GB + 128GB Storage",
    image:
      "https://up.yimg.com/ib/th/id/OIP.3UvA4muSJoH3QHUXjR1aIgHaHa?pid=Api&rs=1&c=1&qlt=95&w=105&h=105",
  },
  {
    id: 2,
    name: "Vivo V40 5G",
    price: "$525.00",
    description: "Vivo V40 5G with premium design.",
    image:
      "https://tse3.mm.bing.net/th/id/OIP.knIEZKb6f6irTVlg9REJIAHaHa?pid=Api&P=0&h=220",
  },
  {
    id: 3,
    name: "Vivo X80",
    price: "$600.99",
    description: "Vivo X80 - Flagship performance.",
    image:
      "https://tse3.mm.bing.net/th/id/OIP.3D5kDvl0BQ_LUIbDmxCWowHaHa?pid=Api&P=0&h=220",
  },
  {
    id: 4,
    name: "Vivo V27 Pro",
    price: "$650.00",
    description: "Vivo V27 Pro 5G - 12GB RAM.",
    image:
      "https://tse1.mm.bing.net/th/id/OIP.SJH4-wBi_jtsoi5ERgSUlwHaHa?pid=Api&P=0&h=220",
  },
  {
    id: 5,
    name: "Vivo V29",
    price: "$295.00",
    description: "Vivo V29 - Stylish midrange phone.",
    image:
      "https://tse2.mm.bing.net/th/id/OIP.dSyPe4vDO5Eeasyc4iwmTgHaHa?pid=Api&P=0&h=220",
  },
  {
    id: 6,
    name: "Vivo V25",
    price: "$850.00",
    description: "Vivo V25 5G - 256GB Storage.",
    image:
      "https://tse3.mm.bing.net/th/id/OIP.fqDSxjGeQpwtXZlomyiOeAHaI9?pid=Api&P=0&h=220",
  },
  {
    id: 7,
    name: "Vivo V29 Lite",
    price: "$1100.00",
    description: "Vivo V29 Lite 5G smartphone.",
    image:
      "https://tse3.mm.bing.net/th/id/OIP.H2UPAw_mwJDIJDRIoLZJ2gHaHa?pid=Api&P=0&h=220",
  },
  {
    id: 8,
    name: "Vivo X200",
    price: "$1225.00",
    description: "Vivo X200 - Upcoming flagship.",
    image:
      "https://tse1.mm.bing.net/th/id/OIP.mNSi9GFvmvPpKmrbT0arMgHaEK?pid=Api&P=0&h=220",
  },
  {
    id: 9,
    name: "Vivo V40",
    price: "$700.00",
    description: "Vivo V40 Moonlight White 256GB.",
    image:
      "https://tse4.mm.bing.net/th/id/OIP.LLo_0lKMrSXVbAwGUTlYHgHaHa?pid=Api&P=0&h=220",
  },
  {
    id: 10,
    name: "Vivo V30",
    price: "$1150.00",
    description: "Vivo V30 series first edition.",
    image:
      "https://tse3.mm.bing.net/th/id/OIP.U9lPM9MH6hgNMozN75-r5gHaEK?pid=Api&P=0&h=220",
  },
  {
    id: 11,
    name: "Vivo 5G",
    price: "$750.00",
    description: "Vivo 5G Mobile Phones collection.",
    image:
      "https://tse3.mm.bing.net/th/id/OIP.MeWA2QqMzyYfPLhoYSzE2AHaHa?pid=Api&P=0&h=220",
  },
  {
    id: 12,
    name: "Vivo X100",
    price: "$1350.00",
    description: "Vivo X100 - Next-gen performance.",
    image:
      "https://tse2.mm.bing.net/th/id/OIP.9ErjXnUru0hHd9NPoPU5fgHaHa?pid=Api&P=0&h=220",
  },
];

function Vivo() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const { addToCart } = useContext(CartContext);

  const handleProductClick = (product) => setSelectedProduct(product);
  const handleClose = () => setSelectedProduct(null);

  const handleAddToCart = async (product) => {
    try {
      addToCart(product);
      setLoading(true);

      await axios.post("http://localhost:5000/api/vivo", {
        name: product.name,
        price: product.price,
        description: product.description,
        image: product.image,
      });

      setLoading(false);
      alert(`${product.name} added to cart & saved to DB`);
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
        <h1 className="fw-bold">Vivo Mobiles</h1>
        <p className="text-muted">
          Vivo mobile phones with best camera, battery, and performance.
        </p>
      </div>

      <div className="row">
        {initialProducts.map((p) => (
          <div key={p.id} className="col-md-4 col-sm-6 mb-4">
            <div
              className="card shadow-sm h-100 p-2"
              style={{ cursor: "pointer" }}
              onClick={() => handleProductClick(p)}
            >
              <img
                src={p.image}
                alt={p.name}
                className="card-img-top"
                style={{ height: "200px", objectFit: "cover" }}
              />
              <div className="card-body text-center">
                <h5>{p.name}</h5>
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
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog modal-md">
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

export default Vivo;

// // Sumsing.jsx
// import React, { useState, useContext } from "react";
// import axios from "axios";
// import "bootstrap/dist/css/bootstrap.min.css";
// import { CartContext } from "../context/CartContext"; // ✅ Import CartContext

// const initialProducts = [
//   {
//     id: 1,
//     name: "Sumsing Galaxy S9",
//     price: "$350.00",
//     description:
//       "Sumsing Galaxy S9 Sumsing Galaxy S8 2018 Mobile World Congress Huawei P20",
//     image:
//       "https://w7.pngwing.com/pngs/784/361/png-transparent-samsung-galaxy-s9-samsung-galaxy-s8-2018-mobile-world-congress-huawei-p20-samsung-thumbnail.png",
//   },
//   {
//     id: 2,
//     name: "Sumsing T-Mobile 4G Smartphone",
//     price: "$430.00",
//     description: "Telephone Sumsing T-Mobile 4G Smartphone",
//     image:
//       "https://w7.pngwing.com/pngs/2/872/png-transparent-telephone-samsung-t-mobile-4g-smartphone-samsung-gadget-mobile-phone-mobile-phones-thumbnail.png",
//   },
//   {
//     id: 3,
//     name: "Sumsing Smartphone Android OS",
//     price: "$450.00",
//     description: "Smartphone, Android OS, Sumsing, Galaxy S",
//     image:
//       "https://w7.pngwing.com/pngs/272/398/png-transparent-smartphone-android-os-samsung-galaxy-s-cellphone-mobile-phone-cell-phone-mobile-phone-touchscreen-thumbnail.png",
//   },
//   {
//     id: 4,
//     name: "Sumsing Galaxy S7",
//     price: "$515.00",
//     description: "Mobile Phone Accessories for Sumsing Galaxy S7",
//     image:
//       "https://w7.pngwing.com/pngs/870/26/png-transparent-iphone-7-mobile-phone-accessories-telephone-samsung-galaxy-s7-car-phone-accessory-miscellaneous-gadget-electronics-thumbnail.png",
//   },
//   {
//     id: 5,
//     name: "Sumsing Galaxy",
//     price: "$585.00",
//     description: "Sumsing Galaxy Mobile phone accessories",
//     image:
//       "https://w7.pngwing.com/pngs/602/46/png-transparent-samsung-galaxy-mobile-phone-accessories-smartphone-battery-charger-phone-case-hd-miscellaneous-gadget-mobile-phone-thumbnail.png",
//   },
//   {
//     id: 6,
//     name: "Sumsing S8",
//     price: "$570.00",
//     description: "Sumsing S8 with Zagg Invisibleshield Screen Protector",
//     image:
//       "https://w7.pngwing.com/pngs/906/385/png-transparent-zagg-invisibleshield-screen-protector-screen-protectors-mobile-phone-accessories-samsung-samsung-s8-glass-gadget-mobile-phone-thumbnail.png",
//   },
//   {
//     id: 7,
//     name: "Sumsing Galaxy Note 8",
//     price: "$155.00",
//     description: "Smartphone Feature phone Sumsing Galaxy Note 8",
//     image:
//       "https://w7.pngwing.com/pngs/640/767/png-transparent-smartphone-feature-phone-samsung-galaxy-note-8-mobile-phone-accessories-samsung-galaxy-s9-gadget-mobile-phone-electric-blue-thumbnail.png",
//   },
//   {
//     id: 8,
//     name: "Sumsing Pink",
//     price: "$500.00",
//     description: "Pink Sumsing smartphone collage",
//     image:
//       "https://w7.pngwing.com/pngs/906/297/png-transparent-pink-samsung-smartphone-collage-samsung-galaxy-s9-samsung-galaxy-s8-2018-mobile-world-congress-smartphone-samsung-s9-purple-gadget-electronics-thumbnail.png",
//   },
//   {
//     id: 9,
//     name: "Sumsing Feature Phone",
//     price: "$540.00",
//     description: "Feature phone Smartphone Mobile phone Sumsing",
//     image:
//       "https://w7.pngwing.com/pngs/121/1017/png-transparent-feature-phone-smartphone-mobile-phone-samsung-electronics-gadget-mobile-phones-thumbnail.png",
//   },
//   {
//     id: 10,
//     name: "Sumsing Galaxy S8+",
//     price: "$1000.00",
//     description: "Sumsing Galaxy S8+ with Gear Mobile Accessories",
//     image:
//       "https://w7.pngwing.com/pngs/800/79/png-transparent-samsung-galaxy-s8-samsung-galaxy-s7-samsung-gear-mobile-phone-accessories-samsung-electronics-gadget-mobile-phone-case-thumbnail.png",
//   },
//   {
//     id: 11,
//     name: "Sumsing Galaxy S Plus TECNO",
//     price: "$960.00",
//     description: "Sumsing Galaxy S Plus TECNO Mobile Android Smartphone",
//     image:
//       "https://w7.pngwing.com/pngs/902/444/png-transparent-samsung-galaxy-s-plus-tecno-mobile-android-smartphone-amoled-gionee-f103-pro-gadget-mobile-phone-3g-thumbnail.png",
//   },
//   {
//     id: 12,
//     name: "Sumsing Galaxy S9+",
//     price: "$500.00",
//     description: "Smartphone Feature phone Sumsing Galaxy S9+",
//     image:
//       "https://w7.pngwing.com/pngs/8/780/png-transparent-smartphone-feature-phone-samsung-galaxy-s9-cellular-network-samsung-s9-gadget-mobile-phone-mobile-phones-thumbnail.png",
//   },
// ];

// function Sumsing() {
//   const [selectedProduct, setSelectedProduct] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const { addToCart } = useContext(CartContext);

//   const handleProductClick = (product) => setSelectedProduct(product);
//   const handleClose = () => setSelectedProduct(null);

//   const handleAddToCart = async (product) => {
//     try {
//       addToCart(product);
//       setLoading(true);

//       await axios.post("http://localhost:5000/api/sumsing", {
//         name: product.name,
//         price: product.price,
//         description: product.description,
//         image: product.image,
//       });

//       setLoading(false);
//       alert(`${product.name} added to cart & saved to DB`);
//       setSelectedProduct(null);
//     } catch (err) {
//       console.error(err);
//       setLoading(false);
//       alert("Failed to add product");
//     }
//   };

//   return (
//     <div className="container py-4">
//       <div className="text-center mb-4">
//         <h1 className="fw-bold">Sumsing Mobiles</h1>
//         <p className="text-muted">
//           High-quality Sumsing mobile phones & accessories.
//         </p>
//       </div>

//       <div className="row">
//         {initialProducts.map((p) => (
//           <div key={p.id} className="col-md-4 col-sm-6 mb-4">
//             <div
//               className="card shadow-sm h-100 p-2"
//               style={{ cursor: "pointer" }}
//               onClick={() => handleProductClick(p)}
//             >
//               <img
//                 src={p.image}
//                 alt={p.name}
//                 className="card-img-top"
//                 style={{ height: "200px", objectFit: "cover" }}
//               />
//               <div className="card-body text-center">
//                 <h5>{p.name}</h5>
//                 <p className="text-primary fw-bold">{p.price}</p>
//                 <button
//                   className="btn btn-primary w-100"
//                   onClick={() => handleAddToCart(p)}
//                   disabled={loading}
//                 >
//                   {loading ? "Adding..." : "Add to Cart"}
//                 </button>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       {selectedProduct && (
//         <div
//           className="modal show fade d-block"
//           tabIndex="-1"
//           style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
//         >
//           <div className="modal-dialog modal-md">
//             <div className="modal-content p-3">
//               <div className="modal-header">
//                 <h5 className="modal-title">{selectedProduct.name}</h5>
//                 <button
//                   type="button"
//                   className="btn-close"
//                   onClick={handleClose}
//                 ></button>
//               </div>
//               <div className="modal-body text-center">
//                 <img
//                   src={selectedProduct.image}
//                   alt={selectedProduct.name}
//                   className="img-fluid mb-3"
//                   style={{ maxHeight: "250px", objectFit: "cover" }}
//                 />
//                 <p>{selectedProduct.description}</p>
//                 <h4 className="text-primary fw-bold">
//                   {selectedProduct.price}
//                 </h4>
//                 <button
//                   className="btn btn-primary w-100"
//                   onClick={() => handleAddToCart(selectedProduct)}
//                   disabled={loading}
//                 >
//                   {loading ? "Adding..." : "Add to Cart"}
//                 </button>
//               </div>
//               <div className="modal-footer">
//                 <button className="btn btn-secondary" onClick={handleClose}>
//                   Close
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default Sumsing;
import React, { useState, useContext } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { CartContext } from "../../../src/components/context/CartContext";

const products = [
  {
    id: 1,
    name: "Sumsing Galaxy S9",
    price: "$350.00",
    description:
      "Sumsing Galaxy S9 with powerful performance and sleek design.",
    image:
      "https://w7.pngwing.com/pngs/784/361/png-transparent-samsung-galaxy-s9-samsung-galaxy-s8-2018-mobile-world-congress-huawei-p20-samsung-thumbnail.png",
  },
  {
    id: 2,
    name: "Sumsing T-Mobile 4G",
    price: "$430.00",
    description: "Fast 4G smartphone with clean display and smooth finish.",
    image:
      "https://w7.pngwing.com/pngs/2/872/png-transparent-telephone-samsung-t-mobile-4g-smartphone-samsung-gadget-mobile-phone-mobile-phones-thumbnail.png",
  },
  {
    id: 3,
    name: "Sumsing Smartphone Android OS",
    price: "$450.00",
    description: "Flagship Sumsing smartphone with modern Android OS.",
    image:
      "https://w7.pngwing.com/pngs/272/398/png-transparent-smartphone-android-os-samsung-galaxy-s-cellphone-mobile-phone-cell-phone-mobile-phone-touchscreen-thumbnail.png",
  },
  {
    id: 4,
    name: "Sumsing Galaxy S7",
    price: "$515.00",
    description: "Mobile Phone Accessories for Sumsing Galaxy S7",
    image:
      "https://w7.pngwing.com/pngs/870/26/png-transparent-iphone-7-mobile-phone-accessories-telephone-samsung-galaxy-s7-car-phone-accessory-miscellaneous-gadget-electronics-thumbnail.png",
  },
  {
    id: 5,
    name: "Sumsing Galaxy",
    price: "$585.00",
    description: "Sumsing Galaxy Mobile phone accessories",
    image:
      "https://w7.pngwing.com/pngs/602/46/png-transparent-samsung-galaxy-mobile-phone-accessories-smartphone-battery-charger-phone-case-hd-miscellaneous-gadget-mobile-phone-thumbnail.png",
  },
  {
    id: 6,
    name: "Sumsing S8",
    price: "$570.00",
    description: "Sumsing S8 with Zagg Invisibleshield Screen Protector",
    image:
      "https://w7.pngwing.com/pngs/906/385/png-transparent-zagg-invisibleshield-screen-protector-screen-protectors-mobile-phone-accessories-samsung-samsung-s8-glass-gadget-mobile-phone-thumbnail.png",
  },
  {
    id: 7,
    name: "Sumsing Galaxy Note 8",
    price: "$155.00",
    description: "Smartphone Feature phone Sumsing Galaxy Note 8",
    image:
      "https://w7.pngwing.com/pngs/640/767/png-transparent-smartphone-feature-phone-samsung-galaxy-note-8-mobile-phone-accessories-samsung-galaxy-s9-gadget-mobile-phone-electric-blue-thumbnail.png",
  },
  {
    id: 8,
    name: "Sumsing Pink",
    price: "$500.00",
    description: "Pink Sumsing smartphone collage",
    image:
      "https://w7.pngwing.com/pngs/906/297/png-transparent-pink-samsung-smartphone-collage-samsung-galaxy-s9-samsung-galaxy-s8-2018-mobile-world-congress-smartphone-samsung-s9-purple-gadget-electronics-thumbnail.png",
  },
  {
    id: 9,
    name: "Sumsing Feature Phone",
    price: "$540.00",
    description: "Feature phone Smartphone Mobile phone Sumsing",
    image:
      "https://w7.pngwing.com/pngs/121/1017/png-transparent-feature-phone-smartphone-mobile-phone-samsung-electronics-gadget-mobile-phones-thumbnail.png",
  },
  {
    id: 10,
    name: "Sumsing Galaxy S8+",
    price: "$1000.00",
    description: "Sumsing Galaxy S8+ with Gear Mobile Accessories",
    image:
      "https://w7.pngwing.com/pngs/800/79/png-transparent-samsung-galaxy-s8-samsung-galaxy-s7-samsung-gear-mobile-phone-accessories-samsung-electronics-gadget-mobile-phone-case-thumbnail.png",
  },
  {
    id: 11,
    name: "Sumsing Galaxy S Plus TECNO",
    price: "$960.00",
    description: "Sumsing Galaxy S Plus TECNO Mobile Android Smartphone",
    image:
      "https://w7.pngwing.com/pngs/902/444/png-transparent-samsung-galaxy-s-plus-tecno-mobile-android-smartphone-amoled-gionee-f103-pro-gadget-mobile-phone-3g-thumbnail.png",
  },
  {
    id: 12,
    name: "Sumsing Galaxy S9+",
    price: "$500.00",
    description: "Smartphone Feature phone Sumsing Galaxy S9+",
    image:
      "https://w7.pngwing.com/pngs/8/780/png-transparent-smartphone-feature-phone-samsung-galaxy-s9-cellular-network-samsung-s9-gadget-mobile-phone-mobile-phones-thumbnail.png",
  },
];

function Sumsing() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const { addToCart } = useContext(CartContext);

  const handleProductClick = (product) => setSelectedProduct(product);
  const handleClose = () => setSelectedProduct(null);

  const handleAddToCart = async (product) => {
    try {
      setLoading(true);
      addToCart(product);
      await axios.post("http://localhost:5000/api/sumsing", product);
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
      <div className="text-center mb-4">
        <h1 className="fw-bold">📱 Sumsing Mobiles</h1>
        <p className="text-muted">
          Explore premium Sumsing devices & accessories.
        </p>
      </div>

      {/* ✅ Product Grid */}
      <div className="row g-4">
        {products.map((p) => (
          <div key={p.id} className="col-lg-3 col-md-4 col-sm-6">
            <div
              className="card shadow-sm h-100 border-0 product-card"
              onClick={() => handleProductClick(p)}
            >
              <div className="image-container">
                <img src={p.image} alt={p.name} className="img-fluid" />
              </div>
              <div className="card-body text-center d-flex flex-column">
                <h6 className="fw-semibold mb-2">{p.name}</h6>
                <p className="text-primary fw-bold mb-3">{p.price}</p>
                <button
                  className="btn btn-primary mt-auto"
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
                <button className="btn btn-secondary" onClick={handleClose}>
                  Close
                </button>
                <button
                  className="btn btn-primary"
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
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          cursor: pointer;
        }
        .product-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 20px rgba(0,0,0,0.15);
        }
        .image-container {
          height: 220px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #f8f9fa;
          overflow: hidden;
        }
        .image-container img {
          max-height: 100%;
          max-width: 100%;
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

export default Sumsing;

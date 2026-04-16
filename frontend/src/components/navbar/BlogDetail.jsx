// src/pages/BlogDetail.jsx
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

// 📌 د معلوماتو لپاره یو ساده mock database
const allProducts = {
  iphone: {
    text: "Discover the premium features, elegant design, and smooth performance of iPhones.",
    images: [
      "https://images.unsplash.com/photo-1679258499439-404f222b3c40?w=1000",
      "https://images.unsplash.com/photo-1574005054503-0c1d9ba84af8?w=1000",
      "https://images.unsplash.com/photo-1571964759103-c1dac73416cf?w=1000",
      "https://images.unsplash.com/photo-1607936854279-55e8a4c64888?w=1000",
      "https://images.unsplash.com/photo-1739816334403-3d8b1eb8ef77?w=1000",
      "https://images.unsplash.com/photo-1664472252707-5ded875aaffe?w=1000",
    ],
  },
  sumsing: {
    text: "Sumsing brings cutting-edge displays, innovation, and high-quality cameras.",
    images: [
      "https://w7.pngwing.com/pngs/784/361/png-transparent-samsung-galaxy-s9-samsung-galaxy-s8-2018-mobile-world-congress-huawei-p20-samsung-thumbnail.png",
      "https://w7.pngwing.com/pngs/2/872/png-transparent-telephone-samsung-t-mobile-4g-smartphone-samsung-gadget-mobile-phone-mobile-phones-thumbnail.png",
      "https://w7.pngwing.com/pngs/272/398/png-transparent-smartphone-android-os-samsung-galaxy-s-cellphone-mobile-phone-cell-phone-mobile-phone-touchscreen-thumbnail.png",
      "https://w7.pngwing.com/pngs/602/46/png-transparent-samsung-galaxy-mobile-phone-accessories-smartphone-battery-charger-phone-case-hd-miscellaneous-gadget-mobile-phone-thumbnail.png",
      "https://w7.pngwing.com/pngs/640/767/png-transparent-smartphone-feature-phone-samsung-galaxy-note-8-mobile-phone-accessories-samsung-galaxy-s9-gadget-mobile-phone-electric-blue-thumbnail.png",
    ],
  },
  vivo: {
    text: "Stylish, budget-friendly, and camera-focused — Vivo mobiles for everyone.",
    images: [
      "https://fdn2.gsmarena.com/vv/pics/vivo/vivo-v29-1.jpg",
      "https://fdn2.gsmarena.com/vv/pics/vivo/vivo-x100-pro-1.jpg",
      "https://fdn2.gsmarena.com/vv/pics/vivo/vivo-y02t-1.jpg",
      "https://fdn2.gsmarena.com/vv/pics/vivo/vivo-v20-1.jpg",
      "https://fdn2.gsmarena.com/vv/pics/vivo/vivo-x70-pro-1.jpg",
      "https://fdn2.gsmarena.com/vv/pics/vivo/vivo-s18-1.jpg",
    ],
  },
};

function BlogDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  // 📌 د URL نه ID جدا کول (e.g. "iphone-1")
  const [category, indexStr] = id.split("-");
  const index = parseInt(indexStr, 10) - 1;

  const productData = allProducts[category];

  if (!productData || !productData.images[index]) {
    return (
      <div className="container py-5 text-center">
        <h2 className="fw-bold text-danger">Product Not Found 😢</h2>
        <button className="btn btn-secondary mt-3" onClick={() => navigate(-1)}>
          ⬅ Back to Blog
        </button>
      </div>
    );
  }

  const image = productData.images[index];
  const title = `${category.toUpperCase()} Model ${index + 1}`;
  const description = productData.text;

  return (
    <div className="container py-5">
      <button
        className="btn btn-outline-secondary mb-4"
        onClick={() => navigate(-1)}
      >
        ⬅ Back to Blog
      </button>

      <div className="text-center mb-4">
        <h1 className="fw-bold">{title}</h1>
        <p className="text-muted">{description}</p>
      </div>

      <div className="d-flex justify-content-center mb-4">
        <img
          src={image}
          alt={title}
          className="img-fluid rounded shadow"
          style={{ maxHeight: "400px", objectFit: "cover" }}
        />
      </div>

      <div className="text-center">
        <p className="lead">
          This is the detailed blog page for <strong>{title}</strong>. Here you
          can add full specs, performance analysis, camera samples, or anything
          you want.
        </p>

        <button className="btn btn-primary btn-lg mt-3">🛍️ Buy {title}</button>
      </div>
    </div>
  );
}

export default BlogDetail;

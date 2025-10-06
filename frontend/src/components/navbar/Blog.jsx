import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function Blog() {
  // 📌 iPhone Images
  const iphoneImages = [
    "https://images.unsplash.com/photo-1679258499439-404f222b3c40?w=300",
    "https://images.unsplash.com/photo-1574005054503-0c1d9ba84af8?w=500",
    "https://images.unsplash.com/photo-1571964759103-c1dac73416cf?w=500",
    "https://images.unsplash.com/photo-1607936854279-55e8a4c64888?w=500",
    "https://images.unsplash.com/photo-1739816334403-3d8b1eb8ef77?w=500",
    "https://images.unsplash.com/photo-1664472252707-5ded875aaffe?w=500",
  ];

  // 📌 Samsung Images
  const samsungImages = [
    "https://w7.pngwing.com/pngs/784/361/png-transparent-samsung-galaxy-s9-samsung-galaxy-s8-2018-mobile-world-congress-huawei-p20-samsung-thumbnail.png",
    "https://w7.pngwing.com/pngs/2/872/png-transparent-telephone-samsung-t-mobile-4g-smartphone-samsung-gadget-mobile-phone-mobile-phones-thumbnail.png",
    "https://w7.pngwing.com/pngs/272/398/png-transparent-smartphone-android-os-samsung-galaxy-s-cellphone-mobile-phone-cell-phone-mobile-phone-touchscreen-thumbnail.png",
    "https://w7.pngwing.com/pngs/602/46/png-transparent-samsung-galaxy-mobile-phone-accessories-smartphone-battery-charger-phone-case-hd-miscellaneous-gadget-mobile-phone-thumbnail.png",
    "https://w7.pngwing.com/pngs/640/767/png-transparent-smartphone-feature-phone-samsung-galaxy-note-8-mobile-phone-accessories-samsung-galaxy-s9-gadget-mobile-phone-electric-blue-thumbnail.png",
  ];

  // 📌 Vivo Images
  const vivoImages = [
    "https://fdn2.gsmarena.com/vv/pics/vivo/vivo-v29-1.jpg",
    "https://fdn2.gsmarena.com/vv/pics/vivo/vivo-x100-pro-1.jpg",
    "https://fdn2.gsmarena.com/vv/pics/vivo/vivo-y02t-1.jpg",
    "https://fdn2.gsmarena.com/vv/pics/vivo/vivo-v20-1.jpg",
    "https://fdn2.gsmarena.com/vv/pics/vivo/vivo-x70-pro-1.jpg",
    "https://fdn2.gsmarena.com/vv/pics/vivo/vivo-s18-1.jpg",
  ];

  // 📌 BlogCard component
  const BlogCard = ({ title, img, text }) => (
    <div className="col-md-4 mb-4">
      <div className="card h-100 shadow-sm border-0">
        <img
          src={img}
          className="card-img-top"
          alt={title}
          style={{ height: "220px", objectFit: "cover" }}
        />
        <div className="card-body">
          <h5 className="card-title fw-bold">{title}</h5>
          <p className="card-text text-muted">{text}</p>
          <button className="btn btn-primary btn-sm">Read More</button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="container py-5">
      <h1 className="text-center fw-bold mb-5">📖 Our Mobile Blog</h1>

      {/* iPhone Section */}
      <h2 className="fw-bold mb-4">🍎 iPhone</h2>
      <div className="row">
        {iphoneImages.map((img, i) => (
          <BlogCard
            key={i}
            title={`iPhone Model ${i + 1}`}
            img={img}
            text="Discover the premium features, elegant design, and smooth performance of iPhones."
          />
        ))}
      </div>

      {/* Samsung Section */}
      <h2 className="fw-bold my-4">📱 Samsung</h2>
      <div className="row">
        {samsungImages.map((img, i) => (
          <BlogCard
            key={i}
            title={`Samsung Model ${i + 1}`}
            img={img}
            text="Samsung brings cutting-edge displays, innovation, and high-quality cameras."
          />
        ))}
      </div>

      {/* Vivo Section */}
      <h2 className="fw-bold my-4">✨ Vivo</h2>
      <div className="row">
        {vivoImages.map((img, i) => (
          <BlogCard
            key={i}
            title={`Vivo Model ${i + 1}`}
            img={img}
            text="Stylish, budget-friendly, and camera-focused — Vivo mobiles for everyone."
          />
        ))}
      </div>
    </div>
  );
}

export default Blog;

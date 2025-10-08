import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

function About() {
  const [active, setActive] = useState("iphone");
  const navigate = useNavigate();

  // 📌 iPhone Series Data
    const iphoneData = [
    { name: "iPhone 13 Pro", desc: "Premium camera and design", img: "https://images.unsplash.com/photo-1679258499439-404f222b3c40?w=300" },
    { name: "iPhone 12", desc: "Sleek and powerful", img: "https://images.unsplash.com/photo-1574005054503-0c1d9ba84af8?w=500" },
    { name: "iPhone 11", desc: "Classic and smooth", img: "https://images.unsplash.com/photo-1571964759103-c1dac73416cf?w=500" },
    { name: "iPhone X", desc: "Iconic notch display", img: "https://images.unsplash.com/photo-1607936854279-55e8a4c64888?w=500" },
  ];

  // 📌 Samsung Series Data
  const samsungData = [
    { name: "Samsung Galaxy S9", desc: "Super AMOLED & power", img: "https://w7.pngwing.com/pngs/784/361/png-transparent-samsung-galaxy-s9-samsung-galaxy-s8-2018-mobile-world-congress-huawei-p20-samsung-thumbnail.png" },
    { name: "Samsung Note 8", desc: "Stylish design", img: "https://w7.pngwing.com/pngs/640/767/png-transparent-smartphone-feature-phone-samsung-galaxy-note-8-mobile-phone-accessories-samsung-galaxy-s9-gadget-mobile-phone-electric-blue-thumbnail.png" },
    { name: "Samsung Galaxy A", desc: "Affordable innovation", img: "https://w7.pngwing.com/pngs/2/872/png-transparent-telephone-samsung-t-mobile-4g-smartphone-samsung-gadget-mobile-phone-mobile-phones-thumbnail.png" },
  ];

  // 📌 Vivo Series Data
  const vivoData = [
    { name: "Vivo V29", desc: "Beautiful and powerful", img: "https://fdn2.gsmarena.com/vv/pics/vivo/vivo-v29-1.jpg" },
    { name: "Vivo X100 Pro", desc: "Flagship experience", img: "https://fdn2.gsmarena.com/vv/pics/vivo/vivo-x100-pro-1.jpg" },
    { name: "Vivo Y33s", desc: "Affordable and smooth", img: "https://fdn2.gsmarena.com/vv/pics/vivo/vivo-y33s-2.jpg" },
  ];

  // 📌 Common card layout for all mobiles
  const MobileCard = ({ category, index, name, desc, img }) => (
    <div
      className="col-6 col-sm-4 col-md-3 mb-4"
      style={{ cursor: "pointer" }}
      onClick={() => navigate(`/blog/${category}-${index + 1}`)}
    >
      <div className="card h-100 shadow-sm border-0">
        <img
          src={img}
          className="card-img-top"
          alt={name}
          style={{ height: "180px", objectFit: "cover" }}
        />
        <div className="card-body text-center">
          <h6 className="card-title fw-bold mb-1">{name}</h6>
          <p className="card-text text-muted small">{desc}</p>
        </div>
      </div>
    </div>
  );

  // 📌 Section Renderer
  const Section = ({ category, title, text, data }) => (
    <div className="mb-5">
      <div className="text-center mb-4">
        <h2 className="fw-bold">{title}</h2>
        <p className="text-muted">{text}</p>
      </div>
      <div className="row justify-content-center">
        {data.map((item, index) => (
          <MobileCard
            key={index}
            category={category}
            index={index}
            name={item.name}
            desc={item.desc}
            img={item.img}
          />
        ))}
      </div>
    </div>
  );

  return (
    <div className="container py-5">
      <h1 className="text-center fw-bold mb-4">📱 About Our Mobile Collection</h1>

      {/* Category Buttons */}
      <div className="text-center mb-5">
        <button
          className={`btn mx-2 ${active === "iphone" ? "btn-primary" : "btn-outline-primary"}`}
          onClick={() => setActive("iphone")}
        >
          iPhone
        </button>
        <button
          className={`btn mx-2 ${active === "samsung" ? "btn-success" : "btn-outline-success"}`}
          onClick={() => setActive("samsung")}
        >
          Samsung
        </button>
        <button
          className={`btn mx-2 ${active === "vivo" ? "btn-info" : "btn-outline-info"}`}
          onClick={() => setActive("vivo")}
        >
          Vivo
        </button>
      </div>

      {/* Active Section */}
      {active === "iphone" && (
        <Section
          category="iphone"
          title="iPhone Series"
          text="iPhones are famous for smooth performance, elegant design, and premium experience."
          data={iphoneData}
        />
      )}

      {active === "samsung" && (
        <Section
          category="samsung"
          title="Samsung Series"
          text="Samsung brings Super AMOLED, innovation, and strong performance."
          data={samsungData}
        />
      )}

      {active === "vivo" && (
        <Section
          category="vivo"
          title="Vivo Series"
          text="Vivo mobiles are stylish, affordable, and camera-focused."
          data={vivoData}
        />
      )}
    </div>
  );
}

export default About;

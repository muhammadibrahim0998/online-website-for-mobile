import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function About() {
  const [active, setActive] = useState("iphone");

  // 📌 iPhone Images (13)
  const iphoneImages = [
    "https://images.unsplash.com/photo-1679258499439-404f222b3c40?w=300",
    "https://images.unsplash.com/photo-1574005054503-0c1d9ba84af8?w=500",
    "https://images.unsplash.com/photo-1571964759103-c1dac73416cf?w=500",
    "https://images.unsplash.com/photo-1607936854279-55e8a4c64888?w=500",
    "https://images.unsplash.com/photo-1739816334403-3d8b1eb8ef77?w=500",
    "https://images.unsplash.com/photo-1664472252707-5ded875aaffe?w=500",
    "https://images.unsplash.com/photo-1709178295004-893b38ec2a4b?w=500",
    "https://images.unsplash.com/photo-1630328699543-c054cd3ea0b2?w=500",
    "https://images.unsplash.com/photo-1630513094315-6fe9a9fdc562?w=500",
    "https://images.unsplash.com/photo-1572962481805-618aa41b8ebb?w=500",
    "https://images.unsplash.com/photo-1612827682226-f461037c339a?w=500",
    "https://images.unsplash.com/photo-1740650698113-33198ad23663?w=500",
  ];

  // 📌 Samsung Images (13) ✅ نوم یې بدل کړم samsungImages
  const samsungImages = [
    "https://w7.pngwing.com/pngs/784/361/png-transparent-samsung-galaxy-s9-samsung-galaxy-s8-2018-mobile-world-congress-huawei-p20-samsung-thumbnail.png",
    "https://w7.pngwing.com/pngs/2/872/png-transparent-telephone-samsung-t-mobile-4g-smartphone-samsung-gadget-mobile-phone-mobile-phones-thumbnail.png",
    "https://w7.pngwing.com/pngs/272/398/png-transparent-smartphone-android-os-samsung-galaxy-s-cellphone-mobile-phone-cell-phone-mobile-phone-touchscreen-thumbnail.png",
    "https://w7.pngwing.com/pngs/870/26/png-transparent-iphone-7-mobile-phone-accessories-telephone-samsung-galaxy-s7-car-phone-accessory-miscellaneous-gadget-electronics-thumbnail.png",
    "https://w7.pngwing.com/pngs/602/46/png-transparent-samsung-galaxy-mobile-phone-accessories-smartphone-battery-charger-phone-case-hd-miscellaneous-gadget-mobile-phone-thumbnail.png",
    "https://w7.pngwing.com/pngs/906/385/png-transparent-zagg-invisibleshield-screen-protector-screen-protectors-mobile-phone-accessories-samsung-samsung-s8-glass-gadget-mobile-phone-thumbnail.png",
    "https://w7.pngwing.com/pngs/640/767/png-transparent-smartphone-feature-phone-samsung-galaxy-note-8-mobile-phone-accessories-samsung-galaxy-s9-gadget-mobile-phone-electric-blue-thumbnail.png",
    "https://w7.pngwing.com/pngs/906/297/png-transparent-pink-samsung-smartphone-collage-samsung-galaxy-s9-samsung-galaxy-s8-2018-mobile-world-congress-smartphone-samsung-s9-purple-gadget-electronics-thumbnail.png",
    "https://w7.pngwing.com/pngs/121/1017/png-transparent-feature-phone-smartphone-mobile-phone-samsung-electronics-gadget-mobile-phones-thumbnail.png",
    "https://w7.pngwing.com/pngs/800/79/png-transparent-samsung-galaxy-s8-samsung-galaxy-s7-samsung-gear-mobile-phone-accessories-samsung-electronics-gadget-mobile-phone-case-thumbnail.png",
    "https://w7.pngwing.com/pngs/902/444/png-transparent-samsung-galaxy-s-plus-tecno-mobile-android-smartphone-amoled-gionee-f103-pro-gadget-mobile-phone-3g-thumbnail.png",
    "https://w7.pngwing.com/pngs/8/780/png-transparent-smartphone-feature-phone-samsung-galaxy-s9-cellular-network-samsung-s9-gadget-mobile-phone-mobile-phones-thumbnail.png",
  ];

  // 📌 Vivo Images (13)
  const vivoImages = [
    "https://tse3.mm.bing.net/th/id/OIP.MeWA2QqMzyYfPLhoYSzE2AHaHa?pid=Api&P=0&h=220",
    "https://fdn2.gsmarena.com/vv/pics/vivo/vivo-v29-1.jpg",
    "https://tse3.mm.bing.net/th/id/OIP.3D5kDvl0BQ_LUIbDmxCWowHaHa?pid=Api&P=0&h=220",
    "https://tse4.mm.bing.net/th/id/OIP.EBqGN5JGofZilpu3m92iRQHaHa?pid=Api&P=0&h=220",
    "https://fdn2.gsmarena.com/vv/pics/vivo/vivo-x100-pro-1.jpg",
    "https://fdn2.gsmarena.com/vv/pics/vivo/vivo-y02t-1.jpg",
    "https://fdn2.gsmarena.com/vv/pics/vivo/vivo-y33s-2.jpg",
    "https://fdn2.gsmarena.com/vv/pics/vivo/vivo-v20-1.jpg",
    "https://fdn2.gsmarena.com/vv/pics/vivo/vivo-x70-pro-1.jpg",
    "https://fdn2.gsmarena.com/vv/pics/vivo/vivo-s18-1.jpg",
    "https://fdn2.gsmarena.com/vv/pics/vivo/vivo-y22-1.jpg",
    "https://fdn2.gsmarena.com/vv/pics/vivo/vivo-x80-1.jpg",
    "https://up.yimg.com/ib/th/id/OIP.3UvA4muSJoH3QHUXjR1aIgHaHa?pid=Api&rs=1&c=1&qlt=95&w=105&h=105",
  ];

  // 📌 Helper section
  const Section = ({ title, text, images }) => (
    <div className="row align-items-center mb-5">
      <div className="col-md-5">
        <h2 className="fw-bold">{title}</h2>
        <p className="text-muted">{text}</p>
      </div>
      <div className="col-md-7">
        <div className="d-flex flex-wrap gap-3 justify-content-center">
          {images.map((img, i) => (
            <img
              key={i}
              src={img}
              alt={`${title} ${i + 1}`}
              className="rounded shadow"
              style={{ width: "120px", height: "160px", objectFit: "cover" }}
            />
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="container py-5">
      <h1 className="text-center fw-bold mb-4">
        📱 About Our Mobile Collection
      </h1>

      {/* Buttons */}
      <div className="text-center mb-4">
        <button
          className={`btn mx-2 ${
            active === "iphone" ? "btn-primary" : "btn-outline-primary"
          }`}
          onClick={() => setActive("iphone")}
        >
          iPhone
        </button>
        <button
          className={`btn mx-2 ${
            active === "samsung" ? "btn-success" : "btn-outline-success"
          }`}
          onClick={() => setActive("samsung")}
        >
          Sumsing
        </button>
        <button
          className={`btn mx-2 ${
            active === "vivo" ? "btn-info" : "btn-outline-info"
          }`}
          onClick={() => setActive("vivo")}
        >
          Vivo
        </button>
      </div>

      {/* Sections */}
      {active === "iphone" && (
        <Section
          title="iPhone Series"
          text="iPhones are famous for their smooth performance, elegant design, and premium experience. Here are the latest iPhones in our collection."
          images={iphoneImages}
        />
      )}

      {active === "samsung" && (
        <Section
          title="Samsung Series"
          text="Samsung mobiles bring innovation, Super AMOLED displays, and high-end cameras. Check out the latest Samsung devices."
          images={samsungImages}
        />
      )}

      {active === "vivo" && (
        <Section
          title="Vivo Series"
          text="Vivo mobiles are stylish, budget-friendly, and known for their cameras. Explore the latest Vivo smartphones."
          images={vivoImages}
        />
      )}
    </div>
  );
}

export default About;

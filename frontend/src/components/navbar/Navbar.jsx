import React, { useState, useEffect, useContext } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Dropdown } from "react-bootstrap";
import { CartContext } from "../context/CartContext";

const logoUrl = "https://cdn-icons-png.flaticon.com/512/747/747376.png";

const products = [
  { id: 1, name: "iPhone", path: "/iphone" },
  { id: 2, name: "Samsung", path: "/sumsing" },
  { id: 3, name: "Vivo", path: "/vivo" },
  { id: 4, name: "Mobiles", path: "/mobile" },
];

function Navbar() {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { cartItems } = useContext(CartContext);
  const [cartCount, setCartCount] = useState(0);
  const isLoggedIn = !!localStorage.getItem("user");

  useEffect(() => {
    const count = cartItems.reduce((acc, item) => acc + (item.qty || 1), 0);
    setCartCount(count);
  }, [cartItems]);

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(query.toLowerCase())
  );

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <>
      <nav
        className="navbar navbar-expand-lg navbar-dark shadow-sm sticky-top"
        style={{
          background: "linear-gradient(90deg, #0057b8, #00b4d8)",
        }}
      >
        <div className="container">
          {/* ✅ Logo */}
          <Link
            className="navbar-brand d-flex align-items-center"
            to="/"
            onClick={closeMenu}
          >
            <img
              src={logoUrl}
              alt="Logo"
              height="45"
              className="me-2"
              style={{
                borderRadius: "50%",
                background: "#fff",
                padding: "5px",
              }}
            />
            <span className="fw-bold">MobiZone</span>
          </Link>

          {/* ✅ Hamburger / Cross */}
          <button
            className="navbar-toggler border-0"
            type="button"
            onClick={toggleMenu}
          >
            {isOpen ? (
              <i className="bi bi-x-lg text-white fs-3"></i>
            ) : (
              <i className="bi bi-list text-white fs-3"></i>
            )}
          </button>

          <div
            className={`collapse navbar-collapse ${isOpen ? "show" : ""}`}
            id="navbarNav"
          >
            {/* ✅ Direct Pages instead of dropdown */}
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink
                  to="/iphone"
                  className={({ isActive }) =>
                    `nav-link ${isActive ? "active-link" : ""}`
                  }
                  onClick={closeMenu}
                >
                  iPhone
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink
                  to="/sumsing"
                  className={({ isActive }) =>
                    `nav-link ${isActive ? "active-link" : ""}`
                  }
                  onClick={closeMenu}
                >
                  Sumsing
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink
                  to="/vivo"
                  className={({ isActive }) =>
                    `nav-link ${isActive ? "active-link" : ""}`
                  }
                  onClick={closeMenu}
                >
                  Vivo
                </NavLink>
              </li>

              {/* <li className="nav-item">
                <NavLink
                  to="/mobile"
                  className={({ isActive }) =>
                    `nav-link ${isActive ? "active-link" : ""}`
                  }
                  onClick={closeMenu}
                >
                  Mobiles
                </NavLink>
              </li> */}

              <li className="nav-item">
                <NavLink
                  to="/about"
                  className={({ isActive }) =>
                    `nav-link ${isActive ? "active-link" : ""}`
                  }
                  onClick={closeMenu}
                >
                  About
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink
                  to="/blog"
                  className={({ isActive }) =>
                    `nav-link ${isActive ? "active-link" : ""}`
                  }
                  onClick={closeMenu}
                >
                  Blog
                </NavLink>
              </li>
            </ul>

            {/* ✅ Search Bar */}
            <div className="position-relative me-3 my-2 my-lg-0">
              <input
                type="text"
                className="form-control rounded-pill ps-4"
                placeholder="Search..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                style={{ minWidth: "180px" }}
                id="searchInput"
              />
              <i
                className="bi bi-search position-absolute top-50 start-0 translate-middle-y ps-2 text-muted"
                style={{ cursor: "pointer" }}
                onClick={() => document.getElementById("searchInput").focus()}
              ></i>

              {query && (
                <div
                  className="position-absolute bg-white shadow rounded mt-1 w-100"
                  style={{ zIndex: 1000 }}
                >
                  {filtered.length > 0 ? (
                    filtered.map((item) => (
                      <Link
                        key={item.id}
                        to={item.path}
                        className="dropdown-item"
                        onClick={() => {
                          setQuery("");
                          closeMenu();
                        }}
                      >
                        {item.name}
                      </Link>
                    ))
                  ) : (
                    <div className="dropdown-item text-muted">No results</div>
                  )}
                </div>
              )}
            </div>

            {/* ✅ Account + Cart */}
            <div className="d-flex align-items-center gap-2">
              <Dropdown>
                <Dropdown.Toggle
                  variant="link"
                  className="text-white text-decoration-none fw-semibold"
                  id="accountDropdown"
                >
                  <i className="bi bi-person-circle me-1"></i>
                  Account
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  {!isLoggedIn ? (
                    <>
                      <Dropdown.Item as={Link} to="/login" onClick={closeMenu}>
                        <i className="bi bi-box-arrow-in-right me-1"></i> Login
                      </Dropdown.Item>
                      <Dropdown.Item as={Link} to="/signup" onClick={closeMenu}>
                        <i className="bi bi-person-plus me-1"></i> Signup
                      </Dropdown.Item>
                    </>
                  ) : (
                    <Dropdown.Item onClick={handleLogout}>
                      <i className="bi bi-box-arrow-right me-1"></i> Logout
                    </Dropdown.Item>
                  )}
                </Dropdown.Menu>
              </Dropdown>

              <Link
                to="/cart"
                className="btn btn-warning position-relative rounded-pill"
                onClick={closeMenu}
              >
                🛒
                {cartCount > 0 && (
                  <span className="badge bg-danger rounded-pill position-absolute top-0 start-100 translate-middle">
                    {cartCount}
                  </span>
                )}
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* ✅ Styles */}
      <style>{`
        .navbar .nav-link {
          transition: color 0.3s ease;
        }
        .navbar .nav-link:hover {
          color: #ffea00;
        }
        .active-link {
          color: #ffea00 !important;
          font-weight: 600;
        }
      `}</style>
    </>
  );
}

export default Navbar;

import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Dropdown } from "react-bootstrap";
import { CartContext } from "../../components/context/CartContext"; // ✅ Add Context

const logoUrl =
  "https://ketchamsupply.com/cdn/shop/files/logo.png?v=1718383680&width=600";

const products = [
  { id: 1, name: "iPhone", path: "/iphone" },
  { id: 2, name: "Sumsing", path: "/sumsing" },
  { id: 3, name: "Vivo", path: "/vivo" },
  { id: 4, name: "Mobile", path: "/mobile" },
];

function Navbar() {
  const [showSearch, setShowSearch] = useState(false);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const { cartItems } = useContext(CartContext); // ✅ Get cartItems from Context
  const [cartCount, setCartCount] = useState(0);

  const isLoggedIn = !!localStorage.getItem("user");

  // ✅ Update badge when cart changes
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

  return (
    <>
      <nav
        className="navbar navbar-expand-lg navbar-light shadow-sm"
        style={{
          background: "linear-gradient(to right, #e0f3ff, #bcdffb, #9acdf7)",
        }}
      >
        <div className="container d-flex justify-content-center">
          <div className="d-flex align-items-center justify-content-between w-50">
            {/* Left Links */}
            <div className="d-flex">
              <Dropdown className="me-4">
                <Dropdown.Toggle
                  variant="link"
                  className="fw-semibold text-dark"
                  id="shopDropdown"
                  style={{ textDecoration: "none" }}
                >
                  SHOP
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item as={Link} to="/iphone">
                    iPhone
                  </Dropdown.Item>
                  <Dropdown.Item as={Link} to="/sumsing">
                    Sumsing
                  </Dropdown.Item>
                  <Dropdown.Item as={Link} to="/vivo">
                    Vivo
                  </Dropdown.Item>
                  <Dropdown.Item as={Link} to="/mobile">
                    Mobile
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>

              <Link className="nav-link fw-semibold me-4 text-dark" to="/about">
                ABOUT
              </Link>
              <Link className="nav-link fw-semibold me-4 text-dark" to="/blog">
                BLOG
              </Link>
            </div>

            {/* Center Logo */}
            <Link className="navbar-brand mx-3" to="/">
              <img
                src={logoUrl}
                alt="My Logo"
                height="55"
                style={{
                  borderRadius: "50%",
                  border: "2px solid #fff",
                  boxShadow: "0 0 8px rgba(0, 0, 0, 0.15)",
                }}
              />
            </Link>

            {/* Right Section */}
            <div className="d-flex align-items-center">
              <button
                className="btn btn-outline-secondary btn-sm me-2"
                onClick={() => setShowSearch(true)}
              >
                <i className="bi bi-search"></i>
              </button>

              <Dropdown className="me-3">
                <Dropdown.Toggle
                  variant="link"
                  className="fw-semibold text-dark"
                  id="accountDropdown"
                  style={{ textDecoration: "none" }}
                >
                  <i className="bi bi-person-circle me-1"></i> ACCOUNT
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  {!isLoggedIn ? (
                    <>
                      <Dropdown.Item as={Link} to="/login">
                        <i className="bi bi-box-arrow-in-right me-1"></i> Login
                      </Dropdown.Item>
                      <Dropdown.Item as={Link} to="/signup">
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

              {/* ✅ Cart Button with Count from Context */}
              <Link to="/cart" className="btn btn-warning position-relative">
                Cart 🛒
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

      {/* ✅ Search Overlay */}
      {showSearch && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 d-flex flex-column align-items-center justify-content-center bg-dark bg-opacity-75 fade show"
          style={{ zIndex: 1050 }}
        >
          <button
            className="btn btn-light position-absolute top-0 end-0 m-3"
            onClick={() => {
              setShowSearch(false);
              setQuery("");
            }}
          >
            ✖
          </button>

          <div className="w-50">
            <input
              type="text"
              className="form-control form-control-lg rounded-pill text-center shadow"
              placeholder="Search products..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              autoFocus
            />
          </div>

          {query && (
            <div className="bg-white shadow rounded mt-3 p-3 w-50">
              <ul className="list-group">
                {filtered.length > 0 ? (
                  filtered.map((item) => (
                    <Link
                      key={item.id}
                      to={item.path}
                      className="list-group-item list-group-item-action"
                      onClick={() => setShowSearch(false)}
                    >
                      {item.name}
                    </Link>
                  ))
                ) : (
                  <li className="list-group-item text-muted">
                    No results found
                  </li>
                )}
              </ul>
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default Navbar;

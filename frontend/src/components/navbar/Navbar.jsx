import React, { useState, useEffect, useContext } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Dropdown } from "react-bootstrap";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";

const logoUrl = "https://cdn-icons-png.flaticon.com/512/747/747376.png";

const products = [
  { id: 1, name: "iPhone", path: "/iphone" },
  { id: 2, name: "Samsung", path: "/sumsing" },
  { id: 3, name: "Vivo", path: "/vivo" },
];

function Navbar() {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { cartItems } = useContext(CartContext);
  const { user, logout } = useContext(AuthContext);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const count = cartItems.reduce((acc, item) => acc + (item.qty || 1), 0);
    setCartCount(count);
  }, [cartItems]);

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(query.toLowerCase()),
  );

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const getDashboardLink = () => {
    if (!user) return "/dashboard";
    if (user.role === "superadmin") return "/admin/super";
    if (user.role === "shopadmin") return "/admin/shop";
    return "/dashboard";
  };

  const handleSearch = () => {
    if (query && filtered.length > 0) {
      navigate(filtered[0].path);
      setQuery("");
    }
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg sticky-top glassy-nav py-2">
        <div className="container-fluid px-lg-5">
          {/* LEFT: Logo and Nav Links */}
          <div className="d-flex align-items-center gap-4">
            <Link className="navbar-brand d-flex align-items-center" to="/">
              <motion.img
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.8 }}
                src={logoUrl}
                alt="Logo"
                height="40"
                className="me-2 modern-logo"
              />
              <span className="fw-bold fs-4 tracking-tighter brand-text">
                MobiZone
              </span>
            </Link>

            <ul className="navbar-nav d-none d-xl-flex flex-row gap-4 fw-semibold nav-links-container">
              <li className="nav-item">
                <NavLink to="/" className="nav-link-custom">
                  Home
                </NavLink>
              </li>
              {user && (
                <li className="nav-item">
                  <NavLink to={getDashboardLink()} className="nav-link-custom">
                    Dashboard
                  </NavLink>
                </li>
              )}
              <li className="nav-item">
                <NavLink to="/iphone" className="nav-link-custom">
                  iPhone
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/sumsing" className="nav-link-custom">
                  Samsung
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/vivo" className="nav-link-custom">
                  Vivo
                </NavLink>
              </li>
            </ul>
          </div>

          {/* CENTER: Search Bar with Circle Button */}
          <div className="navbar-center-search mx-auto position-relative d-none d-lg-flex align-items-center">
            <div className="search-wrapper">
              <input
                type="text"
                className="search-input"
                placeholder="Find your mobile..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              />
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="search-btn-circle"
                onClick={handleSearch}
              >
                <i className="bi bi-search"></i>
              </motion.button>

              <AnimatePresence>
                {query && filtered.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="search-results-dropdown"
                  >
                    {filtered.map((p) => (
                      <Link
                        key={p.id}
                        to={p.path}
                        className="search-result-item"
                        onClick={() => setQuery("")}
                      >
                        <i className="bi bi-phone me-2"></i> {p.name}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* RIGHT: Cart & Account */}
          <div className="d-flex align-items-center gap-4">
            {/* Cart Button with Blue/Black Circle */}
            <Link to="/cart" className="cart-circle-wrapper">
              <motion.div
                whileHover={{ scale: 1.15, rotate: 10 }}
                whileTap={{ scale: 0.9 }}
                className="icon-circle circle-cart"
              >
                <i className="bi bi-cart3"></i>
                {cartCount > 0 && (
                  <span className="cart-badge-new">{cartCount}</span>
                )}
              </motion.div>
            </Link>

            {/* Account Dropdown with Circle (Size matched with Cart) */}
            <Dropdown align="end" className="account-dropdown no-caret">
              <Dropdown.Toggle as="div" className="account-toggle-circle">
                <motion.div
                  whileHover={{ scale: 1.15, rotate: -10 }}
                  className="icon-circle circle-account"
                >
                  <i className="bi bi-person-fill"></i>
                </motion.div>
              </Dropdown.Toggle>
              <Dropdown.Menu className="account-menu-modern shadow-lg dropdown-menu-end mt-3 border-0">
                {!user ? (
                  <div className="p-2 ">
                    <Dropdown.Item
                      as={Link}
                      to="/login"
                      className="modern-dropdown-item rounded mb-1"
                    >
                      <i className="bi bi-box-arrow-in-right me-2"></i> Login
                    </Dropdown.Item>
                    <Dropdown.Item
                      as={Link}
                      to="/signup"
                      className="modern-dropdown-item rounded"
                    >
                      <i className="bi bi-person-plus me-2"></i> Create Account
                    </Dropdown.Item>
                  </div>
                ) : (
                  <div className="p-1">
                    <div className="user-profile-header p-3 mb-2 text-center text-dark">
                      <div className="fw-bold fs-6">{user.name}</div>
                      <div className="small opacity-75">{user.email}</div>
                    </div>
                    <Dropdown.Item
                      as={Link}
                      to={getDashboardLink()}
                      className="modern-dropdown-item rounded mb-1"
                    >
                      <i className="bi bi-speedometer2 me-2"></i> Dashboard
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={handleLogout}
                      className="modern-dropdown-item rounded text-danger"
                    >
                      <i className="bi bi-power me-2"></i> Logout
                    </Dropdown.Item>
                  </div>
                )}
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>
      </nav>

      <style>{`
        .glassy-nav {
          background: rgba(224, 242, 255, 0.95) !important;
          backdrop-filter: blur(20px) saturate(180%);
          border: 1px solid #ccc !important;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1) !important;
          transition: all 0.3s ease;
        }





        .brand-text {
          background: linear-gradient(90deg, #0d6efd, #0dcaf0);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          letter-spacing: -1px;
        }

        .nav-link-custom {
          text-decoration: none;
          color: #444;
          font-size: 0.95rem;
          position: relative;
          padding: 5px 0;
          transition: color 0.3s ease;
        }

        .nav-link-custom:hover, .nav-link-custom.active {
          color: #0d6efd;
        }

        .nav-link-custom::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 0;
          height: 2px;
          background: #0d6efd;
          transition: width 0.3s ease;
        }

        .nav-link-custom:hover::after, .nav-link-custom.active::after {
          width: 100%;
        }

        /* Refined Gray Search Bar */
        .search-wrapper {
          position: relative;
          display: flex;
          align-items: center;
          width: 400px;
          background: #f8f9fa !important;
          border-radius: 50px;
          padding: 5px 5px 5px 20px;
          transition: all 0.3s ease;
          border: none !important;
          box-shadow: 0 4px 20px rgba(0,0,0,0.08) !important;
        }


        .search-wrapper:focus-within {
          background: #fff;
          border: none !important;
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12) !important;
          transform: translateY(-1px);
        }

        .search-input {
          border: none;
          background: transparent;
          outline: none;
          width: 100%;
          padding: 8px 0;
          font-size: 0.95rem;
          color: #333;
        }


        .search-btn-circle {
          background: #0d6efd;
          color: white;
          border: none;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: background 0.3s ease;
          box-shadow: 0 4px 10px rgba(13, 110, 253, 0.2);
        }

        .search-btn-circle:hover {
          background: #0b5ed7;
        }

        .search-results-dropdown {
          position: absolute;
          top: 100%;
          left: 0;
          right: 0;
          background: white;
          border-radius: 15px;
          margin-top: 10px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.1);
          overflow: hidden;
          z-index: 1001;
        }

        .search-result-item {
          display: block;
          padding: 12px 20px;
          color: #333;
          text-decoration: none;
          transition: background 0.2s;
        }

        .search-result-item:hover {
          background: #f8f9fa;
          color: #0d6efd;
        }

        /* Icons & Right Section */
        .cart-btn-icon {
          color: #333;
          transition: color 0.3s;
        }

        .cart-btn-icon:hover {
          color: #0d6efd;
        }

        /* Icon Circles & Unique Hovers */
        .icon-circle {
          width: 45px;
         
          height: 45px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.3rem;
          color: white;
          cursor: pointer;
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.27);
          position: relative;
          box-shadow: 0 4px 15px rgba(0,0,0,0.1);
        }

        .circle-cart {
          background: linear-gradient(135deg, #0d6efd 0%, #000000 100%);
          border: 1px solid rgba(255,255,255,0.2);
        }

        .circle-cart:hover {
          background: #ffc107 !important; /* Yellow hover */
          color: #000 !important;
          box-shadow: 0 0 20px rgba(255, 193, 7, 0.4);
        }

        .circle-account {
        
          background: #0d6efd;
          border: 1px solid rgba(255,255,255,0.2);
        }

        .circle-account:hover {
          background: #198754 !important; /* Green hover */
          box-shadow: 0 0 20px rgba(25, 135, 84, 0.4);
          
        }

        .search-btn-circle:hover {
          background: #6610f2 !important; /* Indigo hover */
          box-shadow: 0 0 20px rgba(102, 16, 242, 0.4);
        }

        .cart-circle-wrapper {
          text-decoration: none;
        }

        .account-toggle-circle {
          cursor: pointer;
          
        }

        .cart-badge-new {
          position: absolute;
          top: -4px;
          right: -4px;
          background: #ff4d4d;
          color: white;
          font-size: 0.75rem;
          font-weight: bold;
          padding: 2px 7px;
          border-radius: 20px;
          border: 2px solid white;
          box-shadow: 0 2px 8px rgba(255, 77, 77, 0.3);
        }

        /* Essential Fix: Hide the dropdown arrow/caret */
        .dropdown-toggle::after {
          display: none !important;
          content: none !important;
        }
        
        .account-dropdown {
          display: flex;
          align-items: center;
        }

        .no-caret .dropdown-toggle::after {
          display: none !important;
        }
      `}</style>
    </>
  );
}

export default Navbar;


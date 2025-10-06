import React from "react";
import { NavLink } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

function Header() {
  return (
    <nav
      className="navbar navbar-expand-lg shadow-sm"
      style={{
        background: "linear-gradient(to right, #d6e4f0, #6c8ebf, #547ca5)",
      }}
    >
      <div className="container justify-content-center">
        <ul className="navbar-nav">
          <li className="nav-item">
            <NavLink
              className={({ isActive }) =>
                `nav-link fw-bold text-uppercase px-3 ${
                  isActive ? "text-dark bg-white rounded" : "text-dark"
                }`
              }
              to="/Iphone"
            >
              Iphone
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              className={({ isActive }) =>
                `nav-link fw-bold text-uppercase px-3 ${
                  isActive ? "text-dark bg-white rounded" : "text-dark"
                }`
              }
              to="/sumsing"
            >
              sumsing
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              className={({ isActive }) =>
                `nav-link fw-bold text-uppercase px-3 ${
                  isActive ? "text-dark bg-white rounded" : "text-dark"
                }`
              }
              to="/vivo" 
            >
              vivo
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Header;

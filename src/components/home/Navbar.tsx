import React from "react";
import { Link } from "react-router-dom";

const Navbar: React.FC = () => {
  return (
    <nav
      className="navbar navbar-expand-lg"
      style={{ backgroundColor: "#000000" }}
    >
      <div className="container">
        <Link
          className="navbar-brand"
          to="/"
          style={{ color: "#FFC107", fontWeight: "bold" }}
        >
          Product Management
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
          style={{ backgroundColor: "#FFC107" }}
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-center">
            <li className="nav-item">
              <Link
                className="btn me-3"
                to="/users"
                style={{
                  backgroundColor: "#FFC107",
                  color: "#000000",
                  border: "none",
                }}
              >
                Users
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/" style={{ color: "#FFFFFF" }}>
                Home
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

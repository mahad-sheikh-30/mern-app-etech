import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar: React.FC = () => {
  return (
    <nav className="navbar">
      <Link to="/" className="logo">
        <h1>Etech.</h1>
      </Link>

      <div className="nav-items" aria-label="Primary">
        <ul className="nav-links">
          <li>
            <Link to="/courses">Courses</Link>
          </li>
          <li>
            <Link to="/teachers">Teachers</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
        </ul>
      </div>

      <div className="sign-trial">
        <Link to="/signin">
          <button className="sign-in-btn button">Sign In</button>
        </Link>
        <button className="trial-btn button">Free Trial</button>
      </div>
      <button
        className="menu-toggle"
        id="menuToggle"
        aria-expanded="false"
        aria-controls="mobileMenu"
        aria-label="Open menu"
      >
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </button>
    </nav>
  );
};

export default Navbar;

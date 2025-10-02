import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import crossImg from "../../assets/closee.png";
import userImg from "../../assets/user-circle.png";
const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserOpen, setIsUserOpen] = useState(false);

  const handleSignOut = () => {
    localStorage.removeItem("token");
    navigate("/signin");
    setIsMenuOpen(false);
  };

  const name = localStorage.getItem("name");
  const email = localStorage.getItem("email");
  const role = localStorage.getItem("role");
  console.log(name + "   " + email);

  return (
    <>
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
          <button className="trial-btn button">Free Trial</button>
          {!token ? (
            <Link to="/signin">
              <button className="sign-in-btn button">Sign In</button>
            </Link>
          ) : (
            <>
              <div
                className="user-img"
                onClick={() => setIsUserOpen(!isUserOpen)}
              >
                <img src={userImg} alt="" />

                {isUserOpen && (
                  <div className="user-info">
                    <h4>{name?.toUpperCase()}</h4>
                    <hr />
                    <p>{email}</p>
                    <hr />
                    <h4>{role?.toUpperCase()}</h4>
                    <hr />

                    {role === "admin" && (
                      <>
                        <button
                          onClick={() => {
                            navigate("/admin");
                            setIsUserOpen(false);
                          }}
                          className="button"
                        >
                          Admin Panel
                        </button>
                        <hr />
                      </>
                    )}
                    <button onClick={handleSignOut} className=" button">
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            </>
          )}
        </div>

        <button
          className="menu-toggle"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-expanded={isMenuOpen}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        >
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </button>
      </nav>
      <div
        className={`mobile-menu ${isMenuOpen ? "open" : ""}`}
        id="mobileMenu"
      >
        <div className="mobile-header">
          <Link
            to="/"
            className="logo mobile-logo"
            onClick={() => setIsMenuOpen(false)}
          >
            <h1>Etech.</h1>
          </Link>

          <button
            className="close-icon"
            onClick={() => setIsMenuOpen(false)}
            aria-label="Close menu"
          >
            <img src={crossImg} alt="close" />
          </button>
        </div>
        <hr />

        <ul>
          <li>
            <Link to="/courses" onClick={() => setIsMenuOpen(false)}>
              Courses
            </Link>
          </li>
          <li>
            <Link to="/teachers" onClick={() => setIsMenuOpen(false)}>
              Teachers
            </Link>
          </li>
          <li>
            <Link to="/about" onClick={() => setIsMenuOpen(false)}>
              About
            </Link>
          </li>
          <li>
            <Link to="/contact" onClick={() => setIsMenuOpen(false)}>
              Contact
            </Link>
          </li>
        </ul>

        <div className="mobile-buttons">
          {!token ? (
            <Link to="/signin" onClick={() => setIsMenuOpen(false)}>
              <button className="sign-in-btn button">Sign In</button>
            </Link>
          ) : (
            <button onClick={handleSignOut} className="sign-in-btn button">
              Sign Out
            </button>
          )}
          <button className="trial-btn button">Free Trial</button>

          <Link to="/" onClick={() => setIsMenuOpen(false)}>
            <button className="home-btn button">Go Back Home</button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Navbar;

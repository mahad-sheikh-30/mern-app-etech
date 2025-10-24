import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import crossImg from "../../assets/closee.png";
import userIcon from "../../assets/user.png";
import { useUser } from "../../context/UserContext";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNotifications } from "../../hooks/useNotifications";
import bellIcon from "../../assets/bell.png";

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const { user, logout } = useUser();
  const { notifications, unreadCount, markAsRead } = useNotifications(
    user?._id
  );

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserOpen, setIsUserOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);

  // Close dropdowns if clicked outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        !target.closest(".user-img") &&
        !target.closest(".user-info") &&
        !target.closest(".notif-icon") &&
        !target.closest(".notif-dropdown")
      ) {
        setIsUserOpen(false);
        setIsNotifOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const queryClient = useQueryClient();
  const handleSignOut = () => {
    logout();
    toast.success("Signed out successfully!");
    navigate("/signin");
    queryClient.clear();
    setIsMenuOpen(false);
  };

  const name = user?.name;
  const email = user?.email;
  const role = user?.role;

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

        <div className="user-notif-container">
          {user ? (
            <>
              {/* Notification Bell */}
              <div className="notif-container">
                <div
                  className="notif-icon"
                  onClick={() => setIsNotifOpen(!isNotifOpen)}
                >
                  <img src={bellIcon} alt="Notifications" />
                  {unreadCount > 0 && (
                    <span className="notif-badge">{unreadCount}</span>
                  )}
                </div>
                {isNotifOpen && (
                  <div className="notif-dropdown">
                    {notifications.length === 0 && <p>No notifications</p>}
                    {notifications.map((notif) => (
                      <div
                        key={notif._id}
                        className={`notif-item ${notif.read ? "" : "unread"}`}
                        onClick={() => markAsRead(notif._id)}
                      >
                        {notif.message}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* User Image */}
              <div
                className="user-img"
                onClick={() => setIsUserOpen(!isUserOpen)}
              >
                <img src={userIcon} alt="" />
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
                    {role === "student" && (
                      <>
                        <Link to="/transactions">My Transactions</Link>
                        <hr />
                      </>
                    )}
                    <button onClick={handleSignOut} className="button">
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            // Sign In button when not logged in
            <Link to="/signin">
              <button className="sign-in-btn button">Sign In</button>
            </Link>
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

      {/* Mobile menu remains the same */}
      <div
        className={`mobile-menu ${isMenuOpen ? "open" : ""}`}
        id="mobileMenu"
      >
        {/* ...mobile menu code */}
      </div>
    </>
  );
};

export default Navbar;

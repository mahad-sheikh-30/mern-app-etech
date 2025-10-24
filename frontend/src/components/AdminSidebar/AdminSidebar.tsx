import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./AdminSidebar.css";
import { useNotifications } from "../../hooks/useNotifications";
import { useUser } from "../../context/UserContext";
import bellIcon from "../../assets/bell.png";

const AdminSidebar: React.FC = () => {
  const navigate = useNavigate();
  const { user, logout } = useUser();
  const { notifications, unreadCount, markAsRead } = useNotifications(
    user?._id
  );

  const [menuOpen, setMenuOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);

  const handleSignOut = () => {
    logout();
    navigate("/signin");
  };

  const handleToggle = () => setMenuOpen((prev) => !prev);

  const handleNavigate = (path: string) => {
    navigate(path);
    setMenuOpen(false);
  };

  // Close notifications dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        !target.closest(".notif-icon") &&
        !target.closest(".notif-dropdown")
      ) {
        setIsNotifOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <>
      <button className="admin-toggle-btn" onClick={handleToggle}>
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </button>

      <div className={`admin-sidebar ${menuOpen ? "active" : ""}`}>
        <ul className="sidebar-links">
          <Link
            to="/admin"
            onClick={() => handleNavigate("/admin")}
            className="sidebar-title"
          >
            Admin Panel
          </Link>
          <hr />

          <li>
            <Link
              to="/admin/courses"
              onClick={() => handleNavigate("/admin/courses")}
            >
              Courses
            </Link>
          </li>
          <li>
            <Link
              to="/admin/teachers"
              onClick={() => handleNavigate("/admin/teachers")}
            >
              Teachers
            </Link>
          </li>
          <li>
            <Link
              to="/admin/enrollments"
              onClick={() => handleNavigate("/admin/enrollments")}
            >
              Enrollments
            </Link>
          </li>
          <li>
            <Link
              to="/admin/transactions"
              onClick={() => handleNavigate("/admin/transactions")}
            >
              Transactions
            </Link>
          </li>
        </ul>

        {/* Notifications bell */}
        <div className="admin-notif-container">
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

        <div className="btns">
          <button onClick={() => handleNavigate("/")} className="button">
            Home Page
          </button>
          <button onClick={handleSignOut} className="button">
            Sign Out
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="admin-backdrop" onClick={handleToggle}></div>
      )}
    </>
  );
};

export default AdminSidebar;

import React from "react";
import { Link } from "react-router-dom";
import "./AdminSidebar.css";
import { useNavigate } from "react-router-dom";
const AdminSidebar: React.FC = () => {
  const navigate = useNavigate();
  const handleSignOut = () => {
    localStorage.removeItem("token");
    navigate("/signin");
  };

  return (
    <div className="admin-sidebar">
      <ul className="sidebar-links">
        <li>
          <Link to="/admin" className="sidebar-title">
            Admin Panel
          </Link>
        </li>
        <hr />
        <li>
          <Link to="/admin/courses">Courses</Link>
        </li>
        <li>
          <Link to="/admin/teachers">Teachers</Link>
        </li>
        <li>
          <Link to="/admin/enrollments">Enrollments</Link>
        </li>
      </ul>
      <div className="btns">
        <button
          onClick={() => {
            navigate("/");
          }}
          className="button"
        >
          Home Page
        </button>
        <button onClick={handleSignOut} className="button">
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default AdminSidebar;

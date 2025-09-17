import React from "react";
import { Link } from "react-router-dom";
import "./AdminSidebar.css";

const AdminSidebar: React.FC = () => {
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
    </div>
  );
};

export default AdminSidebar;

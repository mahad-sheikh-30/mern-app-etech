import React, { useEffect, useState } from "react";

import "./AdminPanel.css";
import axios from "axios";
import "./AdminForms.css";
const AdminPanel: React.FC = () => {
  useEffect(() => {
    fetchUsers();
    fetchStudents();
  }, []);

  const handleDelete = (id: string) => {};
  const [users, setUsers] = useState<any>([]);
  const [students, setStudents] = useState<any>([]);
  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/users");
      setUsers(res.data);
    } catch (err) {
      console.error("Error fetching users:", err);
    }
  };
  const fetchStudents = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/users/students");
      setStudents(res.data);
    } catch (err) {
      console.error("Error fetching students:", err);
    }
  };
  return (
    <>
      <div className="admin-page">
        <h1>Admin Page</h1>
        <hr />
        <br />
        <h2>
          Hi , i am the admin of the Etech Platform and i can perform CRUD
          operations.
        </h2>
      </div>

      <div className="list">
        <h2>All Students</h2>
        <div className="comp-list">
          <div className="comp-list">
            {students.map((std: any) => (
              <div key={std._id} className="comp-card">
                <div className="info">
                  <p>
                    <strong>Name: </strong> {std.name}
                  </p>
                  <p>
                    <strong>Email: </strong> {std.email}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminPanel;

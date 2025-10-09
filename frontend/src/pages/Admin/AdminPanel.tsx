import React, { useEffect, useState } from "react";
import "./AdminPanel.css";
import API from "../../api/axiosInstance";
import "./AdminForms.css";
const AdminPanel: React.FC = () => {
  useEffect(() => {
    fetchUsers();
  }, []);
  const token = localStorage.getItem("token");
  if (!token) {
    alert("Please sign in first!");
    return;
  }

  const handleDelete = (id: string) => {};
  const [users, setUsers] = useState<any>([]);
  const fetchUsers = async () => {
    try {
      const res = await API.get("/users");
      setUsers(res.data);
    } catch (err) {
      console.error("Error fetching users:", err);
    }
  };

  return (
    <>
      <div className="admin-page">
        <h1>Admin Page</h1>
        <hr />
        <br />
        <h3>
          Hi , i am the admin of the Etech Platform and i can perform CRUD
          operations.
        </h3>
      </div>

      <div className="list">
        <h2>All Users</h2>
        <div className="comp-list">
          {users.length === 0 ? (
            <p>No users found.</p>
          ) : (
            users.map((user: any) =>
              user.role === "admin" ? null : (
                <div key={user._id} className="comp-card">
                  <div className="info">
                    <p>
                      <strong>Name: </strong> {user.name}
                    </p>
                    <p>
                      <strong>Email: </strong> {user.email}
                    </p>
                    <p>
                      <strong>Role: </strong> {user.role}
                    </p>
                  </div>
                </div>
              )
            )
          )}
        </div>
      </div>
    </>
  );
};

export default AdminPanel;

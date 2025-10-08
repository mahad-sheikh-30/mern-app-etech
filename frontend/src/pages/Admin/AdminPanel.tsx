import React, { useEffect, useState } from "react";

import "./AdminPanel.css";
import axios from "axios";
import "./AdminForms.css";
const AdminPanel: React.FC = () => {
  useEffect(() => {
    fetchUsers();
    fetchStudents();
    fetchTransactions();
  }, []);
  const token = localStorage.getItem("token");
  if (!token) {
    alert("Please sign in first!");
    return;
  }

  const handleDelete = (id: string) => {};
  const [users, setUsers] = useState<any>([]);
  const [students, setStudents] = useState<any>([]);
  const [transactions, setTransactions] = useState<any[]>([]);
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
  const fetchTransactions = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/transactions", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTransactions(res.data);
    } catch (err) {
      console.error("Error fetching transactions:", err);
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
        <h2>All Students</h2>
        <div className="comp-list">
          <div className="comp-list">
            {students.length === 0 ? (
              <p>No students found.</p>
            ) : (
              students.map((std: any) => (
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
              ))
            )}
          </div>
        </div>
      </div>
      <div className="list">
        <h2>All Transactions</h2>
        <div className="comp-list">
          {transactions.length === 0 ? (
            <p>No transactions found.</p>
          ) : (
            transactions.map((tx) => (
              <div key={tx.paymentIntentId} className="comp-card">
                <div className="info">
                  <p>
                    <strong>User:</strong> {tx.userId?.name || "Unknown"}
                  </p>
                  <p>
                    <strong>Course:</strong> {tx.courseId?.title || "N/A"}
                  </p>
                  <p>
                    <strong>Amount:</strong> ${tx.amount.toFixed(2)} USD
                  </p>
                  <p>
                    <strong>Date:</strong>{" "}
                    {new Date(tx.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default AdminPanel;

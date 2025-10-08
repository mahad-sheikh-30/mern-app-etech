import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Transactions.css";
const Transactions = () => {
  const token = localStorage.getItem("token");
  if (!token) {
    alert("Please sign in first!");
    return;
  }
  const [transactions, setTransactions] = useState<any[]>([]);
  useEffect(() => {
    fetchTransactions();
  }, []);
  const fetchTransactions = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/transactions/my", {
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
    <div className="trans-page">
      <div className="list">
        <h2>MY Transactions</h2>
        <div className="comp-list">
          {transactions.length === 0 ? (
            <p>No transactions found.</p>
          ) : (
            transactions.map((tx) => (
              <div key={tx.paymentIntentId} className="comp-card">
                <div className="info">
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
    </div>
  );
};

export default Transactions;

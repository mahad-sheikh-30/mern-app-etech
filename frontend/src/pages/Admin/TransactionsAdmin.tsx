import React, { useEffect, useState } from "react";
import TransactionsTable from "../../components/TransactionsTable/TransactionsTable";
import { getAllTransactions } from "../../api/transactionApi";

const AdminTransactions: React.FC = () => {
  const [transactions, setTransactions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAllTransactions();
  }, []);

  const fetchAllTransactions = async () => {
    try {
      const data = await getAllTransactions();
      setTransactions(data);
    } catch (err) {
      console.error("Error fetching all transactions:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p>Loading all transactions...</p>;

  return (
    <div>
      <h2 style={{ textAlign: "center" }}>All Transactions</h2>
      <TransactionsTable transactions={transactions} isAdmin />
    </div>
  );
};

export default AdminTransactions;

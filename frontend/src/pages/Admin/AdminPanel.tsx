import React, { useEffect, useState } from "react";
import "./AdminPanel.css";
import API from "../../api/axiosInstance";
import "./AdminForms.css";
import { useUser } from "../../context/UserContext";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import AppDataTable from "../../components/AppDataTable/AppDataTable";
import { io, Socket } from "socket.io-client";

const userColumns = [
  { name: "Name", selector: (row: any) => row.name, sortable: true },
  { name: "Email", selector: (row: any) => row.email },
  { name: "Role", selector: (row: any) => row.role },
];

const AdminPanel: React.FC = () => {
  const { user } = useUser();
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const newSocket = io(
      import.meta.env.VITE_BACKEND_URL || "http://localhost:8080"
    );
    setSocket(newSocket);

    newSocket.on("enrollmentCreated", (data) => {
      console.log("🎓 New enrollment event:", data);
      toast.success(data.message || "A student enrolled in a new course!");
    });

    return () => {
      newSocket.disconnect();
    };
  }, []);

  if (!user?.token) {
    toast.error("Please sign in first!");
    return;
  }

  const { data: users = [], isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: async () => (await API.get("/users")).data,
  });

  if (isLoading) return <h2>Loading users...</h2>;

  return (
    <div className="admin-page">
      <h1>Admin Page</h1>
      <hr />
      <AppDataTable
        title="All Users"
        data={users.filter((u: any) => u.role !== "admin")}
        columns={userColumns}
        isLoading={isLoading}
      />
    </div>
  );
};

export default AdminPanel;

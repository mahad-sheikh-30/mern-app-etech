import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import API from "../api/axiosInstance";

let socket: Socket | null = null;

export const useNotifications = (userId?: string) => {
  const [notifications, setNotifications] = useState<any[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    if (!userId) return; // Wait until userId is available

    // 🔹 1. Fetch existing notifications from the database
    const fetchNotifications = async () => {
      try {
        const res = await API.get("/notifications", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        console.log("Fetched notifications from DB:", res.data);
        setNotifications(res.data);
        setUnreadCount(res.data.filter((n: any) => !n.read).length);
      } catch (err) {
        console.error("Error fetching notifications:", err);
      }
    };

    fetchNotifications();

    // 🔹 2. Initialize socket once
    if (!socket) {
      socket = io(import.meta.env.VITE_BACKEND_URL || "http://localhost:8080", {
        reconnection: true,
        transports: ["websocket"], // ensures real-time connection
      });
      console.log("Socket client created (awaiting connect...)");
    }

    // 🔹 3. Handle socket connection
    const handleConnect = () => {
      console.log("✅ Socket connected:", socket?.id);
      if (userId) {
        console.log("Joining room:", userId);
        socket?.emit("joinRoom", userId);
      }
    };

    // 🔹 4. Handle incoming real-time notification
    const handleNotif = (notif: any) => {
      console.log("📩 Received notification via socket:", notif);
      setNotifications((prev) => [notif, ...prev]);
      setUnreadCount((prev) => prev + 1);
    };

    socket.on("connect", handleConnect);
    socket.on("notification", handleNotif);

    // 🔹 5. Cleanup on unmount
    return () => {
      socket?.off("connect", handleConnect);
      socket?.off("notification", handleNotif);
    };
  }, [userId]);

  // 🔹 6. Mark a notification as read
  const markAsRead = async (id: string) => {
    try {
      await API.patch(`/notifications/${id}/read`, null, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      console.log("Marked notification as read:", id);
      setNotifications((prev) =>
        prev.map((n) => (n._id === id ? { ...n, read: true } : n))
      );
      setUnreadCount((prev) => Math.max(prev - 1, 0));
    } catch (err) {
      console.error("Error marking as read:", err);
    }
  };

  return { notifications, unreadCount, markAsRead };
};

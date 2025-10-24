// hooks/useNotifications.ts
import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import axios from "axios";
import API from "../api/axiosInstance";

let socket: Socket;

export const useNotifications = (userId?: string) => {
  const [notifications, setNotifications] = useState<any[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    if (!userId) return;

    // Fetch existing notifications
    const fetchNotifications = async () => {
      try {
        const res = await API.get("/notifications", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setNotifications(res.data);
        setUnreadCount(res.data.filter((n: any) => !n.read).length);
      } catch (err) {
        console.error("Error fetching notifications:", err);
      }
    };

    fetchNotifications();

    // Setup socket
    if (!socket) {
      socket = io(import.meta.env.VITE_BACKEND_URL || "http://localhost:8080");
    }

    socket.on("connect", () => {
      console.log("Socket connected:", socket.id);
      // Join room for this user
      socket.emit("joinRoom", userId);
    });

    socket.on("notification", (notif) => {
      setNotifications((prev) => [notif, ...prev]);
      setUnreadCount((prev) => prev + 1);
    });

    return () => {
      socket.off("notification");
      socket.disconnect();
    };
  }, [userId]);

  const markAsRead = async (id: string) => {
    try {
      await API.patch(`/notifications/${id}/read`, null, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setNotifications((prev) =>
        prev.map((n) => (n._id === id ? { ...n, read: true } : n))
      );
      setUnreadCount((prev) => Math.max(prev - 1, 0));
    } catch (err) {
      console.error("Error marking notification as read:", err);
    }
  };

  return { notifications, unreadCount, markAsRead };
};

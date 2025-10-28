import { useEffect, useState, useRef } from "react";
import { io, Socket } from "socket.io-client";
import API from "../api/axiosInstance";

let socket: Socket | null = null;

export const useNotifications = (userId?: string) => {
  const [notifications, setNotifications] = useState<any[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const isFetched = useRef(false); // prevent multiple DB fetches on re-renders

  useEffect(() => {
    if (!userId) return;

    // 🔹 1. Fetch notifications only once per user
    const fetchNotifications = async () => {
      if (isFetched.current) return;
      isFetched.current = true;

      try {
        const res = await API.get("/notifications", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        setNotifications(res.data);
        setUnreadCount(res.data.filter((n: any) => !n.read).length);
      } catch (err) {
        console.error("❌ Error fetching notifications:", err);
      }
    };

    fetchNotifications();

    // 🔹 2. Initialize socket only once globally
    if (!socket) {
      socket = io(import.meta.env.VITE_BACKEND_URL || "http://localhost:8080", {
        transports: ["websocket"],
        reconnection: true,
      });
      console.log("🟢 Socket.io client initialized");
    }

    // 🔹 3. Join user-specific room
    const handleConnect = () => {
      console.log("✅ Socket connected:", socket?.id);
      socket?.emit("joinRoom", userId);
    };

    // 🔹 4. Listen for live notifications
    const handleNotif = (notif: any) => {
      console.log("📩 Live notification received:", notif);

      // Prevent duplicates (if backend accidentally emits same notif twice)
      setNotifications((prev) => {
        if (prev.some((n) => n._id === notif._id)) return prev;
        return [notif, ...prev];
      });
      setUnreadCount((prev) => prev + 1);
    };

    socket.on("connect", handleConnect);
    socket.on("notification", handleNotif);

    // 🔹 5. Clean up listeners on unmount
    return () => {
      socket?.off("connect", handleConnect);
      socket?.off("notification", handleNotif);
    };
  }, [userId]);

  // 🔹 6. Mark notification as read
  const markAsRead = async (id: string) => {
    try {
      await API.patch(`/notifications/${id}/read`, null, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setNotifications((prev) =>
        prev.map((n) => (n._id === id ? { ...n, read: true } : n))
      );
      setUnreadCount((prev) => Math.max(prev - 1, 0));
    } catch (err) {
      console.error("❌ Error marking notification as read:", err);
    }
  };

  return { notifications, unreadCount, markAsRead };
};

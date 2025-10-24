import React, { useState, useEffect, useRef } from "react";
import { useNotifications } from "../../hooks/useNotifications";
import { useUser } from "../../context/UserContext";
import bellIcon from "../../assets/bell.png";
import "./NotificationBell.css";

const NotificationBell: React.FC = () => {
  const { user } = useUser();

  // ✅ Don’t render anything if user not logged in
  if (!user) return null;

  // ✅ Only call the hook after confirming user exists
  const { notifications, unreadCount, markAsRead } = useNotifications(user._id);
  const [isOpen, setIsOpen] = useState(false);
  const bellRef = useRef<HTMLDivElement>(null);

  // ✅ Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (bellRef.current && !bellRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <div className="floating-bell-container" ref={bellRef}>
      <div className="floating-bell" onClick={() => setIsOpen(!isOpen)}>
        <img src={bellIcon} alt="Notifications" />
        {unreadCount > 0 && (
          <span className="floating-badge">{unreadCount}</span>
        )}
      </div>

      {isOpen && (
        <div className="floating-dropdown">
          {notifications.length === 0 ? (
            <p>No notifications</p>
          ) : (
            notifications.map((notif: any) => (
              <div
                key={notif._id}
                className={`notif-item ${notif.read ? "" : "unread"}`}
                onClick={() => markAsRead(notif._id)}
              >
                {notif.message}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default NotificationBell;

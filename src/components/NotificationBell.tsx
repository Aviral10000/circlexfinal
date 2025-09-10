import { useState } from "react";

interface Notification {
  id: number;
  type: "match" | "message" | "connection" | "pitch";
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
}

interface NotificationBellProps {
  notifications: Notification[];
  onNotificationClick: (notification: Notification) => void;
}

export default function NotificationBell({ notifications, onNotificationClick }: NotificationBellProps) {
  const [isOpen, setIsOpen] = useState(false);
  const unreadCount = notifications.filter(n => !n.isRead).length;

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "match": return "💚";
      case "message": return "💬";
      case "connection": return "🤝";
      case "pitch": return "💰";
      default: return "🔔";
    }
  };

  const formatTime = (timestamp: string) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diff = now.getTime() - time.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return "Just now";
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  return (
    <div style={{ position: "relative" }}>
      {/* Bell Icon */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          background: "rgba(255,255,255,0.1)",
          border: "1px solid rgba(255,255,255,0.2)",
          borderRadius: "8px",
          padding: "8px",
          color: "#fff",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          transition: "all 0.2s ease"
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = "rgba(255,255,255,0.15)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = "rgba(255,255,255,0.1)";
        }}
      >
        <span style={{ fontSize: "18px" }}>🔔</span>
        {unreadCount > 0 && (
          <div
            style={{
              position: "absolute",
              top: "-4px",
              right: "-4px",
              background: "#ef4444",
              color: "#fff",
              borderRadius: "50%",
              width: "18px",
              height: "18px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "10px",
              fontWeight: "bold"
            }}
          >
            {unreadCount > 9 ? "9+" : unreadCount}
          </div>
        )}
      </button>

      {/* Notification Dropdown */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 998
            }}
            onClick={() => setIsOpen(false)}
          />
          
          {/* Dropdown */}
          <div
            style={{
              position: "absolute",
              top: "100%",
              right: 0,
              background: "rgba(0,0,0,0.95)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: "12px",
              padding: "16px 0",
              minWidth: "320px",
              maxWidth: "400px",
              maxHeight: "400px",
              overflowY: "auto",
              zIndex: 999,
              backdropFilter: "blur(10px)",
              boxShadow: "0 20px 40px rgba(0,0,0,0.3)"
            }}
          >
            {/* Header */}
            <div style={{
              padding: "0 16px 12px",
              borderBottom: "1px solid rgba(255,255,255,0.1)",
              marginBottom: "8px"
            }}>
              <h3 style={{
                fontSize: "16px",
                fontWeight: "600",
                color: "#fff",
                margin: "0 0 4px"
              }}>
                Notifications
              </h3>
              {unreadCount > 0 && (
                <p style={{
                  fontSize: "12px",
                  color: "rgba(255,255,255,0.6)",
                  margin: 0
                }}>
                  {unreadCount} unread
                </p>
              )}
            </div>

            {/* Notifications List */}
            {notifications.length > 0 ? (
              <div>
                {notifications.slice(0, 5).map((notification) => (
                  <div
                    key={notification.id}
                    onClick={() => onNotificationClick(notification)}
                    style={{
                      padding: "12px 16px",
                      cursor: "pointer",
                      borderBottom: "1px solid rgba(255,255,255,0.05)",
                      background: notification.isRead 
                        ? "transparent" 
                        : "rgba(16, 185, 129, 0.1)",
                      transition: "background 0.2s ease"
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "rgba(255,255,255,0.05)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = notification.isRead 
                        ? "transparent" 
                        : "rgba(16, 185, 129, 0.1)";
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
                      <div style={{ fontSize: "20px", marginTop: "2px" }}>
                        {getNotificationIcon(notification.type)}
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{
                          fontSize: "14px",
                          fontWeight: notification.isRead ? "400" : "600",
                          color: "#fff",
                          marginBottom: "4px"
                        }}>
                          {notification.title}
                        </div>
                        <div style={{
                          fontSize: "12px",
                          color: "rgba(255,255,255,0.7)",
                          marginBottom: "4px",
                          lineHeight: 1.4
                        }}>
                          {notification.message}
                        </div>
                        <div style={{
                          fontSize: "11px",
                          color: "rgba(255,255,255,0.5)"
                        }}>
                          {formatTime(notification.timestamp)}
                        </div>
                      </div>
                      {!notification.isRead && (
                        <div
                          style={{
                            width: "8px",
                            height: "8px",
                            borderRadius: "50%",
                            background: "#10b981",
                            marginTop: "6px"
                          }}
                        />
                      )}
                    </div>
                  </div>
                ))}
                {notifications.length > 5 && (
                  <div style={{
                    padding: "12px 16px",
                    textAlign: "center",
                    borderTop: "1px solid rgba(255,255,255,0.1)"
                  }}>
                    <span style={{
                      fontSize: "12px",
                      color: "rgba(255,255,255,0.6)"
                    }}>
                      View all notifications
                    </span>
                  </div>
                )}
              </div>
            ) : (
              <div style={{
                padding: "32px 16px",
                textAlign: "center"
              }}>
                <div style={{ fontSize: "32px", marginBottom: "12px" }}>🔔</div>
                <p style={{
                  fontSize: "14px",
                  color: "rgba(255,255,255,0.6)",
                  margin: 0
                }}>
                  No notifications yet
                </p>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}

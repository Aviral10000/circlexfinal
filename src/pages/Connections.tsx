import { useState, useEffect } from "react";
import Layout from "../components/Layout";

interface Connection {
  id: number;
  name: string;
  title: string;
  company: string;
  industry: string;
  avatar: string;
  isOnline: boolean;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  connectionDate: string;
}

export default function Connections() {
  const [connections, setConnections] = useState<Connection[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // Mock data for connections
    const mockConnections: Connection[] = [
      {
        id: 1,
        name: "Sarah Chen",
        title: "CEO",
        company: "TechFlow",
        industry: "AI/ML",
        avatar: "SC",
        isOnline: true,
        lastMessage: "Thanks for the intro! Let's schedule a call this week.",
        lastMessageTime: "2m ago",
        unreadCount: 0,
        connectionDate: "2024-01-15"
      },
      {
        id: 2,
        name: "Michael Rodriguez",
        title: "CTO",
        company: "DataVault",
        industry: "FinTech",
        avatar: "MR",
        isOnline: false,
        lastMessage: "The partnership proposal looks great. Let's discuss next steps.",
        lastMessageTime: "1h ago",
        unreadCount: 2,
        connectionDate: "2024-01-10"
      },
      {
        id: 3,
        name: "Emily Watson",
        title: "Founder",
        company: "HealthTech Solutions",
        industry: "Healthcare",
        avatar: "EW",
        isOnline: true,
        lastMessage: "Looking forward to our meeting tomorrow!",
        lastMessageTime: "3h ago",
        unreadCount: 0,
        connectionDate: "2024-01-08"
      },
      {
        id: 4,
        name: "David Kim",
        title: "VP Engineering",
        company: "CloudScale",
        industry: "Software",
        avatar: "DK",
        isOnline: false,
        lastMessage: "The technical architecture looks solid. Great work!",
        lastMessageTime: "1d ago",
        unreadCount: 1,
        connectionDate: "2024-01-05"
      },
      {
        id: 5,
        name: "Lisa Thompson",
        title: "CMO",
        company: "GrowthLab",
        industry: "E-Commerce",
        avatar: "LT",
        isOnline: true,
        lastMessage: "Let's collaborate on the marketing strategy.",
        lastMessageTime: "2d ago",
        unreadCount: 0,
        connectionDate: "2024-01-03"
      }
    ];
    setConnections(mockConnections);
  }, []);

  const filteredConnections = connections.filter(connection =>
    connection.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    connection.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
    connection.industry.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Layout>
      <div style={{ color: "#fff" }}>
        {/* Header */}
        <div style={{ marginBottom: "32px" }}>
          <h1 style={{ fontSize: "32px", fontWeight: "bold", margin: "0 0 8px" }}>
            Connections
          </h1>
          <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "16px", margin: 0 }}>
            Your network of connected founders and professionals
          </p>
        </div>

        {/* Search Bar */}
        <div style={{ marginBottom: "24px" }}>
          <input
            type="text"
            placeholder="Search connections..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: "8px",
              padding: "12px 16px",
              color: "#fff",
              fontSize: "14px",
              width: "100%",
              maxWidth: "400px",
              outline: "none"
            }}
          />
        </div>

        {/* Connections List */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {filteredConnections.map((connection) => (
            <div
              key={connection.id}
              style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "12px",
                padding: "20px",
                display: "flex",
                alignItems: "center",
                gap: "16px",
                cursor: "pointer",
                transition: "all 0.2s ease"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.08)";
                e.currentTarget.style.borderColor = "rgba(16, 185, 129, 0.3)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.05)";
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
              }}
            >
              {/* Avatar */}
              <div style={{ position: "relative" }}>
                <div
                  style={{
                    width: "60px",
                    height: "60px",
                    background: "#10b981",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "18px",
                    fontWeight: "bold",
                    color: "#fff"
                  }}
                >
                  {connection.avatar}
                </div>
                {connection.isOnline && (
                  <div
                    style={{
                      position: "absolute",
                      bottom: "2px",
                      right: "2px",
                      width: "14px",
                      height: "14px",
                      borderRadius: "50%",
                      background: "#10b981",
                      border: "2px solid #000"
                    }}
                  ></div>
                )}
              </div>

              {/* Connection Info */}
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
                  <h3 style={{ fontSize: "18px", fontWeight: "600", margin: 0, color: "#fff" }}>
                    {connection.name}
                  </h3>
                  {connection.unreadCount > 0 && (
                    <div
                      style={{
                        background: "#ef4444",
                        color: "#fff",
                        borderRadius: "50%",
                        width: "20px",
                        height: "20px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "12px",
                        fontWeight: "bold"
                      }}
                    >
                      {connection.unreadCount}
                    </div>
                  )}
                </div>
                <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "14px", margin: "0 0 4px" }}>
                  {connection.title} at {connection.company}
                </p>
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <span
                    style={{
                      background: "rgba(16, 185, 129, 0.2)",
                      border: "1px solid rgba(16, 185, 129, 0.3)",
                      borderRadius: "12px",
                      padding: "2px 8px",
                      fontSize: "12px",
                      color: "#10b981"
                    }}
                  >
                    {connection.industry}
                  </span>
                  <span style={{ color: "rgba(255,255,255,0.5)", fontSize: "12px" }}>
                    Connected {new Date(connection.connectionDate).toLocaleDateString()}
                  </span>
                </div>
              </div>

              {/* Last Message */}
              <div style={{ textAlign: "right", maxWidth: "300px" }}>
                <p
                  style={{
                    color: connection.unreadCount > 0 ? "#fff" : "rgba(255,255,255,0.6)",
                    fontSize: "14px",
                    margin: "0 0 4px",
                    fontWeight: connection.unreadCount > 0 ? "500" : "400"
                  }}
                >
                  {connection.lastMessage}
                </p>
                <span style={{ color: "rgba(255,255,255,0.4)", fontSize: "12px" }}>
                  {connection.lastMessageTime}
                </span>
              </div>
            </div>
          ))}
        </div>

        {filteredConnections.length === 0 && (
          <div style={{ textAlign: "center", padding: "60px 20px" }}>
            <div style={{ fontSize: "48px", marginBottom: "16px" }}>🔍</div>
            <h3 style={{ fontSize: "20px", margin: "0 0 8px", color: "#fff" }}>
              No connections found
            </h3>
            <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "16px" }}>
              Try adjusting your search terms or start connecting with founders in Discover.
            </p>
          </div>
        )}
      </div>
    </Layout>
  );
}

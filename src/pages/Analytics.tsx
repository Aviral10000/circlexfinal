import { useState } from "react";
import Layout from "../components/Layout";

export default function Analytics() {
  const [timeRange, setTimeRange] = useState("30d");

  const stats = {
    connections: {
      total: 24,
      new: 8,
      growth: "+33%"
    },
    profile: {
      views: 156,
      likes: 42,
      matches: 18
    },
    engagement: {
      messages: 67,
      responseRate: "89%",
      avgResponseTime: "2.3h"
    },
    network: {
      reach: 1240,
      industries: 8,
      locations: 12
    }
  };

  const recentActivity = [
    { type: "connection", user: "Sarah Chen", action: "connected with you", time: "2h ago", icon: "🤝" },
    { type: "message", user: "Michael Rodriguez", action: "sent you a message", time: "4h ago", icon: "💬" },
    { type: "view", user: "Emily Watson", action: "viewed your profile", time: "6h ago", icon: "👁️" },
    { type: "match", user: "David Kim", action: "matched with you", time: "1d ago", icon: "✨" },
    { type: "connection", user: "Lisa Thompson", action: "connected with you", time: "2d ago", icon: "🤝" }
  ];

  const topIndustries = [
    { name: "AI/ML", count: 8, percentage: 33 },
    { name: "FinTech", count: 6, percentage: 25 },
    { name: "Healthcare", count: 4, percentage: 17 },
    { name: "E-Commerce", count: 3, percentage: 12 },
    { name: "Software", count: 3, percentage: 13 }
  ];

  return (
    <Layout>
      <div style={{ color: "#fff" }}>
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "32px" }}>
          <div>
            <h1 style={{ fontSize: "32px", fontWeight: "bold", margin: "0 0 8px" }}>
              Analytics
            </h1>
            <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "16px", margin: 0 }}>
              Track your networking progress and engagement metrics
            </p>
          </div>
          
          {/* Time Range Selector */}
          <div style={{ display: "flex", gap: "8px" }}>
            {["7d", "30d", "90d"].map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                style={{
                  background: timeRange === range ? "#10b981" : "rgba(255,255,255,0.1)",
                  border: "1px solid rgba(255,255,255,0.2)",
                  borderRadius: "8px",
                  padding: "8px 16px",
                  color: timeRange === range ? "#000" : "#fff",
                  fontSize: "14px",
                  fontWeight: "600",
                  cursor: "pointer",
                  transition: "all 0.2s ease"
                }}
              >
                {range}
              </button>
            ))}
          </div>
        </div>

        {/* Stats Grid */}
        <div style={{ 
          display: "grid", 
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", 
          gap: "24px", 
          marginBottom: "32px" 
        }}>
          {/* Connections Stats */}
          <div style={{
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: "16px",
            padding: "24px"
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
              <div style={{ fontSize: "24px" }}>🤝</div>
              <h3 style={{ fontSize: "18px", fontWeight: "600", margin: 0, color: "#fff" }}>
                Connections
              </h3>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <div style={{ fontSize: "32px", fontWeight: "bold", color: "#10b981", marginBottom: "4px" }}>
                  {stats.connections.total}
                </div>
                <div style={{ fontSize: "14px", color: "rgba(255,255,255,0.6)" }}>
                  Total connections
                </div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: "16px", fontWeight: "600", color: "#10b981", marginBottom: "4px" }}>
                  {stats.connections.growth}
                </div>
                <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.6)" }}>
                  {stats.connections.new} new this month
                </div>
              </div>
            </div>
          </div>

          {/* Profile Stats */}
          <div style={{
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: "16px",
            padding: "24px"
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
              <div style={{ fontSize: "24px" }}>👁️</div>
              <h3 style={{ fontSize: "18px", fontWeight: "600", margin: 0, color: "#fff" }}>
                Profile Views
              </h3>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <div style={{ fontSize: "32px", fontWeight: "bold", color: "#10b981", marginBottom: "4px" }}>
                  {stats.profile.views}
                </div>
                <div style={{ fontSize: "14px", color: "rgba(255,255,255,0.6)" }}>
                  Total views
                </div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: "16px", fontWeight: "600", color: "#10b981", marginBottom: "4px" }}>
                  {stats.profile.likes}
                </div>
                <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.6)" }}>
                  Profile likes
                </div>
              </div>
            </div>
          </div>

          {/* Engagement Stats */}
          <div style={{
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: "16px",
            padding: "24px"
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
              <div style={{ fontSize: "24px" }}>💬</div>
              <h3 style={{ fontSize: "18px", fontWeight: "600", margin: 0, color: "#fff" }}>
                Engagement
              </h3>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <div style={{ fontSize: "32px", fontWeight: "bold", color: "#10b981", marginBottom: "4px" }}>
                  {stats.engagement.messages}
                </div>
                <div style={{ fontSize: "14px", color: "rgba(255,255,255,0.6)" }}>
                  Messages sent
                </div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: "16px", fontWeight: "600", color: "#10b981", marginBottom: "4px" }}>
                  {stats.engagement.responseRate}
                </div>
                <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.6)" }}>
                  Response rate
                </div>
              </div>
            </div>
          </div>

          {/* Network Stats */}
          <div style={{
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: "16px",
            padding: "24px"
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
              <div style={{ fontSize: "24px" }}>🌐</div>
              <h3 style={{ fontSize: "18px", fontWeight: "600", margin: 0, color: "#fff" }}>
                Network Reach
              </h3>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <div style={{ fontSize: "32px", fontWeight: "bold", color: "#10b981", marginBottom: "4px" }}>
                  {stats.network.reach}
                </div>
                <div style={{ fontSize: "14px", color: "rgba(255,255,255,0.6)" }}>
                  Total reach
                </div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: "16px", fontWeight: "600", color: "#10b981", marginBottom: "4px" }}>
                  {stats.network.industries}
                </div>
                <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.6)" }}>
                  Industries
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Charts and Data */}
        <div style={{ 
          display: "grid", 
          gridTemplateColumns: "1fr 1fr", 
          gap: "24px", 
          marginBottom: "32px" 
        }}>
          {/* Top Industries */}
          <div style={{
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: "16px",
            padding: "24px"
          }}>
            <h3 style={{ fontSize: "18px", fontWeight: "600", margin: "0 0 20px", color: "#fff" }}>
              Top Industries
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {topIndustries.map((industry, index) => (
                <div key={index} style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <div style={{ width: "60px", fontSize: "12px", color: "rgba(255,255,255,0.6)" }}>
                    {industry.name}
                  </div>
                  <div style={{ flex: 1, background: "rgba(255,255,255,0.1)", borderRadius: "4px", height: "8px", position: "relative" }}>
                    <div 
                      style={{ 
                        background: "#10b981", 
                        height: "100%", 
                        borderRadius: "4px", 
                        width: `${industry.percentage}%` 
                      }}
                    ></div>
                  </div>
                  <div style={{ width: "40px", fontSize: "12px", color: "#fff", textAlign: "right" }}>
                    {industry.count}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div style={{
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: "16px",
            padding: "24px"
          }}>
            <h3 style={{ fontSize: "18px", fontWeight: "600", margin: "0 0 20px", color: "#fff" }}>
              Recent Activity
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {recentActivity.map((activity, index) => (
                <div key={index} style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <div style={{ fontSize: "20px" }}>{activity.icon}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: "14px", color: "#fff", marginBottom: "2px" }}>
                      <strong>{activity.user}</strong> {activity.action}
                    </div>
                    <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.5)" }}>
                      {activity.time}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Performance Metrics */}
        <div style={{
          background: "rgba(255,255,255,0.05)",
          border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: "16px",
          padding: "24px"
        }}>
          <h3 style={{ fontSize: "18px", fontWeight: "600", margin: "0 0 20px", color: "#fff" }}>
            Performance Metrics
          </h3>
          <div style={{ 
            display: "grid", 
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", 
            gap: "20px" 
          }}>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: "24px", fontWeight: "bold", color: "#10b981", marginBottom: "4px" }}>
                {stats.profile.matches}
              </div>
              <div style={{ fontSize: "14px", color: "rgba(255,255,255,0.6)" }}>
                Total Matches
              </div>
            </div>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: "24px", fontWeight: "bold", color: "#10b981", marginBottom: "4px" }}>
                {stats.engagement.avgResponseTime}
              </div>
              <div style={{ fontSize: "14px", color: "rgba(255,255,255,0.6)" }}>
                Avg Response Time
              </div>
            </div>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: "24px", fontWeight: "bold", color: "#10b981", marginBottom: "4px" }}>
                {stats.network.locations}
              </div>
              <div style={{ fontSize: "14px", color: "rgba(255,255,255,0.6)" }}>
                Locations
              </div>
            </div>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: "24px", fontWeight: "bold", color: "#10b981", marginBottom: "4px" }}>
                4.8
              </div>
              <div style={{ fontSize: "14px", color: "rgba(255,255,255,0.6)" }}>
                Profile Rating
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

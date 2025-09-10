import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

interface MobileNavigationProps {
  isVisible: boolean;
}

export default function MobileNavigation({ isVisible }: MobileNavigationProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navigationItems = [
    { id: "discover", label: "Discover", icon: "🔍", path: "/founder" },
    { id: "connections", label: "Connections", icon: "💎", path: "/connections" },
    { id: "inbox", label: "Inbox", icon: "💬", path: "/inbox" },
    { id: "profile", label: "Profile", icon: "👤", path: "/profile" },
    { id: "events", label: "Events", icon: "🎪", path: "/virtual-events" }
  ];

  const sidebarItems = [
    { id: "mentors", label: "Mentors", icon: "🎓", path: "/mentors" },
    { id: "investors", label: "Investors", icon: "💰", path: "/investors" },
    { id: "cofounders", label: "Cofounders", icon: "🤝", path: "/cofounders" },
    { id: "analytics", label: "Analytics", icon: "📊", path: "/analytics" },
    { id: "settings", label: "Settings", icon: "⚙️", path: "/settings" }
  ];

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  if (!isVisible) return null;

  return (
    <>
      {/* Mobile Header */}
      <div className="mobile-header">
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <button
            onClick={() => setSidebarOpen(true)}
            className="mobile-header-button"
            style={{
              background: "rgba(255, 255, 255, 0.1)",
              border: "1px solid rgba(255, 255, 255, 0.2)",
              borderRadius: "8px",
              padding: "8px 12px",
              color: "#ffffff",
              fontSize: "14px",
              cursor: "pointer",
              transition: "all 0.2s ease"
            }}
          >
            ☰
          </button>
          <h1 className="mobile-header-title">Circle x</h1>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <div style={{
            width: "8px",
            height: "8px",
            borderRadius: "50%",
            background: "#10b981",
            animation: "pulse 2s infinite"
          }}></div>
          <span style={{ fontSize: "12px", color: "rgba(255, 255, 255, 0.7)" }}>
            Online
          </span>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <div className={`mobile-sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "32px"
        }}>
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: "12px"
          }}>
            <div style={{
              width: "40px",
              height: "40px",
              borderRadius: "12px",
              background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "18px",
              fontWeight: "700",
              color: "#ffffff"
            }}>
              CX
            </div>
            <div>
              <div style={{
                fontSize: "18px",
                fontWeight: "600",
                color: "#ffffff",
                letterSpacing: "-0.3px"
              }}>
                Circle x
              </div>
              <div style={{
                fontSize: "12px",
                color: "rgba(255, 255, 255, 0.6)"
              }}>
                Founder Network
              </div>
            </div>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            style={{
              background: "rgba(255, 255, 255, 0.1)",
              border: "1px solid rgba(255, 255, 255, 0.2)",
              borderRadius: "8px",
              padding: "8px",
              color: "#ffffff",
              fontSize: "16px",
              cursor: "pointer",
              transition: "all 0.2s ease"
            }}
          >
            ✕
          </button>
        </div>

        <nav style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          {sidebarItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                handleNavigation(item.path);
                setSidebarOpen(false);
              }}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                padding: "12px 16px",
                background: location.pathname === item.path 
                  ? "rgba(255, 255, 255, 0.1)" 
                  : "transparent",
                border: "none",
                borderRadius: "12px",
                color: location.pathname === item.path 
                  ? "#ffffff" 
                  : "rgba(255, 255, 255, 0.7)",
                fontSize: "14px",
                fontWeight: "500",
                cursor: "pointer",
                transition: "all 0.2s ease",
                textAlign: "left"
              }}
            >
              <span style={{ fontSize: "18px" }}>{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Mobile Sidebar Overlay */}
      <div 
        className={`mobile-sidebar-overlay ${sidebarOpen ? 'open' : ''}`}
        onClick={() => setSidebarOpen(false)}
      />

      {/* Mobile Bottom Navigation */}
      <div className="mobile-nav">
        <div className="mobile-nav-items">
          {navigationItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavigation(item.path)}
              className={`mobile-nav-item ${location.pathname === item.path ? 'active' : ''}`}
            >
              <span className="mobile-nav-icon">{item.icon}</span>
              {item.label}
            </button>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>
    </>
  );
}

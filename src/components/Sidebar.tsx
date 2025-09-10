import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

export default function Sidebar({ isOpen, onToggle }: SidebarProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const [navigatingTo, setNavigatingTo] = useState<string | null>(null);

  const menuItems = [
    { id: "discover", label: "Discover", icon: "🔍", path: "/founder" },
    { id: "connections", label: "Connections", icon: "💎", path: "/connections" },
    { id: "inbox", label: "Inbox", icon: "💬", path: "/inbox" },
    { id: "profile", label: "Profile", icon: "👤", path: "/profile" },
    { id: "mentors", label: "Mentors", icon: "🎓", path: "/mentors" },
    { id: "investors", label: "Investors", icon: "💰", path: "/investors" },
    { id: "cofounders", label: "Cofounders", icon: "🤝", path: "/cofounders" },
    { id: "virtual-events", label: "Virtual Events", icon: "🎪", path: "/virtual-events" },
    { id: "success-stories", label: "Success Stories", icon: "📈", path: "/success-stories" },
    { id: "idea-validation", label: "Idea Validation", icon: "💡", path: "/idea-validation" },
    { id: "founder-score", label: "Founder Score", icon: "🏆", path: "/founder-score" },
    { id: "events", label: "Events", icon: "📅", path: "/events" },
    { id: "verification", label: "Verification", icon: "✅", path: "/verification" },
    { id: "analytics", label: "Analytics", icon: "📊", path: "/analytics" },
    { id: "settings", label: "Settings", icon: "⚙️", path: "/settings" },
  ];

  const handleNavigation = (path: string) => {
    setNavigatingTo(path);
    navigate(path);
    // Close sidebar on mobile after navigation
    if (window.innerWidth <= 768) {
      onToggle();
    }
    // Clear navigation state after a short delay
    setTimeout(() => setNavigatingTo(null), 500);
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0,0,0,0.5)",
            zIndex: 998,
          }}
          onClick={onToggle}
        />
      )}

      {/* Sidebar */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          height: "100vh",
          width: "280px",
          background: "linear-gradient(180deg, #000000 0%, #111111 100%)",
          borderRight: "1px solid rgba(255, 255, 255, 0.1)",
          zIndex: 999,
          transform: isOpen ? "translateX(0)" : "translateX(-100%)",
          transition: "transform 0.3s ease",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Header */}
        <div style={{ padding: "32px 24px", borderBottom: "1px solid rgba(255, 255, 255, 0.1)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            {/* Logo */}
            <div
              style={{
                width: "36px",
                height: "36px",
                background: "#ffffff",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)"
              }}
            >
              {/* Premium Stylized X */}
              <div style={{
                position: "relative",
                width: "20px",
                height: "20px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}>
                <span style={{
                  fontSize: "14px",
                  fontWeight: "900",
                  color: "#1a1a1a",
                  fontFamily: "'Times New Roman', serif",
                  letterSpacing: "0px",
                  textShadow: "0 1px 2px rgba(0,0,0,0.1)",
                  transform: "rotate(0deg)",
                  lineHeight: 1,
                  fontStyle: "italic"
                }}>
                  x
                </span>
              </div>
            </div>
            
            {/* App Name */}
            <div>
              <div style={{ color: "rgba(255,255,255,0.7)", fontSize: "13px", fontWeight: "500" }}>
                FOUNDER NETWORK
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Items */}
        <div style={{ 
          flex: 1, 
          padding: "20px 0", 
          overflowY: "auto",
          overflowX: "hidden"
        }}>
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            const isNavigating = navigatingTo === item.path;
            return (
              <div
                key={item.id}
                onClick={() => handleNavigation(item.path)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  padding: "12px 20px",
                  cursor: isNavigating ? "wait" : "pointer",
                  background: isActive ? "rgba(255, 255, 255, 0.08)" : "transparent",
                  color: isActive ? "#ffffff" : isNavigating ? "rgba(255,255,255,0.5)" : "rgba(255,255,255,0.7)",
                  transition: "all 0.2s ease",
                  margin: "4px 12px",
                  borderRadius: "8px",
                  opacity: isNavigating ? 0.7 : 1,
                  transform: isNavigating ? "scale(0.98)" : "scale(1)",
                }}
                onMouseEnter={(e) => {
                  if (!isActive && !isNavigating) {
                    e.currentTarget.style.background = "rgba(16, 185, 129, 0.1)";
                    e.currentTarget.style.color = "#fff";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive && !isNavigating) {
                    e.currentTarget.style.background = "transparent";
                    e.currentTarget.style.color = "rgba(255,255,255,0.8)";
                  }
                }}
              >
                <span style={{ fontSize: "18px" }}>
                  {isNavigating ? "⏳" : item.icon}
                </span>
                <span style={{ fontSize: "14px", fontWeight: isActive ? "600" : "400" }}>
                  {item.label}
                </span>
              </div>
            );
          })}
        </div>

        {/* Welcome Message */}
        <div style={{ padding: "20px" }}>
          <div
            style={{
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: "12px",
              padding: "16px",
              textAlign: "center",
            }}
          >
            <div style={{ color: "#fff", fontSize: "14px", fontWeight: "500" }}>
              Welcome back!
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

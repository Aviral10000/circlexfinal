import { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import MobileNavigation from "./MobileNavigation";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Close notifications when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (showNotifications) {
        const target = event.target as HTMLElement;
        if (!target.closest('[data-notification-panel]') && !target.closest('[data-notification-bell]')) {
          setShowNotifications(false);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showNotifications]);

  const [notifications] = useState([
    {
      id: 1,
      type: "match" as const,
      title: "Sarah Chen Wants to Work with you!",
      message: "You both swiped right! Time to connect and start building something amazing together.",
      timestamp: new Date().toISOString(),
      isRead: false
    },
    {
      id: 2,
      type: "message" as const,
      title: "New message from Michael Rodriguez",
      message: "Thanks for the pitch! I'd love to discuss your AI startup idea further.",
      timestamp: new Date(Date.now() - 3600000).toISOString(),
      isRead: false
    },
    {
      id: 3,
      type: "connection" as const,
      title: "New connection: Emily Watson",
      message: "Emily accepted your mentorship application. Schedule your first session!",
      timestamp: new Date(Date.now() - 7200000).toISOString(),
      isRead: true
    }
  ]);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#000" }}>
      {/* Desktop Sidebar */}
      {!isMobile && (
        <Sidebar isOpen={sidebarOpen} onToggle={toggleSidebar} />
      )}
      
      {/* Mobile Navigation */}
      {isMobile && (
        <MobileNavigation isVisible={true} />
      )}

      {/* Main Content */}
      <div
        style={{
          flex: 1,
          marginLeft: !isMobile ? (sidebarOpen ? "280px" : "0") : "0",
          transition: "margin-left 0.3s ease",
          background: "#000",
          minHeight: "100vh",
          paddingTop: isMobile ? "80px" : "0",
          paddingBottom: isMobile ? "80px" : "0"
        }}
      >
        {/* Desktop Top Bar */}
        {!isMobile && (
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "20px 24px",
              borderBottom: "1px solid rgba(255,255,255,0.1)",
              background: "rgba(0,0,0,0.8)",
              backdropFilter: "blur(10px)",
            }}
          >
            {/* Hamburger Menu */}
            <button
              onClick={toggleSidebar}
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
              }}
            >
              <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                <div style={{ width: "16px", height: "2px", background: "#fff", borderRadius: "1px" }}></div>
                <div style={{ width: "16px", height: "2px", background: "#fff", borderRadius: "1px" }}></div>
                <div style={{ width: "16px", height: "2px", background: "#fff", borderRadius: "1px" }}></div>
              </div>
            </button>

            {/* User Info & Notifications */}
            <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
              {/* Notification Bell */}
              <div 
                data-notification-bell
                style={{
                  position: "relative",
                  cursor: "pointer"
                }}
                onClick={() => setShowNotifications(!showNotifications)}
              >
                <div style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  background: "rgba(255, 255, 255, 0.05)",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "18px",
                  color: "#ffffff",
                  transition: "all 0.2s ease",
                  backdropFilter: "blur(10px)"
                }}>
                  🔔
                </div>
                {notifications.filter(n => !n.isRead).length > 0 && (
                  <div style={{
                    position: "absolute",
                    top: "-4px",
                    right: "-4px",
                    width: "18px",
                    height: "18px",
                    borderRadius: "50%",
                    background: "#ef4444",
                    color: "#ffffff",
                    fontSize: "10px",
                    fontWeight: "600",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                  }}>
                    {notifications.filter(n => !n.isRead).length}
                  </div>
                )}
              </div>

              {/* User Info */}
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <div
                  style={{
                    width: "32px",
                    height: "32px",
                    background: "linear-gradient(135deg, rgba(0, 255, 136, 0.2) 0%, rgba(0, 255, 136, 0.1) 100%)",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#fff",
                    fontWeight: "bold",
                    fontSize: "14px",
                  }}
                >
                  {sessionStorage.getItem('founder_email')?.charAt(0).toUpperCase() || 'F'}
                </div>
                <span style={{ color: "#fff", fontSize: "14px" }}>
                  {sessionStorage.getItem('founder_email') || 'Founder'}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Page Content */}
        <div style={{ 
          padding: isMobile ? "16px" : "24px",
          display: "flex",
          gap: isMobile ? "16px" : "32px",
          alignItems: "flex-start",
          minHeight: isMobile ? "calc(100vh - 160px)" : "calc(100vh - 80px)"
        }}>
          {/* Left Sidebar - Quick Actions */}
          {!sidebarOpen && !isMobile && (
            <div style={{
              width: "240px",
              display: "flex",
              flexDirection: "column",
              gap: "20px",
              position: "sticky",
              top: "24px"
            }}>
              {/* Quick Actions */}
              <div style={{
                background: "rgba(255, 255, 255, 0.03)",
                border: "1px solid rgba(255, 255, 255, 0.08)",
                borderRadius: "12px",
                padding: "20px",
                backdropFilter: "blur(10px)"
              }}>
                <h3 style={{
                  fontSize: "16px",
                  fontWeight: "600",
                  color: "#ffffff",
                  margin: "0 0 16px",
                  letterSpacing: "-0.3px"
                }}>
                  Quick Actions
                </h3>
                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  <button 
                    onClick={() => window.location.href = '/cofounders'}
                    style={{
                      background: "rgba(255, 255, 255, 0.05)",
                      border: "1px solid rgba(255, 255, 255, 0.1)",
                      borderRadius: "8px",
                      padding: "12px 16px",
                      color: "#ffffff",
                      fontSize: "14px",
                      fontWeight: "500",
                      cursor: "pointer",
                      transition: "all 0.2s ease",
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                      textAlign: "left"
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "rgba(255, 255, 255, 0.08)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "rgba(255, 255, 255, 0.05)";
                    }}
                  >
                    <span style={{ fontSize: "16px" }}>👥</span>
                    Find Cofounders
                  </button>
                  <button 
                    onClick={() => window.location.href = '/mentors'}
                    style={{
                      background: "rgba(255, 255, 255, 0.05)",
                      border: "1px solid rgba(255, 255, 255, 0.1)",
                      borderRadius: "8px",
                      padding: "12px 16px",
                      color: "#ffffff",
                      fontSize: "14px",
                      fontWeight: "500",
                      cursor: "pointer",
                      transition: "all 0.2s ease",
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                      textAlign: "left"
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "rgba(255, 255, 255, 0.08)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "rgba(255, 255, 255, 0.05)";
                    }}
                  >
                    <span style={{ fontSize: "16px" }}>🎓</span>
                    Find Mentors
                  </button>
                  <button 
                    onClick={() => window.location.href = '/investors'}
                    style={{
                      background: "rgba(255, 255, 255, 0.05)",
                      border: "1px solid rgba(255, 255, 255, 0.1)",
                      borderRadius: "8px",
                      padding: "12px 16px",
                      color: "#ffffff",
                      fontSize: "14px",
                      fontWeight: "500",
                      cursor: "pointer",
                      transition: "all 0.2s ease",
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                      textAlign: "left"
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "rgba(255, 255, 255, 0.08)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "rgba(255, 255, 255, 0.05)";
                    }}
                  >
                    <span style={{ fontSize: "16px" }}>💰</span>
                    Find Investors
                  </button>
                  <button 
                    onClick={() => window.location.href = '/analytics'}
                    style={{
                      background: "rgba(255, 255, 255, 0.05)",
                      border: "1px solid rgba(255, 255, 255, 0.1)",
                      borderRadius: "8px",
                      padding: "12px 16px",
                      color: "#ffffff",
                      fontSize: "14px",
                      fontWeight: "500",
                      cursor: "pointer",
                      transition: "all 0.2s ease",
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                      textAlign: "left"
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "rgba(255, 255, 255, 0.08)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "rgba(255, 255, 255, 0.05)";
                    }}
                  >
                    <span style={{ fontSize: "16px" }}>📊</span>
                    View Analytics
                  </button>
                </div>
              </div>

              {/* Recent Activity */}
              <div style={{
                background: "rgba(255, 255, 255, 0.03)",
                border: "1px solid rgba(255, 255, 255, 0.08)",
                borderRadius: "12px",
                padding: "20px",
                backdropFilter: "blur(10px)"
              }}>
                <h3 style={{
                  fontSize: "16px",
                  fontWeight: "600",
                  color: "#ffffff",
                  margin: "0 0 16px",
                  letterSpacing: "-0.3px"
                }}>
                  Recent Activity
                </h3>
                <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                  <div style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    padding: "8px",
                    background: "rgba(255, 255, 255, 0.02)",
                    borderRadius: "8px"
                  }}>
                    <div style={{
                      width: "8px",
                      height: "8px",
                      borderRadius: "50%",
                      background: "#10b981"
                    }}></div>
                    <div style={{ flex: 1 }}>
                      <div style={{
                        fontSize: "12px",
                        color: "#ffffff",
                        fontWeight: "500"
                      }}>
                        New connection
                      </div>
                      <div style={{
                        fontSize: "11px",
                        color: "rgba(255, 255, 255, 0.6)"
                      }}>
                        2 hours ago
                      </div>
                    </div>
                  </div>
                  <div style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    padding: "8px",
                    background: "rgba(255, 255, 255, 0.02)",
                    borderRadius: "8px"
                  }}>
                    <div style={{
                      width: "8px",
                      height: "8px",
                      borderRadius: "50%",
                      background: "#3b82f6"
                    }}></div>
                    <div style={{ flex: 1 }}>
                      <div style={{
                        fontSize: "12px",
                        color: "#ffffff",
                        fontWeight: "500"
                      }}>
                        Event registered
                      </div>
                      <div style={{
                        fontSize: "11px",
                        color: "rgba(255, 255, 255, 0.6)"
                      }}>
                        5 hours ago
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Main Content */}
          <div style={{
            flex: 1,
            maxWidth: "800px",
            display: "flex",
            justifyContent: "center"
          }}>
            {children}
          </div>

          {/* Right Sidebar - Insights */}
          {!sidebarOpen && !isMobile && (
            <div style={{
              width: "240px",
              display: "flex",
              flexDirection: "column",
              gap: "20px",
              position: "sticky",
              top: "24px"
            }}>
              {/* Market Insights */}
              <div style={{
                background: "rgba(255, 255, 255, 0.03)",
                border: "1px solid rgba(255, 255, 255, 0.08)",
                borderRadius: "12px",
                padding: "20px",
                backdropFilter: "blur(10px)"
              }}>
                <h3 style={{
                  fontSize: "16px",
                  fontWeight: "600",
                  color: "#ffffff",
                  margin: "0 0 16px",
                  letterSpacing: "-0.3px"
                }}>
                  Market Insights
                </h3>
                <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                  <div style={{
                    padding: "12px",
                    background: "rgba(16, 185, 129, 0.1)",
                    border: "1px solid rgba(16, 185, 129, 0.2)",
                    borderRadius: "8px"
                  }}>
                    <div style={{
                      fontSize: "12px",
                      color: "#10b981",
                      fontWeight: "600",
                      marginBottom: "4px"
                    }}>
                      AI/ML Funding
                    </div>
                    <div style={{
                      fontSize: "11px",
                      color: "rgba(255, 255, 255, 0.7)"
                    }}>
                      +23% this quarter
                    </div>
                  </div>
                  <div style={{
                    padding: "12px",
                    background: "rgba(59, 130, 246, 0.1)",
                    border: "1px solid rgba(59, 130, 246, 0.2)",
                    borderRadius: "8px"
                  }}>
                    <div style={{
                      fontSize: "12px",
                      color: "#3b82f6",
                      fontWeight: "600",
                      marginBottom: "4px"
                    }}>
                      FinTech Growth
                    </div>
                    <div style={{
                      fontSize: "11px",
                      color: "rgba(255, 255, 255, 0.7)"
                    }}>
                      +18% this quarter
                    </div>
                  </div>
                </div>
              </div>

              {/* Trending Founders */}
              <div style={{
                background: "rgba(255, 255, 255, 0.03)",
                border: "1px solid rgba(255, 255, 255, 0.08)",
                borderRadius: "12px",
                padding: "20px",
                backdropFilter: "blur(10px)"
              }}>
                <h3 style={{
                  fontSize: "16px",
                  fontWeight: "600",
                  color: "#ffffff",
                  margin: "0 0 16px",
                  letterSpacing: "-0.3px"
                }}>
                  Trending Founders
                </h3>
                <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                  <div style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    padding: "8px",
                    background: "rgba(255, 255, 255, 0.02)",
                    borderRadius: "8px"
                  }}>
                    <div style={{
                      width: "24px",
                      height: "24px",
                      borderRadius: "50%",
                      background: "rgba(255, 255, 255, 0.1)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "10px",
                      fontWeight: "600"
                    }}>
                      SC
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{
                        fontSize: "12px",
                        color: "#ffffff",
                        fontWeight: "500"
                      }}>
                        Sarah Chen
                      </div>
                      <div style={{
                        fontSize: "11px",
                        color: "rgba(255, 255, 255, 0.6)"
                      }}>
                        AI/ML
                      </div>
                    </div>
                  </div>
                  <div style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    padding: "8px",
                    background: "rgba(255, 255, 255, 0.02)",
                    borderRadius: "8px"
                  }}>
                    <div style={{
                      width: "24px",
                      height: "24px",
                      borderRadius: "50%",
                      background: "rgba(255, 255, 255, 0.1)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "10px",
                      fontWeight: "600"
                    }}>
                      MR
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{
                        fontSize: "12px",
                        color: "#ffffff",
                        fontWeight: "500"
                      }}>
                        Michael Rodriguez
                      </div>
                      <div style={{
                        fontSize: "11px",
                        color: "rgba(255, 255, 255, 0.6)"
                      }}>
                        FinTech
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Upcoming Events */}
              <div style={{
                background: "rgba(255, 255, 255, 0.03)",
                border: "1px solid rgba(255, 255, 255, 0.08)",
                borderRadius: "12px",
                padding: "20px",
                backdropFilter: "blur(10px)"
              }}>
                <h3 style={{
                  fontSize: "16px",
                  fontWeight: "600",
                  color: "#ffffff",
                  margin: "0 0 16px",
                  letterSpacing: "-0.3px"
                }}>
                  Upcoming Events
                </h3>
                <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                  <div style={{
                    padding: "12px",
                    background: "rgba(255, 255, 255, 0.02)",
                    border: "1px solid rgba(255, 255, 255, 0.08)",
                    borderRadius: "8px"
                  }}>
                    <div style={{
                      fontSize: "12px",
                      color: "#ffffff",
                      fontWeight: "500",
                      marginBottom: "4px"
                    }}>
                      Startup Pitch Night
                    </div>
                    <div style={{
                      fontSize: "11px",
                      color: "rgba(255, 255, 255, 0.6)"
                    }}>
                      Tomorrow, 7:00 PM
                    </div>
                  </div>
                  <div style={{
                    padding: "12px",
                    background: "rgba(255, 255, 255, 0.02)",
                    border: "1px solid rgba(255, 255, 255, 0.08)",
                    borderRadius: "8px"
                  }}>
                    <div style={{
                      fontSize: "12px",
                      color: "#ffffff",
                      fontWeight: "500",
                      marginBottom: "4px"
                    }}>
                      AI/ML Masterclass
                    </div>
                    <div style={{
                      fontSize: "11px",
                      color: "rgba(255, 255, 255, 0.6)"
                    }}>
                      Friday, 6:30 PM
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Notification Panel */}
      {showNotifications && (
        <div 
          data-notification-panel
          style={{
          position: "fixed",
          top: "80px",
          right: "24px",
          width: "320px",
          maxHeight: "400px",
          background: "rgba(0, 0, 0, 0.95)",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          borderRadius: "12px",
          backdropFilter: "blur(20px)",
          zIndex: 1001,
          overflow: "hidden",
          boxShadow: "0 20px 40px rgba(0, 0, 0, 0.3)"
        }}>
          {/* Header */}
          <div style={{
            padding: "16px 20px",
            borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center"
          }}>
            <h3 style={{
              color: "#fff",
              fontSize: "16px",
              fontWeight: "600",
              margin: 0
            }}>
              Notifications
            </h3>
            <button
              onClick={() => setShowNotifications(false)}
              style={{
                background: "none",
                border: "none",
                color: "rgba(255, 255, 255, 0.6)",
                fontSize: "18px",
                cursor: "pointer",
                padding: "4px"
              }}
            >
              ×
            </button>
          </div>

          {/* Notifications List */}
          <div style={{
            maxHeight: "320px",
            overflowY: "auto"
          }}>
            {notifications.length === 0 ? (
              <div style={{
                padding: "40px 20px",
                textAlign: "center",
                color: "rgba(255, 255, 255, 0.6)"
              }}>
                <div style={{ fontSize: "32px", marginBottom: "12px" }}>🔔</div>
                <p style={{ margin: 0, fontSize: "14px" }}>No notifications yet</p>
              </div>
            ) : (
              notifications.map((notification) => (
                <div
                  key={notification.id}
                  style={{
                    padding: "16px 20px",
                    borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
                    cursor: "pointer",
                    transition: "background 0.2s ease",
                    background: notification.isRead ? "transparent" : "rgba(0, 255, 136, 0.05)"
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "rgba(255, 255, 255, 0.05)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = notification.isRead ? "transparent" : "rgba(0, 255, 136, 0.05)";
                  }}
                >
                  <div style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "12px"
                  }}>
                    <div style={{
                      width: "8px",
                      height: "8px",
                      borderRadius: "50%",
                      background: notification.isRead ? "transparent" : "#00ff88",
                      marginTop: "6px",
                      flexShrink: 0
                    }}></div>
                    <div style={{ flex: 1 }}>
                      <h4 style={{
                        color: "#fff",
                        fontSize: "14px",
                        fontWeight: "600",
                        margin: "0 0 4px 0"
                      }}>
                        {notification.title}
                      </h4>
                      <p style={{
                        color: "rgba(255, 255, 255, 0.7)",
                        fontSize: "12px",
                        margin: "0 0 8px 0",
                        lineHeight: "1.4"
                      }}>
                        {notification.message}
                      </p>
                      <span style={{
                        color: "rgba(255, 255, 255, 0.5)",
                        fontSize: "11px"
                      }}>
                        {new Date(notification.timestamp).toLocaleDateString()} at {new Date(notification.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          {notifications.length > 0 && (
            <div style={{
              padding: "12px 20px",
              borderTop: "1px solid rgba(255, 255, 255, 0.1)",
              textAlign: "center"
            }}>
              <button
                style={{
                  background: "none",
                  border: "none",
                  color: "rgba(255, 255, 255, 0.6)",
                  fontSize: "12px",
                  cursor: "pointer",
                  textDecoration: "underline"
                }}
                onClick={() => {
                  // Mark all as read functionality could be added here
                  setShowNotifications(false);
                }}
              >
                Mark all as read
              </button>
            </div>
          )}
        </div>
      )}

    </div>
  );
}

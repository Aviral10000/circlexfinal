import { useState } from "react";
import Layout from "../components/Layout";

interface Event {
  id: number;
  title: string;
  description: string;
  date: string;
  time: string;
  type: "pitch" | "networking" | "masterclass" | "mentorship";
  attendees: number;
  maxAttendees: number;
  host: string;
  hostAvatar: string;
  isLive: boolean;
  isRegistered: boolean;
  tags: string[];
}

export default function VirtualEvents() {
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [events] = useState<Event[]>([
    {
      id: 1,
      title: "Startup Pitch Night",
      description: "Monthly showcase of India's most promising early-stage startups. 5-minute pitches followed by Q&A with investors.",
      date: "Tomorrow",
      time: "7:00 PM IST",
      type: "pitch",
      attendees: 45,
      maxAttendees: 100,
      host: "Sarah Chen",
      hostAvatar: "SC",
      isLive: false,
      isRegistered: true,
      tags: ["Pitching", "Investors", "Early Stage"]
    },
    {
      id: 2,
      title: "AI/ML Masterclass",
      description: "Deep dive into building AI products with industry experts. Learn from successful AI founders and technical leaders.",
      date: "Friday",
      time: "6:30 PM IST",
      type: "masterclass",
      attendees: 78,
      maxAttendees: 150,
      host: "Dr. Rajesh Kumar",
      hostAvatar: "RK",
      isLive: false,
      isRegistered: false,
      tags: ["AI/ML", "Technical", "Learning"]
    },
    {
      id: 3,
      title: "Founder Networking Hour",
      description: "Casual networking session for founders to connect, share experiences, and build meaningful relationships.",
      date: "Today",
      time: "5:00 PM IST",
      type: "networking",
      attendees: 23,
      maxAttendees: 50,
      host: "Michael Rodriguez",
      hostAvatar: "MR",
      isLive: true,
      isRegistered: false,
      tags: ["Networking", "Community", "Casual"]
    },
    {
      id: 4,
      title: "Mentor Office Hours",
      description: "1-on-1 sessions with experienced mentors. Get personalized advice on your startup challenges.",
      date: "Monday",
      time: "2:00 PM IST",
      type: "mentorship",
      attendees: 12,
      maxAttendees: 20,
      host: "Emily Watson",
      hostAvatar: "EW",
      isLive: false,
      isRegistered: true,
      tags: ["Mentorship", "1-on-1", "Advice"]
    }
  ]);

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case "pitch": return "#ef4444";
      case "masterclass": return "#3b82f6";
      case "networking": return "#10b981";
      case "mentorship": return "#f59e0b";
      default: return "#6b7280";
    }
  };

  const getEventTypeIcon = (type: string) => {
    switch (type) {
      case "pitch": return "🎤";
      case "masterclass": return "🎓";
      case "networking": return "🤝";
      case "mentorship": return "💡";
      default: return "📅";
    }
  };

  const filteredEvents = selectedFilter === "all" 
    ? events 
    : events.filter(event => event.type === selectedFilter);

  return (
    <Layout>
      <div style={{ color: "#fff", padding: "24px" }}>
        {/* Header */}
        <div style={{ marginBottom: "32px" }}>
          <h1 style={{
            fontSize: "32px",
            fontWeight: "600",
            color: "#ffffff",
            margin: "0 0 8px",
            letterSpacing: "-0.5px"
          }}>
            Virtual Events
          </h1>
          <p style={{
            fontSize: "16px",
            color: "rgba(255, 255, 255, 0.7)",
            margin: "0 0 24px",
            fontWeight: "400"
          }}>
            Join exclusive events with India's top founders, investors, and mentors
          </p>

          {/* Filter Buttons */}
          <div style={{
            display: "flex",
            gap: "12px",
            flexWrap: "wrap"
          }}>
            {[
              { key: "all", label: "All Events" },
              { key: "pitch", label: "Pitch Nights" },
              { key: "masterclass", label: "Masterclasses" },
              { key: "networking", label: "Networking" },
              { key: "mentorship", label: "Mentorship" }
            ].map((filter) => (
              <button
                key={filter.key}
                onClick={() => setSelectedFilter(filter.key)}
                style={{
                  background: selectedFilter === filter.key 
                    ? "rgba(255, 255, 255, 0.1)" 
                    : "rgba(255, 255, 255, 0.05)",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  borderRadius: "20px",
                  padding: "8px 16px",
                  color: selectedFilter === filter.key ? "#ffffff" : "rgba(255, 255, 255, 0.7)",
                  fontSize: "14px",
                  fontWeight: "500",
                  cursor: "pointer",
                  transition: "all 0.2s ease"
                }}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        {/* Events Grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))",
          gap: "24px"
        }}>
          {filteredEvents.map((event) => (
            <div
              key={event.id}
              style={{
                background: "rgba(255, 255, 255, 0.03)",
                border: "1px solid rgba(255, 255, 255, 0.08)",
                borderRadius: "16px",
                padding: "24px",
                backdropFilter: "blur(10px)",
                position: "relative",
                transition: "all 0.3s ease"
              }}
            >
              {/* Event Type Badge */}
              <div style={{
                position: "absolute",
                top: "16px",
                right: "16px",
                background: getEventTypeColor(event.type),
                borderRadius: "12px",
                padding: "6px 12px",
                fontSize: "12px",
                fontWeight: "600",
                color: "#ffffff",
                display: "flex",
                alignItems: "center",
                gap: "4px"
              }}>
                <span>{getEventTypeIcon(event.type)}</span>
                {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
              </div>

              {/* Live Indicator */}
              {event.isLive && (
                <div style={{
                  position: "absolute",
                  top: "16px",
                  left: "16px",
                  background: "#ef4444",
                  borderRadius: "12px",
                  padding: "4px 8px",
                  fontSize: "10px",
                  fontWeight: "600",
                  color: "#ffffff",
                  display: "flex",
                  alignItems: "center",
                  gap: "4px"
                }}>
                  <div style={{
                    width: "6px",
                    height: "6px",
                    borderRadius: "50%",
                    background: "#ffffff",
                    animation: "pulse 2s infinite"
                  }}></div>
                  LIVE
                </div>
              )}

              {/* Event Title */}
              <h3 style={{
                fontSize: "20px",
                fontWeight: "600",
                color: "#ffffff",
                margin: "0 0 12px",
                letterSpacing: "-0.3px"
              }}>
                {event.title}
              </h3>

              {/* Event Description */}
              <p style={{
                fontSize: "14px",
                color: "rgba(255, 255, 255, 0.7)",
                margin: "0 0 16px",
                lineHeight: "1.5"
              }}>
                {event.description}
              </p>

              {/* Event Details */}
              <div style={{
                display: "flex",
                alignItems: "center",
                gap: "16px",
                marginBottom: "16px"
              }}>
                <div style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px"
                }}>
                  <span style={{ fontSize: "14px" }}>📅</span>
                  <span style={{
                    fontSize: "13px",
                    color: "rgba(255, 255, 255, 0.8)",
                    fontWeight: "500"
                  }}>
                    {event.date}
                  </span>
                </div>
                <div style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px"
                }}>
                  <span style={{ fontSize: "14px" }}>🕐</span>
                  <span style={{
                    fontSize: "13px",
                    color: "rgba(255, 255, 255, 0.8)",
                    fontWeight: "500"
                  }}>
                    {event.time}
                  </span>
                </div>
              </div>

              {/* Host Info */}
              <div style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                marginBottom: "16px"
              }}>
                <div style={{
                  width: "32px",
                  height: "32px",
                  borderRadius: "50%",
                  background: "rgba(255, 255, 255, 0.1)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "12px",
                  fontWeight: "600",
                  color: "#ffffff"
                }}>
                  {event.hostAvatar}
                </div>
                <div>
                  <div style={{
                    fontSize: "13px",
                    color: "#ffffff",
                    fontWeight: "500"
                  }}>
                    Hosted by {event.host}
                  </div>
                </div>
              </div>

              {/* Attendees */}
              <div style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                marginBottom: "20px"
              }}>
                <span style={{ fontSize: "14px" }}>👥</span>
                <span style={{
                  fontSize: "13px",
                  color: "rgba(255, 255, 255, 0.7)"
                }}>
                  {event.attendees}/{event.maxAttendees} attendees
                </span>
                <div style={{
                  flex: 1,
                  height: "4px",
                  background: "rgba(255, 255, 255, 0.1)",
                  borderRadius: "2px",
                  overflow: "hidden"
                }}>
                  <div style={{
                    width: `${(event.attendees / event.maxAttendees) * 100}%`,
                    height: "100%",
                    background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
                    borderRadius: "2px"
                  }}></div>
                </div>
              </div>

              {/* Tags */}
              <div style={{
                display: "flex",
                gap: "8px",
                flexWrap: "wrap",
                marginBottom: "20px"
              }}>
                {event.tags.map((tag, index) => (
                  <span
                    key={index}
                    style={{
                      background: "rgba(255, 255, 255, 0.05)",
                      border: "1px solid rgba(255, 255, 255, 0.1)",
                      borderRadius: "12px",
                      padding: "4px 8px",
                      fontSize: "11px",
                      color: "rgba(255, 255, 255, 0.7)",
                      fontWeight: "500"
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Action Button */}
              <button
                style={{
                  width: "100%",
                  background: event.isRegistered 
                    ? "rgba(16, 185, 129, 0.2)" 
                    : "rgba(255, 255, 255, 0.1)",
                  border: event.isRegistered 
                    ? "1px solid rgba(16, 185, 129, 0.3)" 
                    : "1px solid rgba(255, 255, 255, 0.2)",
                  borderRadius: "12px",
                  padding: "12px 20px",
                  color: event.isRegistered ? "#10b981" : "#ffffff",
                  fontSize: "14px",
                  fontWeight: "600",
                  cursor: "pointer",
                  transition: "all 0.2s ease"
                }}
              >
                {event.isRegistered ? "✓ Registered" : "Register Now"}
              </button>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredEvents.length === 0 && (
          <div style={{
            textAlign: "center",
            padding: "60px 20px",
            color: "rgba(255,255,255,0.7)"
          }}>
            <div style={{ fontSize: "64px", marginBottom: "24px" }}>📅</div>
            <h2 style={{ fontSize: "24px", marginBottom: "16px", color: "#fff" }}>
              No events found
            </h2>
            <p style={{ fontSize: "16px", marginBottom: "24px" }}>
              Check back soon for upcoming events in this category
            </p>
          </div>
        )}
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>
    </Layout>
  );
}

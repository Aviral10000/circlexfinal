import { useState, useEffect } from "react";
import Layout from "../components/Layout";

interface Event {
  id: number;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  type: "networking" | "pitch" | "workshop" | "conference";
  attendees: number;
  maxAttendees: number;
  price: string;
  organizer: string;
  image: string;
  tags: string[];
  isRegistered: boolean;
}

export default function Events() {
  const [events, setEvents] = useState<Event[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("All Types");
  const [showTypeDropdown, setShowTypeDropdown] = useState(false);

  const eventTypes = [
    "All Types",
    "Networking",
    "Pitch Event",
    "Workshop",
    "Conference"
  ];

  useEffect(() => {
    // Sample events data
    const sampleEvents: Event[] = [
      {
        id: 1,
        title: "Startup Pitch Night",
        description: "Join us for an evening of exciting startup pitches! 10 founders will present their ideas to a panel of investors and industry experts. Perfect for networking and learning from successful entrepreneurs.",
        date: "2024-02-15",
        time: "6:00 PM - 9:00 PM",
        location: "San Francisco, CA",
        type: "pitch",
        attendees: 45,
        maxAttendees: 100,
        price: "Free",
        organizer: "TechStars",
        image: "🎤",
        tags: ["Pitching", "Investors", "Networking"],
        isRegistered: false
      },
      {
        id: 2,
        title: "Founder Networking Mixer",
        description: "Connect with fellow founders, cofounders, and potential business partners. This intimate networking event is designed to help you build meaningful relationships in the startup ecosystem.",
        date: "2024-02-18",
        time: "5:30 PM - 8:30 PM",
        location: "New York, NY",
        type: "networking",
        attendees: 78,
        maxAttendees: 80,
        price: "$25",
        organizer: "Founder Network",
        image: "🤝",
        tags: ["Networking", "Cofounders", "Partnerships"],
        isRegistered: true
      },
      {
        id: 3,
        title: "AI & ML Workshop for Founders",
        description: "Learn how to integrate AI and machine learning into your startup. Hands-on workshop covering practical applications, tools, and strategies for non-technical founders.",
        date: "2024-02-22",
        time: "10:00 AM - 4:00 PM",
        location: "Austin, TX",
        type: "workshop",
        attendees: 32,
        maxAttendees: 50,
        price: "$150",
        organizer: "AI Startup Lab",
        image: "🤖",
        tags: ["AI/ML", "Learning", "Technology"],
        isRegistered: false
      },
      {
        id: 4,
        title: "FinTech Innovation Summit",
        description: "Annual conference bringing together fintech founders, investors, and industry leaders. Keynotes, panel discussions, and networking opportunities focused on the future of financial technology.",
        date: "2024-02-25",
        time: "9:00 AM - 6:00 PM",
        location: "Miami, FL",
        type: "conference",
        attendees: 234,
        maxAttendees: 500,
        price: "$299",
        organizer: "FinTech Association",
        image: "💰",
        tags: ["FinTech", "Conference", "Innovation"],
        isRegistered: false
      },
      {
        id: 5,
        title: "Women in Tech Networking",
        description: "Exclusive networking event for women founders and entrepreneurs. Connect with mentors, investors, and fellow female founders in a supportive environment.",
        date: "2024-02-28",
        time: "6:00 PM - 9:00 PM",
        location: "Seattle, WA",
        type: "networking",
        attendees: 56,
        maxAttendees: 75,
        price: "Free",
        organizer: "Women in Tech",
        image: "👩‍💼",
        tags: ["Women", "Networking", "Mentorship"],
        isRegistered: false
      },
      {
        id: 6,
        title: "Product Management Masterclass",
        description: "Learn product management fundamentals from industry experts. Perfect for founders who need to understand product strategy, user research, and product-market fit.",
        date: "2024-03-02",
        time: "1:00 PM - 5:00 PM",
        location: "Boston, MA",
        type: "workshop",
        attendees: 28,
        maxAttendees: 40,
        price: "$99",
        organizer: "Product School",
        image: "📊",
        tags: ["Product", "Strategy", "Learning"],
        isRegistered: false
      }
    ];
    setEvents(sampleEvents);
  }, []);

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesType = selectedType === "All Types" || event.type === selectedType.toLowerCase();
    return matchesSearch && matchesType;
  });

  const handleRegister = (eventId: number) => {
    setEvents(prev => 
      prev.map(event => 
        event.id === eventId 
          ? { ...event, isRegistered: !event.isRegistered, attendees: event.isRegistered ? event.attendees - 1 : event.attendees + 1 }
          : event
      )
    );
  };

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case "networking": return "#10b981";
      case "pitch": return "#ef4444";
      case "workshop": return "#eab308";
      case "conference": return "#8b5cf6";
      default: return "#6b7280";
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <Layout>
      <div style={{ color: "#fff" }}>
        {/* Header */}
        <div style={{ marginBottom: "32px" }}>
          <h1 style={{ fontSize: "32px", fontWeight: "bold", margin: "0 0 8px" }}>
            Startup Events
          </h1>
          <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "16px", margin: 0 }}>
            Discover networking events, workshops, and conferences to grow your startup
          </p>
        </div>

        {/* Search and Filters */}
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "32px",
          flexWrap: "wrap",
          gap: "16px"
        }}>
          <input
            type="text"
            placeholder="Search events..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: "8px",
              padding: "12px 16px",
              color: "#fff",
              fontSize: "14px",
              width: "300px",
              outline: "none"
            }}
          />

          <div style={{ position: "relative" }}>
            <button
              onClick={() => setShowTypeDropdown(!showTypeDropdown)}
              style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "8px",
                padding: "8px 12px",
                color: "#fff",
                fontSize: "12px",
                cursor: "pointer",
                outline: "none",
                display: "flex",
                alignItems: "center",
                gap: "8px"
              }}
            >
              {selectedType}
              <span style={{ fontSize: "10px" }}>▼</span>
            </button>
            
            {showTypeDropdown && (
              <div style={{
                position: "absolute",
                top: "100%",
                right: "0",
                background: "rgba(0,0,0,0.95)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "8px",
                padding: "8px 0",
                minWidth: "160px",
                zIndex: 1000,
                backdropFilter: "blur(10px)"
              }}>
                {eventTypes.map((type) => (
                  <button
                    key={type}
                    onClick={() => {
                      setSelectedType(type);
                      setShowTypeDropdown(false);
                    }}
                    style={{
                      width: "100%",
                      padding: "8px 16px",
                      background: "transparent",
                      border: "none",
                      color: "#fff",
                      textAlign: "left",
                      fontSize: "12px",
                      cursor: "pointer",
                      outline: "none"
                    }}
                  >
                    {type}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Events Grid */}
        <div style={{ 
          display: "grid", 
          gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))", 
          gap: "24px" 
        }}>
          {filteredEvents.map((event) => (
            <div
              key={event.id}
              style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "16px",
                padding: "24px",
                transition: "all 0.2s ease",
                cursor: "pointer"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.08)";
                e.currentTarget.style.borderColor = "rgba(16, 185, 129, 0.3)";
                e.currentTarget.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.05)";
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              {/* Event Header */}
              <div style={{ display: "flex", alignItems: "flex-start", gap: "16px", marginBottom: "16px" }}>
                <div style={{ fontSize: "32px" }}>{event.image}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
                    <h3 style={{ fontSize: "18px", fontWeight: "600", margin: 0, color: "#fff" }}>
                      {event.title}
                    </h3>
                    <span
                      style={{
                        background: getEventTypeColor(event.type),
                        color: "#fff",
                        borderRadius: "12px",
                        padding: "2px 8px",
                        fontSize: "10px",
                        fontWeight: "500",
                        textTransform: "uppercase"
                      }}
                    >
                      {event.type}
                    </span>
                  </div>
                  <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "12px", margin: 0 }}>
                    by {event.organizer}
                  </p>
                </div>
              </div>

              {/* Event Description */}
              <p style={{
                color: "rgba(255,255,255,0.8)",
                fontSize: "14px",
                lineHeight: 1.5,
                margin: "0 0 16px"
              }}>
                {event.description}
              </p>

              {/* Event Details */}
              <div style={{ marginBottom: "16px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
                  <span style={{ color: "#10b981", fontSize: "14px" }}>📅</span>
                  <span style={{ color: "#fff", fontSize: "14px" }}>
                    {formatDate(event.date)} • {event.time}
                  </span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
                  <span style={{ color: "#10b981", fontSize: "14px" }}>📍</span>
                  <span style={{ color: "#fff", fontSize: "14px" }}>{event.location}</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ color: "#10b981", fontSize: "14px" }}>👥</span>
                  <span style={{ color: "#fff", fontSize: "14px" }}>
                    {event.attendees}/{event.maxAttendees} attendees
                  </span>
                </div>
              </div>

              {/* Tags */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "20px" }}>
                {event.tags.map((tag, index) => (
                  <span
                    key={index}
                    style={{
                      background: "rgba(255,255,255,0.1)",
                      border: "1px solid rgba(255,255,255,0.2)",
                      borderRadius: "12px",
                      padding: "4px 8px",
                      fontSize: "11px",
                      color: "#fff"
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Price and Register Button */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ fontSize: "18px", fontWeight: "600", color: "#10b981" }}>
                  {event.price}
                </div>
                <button
                  onClick={() => handleRegister(event.id)}
                  style={{
                    background: event.isRegistered ? "#ef4444" : "#10b981",
                    border: "none",
                    borderRadius: "8px",
                    padding: "8px 16px",
                    color: "#fff",
                    fontSize: "14px",
                    fontWeight: "600",
                    cursor: "pointer",
                    transition: "all 0.2s ease"
                  }}
                >
                  {event.isRegistered ? "Unregister" : "Register"}
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredEvents.length === 0 && (
          <div style={{ textAlign: "center", padding: "60px 20px" }}>
            <div style={{ fontSize: "48px", marginBottom: "16px" }}>🔍</div>
            <h3 style={{ fontSize: "20px", margin: "0 0 8px", color: "#fff" }}>
              No events found
            </h3>
            <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "16px" }}>
              Try adjusting your search terms or check back later for new events.
            </p>
          </div>
        )}
      </div>
    </Layout>
  );
}

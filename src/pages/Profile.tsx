import { useState } from "react";
import Layout from "../components/Layout";

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: "John Doe",
    title: "CEO & Founder",
    company: "InnovateX",
    industry: "AI/ML",
    location: "San Francisco, CA",
    bio: "Passionate entrepreneur building the future of AI-powered analytics. Previously led product at two successful startups. Always looking to connect with like-minded founders and innovators.",
    website: "https://innovatex.com",
    linkedin: "https://linkedin.com/in/johndoe",
    twitter: "@johndoe",
    experience: "8 years",
    education: "Stanford University, Computer Science",
    skills: ["AI/ML", "Product Management", "Leadership", "Strategy"],
    interests: ["Technology", "Innovation", "Startups", "Mentoring"]
  });

  const handleSave = () => {
    setIsEditing(false);
    // Here you would typically save to backend
  };

  return (
    <Layout>
      <div style={{ color: "#fff", maxWidth: "800px" }}>
        {/* Header */}
        <div style={{ marginBottom: "32px" }}>
          <h1 style={{ fontSize: "32px", fontWeight: "bold", margin: "0 0 8px" }}>
            Profile
          </h1>
          <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "16px", margin: 0 }}>
            Manage your founder profile and preferences
          </p>
        </div>

        {/* Profile Card */}
        <div style={{
          background: "rgba(255,255,255,0.05)",
          border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: "16px",
          padding: "32px",
          marginBottom: "24px"
        }}>
          {/* Profile Header */}
          <div style={{ display: "flex", alignItems: "center", gap: "24px", marginBottom: "32px" }}>
            {/* Avatar */}
            <div style={{ position: "relative" }}>
              <div
                style={{
                  width: "120px",
                  height: "120px",
                  background: "#10b981",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "36px",
                  fontWeight: "bold",
                  color: "#fff"
                }}
              >
                {profile.name.split(' ').map(n => n[0]).join('')}
              </div>
              <button
                style={{
                  position: "absolute",
                  bottom: "0",
                  right: "0",
                  background: "#10b981",
                  border: "none",
                  borderRadius: "50%",
                  width: "32px",
                  height: "32px",
                  color: "#fff",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                📷
              </button>
            </div>

            {/* Basic Info */}
            <div style={{ flex: 1 }}>
              {isEditing ? (
                <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                  <input
                    type="text"
                    value={profile.name}
                    onChange={(e) => setProfile({...profile, name: e.target.value})}
                    style={{
                      background: "rgba(255,255,255,0.1)",
                      border: "1px solid rgba(255,255,255,0.2)",
                      borderRadius: "8px",
                      padding: "12px",
                      color: "#fff",
                      fontSize: "24px",
                      fontWeight: "bold",
                      outline: "none"
                    }}
                  />
                  <input
                    type="text"
                    value={profile.title}
                    onChange={(e) => setProfile({...profile, title: e.target.value})}
                    style={{
                      background: "rgba(255,255,255,0.1)",
                      border: "1px solid rgba(255,255,255,0.2)",
                      borderRadius: "8px",
                      padding: "8px 12px",
                      color: "rgba(255,255,255,0.8)",
                      fontSize: "16px",
                      outline: "none"
                    }}
                  />
                  <input
                    type="text"
                    value={profile.company}
                    onChange={(e) => setProfile({...profile, company: e.target.value})}
                    style={{
                      background: "rgba(255,255,255,0.1)",
                      border: "1px solid rgba(255,255,255,0.2)",
                      borderRadius: "8px",
                      padding: "8px 12px",
                      color: "rgba(255,255,255,0.8)",
                      fontSize: "16px",
                      outline: "none"
                    }}
                  />
                </div>
              ) : (
                <div>
                  <h2 style={{ fontSize: "28px", fontWeight: "bold", margin: "0 0 8px" }}>
                    {profile.name}
                  </h2>
                  <p style={{ color: "rgba(255,255,255,0.8)", fontSize: "18px", margin: "0 0 4px" }}>
                    {profile.title}
                  </p>
                  <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "16px", margin: 0 }}>
                    {profile.company}
                  </p>
                </div>
              )}
            </div>

            {/* Edit Button */}
            <button
              onClick={() => isEditing ? handleSave() : setIsEditing(true)}
              style={{
                background: isEditing ? "#10b981" : "rgba(255,255,255,0.1)",
                border: "1px solid rgba(255,255,255,0.2)",
                borderRadius: "8px",
                padding: "12px 24px",
                color: isEditing ? "#000" : "#fff",
                fontSize: "14px",
                fontWeight: "600",
                cursor: "pointer",
                transition: "all 0.2s ease"
              }}
            >
              {isEditing ? "Save Changes" : "Edit Profile"}
            </button>
          </div>

          {/* Bio Section */}
          <div style={{ marginBottom: "24px" }}>
            <h3 style={{ fontSize: "18px", fontWeight: "600", margin: "0 0 12px", color: "#fff" }}>
              About
            </h3>
            {isEditing ? (
              <textarea
                value={profile.bio}
                onChange={(e) => setProfile({...profile, bio: e.target.value})}
                rows={4}
                style={{
                  width: "100%",
                  background: "rgba(255,255,255,0.1)",
                  border: "1px solid rgba(255,255,255,0.2)",
                  borderRadius: "8px",
                  padding: "12px",
                  color: "#fff",
                  fontSize: "14px",
                  outline: "none",
                  resize: "vertical"
                }}
              />
            ) : (
              <p style={{ color: "rgba(255,255,255,0.8)", fontSize: "16px", lineHeight: 1.6, margin: 0 }}>
                {profile.bio}
              </p>
            )}
          </div>

          {/* Details Grid */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "24px" }}>
            {/* Industry & Location */}
            <div>
              <h4 style={{ fontSize: "14px", fontWeight: "600", margin: "0 0 8px", color: "rgba(255,255,255,0.6)" }}>
                Industry & Location
              </h4>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ color: "#10b981" }}>🏢</span>
                  <span style={{ color: "#fff" }}>{profile.industry}</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ color: "#10b981" }}>📍</span>
                  <span style={{ color: "#fff" }}>{profile.location}</span>
                </div>
              </div>
            </div>

            {/* Experience & Education */}
            <div>
              <h4 style={{ fontSize: "14px", fontWeight: "600", margin: "0 0 8px", color: "rgba(255,255,255,0.6)" }}>
                Experience & Education
              </h4>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ color: "#10b981" }}>💼</span>
                  <span style={{ color: "#fff" }}>{profile.experience} experience</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ color: "#10b981" }}>🎓</span>
                  <span style={{ color: "#fff" }}>{profile.education}</span>
                </div>
              </div>
            </div>

            {/* Skills */}
            <div>
              <h4 style={{ fontSize: "14px", fontWeight: "600", margin: "0 0 8px", color: "rgba(255,255,255,0.6)" }}>
                Skills
              </h4>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                {profile.skills.map((skill, index) => (
                  <span
                    key={index}
                    style={{
                      background: "rgba(16, 185, 129, 0.2)",
                      border: "1px solid rgba(16, 185, 129, 0.3)",
                      borderRadius: "12px",
                      padding: "4px 8px",
                      fontSize: "12px",
                      color: "#10b981"
                    }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Interests */}
            <div>
              <h4 style={{ fontSize: "14px", fontWeight: "600", margin: "0 0 8px", color: "rgba(255,255,255,0.6)" }}>
                Interests
              </h4>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                {profile.interests.map((interest, index) => (
                  <span
                    key={index}
                    style={{
                      background: "rgba(255,255,255,0.1)",
                      border: "1px solid rgba(255,255,255,0.2)",
                      borderRadius: "12px",
                      padding: "4px 8px",
                      fontSize: "12px",
                      color: "#fff"
                    }}
                  >
                    {interest}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div style={{ marginTop: "24px" }}>
            <h4 style={{ fontSize: "14px", fontWeight: "600", margin: "0 0 12px", color: "rgba(255,255,255,0.6)" }}>
              Social Links
            </h4>
            <div style={{ display: "flex", gap: "16px" }}>
              <a
                href={profile.website}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: "#10b981",
                  textDecoration: "none",
                  fontSize: "14px",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px"
                }}
              >
                🌐 Website
              </a>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: "#10b981",
                  textDecoration: "none",
                  fontSize: "14px",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px"
                }}
              >
                💼 LinkedIn
              </a>
              <span style={{ color: "#10b981", fontSize: "14px", display: "flex", alignItems: "center", gap: "6px" }}>
                🐦 {profile.twitter}
              </span>
            </div>
          </div>
        </div>

        {/* Stats Card */}
        <div style={{
          background: "rgba(255,255,255,0.05)",
          border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: "16px",
          padding: "24px"
        }}>
          <h3 style={{ fontSize: "18px", fontWeight: "600", margin: "0 0 20px", color: "#fff" }}>
            Profile Stats
          </h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: "20px" }}>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: "24px", fontWeight: "bold", color: "#10b981", marginBottom: "4px" }}>
                24
              </div>
              <div style={{ fontSize: "14px", color: "rgba(255,255,255,0.6)" }}>
                Connections
              </div>
            </div>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: "24px", fontWeight: "bold", color: "#10b981", marginBottom: "4px" }}>
                156
              </div>
              <div style={{ fontSize: "14px", color: "rgba(255,255,255,0.6)" }}>
                Profile Views
              </div>
            </div>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: "24px", fontWeight: "bold", color: "#10b981", marginBottom: "4px" }}>
                8
              </div>
              <div style={{ fontSize: "14px", color: "rgba(255,255,255,0.6)" }}>
                Messages
              </div>
            </div>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: "24px", fontWeight: "bold", color: "#10b981", marginBottom: "4px" }}>
                92%
              </div>
              <div style={{ fontSize: "14px", color: "rgba(255,255,255,0.6)" }}>
                Profile Complete
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

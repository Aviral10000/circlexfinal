import { useState, useEffect } from "react";
import Layout from "../components/Layout";

interface StartupProfile {
  id: number;
  founder_id: string;
  founder_name: string;
  founder_title: string;
  startup_name: string;
  industry: string;
  stage: string;
  funding_raised: string;
  team_size: number;
  location: string;
  description: string;
  avatar: string;
  pitch_deck_url?: string;
  website_url?: string;
  created_at: string;
}

interface LikedStartup {
  id: number;
  founder_id: string;
  founder_name: string;
  startup_name: string;
  industry: string;
  stage: string;
  funding_raised: string;
  founder_email: string;
  founder_phone?: string;
  liked_at: string;
}

export default function InvestorDashboard() {
  const [activeTab, setActiveTab] = useState<'discover' | 'liked'>('discover');
  const [startups, setStartups] = useState<StartupProfile[]>([]);
  const [likedStartups, setLikedStartups] = useState<LikedStartup[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  // Mock data for demo
  useEffect(() => {
    const mockStartups: StartupProfile[] = [
      {
        id: 1,
        founder_id: "1",
        founder_name: "Priya Sharma",
        founder_title: "Co-founder & CEO",
        startup_name: "HealthTech Innovations",
        industry: "Healthcare",
        stage: "Seed",
        funding_raised: "$500K",
        team_size: 8,
        location: "Bangalore",
        description: "AI-powered telemedicine platform connecting rural India with quality healthcare. Our platform has already served 10,000+ patients across 50+ villages.",
        avatar: "PS",
        pitch_deck_url: "#",
        website_url: "https://healthtechinnovations.com",
        created_at: new Date().toISOString()
      },
      {
        id: 2,
        founder_id: "2",
        founder_name: "Arjun Patel",
        founder_title: "Founder & CEO",
        startup_name: "AgriTech Solutions",
        industry: "Agriculture",
        stage: "Pre-Seed",
        funding_raised: "$200K",
        team_size: 5,
        location: "Pune",
        description: "IoT-based farm management system helping farmers increase yield by 30% through smart irrigation and crop monitoring.",
        avatar: "AP",
        pitch_deck_url: "#",
        website_url: "https://agritechsolutions.com",
        created_at: new Date(Date.now() - 86400000).toISOString()
      },
      {
        id: 3,
        founder_id: "3",
        founder_name: "Kavya Reddy",
        founder_title: "CEO & Co-founder",
        startup_name: "EduTech Startup",
        industry: "Education",
        stage: "Series A",
        funding_raised: "$2M",
        team_size: 25,
        location: "Mumbai",
        description: "Personalized learning platform using AI to adapt to each student's learning style. 50,000+ active students across 200+ schools.",
        avatar: "KR",
        pitch_deck_url: "#",
        website_url: "https://edutechstartup.com",
        created_at: new Date(Date.now() - 172800000).toISOString()
      },
      {
        id: 4,
        founder_id: "4",
        founder_name: "Rohan Singh",
        founder_title: "Founder",
        startup_name: "FinTech Innovations",
        industry: "FinTech",
        stage: "Seed",
        funding_raised: "$800K",
        team_size: 12,
        location: "Delhi",
        description: "Neo-banking platform for SMEs with integrated accounting, invoicing, and payment solutions. 5,000+ businesses onboarded.",
        avatar: "RS",
        pitch_deck_url: "#",
        website_url: "https://fintechinnovations.com",
        created_at: new Date(Date.now() - 259200000).toISOString()
      }
    ];

    setStartups(mockStartups);
    setLoading(false);
  }, []);

  const currentStartup = startups[currentIndex];

  const handleLike = () => {
    if (currentStartup) {
      const likedStartup: LikedStartup = {
        id: Date.now(),
        founder_id: currentStartup.founder_id,
        founder_name: currentStartup.founder_name,
        startup_name: currentStartup.startup_name,
        industry: currentStartup.industry,
        stage: currentStartup.stage,
        funding_raised: currentStartup.funding_raised,
        founder_email: `${currentStartup.founder_name.toLowerCase().replace(' ', '.')}@${currentStartup.startup_name.toLowerCase().replace(' ', '')}.com`,
        liked_at: new Date().toISOString()
      };
      
      setLikedStartups(prev => [likedStartup, ...prev]);
      setCurrentIndex(prev => prev + 1);
    }
  };

  const handleSkip = () => {
    setCurrentIndex(prev => prev + 1);
  };

  if (loading) {
    return (
      <Layout>
        <div style={{ 
          display: "flex", 
          justifyContent: "center", 
          alignItems: "center", 
          height: "50vh",
          color: "#fff"
        }}>
          <div>Loading...</div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div style={{ color: "#fff", padding: "24px" }}>
        {/* Header */}
        <div style={{ marginBottom: "32px" }}>
          <h1 style={{
            fontSize: "32px",
            fontWeight: "600",
            margin: "0 0 8px",
            letterSpacing: "-0.02em"
          }}>
            Investor Dashboard
          </h1>
          <p style={{
            color: "rgba(255,255,255,0.7)",
            fontSize: "16px",
            margin: 0
          }}>
            Discover and invest in India's most promising startups
          </p>
        </div>

        {/* Tabs */}
        <div style={{
          display: "flex",
          gap: "8px",
          marginBottom: "32px",
          borderBottom: "1px solid rgba(255,255,255,0.1)",
          paddingBottom: "16px"
        }}>
          <button
            onClick={() => setActiveTab('discover')}
            style={{
              background: activeTab === 'discover' ? "rgba(255,255,255,0.1)" : "transparent",
              border: "none",
              color: activeTab === 'discover' ? "#fff" : "rgba(255,255,255,0.7)",
              padding: "12px 24px",
              borderRadius: "8px",
              cursor: "pointer",
              fontSize: "14px",
              fontWeight: "500",
              transition: "all 0.2s ease"
            }}
          >
            Discover Startups ({startups.length - currentIndex})
          </button>
          <button
            onClick={() => setActiveTab('liked')}
            style={{
              background: activeTab === 'liked' ? "rgba(255,255,255,0.1)" : "transparent",
              border: "none",
              color: activeTab === 'liked' ? "#fff" : "rgba(255,255,255,0.7)",
              padding: "12px 24px",
              borderRadius: "8px",
              cursor: "pointer",
              fontSize: "14px",
              fontWeight: "500",
              transition: "all 0.2s ease"
            }}
          >
            Liked Startups ({likedStartups.length})
          </button>
        </div>

        {/* Content */}
        {activeTab === 'discover' ? (
          <div>
            {currentIndex >= startups.length ? (
              <div style={{
                textAlign: "center",
                padding: "60px 20px",
                color: "rgba(255,255,255,0.6)"
              }}>
                <div style={{ fontSize: "48px", marginBottom: "16px" }}>🎉</div>
                <h3 style={{ margin: "0 0 8px", fontSize: "18px" }}>That's all for now!</h3>
                <p style={{ margin: 0, fontSize: "14px" }}>Check back later for more startup profiles</p>
              </div>
            ) : currentStartup ? (
              <div style={{
                maxWidth: "600px",
                margin: "0 auto"
              }}>
                <div style={{
                  background: "rgba(255, 255, 255, 0.02)",
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                  borderRadius: "16px",
                  padding: "32px",
                  backdropFilter: "blur(20px)",
                  marginBottom: "24px"
                }}>
                  {/* Header */}
                  <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "24px" }}>
                    <div style={{
                      width: "64px",
                      height: "64px",
                      borderRadius: "50%",
                      background: "rgba(255, 255, 255, 0.08)",
                      border: "1px solid rgba(255, 255, 255, 0.12)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "20px",
                      fontWeight: "600",
                      color: "#ffffff"
                    }}>
                      {currentStartup.avatar}
                    </div>
                    <div>
                      <h2 style={{
                        fontSize: "24px",
                        fontWeight: "600",
                        margin: "0 0 4px",
                        color: "#fff"
                      }}>
                        {currentStartup.founder_name}
                      </h2>
                      <p style={{
                        fontSize: "16px",
                        color: "rgba(255,255,255,0.7)",
                        margin: "0 0 4px"
                      }}>
                        {currentStartup.founder_title}
                      </p>
                      <p style={{
                        fontSize: "18px",
                        fontWeight: "600",
                        color: "#00ff88",
                        margin: 0
                      }}>
                        {currentStartup.startup_name}
                      </p>
                    </div>
                  </div>

                  {/* Startup Details */}
                  <div style={{ marginBottom: "24px" }}>
                    <div style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
                      gap: "16px",
                      marginBottom: "20px"
                    }}>
                      <div>
                        <span style={{
                          fontSize: "12px",
                          color: "rgba(255,255,255,0.5)",
                          textTransform: "uppercase",
                          letterSpacing: "0.5px"
                        }}>
                          Industry
                        </span>
                        <p style={{
                          fontSize: "14px",
                          color: "#fff",
                          margin: "4px 0 0",
                          fontWeight: "500"
                        }}>
                          {currentStartup.industry}
                        </p>
                      </div>
                      <div>
                        <span style={{
                          fontSize: "12px",
                          color: "rgba(255,255,255,0.5)",
                          textTransform: "uppercase",
                          letterSpacing: "0.5px"
                        }}>
                          Stage
                        </span>
                        <p style={{
                          fontSize: "14px",
                          color: "#fff",
                          margin: "4px 0 0",
                          fontWeight: "500"
                        }}>
                          {currentStartup.stage}
                        </p>
                      </div>
                      <div>
                        <span style={{
                          fontSize: "12px",
                          color: "rgba(255,255,255,0.5)",
                          textTransform: "uppercase",
                          letterSpacing: "0.5px"
                        }}>
                          Funding Raised
                        </span>
                        <p style={{
                          fontSize: "14px",
                          color: "#00ff88",
                          margin: "4px 0 0",
                          fontWeight: "600"
                        }}>
                          {currentStartup.funding_raised}
                        </p>
                      </div>
                      <div>
                        <span style={{
                          fontSize: "12px",
                          color: "rgba(255,255,255,0.5)",
                          textTransform: "uppercase",
                          letterSpacing: "0.5px"
                        }}>
                          Team Size
                        </span>
                        <p style={{
                          fontSize: "14px",
                          color: "#fff",
                          margin: "4px 0 0",
                          fontWeight: "500"
                        }}>
                          {currentStartup.team_size} people
                        </p>
                      </div>
                    </div>

                    <div>
                      <span style={{
                        fontSize: "12px",
                        color: "rgba(255,255,255,0.5)",
                        textTransform: "uppercase",
                        letterSpacing: "0.5px"
                      }}>
                        Description
                      </span>
                      <p style={{
                        fontSize: "14px",
                        color: "rgba(255,255,255,0.8)",
                        margin: "8px 0 0",
                        lineHeight: "1.6"
                      }}>
                        {currentStartup.description}
                      </p>
                    </div>
                  </div>

                  {/* Links */}
                  <div style={{
                    display: "flex",
                    gap: "12px",
                    marginBottom: "24px"
                  }}>
                    {currentStartup.website_url && (
                      <a
                        href={currentStartup.website_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          color: "#00ff88",
                          fontSize: "14px",
                          textDecoration: "none",
                          display: "flex",
                          alignItems: "center",
                          gap: "4px"
                        }}
                      >
                        🌐 Website
                      </a>
                    )}
                    {currentStartup.pitch_deck_url && (
                      <a
                        href={currentStartup.pitch_deck_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          color: "#00ff88",
                          fontSize: "14px",
                          textDecoration: "none",
                          display: "flex",
                          alignItems: "center",
                          gap: "4px"
                        }}
                      >
                        📊 Pitch Deck
                      </a>
                    )}
                  </div>
                </div>

                {/* Action Buttons */}
                <div style={{
                  display: "flex",
                  gap: "16px",
                  justifyContent: "center"
                }}>
                  <button
                    onClick={handleSkip}
                    style={{
                      flex: 1,
                      padding: "16px 24px",
                      background: "rgba(255, 255, 255, 0.05)",
                      border: "1px solid rgba(255, 255, 255, 0.1)",
                      borderRadius: "12px",
                      color: "rgba(255,255,255,0.7)",
                      fontSize: "16px",
                      fontWeight: "500",
                      cursor: "pointer",
                      transition: "all 0.2s ease"
                    }}
                  >
                    Skip
                  </button>
                  <button
                    onClick={handleLike}
                    style={{
                      flex: 1,
                      padding: "16px 24px",
                      background: "linear-gradient(135deg, #00ff88 0%, #00cc6a 100%)",
                      border: "none",
                      borderRadius: "12px",
                      color: "#000",
                      fontSize: "16px",
                      fontWeight: "600",
                      cursor: "pointer",
                      transition: "all 0.2s ease"
                    }}
                  >
                    Show Interest
                  </button>
                </div>
              </div>
            ) : null}
          </div>
        ) : (
          <div>
            <h2 style={{
              fontSize: "24px",
              fontWeight: "600",
              margin: "0 0 24px",
              color: "#fff"
            }}>
              Liked Startups
            </h2>
            
            {likedStartups.length === 0 ? (
              <div style={{
                textAlign: "center",
                padding: "60px 20px",
                color: "rgba(255,255,255,0.6)"
              }}>
                <div style={{ fontSize: "48px", marginBottom: "16px" }}>💼</div>
                <h3 style={{ margin: "0 0 8px", fontSize: "18px" }}>No liked startups yet</h3>
                <p style={{ margin: 0, fontSize: "14px" }}>Startups you show interest in will appear here</p>
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                {likedStartups.map((startup) => (
                  <div
                    key={startup.id}
                    style={{
                      background: "rgba(255, 255, 255, 0.02)",
                      border: "1px solid rgba(255, 255, 255, 0.08)",
                      borderRadius: "16px",
                      padding: "24px",
                      backdropFilter: "blur(20px)"
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                      {/* Content */}
                      <div style={{ flex: 1 }}>
                        <h3 style={{
                          fontSize: "18px",
                          fontWeight: "600",
                          margin: "0 0 4px",
                          color: "#fff"
                        }}>
                          {startup.startup_name}
                        </h3>
                        <p style={{
                          fontSize: "14px",
                          color: "rgba(255,255,255,0.7)",
                          margin: "0 0 8px"
                        }}>
                          by {startup.founder_name}
                        </p>
                        <div style={{ display: "flex", gap: "16px", fontSize: "12px", color: "rgba(255,255,255,0.5)" }}>
                          <span>🏢 {startup.industry}</span>
                          <span>📈 {startup.stage}</span>
                          <span>💰 {startup.funding_raised}</span>
                        </div>
                        <div style={{ display: "flex", gap: "16px", fontSize: "12px", color: "rgba(255,255,255,0.5)", marginTop: "8px" }}>
                          <span>📧 {startup.founder_email}</span>
                          {startup.founder_phone && <span>📱 {startup.founder_phone}</span>}
                        </div>
                      </div>

                      {/* Contact Button */}
                      <button
                        style={{
                          background: "rgba(255, 255, 255, 0.05)",
                          border: "1px solid rgba(255, 255, 255, 0.1)",
                          color: "#fff",
                          padding: "8px 16px",
                          borderRadius: "8px",
                          fontSize: "14px",
                          fontWeight: "500",
                          cursor: "pointer",
                          transition: "all 0.2s ease"
                        }}
                      >
                        Contact
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </Layout>
  );
}

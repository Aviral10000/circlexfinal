import { useState, useEffect } from "react";
import Layout from "../components/Layout";
import { pitchService } from "../services/pitchService";

interface Cofounder {
  id: number;
  name: string;
  title: string;
  company: string;
  industry: string;
  location: string;
  bio: string;
  avatar: string;
  skills: string[];
  experience: string;
  lookingFor: string;
  matchPercentage: number;
  isOnline: boolean;
  matchDescription: string;
  matchReason: string;
}

export default function Cofounders() {
  const [cofounders, setCofounders] = useState<Cofounder[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentCofounder, setCurrentCofounder] = useState<Cofounder | null>(null);
  const [showPitchModal, setShowPitchModal] = useState(false);
  const [pitchMessage, setPitchMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedIndustry, setSelectedIndustry] = useState("All Industries");
  const [showIndustryDropdown, setShowIndustryDropdown] = useState(false);

  const industries = [
    "All Industries",
    "AI/ML",
    "FinTech",
    "Healthcare",
    "E-Commerce",
    "Software",
    "Blockchain",
    "EdTech"
  ];

  useEffect(() => {
    // Sample cofounder data
    const sampleCofounders: Cofounder[] = [
      {
        id: 1,
        name: "Alex Chen",
        title: "Technical Co-founder",
        company: "Previous: Google",
        industry: "AI/ML",
        location: "San Francisco, CA",
        bio: "Full-stack engineer with 8+ years building scalable systems. Led technical teams at Google and two successful startups. Passionate about AI and looking to build the next unicorn.",
        avatar: "AC",
        skills: ["React", "Node.js", "Python", "AWS", "Machine Learning"],
        experience: "8 years",
        lookingFor: "Business co-founder with strong network and sales experience",
        matchPercentage: 94,
        isOnline: true,
        matchDescription: "Perfect Match",
        matchReason: "Complementary technical and business skills with shared AI vision."
      },
      {
        id: 2,
        name: "Sarah Rodriguez",
        title: "Product Co-founder",
        company: "Previous: Stripe",
        industry: "FinTech",
        location: "New York, NY",
        bio: "Product leader with deep fintech expertise. Built payment systems at Stripe and led product at two fintech startups. Looking for a technical co-founder to build the future of finance.",
        avatar: "SR",
        skills: ["Product Strategy", "UX Design", "FinTech", "Growth", "Team Leadership"],
        experience: "7 years",
        lookingFor: "Technical co-founder with fintech or payments experience",
        matchPercentage: 87,
        isOnline: false,
        matchDescription: "Strong Match",
        matchReason: "Shared fintech vision with complementary product and technical skills."
      },
      {
        id: 3,
        name: "David Kim",
        title: "Business Co-founder",
        company: "Previous: McKinsey",
        industry: "Healthcare",
        location: "Boston, MA",
        bio: "Strategy consultant turned entrepreneur. 6 years at McKinsey focusing on healthcare. MBA from Wharton. Looking for a technical co-founder to revolutionize healthcare delivery.",
        avatar: "DK",
        skills: ["Strategy", "Healthcare", "Business Development", "Fundraising", "Operations"],
        experience: "6 years",
        lookingFor: "Technical co-founder with healthcare or AI experience",
        matchPercentage: 82,
        isOnline: true,
        matchDescription: "Great Potential",
        matchReason: "Strong business acumen with healthcare expertise and network."
      },
      {
        id: 4,
        name: "Emily Watson",
        title: "Design Co-founder",
        company: "Previous: Airbnb",
        industry: "E-Commerce",
        location: "Los Angeles, CA",
        bio: "Design leader with 5+ years at Airbnb and Pinterest. Expert in user experience and brand design. Looking for a technical co-founder to build beautiful, user-centric products.",
        avatar: "EW",
        skills: ["UI/UX Design", "Brand Design", "User Research", "Figma", "Design Systems"],
        experience: "5 years",
        lookingFor: "Technical co-founder with frontend or full-stack experience",
        matchPercentage: 79,
        isOnline: true,
        matchDescription: "Good Match",
        matchReason: "Exceptional design skills with focus on user experience."
      },
      {
        id: 5,
        name: "Michael Johnson",
        title: "Marketing Co-founder",
        company: "Previous: HubSpot",
        industry: "SaaS",
        location: "Austin, TX",
        bio: "Growth marketing expert with 6+ years scaling SaaS companies. Led marketing at HubSpot and two successful B2B startups. Looking for a technical co-founder to build the next great SaaS platform.",
        avatar: "MJ",
        skills: ["Growth Marketing", "SEO", "Content Marketing", "Analytics", "Team Building"],
        experience: "6 years",
        lookingFor: "Technical co-founder with SaaS or B2B experience",
        matchPercentage: 76,
        isOnline: false,
        matchDescription: "Solid Match",
        matchReason: "Proven track record in SaaS growth with strong marketing expertise."
      }
    ];
    setCofounders(sampleCofounders);
    setCurrentCofounder(sampleCofounders[0] || null);
  }, []);

  const filteredCofounders = cofounders.filter(cofounder => {
    const matchesSearch = cofounder.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         cofounder.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesIndustry = selectedIndustry === "All Industries" || cofounder.industry === selectedIndustry;
    return matchesSearch && matchesIndustry;
  });

  const handleSwipe = (direction: "left" | "right") => {
    if (direction === "right") {
      setShowPitchModal(true);
    }
    
    const nextIndex = currentIndex + 1;
    if (nextIndex < filteredCofounders.length) {
      setCurrentIndex(nextIndex);
      setCurrentCofounder(filteredCofounders[nextIndex]);
    } else {
      setCurrentCofounder(null);
    }
  };

  const handleSendPitch = async () => {
    if (!currentCofounder || !pitchMessage.trim()) {
      alert("Please write a pitch message.");
      return;
    }

    try {
      const founderEmail = sessionStorage.getItem('founder_email') || '';
      
      await pitchService.submitApplication({
        founder_email: founderEmail,
        target_type: 'cofounder',
        target_id: currentCofounder.id,
        target_name: currentCofounder.name,
        message: pitchMessage,
        status: 'pending'
      });
      
      alert(`Pitch sent to ${currentCofounder.name}! You'll be notified when they respond.`);
      setShowPitchModal(false);
      setPitchMessage("");
      
      // Move to next cofounder
      const nextIndex = currentIndex + 1;
      if (nextIndex < filteredCofounders.length) {
        setCurrentIndex(nextIndex);
        setCurrentCofounder(filteredCofounders[nextIndex]);
      } else {
        setCurrentCofounder(null);
      }
    } catch (error) {
      console.error('Error sending pitch:', error);
      alert('Failed to send pitch. Please try again.');
    }
  };

  const getMatchColor = (percentage: number) => {
    if (percentage >= 90) return "#10b981";
    if (percentage >= 80) return "#eab308";
    if (percentage >= 70) return "#f59e0b";
    return "#ef4444";
  };

  const getMatchEmoji = (percentage: number) => {
    if (percentage >= 90) return "🚀";
    if (percentage >= 80) return "💎";
    if (percentage >= 70) return "⭐";
    return "🤝";
  };

  return (
    <Layout>
      <div style={{ color: "#fff" }}>
        {/* Header */}
        <div style={{ marginBottom: "32px" }}>
          <h1 style={{ fontSize: "32px", fontWeight: "bold", margin: "0 0 8px" }}>
            Find Your Cofounder
          </h1>
          <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "16px", margin: 0 }}>
            Connect with potential cofounders who complement your skills
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
            placeholder="Search cofounders..."
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
              onClick={() => setShowIndustryDropdown(!showIndustryDropdown)}
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
              {selectedIndustry}
              <span style={{ fontSize: "10px" }}>▼</span>
            </button>
            
            {showIndustryDropdown && (
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
                {industries.map((industry) => (
                  <button
                    key={industry}
                    onClick={() => {
                      setSelectedIndustry(industry);
                      setShowIndustryDropdown(false);
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
                    {industry}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Cofounder Card */}
        <div style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "60vh"
        }}>
          {currentCofounder ? (
            <div style={{
              background: "linear-gradient(135deg, rgba(34, 197, 94, 0.08) 0%, rgba(147, 51, 234, 0.08) 100%)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: "20px",
              padding: "40px",
              maxWidth: "500px",
              width: "100%",
              boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
              backdropFilter: "blur(10px)",
              position: "relative"
            }}>
              {/* Match Percentage Badge */}
              <div style={{
                position: "absolute",
                top: "20px",
                right: "20px",
                background: getMatchColor(currentCofounder.matchPercentage),
                borderRadius: "12px",
                padding: "8px 12px",
                textAlign: "center"
              }}>
                <div style={{
                  fontSize: "24px",
                  fontWeight: "bold",
                  color: "#fff",
                  lineHeight: 1
                }}>
                  {currentCofounder.matchPercentage}%
                </div>
                <div style={{
                  fontSize: "12px",
                  color: "#fff",
                  marginTop: "2px"
                }}>
                  Match
                </div>
              </div>

              {/* Avatar */}
              <div style={{ 
                position: "relative",
                marginBottom: "24px"
              }}>
                <div style={{
                  width: "80px",
                  height: "80px",
                  borderRadius: "50%",
                  background: "#10b981",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "24px",
                  fontWeight: "bold",
                  color: "#fff"
                }}>
                  {currentCofounder.avatar}
                </div>
                {currentCofounder.isOnline && (
                  <div style={{
                    position: "absolute",
                    bottom: "2px",
                    right: "2px",
                    width: "16px",
                    height: "16px",
                    borderRadius: "50%",
                    background: "#10b981",
                    border: "2px solid #000",
                    boxShadow: "0 0 10px rgba(16, 185, 129, 0.5)"
                  }}></div>
                )}
              </div>

              {/* Profile Info */}
              <div style={{ marginBottom: "24px" }}>
                <h2 style={{
                  fontSize: "28px",
                  fontWeight: "bold",
                  margin: "0 0 8px",
                  color: "#fff"
                }}>
                  {currentCofounder.name}
                </h2>
                <p style={{
                  fontSize: "16px",
                  color: "rgba(255,255,255,0.7)",
                  margin: "0 0 12px"
                }}>
                  {currentCofounder.title}
                </p>
                <div style={{
                  display: "inline-block",
                  background: "rgba(16, 185, 129, 0.2)",
                  border: "1px solid rgba(16, 185, 129, 0.3)",
                  borderRadius: "20px",
                  padding: "4px 12px",
                  fontSize: "12px",
                  color: "#10b981",
                  marginBottom: "16px"
                }}>
                  {currentCofounder.industry} • {currentCofounder.location}
                </div>
                <p style={{
                  color: "rgba(255,255,255,0.8)",
                  fontSize: "16px",
                  lineHeight: 1.6,
                  marginBottom: "20px"
                }}>
                  {currentCofounder.bio}
                </p>
              </div>

              {/* Skills */}
              <div style={{ marginBottom: "20px" }}>
                <h4 style={{ fontSize: "14px", fontWeight: "600", margin: "0 0 8px", color: "rgba(255,255,255,0.6)" }}>
                  Skills
                </h4>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                  {currentCofounder.skills.map((skill, index) => (
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
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Looking For */}
              <div style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "12px",
                padding: "16px",
                marginBottom: "32px"
              }}>
                <h4 style={{ fontSize: "14px", fontWeight: "600", margin: "0 0 8px", color: "#fff" }}>
                  Looking For
                </h4>
                <p style={{ color: "rgba(255,255,255,0.8)", fontSize: "14px", margin: 0 }}>
                  {currentCofounder.lookingFor}
                </p>
              </div>

              {/* Match Description */}
              <div style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "12px",
                padding: "16px",
                marginBottom: "32px",
                display: "flex",
                alignItems: "center",
                gap: "12px"
              }}>
                <span style={{ fontSize: "20px" }}>
                  {getMatchEmoji(currentCofounder.matchPercentage)}
                </span>
                <div>
                  <div style={{
                    fontSize: "16px",
                    fontWeight: "500",
                    color: "#fff",
                    marginBottom: "4px"
                  }}>
                    {currentCofounder.matchDescription}
                  </div>
                  <div style={{
                    fontSize: "12px",
                    color: "rgba(255,255,255,0.6)"
                  }}>
                    {currentCofounder.matchReason}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div style={{
                display: "flex",
                gap: "16px"
              }}>
                <button
                  onClick={() => handleSwipe("left")}
                  style={{
                    flex: 1,
                    padding: "16px",
                    background: "#ef4444",
                    border: "none",
                    borderRadius: "12px",
                    color: "#fff",
                    fontSize: "16px",
                    fontWeight: "600",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px"
                  }}
                >
                  ✕ Pass
                </button>
                <button
                  onClick={() => handleSwipe("right")}
                  style={{
                    flex: 1,
                    padding: "16px",
                    background: "#10b981",
                    border: "none",
                    borderRadius: "12px",
                    color: "#fff",
                    fontSize: "16px",
                    fontWeight: "600",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px"
                  }}
                >
                  🤝 Pitch
                </button>
              </div>
            </div>
          ) : (
            <div style={{ textAlign: "center", fontSize: "20px", color: "rgba(255,255,255,0.7)" }}>
              That's all the geniuses we have for today! 🚀
            </div>
          )}
        </div>

        {/* Pitch Modal */}
        {showPitchModal && currentCofounder && (
          <div style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0,0,0,0.8)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000
          }}>
            <div style={{
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: "16px",
              padding: "32px",
              maxWidth: "500px",
              width: "90%",
              backdropFilter: "blur(10px)"
            }}>
              <h3 style={{ fontSize: "24px", fontWeight: "bold", margin: "0 0 16px", color: "#fff" }}>
                Send Pitch to {currentCofounder.name}
              </h3>
              <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "14px", margin: "0 0 20px" }}>
                Tell them why you'd make a great cofounder team
              </p>
              <textarea
                value={pitchMessage}
                onChange={(e) => setPitchMessage(e.target.value)}
                placeholder="Hi! I'm excited about the possibility of working together. I think our skills would complement each other perfectly..."
                rows={6}
                style={{
                  width: "100%",
                  background: "rgba(255,255,255,0.1)",
                  border: "1px solid rgba(255,255,255,0.2)",
                  borderRadius: "8px",
                  padding: "12px",
                  color: "#fff",
                  fontSize: "14px",
                  outline: "none",
                  resize: "vertical",
                  marginBottom: "20px"
                }}
              />
              <div style={{ display: "flex", gap: "12px" }}>
                <button
                  onClick={() => setShowPitchModal(false)}
                  style={{
                    flex: 1,
                    padding: "12px",
                    background: "rgba(255,255,255,0.1)",
                    border: "1px solid rgba(255,255,255,0.2)",
                    borderRadius: "8px",
                    color: "#fff",
                    fontSize: "14px",
                    fontWeight: "600",
                    cursor: "pointer"
                  }}
                >
                  Cancel
                </button>
                <button
                  onClick={handleSendPitch}
                  disabled={!pitchMessage.trim()}
                  style={{
                    flex: 1,
                    padding: "12px",
                    background: pitchMessage.trim() ? "#10b981" : "rgba(255,255,255,0.1)",
                    border: "none",
                    borderRadius: "8px",
                    color: pitchMessage.trim() ? "#000" : "rgba(255,255,255,0.4)",
                    fontSize: "14px",
                    fontWeight: "600",
                    cursor: pitchMessage.trim() ? "pointer" : "not-allowed"
                  }}
                >
                  Send Pitch
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}

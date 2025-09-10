import { useState, useEffect } from "react";
import Layout from "../components/Layout";
import { pitchService } from "../services/pitchService";

interface Investor {
  id: number;
  name: string;
  title: string;
  firm: string;
  industry: string;
  location: string;
  bio: string;
  avatar: string;
  focusAreas: string[];
  investmentStage: string;
  typicalCheckSize: string;
  portfolioCompanies: string[];
  matchPercentage: number;
  isOnline: boolean;
  matchDescription: string;
  matchReason: string;
  recentInvestments: string[];
}

export default function Investors() {
  const [investors, setInvestors] = useState<Investor[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentInvestor, setCurrentInvestor] = useState<Investor | null>(null);
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
    // Sample investor data
    const sampleInvestors: Investor[] = [
      {
        id: 1,
        name: "Sarah Chen",
        title: "Partner",
        firm: "Andreessen Horowitz",
        industry: "AI/ML",
        location: "Menlo Park, CA",
        bio: "Partner at a16z focusing on AI and machine learning investments. Led investments in 15+ AI companies including 3 unicorns. Former product leader at Google AI. Passionate about supporting technical founders building the future.",
        avatar: "SC",
        focusAreas: ["AI/ML", "Deep Learning", "Computer Vision", "NLP", "Robotics"],
        investmentStage: "Seed to Series A",
        typicalCheckSize: "$1M - $10M",
        portfolioCompanies: ["OpenAI", "Anthropic", "Stability AI", "Hugging Face"],
        matchPercentage: 95,
        isOnline: true,
        matchDescription: "Perfect Match",
        matchReason: "Strong focus on AI/ML with track record of successful investments in the space.",
        recentInvestments: ["AI Startup A", "ML Platform B", "Computer Vision C"]
      },
      {
        id: 2,
        name: "Michael Rodriguez",
        title: "Managing Director",
        firm: "Sequoia Capital",
        industry: "FinTech",
        location: "San Francisco, CA",
        bio: "Managing Director at Sequoia Capital with 12+ years in fintech investments. Led investments in Stripe, Square, and other fintech unicorns. Former banker at Goldman Sachs. Expert in payments, lending, and financial infrastructure.",
        avatar: "MR",
        focusAreas: ["Payments", "Lending", "Banking", "Crypto", "Financial Infrastructure"],
        investmentStage: "Series A to Series B",
        typicalCheckSize: "$5M - $25M",
        portfolioCompanies: ["Stripe", "Square", "Coinbase", "Plaid"],
        matchPercentage: 88,
        isOnline: false,
        matchDescription: "Excellent Match",
        matchReason: "Deep fintech expertise with proven track record in payments and financial services.",
        recentInvestments: ["FinTech Startup X", "Payment Platform Y", "Lending Company Z"]
      },
      {
        id: 3,
        name: "Dr. Emily Watson",
        title: "Principal",
        firm: "GV (Google Ventures)",
        industry: "Healthcare",
        location: "Mountain View, CA",
        bio: "Principal at GV focusing on healthcare and life sciences investments. MD with PhD in Biomedical Engineering. Led investments in 20+ healthcare companies. Expert in digital health, medical devices, and biotech.",
        avatar: "EW",
        focusAreas: ["Digital Health", "Medical Devices", "Biotech", "Telemedicine", "Health Data"],
        investmentStage: "Seed to Series A",
        typicalCheckSize: "$2M - $15M",
        portfolioCompanies: ["23andMe", "Veracyte", "Oscar Health", "Flatiron Health"],
        matchPercentage: 91,
        isOnline: true,
        matchDescription: "Outstanding Match",
        matchReason: "Medical background with strong healthcare investment experience and network.",
        recentInvestments: ["HealthTech Startup 1", "Medical Device 2", "Biotech Company 3"]
      },
      {
        id: 4,
        name: "David Kim",
        title: "Investment Director",
        firm: "Accel Partners",
        industry: "Software",
        location: "Palo Alto, CA",
        bio: "Investment Director at Accel Partners with 8+ years in enterprise software investments. Led investments in 12+ B2B software companies. Former product manager at Microsoft. Expert in SaaS, enterprise software, and developer tools.",
        avatar: "DK",
        focusAreas: ["SaaS", "Enterprise Software", "Developer Tools", "Cloud Infrastructure", "Data Analytics"],
        investmentStage: "Series A to Series C",
        typicalCheckSize: "$3M - $20M",
        portfolioCompanies: ["Slack", "Atlassian", "Snowflake", "Databricks"],
        matchPercentage: 83,
        isOnline: true,
        matchDescription: "Great Match",
        matchReason: "Strong enterprise software background with successful B2B investments.",
        recentInvestments: ["SaaS Platform A", "Dev Tools B", "Analytics Company C"]
      },
      {
        id: 5,
        name: "Lisa Thompson",
        title: "Partner",
        firm: "First Round Capital",
        industry: "E-Commerce",
        location: "San Francisco, CA",
        bio: "Partner at First Round Capital with 10+ years in consumer and e-commerce investments. Led investments in 18+ consumer companies. Former VP Marketing at Amazon. Expert in D2C brands, marketplaces, and consumer technology.",
        avatar: "LT",
        focusAreas: ["D2C Brands", "Marketplaces", "Consumer Tech", "Retail", "Social Commerce"],
        investmentStage: "Seed to Series A",
        typicalCheckSize: "$500K - $5M",
        portfolioCompanies: ["Warby Parker", "Allbirds", "Glossier", "Stitch Fix"],
        matchPercentage: 79,
        isOnline: false,
        matchDescription: "Solid Match",
        matchReason: "Consumer and e-commerce expertise with strong track record in D2C brands.",
        recentInvestments: ["D2C Brand X", "Marketplace Y", "Consumer App Z"]
      }
    ];
    setInvestors(sampleInvestors);
    setCurrentInvestor(sampleInvestors[0] || null);
  }, []);

  const filteredInvestors = investors.filter(investor => {
    const matchesSearch = investor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         investor.focusAreas.some(area => area.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesIndustry = selectedIndustry === "All Industries" || investor.industry === selectedIndustry;
    return matchesSearch && matchesIndustry;
  });

  const handleSwipe = (direction: "left" | "right") => {
    if (direction === "right") {
      setShowPitchModal(true);
    }
    
    const nextIndex = currentIndex + 1;
    if (nextIndex < filteredInvestors.length) {
      setCurrentIndex(nextIndex);
      setCurrentInvestor(filteredInvestors[nextIndex]);
    } else {
      setCurrentInvestor(null);
    }
  };

  const handleSendPitch = async () => {
    if (!currentInvestor || !pitchMessage.trim()) {
      alert("Please write a pitch message.");
      return;
    }

    try {
      const founderEmail = sessionStorage.getItem('founder_email') || '';
      
      await pitchService.submitPitch({
        founder_email: founderEmail,
        target_type: 'investor',
        target_id: currentInvestor.id,
        target_name: currentInvestor.name,
        message: pitchMessage,
        status: 'pending'
      });
      
      alert(`Pitch sent to ${currentInvestor.name}! You'll be notified when they respond.`);
      setShowPitchModal(false);
      setPitchMessage("");
      
      // Move to next investor
      const nextIndex = currentIndex + 1;
      if (nextIndex < filteredInvestors.length) {
        setCurrentIndex(nextIndex);
        setCurrentInvestor(filteredInvestors[nextIndex]);
      } else {
        setCurrentInvestor(null);
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
    if (percentage >= 90) return "💰";
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
            Find Your Investor
          </h1>
          <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "16px", margin: 0 }}>
            Connect with investors who can fuel your startup's growth
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
            placeholder="Search investors..."
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

        {/* Investor Card */}
        <div style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "60vh"
        }}>
          {currentInvestor ? (
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
                background: getMatchColor(currentInvestor.matchPercentage),
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
                  {currentInvestor.matchPercentage}%
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
                  {currentInvestor.avatar}
                </div>
                {currentInvestor.isOnline && (
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
                  {currentInvestor.name}
                </h2>
                <p style={{
                  fontSize: "16px",
                  color: "rgba(255,255,255,0.7)",
                  margin: "0 0 12px"
                }}>
                  {currentInvestor.title} at {currentInvestor.firm}
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
                  {currentInvestor.industry} • {currentInvestor.location}
                </div>
                <p style={{
                  color: "rgba(255,255,255,0.8)",
                  fontSize: "16px",
                  lineHeight: 1.6,
                  marginBottom: "20px"
                }}>
                  {currentInvestor.bio}
                </p>
              </div>

              {/* Investment Details */}
              <div style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "12px",
                padding: "16px",
                marginBottom: "20px"
              }}>
                <h4 style={{ fontSize: "14px", fontWeight: "600", margin: "0 0 12px", color: "#fff" }}>
                  Investment Focus
                </h4>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "12px" }}>
                  <div>
                    <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.6)", marginBottom: "4px" }}>
                      Stage
                    </div>
                    <div style={{ fontSize: "14px", color: "#fff", fontWeight: "500" }}>
                      {currentInvestor.investmentStage}
                    </div>
                  </div>
                  <div>
                    <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.6)", marginBottom: "4px" }}>
                      Check Size
                    </div>
                    <div style={{ fontSize: "14px", color: "#10b981", fontWeight: "500" }}>
                      {currentInvestor.typicalCheckSize}
                    </div>
                  </div>
                </div>
                <div style={{ marginBottom: "12px" }}>
                  <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.6)", marginBottom: "6px" }}>
                    Focus Areas
                  </div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "4px" }}>
                    {currentInvestor.focusAreas.map((area, index) => (
                      <span
                        key={index}
                        style={{
                          background: "rgba(16, 185, 129, 0.2)",
                          border: "1px solid rgba(16, 185, 129, 0.3)",
                          borderRadius: "8px",
                          padding: "2px 6px",
                          fontSize: "10px",
                          color: "#10b981"
                        }}
                      >
                        {area}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Portfolio Companies */}
              <div style={{ marginBottom: "20px" }}>
                <h4 style={{ fontSize: "14px", fontWeight: "600", margin: "0 0 8px", color: "rgba(255,255,255,0.6)" }}>
                  Notable Portfolio Companies
                </h4>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                  {currentInvestor.portfolioCompanies.map((company, index) => (
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
                      {company}
                    </span>
                  ))}
                </div>
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
                  {getMatchEmoji(currentInvestor.matchPercentage)}
                </span>
                <div>
                  <div style={{
                    fontSize: "16px",
                    fontWeight: "500",
                    color: "#fff",
                    marginBottom: "4px"
                  }}>
                    {currentInvestor.matchDescription}
                  </div>
                  <div style={{
                    fontSize: "12px",
                    color: "rgba(255,255,255,0.6)"
                  }}>
                    {currentInvestor.matchReason}
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
                  💰 Pitch
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
        {showPitchModal && currentInvestor && (
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
                Send Pitch to {currentInvestor.name}
              </h3>
              <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "14px", margin: "0 0 20px" }}>
                Share your startup idea and why you'd be a great investment
              </p>
              <textarea
                value={pitchMessage}
                onChange={(e) => setPitchMessage(e.target.value)}
                placeholder="Hi! I'm building [your startup] - a [brief description]. We're solving [problem] for [target market]. Our traction includes [key metrics]. I'd love to discuss how we align with your investment thesis..."
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

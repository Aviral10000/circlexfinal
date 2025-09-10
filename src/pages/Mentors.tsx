import { useState, useEffect } from "react";
import Layout from "../components/Layout";
import { pitchService } from "../services/pitchService";

interface Mentor {
  id: number;
  name: string;
  title: string;
  company: string;
  industry: string;
  location: string;
  bio: string;
  avatar: string;
  expertise: string[];
  experience: string;
  mentorshipAreas: string[];
  matchPercentage: number;
  isOnline: boolean;
  matchDescription: string;
  matchReason: string;
  hourlyRate?: string;
  availability: string;
}

export default function Mentors() {
  const [mentors, setMentors] = useState<Mentor[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentMentor, setCurrentMentor] = useState<Mentor | null>(null);
  const [showApplicationModal, setShowApplicationModal] = useState(false);
  const [applicationMessage, setApplicationMessage] = useState("");
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
    // Sample mentor data
    const sampleMentors: Mentor[] = [
      {
        id: 1,
        name: "Jennifer Liu",
        title: "Former VP Engineering",
        company: "Previous: Facebook, Google",
        industry: "AI/ML",
        location: "San Francisco, CA",
        bio: "Engineering leader with 15+ years at top tech companies. Led teams of 200+ engineers and scaled products to billions of users. Passionate about helping early-stage founders build technical teams.",
        avatar: "JL",
        expertise: ["Technical Leadership", "Team Building", "Product Strategy", "Scaling", "AI/ML"],
        experience: "15 years",
        mentorshipAreas: ["Technical Leadership", "Hiring", "Product Development", "Scaling"],
        matchPercentage: 96,
        isOnline: true,
        matchDescription: "Perfect Mentor",
        matchReason: "Extensive experience in AI/ML and technical leadership at scale.",
        hourlyRate: "$500/hr",
        availability: "Available for 1:1 sessions"
      },
      {
        id: 2,
        name: "Robert Chen",
        title: "Former CMO",
        company: "Previous: Uber, Airbnb",
        industry: "E-Commerce",
        location: "New York, NY",
        bio: "Marketing executive with 12+ years building world-class brands. Led marketing at Uber and Airbnb during their hypergrowth phases. Expert in growth marketing and brand building.",
        avatar: "RC",
        expertise: ["Growth Marketing", "Brand Building", "User Acquisition", "Team Leadership", "Strategy"],
        experience: "12 years",
        mentorshipAreas: ["Marketing Strategy", "Growth", "Brand Building", "Team Management"],
        matchPercentage: 89,
        isOnline: false,
        matchDescription: "Excellent Mentor",
        matchReason: "Proven track record in growth marketing and brand building.",
        hourlyRate: "$400/hr",
        availability: "Available for group sessions"
      },
      {
        id: 3,
        name: "Dr. Maria Rodriguez",
        title: "Former CEO",
        company: "Previous: HealthTech Unicorn",
        industry: "Healthcare",
        location: "Boston, MA",
        bio: "Healthcare entrepreneur who built and sold a healthtech company for $2B. MD with MBA from Harvard. Expert in healthcare regulations, fundraising, and scaling healthtech companies.",
        avatar: "MR",
        expertise: ["Healthcare", "Fundraising", "Regulations", "Scaling", "Leadership"],
        experience: "18 years",
        mentorshipAreas: ["Healthcare Strategy", "Fundraising", "Regulatory", "Leadership"],
        matchPercentage: 92,
        isOnline: true,
        matchDescription: "Outstanding Mentor",
        matchReason: "Deep healthcare expertise with successful exit experience.",
        hourlyRate: "$600/hr",
        availability: "Available for 1:1 sessions"
      },
      {
        id: 4,
        name: "James Wilson",
        title: "Former CTO",
        company: "Previous: Stripe, PayPal",
        industry: "FinTech",
        location: "Austin, TX",
        bio: "Fintech technical leader with 14+ years building payment systems. Led engineering at Stripe and PayPal. Expert in fintech regulations, security, and scaling financial products.",
        avatar: "JW",
        expertise: ["FinTech", "Payments", "Security", "Regulations", "Technical Architecture"],
        experience: "14 years",
        mentorshipAreas: ["FinTech Strategy", "Technical Architecture", "Security", "Compliance"],
        matchPercentage: 85,
        isOnline: true,
        matchDescription: "Great Mentor",
        matchReason: "Extensive fintech experience with deep technical and regulatory knowledge.",
        hourlyRate: "$450/hr",
        availability: "Available for 1:1 sessions"
      },
      {
        id: 5,
        name: "Lisa Thompson",
        title: "Former VP Sales",
        company: "Previous: Salesforce, HubSpot",
        industry: "SaaS",
        location: "Seattle, WA",
        bio: "Sales leader with 10+ years scaling B2B sales teams. Built sales organizations from 0 to 100+ reps. Expert in SaaS sales, customer success, and revenue operations.",
        avatar: "LT",
        expertise: ["Sales Strategy", "Team Building", "Customer Success", "Revenue Ops", "SaaS"],
        experience: "10 years",
        mentorshipAreas: ["Sales Strategy", "Team Building", "Customer Success", "Revenue Growth"],
        matchPercentage: 78,
        isOnline: false,
        matchDescription: "Solid Mentor",
        matchReason: "Proven track record in B2B sales and SaaS scaling.",
        hourlyRate: "$350/hr",
        availability: "Available for group sessions"
      }
    ];
    setMentors(sampleMentors);
    setCurrentMentor(sampleMentors[0] || null);
  }, []);

  const filteredMentors = mentors.filter(mentor => {
    const matchesSearch = mentor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         mentor.expertise.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesIndustry = selectedIndustry === "All Industries" || mentor.industry === selectedIndustry;
    return matchesSearch && matchesIndustry;
  });

  const handleSwipe = (direction: "left" | "right") => {
    if (direction === "right") {
      setShowApplicationModal(true);
    }
    
    const nextIndex = currentIndex + 1;
    if (nextIndex < filteredMentors.length) {
      setCurrentIndex(nextIndex);
      setCurrentMentor(filteredMentors[nextIndex]);
    } else {
      setCurrentMentor(null);
    }
  };

  const handleSendApplication = async () => {
    if (!currentMentor || !applicationMessage.trim()) {
      alert("Please write an application message.");
      return;
    }

    try {
      const founderEmail = sessionStorage.getItem('founder_email') || '';
      
      await pitchService.submitApplication({
        founder_email: founderEmail,
        target_type: 'mentor',
        target_id: currentMentor.id,
        target_name: currentMentor.name,
        message: applicationMessage,
        status: 'pending'
      });
      
      alert(`Mentorship application sent to ${currentMentor.name}! You'll be notified when they respond.`);
      setShowApplicationModal(false);
      setApplicationMessage("");
      
      // Move to next mentor
      const nextIndex = currentIndex + 1;
      if (nextIndex < filteredMentors.length) {
        setCurrentIndex(nextIndex);
        setCurrentMentor(filteredMentors[nextIndex]);
      } else {
        setCurrentMentor(null);
      }
    } catch (error) {
      console.error('Error sending application:', error);
      alert('Failed to send application. Please try again.');
    }
  };

  const getMatchColor = (percentage: number) => {
    if (percentage >= 90) return "#10b981";
    if (percentage >= 80) return "#eab308";
    if (percentage >= 70) return "#f59e0b";
    return "#ef4444";
  };

  const getMatchEmoji = (percentage: number) => {
    if (percentage >= 90) return "🎯";
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
            Find Your Mentor
          </h1>
          <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "16px", margin: 0 }}>
            Connect with experienced mentors who can guide your journey
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
            placeholder="Search mentors..."
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

        {/* Mentor Card */}
        <div style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "60vh"
        }}>
          {currentMentor ? (
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
                background: getMatchColor(currentMentor.matchPercentage),
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
                  {currentMentor.matchPercentage}%
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
                  {currentMentor.avatar}
                </div>
                {currentMentor.isOnline && (
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
                  {currentMentor.name}
                </h2>
                <p style={{
                  fontSize: "16px",
                  color: "rgba(255,255,255,0.7)",
                  margin: "0 0 12px"
                }}>
                  {currentMentor.title}
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
                  {currentMentor.industry} • {currentMentor.location}
                </div>
                <p style={{
                  color: "rgba(255,255,255,0.8)",
                  fontSize: "16px",
                  lineHeight: 1.6,
                  marginBottom: "20px"
                }}>
                  {currentMentor.bio}
                </p>
              </div>

              {/* Expertise */}
              <div style={{ marginBottom: "20px" }}>
                <h4 style={{ fontSize: "14px", fontWeight: "600", margin: "0 0 8px", color: "rgba(255,255,255,0.6)" }}>
                  Expertise
                </h4>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                  {currentMentor.expertise.map((skill, index) => (
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

              {/* Mentorship Areas */}
              <div style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "12px",
                padding: "16px",
                marginBottom: "20px"
              }}>
                <h4 style={{ fontSize: "14px", fontWeight: "600", margin: "0 0 8px", color: "#fff" }}>
                  Mentorship Areas
                </h4>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                  {currentMentor.mentorshipAreas.map((area, index) => (
                    <span
                      key={index}
                      style={{
                        background: "rgba(16, 185, 129, 0.2)",
                        border: "1px solid rgba(16, 185, 129, 0.3)",
                        borderRadius: "12px",
                        padding: "4px 8px",
                        fontSize: "11px",
                        color: "#10b981"
                      }}
                    >
                      {area}
                    </span>
                  ))}
                </div>
              </div>

              {/* Rate and Availability */}
              <div style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "12px",
                padding: "16px",
                marginBottom: "32px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center"
              }}>
                <div>
                  <div style={{ fontSize: "16px", fontWeight: "600", color: "#10b981", marginBottom: "4px" }}>
                    {currentMentor.hourlyRate}
                  </div>
                  <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.6)" }}>
                    Hourly Rate
                  </div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontSize: "14px", fontWeight: "500", color: "#fff", marginBottom: "4px" }}>
                    {currentMentor.availability}
                  </div>
                  <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.6)" }}>
                    Availability
                  </div>
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
                  {getMatchEmoji(currentMentor.matchPercentage)}
                </span>
                <div>
                  <div style={{
                    fontSize: "16px",
                    fontWeight: "500",
                    color: "#fff",
                    marginBottom: "4px"
                  }}>
                    {currentMentor.matchDescription}
                  </div>
                  <div style={{
                    fontSize: "12px",
                    color: "rgba(255,255,255,0.6)"
                  }}>
                    {currentMentor.matchReason}
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
                  🎓 Apply
                </button>
              </div>
            </div>
          ) : (
            <div style={{ textAlign: "center", fontSize: "20px", color: "rgba(255,255,255,0.7)" }}>
              That's all the geniuses we have for today! 🚀
            </div>
          )}
        </div>

        {/* Application Modal */}
        {showApplicationModal && currentMentor && (
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
                Apply for Mentorship with {currentMentor.name}
              </h3>
              <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "14px", margin: "0 0 20px" }}>
                Tell them about your goals and what you hope to learn
              </p>
              <textarea
                value={applicationMessage}
                onChange={(e) => setApplicationMessage(e.target.value)}
                placeholder="Hi! I'm working on [your startup] and would love your guidance on [specific areas]. I'm particularly interested in learning about [specific topics]..."
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
                  onClick={() => setShowApplicationModal(false)}
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
                  onClick={handleSendApplication}
                  disabled={!applicationMessage.trim()}
                  style={{
                    flex: 1,
                    padding: "12px",
                    background: applicationMessage.trim() ? "#10b981" : "rgba(255,255,255,0.1)",
                    border: "none",
                    borderRadius: "8px",
                    color: applicationMessage.trim() ? "#000" : "rgba(255,255,255,0.4)",
                    fontSize: "14px",
                    fontWeight: "600",
                    cursor: applicationMessage.trim() ? "pointer" : "not-allowed"
                  }}
                >
                  Send Application
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}

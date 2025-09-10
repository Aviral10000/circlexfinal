import { useState } from "react";

interface DemoModeProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectScenario: (scenario: string) => void;
}

const demoScenarios = [
  {
    id: "founder",
    title: "Early-Stage Founder",
    subtitle: "Looking for co-founder and funding",
    description: "Rohan is building an AI-powered healthcare startup. He needs a technical co-founder and is seeking seed funding.",
    userType: "Founder",
    company: "HealthAI Solutions",
    industry: "Healthcare AI",
    location: "Bangalore",
    stage: "Pre-Seed",
    goals: ["Find Co-founder", "Raise Funding", "Build MVP"],
    avatar: "RH",
    color: "#10b981"
  },
  {
    id: "investor",
    title: "Angel Investor",
    subtitle: "Looking for promising startups",
    description: "Priya is an angel investor focused on fintech and AI startups. She's looking for high-potential early-stage companies.",
    userType: "Investor",
    company: "TechVentures Capital",
    industry: "Venture Capital",
    location: "Mumbai",
    stage: "Angel Investor",
    goals: ["Find Startups", "Due Diligence", "Portfolio Building"],
    avatar: "PM",
    color: "#8b5cf6"
  },
  {
    id: "mentor",
    title: "Serial Entrepreneur",
    subtitle: "Mentoring next-gen founders",
    description: "Arjun has built 3 successful startups. He's now mentoring young founders and looking for advisory opportunities.",
    userType: "Mentor",
    company: "StartupMentor Pro",
    industry: "Consulting",
    location: "Delhi",
    stage: "Serial Entrepreneur",
    goals: ["Mentor Founders", "Advisory Roles", "Network Building"],
    avatar: "AS",
    color: "#f59e0b"
  },
  {
    id: "cofounder",
    title: "Technical Co-founder",
    subtitle: "Looking for business partner",
    description: "Kavya is a full-stack developer with 5 years experience. She's looking for a business co-founder to build the next big thing.",
    userType: "Co-founder",
    company: "TechBuilder",
    industry: "Software Development",
    location: "Hyderabad",
    stage: "Looking for Co-founder",
    goals: ["Find Business Partner", "Build Product", "Scale Startup"],
    avatar: "KR",
    color: "#ef4444"
  }
];

export default function DemoMode({ isOpen, onClose, onSelectScenario }: DemoModeProps) {
  const [selectedScenario, setSelectedScenario] = useState<string | null>(null);

  if (!isOpen) return null;

  return (
    <div style={{
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: "rgba(0, 0, 0, 0.9)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 1000,
      padding: "20px"
    }}>
      <div style={{
        background: "rgba(0, 0, 0, 0.95)",
        border: "1px solid rgba(255, 255, 255, 0.1)",
        borderRadius: "20px",
        padding: "32px",
        maxWidth: "800px",
        width: "100%",
        maxHeight: "90vh",
        overflow: "auto",
        backdropFilter: "blur(20px)"
      }}>
        {/* Header */}
        <div style={{
          textAlign: "center",
          marginBottom: "32px"
        }}>
          <h1 style={{
            color: "#ffffff",
            fontSize: "32px",
            fontWeight: "700",
            margin: "0 0 8px",
            background: "linear-gradient(135deg, #10b981 0%, #8b5cf6 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent"
          }}>
            Demo Mode
          </h1>
          <p style={{
            color: "rgba(255, 255, 255, 0.7)",
            fontSize: "16px",
            margin: 0
          }}>
            Choose a user scenario to experience Circle X
          </p>
        </div>

        {/* Scenarios Grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "20px",
          marginBottom: "32px"
        }}>
          {demoScenarios.map((scenario) => (
            <div
              key={scenario.id}
              onClick={() => setSelectedScenario(scenario.id)}
              style={{
                background: selectedScenario === scenario.id 
                  ? `linear-gradient(135deg, ${scenario.color}20 0%, ${scenario.color}10 100%)`
                  : "rgba(255, 255, 255, 0.05)",
                border: selectedScenario === scenario.id 
                  ? `2px solid ${scenario.color}`
                  : "1px solid rgba(255, 255, 255, 0.1)",
                borderRadius: "16px",
                padding: "24px",
                cursor: "pointer",
                transition: "all 0.3s ease",
                position: "relative",
                overflow: "hidden"
              }}
            >
              {/* User Avatar */}
              <div style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "16px"
              }}>
                <div style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "50%",
                  background: `linear-gradient(135deg, ${scenario.color} 0%, ${scenario.color}CC 100%)`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#ffffff",
                  fontSize: "18px",
                  fontWeight: "600",
                  marginRight: "12px"
                }}>
                  {scenario.avatar}
                </div>
                <div>
                  <h3 style={{
                    color: "#ffffff",
                    fontSize: "18px",
                    fontWeight: "600",
                    margin: "0 0 4px"
                  }}>
                    {scenario.title}
                  </h3>
                  <p style={{
                    color: "rgba(255, 255, 255, 0.6)",
                    fontSize: "14px",
                    margin: 0
                  }}>
                    {scenario.subtitle}
                  </p>
                </div>
              </div>

              {/* Description */}
              <p style={{
                color: "rgba(255, 255, 255, 0.8)",
                fontSize: "14px",
                lineHeight: "1.5",
                margin: "0 0 16px"
              }}>
                {scenario.description}
              </p>

              {/* Details */}
              <div style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "8px",
                marginBottom: "16px"
              }}>
                <span style={{
                  background: "rgba(255, 255, 255, 0.1)",
                  color: "#ffffff",
                  fontSize: "12px",
                  padding: "4px 8px",
                  borderRadius: "6px"
                }}>
                  {scenario.userType}
                </span>
                <span style={{
                  background: "rgba(255, 255, 255, 0.1)",
                  color: "#ffffff",
                  fontSize: "12px",
                  padding: "4px 8px",
                  borderRadius: "6px"
                }}>
                  {scenario.industry}
                </span>
                <span style={{
                  background: "rgba(255, 255, 255, 0.1)",
                  color: "#ffffff",
                  fontSize: "12px",
                  padding: "4px 8px",
                  borderRadius: "6px"
                }}>
                  {scenario.location}
                </span>
              </div>

              {/* Goals */}
              <div>
                <p style={{
                  color: "rgba(255, 255, 255, 0.6)",
                  fontSize: "12px",
                  margin: "0 0 8px",
                  fontWeight: "500"
                }}>
                  Goals:
                </p>
                <div style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "4px"
                }}>
                  {scenario.goals.map((goal, index) => (
                    <span
                      key={index}
                      style={{
                        background: `${scenario.color}20`,
                        color: scenario.color,
                        fontSize: "11px",
                        padding: "2px 6px",
                        borderRadius: "4px",
                        border: `1px solid ${scenario.color}30`
                      }}
                    >
                      {goal}
                    </span>
                  ))}
                </div>
              </div>

              {/* Selection Indicator */}
              {selectedScenario === scenario.id && (
                <div style={{
                  position: "absolute",
                  top: "12px",
                  right: "12px",
                  width: "24px",
                  height: "24px",
                  borderRadius: "50%",
                  background: scenario.color,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#ffffff",
                  fontSize: "14px"
                }}>
                  ✓
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        }}>
          <button
            onClick={onClose}
            style={{
              background: "rgba(255, 255, 255, 0.1)",
              border: "1px solid rgba(255, 255, 255, 0.2)",
              borderRadius: "8px",
              padding: "12px 24px",
              color: "#ffffff",
              fontSize: "14px",
              fontWeight: "500",
              cursor: "pointer",
              transition: "all 0.2s ease"
            }}
          >
            Cancel
          </button>
          
          <button
            onClick={() => selectedScenario && onSelectScenario(selectedScenario)}
            disabled={!selectedScenario}
            style={{
              background: selectedScenario 
                ? "linear-gradient(135deg, #10b981 0%, #059669 100%)"
                : "rgba(255, 255, 255, 0.1)",
              border: "none",
              borderRadius: "8px",
              padding: "12px 32px",
              color: "#ffffff",
              fontSize: "16px",
              fontWeight: "600",
              cursor: selectedScenario ? "pointer" : "not-allowed",
              opacity: selectedScenario ? 1 : 0.5,
              transition: "all 0.2s ease"
            }}
          >
            Start Demo →
          </button>
        </div>
      </div>
    </div>
  );
}

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import RoleSelection from "../components/RoleSelection";
import { type UserRole } from "../services/roleService";

export default function OnboardingWelcome() {
  const navigate = useNavigate();
  const [isAnimating, setIsAnimating] = useState(false);
  const [showRoleSelection, setShowRoleSelection] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleGetStarted = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setShowRoleSelection(true);
      setIsAnimating(false);
    }, 500);
  };

  const handleRoleSelect = async (role: UserRole) => {
    setLoading(true);
    // In a real app, you would save the role to Supabase here
    // For now, we'll just navigate to the appropriate dashboard
    setTimeout(() => {
      switch (role) {
        case 'Founder':
          navigate('/onboarding/step1');
          break;
        case 'Mentor':
          navigate('/mentor-dashboard');
          break;
        case 'Investor':
          navigate('/investor-dashboard');
          break;
        default:
          navigate('/onboarding/step1');
      }
    }, 1000);
  };

  const features = [
    {
      icon: "🤝",
      title: "Find Your Co-founder",
      description: "Connect with like-minded entrepreneurs building the next big thing"
    },
    {
      icon: "💰",
      title: "Meet Investors",
      description: "Get discovered by VCs and angels looking for promising startups"
    },
    {
      icon: "🎓",
      title: "Get Mentored",
      description: "Learn from successful entrepreneurs who've been there, done that"
    },
    {
      icon: "🚀",
      title: "Scale Your Network",
      description: "Build meaningful connections in India's startup ecosystem"
    }
  ];

  const stats = [
    { number: "10,000+", label: "Active Founders" },
    { number: "500+", label: "Investors" },
    { number: "1,000+", label: "Successful Matches" },
    { number: "50+", label: "Cities" }
  ];

  if (showRoleSelection) {
    return (
      <div style={{ 
        minHeight: "100vh", 
        background: "linear-gradient(135deg, #000 0%, #1a1a1a 100%)",
        color: "#fff",
        position: "relative",
        overflow: "hidden"
      }}>
        <RoleSelection onRoleSelect={handleRoleSelect} loading={loading} />
      </div>
    );
  }

  return (
    <div style={{ 
      minHeight: "100vh", 
      background: "linear-gradient(135deg, #000 0%, #1a1a1a 100%)",
      color: "#fff",
      position: "relative",
      overflow: "hidden"
    }}>
      {/* Background Pattern */}
      <div style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: `
          radial-gradient(circle at 20% 80%, rgba(16, 185, 129, 0.1) 0%, transparent 50%),
          radial-gradient(circle at 80% 20%, rgba(139, 92, 246, 0.1) 0%, transparent 50%),
          radial-gradient(circle at 40% 40%, rgba(245, 158, 11, 0.05) 0%, transparent 50%)
        `,
        zIndex: 0
      }}></div>

      <div style={{ position: "relative", zIndex: 1 }}>
        {/* Header */}
        <div style={{
          padding: "24px",
          textAlign: "center",
          borderBottom: "1px solid rgba(255, 255, 255, 0.1)"
        }}>
          <div style={{
            fontSize: "48px",
            marginBottom: "16px",
            animation: "float 3s ease-in-out infinite"
          }}>
            🚀
          </div>
          <h1 style={{
            fontSize: "32px",
            fontWeight: "700",
            margin: "0 0 8px",
            background: "linear-gradient(135deg, #10b981 0%, #8b5cf6 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent"
          }}>
            Welcome to Circle x
          </h1>
          <p style={{
            fontSize: "18px",
            color: "rgba(255, 255, 255, 0.7)",
            margin: "0 0 24px",
            lineHeight: "1.5"
          }}>
            India's exclusive networking platform for ambitious founders
          </p>
          
          {/* Stats */}
          <div style={{
            display: "flex",
            justifyContent: "center",
            gap: "32px",
            flexWrap: "wrap",
            marginBottom: "32px"
          }}>
            {stats.map((stat, index) => (
              <div key={index} style={{
                textAlign: "center"
              }}>
                <div style={{
                  fontSize: "24px",
                  fontWeight: "700",
                  color: "#10b981",
                  marginBottom: "4px"
                }}>
                  {stat.number}
                </div>
                <div style={{
                  fontSize: "12px",
                  color: "rgba(255, 255, 255, 0.6)"
                }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Features */}
        <div style={{
          padding: "32px 24px"
        }}>
          <h2 style={{
            fontSize: "24px",
            fontWeight: "600",
            textAlign: "center",
            margin: "0 0 32px",
            color: "#ffffff"
          }}>
            What makes Circle x special?
          </h2>
          
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "24px",
            marginBottom: "40px"
          }}>
            {features.map((feature, index) => (
              <div
                key={index}
                style={{
                  background: "rgba(255, 255, 255, 0.05)",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  borderRadius: "16px",
                  padding: "24px",
                  textAlign: "center",
                  transition: "all 0.3s ease",
                  backdropFilter: "blur(10px)"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(255, 255, 255, 0.08)";
                  e.currentTarget.style.transform = "translateY(-4px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(255, 255, 255, 0.05)";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                <div style={{
                  fontSize: "32px",
                  marginBottom: "16px"
                }}>
                  {feature.icon}
                </div>
                <h3 style={{
                  fontSize: "18px",
                  fontWeight: "600",
                  margin: "0 0 8px",
                  color: "#ffffff"
                }}>
                  {feature.title}
                </h3>
                <p style={{
                  fontSize: "14px",
                  color: "rgba(255, 255, 255, 0.7)",
                  lineHeight: "1.5",
                  margin: 0
                }}>
                  {feature.description}
                </p>
              </div>
            ))}
          </div>

          {/* Indian Context */}
          <div style={{
            background: "rgba(16, 185, 129, 0.1)",
            border: "1px solid rgba(16, 185, 129, 0.2)",
            borderRadius: "16px",
            padding: "24px",
            textAlign: "center",
            marginBottom: "32px"
          }}>
            <div style={{
              fontSize: "24px",
              marginBottom: "12px"
            }}>
              🇮🇳
            </div>
            <h3 style={{
              fontSize: "20px",
              fontWeight: "600",
              margin: "0 0 8px",
              color: "#10b981"
            }}>
              Built for Indian Entrepreneurs
            </h3>
            <p style={{
              fontSize: "14px",
              color: "rgba(255, 255, 255, 0.8)",
              lineHeight: "1.5",
              margin: 0
            }}>
              From UPI integration to tier-2 city challenges, we understand the unique needs of Indian startups. 
              Connect with founders who speak your language and understand your market.
            </p>
          </div>

          {/* CTA */}
          <div style={{
            textAlign: "center"
          }}>
            <button
              onClick={handleGetStarted}
              disabled={isAnimating}
              style={{
                background: isAnimating 
                  ? "rgba(16, 185, 129, 0.5)"
                  : "linear-gradient(135deg, #10b981 0%, #059669 100%)",
                border: "none",
                borderRadius: "12px",
                padding: "16px 48px",
                color: "#ffffff",
                fontSize: "18px",
                fontWeight: "600",
                cursor: isAnimating ? "not-allowed" : "pointer",
                transition: "all 0.3s ease",
                transform: isAnimating ? "scale(0.95)" : "scale(1)",
                boxShadow: "0 8px 32px rgba(16, 185, 129, 0.3)"
              }}
            >
              {isAnimating ? "Getting Started..." : "Get Started →"}
            </button>
            
            <p style={{
              fontSize: "12px",
              color: "rgba(255, 255, 255, 0.5)",
              margin: "16px 0 0",
              lineHeight: "1.4"
            }}>
              Join 10,000+ founders already building the future of India
            </p>
          </div>
        </div>
      </div>

      {/* Add CSS animations */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
      `}</style>
    </div>
  );
}

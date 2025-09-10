import { useState } from "react";
import { type UserRole } from "../services/roleService";

interface RoleSelectionProps {
  onRoleSelect: (role: UserRole) => void;
  loading?: boolean;
}

export default function RoleSelection({ onRoleSelect, loading = false }: RoleSelectionProps) {
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);

  const roles = [
    {
      id: 'Founder' as UserRole,
      title: 'Founder',
      description: 'Building a startup and looking for co-founders, mentors, and investors',
      icon: '🚀',
      features: ['Find co-founders', 'Connect with mentors', 'Pitch to investors', 'Network with peers']
    },
    {
      id: 'Mentor' as UserRole,
      title: 'Mentor',
      description: 'Experienced entrepreneur ready to guide the next generation',
      icon: '🎓',
      features: ['Guide founders', 'Share expertise', 'Build your legacy', 'Expand network']
    },
    {
      id: 'Investor' as UserRole,
      title: 'Investor',
      description: 'Looking to invest in promising startups and founders',
      icon: '💰',
      features: ['Discover startups', 'Review pitches', 'Make investments', 'Track portfolio']
    }
  ];

  const handleContinue = () => {
    if (selectedRole) {
      onRoleSelect(selectedRole);
    }
  };

  return (
    <div style={{
      maxWidth: "800px",
      margin: "0 auto",
      padding: "40px 24px"
    }}>
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: "48px" }}>
        <h1 style={{
          fontSize: "32px",
          fontWeight: "600",
          margin: "0 0 16px",
          color: "#fff",
          letterSpacing: "-0.02em"
        }}>
          Choose Your Role
        </h1>
        <p style={{
          fontSize: "18px",
          color: "rgba(255,255,255,0.7)",
          margin: 0,
          lineHeight: "1.5"
        }}>
          Select how you'd like to use Circle x to help us personalize your experience
        </p>
      </div>

      {/* Role Cards */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
        gap: "24px",
        marginBottom: "48px"
      }}>
        {roles.map((role) => (
          <div
            key={role.id}
            onClick={() => setSelectedRole(role.id)}
            style={{
              background: selectedRole === role.id 
                ? "rgba(255, 255, 255, 0.05)" 
                : "rgba(255, 255, 255, 0.02)",
              border: selectedRole === role.id 
                ? "2px solid #00ff88" 
                : "1px solid rgba(255, 255, 255, 0.08)",
              borderRadius: "16px",
              padding: "32px",
              cursor: "pointer",
              transition: "all 0.3s ease",
              backdropFilter: "blur(20px)",
              position: "relative"
            }}
          >
            {/* Selection Indicator */}
            {selectedRole === role.id && (
              <div style={{
                position: "absolute",
                top: "16px",
                right: "16px",
                width: "24px",
                height: "24px",
                borderRadius: "50%",
                background: "#00ff88",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "12px",
                color: "#000",
                fontWeight: "600"
              }}>
                ✓
              </div>
            )}

            {/* Icon */}
            <div style={{
              fontSize: "48px",
              marginBottom: "20px",
              textAlign: "center"
            }}>
              {role.icon}
            </div>

            {/* Title */}
            <h3 style={{
              fontSize: "24px",
              fontWeight: "600",
              margin: "0 0 12px",
              color: "#fff",
              textAlign: "center"
            }}>
              {role.title}
            </h3>

            {/* Description */}
            <p style={{
              fontSize: "16px",
              color: "rgba(255,255,255,0.7)",
              margin: "0 0 24px",
              textAlign: "center",
              lineHeight: "1.5"
            }}>
              {role.description}
            </p>

            {/* Features */}
            <div>
              <h4 style={{
                fontSize: "14px",
                fontWeight: "600",
                color: "rgba(255,255,255,0.8)",
                margin: "0 0 12px",
                textTransform: "uppercase",
                letterSpacing: "0.5px"
              }}>
                What you can do:
              </h4>
              <ul style={{
                listStyle: "none",
                padding: 0,
                margin: 0
              }}>
                {role.features.map((feature, index) => (
                  <li
                    key={index}
                    style={{
                      fontSize: "14px",
                      color: "rgba(255,255,255,0.6)",
                      margin: "0 0 8px",
                      display: "flex",
                      alignItems: "center",
                      gap: "8px"
                    }}
                  >
                    <span style={{ color: "#00ff88" }}>•</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      {/* Continue Button */}
      <div style={{ textAlign: "center" }}>
        <button
          onClick={handleContinue}
          disabled={!selectedRole || loading}
          style={{
            background: selectedRole && !loading
              ? "linear-gradient(135deg, #00ff88 0%, #00cc6a 100%)"
              : "rgba(255, 255, 255, 0.1)",
            border: "none",
            borderRadius: "12px",
            padding: "16px 48px",
            color: selectedRole && !loading ? "#000" : "rgba(255,255,255,0.5)",
            fontSize: "16px",
            fontWeight: "600",
            cursor: selectedRole && !loading ? "pointer" : "not-allowed",
            transition: "all 0.3s ease",
            minWidth: "200px"
          }}
        >
          {loading ? "Setting up..." : "Continue"}
        </button>
        
        {!selectedRole && (
          <p style={{
            fontSize: "14px",
            color: "rgba(255,255,255,0.5)",
            margin: "16px 0 0"
          }}>
            Please select a role to continue
          </p>
        )}
      </div>
    </div>
  );
}

import { useState } from "react";
import Layout from "../components/Layout";

interface VerificationStep {
  id: number;
  title: string;
  description: string;
  status: "pending" | "in-progress" | "completed" | "failed";
  icon: string;
}

export default function Verification() {
  const [currentStep, setCurrentStep] = useState(0);
  const [verificationSteps, setVerificationSteps] = useState<VerificationStep[]>([
    {
      id: 1,
      title: "Email Verification",
      description: "Verify your email address to secure your account",
      status: "completed",
      icon: "📧"
    },
    {
      id: 2,
      title: "Phone Number",
      description: "Add and verify your phone number for two-factor authentication",
      status: "completed",
      icon: "📱"
    },
    {
      id: 3,
      title: "LinkedIn Profile",
      description: "Connect your LinkedIn profile to verify your professional background",
      status: "in-progress",
      icon: "💼"
    },
    {
      id: 4,
      title: "Company Verification",
      description: "Verify your company or startup details",
      status: "pending",
      icon: "🏢"
    },
    {
      id: 5,
      title: "Identity Document",
      description: "Upload a government-issued ID for identity verification",
      status: "pending",
      icon: "🆔"
    },
    {
      id: 6,
      title: "Video Verification",
      description: "Complete a quick video call to verify your identity",
      status: "pending",
      icon: "📹"
    }
  ]);

  const [linkedinUrl, setLinkedinUrl] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [companyWebsite, setCompanyWebsite] = useState("");
  const [companyDescription, setCompanyDescription] = useState("");

  const handleLinkedInConnect = () => {
    // Simulate LinkedIn connection
    setVerificationSteps(prev => 
      prev.map(step => 
        step.id === 3 ? { ...step, status: "completed" as const } : step
      )
    );
    setCurrentStep(3);
  };

  const handleCompanySubmit = () => {
    if (companyName && companyWebsite && companyDescription) {
      setVerificationSteps(prev => 
        prev.map(step => 
          step.id === 4 ? { ...step, status: "completed" as const } : step
        )
      );
      setCurrentStep(4);
    }
  };

  const handleDocumentUpload = () => {
    // Simulate document upload
    setVerificationSteps(prev => 
      prev.map(step => 
        step.id === 5 ? { ...step, status: "completed" as const } : step
      )
    );
    setCurrentStep(5);
  };

  const handleVideoVerification = () => {
    // Simulate video verification
    setVerificationSteps(prev => 
      prev.map(step => 
        step.id === 6 ? { ...step, status: "completed" as const } : step
      )
    );
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "#10b981";
      case "in-progress": return "#eab308";
      case "failed": return "#ef4444";
      default: return "#6b7280";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed": return "✅";
      case "in-progress": return "⏳";
      case "failed": return "❌";
      default: return "⭕";
    }
  };

  const completedSteps = verificationSteps.filter(step => step.status === "completed").length;
  const totalSteps = verificationSteps.length;
  const progressPercentage = (completedSteps / totalSteps) * 100;

  return (
    <Layout>
      <div style={{ color: "#fff", maxWidth: "800px" }}>
        {/* Header */}
        <div style={{ marginBottom: "32px" }}>
          <h1 style={{ fontSize: "32px", fontWeight: "bold", margin: "0 0 8px" }}>
            Founder Verification
          </h1>
          <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "16px", margin: 0 }}>
            Complete your verification to build trust and unlock premium features
          </p>
        </div>

        {/* Progress Bar */}
        <div style={{
          background: "rgba(255,255,255,0.05)",
          border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: "16px",
          padding: "24px",
          marginBottom: "32px"
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
            <h3 style={{ fontSize: "18px", fontWeight: "600", margin: 0, color: "#fff" }}>
              Verification Progress
            </h3>
            <span style={{ fontSize: "14px", color: "rgba(255,255,255,0.6)" }}>
              {completedSteps}/{totalSteps} completed
            </span>
          </div>
          <div style={{
            background: "rgba(255,255,255,0.1)",
            borderRadius: "8px",
            height: "8px",
            overflow: "hidden"
          }}>
            <div
              style={{
                background: "linear-gradient(90deg, #10b981 0%, #34d399 100%)",
                height: "100%",
                width: `${progressPercentage}%`,
                transition: "width 0.3s ease"
              }}
            />
          </div>
          <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.6)", margin: "12px 0 0" }}>
            {progressPercentage === 100 
              ? "🎉 Congratulations! You're fully verified!" 
              : `${Math.round(progressPercentage)}% complete - Keep going!`
            }
          </p>
        </div>

        {/* Verification Steps */}
        <div style={{ marginBottom: "32px" }}>
          <h3 style={{ fontSize: "20px", fontWeight: "600", margin: "0 0 20px", color: "#fff" }}>
            Verification Steps
          </h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {verificationSteps.map((step) => (
              <div
                key={step.id}
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "12px",
                  padding: "20px",
                  display: "flex",
                  alignItems: "center",
                  gap: "16px"
                }}
              >
                <div style={{ fontSize: "24px" }}>{step.icon}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
                    <h4 style={{ fontSize: "16px", fontWeight: "600", margin: 0, color: "#fff" }}>
                      {step.title}
                    </h4>
                    <span style={{ fontSize: "16px" }}>
                      {getStatusIcon(step.status)}
                    </span>
                  </div>
                  <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "14px", margin: 0 }}>
                    {step.description}
                  </p>
                </div>
                <div
                  style={{
                    background: getStatusColor(step.status),
                    color: "#fff",
                    borderRadius: "8px",
                    padding: "6px 12px",
                    fontSize: "12px",
                    fontWeight: "500",
                    textTransform: "capitalize"
                  }}
                >
                  {step.status.replace("-", " ")}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Current Step Form */}
        {currentStep === 2 && (
          <div style={{
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: "16px",
            padding: "24px",
            marginBottom: "32px"
          }}>
            <h3 style={{ fontSize: "18px", fontWeight: "600", margin: "0 0 16px", color: "#fff" }}>
              Connect LinkedIn Profile
            </h3>
            <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "14px", margin: "0 0 20px" }}>
              Link your LinkedIn profile to verify your professional background and build trust with other founders.
            </p>
            <div style={{ marginBottom: "16px" }}>
              <label style={{ fontSize: "14px", fontWeight: "500", color: "#fff", marginBottom: "8px", display: "block" }}>
                LinkedIn Profile URL
              </label>
              <input
                type="url"
                placeholder="https://linkedin.com/in/yourprofile"
                value={linkedinUrl}
                onChange={(e) => setLinkedinUrl(e.target.value)}
                style={{
                  width: "100%",
                  background: "rgba(255,255,255,0.1)",
                  border: "1px solid rgba(255,255,255,0.2)",
                  borderRadius: "8px",
                  padding: "12px",
                  color: "#fff",
                  fontSize: "14px",
                  outline: "none"
                }}
              />
            </div>
            <button
              onClick={handleLinkedInConnect}
              disabled={!linkedinUrl.trim()}
              style={{
                background: linkedinUrl.trim() ? "#0077b5" : "rgba(255,255,255,0.1)",
                border: "none",
                borderRadius: "8px",
                padding: "12px 24px",
                color: "#fff",
                fontSize: "14px",
                fontWeight: "600",
                cursor: linkedinUrl.trim() ? "pointer" : "not-allowed"
              }}
            >
              Connect LinkedIn
            </button>
          </div>
        )}

        {currentStep === 3 && (
          <div style={{
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: "16px",
            padding: "24px",
            marginBottom: "32px"
          }}>
            <h3 style={{ fontSize: "18px", fontWeight: "600", margin: "0 0 16px", color: "#fff" }}>
              Company Information
            </h3>
            <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "14px", margin: "0 0 20px" }}>
              Tell us about your company or startup to help other founders understand your background.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div>
                <label style={{ fontSize: "14px", fontWeight: "500", color: "#fff", marginBottom: "8px", display: "block" }}>
                  Company Name
                </label>
                <input
                  type="text"
                  placeholder="Your Company Name"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  style={{
                    width: "100%",
                    background: "rgba(255,255,255,0.1)",
                    border: "1px solid rgba(255,255,255,0.2)",
                    borderRadius: "8px",
                    padding: "12px",
                    color: "#fff",
                    fontSize: "14px",
                    outline: "none"
                  }}
                />
              </div>
              <div>
                <label style={{ fontSize: "14px", fontWeight: "500", color: "#fff", marginBottom: "8px", display: "block" }}>
                  Company Website
                </label>
                <input
                  type="url"
                  placeholder="https://yourcompany.com"
                  value={companyWebsite}
                  onChange={(e) => setCompanyWebsite(e.target.value)}
                  style={{
                    width: "100%",
                    background: "rgba(255,255,255,0.1)",
                    border: "1px solid rgba(255,255,255,0.2)",
                    borderRadius: "8px",
                    padding: "12px",
                    color: "#fff",
                    fontSize: "14px",
                    outline: "none"
                  }}
                />
              </div>
              <div>
                <label style={{ fontSize: "14px", fontWeight: "500", color: "#fff", marginBottom: "8px", display: "block" }}>
                  Company Description
                </label>
                <textarea
                  placeholder="Brief description of your company and what you do..."
                  value={companyDescription}
                  onChange={(e) => setCompanyDescription(e.target.value)}
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
              </div>
              <button
                onClick={handleCompanySubmit}
                disabled={!companyName.trim() || !companyWebsite.trim() || !companyDescription.trim()}
                style={{
                  background: (companyName.trim() && companyWebsite.trim() && companyDescription.trim()) ? "#10b981" : "rgba(255,255,255,0.1)",
                  border: "none",
                  borderRadius: "8px",
                  padding: "12px 24px",
                  color: "#fff",
                  fontSize: "14px",
                  fontWeight: "600",
                  cursor: (companyName.trim() && companyWebsite.trim() && companyDescription.trim()) ? "pointer" : "not-allowed"
                }}
              >
                Submit Company Info
              </button>
            </div>
          </div>
        )}

        {currentStep === 4 && (
          <div style={{
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: "16px",
            padding: "24px",
            marginBottom: "32px"
          }}>
            <h3 style={{ fontSize: "18px", fontWeight: "600", margin: "0 0 16px", color: "#fff" }}>
              Identity Document Upload
            </h3>
            <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "14px", margin: "0 0 20px" }}>
              Upload a clear photo of your government-issued ID (driver's license, passport, etc.) for identity verification.
            </p>
            <div style={{
              border: "2px dashed rgba(255,255,255,0.3)",
              borderRadius: "12px",
              padding: "40px",
              textAlign: "center",
              marginBottom: "20px"
            }}>
              <div style={{ fontSize: "48px", marginBottom: "16px" }}>📄</div>
              <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "14px", margin: "0 0 12px" }}>
                Drag and drop your ID document here, or click to browse
              </p>
              <button
                onClick={handleDocumentUpload}
                style={{
                  background: "#10b981",
                  border: "none",
                  borderRadius: "8px",
                  padding: "8px 16px",
                  color: "#fff",
                  fontSize: "14px",
                  fontWeight: "600",
                  cursor: "pointer"
                }}
              >
                Choose File
              </button>
            </div>
          </div>
        )}

        {currentStep === 5 && (
          <div style={{
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: "16px",
            padding: "24px",
            marginBottom: "32px"
          }}>
            <h3 style={{ fontSize: "18px", fontWeight: "600", margin: "0 0 16px", color: "#fff" }}>
              Video Verification
            </h3>
            <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "14px", margin: "0 0 20px" }}>
              Complete a quick 2-minute video call with our verification team to confirm your identity.
            </p>
            <div style={{
              background: "rgba(16, 185, 129, 0.1)",
              border: "1px solid rgba(16, 185, 129, 0.3)",
              borderRadius: "12px",
              padding: "20px",
              marginBottom: "20px"
            }}>
              <h4 style={{ fontSize: "16px", fontWeight: "600", margin: "0 0 12px", color: "#fff" }}>
                What to expect:
              </h4>
              <ul style={{ color: "rgba(255,255,255,0.8)", fontSize: "14px", margin: 0, paddingLeft: "20px" }}>
                <li>Show your ID document to the camera</li>
                <li>Answer a few questions about your startup</li>
                <li>Confirm your contact information</li>
                <li>Process takes 2-3 minutes</li>
              </ul>
            </div>
            <button
              onClick={handleVideoVerification}
              style={{
                background: "#10b981",
                border: "none",
                borderRadius: "8px",
                padding: "12px 24px",
                color: "#fff",
                fontSize: "14px",
                fontWeight: "600",
                cursor: "pointer"
              }}
            >
              Schedule Video Call
            </button>
          </div>
        )}

        {/* Benefits */}
        <div style={{
          background: "rgba(255,255,255,0.05)",
          border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: "16px",
          padding: "24px"
        }}>
          <h3 style={{ fontSize: "18px", fontWeight: "600", margin: "0 0 16px", color: "#fff" }}>
            Benefits of Verification
          </h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "16px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <span style={{ fontSize: "20px" }}>🛡️</span>
              <div>
                <div style={{ fontSize: "14px", fontWeight: "500", color: "#fff" }}>Trust Badge</div>
                <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.6)" }}>Build credibility</div>
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <span style={{ fontSize: "20px" }}>⭐</span>
              <div>
                <div style={{ fontSize: "14px", fontWeight: "500", color: "#fff" }}>Priority Matching</div>
                <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.6)" }}>Better connections</div>
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <span style={{ fontSize: "20px" }}>🚀</span>
              <div>
                <div style={{ fontSize: "14px", fontWeight: "500", color: "#fff" }}>Premium Features</div>
                <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.6)" }}>Unlock all tools</div>
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <span style={{ fontSize: "20px" }}>💼</span>
              <div>
                <div style={{ fontSize: "14px", fontWeight: "500", color: "#fff" }}>Investor Access</div>
                <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.6)" }}>Connect with VCs</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

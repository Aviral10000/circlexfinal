import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabase";

export default function OnboardingStep4() {
  const navigate = useNavigate();
  const [selectedPlan, setSelectedPlan] = useState<'core' | 'pro' | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Load previous step data
    const step3Data = sessionStorage.getItem('onboarding_step3');
    if (!step3Data) {
      navigate('/onboarding/step1');
    }
  }, [navigate]);

  const handleBack = () => {
    navigate('/onboarding/step3');
  };

  const handleSubmit = async () => {
    if (!selectedPlan) return;

    setSubmitting(true);
    setMessage("");

    // Analytics logging
    console.log("Circle X Application Submitted:", {
      plan: selectedPlan,
      timestamp: new Date().toISOString()
    });

    try {
      // Get all form data from sessionStorage
      const step1Data = JSON.parse(sessionStorage.getItem('onboarding_step1') || '{}');
      const step2Data = JSON.parse(sessionStorage.getItem('onboarding_step2') || '{}');
      const step3Data = JSON.parse(sessionStorage.getItem('onboarding_step3') || '{}');

      const payload = {
        first_name: step1Data.firstName || null,
        last_name: step1Data.lastName || null,
        email: step1Data.email || null,
        profile_url: step1Data.linkedinUrl || null,
        company: step2Data.company || null,
        role: step2Data.role || null,
        industry: step2Data.industry || null,
        bio: step2Data.bio || null,
        interests: step3Data.interests || [],
        goals: step3Data.goals || [],
        status: "pending",
      };

      const { error } = await supabase
        .from("profiles")
        .upsert(payload, { onConflict: "email" });

      if (error) {
        console.error("Supabase error:", error);
        setMessage("❌ " + error.message);
      } else {
        console.log("Application submitted successfully");
        setMessage("✅ Application submitted!");
        
        // Clear session storage
        sessionStorage.removeItem('onboarding_step1');
        sessionStorage.removeItem('onboarding_step2');
        sessionStorage.removeItem('onboarding_step3');
        
        // Navigate to success page after a short delay
        setTimeout(() => {
          navigate("/success");
        }, 1500);
      }
    } catch (err: any) {
      console.error("Application error:", err);
      setMessage("🔥 " + err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: "#000", color: "#fff" }}>
      {/* Progress Bar */}
      <div style={{ padding: "20px 24px", borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
          <span style={{ fontSize: "14px", color: "rgba(255,255,255,0.7)" }}>Step 4 of 4</span>
          <span style={{ fontSize: "14px", color: "rgba(255,255,255,0.7)" }}>100%</span>
        </div>
        <div style={{ 
          width: "100%", 
          height: "4px", 
          background: "rgba(255,255,255,0.1)", 
          borderRadius: "2px",
          overflow: "hidden"
        }}>
          <div style={{ 
            width: "100%", 
            height: "100%", 
            background: "#fff", 
            borderRadius: "2px",
            transition: "width 0.3s ease"
          }} />
        </div>
      </div>

      {/* Nav */}
      <nav className="nav">
        <div className="brand">
          <div className="brand-dot" />
          <span className="brand-name">Circle X</span>
        </div>
      </nav>

      <section className="section">
        <div className="container" style={{ maxWidth: 800 }}>
          <div style={{ textAlign: "center", marginBottom: "48px" }}>
            <h2 style={{ 
              fontSize: "32px", 
              fontWeight: 300, 
              margin: "0 0 8px", 
              letterSpacing: "-0.01em"
            }}>
              Membership
            </h2>
          </div>

          <div className="grid" style={{ gridTemplateColumns: "1fr 1fr", gap: "24px", maxWidth: "600px", margin: "0 auto" }}>
            {/* Core Plan */}
            <div 
              className={`card ${selectedPlan === 'core' ? 'selected' : ''}`}
              style={{ 
                cursor: "pointer",
                border: selectedPlan === 'core' ? "2px solid #fff" : "1px solid rgba(255,255,255,0.08)",
                background: selectedPlan === 'core' ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.04)"
              }}
              onClick={() => setSelectedPlan('core')}
            >
              <h3 style={{ fontSize: "24px", fontWeight: 300, margin: "0 0 16px", textAlign: "center" }}>
                Core
              </h3>
              <div style={{ textAlign: "center", marginBottom: "24px" }}>
                <span style={{ fontSize: "36px", fontWeight: 600 }}>₹999</span>
                <span style={{ fontSize: "16px", color: "rgba(255,255,255,0.7)", marginLeft: "8px" }}>/month</span>
              </div>
              <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                <li style={{ marginBottom: "12px", display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ color: "#fff" }}>•</span>
                  <span>Curated daily matches</span>
                </li>
                <li style={{ marginBottom: "12px", display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ color: "#fff" }}>•</span>
                  <span>Weekly collaboration posts</span>
                </li>
                <li style={{ marginBottom: "12px", display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ color: "#fff" }}>•</span>
                  <span>Smart introductions</span>
                </li>
                <li style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ color: "#fff" }}>•</span>
                  <span>Verified network access</span>
                </li>
              </ul>
            </div>

            {/* Pro Plan */}
            <div 
              className={`card ${selectedPlan === 'pro' ? 'selected' : ''}`}
              style={{ 
                cursor: "pointer",
                border: selectedPlan === 'pro' ? "2px solid #fff" : "1px solid rgba(255,255,255,0.08)",
                background: selectedPlan === 'pro' ? "rgba(255,255,255,0.15)" : "rgba(255,255,255,0.08)",
                position: "relative"
              }}
              onClick={() => setSelectedPlan('pro')}
            >
              <div style={{
                position: "absolute",
                top: "-8px",
                left: "50%",
                transform: "translateX(-50%)",
                background: "#000",
                color: "#fff",
                padding: "4px 12px",
                borderRadius: "12px",
                fontSize: "12px",
                fontWeight: 500,
                border: "1px solid rgba(255,255,255,0.2)"
              }}>
                Elite
              </div>
              <h3 style={{ fontSize: "24px", fontWeight: 300, margin: "16px 0 16px", textAlign: "center", color: "#000" }}>
                Pro
              </h3>
              <div style={{ textAlign: "center", marginBottom: "24px" }}>
                <span style={{ fontSize: "36px", fontWeight: 600, color: "#000" }}>₹2,999</span>
                <span style={{ fontSize: "16px", color: "rgba(0,0,0,0.7)", marginLeft: "8px" }}>/month</span>
              </div>
              <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                <li style={{ marginBottom: "12px", display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ color: "#000" }}>•</span>
                  <span style={{ color: "#000" }}>Unlimited connections</span>
                </li>
                <li style={{ marginBottom: "12px", display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ color: "#000" }}>•</span>
                  <span style={{ color: "#000" }}>Priority matching</span>
                </li>
                <li style={{ marginBottom: "12px", display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ color: "#000" }}>•</span>
                  <span style={{ color: "#000" }}>Profile amplification</span>
                </li>
                <li style={{ marginBottom: "12px", display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ color: "#000" }}>•</span>
                  <span style={{ color: "#000" }}>Advanced analytics</span>
                </li>
                <li style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ color: "#000" }}>•</span>
                  <span style={{ color: "#000" }}>Exclusive events</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-8" />

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <button
              className="btn btn-outline"
              onClick={handleBack}
              style={{ display: "flex", alignItems: "center", gap: "8px" }}
            >
              ← Back
            </button>
            <button
              className="btn btn-primary"
              onClick={handleSubmit}
              disabled={!selectedPlan || submitting}
              style={{ display: "flex", alignItems: "center", gap: "8px" }}
            >
              {submitting ? "Submitting..." : "Complete Application"}
            </button>
          </div>

          {message && (
            <p className="center mt-8" style={{ color: message.startsWith("✅") ? "#a7f3d0" : "#fca5a5" }}>
              {message}
            </p>
          )}
        </div>
      </section>

      <footer className="footer">© {new Date().getFullYear()} Circle X — All rights reserved.</footer>
    </div>
  );
}

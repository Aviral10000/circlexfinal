import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const industries = [
  "AI/ML", "Fintech", "Healthcare", "E-commerce", "SaaS", "Blockchain",
  "EdTech", "CleanTech", "Gaming", "Social Media", "IoT", "Cybersecurity"
];

export default function OnboardingStep2() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    company: "",
    role: "",
    industry: "",
    bio: "",
  });

  useEffect(() => {
    // Load previous step data
    const step1Data = sessionStorage.getItem('onboarding_step1');
    if (!step1Data) {
      navigate('/onboarding/step1');
    }
  }, [navigate]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleBack = () => {
    navigate('/onboarding/step1');
  };

  const handleNext = () => {
    // Store in sessionStorage
    sessionStorage.setItem('onboarding_step2', JSON.stringify(formData));
    navigate('/onboarding/step3');
  };

  const isFormValid = formData.company && formData.role && formData.industry;

  return (
    <div style={{ minHeight: "100vh", background: "#000", color: "#fff" }}>
      {/* Progress Bar */}
      <div style={{ padding: "20px 24px", borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
          <span style={{ fontSize: "14px", color: "rgba(255,255,255,0.7)" }}>Step 2 of 4</span>
          <span style={{ fontSize: "14px", color: "rgba(255,255,255,0.7)" }}>50%</span>
        </div>
        <div style={{ 
          width: "100%", 
          height: "4px", 
          background: "rgba(255,255,255,0.1)", 
          borderRadius: "2px",
          overflow: "hidden"
        }}>
          <div style={{ 
            width: "50%", 
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
        <div className="container" style={{ maxWidth: 760 }}>
          <div className="card">
            <h2 className="step-title">Your Venture</h2>
            <p className="step-sub">Tell us about your company and role</p>

            <input
              className="input"
              name="company"
              placeholder="Company Name"
              value={formData.company}
              onChange={onChange}
            />

            <div className="mt-8" />

            <input
              className="input"
              name="role"
              placeholder="Your Role (e.g., CEO, CTO, Founder)"
              value={formData.role}
              onChange={onChange}
            />

            <div className="mt-8" />

            <div>
              <div style={{ color: "rgba(255,255,255,0.7)", fontSize: 13, marginBottom: 8 }}>
                Industry
              </div>
              <div className="grid" style={{ gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
                {industries.map((ind) => (
                  <button
                    key={ind}
                    type="button"
                    onClick={() => setFormData({ ...formData, industry: ind })}
                    className={`choice ${formData.industry === ind ? "active" : ""}`}
                  >
                    {ind}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-8" />

            <textarea
              className="textarea"
              name="bio"
              placeholder="Brief bio about yourself and your company..."
              value={formData.bio}
              onChange={onChange}
            />

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
                onClick={handleNext}
                disabled={!isFormValid}
                style={{ display: "flex", alignItems: "center", gap: "8px" }}
              >
                Next →
              </button>
            </div>
          </div>
        </div>
      </section>

      <footer className="footer">© {new Date().getFullYear()} Circle X — All rights reserved.</footer>
    </div>
  );
}

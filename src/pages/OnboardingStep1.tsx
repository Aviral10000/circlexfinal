import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function OnboardingStep1() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    linkedinUrl: "",
  });

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNext = () => {
    // Store in sessionStorage for multi-step flow
    sessionStorage.setItem('onboarding_step1', JSON.stringify(formData));
    navigate('/onboarding/step2');
  };

  const isFormValid = formData.firstName && formData.lastName && formData.email;

  return (
    <div style={{ minHeight: "100vh", background: "#000", color: "#fff" }}>
      {/* Progress Bar */}
      <div style={{ padding: "20px 24px", borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
          <span style={{ fontSize: "14px", color: "rgba(255,255,255,0.7)" }}>Step 1 of 4</span>
          <span style={{ fontSize: "14px", color: "rgba(255,255,255,0.7)" }}>25%</span>
        </div>
        <div style={{ 
          width: "100%", 
          height: "4px", 
          background: "rgba(255,255,255,0.1)", 
          borderRadius: "2px",
          overflow: "hidden"
        }}>
          <div style={{ 
            width: "25%", 
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
        <div className="container" style={{ maxWidth: 600 }}>
          <div className="card">
            <h2 className="step-title">Welcome to Circle X</h2>
            <p className="step-sub">The exclusive network for ambitious founders. Let's build your profile.</p>

            <div className="grid" style={{ gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
              <input
                className="input"
                name="firstName"
                placeholder="First Name"
                value={formData.firstName}
                onChange={onChange}
              />
              <input
                className="input"
                name="lastName"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={onChange}
              />
            </div>

            <div className="mt-8" />

            <input
              className="input"
              name="email"
              placeholder="Email Address"
              type="email"
              value={formData.email}
              onChange={onChange}
            />

            <div className="mt-8" />

            <input
              className="input"
              name="linkedinUrl"
              placeholder="LinkedIn Profile URL"
              type="url"
              value={formData.linkedinUrl}
              onChange={onChange}
            />

            <div className="mt-8" />

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <button
                className="btn btn-outline"
                onClick={() => navigate('/')}
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

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabase";
const industries = [
  "AI/ML","Fintech","Healthcare","E-commerce","SaaS","Blockchain",
  "EdTech","CleanTech","Gaming","Social Media","IoT","Cybersecurity"
];

export default function Onboarding() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    company: "",
    role: "",
    industry: "",
    bio: "",
  });
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    setSubmitting(true);
    setMessage("");
    
    // Analytics logging
    console.log("Circle X Application Submitted:", {
      email: formData.email,
      company: formData.company,
      industry: formData.industry,
      timestamp: new Date().toISOString()
    });
    
    try {
      const payload = {
        first_name: formData.firstName || null,
        last_name: formData.lastName || null,
        email: formData.email || null,
        company: formData.company || null,
        role: formData.role || null,
        industry: formData.industry || null,
        bio: formData.bio || null,
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
      {/* Simple top nav */}
      <nav className="nav">
        <div className="brand">
          <div className="brand-dot" />
          <span className="brand-name">Circle X</span>
        </div>
      </nav>

      <section className="section">
        <div className="container" style={{ maxWidth: 760 }}>
          <div className="card">
            <h2 className="step-title">Join Circle X</h2>
            <p className="step-sub">Tell us a bit about you.</p>

            <div className="grid" style={{ gridTemplateColumns: "1fr 1fr" }}>
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
              name="company"
              placeholder="Company"
              value={formData.company}
              onChange={onChange}
            />

            <div className="mt-8" />

            <input
              className="input"
              name="role"
              placeholder="Role (e.g., CEO, CTO)"
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
              placeholder="Brief bio…"
              value={formData.bio}
              onChange={onChange}
            />

            <div className="mt-8" />

            <div style={{ display: "flex", justifyContent: "flex-end", gap: 12 }}>
              <button
                className="btn btn-primary"
                onClick={handleSubmit}
                disabled={
                  submitting ||
                  !formData.firstName ||
                  !formData.lastName ||
                  !formData.email ||
                  !formData.company ||
                  !formData.role ||
                  !formData.industry
                }
              >
                {submitting ? "Submitting..." : "Submit Application"}
              </button>
            </div>

            {message && (
              <p className="center mt-8" style={{ color: message.startsWith("✅") ? "#a7f3d0" : "#fca5a5" }}>
                {message}
              </p>
            )}
          </div>
        </div>
      </section>

      <footer className="footer">© {new Date().getFullYear()} Circle X — All rights reserved.</footer>
    </div>
  );
}

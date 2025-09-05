import { Link } from "react-router-dom";

export default function Index() {
  return (
    <div>
      {/* Header */}
      <nav style={{ 
        display: "flex", 
        justifyContent: "space-between", 
        alignItems: "center", 
        padding: "20px 24px",
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 10
      }}>
        <div style={{ 
          fontSize: "22px", 
          fontWeight: 300, 
          color: "#fff",
          letterSpacing: "0.04em"
        }}>
          Circle X
        </div>
        <div>
          <Link to="/onboarding/step1" className="btn btn-outline">I have an invite</Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="hero">
        <div className="container center">
          <div className="badge" style={{ marginBottom: "32px" }}>
            🔒 Invitation Only
          </div>
          
          <h1 style={{ 
            fontSize: "clamp(48px, 8vw, 96px)", 
            fontWeight: 300, 
            margin: "0 0 16px", 
            letterSpacing: "-0.02em"
          }}>
            Circle X
          </h1>
          
          <div style={{ 
            width: "60px", 
            height: "1px", 
            background: "#fff", 
            margin: "0 auto 24px" 
          }} />
          
          <h2 style={{ 
            fontSize: "clamp(20px, 4vw, 32px)", 
            fontWeight: 300, 
            margin: "0 0 24px",
            letterSpacing: "-0.01em"
          }}>
            India's most <span style={{ fontWeight: 500 }}>exclusive</span> founder network
          </h2>
          
          <p style={{ 
            color: "rgba(255,255,255,0.7)", 
            fontSize: "18px", 
            maxWidth: "600px", 
            margin: "0 auto 32px", 
            lineHeight: "1.6"
          }}>
            A private sanctuary for India's most ambitious builders. Where vision meets execution, and connections change everything.
          </p>
          
          <div style={{ maxWidth: "400px", margin: "0 auto" }}>
            <input 
              className="input"
              placeholder="Enter your email"
              style={{ marginBottom: "16px" }}
            />
            <Link to="/onboarding/step1" className="btn btn-primary" style={{ width: "100%" }}>
              Request Access
            </Link>
          </div>
        </div>
      </section>

      {/* Feature Highlights */}
      <section className="section">
        <div className="container pillars grid grid-3">
          <div className="item">
            <div className="feature-icon">👑</div>
            <h4>Curated</h4>
            <p>Hand-picked founders only</p>
          </div>
          <div className="item">
            <div className="feature-icon">💎</div>
            <h4>Private</h4>
            <p>Invitation-only access</p>
          </div>
          <div className="item">
            <div className="feature-icon">✨</div>
            <h4>Elite</h4>
            <p>India's top builders</p>
          </div>
        </div>
      </section>

      {/* The Problem */}
      <section className="section">
        <div className="container center">
          <h2 style={{ fontSize: "48px", fontWeight: 300, margin: "0 0 48px", letterSpacing: "-0.02em" }}>
            The Problem
          </h2>
        </div>
        <div className="container grid grid-3">
          <div className="card">
            <h4>LinkedIn is Noise</h4>
            <p>Endless spam, random connections, zero signal in the noise.</p>
          </div>
          <div className="card">
            <h4>Events are Outdated</h4>
            <p>Forced networking, small talk, business cards nobody reads.</p>
          </div>
          <div className="card">
            <h4>Quality is Rare</h4>
            <p>Finding serious builders in a sea of wannabe entrepreneurs.</p>
          </div>
        </div>
      </section>

      {/* The Solution */}
      <section className="section">
        <div className="container center">
          <h2 style={{ fontSize: "48px", fontWeight: 300, margin: "0 0 48px", letterSpacing: "-0.02em" }}>
            The Solution
          </h2>
        </div>
        <div className="container grid grid-3">
          <div className="solution-card">
            <div className="solution-icon">⚡</div>
            <h4>Curated Matching</h4>
            <p>Only connect with vetted founders who match your vision and ambition.</p>
          </div>
          <div className="solution-card">
            <div className="solution-icon">👥</div>
            <h4>Exclusive Access</h4>
            <p>Invitation-only network ensures you meet India's most serious builders.</p>
          </div>
          <div className="solution-card">
            <div className="solution-icon">🛡️</div>
            <h4>Zero Spam</h4>
            <p>Credits system and verification eliminate noise, maximize signal.</p>
          </div>
          <div className="solution-card">
            <div className="solution-icon">⭐</div>
            <h4>Smart Introductions</h4>
            <p>AI-crafted icebreakers and seamless calendar integration.</p>
          </div>
          <div className="solution-card">
            <div className="solution-icon">✅</div>
            <h4>Structured Collaboration</h4>
            <p>Purpose-built boards for hiring, partnerships, and fundraising.</p>
          </div>
          <div className="solution-card">
            <div className="solution-icon">➡️</div>
            <h4>Digital First</h4>
            <p>No forced meetups. Connect and collaborate on your terms.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div style={{ textAlign: "right", color: "rgba(255,255,255,0.5)", fontSize: "13px" }}>
          Made by <span style={{ fontWeight: 500 }}>MGX</span>
        </div>
      </footer>
    </div>
  );
}


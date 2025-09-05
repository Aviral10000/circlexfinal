import { Link } from "react-router-dom";

export default function Index() {
  return (
    <div>
      {/* Hero */}
      <section className="hero">
        <div className="container center">
          <div className="mt-8">
            <Link to="/onboarding/step1" className="btn btn-primary">Request Access</Link>
          </div>
          <div style={{ color: "rgba(255,255,255,0.7)", marginTop: 8, fontSize: 14 }}>
            Applications reviewed weekly
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
        © {new Date().getFullYear()} Circle X — All rights reserved.
      </footer>
    </div>
  );
}


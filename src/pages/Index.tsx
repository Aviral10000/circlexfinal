import { Link } from "react-router-dom";

export default function Index() {
  return (
    <div>
      {/* Nav */}
      <nav className="nav">
        <div className="brand">
          <div className="brand-dot" />
          <span className="brand-name">Circle X</span>
        </div>
        <div>
          <Link to="/onboarding/step1" className="btn btn-outline">I have an invite</Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="hero">
        <div className="hero-glow" />
        <div className="container center">
          <span className="badge">🔒 Invitation Only • Curated Founders</span>
          <h1 className="mt-8">
            A private network for India’s most
            <span>ambitious builders</span>
          </h1>
          <p>
            Where vision meets execution—and every connection has intent. No noise. No spam. Just outcomes.
          </p>
          <div className="mt-8">
            <Link to="/onboarding/step1" className="btn btn-primary">Apply for Access</Link>
            <a href="#why" className="btn btn-outline" style={{ marginLeft: 12 }}>Why Circle X</a>
          </div>
          <div style={{ color: "rgba(255,255,255,0.45)", marginTop: 10, fontSize: 13 }}>
            Applications reviewed weekly
          </div>
        </div>
      </section>

      {/* Indicators */}
      <section className="section">
        <div className="container pillars grid grid-3">
          <div className="item">
            <div className="emoji">👑</div>
            <h4>Curated</h4>
            <p>Hand-picked founders only</p>
          </div>
          <div className="item">
            <div className="emoji">💎</div>
            <h4>Private</h4>
            <p>Invite-only access</p>
          </div>
          <div className="item">
            <div className="emoji">✨</div>
            <h4>High-Intent</h4>
            <p>No spam, just signal</p>
          </div>
        </div>
      </section>

      {/* Why */}
      <section id="why" className="section">
        <div className="container grid grid-3">
          <div className="card">
            <h4>LinkedIn is Noise</h4>
            <p>Cold DMs, random connects, vanity metrics. We optimize for outcomes—not follower counts.</p>
          </div>
          <div className="card">
            <h4>Events are Outdated</h4>
            <p>Forced small talk and business cards nobody read. Circle X is digital-first and curated.</p>
          </div>
          <div className="card">
            <h4>Quality is Rare</h4>
            <p>We screen for real operators and founders. Every connection is vetted.</p>
          </div>
        </div>

        <div className="container center mt-16">
          <Link to="/onboarding/step1" className="btn btn-primary">Start Application</Link>
          <div style={{ color: "rgba(255,255,255,0.45)", marginTop: 10, fontSize: 13 }}>
            Takes ~2 minutes
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


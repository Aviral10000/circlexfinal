export default function NotFoundPage() {
  return (
    <div style={{ minHeight: "100vh", background: "#000", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center" }}>
      <div>
        <h1 style={{ fontSize: "72px", fontWeight: "300", margin: "0 0 16px" }}>404</h1>
        <h2 style={{ fontSize: "24px", fontWeight: "300", margin: "0 0 16px" }}>Page Not Found</h2>
        <p style={{ color: "rgba(255,255,255,0.6)", margin: "0 0 32px" }}>The page you're looking for doesn't exist.</p>
        <div>
          <a href="/" style={{ color: "#fff", textDecoration: "none", padding: "12px 24px", border: "1px solid rgba(255,255,255,0.3)", borderRadius: "8px", marginRight: "16px" }}>
            Return Home
          </a>
          <button onClick={() => window.history.back()} style={{ background: "transparent", color: "#fff", border: "1px solid rgba(255,255,255,0.3)", padding: "12px 24px", borderRadius: "8px", cursor: "pointer" }}>
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
}

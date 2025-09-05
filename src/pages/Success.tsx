import { Link } from "react-router-dom";

export default function Success() {
  return (
    <div className="container" style={{ paddingTop: 120, paddingBottom: 120, textAlign: "center" }}>
      <div style={{ fontSize: 56, marginBottom: 14 }}>✅</div>
      <h1 style={{ fontWeight: 300, marginBottom: 8 }}>Application Submitted</h1>
      <p style={{ color: "rgba(255,255,255,0.7)" }}>
        Your profile is <span style={{ color: "#fff" }}>under review</span>. We’ll email you once approved.
      </p>
      <div className="mt-8">
        <Link to="/" className="btn btn-primary">Back to Home</Link>
      </div>
    </div>
  );
}





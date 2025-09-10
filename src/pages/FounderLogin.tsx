import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabase";

export default function FounderLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      // Check if email exists and is approved
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('email', email)
        .eq('status', 'approved')
        .single();

      if (error || !data) {
        setMessage("❌ Email not found or not approved yet.");
      } else if (!data.password_set) {
        // Password not set yet, redirect to password setup
        navigate(`/password-setup?email=${encodeURIComponent(email)}`);
      } else {
        // Password is set, show password input
        setMessage("✅ Email verified! Please enter your password.");
        // For now, we'll show a simple password input
        // In a real app, you'd have a separate password field
        setMessage("✅ Email verified! Please enter your password to continue.");
        // Store email for password verification
        sessionStorage.setItem('pending_email', email);
        navigate('/password-verify');
      }
    } catch (err) {
      setMessage("❌ Error logging in. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: "#000", color: "#fff" }}>
      {/* Header */}
      <nav style={{ 
        display: "flex", 
        justifyContent: "space-between", 
        alignItems: "center", 
        padding: "20px 24px",
        borderBottom: "1px solid rgba(255,255,255,0.1)"
      }}>
        <div style={{ 
          fontSize: "24px", 
          fontWeight: 300, 
          color: "#fff"
        }}>
          Circle x
        </div>
        <div>
          <button 
            onClick={() => navigate('/')}
            className="btn btn-outline"
            style={{ fontSize: "14px", padding: "8px 16px" }}
          >
            Back to Home
          </button>
        </div>
      </nav>

      <section style={{ 
        padding: "100px 0", 
        display: "flex", 
        alignItems: "center", 
        justifyContent: "center" 
      }}>
        <div className="container" style={{ maxWidth: "400px" }}>
          <div className="card">
            <h2 style={{ 
              fontSize: "28px", 
              fontWeight: 300, 
              margin: "0 0 8px", 
              textAlign: "center"
            }}>
              Founder Login
            </h2>
            <p style={{ 
              color: "rgba(255,255,255,0.6)", 
              margin: "0 0 32px", 
              textAlign: "center",
              fontSize: "16px"
            }}>
              Access your Circle x founder network
            </p>

            <form onSubmit={handleLogin}>
              <input
                className="input"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={{ marginBottom: "16px" }}
              />

              <button
                type="submit"
                className="btn btn-primary"
                disabled={loading}
                style={{ width: "100%", marginBottom: "16px" }}
              >
                {loading ? "Signing in..." : "Sign In"}
              </button>
            </form>

            {message && (
              <p style={{ 
                color: message.startsWith("❌") ? "#ef4444" : "#10b981",
                textAlign: "center",
                fontSize: "14px"
              }}>
                {message}
              </p>
            )}

            <div style={{ 
              marginTop: "24px", 
              paddingTop: "24px", 
              borderTop: "1px solid rgba(255,255,255,0.1)",
              textAlign: "center"
            }}>
              <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "14px", margin: "0 0 8px" }}>
                Don't have an account yet?
              </p>
              <button 
                onClick={() => navigate('/onboarding/step1')}
                className="btn btn-outline"
                style={{ fontSize: "14px", padding: "8px 16px" }}
              >
                Apply to Join
              </button>
            </div>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div style={{ textAlign: "right", color: "rgba(255,255,255,0.5)", fontSize: "13px" }}>
          Made by <span style={{ fontWeight: 500 }}>MGX</span>
        </div>
      </footer>
    </div>
  );
}

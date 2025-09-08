import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { supabase } from "../supabase";

export default function PasswordSetup() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const email = searchParams.get('email');
  
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSetup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    if (password !== confirmPassword) {
      setMessage("❌ Passwords don't match.");
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setMessage("❌ Password must be at least 6 characters.");
      setLoading(false);
      return;
    }

    try {
      // Update the profile with password
      const { error } = await supabase
        .from('profiles')
        .update({ 
          password: password, // In production, this should be hashed
          password_set: true 
        })
        .eq('email', email)
        .eq('status', 'approved');

      if (error) {
        setMessage("❌ Error setting up password. Please try again.");
      } else {
        setMessage("✅ Password set successfully! Redirecting...");
        // Store session and redirect
        sessionStorage.setItem('founder_email', email || '');
        setTimeout(() => {
          navigate('/founder');
        }, 1500);
      }
    } catch (err) {
      setMessage("❌ Error setting up password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!email) {
    return (
      <div style={{ minHeight: "100vh", background: "#000", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div>Invalid access. Please login first.</div>
      </div>
    );
  }

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
          Circle X
        </div>
        <div>
          <button 
            onClick={() => navigate('/founder-login')}
            className="btn btn-outline"
            style={{ fontSize: "14px", padding: "8px 16px" }}
          >
            Back to Login
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
              Set Your Password
            </h2>
            <p style={{ 
              color: "rgba(255,255,255,0.6)", 
              margin: "0 0 32px", 
              textAlign: "center",
              fontSize: "16px"
            }}>
              Welcome to Circle X! Set up your password to access the founder network.
            </p>

            <form onSubmit={handleSetup}>
              <input
                className="input"
                type="password"
                placeholder="Create a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={{ marginBottom: "16px" }}
              />

              <input
                className="input"
                type="password"
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                style={{ marginBottom: "16px" }}
              />

              <button
                type="submit"
                className="btn btn-primary"
                disabled={loading}
                style={{ width: "100%", marginBottom: "16px" }}
              >
                {loading ? "Setting up..." : "Set Password & Continue"}
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
              <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "12px", margin: "0" }}>
                Password must be at least 6 characters long
              </p>
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



import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabase";
import { roleService } from "../services/roleService";

export default function PasswordVerify() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const pendingEmail = sessionStorage.getItem('pending_email');
    if (!pendingEmail) {
      navigate('/founder-login');
    } else {
      setEmail(pendingEmail);
    }
  }, [navigate]);

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      // Get user data and verify password
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('email', email)
        .eq('status', 'approved')
        .single();

      if (error || !data) {
        setMessage("❌ Error verifying credentials.");
      } else if (data.password !== password) {
        setMessage("❌ Incorrect password. Please try again.");
      } else {
        // Password correct, login successful
        sessionStorage.setItem('founder_email', email);
        sessionStorage.setItem('founder_id', data.id);
        sessionStorage.removeItem('pending_email');
        
        // Save user role to session storage
        const userRole = data.role || 'Founder';
        sessionStorage.setItem('user_role', userRole);
        
        // Check if this is first-time login (no profile picture set)
        if (!data.profile_picture_url) {
          navigate('/profile-picture-setup');
        } else {
          // Route based on user role
          const dashboardRoute = roleService.getDashboardRoute(userRole as any);
          navigate(dashboardRoute);
        }
      }
    } catch (err) {
      setMessage("❌ Error verifying password. Please try again.");
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
              Enter Password
            </h2>
            <p style={{ 
              color: "rgba(255,255,255,0.6)", 
              margin: "0 0 32px", 
              textAlign: "center",
              fontSize: "16px"
            }}>
              Welcome back! Please enter your password to access the founder network.
            </p>

            <form onSubmit={handleVerify}>
              <div style={{ marginBottom: "16px" }}>
                <label style={{ 
                  display: "block", 
                  color: "rgba(255,255,255,0.7)", 
                  fontSize: "14px", 
                  marginBottom: "8px" 
                }}>
                  Email
                </label>
                <input
                  className="input"
                  type="email"
                  value={email}
                  disabled
                  style={{ background: "rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.5)" }}
                />
              </div>

              <div style={{ position: "relative", marginBottom: "16px" }}>
                <input
                  className="input"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  style={{ paddingRight: "50px" }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: "absolute",
                    right: "12px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    background: "none",
                    border: "none",
                    color: "rgba(255,255,255,0.6)",
                    cursor: "pointer",
                    fontSize: "16px",
                    padding: "4px"
                  }}
                >
                  {showPassword ? "🙈" : "👁️"}
                </button>
              </div>

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
              <button 
                onClick={() => navigate('/founder-login')}
                className="btn btn-outline"
                style={{ fontSize: "14px", padding: "8px 16px" }}
              >
                Use Different Email
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



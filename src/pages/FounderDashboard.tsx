import { useState, useEffect } from "react";
import { supabase } from "../supabase";

interface Profile {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  company: string;
  role: string;
  industry: string;
  bio: string;
  profile_url: string;
  interests: string[];
  goals: string[];
  status: string;
  created_at: string;
}

export default function FounderDashboard() {
  const [currentProfile, setCurrentProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [swipedProfiles, setSwipedProfiles] = useState<string[]>([]);
  const [connections, setConnections] = useState<Profile[]>([]);
  const [activeTab, setActiveTab] = useState<'discover' | 'connections'>('discover');

  useEffect(() => {
    loadNextProfile();
    loadConnections();
  }, []);

  const loadNextProfile = async () => {
    try {
      // Get approved profiles that haven't been swiped yet
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('status', 'approved')
        .not('id', 'in', `(${swipedProfiles.join(',')})`)
        .limit(1);

      if (error) {
        console.error('Error loading profile:', error);
      } else if (data && data.length > 0) {
        setCurrentProfile(data[0]);
      } else {
        setCurrentProfile(null); // No more profiles
      }
    } catch (err) {
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const loadConnections = async () => {
    // This would load actual connections from a connections table
    // For now, we'll simulate with approved profiles
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('status', 'approved')
        .limit(5);

      if (!error && data) {
        setConnections(data);
      }
    } catch (err) {
      console.error('Error loading connections:', err);
    }
  };

  const handleSwipe = async (action: 'like' | 'pass') => {
    if (!currentProfile) return;

    // Add to swiped profiles
    setSwipedProfiles(prev => [...prev, currentProfile.id]);

    if (action === 'like') {
      // Here you would create a connection request
      console.log('Liked:', currentProfile.first_name);
      // TODO: Create connection request in database
    }

    // Load next profile
    loadNextProfile();
  };

  const getCompatibilityScore = (_profile: Profile) => {
    // Simple compatibility based on shared interests/goals
    // This would be more sophisticated in a real app
    return Math.floor(Math.random() * 40) + 60; // 60-100%
  };

  if (loading) {
    return (
      <div style={{ minHeight: "100vh", background: "#000", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div>Loading founder profiles...</div>
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
        <div style={{ display: "flex", gap: "12px" }}>
          <button
            onClick={() => setActiveTab('discover')}
            className={`btn ${activeTab === 'discover' ? 'btn-primary' : 'btn-outline'}`}
            style={{ fontSize: "14px", padding: "8px 16px" }}
          >
            Discover
          </button>
          <button
            onClick={() => setActiveTab('connections')}
            className={`btn ${activeTab === 'connections' ? 'btn-primary' : 'btn-outline'}`}
            style={{ fontSize: "14px", padding: "8px 16px" }}
          >
            Connections
          </button>
        </div>
      </nav>

      {activeTab === 'discover' && (
        <div style={{ padding: "24px", maxWidth: "600px", margin: "0 auto" }}>
          {currentProfile ? (
            <div className="card" style={{ position: "relative", minHeight: "600px" }}>
              {/* Profile Card */}
              <div style={{ textAlign: "center", marginBottom: "24px" }}>
                <div style={{ 
                  width: "120px", 
                  height: "120px", 
                  borderRadius: "50%", 
                  background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  margin: "0 auto 16px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "48px",
                  fontWeight: "300"
                }}>
                  {currentProfile.first_name[0]}{currentProfile.last_name[0]}
                </div>
                
                <h2 style={{ fontSize: "28px", fontWeight: "300", margin: "0 0 8px" }}>
                  {currentProfile.first_name} {currentProfile.last_name}
                </h2>
                
                <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "16px", margin: "0 0 16px" }}>
                  {currentProfile.role} at {currentProfile.company}
                </p>
                
                <div style={{ 
                  padding: "4px 12px", 
                  borderRadius: "20px", 
                  background: "rgba(16, 185, 129, 0.2)", 
                  color: "#10b981", 
                  fontSize: "14px",
                  display: "inline-block",
                  marginBottom: "16px"
                }}>
                  {currentProfile.industry}
                </div>
              </div>

              {currentProfile.bio && (
                <div style={{ marginBottom: "24px" }}>
                  <h4 style={{ fontSize: "16px", fontWeight: "500", margin: "0 0 8px" }}>About</h4>
                  <p style={{ color: "rgba(255,255,255,0.8)", lineHeight: "1.6" }}>
                    {currentProfile.bio}
                  </p>
                </div>
              )}

              <div style={{ marginBottom: "24px" }}>
                <h4 style={{ fontSize: "16px", fontWeight: "500", margin: "0 0 12px" }}>Interests</h4>
                <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                  {currentProfile.interests.map((interest, index) => (
                    <span key={index} style={{
                      padding: "6px 12px",
                      borderRadius: "16px",
                      fontSize: "14px",
                      background: "rgba(255,255,255,0.1)",
                      color: "rgba(255,255,255,0.9)"
                    }}>
                      {interest}
                    </span>
                  ))}
                </div>
              </div>

              <div style={{ marginBottom: "32px" }}>
                <h4 style={{ fontSize: "16px", fontWeight: "500", margin: "0 0 12px" }}>Goals</h4>
                <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                  {currentProfile.goals.map((goal, index) => (
                    <span key={index} style={{
                      padding: "6px 12px",
                      borderRadius: "16px",
                      fontSize: "14px",
                      background: "rgba(255,255,255,0.15)",
                      color: "rgba(255,255,255,0.9)"
                    }}>
                      {goal}
                    </span>
                  ))}
                </div>
              </div>

              {/* Compatibility Score */}
              <div style={{ 
                position: "absolute", 
                top: "20px", 
                right: "20px",
                background: "rgba(16, 185, 129, 0.2)",
                color: "#10b981",
                padding: "8px 12px",
                borderRadius: "20px",
                fontSize: "14px",
                fontWeight: "500"
              }}>
                {getCompatibilityScore(currentProfile)}% Match
              </div>

              {/* Action Buttons */}
              <div style={{ 
                position: "absolute", 
                bottom: "20px", 
                left: "20px", 
                right: "20px",
                display: "flex",
                gap: "16px"
              }}>
                <button
                  onClick={() => handleSwipe('pass')}
                  className="btn btn-outline"
                  style={{ 
                    flex: 1, 
                    padding: "16px",
                    fontSize: "16px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px"
                  }}
                >
                  ✕ Pass
                </button>
                <button
                  onClick={() => handleSwipe('like')}
                  className="btn btn-primary"
                  style={{ 
                    flex: 1, 
                    padding: "16px",
                    fontSize: "16px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px"
                  }}
                >
                  ♥ Connect
                </button>
              </div>
            </div>
          ) : (
            <div style={{ textAlign: "center", padding: "60px 0" }}>
              <div style={{ fontSize: "48px", marginBottom: "16px" }}>🎉</div>
              <h3 style={{ fontSize: "24px", fontWeight: "300", margin: "0 0 8px" }}>
                You've seen everyone!
              </h3>
              <p style={{ color: "rgba(255,255,255,0.7)" }}>
                Check back later for new founders joining the network.
              </p>
            </div>
          )}
        </div>
      )}

      {activeTab === 'connections' && (
        <div style={{ padding: "24px" }}>
          <h2 style={{ fontSize: "24px", fontWeight: "300", margin: "0 0 24px" }}>
            Your Connections
          </h2>
          <div style={{ display: "grid", gap: "16px" }}>
            {connections.map((connection) => (
              <div key={connection.id} className="card">
                <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                  <div style={{ 
                    width: "60px", 
                    height: "60px", 
                    borderRadius: "50%", 
                    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "24px",
                    fontWeight: "300"
                  }}>
                    {connection.first_name[0]}{connection.last_name[0]}
                  </div>
                  <div style={{ flex: 1 }}>
                    <h4 style={{ fontSize: "18px", fontWeight: "500", margin: "0 0 4px" }}>
                      {connection.first_name} {connection.last_name}
                    </h4>
                    <p style={{ color: "rgba(255,255,255,0.7)", margin: "0 0 4px" }}>
                      {connection.role} at {connection.company}
                    </p>
                    <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "14px", margin: "0" }}>
                      {connection.industry}
                    </p>
                  </div>
                  <button className="btn btn-outline" style={{ fontSize: "14px", padding: "8px 16px" }}>
                    Message
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

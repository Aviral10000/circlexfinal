import { useState, useEffect } from "react";
import Layout from "../components/Layout";

interface MentorshipRequest {
  id: number;
  founder_id: string;
  founder_name: string;
  founder_title: string;
  founder_industry: string;
  founder_avatar: string;
  message: string;
  status: 'pending' | 'accepted' | 'rejected';
  created_at: string;
}

interface Mentee {
  id: number;
  founder_id: string;
  founder_name: string;
  founder_title: string;
  founder_industry: string;
  founder_avatar: string;
  founder_email: string;
  founder_phone?: string;
  accepted_at: string;
}

export default function MentorDashboard() {
  const [activeTab, setActiveTab] = useState<'requests' | 'mentees'>('requests');
  const [requests, setRequests] = useState<MentorshipRequest[]>([]);
  const [mentees, setMentees] = useState<Mentee[]>([]);
  const [loading, setLoading] = useState(true);

  // Mock data for demo
  useEffect(() => {
    const mockRequests: MentorshipRequest[] = [
      {
        id: 1,
        founder_id: "1",
        founder_name: "Priya Sharma",
        founder_title: "Co-founder & CEO at HealthTech Innovations",
        founder_industry: "Healthcare",
        founder_avatar: "PS",
        message: "Hi! I'm building a telemedicine platform for rural India. Would love your guidance on scaling and fundraising strategies.",
        status: 'pending',
        created_at: new Date().toISOString()
      },
      {
        id: 2,
        founder_id: "2",
        founder_name: "Arjun Patel",
        founder_title: "Founder at AgriTech Solutions",
        founder_industry: "Agriculture",
        founder_avatar: "AP",
        message: "Looking for mentorship on product-market fit and go-to-market strategy for our farm management app.",
        status: 'pending',
        created_at: new Date(Date.now() - 86400000).toISOString()
      },
      {
        id: 3,
        founder_id: "3",
        founder_name: "Kavya Reddy",
        founder_title: "CEO at EduTech Startup",
        founder_industry: "Education",
        founder_avatar: "KR",
        message: "Need guidance on building a sustainable business model and team scaling for our online learning platform.",
        status: 'pending',
        created_at: new Date(Date.now() - 172800000).toISOString()
      }
    ];

    const mockMentees: Mentee[] = [
      {
        id: 1,
        founder_id: "4",
        founder_name: "Rohan Singh",
        founder_title: "Founder at FinTech Startup",
        founder_industry: "FinTech",
        founder_avatar: "RS",
        founder_email: "rohan@fintechstartup.com",
        founder_phone: "+91 98765 43210",
        accepted_at: new Date(Date.now() - 259200000).toISOString()
      },
      {
        id: 2,
        founder_id: "5",
        founder_name: "Sneha Gupta",
        founder_title: "Co-founder at AI Startup",
        founder_industry: "AI/ML",
        founder_avatar: "SG",
        founder_email: "sneha@aistartup.com",
        founder_phone: "+91 87654 32109",
        accepted_at: new Date(Date.now() - 345600000).toISOString()
      }
    ];

    setRequests(mockRequests);
    setMentees(mockMentees);
    setLoading(false);
  }, []);

  const handleRequestAction = (requestId: number, action: 'accept' | 'reject') => {
    setRequests(prev => prev.map(req => 
      req.id === requestId 
        ? { ...req, status: action === 'accept' ? 'accepted' : 'rejected' }
        : req
    ));

    if (action === 'accept') {
      const request = requests.find(req => req.id === requestId);
      if (request) {
        const newMentee: Mentee = {
          id: Date.now(),
          founder_id: request.founder_id,
          founder_name: request.founder_name,
          founder_title: request.founder_title,
          founder_industry: request.founder_industry,
          founder_avatar: request.founder_avatar,
          founder_email: `${request.founder_name.toLowerCase().replace(' ', '.')}@startup.com`,
          accepted_at: new Date().toISOString()
        };
        setMentees(prev => [newMentee, ...prev]);
      }
    }
  };

  if (loading) {
    return (
      <Layout>
        <div style={{ 
          display: "flex", 
          justifyContent: "center", 
          alignItems: "center", 
          height: "50vh",
          color: "#fff"
        }}>
          <div>Loading...</div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div style={{ color: "#fff", padding: "24px" }}>
        {/* Header */}
        <div style={{ marginBottom: "32px" }}>
          <h1 style={{
            fontSize: "32px",
            fontWeight: "600",
            margin: "0 0 8px",
            letterSpacing: "-0.02em"
          }}>
            Mentor Dashboard
          </h1>
          <p style={{
            color: "rgba(255,255,255,0.7)",
            fontSize: "16px",
            margin: 0
          }}>
            Guide the next generation of Indian entrepreneurs
          </p>
        </div>

        {/* Tabs */}
        <div style={{
          display: "flex",
          gap: "8px",
          marginBottom: "32px",
          borderBottom: "1px solid rgba(255,255,255,0.1)",
          paddingBottom: "16px"
        }}>
          <button
            onClick={() => setActiveTab('requests')}
            style={{
              background: activeTab === 'requests' ? "rgba(255,255,255,0.1)" : "transparent",
              border: "none",
              color: activeTab === 'requests' ? "#fff" : "rgba(255,255,255,0.7)",
              padding: "12px 24px",
              borderRadius: "8px",
              cursor: "pointer",
              fontSize: "14px",
              fontWeight: "500",
              transition: "all 0.2s ease"
            }}
          >
            Mentorship Requests ({requests.filter(r => r.status === 'pending').length})
          </button>
          <button
            onClick={() => setActiveTab('mentees')}
            style={{
              background: activeTab === 'mentees' ? "rgba(255,255,255,0.1)" : "transparent",
              border: "none",
              color: activeTab === 'mentees' ? "#fff" : "rgba(255,255,255,0.7)",
              padding: "12px 24px",
              borderRadius: "8px",
              cursor: "pointer",
              fontSize: "14px",
              fontWeight: "500",
              transition: "all 0.2s ease"
            }}
          >
            My Mentees ({mentees.length})
          </button>
        </div>

        {/* Content */}
        {activeTab === 'requests' ? (
          <div>
            <h2 style={{
              fontSize: "24px",
              fontWeight: "600",
              margin: "0 0 24px",
              color: "#fff"
            }}>
              Pending Requests
            </h2>
            
            {requests.filter(r => r.status === 'pending').length === 0 ? (
              <div style={{
                textAlign: "center",
                padding: "60px 20px",
                color: "rgba(255,255,255,0.6)"
              }}>
                <div style={{ fontSize: "48px", marginBottom: "16px" }}>📚</div>
                <h3 style={{ margin: "0 0 8px", fontSize: "18px" }}>No pending requests</h3>
                <p style={{ margin: 0, fontSize: "14px" }}>New mentorship requests will appear here</p>
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                {requests.filter(r => r.status === 'pending').map((request) => (
                  <div
                    key={request.id}
                    style={{
                      background: "rgba(255, 255, 255, 0.02)",
                      border: "1px solid rgba(255, 255, 255, 0.08)",
                      borderRadius: "16px",
                      padding: "24px",
                      backdropFilter: "blur(20px)"
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "flex-start", gap: "16px" }}>
                      {/* Avatar */}
                      <div style={{
                        width: "48px",
                        height: "48px",
                        borderRadius: "50%",
                        background: "rgba(255, 255, 255, 0.08)",
                        border: "1px solid rgba(255, 255, 255, 0.12)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "16px",
                        fontWeight: "600",
                        color: "#ffffff",
                        flexShrink: 0
                      }}>
                        {request.founder_avatar}
                      </div>

                      {/* Content */}
                      <div style={{ flex: 1 }}>
                        <div style={{ marginBottom: "8px" }}>
                          <h3 style={{
                            fontSize: "18px",
                            fontWeight: "600",
                            margin: "0 0 4px",
                            color: "#fff"
                          }}>
                            {request.founder_name}
                          </h3>
                          <p style={{
                            fontSize: "14px",
                            color: "rgba(255,255,255,0.7)",
                            margin: "0 0 4px"
                          }}>
                            {request.founder_title}
                          </p>
                          <span style={{
                            fontSize: "12px",
                            color: "rgba(255,255,255,0.5)",
                            background: "rgba(255,255,255,0.05)",
                            padding: "4px 8px",
                            borderRadius: "4px"
                          }}>
                            {request.founder_industry}
                          </span>
                        </div>

                        <p style={{
                          fontSize: "14px",
                          color: "rgba(255,255,255,0.8)",
                          margin: "0 0 16px",
                          lineHeight: "1.5"
                        }}>
                          {request.message}
                        </p>

                        <div style={{ display: "flex", gap: "12px" }}>
                          <button
                            onClick={() => handleRequestAction(request.id, 'accept')}
                            style={{
                              background: "linear-gradient(135deg, #00ff88 0%, #00cc6a 100%)",
                              border: "none",
                              color: "#000",
                              padding: "8px 16px",
                              borderRadius: "8px",
                              fontSize: "14px",
                              fontWeight: "600",
                              cursor: "pointer",
                              transition: "all 0.2s ease"
                            }}
                          >
                            Accept
                          </button>
                          <button
                            onClick={() => handleRequestAction(request.id, 'reject')}
                            style={{
                              background: "rgba(255, 255, 255, 0.05)",
                              border: "1px solid rgba(255, 255, 255, 0.1)",
                              color: "rgba(255,255,255,0.7)",
                              padding: "8px 16px",
                              borderRadius: "8px",
                              fontSize: "14px",
                              fontWeight: "500",
                              cursor: "pointer",
                              transition: "all 0.2s ease"
                            }}
                          >
                            Decline
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          <div>
            <h2 style={{
              fontSize: "24px",
              fontWeight: "600",
              margin: "0 0 24px",
              color: "#fff"
            }}>
              My Mentees
            </h2>
            
            {mentees.length === 0 ? (
              <div style={{
                textAlign: "center",
                padding: "60px 20px",
                color: "rgba(255,255,255,0.6)"
              }}>
                <div style={{ fontSize: "48px", marginBottom: "16px" }}>👥</div>
                <h3 style={{ margin: "0 0 8px", fontSize: "18px" }}>No mentees yet</h3>
                <p style={{ margin: 0, fontSize: "14px" }}>Accepted mentorship requests will appear here</p>
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                {mentees.map((mentee) => (
                  <div
                    key={mentee.id}
                    style={{
                      background: "rgba(255, 255, 255, 0.02)",
                      border: "1px solid rgba(255, 255, 255, 0.08)",
                      borderRadius: "16px",
                      padding: "24px",
                      backdropFilter: "blur(20px)"
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                      {/* Avatar */}
                      <div style={{
                        width: "48px",
                        height: "48px",
                        borderRadius: "50%",
                        background: "rgba(255, 255, 255, 0.08)",
                        border: "1px solid rgba(255, 255, 255, 0.12)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "16px",
                        fontWeight: "600",
                        color: "#ffffff",
                        flexShrink: 0
                      }}>
                        {mentee.founder_avatar}
                      </div>

                      {/* Content */}
                      <div style={{ flex: 1 }}>
                        <h3 style={{
                          fontSize: "18px",
                          fontWeight: "600",
                          margin: "0 0 4px",
                          color: "#fff"
                        }}>
                          {mentee.founder_name}
                        </h3>
                        <p style={{
                          fontSize: "14px",
                          color: "rgba(255,255,255,0.7)",
                          margin: "0 0 8px"
                        }}>
                          {mentee.founder_title}
                        </p>
                        <div style={{ display: "flex", gap: "16px", fontSize: "12px", color: "rgba(255,255,255,0.5)" }}>
                          <span>📧 {mentee.founder_email}</span>
                          {mentee.founder_phone && <span>📱 {mentee.founder_phone}</span>}
                        </div>
                      </div>

                      {/* Contact Button */}
                      <button
                        style={{
                          background: "rgba(255, 255, 255, 0.05)",
                          border: "1px solid rgba(255, 255, 255, 0.1)",
                          color: "#fff",
                          padding: "8px 16px",
                          borderRadius: "8px",
                          fontSize: "14px",
                          fontWeight: "500",
                          cursor: "pointer",
                          transition: "all 0.2s ease"
                        }}
                      >
                        Contact
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </Layout>
  );
}

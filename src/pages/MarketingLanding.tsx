import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface WaitlistFormData {
  name: string;
  email: string;
  role: 'Founder' | 'Mentor' | 'Investor';
  city: string;
  bio: string;
  referral: string;
}

export default function MarketingLanding() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<WaitlistFormData>({
    name: '',
    email: '',
    role: 'Founder',
    city: '',
    bio: '',
    referral: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('');

    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitMessage('✅ Successfully joined the waitlist! We\'ll be in touch soon.');
        setFormData({
          name: '',
          email: '',
          role: 'Founder',
          city: '',
          bio: '',
          referral: ''
        });
      } else {
        setSubmitMessage('❌ Something went wrong. Please try again.');
      }
    } catch (error) {
      setSubmitMessage('❌ Network error. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRoleCTA = (role: 'Founder' | 'Mentor' | 'Investor') => {
    // Scroll to form and pre-select role
    setFormData(prev => ({ ...prev, role }));
    document.getElementById('waitlist-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div style={{ 
      minHeight: "100vh", 
      background: "linear-gradient(135deg, #000 0%, #1a1a1a 100%)",
      color: "#fff",
      position: "relative",
      overflow: "hidden"
    }}>
      {/* Background Pattern */}
      <div style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: `
          radial-gradient(circle at 20% 80%, rgba(0, 255, 136, 0.1) 0%, transparent 50%),
          radial-gradient(circle at 80% 20%, rgba(139, 92, 246, 0.1) 0%, transparent 50%),
          radial-gradient(circle at 40% 40%, rgba(245, 158, 11, 0.05) 0%, transparent 50%)
        `,
        zIndex: 0
      }}></div>

      <div style={{ position: "relative", zIndex: 1 }}>
        {/* Header */}
        <nav style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "24px 32px",
          borderBottom: "1px solid rgba(255, 255, 255, 0.1)"
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            {/* Circle X Logo */}
            <div style={{
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              border: "2px solid #ffffff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
              background: "rgba(255, 255, 255, 0.05)",
              backdropFilter: "blur(10px)"
            }}>
              <span style={{
                fontSize: "18px",
                fontWeight: "900",
                color: "#ffffff",
                fontFamily: "'Times New Roman', serif",
                letterSpacing: "0px",
                textShadow: "0 0 8px rgba(255,255,255,0.4)",
                transform: "rotate(0deg)",
                lineHeight: 1,
                fontStyle: "italic"
              }}>
                x
              </span>
            </div>
            <div style={{ fontSize: "24px", fontWeight: "300", color: "#fff" }}>
              circle x
            </div>
          </div>
          <div>
            <button 
              onClick={() => navigate('/founder-login')}
              style={{
                background: "rgba(255, 255, 255, 0.05)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                borderRadius: "8px",
                padding: "12px 24px",
                color: "#fff",
                fontSize: "14px",
                fontWeight: "500",
                cursor: "pointer",
                transition: "all 0.2s ease"
              }}
            >
              Founder Login
            </button>
          </div>
        </nav>

        {/* Hero Section */}
        <section style={{
          padding: "160px 32px 120px",
          textAlign: "center",
          maxWidth: "1400px",
          margin: "0 auto",
          position: "relative"
        }}>
          {/* Premium Background Elements */}
          <div style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "800px",
            height: "800px",
            background: "radial-gradient(circle, rgba(0, 255, 136, 0.03) 0%, transparent 70%)",
            borderRadius: "50%",
            zIndex: 0
          }}></div>
          
          <div style={{
            position: "absolute",
            top: "20%",
            right: "10%",
            width: "400px",
            height: "400px",
            background: "radial-gradient(circle, rgba(139, 92, 246, 0.02) 0%, transparent 70%)",
            borderRadius: "50%",
            zIndex: 0
          }}></div>

          <div style={{ position: "relative", zIndex: 1 }}>
            {/* Premium Logo */}
            <div style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "20px",
              marginBottom: "40px"
            }}>
              <div style={{
                width: "80px",
                height: "80px",
                borderRadius: "50%",
                background: "linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)",
                border: "2px solid rgba(255, 255, 255, 0.2)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backdropFilter: "blur(20px)",
                boxShadow: "0 20px 40px rgba(0, 0, 0, 0.3)"
              }}>
                <span style={{
                  fontSize: "32px",
                  fontWeight: "900",
                  color: "#ffffff",
                  fontFamily: "'Times New Roman', serif",
                  textShadow: "0 0 20px rgba(255,255,255,0.5)",
                  fontStyle: "italic"
                }}>
                  x
                </span>
              </div>
            </div>

            <h1 style={{
              fontSize: "clamp(64px, 10vw, 120px)",
              fontWeight: "200",
              margin: "0 0 24px",
              letterSpacing: "-0.04em",
              background: "linear-gradient(135deg, #ffffff 0%, rgba(255, 255, 255, 0.8) 50%, rgba(255, 255, 255, 0.6) 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              textShadow: "0 0 40px rgba(255, 255, 255, 0.1)",
              lineHeight: "0.9"
            }}>
              circle x
            </h1>
            
            <div style={{
              width: "120px",
              height: "1px",
              background: "linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.3) 50%, transparent 100%)",
              margin: "0 auto 40px"
            }}></div>

            <h2 style={{
              fontSize: "clamp(28px, 4vw, 42px)",
              fontWeight: "300",
              margin: "0 0 32px",
              letterSpacing: "-0.02em",
              color: "rgba(255, 255, 255, 0.9)",
              lineHeight: "1.2"
            }}>
              India's Exclusive Founder Network
            </h2>
            
            <p style={{
              fontSize: "clamp(18px, 2.5vw, 22px)",
              color: "rgba(255, 255, 255, 0.7)",
              margin: "0 0 60px",
              lineHeight: "1.6",
              maxWidth: "700px",
              marginLeft: "auto",
              marginRight: "auto",
              fontWeight: "300"
            }}>
              Private, curated, invitation-only platform connecting India's most ambitious founders with mentors and investors who can actually help them succeed.
            </p>
            
            {/* Premium CTA Buttons */}
            <div style={{
              display: "flex",
              gap: "20px",
              justifyContent: "center",
              flexWrap: "wrap",
              marginBottom: "100px"
            }}>
              <button
                onClick={() => handleRoleCTA('Founder')}
                style={{
                  background: "linear-gradient(135deg, rgba(0, 255, 136, 0.9) 0%, rgba(0, 204, 106, 0.9) 100%)",
                  border: "1px solid rgba(0, 255, 136, 0.3)",
                  borderRadius: "16px",
                  padding: "20px 40px",
                  color: "#000",
                  fontSize: "16px",
                  fontWeight: "600",
                  cursor: "pointer",
                  transition: "all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                  boxShadow: "0 20px 40px rgba(0, 255, 136, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.2)",
                  backdropFilter: "blur(20px)",
                  letterSpacing: "0.5px",
                  textTransform: "uppercase"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow = "0 25px 50px rgba(0, 255, 136, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.3)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 20px 40px rgba(0, 255, 136, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.2)";
                }}
              >
                Join as Founder
              </button>
              <button
                onClick={() => handleRoleCTA('Mentor')}
                style={{
                  background: "rgba(255, 255, 255, 0.03)",
                  border: "1px solid rgba(255, 255, 255, 0.15)",
                  borderRadius: "16px",
                  padding: "20px 40px",
                  color: "#fff",
                  fontSize: "16px",
                  fontWeight: "500",
                  cursor: "pointer",
                  transition: "all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                  backdropFilter: "blur(20px)",
                  letterSpacing: "0.5px",
                  textTransform: "uppercase"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.background = "rgba(255, 255, 255, 0.08)";
                  e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.25)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.background = "rgba(255, 255, 255, 0.03)";
                  e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.15)";
                }}
              >
                Become a Mentor
              </button>
              <button
                onClick={() => handleRoleCTA('Investor')}
                style={{
                  background: "rgba(255, 255, 255, 0.03)",
                  border: "1px solid rgba(255, 255, 255, 0.15)",
                  borderRadius: "16px",
                  padding: "20px 40px",
                  color: "#fff",
                  fontSize: "16px",
                  fontWeight: "500",
                  cursor: "pointer",
                  transition: "all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                  backdropFilter: "blur(20px)",
                  letterSpacing: "0.5px",
                  textTransform: "uppercase"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.background = "rgba(255, 255, 255, 0.08)";
                  e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.25)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.background = "rgba(255, 255, 255, 0.03)";
                  e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.15)";
                }}
              >
                Join as Investor
              </button>
            </div>
          </div>
        </section>

        {/* Problem/Solution Section */}
        <section style={{
          padding: "80px 32px",
          maxWidth: "1200px",
          margin: "0 auto"
        }}>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
            gap: "48px",
            marginBottom: "80px"
          }}>
            <div style={{
              background: "rgba(255, 255, 255, 0.02)",
              border: "1px solid rgba(255, 255, 255, 0.08)",
              borderRadius: "16px",
              padding: "32px",
              backdropFilter: "blur(20px)"
            }}>
              <h3 style={{
                fontSize: "24px",
                fontWeight: "600",
                margin: "0 0 16px",
                color: "#ef4444"
              }}>
                The Problem
              </h3>
              <p style={{
                fontSize: "16px",
                color: "rgba(255, 255, 255, 0.8)",
                lineHeight: "1.6",
                margin: 0
              }}>
                Traditional networking is broken. LinkedIn is noise, events are superficial, and most connections lead nowhere. Founders waste time in endless networking without meaningful outcomes.
              </p>
            </div>
            
            <div style={{
              background: "rgba(255, 255, 255, 0.02)",
              border: "1px solid rgba(255, 255, 255, 0.08)",
              borderRadius: "16px",
              padding: "32px",
              backdropFilter: "blur(20px)"
            }}>
              <h3 style={{
                fontSize: "24px",
                fontWeight: "600",
                margin: "0 0 16px",
                color: "#00ff88"
              }}>
                Our Solution
              </h3>
              <p style={{
                fontSize: "16px",
                color: "rgba(255, 255, 255, 0.8)",
                lineHeight: "1.6",
                margin: 0
              }}>
                A private, curated network where every connection is meaningful. We match founders with the right mentors and investors based on actual compatibility, not just profiles.
              </p>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section style={{
          padding: "80px 32px",
          maxWidth: "1200px",
          margin: "0 auto",
          textAlign: "center"
        }}>
          <h2 style={{
            fontSize: "clamp(32px, 5vw, 48px)",
            fontWeight: "600",
            margin: "0 0 16px",
            color: "#fff"
          }}>
            How It Works
          </h2>
          <p style={{
            fontSize: "18px",
            color: "rgba(255, 255, 255, 0.7)",
            margin: "0 0 64px"
          }}>
            Three simple steps to meaningful connections
          </p>
          
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "32px"
          }}>
            {[
              {
                step: "01",
                title: "Apply & Get Vetted",
                description: "Submit your application. We review every profile to ensure quality and authenticity.",
                icon: "📝"
              },
              {
                step: "02", 
                title: "Smart Matching",
                description: "Our algorithm matches you with compatible founders, mentors, and investors based on your goals and expertise.",
                icon: "🎯"
              },
              {
                step: "03",
                title: "Meaningful Connections",
                description: "Connect with people who can actually help you succeed. No more wasted time on irrelevant connections.",
                icon: "🤝"
              }
            ].map((item, index) => (
              <div
                key={index}
                style={{
                  background: "rgba(255, 255, 255, 0.02)",
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                  borderRadius: "16px",
                  padding: "32px",
                  backdropFilter: "blur(20px)",
                  textAlign: "center"
                }}
              >
                <div style={{
                  fontSize: "48px",
                  marginBottom: "16px"
                }}>
                  {item.icon}
                </div>
                <div style={{
                  fontSize: "14px",
                  color: "#00ff88",
                  fontWeight: "600",
                  marginBottom: "8px"
                }}>
                  STEP {item.step}
                </div>
                <h3 style={{
                  fontSize: "20px",
                  fontWeight: "600",
                  margin: "0 0 12px",
                  color: "#fff"
                }}>
                  {item.title}
                </h3>
                <p style={{
                  fontSize: "14px",
                  color: "rgba(255, 255, 255, 0.7)",
                  lineHeight: "1.5",
                  margin: 0
                }}>
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Waitlist Form Section */}
        <section id="waitlist-form" style={{
          padding: "80px 32px",
          maxWidth: "800px",
          margin: "0 auto"
        }}>
          <div style={{
            background: "rgba(255, 255, 255, 0.02)",
            border: "1px solid rgba(255, 255, 255, 0.08)",
            borderRadius: "20px",
            padding: "48px",
            backdropFilter: "blur(20px)",
            textAlign: "center"
          }}>
            <h2 style={{
              fontSize: "clamp(28px, 4vw, 36px)",
              fontWeight: "600",
              margin: "0 0 16px",
              color: "#fff"
            }}>
              Join the Waitlist
            </h2>
            <p style={{
              fontSize: "16px",
              color: "rgba(255, 255, 255, 0.7)",
              margin: "0 0 32px",
              lineHeight: "1.5"
            }}>
              Be among the first to access India's most exclusive founder network
            </p>

            <form onSubmit={handleSubmit} style={{
              display: "flex",
              flexDirection: "column",
              gap: "20px",
              textAlign: "left"
            }}>
              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                gap: "20px"
              }}>
                <div>
                  <label style={{
                    display: "block",
                    color: "rgba(255, 255, 255, 0.8)",
                    fontSize: "14px",
                    fontWeight: "500",
                    marginBottom: "8px"
                  }}>
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    style={{
                      width: "100%",
                      padding: "12px 16px",
                      background: "rgba(255, 255, 255, 0.05)",
                      border: "1px solid rgba(255, 255, 255, 0.1)",
                      borderRadius: "8px",
                      color: "#fff",
                      fontSize: "14px"
                    }}
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <label style={{
                    display: "block",
                    color: "rgba(255, 255, 255, 0.8)",
                    fontSize: "14px",
                    fontWeight: "500",
                    marginBottom: "8px"
                  }}>
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    style={{
                      width: "100%",
                      padding: "12px 16px",
                      background: "rgba(255, 255, 255, 0.05)",
                      border: "1px solid rgba(255, 255, 255, 0.1)",
                      borderRadius: "8px",
                      color: "#fff",
                      fontSize: "14px"
                    }}
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                gap: "20px"
              }}>
                <div>
                  <label style={{
                    display: "block",
                    color: "rgba(255, 255, 255, 0.8)",
                    fontSize: "14px",
                    fontWeight: "500",
                    marginBottom: "8px"
                  }}>
                    Role *
                  </label>
                  <select
                    name="role"
                    value={formData.role}
                    onChange={handleInputChange}
                    required
                    style={{
                      width: "100%",
                      padding: "12px 16px",
                      background: "rgba(255, 255, 255, 0.05)",
                      border: "1px solid rgba(255, 255, 255, 0.1)",
                      borderRadius: "8px",
                      color: "#fff",
                      fontSize: "14px"
                    }}
                  >
                    <option value="Founder">Founder</option>
                    <option value="Mentor">Mentor</option>
                    <option value="Investor">Investor</option>
                  </select>
                </div>

                <div>
                  <label style={{
                    display: "block",
                    color: "rgba(255, 255, 255, 0.8)",
                    fontSize: "14px",
                    fontWeight: "500",
                    marginBottom: "8px"
                  }}>
                    City *
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    required
                    style={{
                      width: "100%",
                      padding: "12px 16px",
                      background: "rgba(255, 255, 255, 0.05)",
                      border: "1px solid rgba(255, 255, 255, 0.1)",
                      borderRadius: "8px",
                      color: "#fff",
                      fontSize: "14px"
                    }}
                    placeholder="e.g., Mumbai, Bangalore, Delhi"
                  />
                </div>
              </div>

              <div>
                <label style={{
                  display: "block",
                  color: "rgba(255, 255, 255, 0.8)",
                  fontSize: "14px",
                  fontWeight: "500",
                  marginBottom: "8px"
                }}>
                  Bio (Optional)
                </label>
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleInputChange}
                  rows={3}
                  style={{
                    width: "100%",
                    padding: "12px 16px",
                    background: "rgba(255, 255, 255, 0.05)",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    borderRadius: "8px",
                    color: "#fff",
                    fontSize: "14px",
                    resize: "vertical"
                  }}
                  placeholder="Tell us about yourself, your startup, or your expertise..."
                />
              </div>

              <div>
                <label style={{
                  display: "block",
                  color: "rgba(255, 255, 255, 0.8)",
                  fontSize: "14px",
                  fontWeight: "500",
                  marginBottom: "8px"
                }}>
                  Referral Code (Optional)
                </label>
                <input
                  type="text"
                  name="referral"
                  value={formData.referral}
                  onChange={handleInputChange}
                  style={{
                    width: "100%",
                    padding: "12px 16px",
                    background: "rgba(255, 255, 255, 0.05)",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    borderRadius: "8px",
                    color: "#fff",
                    fontSize: "14px"
                  }}
                  placeholder="Enter referral code if you have one"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                style={{
                  background: isSubmitting 
                    ? "rgba(0, 255, 136, 0.5)"
                    : "linear-gradient(135deg, #00ff88 0%, #00cc6a 100%)",
                  border: "none",
                  borderRadius: "12px",
                  padding: "16px 32px",
                  color: isSubmitting ? "rgba(0,0,0,0.5)" : "#000",
                  fontSize: "16px",
                  fontWeight: "600",
                  cursor: isSubmitting ? "not-allowed" : "pointer",
                  transition: "all 0.3s ease",
                  marginTop: "8px"
                }}
              >
                {isSubmitting ? "Joining Waitlist..." : "Join Waitlist"}
              </button>

              {submitMessage && (
                <p style={{
                  color: submitMessage.startsWith("✅") ? "#00ff88" : "#ef4444",
                  fontSize: "14px",
                  textAlign: "center",
                  margin: "16px 0 0"
                }}>
                  {submitMessage}
                </p>
              )}
            </form>
          </div>
        </section>

        {/* Pricing Teaser */}
        <section style={{
          padding: "80px 32px",
          maxWidth: "1200px",
          margin: "0 auto",
          textAlign: "center"
        }}>
          <div style={{
            background: "rgba(0, 255, 136, 0.1)",
            border: "1px solid rgba(0, 255, 136, 0.2)",
            borderRadius: "16px",
            padding: "32px",
            marginBottom: "32px"
          }}>
            <h3 style={{
              fontSize: "24px",
              fontWeight: "600",
              margin: "0 0 8px",
              color: "#00ff88"
            }}>
              Early Access Pricing
            </h3>
            <p style={{
              fontSize: "16px",
              color: "rgba(255, 255, 255, 0.8)",
              margin: 0
            }}>
              Free for the first 1000 members. Premium features unlock as we grow.
            </p>
          </div>
        </section>

        {/* Footer */}
        <footer style={{
          padding: "48px 32px",
          borderTop: "1px solid rgba(255, 255, 255, 0.1)",
          textAlign: "center",
          color: "rgba(255, 255, 255, 0.5)"
        }}>
          <div style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "12px",
            marginBottom: "16px"
          }}>
            {/* Circle X Logo */}
            <div style={{
              width: "28px",
              height: "28px",
              borderRadius: "50%",
              border: "1px solid rgba(255,255,255,0.3)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
              background: "rgba(255, 255, 255, 0.02)",
              backdropFilter: "blur(5px)"
            }}>
              <span style={{
                fontSize: "10px",
                fontWeight: "900",
                color: "rgba(255,255,255,0.5)",
                fontFamily: "'Times New Roman', serif",
                letterSpacing: "0px",
                textShadow: "0 0 4px rgba(255,255,255,0.2)",
                transform: "rotate(0deg)",
                lineHeight: 1,
                fontStyle: "italic"
              }}>
                x
              </span>
            </div>
            <span style={{ fontSize: "16px", fontWeight: "300" }}>circle x</span>
          </div>
          <p style={{ fontSize: "14px", margin: "0 0 8px" }}>
            India's Exclusive Founder Network
          </p>
          <p style={{ fontSize: "12px", margin: 0 }}>
            © 2024 circle x. All rights reserved.
          </p>
        </footer>
      </div>

      {/* Add CSS animations */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
      `}</style>
    </div>
  );
}

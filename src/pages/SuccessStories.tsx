import { useState } from "react";
import Layout from "../components/Layout";

interface SuccessStory {
  id: number;
  title: string;
  founder: string;
  company: string;
  industry: string;
  timeline: string;
  funding: string;
  description: string;
  challenges: string[];
  solutions: string[];
  results: string[];
  metrics: {
    revenue: string;
    team: string;
    users: string;
    growth: string;
  };
  image: string;
  videoUrl?: string;
  tags: string[];
}

export default function SuccessStories() {
  const [selectedStory, setSelectedStory] = useState<SuccessStory | null>(null);
  const [filter, setFilter] = useState("all");

  const successStories: SuccessStory[] = [
    {
      id: 1,
      title: "From Idea to $1M ARR in 18 Months",
      founder: "Sarah Chen",
      company: "TechFlow",
      industry: "AI/ML",
      timeline: "18 months",
      funding: "$2.5M Series A",
      description: "How Sarah built an AI-powered workflow automation platform that now serves 500+ companies and generates $1M ARR.",
      challenges: [
        "Finding the right technical co-founder",
        "Validating the market need",
        "Building the MVP with limited resources",
        "Getting initial customers"
      ],
      solutions: [
        "Connected with AI expert through Circle X",
        "Conducted 50+ customer interviews",
        "Used no-code tools for rapid prototyping",
        "Implemented freemium model for user acquisition"
      ],
      results: [
        "Reached $1M ARR in 18 months",
        "Built team of 12 employees",
        "Served 500+ enterprise customers",
        "Achieved 40% month-over-month growth"
      ],
      metrics: {
        revenue: "$1M ARR",
        team: "12 employees",
        users: "500+ companies",
        growth: "40% MoM"
      },
      image: "SC",
      tags: ["AI/ML", "B2B", "SaaS", "Rapid Growth"]
    },
    {
      id: 2,
      title: "Bootstrapped to $5M Revenue",
      founder: "Michael Rodriguez",
      company: "DataVault",
      industry: "FinTech",
      timeline: "3 years",
      funding: "Bootstrapped",
      description: "Michael's journey from a simple idea to a $5M revenue FinTech company without external funding.",
      challenges: [
        "Building trust in financial services",
        "Navigating regulatory compliance",
        "Scaling without external funding",
        "Competing with well-funded startups"
      ],
      solutions: [
        "Partnered with established financial institutions",
        "Hired compliance experts early",
        "Focused on profitability from day one",
        "Built strong customer relationships"
      ],
      results: [
        "Achieved $5M annual revenue",
        "Maintained 100% ownership",
        "Built team of 25 employees",
        "Expanded to 3 countries"
      ],
      metrics: {
        revenue: "$5M ARR",
        team: "25 employees",
        users: "10,000+ users",
        growth: "25% YoY"
      },
      image: "MR",
      tags: ["FinTech", "Bootstrapped", "B2B", "Compliance"]
    },
    {
      id: 3,
      title: "From MVP to Acquisition",
      founder: "Emily Watson",
      company: "HealthTech Solutions",
      industry: "Healthcare",
      timeline: "2 years",
      funding: "$1M Seed → Acquired",
      description: "Emily's healthcare startup was acquired by a major healthcare company for $15M after just 2 years.",
      challenges: [
        "Navigating healthcare regulations",
        "Building trust with medical professionals",
        "Integrating with existing systems",
        "Scaling in a conservative industry"
      ],
      solutions: [
        "Partnered with healthcare advisors",
        "Built strong relationships with early adopters",
        "Ensured HIPAA compliance from day one",
        "Focused on measurable outcomes"
      ],
      results: [
        "Acquired for $15M after 2 years",
        "Served 100+ healthcare facilities",
        "Improved patient outcomes by 30%",
        "Created 20+ jobs"
      ],
      metrics: {
        revenue: "$2M ARR",
        team: "20 employees",
        users: "100+ facilities",
        growth: "50% YoY"
      },
      image: "EW",
      tags: ["Healthcare", "Acquisition", "B2B", "Regulatory"]
    }
  ];

  const filteredStories = filter === "all" 
    ? successStories 
    : successStories.filter(story => story.tags.includes(filter));

  const getIndustryColor = (industry: string) => {
    switch (industry) {
      case "AI/ML": return "#10b981";
      case "FinTech": return "#3b82f6";
      case "Healthcare": return "#ef4444";
      case "E-Commerce": return "#f59e0b";
      default: return "#6b7280";
    }
  };

  return (
    <Layout>
      <div style={{ color: "#fff", padding: "24px" }}>
        {/* Header */}
        <div style={{ marginBottom: "32px" }}>
          <h1 style={{
            fontSize: "32px",
            fontWeight: "600",
            color: "#ffffff",
            margin: "0 0 8px",
            letterSpacing: "-0.5px"
          }}>
            Success Stories
          </h1>
          <p style={{
            fontSize: "16px",
            color: "rgba(255, 255, 255, 0.7)",
            margin: "0 0 24px",
            fontWeight: "400"
          }}>
            Learn from founders who built successful companies and achieved their dreams
          </p>

          {/* Filter Buttons */}
          <div style={{
            display: "flex",
            gap: "12px",
            flexWrap: "wrap"
          }}>
            {[
              { key: "all", label: "All Stories" },
              { key: "AI/ML", label: "AI/ML" },
              { key: "FinTech", label: "FinTech" },
              { key: "Healthcare", label: "Healthcare" },
              { key: "B2B", label: "B2B" },
              { key: "SaaS", label: "SaaS" }
            ].map((filterOption) => (
              <button
                key={filterOption.key}
                onClick={() => setFilter(filterOption.key)}
                style={{
                  background: filter === filterOption.key 
                    ? "rgba(255, 255, 255, 0.1)" 
                    : "rgba(255, 255, 255, 0.05)",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  borderRadius: "20px",
                  padding: "8px 16px",
                  color: filter === filterOption.key ? "#ffffff" : "rgba(255, 255, 255, 0.7)",
                  fontSize: "14px",
                  fontWeight: "500",
                  cursor: "pointer",
                  transition: "all 0.2s ease"
                }}
              >
                {filterOption.label}
              </button>
            ))}
          </div>
        </div>

        {/* Success Stories Grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))",
          gap: "24px"
        }}>
          {filteredStories.map((story) => (
            <div
              key={story.id}
              onClick={() => setSelectedStory(story)}
              style={{
                background: "rgba(255, 255, 255, 0.03)",
                border: "1px solid rgba(255, 255, 255, 0.08)",
                borderRadius: "16px",
                padding: "24px",
                backdropFilter: "blur(10px)",
                cursor: "pointer",
                transition: "all 0.3s ease",
                position: "relative"
              }}
            >
              {/* Industry Badge */}
              <div style={{
                position: "absolute",
                top: "16px",
                right: "16px",
                background: getIndustryColor(story.industry),
                borderRadius: "12px",
                padding: "6px 12px",
                fontSize: "12px",
                fontWeight: "600",
                color: "#ffffff"
              }}>
                {story.industry}
              </div>

              {/* Founder Avatar */}
              <div style={{
                display: "flex",
                alignItems: "center",
                gap: "16px",
                marginBottom: "20px"
              }}>
                <div style={{
                  width: "60px",
                  height: "60px",
                  borderRadius: "50%",
                  background: "rgba(255, 255, 255, 0.1)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "24px",
                  fontWeight: "600",
                  color: "#ffffff"
                }}>
                  {story.image}
                </div>
                <div>
                  <h3 style={{
                    fontSize: "20px",
                    fontWeight: "600",
                    color: "#ffffff",
                    margin: "0 0 4px",
                    letterSpacing: "-0.3px"
                  }}>
                    {story.founder}
                  </h3>
                  <p style={{
                    fontSize: "14px",
                    color: "rgba(255, 255, 255, 0.7)",
                    margin: "0"
                  }}>
                    {story.company}
                  </p>
                </div>
              </div>

              {/* Story Title */}
              <h2 style={{
                fontSize: "18px",
                fontWeight: "600",
                color: "#ffffff",
                margin: "0 0 12px",
                letterSpacing: "-0.3px"
              }}>
                {story.title}
              </h2>

              {/* Description */}
              <p style={{
                fontSize: "14px",
                color: "rgba(255, 255, 255, 0.7)",
                margin: "0 0 20px",
                lineHeight: "1.5"
              }}>
                {story.description}
              </p>

              {/* Metrics */}
              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
                gap: "12px",
                marginBottom: "20px"
              }}>
                <div style={{
                  background: "rgba(255, 255, 255, 0.05)",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  borderRadius: "8px",
                  padding: "12px",
                  textAlign: "center"
                }}>
                  <div style={{
                    fontSize: "16px",
                    fontWeight: "600",
                    color: "#10b981",
                    marginBottom: "4px"
                  }}>
                    {story.metrics.revenue}
                  </div>
                  <div style={{
                    fontSize: "11px",
                    color: "rgba(255, 255, 255, 0.6)"
                  }}>
                    Revenue
                  </div>
                </div>
                <div style={{
                  background: "rgba(255, 255, 255, 0.05)",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  borderRadius: "8px",
                  padding: "12px",
                  textAlign: "center"
                }}>
                  <div style={{
                    fontSize: "16px",
                    fontWeight: "600",
                    color: "#3b82f6",
                    marginBottom: "4px"
                  }}>
                    {story.metrics.team}
                  </div>
                  <div style={{
                    fontSize: "11px",
                    color: "rgba(255, 255, 255, 0.6)"
                  }}>
                    Team
                  </div>
                </div>
                <div style={{
                  background: "rgba(255, 255, 255, 0.05)",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  borderRadius: "8px",
                  padding: "12px",
                  textAlign: "center"
                }}>
                  <div style={{
                    fontSize: "16px",
                    fontWeight: "600",
                    color: "#f59e0b",
                    marginBottom: "4px"
                  }}>
                    {story.metrics.users}
                  </div>
                  <div style={{
                    fontSize: "11px",
                    color: "rgba(255, 255, 255, 0.6)"
                  }}>
                    Users
                  </div>
                </div>
                <div style={{
                  background: "rgba(255, 255, 255, 0.05)",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  borderRadius: "8px",
                  padding: "12px",
                  textAlign: "center"
                }}>
                  <div style={{
                    fontSize: "16px",
                    fontWeight: "600",
                    color: "#ef4444",
                    marginBottom: "4px"
                  }}>
                    {story.metrics.growth}
                  </div>
                  <div style={{
                    fontSize: "11px",
                    color: "rgba(255, 255, 255, 0.6)"
                  }}>
                    Growth
                  </div>
                </div>
              </div>

              {/* Tags */}
              <div style={{
                display: "flex",
                gap: "8px",
                flexWrap: "wrap"
              }}>
                {story.tags.map((tag, index) => (
                  <span
                    key={index}
                    style={{
                      background: "rgba(255, 255, 255, 0.05)",
                      border: "1px solid rgba(255, 255, 255, 0.1)",
                      borderRadius: "12px",
                      padding: "4px 8px",
                      fontSize: "11px",
                      color: "rgba(255, 255, 255, 0.7)",
                      fontWeight: "500"
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredStories.length === 0 && (
          <div style={{
            textAlign: "center",
            padding: "60px 20px",
            color: "rgba(255,255,255,0.7)"
          }}>
            <div style={{ fontSize: "64px", marginBottom: "24px" }}>📈</div>
            <h2 style={{ fontSize: "24px", marginBottom: "16px", color: "#fff" }}>
              No stories found
            </h2>
            <p style={{ fontSize: "16px", marginBottom: "24px" }}>
              Check back soon for more inspiring success stories
            </p>
          </div>
        )}

        {/* Story Detail Modal */}
        {selectedStory && (
          <div style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0, 0, 0, 0.8)",
            backdropFilter: "blur(10px)",
            zIndex: 1000,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px"
          }}>
            <div style={{
              background: "rgba(255, 255, 255, 0.05)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              borderRadius: "20px",
              padding: "32px",
              maxWidth: "800px",
              maxHeight: "90vh",
              overflow: "auto",
              backdropFilter: "blur(20px)"
            }}>
              {/* Close Button */}
              <button
                onClick={() => setSelectedStory(null)}
                style={{
                  position: "absolute",
                  top: "20px",
                  right: "20px",
                  background: "rgba(255, 255, 255, 0.1)",
                  border: "1px solid rgba(255, 255, 255, 0.2)",
                  borderRadius: "50%",
                  width: "40px",
                  height: "40px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#ffffff",
                  fontSize: "20px",
                  cursor: "pointer",
                  transition: "all 0.2s ease"
                }}
              >
                ✕
              </button>

              {/* Story Content */}
              <div style={{ marginBottom: "24px" }}>
                <div style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "16px",
                  marginBottom: "20px"
                }}>
                  <div style={{
                    width: "80px",
                    height: "80px",
                    borderRadius: "50%",
                    background: "rgba(255, 255, 255, 0.1)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "32px",
                    fontWeight: "600",
                    color: "#ffffff"
                  }}>
                    {selectedStory.image}
                  </div>
                  <div>
                    <h2 style={{
                      fontSize: "24px",
                      fontWeight: "600",
                      color: "#ffffff",
                      margin: "0 0 8px",
                      letterSpacing: "-0.3px"
                    }}>
                      {selectedStory.title}
                    </h2>
                    <p style={{
                      fontSize: "16px",
                      color: "rgba(255, 255, 255, 0.7)",
                      margin: "0"
                    }}>
                      {selectedStory.founder} • {selectedStory.company}
                    </p>
                  </div>
                </div>

                <p style={{
                  fontSize: "16px",
                  color: "rgba(255, 255, 255, 0.8)",
                  margin: "0 0 24px",
                  lineHeight: "1.6"
                }}>
                  {selectedStory.description}
                </p>

                {/* Challenges, Solutions, Results */}
                <div style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                  gap: "20px",
                  marginBottom: "24px"
                }}>
                  <div>
                    <h3 style={{
                      fontSize: "16px",
                      fontWeight: "600",
                      color: "#ef4444",
                      margin: "0 0 12px"
                    }}>
                      Challenges
                    </h3>
                    <ul style={{
                      listStyle: "none",
                      padding: 0,
                      margin: 0
                    }}>
                      {selectedStory.challenges.map((challenge, index) => (
                        <li key={index} style={{
                          fontSize: "14px",
                          color: "rgba(255, 255, 255, 0.7)",
                          marginBottom: "8px",
                          paddingLeft: "16px",
                          position: "relative"
                        }}>
                          <span style={{
                            position: "absolute",
                            left: 0,
                            color: "#ef4444"
                          }}>•</span>
                          {challenge}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 style={{
                      fontSize: "16px",
                      fontWeight: "600",
                      color: "#10b981",
                      margin: "0 0 12px"
                    }}>
                      Solutions
                    </h3>
                    <ul style={{
                      listStyle: "none",
                      padding: 0,
                      margin: 0
                    }}>
                      {selectedStory.solutions.map((solution, index) => (
                        <li key={index} style={{
                          fontSize: "14px",
                          color: "rgba(255, 255, 255, 0.7)",
                          marginBottom: "8px",
                          paddingLeft: "16px",
                          position: "relative"
                        }}>
                          <span style={{
                            position: "absolute",
                            left: 0,
                            color: "#10b981"
                          }}>•</span>
                          {solution}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 style={{
                      fontSize: "16px",
                      fontWeight: "600",
                      color: "#3b82f6",
                      margin: "0 0 12px"
                    }}>
                      Results
                    </h3>
                    <ul style={{
                      listStyle: "none",
                      padding: 0,
                      margin: 0
                    }}>
                      {selectedStory.results.map((result, index) => (
                        <li key={index} style={{
                          fontSize: "14px",
                          color: "rgba(255, 255, 255, 0.7)",
                          marginBottom: "8px",
                          paddingLeft: "16px",
                          position: "relative"
                        }}>
                          <span style={{
                            position: "absolute",
                            left: 0,
                            color: "#3b82f6"
                          }}>•</span>
                          {result}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}

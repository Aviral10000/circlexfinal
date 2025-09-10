import { useState, useEffect } from "react";
import Layout from "../components/Layout";
import { founderScoreService } from "../services/founderScoreService";

interface FounderMetrics {
  profileCompleteness: number;
  networkSize: number;
  connections: number;
  matches: number;
  eventsAttended: number;
  mentorshipApplications: number;
  investorPitches: number;
  ideaValidationScore: number;
  achievements: number;
  activityLevel: number;
}

export default function FounderScore() {
  const [metrics] = useState<FounderMetrics>({
    profileCompleteness: 85,
    networkSize: 12,
    connections: 8,
    matches: 3,
    eventsAttended: 2,
    mentorshipApplications: 1,
    investorPitches: 0,
    ideaValidationScore: 75,
    achievements: 4,
    activityLevel: 7
  });

  const [scoreBreakdown, setScoreBreakdown] = useState(founderScoreService.calculateFounderScore(metrics));
  const [achievements, setAchievements] = useState(founderScoreService.getAchievements(metrics));
  const [recommendedActions, setRecommendedActions] = useState(founderScoreService.getRecommendedActions(metrics, scoreBreakdown));
  const [weeklyGoals, setWeeklyGoals] = useState(founderScoreService.getWeeklyGoals(metrics));
  const [scoreHistory] = useState(founderScoreService.getScoreHistory());

  useEffect(() => {
    const newScoreBreakdown = founderScoreService.calculateFounderScore(metrics);
    setScoreBreakdown(newScoreBreakdown);
    setAchievements(founderScoreService.getAchievements(metrics));
    setRecommendedActions(founderScoreService.getRecommendedActions(metrics, newScoreBreakdown));
    setWeeklyGoals(founderScoreService.getWeeklyGoals(metrics));
  }, [metrics]);

  const scoreLevel = founderScoreService.getScoreLevel(scoreBreakdown.total);
  const progressToNext = founderScoreService.getProgressToNextLevel(scoreBreakdown.total);

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'profile': return '#10b981';
      case 'network': return '#3b82f6';
      case 'activity': return '#f59e0b';
      case 'growth': return '#8b5cf6';
      case 'milestone': return '#ef4444';
      default: return '#6b7280';
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
            Founder Score
          </h1>
          <p style={{
            fontSize: "16px",
            color: "rgba(255, 255, 255, 0.7)",
            margin: "0 0 24px",
            fontWeight: "400"
          }}>
            Track your progress and unlock achievements on your founder journey
          </p>
        </div>

        {/* Main Score Card */}
        <div style={{
          background: "rgba(255, 255, 255, 0.05)",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          borderRadius: "20px",
          padding: "32px",
          backdropFilter: "blur(10px)",
          marginBottom: "32px",
          textAlign: "center"
        }}>
          <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "16px",
            marginBottom: "24px"
          }}>
            <div style={{
              fontSize: "48px"
            }}>
              {scoreLevel.icon}
            </div>
            <div>
              <h2 style={{
                fontSize: "28px",
                fontWeight: "700",
                color: scoreLevel.color,
                margin: "0 0 8px",
                letterSpacing: "-0.5px"
              }}>
                {scoreBreakdown.total}
              </h2>
              <p style={{
                fontSize: "18px",
                fontWeight: "600",
                color: "#ffffff",
                margin: "0 0 4px"
              }}>
                {scoreLevel.level}
              </p>
              <p style={{
                fontSize: "14px",
                color: "rgba(255, 255, 255, 0.7)",
                margin: "0"
              }}>
                {scoreLevel.description}
              </p>
            </div>
          </div>

          {/* Progress to Next Level */}
          <div style={{
            background: "rgba(255, 255, 255, 0.05)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            borderRadius: "12px",
            padding: "16px",
            marginBottom: "24px"
          }}>
            <div style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "8px"
            }}>
              <span style={{
                fontSize: "14px",
                color: "rgba(255, 255, 255, 0.7)"
              }}>
                Progress to Next Level
              </span>
              <span style={{
                fontSize: "14px",
                fontWeight: "600",
                color: "#ffffff"
              }}>
                {progressToNext.pointsNeeded} points needed
              </span>
            </div>
            <div style={{
              width: "100%",
              height: "8px",
              background: "rgba(255, 255, 255, 0.1)",
              borderRadius: "4px",
              overflow: "hidden"
            }}>
              <div style={{
                width: `${progressToNext.progress}%`,
                height: "100%",
                background: `linear-gradient(90deg, ${scoreLevel.color} 0%, ${scoreLevel.color}80 100%)`,
                borderRadius: "4px",
                transition: "width 0.3s ease"
              }}></div>
            </div>
          </div>

          {/* Score Breakdown */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
            gap: "16px"
          }}>
            <div style={{
              background: "rgba(16, 185, 129, 0.1)",
              border: "1px solid rgba(16, 185, 129, 0.2)",
              borderRadius: "12px",
              padding: "16px",
              textAlign: "center"
            }}>
              <div style={{
                fontSize: "20px",
                fontWeight: "700",
                color: "#10b981",
                marginBottom: "4px"
              }}>
                {scoreBreakdown.profile}
              </div>
              <div style={{
                fontSize: "12px",
                color: "rgba(255, 255, 255, 0.7)"
              }}>
                Profile
              </div>
            </div>
            <div style={{
              background: "rgba(59, 130, 246, 0.1)",
              border: "1px solid rgba(59, 130, 246, 0.2)",
              borderRadius: "12px",
              padding: "16px",
              textAlign: "center"
            }}>
              <div style={{
                fontSize: "20px",
                fontWeight: "700",
                color: "#3b82f6",
                marginBottom: "4px"
              }}>
                {scoreBreakdown.network}
              </div>
              <div style={{
                fontSize: "12px",
                color: "rgba(255, 255, 255, 0.7)"
              }}>
                Network
              </div>
            </div>
            <div style={{
              background: "rgba(245, 158, 11, 0.1)",
              border: "1px solid rgba(245, 158, 11, 0.2)",
              borderRadius: "12px",
              padding: "16px",
              textAlign: "center"
            }}>
              <div style={{
                fontSize: "20px",
                fontWeight: "700",
                color: "#f59e0b",
                marginBottom: "4px"
              }}>
                {scoreBreakdown.activity}
              </div>
              <div style={{
                fontSize: "12px",
                color: "rgba(255, 255, 255, 0.7)"
              }}>
                Activity
              </div>
            </div>
            <div style={{
              background: "rgba(139, 92, 246, 0.1)",
              border: "1px solid rgba(139, 92, 246, 0.2)",
              borderRadius: "12px",
              padding: "16px",
              textAlign: "center"
            }}>
              <div style={{
                fontSize: "20px",
                fontWeight: "700",
                color: "#8b5cf6",
                marginBottom: "4px"
              }}>
                {scoreBreakdown.growth}
              </div>
              <div style={{
                fontSize: "12px",
                color: "rgba(255, 255, 255, 0.7)"
              }}>
                Growth
              </div>
            </div>
          </div>
        </div>

        {/* Weekly Goals */}
        <div style={{
          background: "rgba(255, 255, 255, 0.03)",
          border: "1px solid rgba(255, 255, 255, 0.08)",
          borderRadius: "16px",
          padding: "24px",
          backdropFilter: "blur(10px)",
          marginBottom: "32px"
        }}>
          <h3 style={{
            fontSize: "20px",
            fontWeight: "600",
            color: "#ffffff",
            margin: "0 0 20px",
            letterSpacing: "-0.3px"
          }}>
            Weekly Goals
          </h3>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "16px"
          }}>
            {weeklyGoals.map((goal, index) => (
              <div
                key={index}
                style={{
                  background: goal.completed ? "rgba(16, 185, 129, 0.1)" : "rgba(255, 255, 255, 0.05)",
                  border: goal.completed ? "1px solid rgba(16, 185, 129, 0.2)" : "1px solid rgba(255, 255, 255, 0.1)",
                  borderRadius: "12px",
                  padding: "16px",
                  display: "flex",
                  alignItems: "center",
                  gap: "12px"
                }}
              >
                <div style={{
                  width: "24px",
                  height: "24px",
                  borderRadius: "50%",
                  background: goal.completed ? "#10b981" : "rgba(255, 255, 255, 0.1)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "12px",
                  color: goal.completed ? "#000" : "rgba(255, 255, 255, 0.6)"
                }}>
                  {goal.completed ? "✓" : goal.current}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{
                    fontSize: "14px",
                    color: "#ffffff",
                    fontWeight: "500",
                    marginBottom: "2px"
                  }}>
                    {goal.title}
                  </div>
                  <div style={{
                    fontSize: "12px",
                    color: "rgba(255, 255, 255, 0.6)"
                  }}>
                    {goal.current}/{goal.target} completed
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Achievements */}
        <div style={{
          background: "rgba(255, 255, 255, 0.03)",
          border: "1px solid rgba(255, 255, 255, 0.08)",
          borderRadius: "16px",
          padding: "24px",
          backdropFilter: "blur(10px)",
          marginBottom: "32px"
        }}>
          <h3 style={{
            fontSize: "20px",
            fontWeight: "600",
            color: "#ffffff",
            margin: "0 0 20px",
            letterSpacing: "-0.3px"
          }}>
            Achievements
          </h3>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "16px"
          }}>
            {achievements.map((achievement) => (
              <div
                key={achievement.id}
                style={{
                  background: achievement.unlocked ? "rgba(255, 255, 255, 0.05)" : "rgba(255, 255, 255, 0.02)",
                  border: achievement.unlocked ? "1px solid rgba(255, 255, 255, 0.1)" : "1px solid rgba(255, 255, 255, 0.05)",
                  borderRadius: "12px",
                  padding: "16px",
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  opacity: achievement.unlocked ? 1 : 0.6
                }}
              >
                <div style={{
                  fontSize: "24px",
                  filter: achievement.unlocked ? "none" : "grayscale(100%)"
                }}>
                  {achievement.icon}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{
                    fontSize: "14px",
                    fontWeight: "600",
                    color: achievement.unlocked ? "#ffffff" : "rgba(255, 255, 255, 0.6)",
                    marginBottom: "4px"
                  }}>
                    {achievement.title}
                  </div>
                  <div style={{
                    fontSize: "12px",
                    color: "rgba(255, 255, 255, 0.6)",
                    marginBottom: "4px"
                  }}>
                    {achievement.description}
                  </div>
                  <div style={{
                    fontSize: "11px",
                    color: getCategoryColor(achievement.category),
                    fontWeight: "500"
                  }}>
                    {achievement.points} points • {achievement.category}
                  </div>
                </div>
                {achievement.unlocked && (
                  <div style={{
                    background: "#10b981",
                    borderRadius: "6px",
                    padding: "4px 8px",
                    fontSize: "10px",
                    fontWeight: "600",
                    color: "#000"
                  }}>
                    UNLOCKED
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Recommended Actions */}
        <div style={{
          background: "rgba(255, 255, 255, 0.03)",
          border: "1px solid rgba(255, 255, 255, 0.08)",
          borderRadius: "16px",
          padding: "24px",
          backdropFilter: "blur(10px)",
          marginBottom: "32px"
        }}>
          <h3 style={{
            fontSize: "20px",
            fontWeight: "600",
            color: "#ffffff",
            margin: "0 0 20px",
            letterSpacing: "-0.3px"
          }}>
            Recommended Actions
          </h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {recommendedActions.map((action, index) => (
              <div
                key={index}
                style={{
                  background: "rgba(255, 255, 255, 0.05)",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  borderRadius: "12px",
                  padding: "16px",
                  display: "flex",
                  alignItems: "center",
                  gap: "12px"
                }}
              >
                <div style={{
                  width: "24px",
                  height: "24px",
                  borderRadius: "50%",
                  background: "rgba(59, 130, 246, 0.2)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "12px",
                  color: "#3b82f6"
                }}>
                  {index + 1}
                </div>
                <div style={{
                  fontSize: "14px",
                  color: "#ffffff",
                  fontWeight: "500"
                }}>
                  {action}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Score History Chart */}
        <div style={{
          background: "rgba(255, 255, 255, 0.03)",
          border: "1px solid rgba(255, 255, 255, 0.08)",
          borderRadius: "16px",
          padding: "24px",
          backdropFilter: "blur(10px)"
        }}>
          <h3 style={{
            fontSize: "20px",
            fontWeight: "600",
            color: "#ffffff",
            margin: "0 0 20px",
            letterSpacing: "-0.3px"
          }}>
            Score History (Last 30 Days)
          </h3>
          <div style={{
            height: "200px",
            display: "flex",
            alignItems: "end",
            gap: "4px",
            padding: "20px 0"
          }}>
            {scoreHistory.map((day, index) => {
              const height = (day.score / 100) * 160;
              return (
                <div
                  key={index}
                  style={{
                    flex: 1,
                    height: `${height}px`,
                    background: `linear-gradient(180deg, ${scoreLevel.color} 0%, ${scoreLevel.color}80 100%)`,
                    borderRadius: "2px",
                    minHeight: "4px",
                    position: "relative"
                  }}
                  title={`${day.date}: ${day.score} points`}
                />
              );
            })}
          </div>
          <div style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: "12px",
            color: "rgba(255, 255, 255, 0.6)",
            marginTop: "8px"
          }}>
            <span>30 days ago</span>
            <span>Today</span>
          </div>
        </div>
      </div>
    </Layout>
  );
}

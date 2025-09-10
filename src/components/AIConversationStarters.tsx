import { useState, useEffect } from "react";
import { aiService, type ConversationStarter } from "../services/aiService";

interface AIConversationStartersProps {
  isOpen: boolean;
  onClose: () => void;
  userProfile: any;
  targetProfile: any;
  onSelectStarter: (starter: string) => void;
}

export default function AIConversationStarters({
  isOpen,
  onClose,
  userProfile,
  targetProfile,
  onSelectStarter
}: AIConversationStartersProps) {
  const [starters, setStarters] = useState<ConversationStarter[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedStarter, setSelectedStarter] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen && userProfile && targetProfile) {
      setLoading(true);
      // Simulate AI processing time
      setTimeout(() => {
        const generatedStarters = aiService.generateConversationStarters(userProfile, targetProfile);
        setStarters(generatedStarters);
        setLoading(false);
      }, 1000);
    }
  }, [isOpen, userProfile, targetProfile]);

  const getStarterIcon = (type: string) => {
    switch (type) {
      case 'question': return '❓';
      case 'comment': return '💬';
      case 'collaboration': return '🤝';
      case 'advice': return '💡';
      default: return '💬';
    }
  };

  const getStarterColor = (type: string) => {
    switch (type) {
      case 'question': return '#3b82f6';
      case 'comment': return '#10b981';
      case 'collaboration': return '#f59e0b';
      case 'advice': return '#8b5cf6';
      default: return '#6b7280';
    }
  };

  if (!isOpen) return null;

  return (
    <div style={{
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: "rgba(0, 0, 0, 0.9)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 1000,
      padding: "20px"
    }}>
      <div style={{
        background: "rgba(0, 0, 0, 0.95)",
        border: "1px solid rgba(255, 255, 255, 0.1)",
        borderRadius: "20px",
        padding: "32px",
        maxWidth: "600px",
        width: "100%",
        maxHeight: "80vh",
        overflow: "auto",
        backdropFilter: "blur(20px)"
      }}>
        {/* Header */}
        <div style={{
          textAlign: "center",
          marginBottom: "24px"
        }}>
          <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "12px",
            marginBottom: "8px"
          }}>
            <div style={{
              fontSize: "24px"
            }}>🤖</div>
            <h2 style={{
              color: "#ffffff",
              fontSize: "24px",
              fontWeight: "600",
              margin: 0
            }}>
              AI Conversation Starters
            </h2>
          </div>
          <p style={{
            color: "rgba(255, 255, 255, 0.7)",
            fontSize: "14px",
            margin: 0
          }}>
            Personalized messages for {targetProfile?.name}
          </p>
        </div>

        {loading ? (
          <div style={{
            textAlign: "center",
            padding: "40px 0"
          }}>
            <div style={{
              fontSize: "32px",
              marginBottom: "16px",
              animation: "spin 1s linear infinite"
            }}>⚡</div>
            <p style={{
              color: "rgba(255, 255, 255, 0.7)",
              fontSize: "16px",
              margin: 0
            }}>
              AI is crafting perfect conversation starters...
            </p>
          </div>
        ) : (
          <>
            {/* Starters List */}
            <div style={{
              display: "flex",
              flexDirection: "column",
              gap: "12px",
              marginBottom: "24px"
            }}>
              {starters.map((starter) => (
                <div
                  key={starter.id}
                  onClick={() => setSelectedStarter(starter.id)}
                  style={{
                    background: selectedStarter === starter.id 
                      ? "rgba(16, 185, 129, 0.1)"
                      : "rgba(255, 255, 255, 0.05)",
                    border: selectedStarter === starter.id 
                      ? "1px solid #10b981"
                      : "1px solid rgba(255, 255, 255, 0.1)",
                    borderRadius: "12px",
                    padding: "16px",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                    position: "relative"
                  }}
                >
                  <div style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "12px"
                  }}>
                    <div style={{
                      fontSize: "20px",
                      marginTop: "2px"
                    }}>
                      {getStarterIcon(starter.type)}
                    </div>
                    
                    <div style={{ flex: 1 }}>
                      <p style={{
                        color: "#ffffff",
                        fontSize: "14px",
                        lineHeight: "1.5",
                        margin: "0 0 8px"
                      }}>
                        {starter.text}
                      </p>
                      
                      <div style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px"
                      }}>
                        <span style={{
                          background: `${getStarterColor(starter.type)}20`,
                          color: getStarterColor(starter.type),
                          fontSize: "11px",
                          padding: "2px 6px",
                          borderRadius: "4px",
                          textTransform: "capitalize"
                        }}>
                          {starter.type}
                        </span>
                        
                        <span style={{
                          color: "rgba(255, 255, 255, 0.5)",
                          fontSize: "11px"
                        }}>
                          {starter.context}
                        </span>
                        
                        <div style={{
                          marginLeft: "auto",
                          display: "flex",
                          alignItems: "center",
                          gap: "4px"
                        }}>
                          <div style={{
                            width: "40px",
                            height: "4px",
                            background: "rgba(255, 255, 255, 0.1)",
                            borderRadius: "2px",
                            overflow: "hidden"
                          }}>
                            <div style={{
                              width: `${starter.confidence * 100}%`,
                              height: "100%",
                              background: starter.confidence > 0.8 
                                ? "#10b981" 
                                : starter.confidence > 0.6 
                                  ? "#f59e0b" 
                                  : "#6b7280",
                              borderRadius: "2px"
                            }}></div>
                          </div>
                          <span style={{
                            color: "rgba(255, 255, 255, 0.5)",
                            fontSize: "10px",
                            minWidth: "30px"
                          }}>
                            {Math.round(starter.confidence * 100)}%
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {selectedStarter === starter.id && (
                    <div style={{
                      position: "absolute",
                      top: "12px",
                      right: "12px",
                      width: "20px",
                      height: "20px",
                      borderRadius: "50%",
                      background: "#10b981",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#ffffff",
                      fontSize: "12px"
                    }}>
                      ✓
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center"
            }}>
              <button
                onClick={onClose}
                style={{
                  background: "rgba(255, 255, 255, 0.1)",
                  border: "1px solid rgba(255, 255, 255, 0.2)",
                  borderRadius: "8px",
                  padding: "12px 24px",
                  color: "#ffffff",
                  fontSize: "14px",
                  fontWeight: "500",
                  cursor: "pointer",
                  transition: "all 0.2s ease"
                }}
              >
                Cancel
              </button>
              
              <button
                onClick={() => {
                  const selected = starters.find(s => s.id === selectedStarter);
                  if (selected) {
                    onSelectStarter(selected.text);
                    onClose();
                  }
                }}
                disabled={!selectedStarter}
                style={{
                  background: selectedStarter 
                    ? "linear-gradient(135deg, #10b981 0%, #059669 100%)"
                    : "rgba(255, 255, 255, 0.1)",
                  border: "none",
                  borderRadius: "8px",
                  padding: "12px 32px",
                  color: "#ffffff",
                  fontSize: "16px",
                  fontWeight: "600",
                  cursor: selectedStarter ? "pointer" : "not-allowed",
                  opacity: selectedStarter ? 1 : 0.5,
                  transition: "all 0.2s ease"
                }}
              >
                Use This Message →
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

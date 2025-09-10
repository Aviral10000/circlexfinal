import { useState } from "react";
import Layout from "../components/Layout";

interface ValidationStep {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  questions: string[];
  answers: string[];
}

export default function IdeaValidation() {
  const [currentStep, setCurrentStep] = useState<number | null>(null);
  const [validationSteps, setValidationSteps] = useState<ValidationStep[]>([
    {
      id: 1,
      title: "Problem Definition",
      description: "Clearly define the problem you're solving",
      completed: false,
      questions: [
        "What specific problem are you trying to solve?",
        "Who experiences this problem?",
        "How do people currently solve this problem?",
        "What's the cost of not solving this problem?"
      ],
      answers: ["", "", "", ""]
    },
    {
      id: 2,
      title: "Market Research",
      description: "Research your target market and competition",
      completed: false,
      questions: [
        "What's the size of your target market?",
        "Who are your main competitors?",
        "What's your competitive advantage?",
        "How is the market growing?"
      ],
      answers: ["", "", "", ""]
    },
    {
      id: 3,
      title: "Customer Interviews",
      description: "Talk to potential customers to validate demand",
      completed: false,
      questions: [
        "How many customer interviews have you conducted?",
        "What percentage said they would pay for your solution?",
        "What's the biggest pain point they mentioned?",
        "How much would they pay for your solution?"
      ],
      answers: ["", "", "", ""]
    },
    {
      id: 4,
      title: "MVP Planning",
      description: "Plan your minimum viable product",
      completed: false,
      questions: [
        "What's the core feature of your MVP?",
        "How will you build your MVP?",
        "What's your timeline for MVP launch?",
        "How will you measure MVP success?"
      ],
      answers: ["", "", "", ""]
    },
    {
      id: 5,
      title: "Business Model",
      description: "Define your revenue model and pricing",
      completed: false,
      questions: [
        "How will you make money?",
        "What's your pricing strategy?",
        "What are your key metrics?",
        "What's your break-even point?"
      ],
      answers: ["", "", "", ""]
    }
  ]);

  const [validationScore, setValidationScore] = useState(0);

  const updateAnswer = (stepIndex: number, questionIndex: number, answer: string) => {
    const updatedSteps = [...validationSteps];
    updatedSteps[stepIndex].answers[questionIndex] = answer;
    setValidationSteps(updatedSteps);
    
    // Calculate validation score
    const totalQuestions = validationSteps.reduce((sum, step) => sum + step.questions.length, 0);
    const answeredQuestions = validationSteps.reduce((sum, step) => 
      sum + step.answers.filter(answer => answer.trim() !== "").length, 0
    );
    setValidationScore(Math.round((answeredQuestions / totalQuestions) * 100));
  };

  const completeStep = (stepIndex: number) => {
    const updatedSteps = [...validationSteps];
    updatedSteps[stepIndex].completed = true;
    setValidationSteps(updatedSteps);
  };

  const getStepStatus = (step: ValidationStep) => {
    const answeredQuestions = step.answers.filter(answer => answer.trim() !== "").length;
    const totalQuestions = step.questions.length;
    const progress = (answeredQuestions / totalQuestions) * 100;
    
    if (step.completed) return { status: "completed", progress: 100 };
    if (progress === 0) return { status: "not-started", progress: 0 };
    if (progress === 100) return { status: "ready", progress: 100 };
    return { status: "in-progress", progress };
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "#10b981";
      case "ready": return "#3b82f6";
      case "in-progress": return "#f59e0b";
      default: return "#6b7280";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed": return "✅";
      case "ready": return "🎯";
      case "in-progress": return "🔄";
      default: return "⭕";
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
            Idea Validation Hub
          </h1>
          <p style={{
            fontSize: "16px",
            color: "rgba(255, 255, 255, 0.7)",
            margin: "0 0 24px",
            fontWeight: "400"
          }}>
            Validate your startup idea with our step-by-step framework
          </p>

          {/* Validation Score */}
          <div style={{
            background: "rgba(255, 255, 255, 0.05)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            borderRadius: "16px",
            padding: "20px",
            backdropFilter: "blur(10px)",
            marginBottom: "24px"
          }}>
            <div style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "16px"
            }}>
              <h3 style={{
                fontSize: "18px",
                fontWeight: "600",
                color: "#ffffff",
                margin: "0"
              }}>
                Validation Score
              </h3>
              <div style={{
                fontSize: "24px",
                fontWeight: "700",
                color: validationScore >= 80 ? "#10b981" : validationScore >= 60 ? "#f59e0b" : "#ef4444"
              }}>
                {validationScore}%
              </div>
            </div>
            <div style={{
              width: "100%",
              height: "8px",
              background: "rgba(255, 255, 255, 0.1)",
              borderRadius: "4px",
              overflow: "hidden"
            }}>
              <div style={{
                width: `${validationScore}%`,
                height: "100%",
                background: validationScore >= 80 ? "#10b981" : validationScore >= 60 ? "#f59e0b" : "#ef4444",
                borderRadius: "4px",
                transition: "width 0.3s ease"
              }}></div>
            </div>
            <p style={{
              fontSize: "14px",
              color: "rgba(255, 255, 255, 0.6)",
              margin: "12px 0 0",
              textAlign: "center"
            }}>
              {validationScore >= 80 ? "Your idea is well-validated! 🚀" : 
               validationScore >= 60 ? "Good progress! Keep going! 💪" : 
               "Keep working on validation! 📝"}
            </p>
          </div>
        </div>

        {/* Validation Steps */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "20px",
          marginBottom: "32px"
        }}>
          {validationSteps.map((step, stepIndex) => {
            const stepStatus = getStepStatus(step);
            return (
              <div
                key={step.id}
                style={{
                  background: "rgba(255, 255, 255, 0.03)",
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                  borderRadius: "16px",
                  padding: "20px",
                  backdropFilter: "blur(10px)",
                  cursor: "pointer",
                  transition: "all 0.3s ease"
                }}
                onClick={() => setCurrentStep(stepIndex)}
              >
                {/* Step Header */}
                <div style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  marginBottom: "12px"
                }}>
                  <div style={{
                    width: "32px",
                    height: "32px",
                    borderRadius: "50%",
                    background: getStatusColor(stepStatus.status),
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "16px"
                  }}>
                    {getStatusIcon(stepStatus.status)}
                  </div>
                  <div style={{ flex: 1 }}>
                    <h3 style={{
                      fontSize: "16px",
                      fontWeight: "600",
                      color: "#ffffff",
                      margin: "0 0 4px"
                    }}>
                      {step.title}
                    </h3>
                    <p style={{
                      fontSize: "12px",
                      color: "rgba(255, 255, 255, 0.6)",
                      margin: "0"
                    }}>
                      {step.description}
                    </p>
                  </div>
                </div>

                {/* Progress Bar */}
                <div style={{
                  width: "100%",
                  height: "4px",
                  background: "rgba(255, 255, 255, 0.1)",
                  borderRadius: "2px",
                  overflow: "hidden",
                  marginBottom: "12px"
                }}>
                  <div style={{
                    width: `${stepStatus.progress}%`,
                    height: "100%",
                    background: getStatusColor(stepStatus.status),
                    borderRadius: "2px",
                    transition: "width 0.3s ease"
                  }}></div>
                </div>

                {/* Questions Count */}
                <div style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center"
                }}>
                  <span style={{
                    fontSize: "12px",
                    color: "rgba(255, 255, 255, 0.6)"
                  }}>
                    {step.answers.filter(answer => answer.trim() !== "").length} / {step.questions.length} questions
                  </span>
                  {stepStatus.status === "ready" && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        completeStep(stepIndex);
                      }}
                      style={{
                        background: "#10b981",
                        border: "none",
                        borderRadius: "6px",
                        padding: "4px 8px",
                        color: "#ffffff",
                        fontSize: "10px",
                        fontWeight: "600",
                        cursor: "pointer"
                      }}
                    >
                      Complete
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Current Step Detail */}
        {currentStep !== null && currentStep < validationSteps.length && (
          <div style={{
            background: "rgba(255, 255, 255, 0.03)",
            border: "1px solid rgba(255, 255, 255, 0.08)",
            borderRadius: "16px",
            padding: "24px",
            backdropFilter: "blur(10px)"
          }}>
            <div style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "24px"
            }}>
              <div>
                <h2 style={{
                  fontSize: "24px",
                  fontWeight: "600",
                  color: "#ffffff",
                  margin: "0 0 8px"
                }}>
                  {validationSteps[currentStep].title}
                </h2>
                <p style={{
                  fontSize: "16px",
                  color: "rgba(255, 255, 255, 0.7)",
                  margin: "0"
                }}>
                  {validationSteps[currentStep].description}
                </p>
              </div>
              <button
                onClick={() => setCurrentStep(null)}
                style={{
                  background: "rgba(255, 255, 255, 0.1)",
                  border: "1px solid rgba(255, 255, 255, 0.2)",
                  borderRadius: "8px",
                  padding: "8px 12px",
                  color: "#ffffff",
                  fontSize: "14px",
                  cursor: "pointer"
                }}
              >
                Close
              </button>
            </div>

            {/* Questions */}
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              {validationSteps[currentStep].questions.map((question, questionIndex) => (
                <div key={questionIndex}>
                  <label style={{
                    display: "block",
                    fontSize: "16px",
                    fontWeight: "500",
                    color: "#ffffff",
                    marginBottom: "8px"
                  }}>
                    {question}
                  </label>
                  <textarea
                    value={validationSteps[currentStep].answers[questionIndex]}
                    onChange={(e) => updateAnswer(currentStep, questionIndex, e.target.value)}
                    placeholder="Type your answer here..."
                    style={{
                      width: "100%",
                      minHeight: "80px",
                      background: "rgba(255, 255, 255, 0.05)",
                      border: "1px solid rgba(255, 255, 255, 0.1)",
                      borderRadius: "8px",
                      padding: "12px",
                      color: "#ffffff",
                      fontSize: "14px",
                      resize: "vertical",
                      fontFamily: "inherit"
                    }}
                  />
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div style={{
              display: "flex",
              gap: "12px",
              marginTop: "24px",
              justifyContent: "flex-end"
            }}>
              {currentStep > 0 && (
                <button
                  onClick={() => setCurrentStep(currentStep - 1)}
                  style={{
                    background: "rgba(255, 255, 255, 0.1)",
                    border: "1px solid rgba(255, 255, 255, 0.2)",
                    borderRadius: "8px",
                    padding: "12px 20px",
                    color: "#ffffff",
                    fontSize: "14px",
                    fontWeight: "500",
                    cursor: "pointer"
                  }}
                >
                  Previous
                </button>
              )}
              {currentStep < validationSteps.length - 1 && (
                <button
                  onClick={() => setCurrentStep(currentStep + 1)}
                  style={{
                    background: "rgba(255, 255, 255, 0.1)",
                    border: "1px solid rgba(255, 255, 255, 0.2)",
                    borderRadius: "8px",
                    padding: "12px 20px",
                    color: "#ffffff",
                    fontSize: "14px",
                    fontWeight: "500",
                    cursor: "pointer"
                  }}
                >
                  Next
                </button>
              )}
              {getStepStatus(validationSteps[currentStep]).status === "ready" && (
                <button
                  onClick={() => completeStep(currentStep)}
                  style={{
                    background: "#10b981",
                    border: "none",
                    borderRadius: "8px",
                    padding: "12px 20px",
                    color: "#ffffff",
                    fontSize: "14px",
                    fontWeight: "500",
                    cursor: "pointer"
                  }}
                >
                  Complete Step
                </button>
              )}
            </div>
          </div>
        )}

        {/* Resources */}
        <div style={{
          background: "rgba(255, 255, 255, 0.03)",
          border: "1px solid rgba(255, 255, 255, 0.08)",
          borderRadius: "16px",
          padding: "24px",
          backdropFilter: "blur(10px)",
          marginTop: "32px"
        }}>
          <h3 style={{
            fontSize: "20px",
            fontWeight: "600",
            color: "#ffffff",
            margin: "0 0 16px"
          }}>
            Validation Resources
          </h3>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "16px"
          }}>
            <div style={{
              background: "rgba(255, 255, 255, 0.05)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              borderRadius: "12px",
              padding: "16px"
            }}>
              <h4 style={{
                fontSize: "16px",
                fontWeight: "600",
                color: "#ffffff",
                margin: "0 0 8px"
              }}>
                📊 Market Research Tools
              </h4>
              <p style={{
                fontSize: "14px",
                color: "rgba(255, 255, 255, 0.7)",
                margin: "0 0 12px"
              }}>
                Tools to research your market size and competition
              </p>
              <button style={{
                background: "rgba(255, 255, 255, 0.1)",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                borderRadius: "6px",
                padding: "8px 12px",
                color: "#ffffff",
                fontSize: "12px",
                cursor: "pointer"
              }}>
                Explore Tools
              </button>
            </div>

            <div style={{
              background: "rgba(255, 255, 255, 0.05)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              borderRadius: "12px",
              padding: "16px"
            }}>
              <h4 style={{
                fontSize: "16px",
                fontWeight: "600",
                color: "#ffffff",
                margin: "0 0 8px"
              }}>
                🎯 Customer Interview Guide
              </h4>
              <p style={{
                fontSize: "14px",
                color: "rgba(255, 255, 255, 0.7)",
                margin: "0 0 12px"
              }}>
                Template questions for customer validation interviews
              </p>
              <button style={{
                background: "rgba(255, 255, 255, 0.1)",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                borderRadius: "6px",
                padding: "8px 12px",
                color: "#ffffff",
                fontSize: "12px",
                cursor: "pointer"
              }}>
                Get Template
              </button>
            </div>

            <div style={{
              background: "rgba(255, 255, 255, 0.05)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              borderRadius: "12px",
              padding: "16px"
            }}>
              <h4 style={{
                fontSize: "16px",
                fontWeight: "600",
                color: "#ffffff",
                margin: "0 0 8px"
              }}>
                🚀 MVP Planning Framework
              </h4>
              <p style={{
                fontSize: "14px",
                color: "rgba(255, 255, 255, 0.7)",
                margin: "0 0 12px"
              }}>
                Step-by-step guide to plan and build your MVP
              </p>
              <button style={{
                background: "rgba(255, 255, 255, 0.1)",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                borderRadius: "6px",
                padding: "8px 12px",
                color: "#ffffff",
                fontSize: "12px",
                cursor: "pointer"
              }}>
                Start Planning
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

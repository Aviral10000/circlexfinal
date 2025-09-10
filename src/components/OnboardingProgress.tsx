import { useState, useEffect } from "react";

interface OnboardingProgressProps {
  currentStep: number;
  totalSteps: number;
  onStepClick?: (step: number) => void;
}

const stepTitles = [
  "Personal Info",
  "Company Details", 
  "Interests & Goals",
  "Invitation Code"
];

const stepDescriptions = [
  "Tell us about yourself",
  "Share your startup details",
  "What are you looking for?",
  "Join the exclusive community"
];

export default function OnboardingProgress({ currentStep, totalSteps, onStepClick }: OnboardingProgressProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const newProgress = (currentStep / totalSteps) * 100;
    setProgress(newProgress);
  }, [currentStep, totalSteps]);

  return (
    <div style={{
      padding: "24px",
      background: "rgba(0, 0, 0, 0.8)",
      borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
      backdropFilter: "blur(10px)"
    }}>
      {/* Header */}
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "16px"
      }}>
        <div>
          <h2 style={{
            color: "#ffffff",
            fontSize: "18px",
            fontWeight: "600",
            margin: "0 0 4px"
          }}>
            {stepTitles[currentStep - 1]}
          </h2>
          <p style={{
            color: "rgba(255, 255, 255, 0.6)",
            fontSize: "14px",
            margin: 0
          }}>
            {stepDescriptions[currentStep - 1]}
          </p>
        </div>
        
        <div style={{
          textAlign: "right"
        }}>
          <div style={{
            color: "#10b981",
            fontSize: "16px",
            fontWeight: "600",
            marginBottom: "4px"
          }}>
            {Math.round(progress)}%
          </div>
          <div style={{
            color: "rgba(255, 255, 255, 0.6)",
            fontSize: "12px"
          }}>
            Step {currentStep} of {totalSteps}
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div style={{
        width: "100%",
        height: "6px",
        background: "rgba(255, 255, 255, 0.1)",
        borderRadius: "3px",
        overflow: "hidden",
        marginBottom: "16px"
      }}>
        <div style={{
          width: `${progress}%`,
          height: "100%",
          background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
          borderRadius: "3px",
          transition: "width 0.5s ease",
          position: "relative"
        }}>
          {/* Animated shine effect */}
          <div style={{
            position: "absolute",
            top: 0,
            left: "-100%",
            width: "100%",
            height: "100%",
            background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)",
            animation: "shine 2s infinite"
          }}></div>
        </div>
      </div>

      {/* Step Indicators */}
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
      }}>
        {Array.from({ length: totalSteps }, (_, index) => {
          const stepNumber = index + 1;
          const isCompleted = stepNumber < currentStep;
          const isCurrent = stepNumber === currentStep;
          const isUpcoming = stepNumber > currentStep;

          return (
            <div
              key={stepNumber}
              onClick={() => onStepClick && onStepClick(stepNumber)}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                cursor: onStepClick ? "pointer" : "default",
                opacity: isUpcoming ? 0.5 : 1,
                transition: "all 0.2s ease"
              }}
            >
              <div style={{
                width: "32px",
                height: "32px",
                borderRadius: "50%",
                background: isCompleted 
                  ? "linear-gradient(135deg, #10b981 0%, #059669 100%)"
                  : isCurrent
                    ? "linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)"
                    : "rgba(255, 255, 255, 0.1)",
                border: isCurrent ? "2px solid #8b5cf6" : "none",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "8px",
                transition: "all 0.3s ease"
              }}>
                {isCompleted ? (
                  <span style={{ color: "#ffffff", fontSize: "14px", fontWeight: "600" }}>✓</span>
                ) : (
                  <span style={{ 
                    color: isCurrent ? "#ffffff" : "rgba(255, 255, 255, 0.6)", 
                    fontSize: "12px", 
                    fontWeight: "600" 
                  }}>
                    {stepNumber}
                  </span>
                )}
              </div>
              
              <span style={{
                color: isCurrent ? "#ffffff" : "rgba(255, 255, 255, 0.6)",
                fontSize: "11px",
                textAlign: "center",
                fontWeight: isCurrent ? "500" : "400"
              }}>
                {stepTitles[index]}
              </span>
            </div>
          );
        })}
      </div>

      {/* Add CSS animation */}
      <style>{`
        @keyframes shine {
          0% { left: -100%; }
          100% { left: 100%; }
        }
      `}</style>
    </div>
  );
}

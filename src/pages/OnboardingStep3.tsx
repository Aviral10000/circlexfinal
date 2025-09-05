import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const interests = [
  "Marketing", "Operations", "Design", "HR", "Product Development", 
  "Sales", "Technology", "Legal", "Finance", "Fundraising"
];

const goals = [
  "Build Network", "Scale Business", "Product Feedback", "Raise Funding",
  "Find Mentor", "Enter New Markets", "Strategic Partnerships", "Find Co-founder"
];

export default function OnboardingStep3() {
  const navigate = useNavigate();
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);

  useEffect(() => {
    // Load previous step data
    const step2Data = sessionStorage.getItem('onboarding_step2');
    if (!step2Data) {
      navigate('/onboarding/step1');
    }
  }, [navigate]);

  const toggleInterest = (interest: string) => {
    setSelectedInterests(prev => 
      prev.includes(interest) 
        ? prev.filter(i => i !== interest)
        : [...prev, interest]
    );
  };

  const toggleGoal = (goal: string) => {
    setSelectedGoals(prev => 
      prev.includes(goal) 
        ? prev.filter(g => g !== goal)
        : [...prev, goal]
    );
  };

  const handleBack = () => {
    navigate('/onboarding/step2');
  };

  const handleNext = () => {
    // Store in sessionStorage
    sessionStorage.setItem('onboarding_step3', JSON.stringify({
      interests: selectedInterests,
      goals: selectedGoals
    }));
    navigate('/onboarding/step4');
  };

  const isFormValid = selectedInterests.length > 0 && selectedGoals.length > 0;

  return (
    <div style={{ minHeight: "100vh", background: "#000", color: "#fff" }}>
      {/* Progress Bar */}
      <div style={{ padding: "20px 24px", borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
          <span style={{ fontSize: "14px", color: "rgba(255,255,255,0.7)" }}>Step 3 of 4</span>
          <span style={{ fontSize: "14px", color: "rgba(255,255,255,0.7)" }}>75%</span>
        </div>
        <div style={{ 
          width: "100%", 
          height: "4px", 
          background: "rgba(255,255,255,0.1)", 
          borderRadius: "2px",
          overflow: "hidden"
        }}>
          <div style={{ 
            width: "75%", 
            height: "100%", 
            background: "#fff", 
            borderRadius: "2px",
            transition: "width 0.3s ease"
          }} />
        </div>
      </div>

      {/* Nav */}
      <nav className="nav">
        <div className="brand">
          <div className="brand-dot" />
          <span className="brand-name">Circle X</span>
        </div>
      </nav>

      <section className="section">
        <div className="container" style={{ maxWidth: 800 }}>
          <div className="card">
            {/* Your Interests */}
            <div style={{ marginBottom: "48px" }}>
              <h2 style={{ 
                fontSize: "32px", 
                fontWeight: 300, 
                margin: "0 0 8px", 
                letterSpacing: "-0.01em",
                textAlign: "center"
              }}>
                Your Interests
              </h2>
              <p style={{ 
                color: "rgba(255,255,255,0.6)", 
                margin: "0 0 32px", 
                fontSize: "16px",
                fontWeight: 300,
                textAlign: "center"
              }}>
                What areas are you most interested in?
              </p>
              
              <div className="grid" style={{ gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                {interests.map((interest) => (
                  <button
                    key={interest}
                    type="button"
                    onClick={() => toggleInterest(interest)}
                    className={`choice ${selectedInterests.includes(interest) ? "active" : ""}`}
                  >
                    {interest}
                  </button>
                ))}
              </div>
            </div>

            {/* Your Goals */}
            <div>
              <h2 style={{ 
                fontSize: "32px", 
                fontWeight: 300, 
                margin: "0 0 8px", 
                letterSpacing: "-0.01em",
                textAlign: "center"
              }}>
                Your Goals
              </h2>
              <p style={{ 
                color: "rgba(255,255,255,0.6)", 
                margin: "0 0 32px", 
                fontSize: "16px",
                fontWeight: 300,
                textAlign: "center"
              }}>
                What do you hope to achieve through Circle X?
              </p>
              
              <div className="grid" style={{ gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                {goals.map((goal) => (
                  <button
                    key={goal}
                    type="button"
                    onClick={() => toggleGoal(goal)}
                    className={`choice ${selectedGoals.includes(goal) ? "active" : ""}`}
                  >
                    {goal}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-8" />

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <button
                className="btn btn-outline"
                onClick={handleBack}
                style={{ display: "flex", alignItems: "center", gap: "8px" }}
              >
                ← Back
              </button>
              <button
                className="btn btn-primary"
                onClick={handleNext}
                disabled={!isFormValid}
                style={{ display: "flex", alignItems: "center", gap: "8px" }}
              >
                Next →
              </button>
            </div>
          </div>
        </div>
      </section>

      <footer className="footer">© {new Date().getFullYear()} Circle X — All rights reserved.</footer>
    </div>
  );
}

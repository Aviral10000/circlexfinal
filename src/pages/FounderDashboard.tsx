import { useState, useEffect } from "react";
import Layout from "../components/Layout";
import { smartMatchingService } from "../services/smartMatchingService";
import DemoMode from "../components/DemoMode";

interface FounderProfile {
  id: number;
  name: string;
  title: string;
  industry: string;
  matchPercentage: number;
  avatar: string;
  isOnline: boolean;
  matchDescription: string;
  matchReason: string;
  skills: string[];
  experience: number;
  location: string;
  fundingStage: string;
  teamSize: number;
  interests: string[];
  goals: string[];
}

export default function FounderDashboard() {
  // const navigate = useNavigate(); // Will be used for navigation later
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedIndustry, setSelectedIndustry] = useState("All Industries");
  const [showIndustryDropdown, setShowIndustryDropdown] = useState(false);
  const [currentProfile, setCurrentProfile] = useState<FounderProfile | null>(null);
  const [profiles, setProfiles] = useState<FounderProfile[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [swipeDirection, setSwipeDirection] = useState<"left" | "right" | null>(null);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [touchStart, setTouchStart] = useState<{ x: number; y: number } | null>(null);
  const [connections] = useState<FounderProfile[]>([]);
  const [matches] = useState<FounderProfile[]>([]);
  const [founderScore] = useState(85);
  const [achievements] = useState([
    { id: 1, title: "First Connection", description: "Made your first connection", icon: "🤝", unlocked: true },
    { id: 2, title: "Profile Complete", description: "Completed your profile", icon: "✅", unlocked: true },
    { id: 3, title: "Network Builder", description: "Connected with 5 founders", icon: "🌐", unlocked: false },
    { id: 4, title: "Mentor Seeker", description: "Applied for mentorship", icon: "🎓", unlocked: false },
    { id: 5, title: "Investor Ready", description: "Pitched to investors", icon: "💰", unlocked: false }
  ]);
  const [weeklyGoals] = useState([
    { id: 1, title: "Make 3 new connections", progress: 2, target: 3, completed: false },
    { id: 2, title: "Apply for 1 mentorship", progress: 0, target: 1, completed: false },
    { id: 3, title: "Attend 2 virtual events", progress: 1, target: 2, completed: false }
  ]);

  const [showDemoMode, setShowDemoMode] = useState(false);
  const [demoScenario, setDemoScenario] = useState<string | null>(null);


  const industries = ["All Industries", "Technology", "FinTech", "Healthcare", "E-Commerce", "AI", "Software"];

  // Demo scenario profiles
  const getProfilesForScenario = (scenario: string | null): FounderProfile[] => {
    const baseProfiles: FounderProfile[] = [
    {
      id: 1,
      name: "Arjun Patel",
      title: "Co-founder & CTO at PayFlow",
      industry: "FinTech",
      matchPercentage: 94,
      avatar: "AP",
      isOnline: true,
      matchDescription: "Perfect technical co-founder match",
      matchReason: "Both building UPI-based payment solutions for SMEs",
      skills: ["React", "Node.js", "Blockchain", "UPI Integration"],
      experience: 5,
      location: "Bangalore",
      fundingStage: "Seed",
      teamSize: 8,
      interests: ["FinTech", "Blockchain", "SME Banking"],
      goals: ["Scale Business", "Find Co-founder", "Raise Funding"]
    },
    {
      id: 2,
      name: "Kavya Reddy",
      title: "Founder & CEO at ShopLocal",
      industry: "E-Commerce",
      matchPercentage: 87,
      avatar: "KR",
      isOnline: false,
      matchDescription: "Strong business development potential",
      matchReason: "Complementary skills in D2C and marketplace operations",
      skills: ["Marketing", "Sales", "Operations", "Supply Chain"],
      experience: 7,
      location: "Mumbai",
      fundingStage: "Series A",
      teamSize: 15,
      interests: ["D2C", "Marketplace", "Logistics"],
      goals: ["Enter New Markets", "Strategic Partnerships", "Scale Business"]
    },
    {
      id: 3,
      name: "Rahul Singh",
      title: "Co-founder at HealthConnect",
      industry: "Healthcare",
      matchPercentage: 82,
      avatar: "RS",
      isOnline: true,
      matchDescription: "Excellent domain expertise match",
      matchReason: "Both in telemedicine with rural healthcare focus",
      skills: ["Product Management", "Healthcare", "Telemedicine", "UX Design"],
      experience: 4,
      location: "Delhi",
      fundingStage: "Pre-Seed",
      teamSize: 5,
      interests: ["Telemedicine", "Rural Healthcare", "Product Development"],
      goals: ["Product Feedback", "Find Mentor", "Build Network"]
    },
    {
      id: 4,
      name: "Priya Sharma",
      title: "Technical Co-founder at AIForIndia",
      industry: "AI",
      matchPercentage: 79,
      avatar: "PS",
      isOnline: false,
      matchDescription: "Strong technical collaboration potential",
      matchReason: "AI expertise in Indian language processing and NLP",
      skills: ["Python", "Machine Learning", "NLP", "Indian Languages"],
      experience: 6,
      location: "Hyderabad",
      fundingStage: "Seed",
      teamSize: 12,
      interests: ["AI", "NLP", "Indian Languages"],
      goals: ["Scale Business", "Find Co-founder", "Raise Funding"]
    },
    {
      id: 5,
      name: "Vikram Mehta",
      title: "Founder at EduTech Solutions",
      industry: "EdTech",
      matchPercentage: 76,
      avatar: "VM",
      isOnline: true,
      matchDescription: "Great partnership opportunity",
      matchReason: "Complementary EdTech solutions for K-12 and upskilling",
      skills: ["Product Strategy", "EdTech", "Content Creation", "Gamification"],
      experience: 3,
      location: "Pune",
      fundingStage: "Pre-Seed",
      teamSize: 6,
      interests: ["K-12 Education", "Upskilling", "Gamification"],
      goals: ["Strategic Partnerships", "Product Feedback", "Build Network"]
    },
    {
      id: 6,
      name: "Sneha Agarwal",
      title: "Co-founder & COO at AgriTech India",
      industry: "AgriTech",
      matchPercentage: 73,
      avatar: "SA",
      isOnline: true,
      matchDescription: "Innovative agri-tech collaboration",
      matchReason: "Both working on sustainable farming solutions",
      skills: ["Operations", "AgriTech", "IoT", "Supply Chain"],
      experience: 4,
      location: "Chandigarh",
      fundingStage: "Seed",
      teamSize: 9,
      interests: ["Sustainable Farming", "IoT", "Supply Chain"],
      goals: ["Scale Business", "Strategic Partnerships", "Enter New Markets"]
    },
    {
      id: 7,
      name: "Amit Kumar",
      title: "Founder & CEO at QuickDeliver",
      industry: "Logistics",
      matchPercentage: 70,
      avatar: "AK",
      isOnline: false,
      matchDescription: "Strong logistics expertise",
      matchReason: "Last-mile delivery optimization for tier-2 cities",
      skills: ["Logistics", "Operations", "Data Analytics", "Fleet Management"],
      experience: 8,
      location: "Gurgaon",
      fundingStage: "Series A",
      teamSize: 25,
      interests: ["Last-Mile Delivery", "Tier-2 Cities", "Fleet Management"],
      goals: ["Scale Business", "Enter New Markets", "Strategic Partnerships"]
    },
    {
      id: 8,
      name: "Deepika Nair",
      title: "Co-founder at CleanEnergy India",
      industry: "CleanTech",
      matchPercentage: 68,
      avatar: "DN",
      isOnline: true,
      matchDescription: "Sustainability-focused partnership",
      matchReason: "Both building clean energy solutions for India",
      skills: ["CleanTech", "Renewable Energy", "Policy", "Business Development"],
      experience: 5,
      location: "Chennai",
      fundingStage: "Pre-Seed",
      teamSize: 7,
      interests: ["Renewable Energy", "Sustainability", "Policy"],
      goals: ["Raise Funding", "Strategic Partnerships", "Build Network"]
    }
  ];

    // Return different profiles based on scenario
    switch (scenario) {
      case 'founder':
        return baseProfiles.filter(p => p.industry === 'FinTech' || p.industry === 'AI' || p.industry === 'E-Commerce');
      case 'investor':
        return baseProfiles.filter(p => p.industry === 'FinTech' || p.industry === 'AI').map(p => ({
          ...p,
          title: p.title.replace('Co-founder', 'Investor').replace('Founder', 'Partner'),
          industry: 'Venture Capital'
        }));
      case 'mentor':
        return baseProfiles.filter(p => p.experience >= 5).map(p => ({
          ...p,
          title: p.title.replace('Co-founder', 'Mentor').replace('Founder', 'Advisor'),
          industry: 'Consulting'
        }));
      case 'cofounder':
        return baseProfiles.filter(p => p.skills?.includes('React') || p.skills?.includes('Python')).map(p => ({
          ...p,
          title: p.title.replace('CEO', 'Technical Co-founder').replace('Founder', 'Co-founder')
        }));
      default:
        return baseProfiles;
    }
  };

  const mockProfiles = getProfilesForScenario(demoScenario);

  // Current user profile for smart matching - changes based on demo scenario
  const getCurrentUserProfile = (scenario: string | null): FounderProfile => {
    const baseProfile = {
      id: 0,
      name: sessionStorage.getItem('founder_email')?.split('@')[0] || 'Rohan',
      title: "Founder & CEO at TechStart India",
      industry: "AI/ML",
      matchPercentage: 100,
      avatar: "RI",
      isOnline: true,
      matchDescription: "Your Profile",
      matchReason: "This is you",
      skills: ["Product Management", "AI/ML", "Leadership", "Strategy"],
      experience: 4,
      location: "Bangalore",
      fundingStage: "Seed",
      teamSize: 8,
      interests: ["AI", "Healthcare", "Innovation", "SaaS"],
      goals: ["Scale product", "Raise funding", "Build team", "Find co-founder"]
    };

    switch (scenario) {
      case 'founder':
        return {
          ...baseProfile,
          name: "Rohan",
          title: "Founder & CEO at HealthAI Solutions",
          industry: "Healthcare AI",
          goals: ["Find Co-founder", "Raise Funding", "Build MVP"]
        };
      case 'investor':
        return {
          ...baseProfile,
          name: "Priya",
          title: "Partner at TechVentures Capital",
          industry: "Venture Capital",
          goals: ["Find Startups", "Due Diligence", "Portfolio Building"]
        };
      case 'mentor':
        return {
          ...baseProfile,
          name: "Arjun",
          title: "Serial Entrepreneur & Mentor",
          industry: "Consulting",
          experience: 8,
          goals: ["Mentor Founders", "Advisory Roles", "Network Building"]
        };
      case 'cofounder':
        return {
          ...baseProfile,
          name: "Kavya",
          title: "Technical Co-founder",
          industry: "Software Development",
          skills: ["React", "Node.js", "Python", "AWS"],
          goals: ["Find Business Partner", "Build Product", "Scale Startup"]
        };
      default:
        return baseProfile;
    }
  };

  const currentUserProfile = getCurrentUserProfile(demoScenario);

  useEffect(() => {
    // Apply smart matching to sort profiles by compatibility
    const smartMatchedProfiles = smartMatchingService.sortByCompatibility(currentUserProfile, mockProfiles);
    setProfiles(smartMatchedProfiles);
    setCurrentProfile(smartMatchedProfiles[0]);
  }, [demoScenario, currentUserProfile, mockProfiles]);

  const handlePass = () => {
    if (isAnimating || isDragging) return;
    
    setIsAnimating(true);
    setSwipeDirection("left");
    
    setTimeout(() => {
      if (currentIndex < profiles.length - 1) {
        setCurrentIndex(currentIndex + 1);
        setCurrentProfile(profiles[currentIndex + 1]);
      } else {
        setCurrentProfile(null);
      }
      setIsAnimating(false);
      setSwipeDirection(null);
      setDragOffset(0);
    }, 400);
  };

  const handleConnect = () => {
    if (isAnimating || isDragging) return;
    
    setIsAnimating(true);
    setSwipeDirection("right");
    
    setTimeout(() => {
      if (currentIndex < profiles.length - 1) {
        setCurrentIndex(currentIndex + 1);
        setCurrentProfile(profiles[currentIndex + 1]);
      } else {
        setCurrentProfile(null);
      }
      setIsAnimating(false);
      setSwipeDirection(null);
      setDragOffset(0);
    }, 400);
  };

  // Touch and drag handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    if (isAnimating) return;
    const touch = e.touches[0];
    setTouchStart({ x: touch.clientX, y: touch.clientY });
    setIsDragging(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!touchStart || isAnimating) return;
    const touch = e.touches[0];
    const deltaX = touch.clientX - touchStart.x;
    setDragOffset(deltaX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || isAnimating) return;
    
    const threshold = 100;
    if (Math.abs(dragOffset) > threshold) {
      if (dragOffset > 0) {
        handleConnect();
      } else {
        handlePass();
      }
    } else {
      setDragOffset(0);
    }
    
    setIsDragging(false);
    setTouchStart(null);
  };

  // Mouse drag handlers for desktop
  const handleMouseDown = (e: React.MouseEvent) => {
    if (isAnimating) return;
    setTouchStart({ x: e.clientX, y: e.clientY });
    setIsDragging(true);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!touchStart || isAnimating || !isDragging) return;
    const deltaX = e.clientX - touchStart.x;
    setDragOffset(deltaX);
  };

  const handleMouseUp = () => {
    if (!touchStart || isAnimating) return;
    
    const threshold = 100;
    if (Math.abs(dragOffset) > threshold) {
      if (dragOffset > 0) {
        handleConnect();
      } else {
        handlePass();
      }
    } else {
      setDragOffset(0);
    }
    
    setIsDragging(false);
    setTouchStart(null);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      handlePass();
    } else if (e.key === "ArrowRight") {
      handleConnect();
    }
  };


  const getMatchEmoji = (percentage: number) => {
    if (percentage >= 80) return "🤝";
    if (percentage >= 60) return "👍";
    return "👋";
  };

  return (
    <Layout>
      {/* Demo Mode */}
      <DemoMode 
        isOpen={showDemoMode}
        onClose={() => setShowDemoMode(false)}
        onSelectScenario={(scenario) => {
          console.log('Selected demo scenario:', scenario);
          setDemoScenario(scenario);
          setShowDemoMode(false);
          // Reset to first profile when scenario changes
          setCurrentIndex(0);
        }}
      />

      <div
        style={{
          color: "#fff"
        }}
        onKeyDown={handleKeyPress}
        tabIndex={0}
      >
      {/* Search and Filters */}
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: "32px",
        flexWrap: "wrap",
        gap: "16px"
      }}>
        {/* Demo Mode Button */}
        {demoScenario ? (
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: "12px"
          }}>
            <div style={{
              background: "rgba(139, 92, 246, 0.1)",
              border: "1px solid rgba(139, 92, 246, 0.3)",
              borderRadius: "8px",
              padding: "8px 12px",
              display: "flex",
              alignItems: "center",
              gap: "8px"
            }}>
              <span style={{ fontSize: "16px" }}>🎭</span>
              <span style={{
                color: "#8b5cf6",
                fontSize: "14px",
                fontWeight: "600"
              }}>
                {demoScenario === 'founder' ? 'Early-Stage Founder' :
                 demoScenario === 'investor' ? 'Angel Investor' :
                 demoScenario === 'mentor' ? 'Serial Entrepreneur' :
                 demoScenario === 'cofounder' ? 'Technical Co-founder' : 'Demo Mode'}
              </span>
            </div>
            <button
              onClick={() => {
                setDemoScenario(null);
                setCurrentIndex(0);
              }}
              style={{
                background: "rgba(255, 255, 255, 0.1)",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                borderRadius: "6px",
                padding: "6px 10px",
                color: "#ffffff",
                fontSize: "12px",
                cursor: "pointer",
                transition: "all 0.2s ease"
              }}
            >
              Reset
            </button>
          </div>
        ) : (
          <button
            onClick={() => setShowDemoMode(true)}
            style={{
              background: "linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)",
              border: "none",
              borderRadius: "8px",
              padding: "8px 16px",
              color: "#ffffff",
              fontSize: "14px",
              fontWeight: "600",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              transition: "all 0.2s ease"
            }}
          >
            🎭 Demo Mode
          </button>
        )}
        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search founders..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: "8px",
            padding: "12px 16px",
            color: "#fff",
            fontSize: "14px",
            width: "300px",
            outline: "none"
          }}
        />

        {/* Filter Buttons */}
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
          <button
            style={{ 
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: "8px",
              padding: "8px 12px",
              color: "#fff",
              fontSize: "12px",
              cursor: "pointer",
              outline: "none"
            }}
          >
            High Match (80%+)
          </button>
          <button
            style={{ 
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: "8px",
              padding: "8px 12px",
              color: "#fff",
              fontSize: "12px",
              cursor: "pointer",
              outline: "none"
            }}
          >
            Founders Only
          </button>
          <button
            style={{ 
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: "8px",
              padding: "8px 12px",
              color: "#fff",
              fontSize: "12px",
              cursor: "pointer",
              outline: "none"
            }}
          >
            CEOs Only
          </button>
        </div>

        {/* Industry Dropdown */}
        <div style={{ position: "relative" }}>
          <button
            onClick={() => setShowIndustryDropdown(!showIndustryDropdown)}
            style={{ 
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: "8px",
              padding: "8px 12px",
              color: "#fff",
              fontSize: "12px",
              cursor: "pointer",
              outline: "none",
              display: "flex",
              alignItems: "center",
              gap: "8px"
            }}
          >
            {selectedIndustry}
            <span style={{ fontSize: "10px" }}>▼</span>
          </button>
          
          {showIndustryDropdown && (
            <div style={{
              position: "absolute",
              top: "100%",
              right: "0",
              background: "rgba(0,0,0,0.95)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: "8px",
              padding: "8px 0",
              minWidth: "160px",
              zIndex: 1000,
              backdropFilter: "blur(10px)"
            }}>
              {industries.map((industry) => (
                <button
                  key={industry}
                  onClick={() => {
                    setSelectedIndustry(industry);
                    setShowIndustryDropdown(false);
                  }}
                  style={{
                    width: "100%",
                    padding: "8px 16px",
                    background: "transparent",
                    border: "none",
                    color: "#fff",
                    textAlign: "left",
                    fontSize: "12px",
                    cursor: "pointer",
                    outline: "none"
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "rgba(255,255,255,0.05)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "transparent";
                  }}
                >
                  {industry}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Enhanced Dashboard Header */}
      <div style={{
        textAlign: "center",
        marginBottom: "40px"
      }}>
        <h1 style={{
          fontSize: "32px",
          fontWeight: "600",
          color: "#ffffff",
          margin: "0 0 8px",
          letterSpacing: "-0.5px"
        }}>
          Welcome back, {sessionStorage.getItem('founder_email')?.split('@')[0] || 'Founder'}
        </h1>
        <p style={{
          fontSize: "16px",
          color: "rgba(255, 255, 255, 0.7)",
          margin: "0 0 32px",
          fontWeight: "400"
        }}>
          Discover your next co-founder, mentor, or investor
        </p>


        {/* Instructions */}
        <p style={{
          fontSize: "14px",
          color: "rgba(255, 255, 255, 0.6)",
          margin: "0",
          fontWeight: "400"
        }}>
          Use ← → arrow keys or click buttons to swipe
        </p>
      </div>

      {/* Profile Card Section */}
      <div style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "50vh"
      }}>
        {currentProfile ? (
          <div 
            style={{
              background: "rgba(255, 255, 255, 0.02)",
              border: "1px solid rgba(255, 255, 255, 0.08)",
              borderRadius: "16px",
              padding: "32px",
              maxWidth: "480px",
              width: "100%",
              boxShadow: "0 8px 32px rgba(0, 0, 0, 0.12)",
              backdropFilter: isDragging ? "blur(25px)" : "blur(20px)",
              position: "relative",
              transform: isAnimating 
                ? swipeDirection === "left" 
                  ? "translateX(-100%) rotate(-15deg) scale(0.8)" 
                  : swipeDirection === "right" 
                  ? "translateX(100%) rotate(15deg) scale(0.8)" 
                  : `translateX(${dragOffset}px) rotate(${dragOffset * 0.1}deg)`
                : `translateX(${dragOffset}px) rotate(${dragOffset * 0.1}deg)`,
              opacity: isAnimating ? 0.3 : isDragging ? 0.9 : 1,
              transition: isAnimating ? "all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)" : "transform 0.1s ease-out",
              overflow: "hidden",
              cursor: isDragging ? "grabbing" : "grab",
              userSelect: "none"
            }}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
            {/* Swipe Direction Overlays */}
            {isDragging && Math.abs(dragOffset) > 50 && (
              <>
                {dragOffset > 0 && (
                  <div style={{
                    position: "absolute",
                    top: "50%",
                    right: "20px",
                    transform: "translateY(-50%)",
                    background: "rgba(0, 255, 136, 0.2)",
                    border: "2px solid #00ff88",
                    borderRadius: "50%",
                    width: "60px",
                    height: "60px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "24px",
                    color: "#00ff88",
                    zIndex: 10,
                    backdropFilter: "blur(10px)"
                  }}>
                    ✓
                  </div>
                )}
                {dragOffset < 0 && (
                  <div style={{
                    position: "absolute",
                    top: "50%",
                    left: "20px",
                    transform: "translateY(-50%)",
                    background: "rgba(255, 100, 100, 0.2)",
                    border: "2px solid #ff6464",
                    borderRadius: "50%",
                    width: "60px",
                    height: "60px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "24px",
                    color: "#ff6464",
                    zIndex: 10,
                    backdropFilter: "blur(10px)"
                  }}>
                    ✕
                  </div>
                )}
              </>
            )}

            {/* Professional Match Badge */}
            <div style={{
              position: "absolute",
              top: "24px",
              right: "24px",
              background: "rgba(255, 255, 255, 0.05)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              borderRadius: "8px",
              padding: "8px 12px",
              textAlign: "center",
              backdropFilter: "blur(10px)"
            }}>
              <div style={{
                fontSize: "14px",
                fontWeight: "600",
                color: "#ffffff",
                lineHeight: 1
              }}>
                {currentProfile.matchPercentage}%
              </div>
              <div style={{
                fontSize: "10px",
                color: "rgba(255, 255, 255, 0.6)",
                marginTop: "2px",
                fontWeight: "500"
              }}>
                Match
              </div>
            </div>

            {/* Professional Avatar */}
            <div style={{
              position: "relative",
              marginBottom: "24px"
            }}>
              <div style={{
                width: "72px",
                height: "72px",
                borderRadius: "50%",
                background: "rgba(255, 255, 255, 0.08)",
                border: "1px solid rgba(255, 255, 255, 0.12)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "20px",
                fontWeight: "600",
                color: "#ffffff",
                backdropFilter: "blur(10px)"
              }}>
                {currentProfile.avatar}
              </div>
              {currentProfile.isOnline && (
                <div style={{
                  position: "absolute",
                  bottom: "2px",
                  right: "2px",
                  width: "14px",
                  height: "14px",
                  borderRadius: "50%",
                  background: "#10b981",
                  border: "2px solid #000000"
                }}></div>
              )}
            </div>

            {/* Professional Profile Info */}
            <div style={{ marginBottom: "24px" }}>
              <h2 style={{
                fontSize: "28px",
                fontWeight: "600",
                margin: "0 0 6px",
                color: "#ffffff",
                letterSpacing: "-0.5px",
                lineHeight: "1.2"
              }}>
                {currentProfile.name}
              </h2>
              <p style={{
                fontSize: "16px",
                color: "rgba(255,255,255,0.7)",
                margin: "0 0 16px",
                fontWeight: "400",
                letterSpacing: "-0.2px"
              }}>
                {currentProfile.title}
              </p>
              <div style={{
                display: "inline-block",
                background: "rgba(255, 255, 255, 0.05)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                borderRadius: "6px",
                padding: "6px 12px",
                fontSize: "12px",
                color: "rgba(255, 255, 255, 0.8)",
                fontWeight: "500",
                letterSpacing: "0.3px",
                textTransform: "uppercase"
              }}>
                {currentProfile.industry}
              </div>
            </div>

            {/* Professional Match Description Card */}
            <div style={{
              background: "rgba(255, 255, 255, 0.03)",
              border: "1px solid rgba(255, 255, 255, 0.06)",
              borderRadius: "12px",
              padding: "20px",
              marginBottom: "24px",
              display: "flex",
              alignItems: "center",
              gap: "16px"
            }}>
              <span style={{ fontSize: "20px" }}>
                {getMatchEmoji(currentProfile.matchPercentage)}
              </span>
              <div>
                <div style={{
                  fontSize: "16px",
                  fontWeight: "500",
                  color: "#fff",
                  marginBottom: "4px"
                }}>
                  {currentProfile.matchDescription}
                </div>
                <div style={{
                  fontSize: "12px",
                  color: "rgba(255,255,255,0.6)"
                }}>
                  {currentProfile.matchReason}
                </div>
              </div>
            </div>

            {/* Professional Action Buttons */}
            <div style={{
              display: "flex",
              gap: "12px"
            }}>
              <button
                onClick={handlePass}
                style={{
                  flex: 1,
                  padding: "14px 20px",
                  background: "rgba(255, 255, 255, 0.05)",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  borderRadius: "8px",
                  color: "rgba(255, 255, 255, 0.8)",
                  fontSize: "14px",
                  fontWeight: "500",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  backdropFilter: "blur(10px)"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(255, 255, 255, 0.08)";
                  e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.15)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(255, 255, 255, 0.05)";
                  e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.1)";
                }}
              >
                ✕ Pass
              </button>
              <button
                onClick={handleConnect}
                style={{
                  flex: 1,
                  padding: "14px 20px",
                  background: "rgba(255, 255, 255, 0.1)",
                  border: "1px solid rgba(255, 255, 255, 0.2)",
                  borderRadius: "8px",
                  color: "#ffffff",
                  fontSize: "14px",
                  fontWeight: "600",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  backdropFilter: "blur(10px)"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(255, 255, 255, 0.15)";
                  e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.3)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(255, 255, 255, 0.1)";
                  e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.2)";
                }}
              >
                ♥ Connect
              </button>
            </div>
          </div>
        ) : (
          <div style={{
            textAlign: "center",
            color: "rgba(255,255,255,0.7)",
            padding: "60px 20px"
          }}>
            <div style={{ fontSize: "64px", marginBottom: "24px" }}>🚀</div>
            <h2 style={{ fontSize: "28px", marginBottom: "16px", color: "#fff", fontWeight: "300" }}>
              That's all the geniuses we have for today!
            </h2>
            <p style={{ fontSize: "18px", marginBottom: "32px", color: "rgba(255,255,255,0.6)" }}>
              Check back tomorrow for more amazing founders to connect with
            </p>
            <div style={{
              background: "rgba(16, 185, 129, 0.1)",
              border: "1px solid rgba(16, 185, 129, 0.3)",
              borderRadius: "12px",
              padding: "20px",
              maxWidth: "400px",
              margin: "0 auto"
            }}>
              <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.8)", margin: 0 }}>
                💡 <strong>Pro tip:</strong> Complete your profile to get better matches and increase your chances of finding the perfect cofounder!
              </p>
            </div>
          </div>
        )}
        </div>

        {/* Swipe Instructions */}
        <div style={{
          textAlign: "center",
          marginTop: "24px",
          marginBottom: "16px"
        }}>
          <p style={{
            color: "rgba(255, 255, 255, 0.6)",
            fontSize: "14px",
            margin: 0,
            fontWeight: "500"
          }}>
            Use ← → arrow keys or click buttons to swipe
          </p>
        </div>

        {/* Founder Score & Progress - Moved Below Profile Cards */}
      <div style={{
        marginTop: "40px",
        display: "flex",
        justifyContent: "center",
        gap: "24px",
        flexWrap: "wrap"
      }}>
        {/* Founder Score */}
        <div style={{
          background: "rgba(255, 255, 255, 0.05)",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          borderRadius: "16px",
          padding: "20px",
          backdropFilter: "blur(10px)",
          textAlign: "center",
          minWidth: "200px"
        }}>
          <div style={{
            fontSize: "36px",
            fontWeight: "700",
            color: "#ffffff",
            marginBottom: "8px",
            background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent"
          }}>
            {founderScore}
          </div>
          <div style={{ fontSize: "14px", color: "rgba(255, 255, 255, 0.6)", fontWeight: "500" }}>
            Founder Score
          </div>
          <div style={{
            width: "100%",
            height: "4px",
            background: "rgba(255, 255, 255, 0.1)",
            borderRadius: "2px",
            marginTop: "12px",
            overflow: "hidden"
          }}>
            <div style={{
              width: `${founderScore}%`,
              height: "100%",
              background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
              borderRadius: "2px",
              transition: "width 0.3s ease"
            }}></div>
          </div>
        </div>

        {/* Weekly Goals */}
        <div style={{
          background: "rgba(255, 255, 255, 0.05)",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          borderRadius: "16px",
          padding: "20px",
          backdropFilter: "blur(10px)",
          minWidth: "300px",
          textAlign: "left"
        }}>
          <h3 style={{
            fontSize: "16px",
            fontWeight: "600",
            color: "#ffffff",
            margin: "0 0 16px",
            textAlign: "center"
          }}>
            Weekly Goals
          </h3>
          {weeklyGoals.map((goal) => (
            <div key={goal.id} style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              marginBottom: "12px"
            }}>
              <div style={{
                width: "20px",
                height: "20px",
                borderRadius: "50%",
                background: goal.completed ? "#10b981" : "rgba(255, 255, 255, 0.1)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "12px",
                color: goal.completed ? "#000" : "rgba(255, 255, 255, 0.6)"
              }}>
                {goal.completed ? "✓" : goal.progress}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{
                  fontSize: "13px",
                  color: "#ffffff",
                  fontWeight: "500",
                  marginBottom: "2px"
                }}>
                  {goal.title}
                </div>
                <div style={{
                  fontSize: "11px",
                  color: "rgba(255, 255, 255, 0.6)"
                }}>
                  {goal.progress}/{goal.target} completed
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Recent Achievements */}
        <div style={{
          background: "rgba(255, 255, 255, 0.05)",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          borderRadius: "16px",
          padding: "20px",
          backdropFilter: "blur(10px)",
          minWidth: "250px"
        }}>
          <h3 style={{
            fontSize: "16px",
            fontWeight: "600",
            color: "#ffffff",
            margin: "0 0 16px",
            textAlign: "center"
          }}>
            Recent Achievements
          </h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {achievements.filter(a => a.unlocked).slice(0, 3).map((achievement) => (
              <div key={achievement.id} style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                padding: "8px",
                background: "rgba(16, 185, 129, 0.1)",
                borderRadius: "8px",
                border: "1px solid rgba(16, 185, 129, 0.2)"
              }}>
                <span style={{ fontSize: "16px" }}>{achievement.icon}</span>
                <div>
                  <div style={{
                    fontSize: "12px",
                    color: "#10b981",
                    fontWeight: "600"
                  }}>
                    {achievement.title}
                  </div>
                  <div style={{
                    fontSize: "10px",
                    color: "rgba(255, 255, 255, 0.6)"
                  }}>
                    {achievement.description}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Stats Section - Moved Below Dashboard Stats */}
      <div style={{
        marginTop: "40px",
        display: "flex",
        justifyContent: "center",
        gap: "24px"
      }}>
        <div style={{
          background: "rgba(255, 255, 255, 0.05)",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          borderRadius: "12px",
          padding: "16px 20px",
          backdropFilter: "blur(10px)",
          textAlign: "center"
        }}>
          <div style={{ fontSize: "24px", fontWeight: "600", color: "#ffffff", marginBottom: "4px" }}>
            {profiles.length}
          </div>
          <div style={{ fontSize: "12px", color: "rgba(255, 255, 255, 0.6)", fontWeight: "500" }}>
            Available Profiles
          </div>
        </div>
        <div style={{
          background: "rgba(255, 255, 255, 0.05)",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          borderRadius: "12px",
          padding: "16px 20px",
          backdropFilter: "blur(10px)",
          textAlign: "center"
        }}>
          <div style={{ fontSize: "24px", fontWeight: "600", color: "#ffffff", marginBottom: "4px" }}>
            {connections.length}
          </div>
          <div style={{ fontSize: "12px", color: "rgba(255, 255, 255, 0.6)", fontWeight: "500" }}>
            Connections
          </div>
        </div>
        <div style={{
          background: "rgba(255, 255, 255, 0.05)",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          borderRadius: "12px",
          padding: "16px 20px",
          backdropFilter: "blur(10px)",
          textAlign: "center"
        }}>
          <div style={{ fontSize: "24px", fontWeight: "600", color: "#ffffff", marginBottom: "4px" }}>
            {matches.length}
          </div>
          <div style={{ fontSize: "12px", color: "rgba(255, 255, 255, 0.6)", fontWeight: "500" }}>
            Matches Today
          </div>
        </div>
      </div>
      </div>
    </Layout>
  );
}
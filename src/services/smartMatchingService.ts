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

// interface MatchingCriteria {
//   industry: string[];
//   skills: string[];
//   experience: number;
//   location: string;
//   fundingStage: string;
//   teamSize: number;
//   interests: string[];
//   goals: string[];
// }

export const smartMatchingService = {
  // Calculate compatibility score between two founders
  calculateCompatibility(profile1: FounderProfile, profile2: FounderProfile): number {
    let score = 0;
    let factors = 0;

    // Industry compatibility (30% weight)
    if (profile1.industry === profile2.industry) {
      score += 30;
    } else if (this.getRelatedIndustries(profile1.industry).includes(profile2.industry)) {
      score += 20;
    }
    factors++;

    // Skills overlap (25% weight)
    const skillOverlap = this.calculateSkillOverlap(profile1.skills, profile2.skills);
    score += skillOverlap * 25;
    factors++;

    // Experience level compatibility (15% weight)
    const experienceScore = this.calculateExperienceCompatibility(profile1.experience, profile2.experience);
    score += experienceScore * 15;
    factors++;

    // Location compatibility (10% weight)
    if (profile1.location === profile2.location) {
      score += 10;
    } else if (this.getNearbyLocations(profile1.location).includes(profile2.location)) {
      score += 5;
    }
    factors++;

    // Funding stage compatibility (10% weight)
    const fundingScore = this.calculateFundingCompatibility(profile1.fundingStage, profile2.fundingStage);
    score += fundingScore * 10;
    factors++;

    // Team size compatibility (5% weight)
    const teamSizeScore = this.calculateTeamSizeCompatibility(profile1.teamSize, profile2.teamSize);
    score += teamSizeScore * 5;
    factors++;

    // Interests overlap (3% weight)
    const interestOverlap = this.calculateInterestOverlap(profile1.interests, profile2.interests);
    score += interestOverlap * 3;
    factors++;

    // Goals alignment (2% weight)
    const goalsAlignment = this.calculateGoalsAlignment(profile1.goals, profile2.goals);
    score += goalsAlignment * 2;
    factors++;

    return Math.round(score);
  },

  // Get related industries for better matching
  getRelatedIndustries(industry: string): string[] {
    const industryMap: { [key: string]: string[] } = {
      "AI/ML": ["Technology", "Software", "Healthcare", "FinTech"],
      "FinTech": ["Technology", "AI/ML", "E-Commerce"],
      "Healthcare": ["AI/ML", "Technology", "Software"],
      "E-Commerce": ["FinTech", "Technology", "Software"],
      "Technology": ["AI/ML", "Software", "FinTech", "Healthcare"],
      "Software": ["Technology", "AI/ML", "E-Commerce"]
    };
    return industryMap[industry] || [];
  },

  // Calculate skill overlap percentage
  calculateSkillOverlap(skills1: string[], skills2: string[]): number {
    if (skills1.length === 0 || skills2.length === 0) return 0;
    const intersection = skills1.filter(skill => skills2.includes(skill));
    return intersection.length / Math.max(skills1.length, skills2.length);
  },

  // Calculate experience compatibility
  calculateExperienceCompatibility(exp1: number, exp2: number): number {
    const diff = Math.abs(exp1 - exp2);
    if (diff <= 1) return 1; // Perfect match
    if (diff <= 3) return 0.7; // Good match
    if (diff <= 5) return 0.4; // Fair match
    return 0.1; // Poor match
  },

  // Get nearby locations
  getNearbyLocations(location: string): string[] {
    const locationMap: { [key: string]: string[] } = {
      "Mumbai": ["Pune", "Bangalore"],
      "Bangalore": ["Chennai", "Hyderabad", "Mumbai"],
      "Delhi": ["Gurgaon", "Noida"],
      "Pune": ["Mumbai", "Bangalore"],
      "Chennai": ["Bangalore", "Hyderabad"],
      "Hyderabad": ["Bangalore", "Chennai"]
    };
    return locationMap[location] || [];
  },

  // Calculate funding stage compatibility
  calculateFundingCompatibility(stage1: string, stage2: string): number {
    const stages = ["Idea", "MVP", "Seed", "Series A", "Series B", "Series C+"];
    const index1 = stages.indexOf(stage1);
    const index2 = stages.indexOf(stage2);
    
    if (index1 === -1 || index2 === -1) return 0.5;
    
    const diff = Math.abs(index1 - index2);
    if (diff === 0) return 1; // Same stage
    if (diff === 1) return 0.8; // Adjacent stages
    if (diff === 2) return 0.5; // Two stages apart
    return 0.2; // Very different stages
  },

  // Calculate team size compatibility
  calculateTeamSizeCompatibility(size1: number, size2: number): number {
    const diff = Math.abs(size1 - size2);
    if (diff <= 2) return 1; // Similar team sizes
    if (diff <= 5) return 0.6; // Somewhat different
    return 0.3; // Very different team sizes
  },

  // Calculate interests overlap
  calculateInterestOverlap(interests1: string[], interests2: string[]): number {
    if (interests1.length === 0 || interests2.length === 0) return 0;
    const intersection = interests1.filter(interest => interests2.includes(interest));
    return intersection.length / Math.max(interests1.length, interests2.length);
  },

  // Calculate goals alignment
  calculateGoalsAlignment(goals1: string[], goals2: string[]): number {
    if (goals1.length === 0 || goals2.length === 0) return 0;
    const intersection = goals1.filter(goal => goals2.includes(goal));
    return intersection.length / Math.max(goals1.length, goals2.length);
  },

  // Get match reason based on highest scoring factors
  getMatchReason(profile1: FounderProfile, profile2: FounderProfile): string {
    const reasons = [];

    // Check industry match
    if (profile1.industry === profile2.industry) {
      reasons.push(`Both in ${profile1.industry}`);
    } else if (this.getRelatedIndustries(profile1.industry).includes(profile2.industry)) {
      reasons.push(`Related industries: ${profile1.industry} & ${profile2.industry}`);
    }

    // Check skills overlap
    const skillOverlap = this.calculateSkillOverlap(profile1.skills, profile2.skills);
    if (skillOverlap > 0.5) {
      const commonSkills = profile1.skills.filter(skill => profile2.skills.includes(skill));
      reasons.push(`Shared skills: ${commonSkills.slice(0, 2).join(", ")}`);
    }

    // Check experience compatibility
    const experienceScore = this.calculateExperienceCompatibility(profile1.experience, profile2.experience);
    if (experienceScore > 0.7) {
      reasons.push("Similar experience levels");
    }

    // Check location
    if (profile1.location === profile2.location) {
      reasons.push(`Both in ${profile1.location}`);
    }

    // Check funding stage
    const fundingScore = this.calculateFundingCompatibility(profile1.fundingStage, profile2.fundingStage);
    if (fundingScore > 0.7) {
      reasons.push(`Similar funding stage: ${profile1.fundingStage}`);
    }

    return reasons.length > 0 ? reasons.slice(0, 2).join(" • ") : "Potential collaboration opportunity";
  },

  // Get match description based on score
  getMatchDescription(score: number): string {
    if (score >= 90) return "Excellent Match";
    if (score >= 80) return "Great Match";
    if (score >= 70) return "Good Match";
    if (score >= 60) return "Fair Match";
    if (score >= 50) return "Potential Match";
    return "Low Match";
  },

  // Get match emoji based on score
  getMatchEmoji(score: number): string {
    if (score >= 90) return "🔥";
    if (score >= 80) return "⭐";
    if (score >= 70) return "👍";
    if (score >= 60) return "🤔";
    if (score >= 50) return "👀";
    return "❌";
  },

  // Sort profiles by compatibility score
  sortByCompatibility(currentUser: FounderProfile, profiles: FounderProfile[]): FounderProfile[] {
    return profiles
      .map(profile => ({
        ...profile,
        matchPercentage: this.calculateCompatibility(currentUser, profile),
        matchReason: this.getMatchReason(currentUser, profile),
        matchDescription: this.getMatchDescription(this.calculateCompatibility(currentUser, profile))
      }))
      .sort((a, b) => b.matchPercentage - a.matchPercentage);
  },

  // Get personalized recommendations
  getRecommendations(currentUser: FounderProfile, allProfiles: FounderProfile[]): FounderProfile[] {
    const sortedProfiles = this.sortByCompatibility(currentUser, allProfiles);
    
    // Filter out low matches and return top recommendations
    return sortedProfiles
      .filter(profile => profile.matchPercentage >= 60)
      .slice(0, 10); // Return top 10 matches
  }
};

// AI Service for Circle X
// Generates smart conversation starters and recommendations

export interface ConversationStarter {
  id: string;
  type: 'question' | 'comment' | 'collaboration' | 'advice';
  text: string;
  context: string;
  confidence: number;
}

export interface SmartRecommendation {
  id: string;
  type: 'connection' | 'event' | 'resource' | 'opportunity';
  title: string;
  description: string;
  reason: string;
  priority: 'high' | 'medium' | 'low';
  actionText: string;
}

export const aiService = {
  // Generate conversation starters based on profiles
  generateConversationStarters(userProfile: any, targetProfile: any): ConversationStarter[] {
    const starters: ConversationStarter[] = [];

    // Industry-based starters
    if (userProfile.industry === targetProfile.industry) {
      starters.push({
        id: 'industry_1',
        type: 'question',
        text: `I see you're also in ${targetProfile.industry}. What's the biggest challenge you're facing right now?`,
        context: 'Same industry experience',
        confidence: 0.9
      });
    }

    // Skills-based starters
    const commonSkills = userProfile.skills?.filter((skill: string) => 
      targetProfile.skills?.includes(skill)
    ) || [];
    
    if (commonSkills.length > 0) {
      starters.push({
        id: 'skills_1',
        type: 'collaboration',
        text: `I noticed we both work with ${commonSkills[0]}. Would love to exchange insights on best practices!`,
        context: 'Shared technical skills',
        confidence: 0.8
      });
    }

    // Location-based starters
    if (userProfile.location === targetProfile.location) {
      starters.push({
        id: 'location_1',
        type: 'comment',
        text: `Great to see another founder from ${targetProfile.location}! The startup scene here is really heating up.`,
        context: 'Same city',
        confidence: 0.7
      });
    }

    // Goals-based starters
    const commonGoals = userProfile.goals?.filter((goal: string) => 
      targetProfile.goals?.includes(goal)
    ) || [];
    
    if (commonGoals.length > 0) {
      starters.push({
        id: 'goals_1',
        type: 'advice',
        text: `I'm also working on ${commonGoals[0].toLowerCase()}. Would love to hear about your approach!`,
        context: 'Shared goals',
        confidence: 0.85
      });
    }

    // Experience-based starters
    if (userProfile.experience && targetProfile.experience) {
      const expDiff = Math.abs(userProfile.experience - targetProfile.experience);
      if (expDiff <= 2) {
        starters.push({
          id: 'experience_1',
          type: 'question',
          text: `We have similar experience levels. What's been your biggest learning in the past year?`,
          context: 'Similar experience level',
          confidence: 0.75
        });
      } else if (targetProfile.experience > userProfile.experience) {
        starters.push({
          id: 'experience_2',
          type: 'advice',
          text: `I'd love to learn from your experience. What advice would you give to someone at my stage?`,
          context: 'Mentorship opportunity',
          confidence: 0.8
        });
      }
    }

    // Funding stage-based starters
    if (userProfile.fundingStage === targetProfile.fundingStage) {
      starters.push({
        id: 'funding_1',
        type: 'question',
        text: `We're both at the ${targetProfile.fundingStage} stage. How are you approaching your next funding round?`,
        context: 'Same funding stage',
        confidence: 0.8
      });
    }

    // Team size-based starters
    if (userProfile.teamSize && targetProfile.teamSize) {
      const teamDiff = Math.abs(userProfile.teamSize - targetProfile.teamSize);
      if (teamDiff <= 3) {
        starters.push({
          id: 'team_1',
          type: 'collaboration',
          text: `We have similar team sizes. How do you handle scaling your team culture?`,
          context: 'Similar team size',
          confidence: 0.7
        });
      }
    }

    // Generic high-quality starters
    starters.push({
      id: 'generic_1',
      type: 'question',
      text: `What's the most exciting thing you're working on right now?`,
      context: 'General engagement',
      confidence: 0.6
    });

    starters.push({
      id: 'generic_2',
      type: 'comment',
      text: `Your company ${targetProfile.title?.split(' at ')[1] || 'sounds interesting'}. What problem are you solving?`,
      context: 'Company interest',
      confidence: 0.65
    });

    // Sort by confidence and return top 5
    return starters
      .sort((a, b) => b.confidence - a.confidence)
      .slice(0, 5);
  },

  // Generate smart recommendations
  generateSmartRecommendations(userProfile: any): SmartRecommendation[] {
    const recommendations: SmartRecommendation[] = [];

    // Connection recommendations
    if (userProfile.goals?.includes('Find Co-founder')) {
      recommendations.push({
        id: 'rec_1',
        type: 'connection',
        title: 'Find Technical Co-founder',
        description: 'Connect with developers who complement your skills',
        reason: 'Based on your goal to find a co-founder',
        priority: 'high',
        actionText: 'Browse Technical Profiles'
      });
    }

    if (userProfile.goals?.includes('Raise Funding')) {
      recommendations.push({
        id: 'rec_2',
        type: 'connection',
        title: 'Connect with Investors',
        description: 'Meet VCs and angels in your industry',
        reason: 'Based on your funding goals',
        priority: 'high',
        actionText: 'View Investor Profiles'
      });
    }

    // Event recommendations
    if (userProfile.industry === 'FinTech') {
      recommendations.push({
        id: 'rec_3',
        type: 'event',
        title: 'FinTech India Summit 2024',
        description: 'Join 500+ fintech founders and investors',
        reason: 'Matches your industry focus',
        priority: 'medium',
        actionText: 'Register for Event'
      });
    }

    // Resource recommendations
    if (userProfile.fundingStage === 'Pre-Seed') {
      recommendations.push({
        id: 'rec_4',
        type: 'resource',
        title: 'Pre-Seed Funding Guide',
        description: 'Complete guide to raising your first round',
        reason: 'Based on your current funding stage',
        priority: 'medium',
        actionText: 'Read Guide'
      });
    }

    // Opportunity recommendations
    if (userProfile.location === 'Bangalore') {
      recommendations.push({
        id: 'rec_5',
        type: 'opportunity',
        title: 'Bangalore Startup Accelerator',
        description: 'Apply for 3-month accelerator program',
        reason: 'Based on your location and stage',
        priority: 'high',
        actionText: 'Apply Now'
      });
    }

    return recommendations.sort((a, b) => {
      const priorityOrder = { high: 3, medium: 2, low: 1 };
      return priorityOrder[b.priority] - priorityOrder[a.priority];
    });
  },

  // Generate match explanation
  generateMatchExplanation(userProfile: any, targetProfile: any, _matchPercentage: number): string {
    const reasons: string[] = [];

    if (userProfile.industry === targetProfile.industry) {
      reasons.push('Same industry focus');
    }

    const commonSkills = userProfile.skills?.filter((skill: string) => 
      targetProfile.skills?.includes(skill)
    ) || [];
    if (commonSkills.length > 0) {
      reasons.push(`${commonSkills.length} shared skills`);
    }

    if (userProfile.location === targetProfile.location) {
      reasons.push('Same location');
    }

    const commonGoals = userProfile.goals?.filter((goal: string) => 
      targetProfile.goals?.includes(goal)
    ) || [];
    if (commonGoals.length > 0) {
      reasons.push(`${commonGoals.length} shared goals`);
    }

    if (userProfile.fundingStage === targetProfile.fundingStage) {
      reasons.push('Same funding stage');
    }

    if (reasons.length === 0) {
      return 'Good potential for collaboration';
    }

    return `High match because of ${reasons.join(', ')}`;
  },

  // Generate personalized greeting
  generatePersonalizedGreeting(_userProfile: any, targetProfile: any): string {
    const greetings = [
      `Hi ${targetProfile.name}! I noticed we're both in ${targetProfile.industry}.`,
      `Hello ${targetProfile.name}! Your work at ${targetProfile.title?.split(' at ')[1] || 'your company'} caught my attention.`,
      `Hey ${targetProfile.name}! Great to see another founder from ${targetProfile.location}.`,
      `Hi there ${targetProfile.name}! I'd love to connect and learn about your journey.`
    ];

    return greetings[Math.floor(Math.random() * greetings.length)];
  }
};

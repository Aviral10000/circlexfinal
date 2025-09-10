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

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  points: number;
  category: 'profile' | 'network' | 'activity' | 'growth' | 'milestone';
  unlocked: boolean;
  unlockedAt?: Date;
}

interface ScoreBreakdown {
  profile: number;
  network: number;
  activity: number;
  growth: number;
  total: number;
}

export const founderScoreService = {
  // Calculate overall founder score
  calculateFounderScore(metrics: FounderMetrics): ScoreBreakdown {
    const profile = Math.min(metrics.profileCompleteness * 0.3, 30);
    const network = Math.min((metrics.connections + metrics.matches) * 0.5, 25);
    const activity = Math.min((metrics.eventsAttended + metrics.mentorshipApplications + metrics.investorPitches) * 2, 25);
    const growth = Math.min((metrics.ideaValidationScore + metrics.achievements * 5) * 0.2, 20);
    
    const total = Math.round(profile + network + activity + growth);
    
    return {
      profile: Math.round(profile),
      network: Math.round(network),
      activity: Math.round(activity),
      growth: Math.round(growth),
      total
    };
  },

  // Get score level and description
  getScoreLevel(score: number): { level: string; description: string; color: string; icon: string } {
    if (score >= 90) {
      return {
        level: "Elite Founder",
        description: "You're among the top founders in the network!",
        color: "#10b981",
        icon: "🏆"
      };
    } else if (score >= 80) {
      return {
        level: "Advanced Founder",
        description: "You're making excellent progress in your founder journey!",
        color: "#3b82f6",
        icon: "⭐"
      };
    } else if (score >= 70) {
      return {
        level: "Experienced Founder",
        description: "You're building strong foundations for success!",
        color: "#8b5cf6",
        icon: "🚀"
      };
    } else if (score >= 60) {
      return {
        level: "Growing Founder",
        description: "You're on the right track! Keep building your network.",
        color: "#f59e0b",
        icon: "📈"
      };
    } else if (score >= 50) {
      return {
        level: "Emerging Founder",
        description: "Great start! Focus on completing your profile and making connections.",
        color: "#ef4444",
        icon: "🌱"
      };
    } else {
      return {
        level: "New Founder",
        description: "Welcome! Let's get you started on your founder journey.",
        color: "#6b7280",
        icon: "👋"
      };
    }
  },

  // Get achievements based on metrics
  getAchievements(metrics: FounderMetrics): Achievement[] {
    const achievements: Achievement[] = [
      {
        id: "profile_complete",
        title: "Profile Perfectionist",
        description: "Complete your profile to 100%",
        icon: "✅",
        points: 10,
        category: "profile",
        unlocked: metrics.profileCompleteness >= 100
      },
      {
        id: "first_connection",
        title: "First Connection",
        description: "Make your first connection",
        icon: "🤝",
        points: 5,
        category: "network",
        unlocked: metrics.connections >= 1
      },
      {
        id: "network_builder",
        title: "Network Builder",
        description: "Connect with 10 founders",
        icon: "🌐",
        points: 15,
        category: "network",
        unlocked: metrics.connections >= 10
      },
      {
        id: "match_maker",
        title: "Match Maker",
        description: "Get 5 mutual matches",
        icon: "💕",
        points: 20,
        category: "network",
        unlocked: metrics.matches >= 5
      },
      {
        id: "event_enthusiast",
        title: "Event Enthusiast",
        description: "Attend 3 virtual events",
        icon: "🎪",
        points: 10,
        category: "activity",
        unlocked: metrics.eventsAttended >= 3
      },
      {
        id: "mentorship_seeker",
        title: "Mentorship Seeker",
        description: "Apply for mentorship",
        icon: "🎓",
        points: 8,
        category: "activity",
        unlocked: metrics.mentorshipApplications >= 1
      },
      {
        id: "pitch_perfect",
        title: "Pitch Perfect",
        description: "Pitch to investors",
        icon: "💰",
        points: 25,
        category: "activity",
        unlocked: metrics.investorPitches >= 1
      },
      {
        id: "validation_master",
        title: "Validation Master",
        description: "Complete idea validation with 80%+ score",
        icon: "💡",
        points: 20,
        category: "growth",
        unlocked: metrics.ideaValidationScore >= 80
      },
      {
        id: "achievement_hunter",
        title: "Achievement Hunter",
        description: "Unlock 5 achievements",
        icon: "🏅",
        points: 15,
        category: "milestone",
        unlocked: metrics.achievements >= 5
      },
      {
        id: "founder_legend",
        title: "Founder Legend",
        description: "Reach 90+ founder score",
        icon: "👑",
        points: 30,
        category: "milestone",
        unlocked: false // Will be calculated based on total score
      }
    ];

    // Update founder legend achievement based on total score
    const totalScore = this.calculateFounderScore(metrics).total;
    achievements[achievements.length - 1].unlocked = totalScore >= 90;

    return achievements;
  },

  // Get next recommended actions
  getRecommendedActions(metrics: FounderMetrics, scoreBreakdown: ScoreBreakdown): string[] {
    const actions: string[] = [];

    if (scoreBreakdown.profile < 25) {
      actions.push("Complete your profile to increase your score");
    }

    if (scoreBreakdown.network < 20) {
      actions.push("Make more connections to build your network");
    }

    if (scoreBreakdown.activity < 20) {
      actions.push("Attend virtual events and apply for mentorship");
    }

    if (scoreBreakdown.growth < 15) {
      actions.push("Complete idea validation and unlock achievements");
    }

    if (metrics.connections < 5) {
      actions.push("Connect with at least 5 founders this week");
    }

    if (metrics.eventsAttended === 0) {
      actions.push("Register for your first virtual event");
    }

    if (metrics.mentorshipApplications === 0) {
      actions.push("Apply for mentorship to accelerate your growth");
    }

    if (metrics.investorPitches === 0 && metrics.ideaValidationScore >= 70) {
      actions.push("Ready to pitch? Apply to investor events");
    }

    return actions.slice(0, 3); // Return top 3 recommendations
  },

  // Get progress towards next level
  getProgressToNextLevel(currentScore: number): { current: number; next: number; progress: number; pointsNeeded: number } {
    const levels = [0, 50, 60, 70, 80, 90, 100];
    let currentLevel = 0;
    let nextLevel = 50;

    for (let i = 0; i < levels.length - 1; i++) {
      if (currentScore >= levels[i] && currentScore < levels[i + 1]) {
        currentLevel = levels[i];
        nextLevel = levels[i + 1];
        break;
      }
    }

    if (currentScore >= 90) {
      currentLevel = 90;
      nextLevel = 100;
    }

    const progress = ((currentScore - currentLevel) / (nextLevel - currentLevel)) * 100;
    const pointsNeeded = nextLevel - currentScore;

    return {
      current: currentLevel,
      next: nextLevel,
      progress: Math.min(progress, 100),
      pointsNeeded: Math.max(pointsNeeded, 0)
    };
  },

  // Get weekly goals based on current metrics
  getWeeklyGoals(metrics: FounderMetrics): { title: string; target: number; current: number; completed: boolean }[] {
    return [
      {
        title: "Make 3 new connections",
        target: 3,
        current: Math.min(metrics.connections, 3),
        completed: metrics.connections >= 3
      },
      {
        title: "Attend 1 virtual event",
        target: 1,
        current: Math.min(metrics.eventsAttended, 1),
        completed: metrics.eventsAttended >= 1
      },
      {
        title: "Apply for 1 mentorship",
        target: 1,
        current: Math.min(metrics.mentorshipApplications, 1),
        completed: metrics.mentorshipApplications >= 1
      },
      {
        title: "Complete 1 achievement",
        target: 1,
        current: Math.min(metrics.achievements, 1),
        completed: metrics.achievements >= 1
      }
    ];
  },

  // Get score history (mock data for now)
  getScoreHistory(): { date: string; score: number }[] {
    const history = [];
    const today = new Date();
    
    for (let i = 29; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      
      // Mock score progression
      const baseScore = 45;
      const dailyIncrease = Math.random() * 2;
      const score = Math.min(baseScore + (30 - i) * 1.5 + dailyIncrease, 95);
      
      history.push({
        date: date.toISOString().split('T')[0],
        score: Math.round(score)
      });
    }
    
    return history;
  }
};

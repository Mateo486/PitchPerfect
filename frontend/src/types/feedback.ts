export interface FeedbackScore {
    category: string;
    score: number; // 0-100
    maxScore: number;
    icon: string;
  }
  
  export interface FeedbackInsight {
    type: 'strength' | 'improvement' | 'tip';
    title: string;
    description: string;
    icon: string;
  }
  
  export interface KeyMoment {
    timestamp: string;
    quote: string;
    feedback: string;
    sentiment: 'positive' | 'neutral' | 'negative';
  }
  
  export interface ConversationFeedback {
    id: string;
    overallScore: number;
    scores: FeedbackScore[];
    insights: FeedbackInsight[];
    keyMoments: KeyMoment[];
    summary: string;
    nextSteps: string[];
    conversationLength: string;
    completedAt: Date;
  }
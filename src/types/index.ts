export interface Profile {
  id: string;
  display_name: string;
  school: string;
  avatar_emoji: string;
  total_xp: number;
  current_streak: number;
  longest_streak: number;
  last_active: string | null;
  created_at: string;
}

export interface QuizAttempt {
  id: string;
  user_id: string;
  topic_id: string;
  score: number;
  total_questions: number;
  percentage: number;
  time_taken_seconds: number | null;
  xp_earned: number;
  created_at: string;
}

export interface CodeSubmission {
  id: string;
  user_id: string;
  challenge_id: string;
  code: string;
  ai_feedback: string | null;
  ai_score: number | null;
  passed: boolean;
  xp_earned: number;
  created_at: string;
}

export interface LeaderboardEntry {
  id: string;
  display_name: string;
  school: string;
  avatar_emoji: string;
  total_xp: number;
  current_streak: number;
  topics_completed: number;
  avg_quiz_score: number;
  challenges_passed: number;
  rank: number;
}

export interface OOPModule {
  id: string;
  number: number;
  title: string;
  subtitle: string;
  icon: string;
  color: string;
  description: string;
  keyTerms: string[];
  sections: ModuleSection[];
}

export interface ModuleSection {
  type: 'definition' | 'analogy' | 'code' | 'pseudocode' | 'exam_tip' | 'table';
  title: string;
  content: string;
  language?: string;
}

export interface QuizQuestion {
  id: string;
  moduleId: string;
  type: 'multiple_choice' | 'code_reading' | 'short_answer' | 'code_completion';
  question: string;
  options?: string[];
  correctAnswer: string | number;
  explanation: string;
  marks: number;
  codeSnippet?: string;
  illustration?: string;
}

export interface CodingChallenge {
  id: string;
  moduleId: string;
  difficulty: 'easy' | 'medium' | 'hard';
  title: string;
  description: string;
  expectedBehavior: string;
  hints: string[];
  starterCode: string;
  sampleSolution: string;
  xpReward: number;
  exampleCode: string;
  exampleTitle: string;
}

export interface AiFeedback {
  score: number;
  passed: boolean;
  feedback: string;
  improvements: string[];
  vcaa_tip: string;
  pseudocode_connection: string;
}

export type RankTier = {
  name: string;
  emoji: string;
  minXp: number;
  maxXp: number;
  color: string;
  clearColor: string;
};

export const RANK_TIERS: RankTier[] = [
  { name: 'Seedling', emoji: '🌱', minXp: 0,    maxXp: 99,       color: '#4ade80', clearColor: '#15803d' },
  { name: 'Spark',    emoji: '⚡', minXp: 100,   maxXp: 299,      color: '#facc15', clearColor: '#92400e' },
  { name: 'Igniter',  emoji: '🔥', minXp: 300,   maxXp: 599,      color: '#fb923c', clearColor: '#c2410c' },
  { name: 'Crystal',  emoji: '💎', minXp: 600,   maxXp: 999,      color: '#22d3ee', clearColor: '#0e7490' },
  { name: 'Champion', emoji: '🏆', minXp: 1000,  maxXp: 1499,     color: '#a78bfa', clearColor: '#6d28d9' },
  { name: 'Legend',   emoji: '👑', minXp: 1500,  maxXp: Infinity, color: '#00FF41', clearColor: '#166534' },
];

export function getRankTier(xp: number): RankTier {
  return RANK_TIERS.find(t => xp >= t.minXp && xp <= t.maxXp) || RANK_TIERS[0];
}

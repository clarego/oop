import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          display_name: string;
          school: string;
          avatar_emoji: string;
          total_xp: number;
          current_streak: number;
          longest_streak: number;
          last_active: string | null;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['profiles']['Row'], 'created_at'>;
        Update: Partial<Database['public']['Tables']['profiles']['Insert']>;
      };
      quiz_attempts: {
        Row: {
          id: string;
          user_id: string;
          topic_id: string;
          score: number;
          total_questions: number;
          percentage: number;
          time_taken_seconds: number | null;
          xp_earned: number;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['quiz_attempts']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['quiz_attempts']['Insert']>;
      };
      code_submissions: {
        Row: {
          id: string;
          user_id: string;
          challenge_id: string;
          code: string;
          ai_feedback: string | null;
          ai_score: number | null;
          passed: boolean;
          xp_earned: number;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['code_submissions']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['code_submissions']['Insert']>;
      };
    };
    Views: {
      leaderboard: {
        Row: {
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
        };
      };
    };
  };
};

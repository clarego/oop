/*
  # OOP Mastery Platform — Initial Schema

  Creates the core tables for the VCE OOP Learning Platform.

  ## New Tables
  - `profiles` — Extended user profile linked to auth.users. Stores display name, school, XP, streaks.
  - `quiz_attempts` — Records each quiz attempt with score, time, and XP earned.
  - `code_submissions` — Stores coding challenge submissions with AI feedback and scores.

  ## Views
  - `leaderboard` — Aggregated ranking view combining profiles, quiz attempts, and code submissions.

  ## Security
  - RLS enabled on all tables
  - profiles: public read, authenticated user can insert/update own row
  - quiz_attempts: users can only access their own records
  - code_submissions: users can only access their own records
*/

CREATE TABLE IF NOT EXISTS profiles (
  id UUID REFERENCES auth.users PRIMARY KEY,
  display_name TEXT NOT NULL,
  school TEXT DEFAULT '',
  avatar_emoji TEXT DEFAULT '🎯',
  total_xp INTEGER DEFAULT 0,
  current_streak INTEGER DEFAULT 0,
  longest_streak INTEGER DEFAULT 0,
  last_active DATE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS quiz_attempts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id),
  topic_id TEXT NOT NULL,
  score INTEGER NOT NULL,
  total_questions INTEGER NOT NULL,
  percentage DECIMAL(5,2) NOT NULL,
  time_taken_seconds INTEGER,
  xp_earned INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS code_submissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id),
  challenge_id TEXT NOT NULL,
  code TEXT NOT NULL,
  ai_feedback TEXT,
  ai_score INTEGER,
  passed BOOLEAN DEFAULT FALSE,
  xp_earned INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE OR REPLACE VIEW leaderboard AS
SELECT
  p.id,
  p.display_name,
  p.school,
  p.avatar_emoji,
  p.total_xp,
  p.current_streak,
  COUNT(DISTINCT qa.topic_id) as topics_completed,
  COALESCE(AVG(qa.percentage), 0) as avg_quiz_score,
  COUNT(DISTINCT cs.challenge_id) FILTER (WHERE cs.passed = true) as challenges_passed,
  RANK() OVER (ORDER BY p.total_xp DESC) as rank
FROM profiles p
LEFT JOIN quiz_attempts qa ON p.id = qa.user_id
LEFT JOIN code_submissions cs ON p.id = cs.user_id
GROUP BY p.id, p.display_name, p.school, p.avatar_emoji, p.total_xp, p.current_streak;

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE quiz_attempts ENABLE ROW LEVEL SECURITY;
ALTER TABLE code_submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public profiles are viewable by everyone"
  ON profiles FOR SELECT
  USING (true);

CREATE POLICY "Users can insert own profile"
  ON profiles FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can view own quiz attempts"
  ON quiz_attempts FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own quiz attempts"
  ON quiz_attempts FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view own code submissions"
  ON code_submissions FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own code submissions"
  ON code_submissions FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

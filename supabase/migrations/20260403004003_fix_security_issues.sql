/*
  # Fix Security Issues

  ## Changes
  1. Add covering indexes for foreign keys on `quiz_attempts.user_id` and `code_submissions.user_id`
     to resolve unindexed foreign key warnings and improve query performance.

  2. Replace `auth.uid()` with `(select auth.uid())` in all RLS policies on `profiles`,
     `quiz_attempts`, and `code_submissions` tables to avoid re-evaluation per row.

  3. Recreate the `leaderboard` view without SECURITY DEFINER (use SECURITY INVOKER instead).
*/

-- 1. Add indexes for foreign keys
CREATE INDEX IF NOT EXISTS idx_quiz_attempts_user_id ON quiz_attempts(user_id);
CREATE INDEX IF NOT EXISTS idx_code_submissions_user_id ON code_submissions(user_id);

-- 2. Fix RLS policies on profiles
DROP POLICY IF EXISTS "Users can insert own profile" ON profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON profiles;

CREATE POLICY "Users can insert own profile"
  ON profiles FOR INSERT
  TO authenticated
  WITH CHECK ((select auth.uid()) = id);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  TO authenticated
  USING ((select auth.uid()) = id)
  WITH CHECK ((select auth.uid()) = id);

-- 3. Fix RLS policies on quiz_attempts
DROP POLICY IF EXISTS "Users can view own quiz attempts" ON quiz_attempts;
DROP POLICY IF EXISTS "Users can insert own quiz attempts" ON quiz_attempts;

CREATE POLICY "Users can view own quiz attempts"
  ON quiz_attempts FOR SELECT
  TO authenticated
  USING ((select auth.uid()) = user_id);

CREATE POLICY "Users can insert own quiz attempts"
  ON quiz_attempts FOR INSERT
  TO authenticated
  WITH CHECK ((select auth.uid()) = user_id);

-- 4. Fix RLS policies on code_submissions
DROP POLICY IF EXISTS "Users can view own code submissions" ON code_submissions;
DROP POLICY IF EXISTS "Users can insert own code submissions" ON code_submissions;

CREATE POLICY "Users can view own code submissions"
  ON code_submissions FOR SELECT
  TO authenticated
  USING ((select auth.uid()) = user_id);

CREATE POLICY "Users can insert own code submissions"
  ON code_submissions FOR INSERT
  TO authenticated
  WITH CHECK ((select auth.uid()) = user_id);

-- 5. Recreate leaderboard view with SECURITY INVOKER (removes SECURITY DEFINER)
DROP VIEW IF EXISTS leaderboard;

CREATE VIEW leaderboard
  WITH (security_invoker = true)
AS
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

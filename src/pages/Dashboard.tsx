import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { useAccentGreen } from '../lib/colors';
import { supabase } from '../lib/supabase';
import { QuizAttempt, LeaderboardEntry, getRankTier } from '../types';
import { MODULES } from '../data/modules';
import {
  Zap, Flame, BookOpen, Code2, Trophy, ArrowRight, Target, TrendingUp, Clock
} from 'lucide-react';

function ProgressRing({ percentage, size = 80, strokeWidth = 6, color = '#00FF41' }: {
  percentage: number; size?: number; strokeWidth?: number; color?: string;
}) {
  const r = (size - strokeWidth) / 2;
  const circ = 2 * Math.PI * r;
  const offset = circ - (percentage / 100) * circ;
  return (
    <svg width={size} height={size} className="rotate-[-90deg]">
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#1a1a1a" strokeWidth={strokeWidth} />
      <circle
        cx={size / 2} cy={size / 2} r={r} fill="none"
        stroke={color} strokeWidth={strokeWidth}
        strokeDasharray={circ} strokeDashoffset={offset}
        strokeLinecap="round"
        style={{ transition: 'stroke-dashoffset 1s ease', filter: `drop-shadow(0 0 4px ${color}80)` }}
      />
    </svg>
  );
}

export default function Dashboard() {
  const { profile, refreshProfile } = useAuth();
  const navigate = useNavigate();
  const { colorScheme } = useTheme();
  const green = useAccentGreen();
  const [quizAttempts, setQuizAttempts] = useState<QuizAttempt[]>([]);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [completedTopics, setCompletedTopics] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    refreshProfile();
    fetchData();
  }, []);

  async function fetchData() {
    const { data: attempts } = await supabase
      .from('quiz_attempts')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(20);

    const { data: lb } = await supabase
      .from('leaderboard')
      .select('*')
      .order('total_xp', { ascending: false })
      .limit(5);

    if (attempts) {
      setQuizAttempts(attempts as QuizAttempt[]);
      const passed = new Set(
        attempts.filter(a => a.percentage >= 60).map(a => a.topic_id)
      );
      setCompletedTopics(passed);
    }
    if (lb) setLeaderboard(lb as LeaderboardEntry[]);
    setLoading(false);
  }

  if (!profile) return null;

  const rank = getRankTier(profile.total_xp);
  const progressPct = Math.round((completedTopics.size / MODULES.length) * 100);
  const recentAttempts = quizAttempts.slice(0, 5);
  const avgScore = quizAttempts.length
    ? Math.round(quizAttempts.reduce((s, a) => s + a.percentage, 0) / quizAttempts.length)
    : 0;

  const nextModule = MODULES.find(m => !completedTopics.has(m.id));

  const stats = [
    { label: 'Total XP', value: profile.total_xp.toLocaleString(), icon: Zap, color: '#FFB800', sub: rank.name },
    { label: 'Day Streak', value: profile.current_streak, icon: Flame, color: '#FF4444', sub: `Best: ${profile.longest_streak}` },
    { label: 'Quizzes Done', value: quizAttempts.length, icon: BookOpen, color: green, sub: `Avg: ${avgScore}%` },
    { label: 'Modules Done', value: completedTopics.size, icon: Target, color: '#00D4FF', sub: `of ${MODULES.length} total` },
  ];

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <div className="flex items-center gap-3 mb-1">
          <span className="text-3xl">{profile.avatar_emoji}</span>
          <div>
            <h1 className="font-display text-2xl font-bold text-[#E0E0E0]">
              Welcome back, {profile.display_name}
            </h1>
            <p className="text-[#888] font-mono text-sm">
              <span style={{ color: colorScheme === 'clear' ? rank.clearColor : rank.color }}>{rank.emoji} {rank.name}</span>
              {profile.school && <span className="ml-2 text-[#777]">— {profile.school}</span>}
            </p>
          </div>
        </div>
      </motion.div>

      {nextModule && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 bg-gradient-to-r from-[#00FF41]/10 to-transparent border border-[#00FF41]/20 rounded-xl p-5 cursor-pointer hover:border-[#00FF41]/40 transition-all"
          onClick={() => navigate(`/learn/${nextModule.id}`)}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="text-3xl">{nextModule.icon}</div>
              <div>
                <p className="text-[#00FF41] font-mono text-xs uppercase tracking-wider mb-1">Continue Learning</p>
                <p className="text-[#E0E0E0] font-display font-semibold text-lg">
                  Module {nextModule.number}: {nextModule.title}
                </p>
                <p className="text-[#b0b0b0] text-sm">{nextModule.subtitle}</p>
              </div>
            </div>
            <ArrowRight size={24} className="text-[#00FF41] flex-shrink-0" />
          </div>
        </motion.div>
      )}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-[#111] border border-[#1a1a1a] rounded-xl p-4 hover:border-[#2a2a2a] transition-all"
          >
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: s.color + '15', border: `1px solid ${s.color}30` }}>
                <s.icon size={15} style={{ color: s.color }} />
              </div>
              <span className="text-[#888] text-xs font-mono uppercase tracking-wider">{s.label}</span>
            </div>
            <p className="text-[#E0E0E0] font-display text-2xl font-bold">{s.value}</p>
            <p className="text-[#888] text-xs mt-1">{s.sub}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="md:col-span-2 bg-[#111] border border-[#1a1a1a] rounded-xl p-6"
        >
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-display font-semibold text-[#E0E0E0]">Module Progress</h2>
            <span className="text-[#00FF41] font-mono text-sm">{progressPct}%</span>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {MODULES.map((m) => {
              const done = completedTopics.has(m.id);
              return (
                <button
                  key={m.id}
                  onClick={() => navigate(`/learn/${m.id}`)}
                  className="flex items-center gap-3 p-3 rounded-lg border transition-all text-left group"
                  style={{
                    borderColor: done ? m.color + '40' : '#1a1a1a',
                    backgroundColor: done ? m.color + '08' : 'transparent',
                  }}
                >
                  <span className="text-lg">{m.icon}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-[#E0E0E0] text-xs font-medium truncate">{m.title}</p>
                    <p className="text-[#888] text-[10px] font-mono">{done ? 'Completed' : 'Not started'}</p>
                  </div>
                  {done && <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: m.color }} />}
                </button>
              );
            })}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-[#111] border border-[#1a1a1a] rounded-xl p-6 flex flex-col"
        >
          <div className="flex items-center gap-2 mb-5">
            <Target size={16} className="text-[#00FF41]" />
            <h2 className="font-display font-semibold text-[#E0E0E0]">Overall Progress</h2>
          </div>
          <div className="flex items-center justify-center flex-1 py-4">
            <div className="relative">
              <ProgressRing percentage={progressPct} size={120} strokeWidth={8} color={green} />
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-[#E0E0E0] font-display text-2xl font-bold">{progressPct}%</span>
                <span className="text-[#888] text-[10px] font-mono">COMPLETE</span>
              </div>
            </div>
          </div>
          <div className="mt-4 space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-[#888] font-mono">Modules done</span>
              <span className="text-[#E0E0E0] font-mono">{completedTopics.size} / {MODULES.length}</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-[#888] font-mono">Avg quiz score</span>
              <span className="text-[#E0E0E0] font-mono">{avgScore}%</span>
            </div>
          </div>
          <button
            onClick={() => navigate('/learn')}
            className="mt-5 btn-secondary text-sm py-2 w-full flex items-center justify-center gap-2"
          >
            <BookOpen size={14} />
            View All Modules
          </button>
        </motion.div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#111] border border-[#1a1a1a] rounded-xl p-6"
        >
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2">
              <TrendingUp size={16} className="text-[#00D4FF]" />
              <h2 className="font-display font-semibold text-[#E0E0E0]">Recent Quizzes</h2>
            </div>
          </div>
          {recentAttempts.length === 0 ? (
            <div className="text-center py-8">
              <Clock size={32} className="text-[#666] mx-auto mb-3" />
              <p className="text-[#888] text-sm">No quiz attempts yet</p>
              <button
                onClick={() => navigate('/learn')}
                className="mt-4 text-[#00FF41] text-sm hover:underline"
              >
                Start a quiz
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {recentAttempts.map(a => {
                const mod = MODULES.find(m => m.id === a.topic_id);
                const pct = Math.round(a.percentage);
                const amber = colorScheme === 'clear' ? '#92400e' : '#FFB800';
                const color = pct >= 80 ? green : pct >= 60 ? amber : '#FF4444';
                return (
                  <div key={a.id} className="flex items-center gap-3 p-3 rounded-lg bg-[#0d0d0d] border border-[#1a1a1a]">
                    <span className="text-xl">{mod?.icon || '📚'}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-[#E0E0E0] text-sm font-medium truncate">{mod?.title || a.topic_id}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="flex-1 bg-[#1a1a1a] rounded-full h-1">
                          <div className="h-full rounded-full" style={{ width: `${pct}%`, backgroundColor: color }} />
                        </div>
                        <span className="font-mono text-[10px]" style={{ color }}>{pct}%</span>
                      </div>
                    </div>
                    <span className="text-[#888] font-mono text-[10px]">+{a.xp_earned}XP</span>
                  </div>
                );
              })}
            </div>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-[#111] border border-[#1a1a1a] rounded-xl p-6"
        >
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2">
              <Trophy size={16} className="text-[#FFB800]" />
              <h2 className="font-display font-semibold text-[#E0E0E0]">Top Students</h2>
            </div>
            <button
              onClick={() => navigate('/leaderboard')}
              className="text-[#00FF41] text-xs hover:underline flex items-center gap-1"
            >
              Full board <ArrowRight size={12} />
            </button>
          </div>
          {leaderboard.length === 0 ? (
            <div className="text-center py-8">
              <Trophy size={32} className="text-[#666] mx-auto mb-3" />
              <p className="text-[#888] text-sm">No rankings yet</p>
            </div>
          ) : (
            <div className="space-y-3">
              {leaderboard.map((entry, i) => {
                const entryRank = getRankTier(entry.total_xp);
                const medals = ['🥇', '🥈', '🥉'];
                return (
                  <div key={entry.id} className="flex items-center gap-3 p-3 rounded-lg bg-[#0d0d0d] border border-[#1a1a1a]">
                    <span className="text-lg w-6 text-center">{i < 3 ? medals[i] : `${i + 1}.`}</span>
                    <span className="text-xl">{entry.avatar_emoji}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-[#E0E0E0] text-sm font-medium truncate">{entry.display_name}</p>
                      <p className="font-mono text-[10px]" style={{ color: colorScheme === 'clear' ? entryRank.clearColor : entryRank.color }}>{entryRank.emoji} {entryRank.name}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[#FFB800] font-mono text-sm font-semibold">{entry.total_xp.toLocaleString()}</p>
                      <p className="text-[#888] font-mono text-[10px]">XP</p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}

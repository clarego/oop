import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { supabase } from '../lib/supabase';
import { LeaderboardEntry, getRankTier } from '../types';
import { Trophy, Flame, BookOpen, Code2, Zap } from 'lucide-react';

type SortKey = 'total_xp' | 'avg_quiz_score' | 'challenges_passed' | 'current_streak';

function PodiumBlock({ entry, position, rank }: { entry: LeaderboardEntry; position: 1 | 2 | 3; rank: number }) {
  const { colorScheme } = useTheme();
  const heights = { 1: 'h-28', 2: 'h-20', 3: 'h-16' };
  const colors = { 1: '#FFB800', 2: '#888888', 3: '#c07830' };
  const delays = { 1: 0.3, 2: 0.1, 3: 0.2 };
  const tierRank = getRankTier(entry.total_xp);
  const color = colors[position];

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: delays[position], type: 'spring', stiffness: 120, damping: 16 }}
      className="flex flex-col items-center"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: delays[position] + 0.2, type: 'spring', stiffness: 200 }}
        className="text-4xl mb-2"
      >
        {entry.avatar_emoji}
      </motion.div>
      <p className="font-display font-semibold text-[#E0E0E0] text-sm mb-0.5 text-center max-w-[80px] truncate">
        {entry.display_name}
      </p>
      <p className="text-[10px] font-mono mb-2" style={{ color: colorScheme === 'clear' ? tierRank.clearColor : tierRank.color }}>
        {tierRank.emoji} {tierRank.name}
      </p>
      <p className="font-mono font-bold text-sm mb-2" style={{ color }}>
        {entry.total_xp.toLocaleString()} XP
      </p>
      <div
        className={`w-20 ${heights[position]} rounded-t-xl flex items-start justify-center pt-2 relative`}
        style={{ backgroundColor: color + '20', border: `2px solid ${color}40`, borderBottom: 'none' }}
      >
        <span className="font-display font-bold text-2xl" style={{ color }}>
          {position === 1 ? '1st' : position === 2 ? '2nd' : '3rd'}
        </span>
      </div>
    </motion.div>
  );
}

export default function Leaderboard() {
  const { user } = useAuth();
  const { colorScheme } = useTheme();
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState<SortKey>('total_xp');
  const [filterSchool, setFilterSchool] = useState('');
  const [schools, setSchools] = useState<string[]>([]);

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  async function fetchLeaderboard() {
    const { data } = await supabase
      .from('leaderboard')
      .select('*')
      .order('total_xp', { ascending: false })
      .limit(50);

    if (data) {
      setEntries(data as LeaderboardEntry[]);
      const s = [...new Set(data.map((e: LeaderboardEntry) => e.school).filter(Boolean))];
      setSchools(s as string[]);
    }
    setLoading(false);
  }

  const sortedEntries = [...entries]
    .filter(e => !filterSchool || e.school === filterSchool)
    .sort((a, b) => {
      if (sortBy === 'avg_quiz_score') return b.avg_quiz_score - a.avg_quiz_score;
      if (sortBy === 'challenges_passed') return b.challenges_passed - a.challenges_passed;
      if (sortBy === 'current_streak') return b.current_streak - a.current_streak;
      return b.total_xp - a.total_xp;
    });

  const myEntry = entries.find(e => e.id === user?.id);
  const myRank = sortedEntries.findIndex(e => e.id === user?.id) + 1;

  const sortOptions: { key: SortKey; label: string; icon: typeof Trophy }[] = [
    { key: 'total_xp', label: 'Total XP', icon: Zap },
    { key: 'avg_quiz_score', label: 'Quiz Score', icon: BookOpen },
    { key: 'challenges_passed', label: 'Challenges', icon: Code2 },
    { key: 'current_streak', label: 'Streak', icon: Flame },
  ];

  const top3 = sortedEntries.slice(0, 3);

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-8">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <Trophy size={22} className="text-[#FFB800]" />
          <h1 className="font-display text-2xl font-bold text-[#E0E0E0]">Leaderboard</h1>
        </div>
        <p className="text-[#888] text-sm">Top OOP students ranked by performance</p>
      </motion.div>

      {!loading && top3.length >= 3 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="mb-8 bg-[#0d0d0d] border border-[#1a1a1a] rounded-2xl p-8"
        >
          <p className="text-center text-[#888] font-mono text-xs uppercase tracking-wider mb-8">Top 3 Students</p>
          <div className="flex items-end justify-center gap-4">
            <PodiumBlock entry={top3[1]} position={2} rank={2} />
            <PodiumBlock entry={top3[0]} position={1} rank={1} />
            <PodiumBlock entry={top3[2]} position={3} rank={3} />
          </div>
        </motion.div>
      )}

      {myEntry && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 bg-[#00FF41]/5 border border-[#00FF41]/20 rounded-xl p-5"
        >
          <p className="text-[#00FF41] font-mono text-xs uppercase tracking-wider mb-3">Your Stats</p>
          <div className="flex items-center gap-4">
            <div className="text-3xl">{myEntry.avatar_emoji}</div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <p className="font-display font-semibold text-[#E0E0E0]">{myEntry.display_name}</p>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full text-[#00FF41] bg-[#00FF41]/10 border border-[#00FF41]/20">
                  Rank #{myRank}
                </span>
              </div>
              <div className="flex flex-wrap gap-4 text-xs font-mono">
                <span className="text-[#FFB800]"><span className="text-[#888]">XP:</span> {myEntry.total_xp.toLocaleString()}</span>
                <span className="text-[#00D4FF]"><span className="text-[#888]">Avg:</span> {Math.round(myEntry.avg_quiz_score)}%</span>
                <span className="text-[#FF4444]"><span className="text-[#888]">Streak:</span> {myEntry.current_streak}d</span>
                <span className="text-[#00FF41]"><span className="text-[#888]">Challenges:</span> {myEntry.challenges_passed}</span>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex gap-2 overflow-x-auto pb-1">
          {sortOptions.map(o => (
            <button
              key={o.key}
              onClick={() => setSortBy(o.key)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-mono whitespace-nowrap transition-all flex-shrink-0 ${
                sortBy === o.key
                  ? 'bg-[#FFB800] text-[#0a0a0a] font-semibold'
                  : 'bg-[#111] border border-[#1a1a1a] text-[#888] hover:border-[#333] hover:text-[#b0b0b0]'
              }`}
            >
              <o.icon size={12} />
              {o.label}
            </button>
          ))}
        </div>

        {schools.length > 0 && (
          <select
            value={filterSchool}
            onChange={e => setFilterSchool(e.target.value)}
            className="bg-[#111] border border-[#1a1a1a] rounded-lg px-3 py-2 text-[#b0b0b0] text-xs font-mono focus:outline-none focus:border-[#333] md:ml-auto"
          >
            <option value="">All Schools</option>
            {schools.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        )}
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="w-8 h-8 border-2 border-[#00FF41] border-t-transparent rounded-full animate-spin" />
        </div>
      ) : sortedEntries.length === 0 ? (
        <div className="text-center py-20">
          <Trophy size={48} className="text-[#666] mx-auto mb-4" />
          <p className="text-[#888]">No students yet. Be the first!</p>
        </div>
      ) : (
        <div className="space-y-2">
          {sortedEntries.map((entry, i) => {
            const tierRank = getRankTier(entry.total_xp);
            const isMe = entry.id === user?.id;

            return (
              <motion.div
                key={entry.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.03 }}
                className={`flex items-center gap-4 p-4 rounded-xl border transition-all ${
                  isMe
                    ? 'border-[#00FF41]/30 bg-[#00FF41]/5'
                    : i < 3
                    ? 'border-[#FFB800]/20 bg-[#FFB800]/3'
                    : 'border-[#1a1a1a] bg-[#111] hover:border-[#2a2a2a]'
                }`}
              >
                <div className="w-10 text-center flex-shrink-0">
                  {i === 0 ? (
                    <span className="text-xl">🥇</span>
                  ) : i === 1 ? (
                    <span className="text-xl">🥈</span>
                  ) : i === 2 ? (
                    <span className="text-xl">🥉</span>
                  ) : (
                    <span className="text-[#888] font-mono text-sm font-bold">{i + 1}</span>
                  )}
                </div>

                <div className="text-2xl flex-shrink-0">{entry.avatar_emoji}</div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <p className="font-display font-semibold text-[#E0E0E0] truncate">
                      {entry.display_name}
                      {isMe && <span className="ml-2 text-[#00FF41] text-xs font-mono">(you)</span>}
                    </p>
                    <span className="text-[10px] font-mono flex-shrink-0" style={{ color: colorScheme === 'clear' ? tierRank.clearColor : tierRank.color }}>
                      {tierRank.emoji} {tierRank.name}
                    </span>
                  </div>
                  {entry.school && (
                    <p className="text-[#777] text-[10px] font-mono truncate">{entry.school}</p>
                  )}
                </div>

                <div className="hidden md:flex items-center gap-6 flex-shrink-0">
                  <div className="text-center">
                    <p className="font-mono text-sm font-semibold text-[#00D4FF]">{Math.round(entry.avg_quiz_score)}%</p>
                    <p className="text-[#888] text-[9px] font-mono">AVG</p>
                  </div>
                  <div className="text-center">
                    <p className="font-mono text-sm font-semibold text-[#00FF41]">{entry.challenges_passed}</p>
                    <p className="text-[#888] text-[9px] font-mono">CODE</p>
                  </div>
                  <div className="text-center">
                    <p className="font-mono text-sm font-semibold text-[#FF4444]">{entry.current_streak}d</p>
                    <p className="text-[#888] text-[9px] font-mono">STREAK</p>
                  </div>
                </div>

                <div className="text-right flex-shrink-0 min-w-[80px]">
                  <p className="font-mono text-lg font-bold text-[#FFB800]">{entry.total_xp.toLocaleString()}</p>
                  <p className="text-[#888] text-[10px] font-mono">XP</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}

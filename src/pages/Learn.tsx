import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { supabase } from '../lib/supabase';
import { QuizAttempt } from '../types';
import { MODULES } from '../data/modules';
import { BookOpen, CheckCircle, ChevronRight, Code2, HelpCircle, Zap } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useAccentGreen } from '../lib/colors';

export default function Learn() {
  const navigate = useNavigate();
  const { colorScheme } = useTheme();
  const green = useAccentGreen();
  const amber = colorScheme === 'clear' ? '#92400e' : '#FFB800';
  const [attempts, setAttempts] = useState<QuizAttempt[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from('quiz_attempts')
      .select('*')
      .then(({ data }) => {
        if (data) setAttempts(data as QuizAttempt[]);
        setLoading(false);
      });
  }, []);

  const completedTopics = new Set(
    attempts.filter(a => a.percentage >= 60).map(a => a.topic_id)
  );

  function getBestScore(moduleId: string) {
    const moduleAttempts = attempts.filter(a => a.topic_id === moduleId);
    if (!moduleAttempts.length) return null;
    return Math.max(...moduleAttempts.map(a => a.percentage));
  }

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <div className="flex items-center gap-2 mb-2">
          <BookOpen size={20} className="text-[#00FF41]" />
          <h1 className="font-display text-2xl font-bold text-[#E0E0E0]">OOP Modules</h1>
        </div>
        <p className="text-[#888] text-sm">
          All 8 principles from VCAA VCE Applied Computing Study Design 2025–2028
        </p>
        <div className="flex items-center gap-4 mt-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#00FF41]" />
            <span className="text-[#888] text-xs font-mono">Completed (≥60%)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#1a1a1a] border border-[#333]" />
            <span className="text-[#888] text-xs font-mono">Not started</span>
          </div>
        </div>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-5">
        {MODULES.map((mod, i) => {
          const done = completedTopics.has(mod.id);
          const best = getBestScore(mod.id);

          return (
            <motion.div
              key={mod.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07 }}
              className="module-card"
              style={{ '--accent-color': mod.color } as React.CSSProperties}
              onClick={() => navigate(`/learn/${mod.id}`)}
            >
              <div className="flex items-start gap-4">
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
                  style={{ backgroundColor: mod.color + '15', border: `1px solid ${mod.color}30` }}
                >
                  {mod.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[#888] font-mono text-[10px]">MODULE {String(mod.number).padStart(2, '0')}</span>
                    {done && (
                      <span className="flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded-full"
                        style={{ color: mod.color, backgroundColor: mod.color + '15', border: `1px solid ${mod.color}30` }}>
                        <CheckCircle size={10} />
                        DONE
                      </span>
                    )}
                  </div>
                  <h3 className="font-display font-semibold text-[#E0E0E0] text-lg leading-tight">{mod.title}</h3>
                  <p className="text-[#b0b0b0] text-sm mb-3">{mod.subtitle}</p>
                  <p className="text-[#888] text-xs leading-relaxed line-clamp-2">{mod.description}</p>
                </div>
                <ChevronRight size={18} className="text-[#666] flex-shrink-0 mt-1" />
              </div>

              <div className="mt-4 pt-4 border-t border-[#1a1a1a] flex items-center gap-3">
                <div className="flex flex-wrap gap-1 flex-1">
                  {mod.keyTerms.slice(0, 3).map(t => (
                    <span key={t} className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#1a1a1a] text-[#888] border border-[#222]">{t}</span>
                  ))}
                </div>
                <div className="flex items-center gap-3 flex-shrink-0">
                  {best !== null && (
                    <div className="text-right">
                      <p className="font-mono text-[10px] text-[#888]">Best</p>
                      <p className="font-mono text-sm font-semibold"
                        style={{ color: best >= 80 ? green : best >= 60 ? amber : '#FF4444' }}>
                        {Math.round(best)}%
                      </p>
                    </div>
                  )}
                  <div className="flex flex-col gap-1">
                    <button
                      onClick={(e) => { e.stopPropagation(); navigate(`/quiz/${mod.id}`); }}
                      className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-[10px] font-mono font-semibold transition-all"
                      style={{ backgroundColor: mod.color + '15', color: mod.color, border: `1px solid ${mod.color}30` }}
                    >
                      <HelpCircle size={10} />
                      QUIZ
                    </button>
                    <button
                      onClick={(e) => { e.stopPropagation(); navigate(`/challenges/${mod.id}`); }}
                      className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-[10px] font-mono font-semibold text-[#00D4FF] bg-[#00D4FF]/10 border border-[#00D4FF]/20 transition-all hover:bg-[#00D4FF]/20"
                    >
                      <Code2 size={10} />
                      CODE
                    </button>
                  </div>
                </div>
              </div>

              {best !== null && (
                <div className="mt-3 h-1 bg-[#1a1a1a] rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-1000"
                    style={{
                      width: `${best}%`,
                      backgroundColor: best >= 80 ? green : best >= 60 ? amber : '#FF4444',
                    }}
                  />
                </div>
              )}
            </motion.div>
          );
        })}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-8 bg-[#0d0d0d] border border-[#1a1a1a] rounded-xl p-6 flex items-center gap-5"
      >
        <div className="w-12 h-12 rounded-xl bg-[#FFB800]/10 border border-[#FFB800]/30 flex items-center justify-center flex-shrink-0">
          <Zap size={22} className="text-[#FFB800]" />
        </div>
        <div>
          <h3 className="font-display font-semibold text-[#E0E0E0] mb-1">Earn XP by completing quizzes</h3>
          <p className="text-[#888] text-sm">
            Perfect score: 120 XP · 80%+: 80 XP · First attempt bonus: +10 XP · Speed bonus: +15 XP
          </p>
        </div>
      </motion.div>
    </div>
  );
}

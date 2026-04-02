import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { useAccentGreen } from '../lib/colors';
import { supabase } from '../lib/supabase';
import { MODULES } from '../data/modules';
import { getQuestionsForModule, shuffleQuestions } from '../data/questions';
import { QuizQuestion } from '../types';
import {
  ArrowLeft, Timer, CheckCircle, XCircle, ArrowRight, Trophy, Zap, RotateCcw,
  BookOpen, Zap as ZapIcon, ChevronRight, ChevronLeft, Lightbulb, ChevronDown, Code2, Image
} from 'lucide-react';
import PythonCodeBlock from '../components/PythonCodeBlock';

const OPTION_ACCENT = ['#3B82F6', '#10B981', '#F59E0B', '#F43F5E'] as const;

function renderQuestionText(text: string) {
  const parts = text.split(/(```python\n[\s\S]*?```)/g);
  return parts.map((part, i) => {
    const match = part.match(/^```python\n([\s\S]*?)```$/);
    if (match) {
      return <div key={i} className="my-4"><PythonCodeBlock code={match[1]} /></div>;
    }
    if (!part.trim()) return null;
    return <p key={i} className="text-[#E0E0E0] text-base leading-relaxed whitespace-pre-wrap">{part.trim()}</p>;
  });
}

function calculateXP(percentage: number, isFirst: boolean, timeSecs: number, challengeMode: boolean): number {
  let xp = 0;
  if (percentage >= 100) xp = 120;
  else if (percentage >= 80) xp = 80;
  else if (percentage >= 60) xp = 60;
  else xp = 30;
  if (isFirst) xp += 10;
  if (challengeMode && timeSecs < 300) xp += 15;
  return xp;
}

type Phase = 'review' | 'intro' | 'quiz' | 'result';

export default function QuizPage() {
  const { moduleId } = useParams();
  const navigate = useNavigate();
  const { user, refreshProfile } = useAuth();
  const { colorScheme } = useTheme();
  const green = useAccentGreen();
  const amber = colorScheme === 'clear' ? '#92400e' : '#FFB800';
  const mod = MODULES.find(m => m.id === moduleId);

  const [phase, setPhase] = useState<Phase>('review');
  const [codeOpen, setCodeOpen] = useState(true);
  const [illustOpen, setIllustOpen] = useState(true);
  const [explanOpen, setExplanOpen] = useState(true);
  const [reviewIndex, setReviewIndex] = useState(0);
  const [challengeMode, setChallengeMode] = useState(false);
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<string | number | null>(null);
  const [textAnswer, setTextAnswer] = useState('');
  const [revealed, setRevealed] = useState(false);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState<Array<{ correct: boolean; selected: string | number | null }>>([]);
  const [timeLeft, setTimeLeft] = useState(600);
  const [startTime, setStartTime] = useState(0);
  const [xpEarned, setXpEarned] = useState(0);
  const [alreadyAttempted, setAlreadyAttempted] = useState(false);

  useEffect(() => {
    if (mod && user) {
      const qs = shuffleQuestions(getQuestionsForModule(mod.id)).slice(0, 10);
      setQuestions(qs);
      supabase
        .from('quiz_attempts')
        .select('id')
        .eq('topic_id', mod.id)
        .limit(1)
        .then(({ data }) => setAlreadyAttempted(!!(data && data.length > 0)));
    }
  }, [mod, user]);

  useEffect(() => {
    setCodeOpen(true);
    setIllustOpen(true);
    setExplanOpen(true);
  }, [current]);

  useEffect(() => {
    if (phase !== 'quiz' || !challengeMode) return;
    if (timeLeft <= 0) { finishQuiz(); return; }
    const t = setTimeout(() => setTimeLeft(s => s - 1), 1000);
    return () => clearTimeout(t);
  }, [phase, timeLeft, challengeMode]);

  function startQuiz() {
    setPhase('quiz');
    setCurrent(0);
    setScore(0);
    setAnswers([]);
    setTimeLeft(600);
    setStartTime(Date.now());
    setSelected(null);
    setRevealed(false);
  }

  function submitAnswer() {
    if (!questions[current]) return;
    const q = questions[current];
    let correct = false;
    if (q.type === 'multiple_choice' || (q.type === 'code_reading' && q.options)) {
      correct = selected === q.correctAnswer;
    } else {
      correct = textAnswer.trim().length > 5;
    }
    if (correct) setScore(s => s + q.marks);
    setAnswers(a => [...a, { correct, selected: selected ?? textAnswer }]);
    setRevealed(true);
  }

  function nextQuestion() {
    if (current + 1 >= questions.length) {
      finishQuiz();
    } else {
      setCurrent(c => c + 1);
      setSelected(null);
      setTextAnswer('');
      setRevealed(false);
    }
  }

  async function finishQuiz() {
    const totalMarks = questions.reduce((s, q) => s + q.marks, 0);
    const pct = totalMarks > 0 ? (score / totalMarks) * 100 : 0;
    const timeTaken = Math.round((Date.now() - startTime) / 1000);
    const xp = calculateXP(pct, !alreadyAttempted, timeTaken, challengeMode);
    setXpEarned(xp);
    if (user) {
      await supabase.from('quiz_attempts').insert({
        user_id: user.id,
        topic_id: mod!.id,
        score: Math.round(score),
        total_questions: questions.length,
        percentage: Math.round(pct * 100) / 100,
        time_taken_seconds: timeTaken,
        xp_earned: xp,
      });
      await supabase.from('profiles').select('total_xp').eq('id', user.id).single().then(({ data }) => {
        if (data) {
          supabase.from('profiles').update({ total_xp: (data.total_xp || 0) + xp }).eq('id', user.id);
        }
      });
      await refreshProfile();
    }
    setPhase('result');
  }

  if (!mod) return <div className="p-8 text-center text-[#888]">Module not found</div>;

  const reviewTerms = mod.keyTerms;
  const totalMarks = questions.reduce((s, q) => s + q.marks, 0);
  const pct = totalMarks > 0 ? Math.round((score / totalMarks) * 100) : 0;
  const mins = Math.floor(timeLeft / 60);
  const secs = timeLeft % 60;
  const timerColor = timeLeft < 60 ? '#FF4444' : timeLeft < 180 ? amber : green;

  if (phase === 'review') {
    return (
      <div className="max-w-2xl mx-auto p-4 md:p-8">
        <button onClick={() => navigate(`/learn/${mod.id}`)} className="flex items-center gap-2 text-[#888] hover:text-[#b0b0b0] text-sm mb-8 transition-colors">
          <ArrowLeft size={16} /> Back to Module
        </button>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="text-center mb-8">
            <div className="text-5xl mb-3">{mod.icon}</div>
            <h1 className="font-display text-2xl font-bold text-[#E0E0E0] mb-2">{mod.title}</h1>
            <p className="text-[#888] text-sm">Quick review before you start — {reviewTerms.length} key terms</p>
          </div>

          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={reviewIndex}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.2 }}
                className="bg-[#111] border rounded-2xl p-8 text-center mb-6 min-h-[180px] flex flex-col items-center justify-center"
                style={{ borderColor: mod.color + '30' }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4"
                  style={{ backgroundColor: mod.color + '15', border: `1px solid ${mod.color}30` }}
                >
                  <Lightbulb size={20} style={{ color: mod.color }} />
                </div>
                <p className="text-[#888] font-mono text-xs uppercase tracking-wider mb-3">Key Term {reviewIndex + 1} of {reviewTerms.length}</p>
                <p className="font-display text-2xl font-bold text-[#E0E0E0]">{reviewTerms[reviewIndex]}</p>
              </motion.div>
            </AnimatePresence>

            <div className="flex items-center justify-between mb-8">
              <button
                onClick={() => setReviewIndex(i => Math.max(0, i - 1))}
                disabled={reviewIndex === 0}
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-[#888] hover:text-[#b0b0b0] disabled:opacity-30 disabled:cursor-not-allowed transition-all"
              >
                <ChevronLeft size={16} /> Prev
              </button>
              <div className="flex gap-1.5">
                {reviewTerms.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setReviewIndex(i)}
                    className="w-2 h-2 rounded-full transition-all"
                    style={{ backgroundColor: i === reviewIndex ? mod.color : '#2a2a2a' }}
                  />
                ))}
              </div>
              <button
                onClick={() => setReviewIndex(i => Math.min(reviewTerms.length - 1, i + 1))}
                disabled={reviewIndex === reviewTerms.length - 1}
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-[#888] hover:text-[#b0b0b0] disabled:opacity-30 disabled:cursor-not-allowed transition-all"
              >
                Next <ChevronRight size={16} />
              </button>
            </div>
          </div>

          <motion.button
            onClick={() => setPhase('intro')}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-3.5 rounded-xl text-base font-semibold text-[#0a0a0a] flex items-center justify-center gap-2 transition-all"
            style={{ backgroundColor: mod.color }}
          >
            I'm Ready — Start Quiz <ArrowRight size={18} />
          </motion.button>

          <button
            onClick={() => navigate(`/learn/${mod.id}`)}
            className="w-full mt-3 py-2.5 text-[#888] hover:text-[#b0b0b0] text-sm transition-colors"
          >
            Go back and study more
          </button>
        </motion.div>
      </div>
    );
  }

  if (phase === 'intro') {
    return (
      <div className="max-w-2xl mx-auto p-4 md:p-8">
        <button onClick={() => setPhase('review')} className="flex items-center gap-2 text-[#888] hover:text-[#b0b0b0] text-sm mb-8 transition-colors">
          <ArrowLeft size={16} /> Back to Review
        </button>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="bg-[#111] border border-[#1a1a1a] rounded-2xl overflow-hidden">
          <div className="p-8 text-center">
            <div className="text-6xl mb-5">{mod.icon}</div>
            <h1 className="font-display text-2xl font-bold text-[#E0E0E0] mb-2">{mod.title} Quiz</h1>
            <p className="text-[#b0b0b0] text-sm mb-8">{mod.subtitle}</p>
            <div className="grid grid-cols-3 gap-4 mb-8">
              {[
                { label: 'Questions', value: '10', icon: BookOpen, color: '#00D4FF' },
                { label: 'Max XP', value: challengeMode ? '135' : '120', icon: ZapIcon, color: amber },
                { label: 'Mode', value: challengeMode ? 'Timed' : 'Relaxed', icon: Timer, color: green },
              ].map(s => (
                <div key={s.label} className="bg-[#0d0d0d] rounded-xl p-4 border border-[#1a1a1a]">
                  <s.icon size={20} style={{ color: s.color }} className="mx-auto mb-2" />
                  <p className="font-display text-xl font-bold text-[#E0E0E0]">{s.value}</p>
                  <p className="text-[#888] text-xs font-mono">{s.label}</p>
                </div>
              ))}
            </div>

            <div className="bg-[#0d0d0d] border border-[#1a1a1a] rounded-xl p-5 mb-8">
              <div className="flex items-center justify-between mb-3">
                <p className="text-[#b0b0b0] text-sm font-semibold">Challenge Mode</p>
                <button
                  onClick={() => setChallengeMode(c => !c)}
                  className={`relative w-12 h-6 rounded-full transition-all duration-300 ${challengeMode ? 'bg-[#FFB800]' : 'bg-[#333]'}`}
                >
                  <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all duration-300 ${challengeMode ? 'left-7' : 'left-1'}`} />
                </button>
              </div>
              <p className="text-[#888] text-xs leading-relaxed">
                {challengeMode
                  ? 'Timer enabled (10 min). Complete quickly for a +15 XP speed bonus!'
                  : 'Relaxed mode — no timer, no pressure. Focus on learning.'}
              </p>
            </div>

            <div className="bg-[#0d0d0d] border border-[#1a1a1a] rounded-xl p-4 mb-8 text-left">
              <p className="text-[#b0b0b0] text-xs font-mono uppercase tracking-wider mb-3">XP Rewards</p>
              <div className="space-y-2 text-sm">
                {[
                  { label: 'Perfect Score (100%)', xp: '120 XP', color: green },
                  { label: 'Great Score (80%+)', xp: '80 XP', color: '#00D4FF' },
                  { label: 'Pass (60%+)', xp: '60 XP', color: amber },
                  { label: 'Participation (<60%)', xp: '30 XP', color: '#FF4444' },
                  { label: 'First Attempt Bonus', xp: '+10 XP', color: '#888' },
                  { label: 'Challenge Mode Speed Bonus', xp: '+15 XP', color: challengeMode ? amber : '#444' },
                ].map(r => (
                  <div key={r.label} className="flex justify-between">
                    <span className="text-[#888]">{r.label}</span>
                    <span className="font-mono font-semibold" style={{ color: r.color }}>{r.xp}</span>
                  </div>
                ))}
              </div>
            </div>
            <motion.button
              onClick={startQuiz}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-3.5 rounded-xl text-base font-semibold text-[#0a0a0a] transition-all"
              style={{ backgroundColor: mod.color }}
            >
              Begin Quiz
            </motion.button>
          </div>
        </motion.div>
      </div>
    );
  }

  if (phase === 'result') {
    const grade = pct >= 80 ? 'Excellent work!' : pct >= 60 ? 'Good effort!' : 'Keep practising!';
    const gradeColor = pct >= 80 ? green : pct >= 60 ? amber : '#FF4444';
    const encouragement = pct >= 80
      ? `You're smashing ${mod.title}! You earned ${xpEarned} XP.`
      : pct >= 60
      ? `You've got the basics down. Review the sections you missed and try again.`
      : `Don't worry — every attempt helps. Go back and re-read the module, then try again!`;

    return (
      <div className="max-w-2xl mx-auto p-4 md:p-8">
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
          className="bg-[#111] border border-[#1a1a1a] rounded-2xl overflow-hidden">
          <div className="p-8 text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.1, type: 'spring', stiffness: 200 }}
              className="text-5xl mb-4"
            >
              {pct >= 80 ? '🎉' : pct >= 60 ? '👍' : '💪'}
            </motion.div>
            <h2 className="font-display text-3xl font-bold mb-1" style={{ color: gradeColor }}>{grade}</h2>
            <p className="text-[#888] text-sm mb-3">{mod.title} Quiz Complete</p>
            <p className="text-[#b0b0b0] text-sm leading-relaxed mb-6 max-w-sm mx-auto">{encouragement}</p>

            <div className="relative w-36 h-36 mx-auto mb-6">
              <svg width="144" height="144" className="rotate-[-90deg]">
                <circle cx="72" cy="72" r="60" fill="none" stroke="#1a1a1a" strokeWidth="10" />
                <motion.circle
                  cx="72" cy="72" r="60" fill="none" stroke={gradeColor} strokeWidth="10"
                  strokeDasharray={2 * Math.PI * 60}
                  initial={{ strokeDashoffset: 2 * Math.PI * 60 }}
                  animate={{ strokeDashoffset: 2 * Math.PI * 60 - (pct / 100) * 2 * Math.PI * 60 }}
                  transition={{ duration: 1, delay: 0.3, ease: 'easeOut' }}
                  strokeLinecap="round"
                  style={{ filter: `drop-shadow(0 0 8px ${gradeColor}80)` }}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="font-display text-3xl font-bold text-[#E0E0E0]"
                >
                  {pct}%
                </motion.span>
                <span className="text-[#888] text-xs font-mono">SCORE</span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-8">
              {[
                { label: 'XP Earned', value: `+${xpEarned}`, color: amber },
                { label: 'Correct', value: `${answers.filter(a => a.correct).length}/${questions.length}`, color: green },
                { label: 'Marks', value: `${score}/${totalMarks}`, color: '#00D4FF' },
              ].map(s => (
                <div key={s.label} className="bg-[#0d0d0d] rounded-xl p-3 border border-[#1a1a1a]">
                  <p className="font-display text-xl font-bold" style={{ color: s.color }}>{s.value}</p>
                  <p className="text-[#888] text-xs font-mono">{s.label}</p>
                </div>
              ))}
            </div>

            <div className="space-y-2 mb-8 text-left">
              {questions.map((q, i) => {
                const a = answers[i];
                return (
                  <div key={q.id} className="flex items-start gap-3 p-3 rounded-lg bg-[#0d0d0d] border border-[#1a1a1a]">
                    {a?.correct
                      ? <CheckCircle size={16} className="text-[#00FF41] flex-shrink-0 mt-0.5" />
                      : <XCircle size={16} className="text-[#FF4444] flex-shrink-0 mt-0.5" />
                    }
                    <div className="flex-1 min-w-0">
                      <p className="text-[#b0b0b0] text-xs leading-relaxed truncate">{q.question.slice(0, 80)}...</p>
                      {!a?.correct && (
                        <p className="text-[#888] text-[10px] mt-1 font-mono">{q.explanation.slice(0, 100)}...</p>
                      )}
                    </div>
                    <span className="text-[#888] font-mono text-xs flex-shrink-0">{q.marks}pt</span>
                  </div>
                );
              })}
            </div>

            <div className="flex gap-3">
              <button onClick={() => { setPhase('review'); setReviewIndex(0); }} className="btn-secondary flex-1 flex items-center justify-center gap-2">
                <RotateCcw size={15} /> Retry
              </button>
              <button
                onClick={() => navigate(`/learn/${mod.id}`)}
                className="btn-primary flex-1 flex items-center justify-center gap-2"
                style={{ backgroundColor: mod.color }}
              >
                <BookOpen size={15} /> Review Module
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  const q = questions[current];
  if (!q) return null;
  const isChoiceQ = q.type === 'multiple_choice' || (q.type === 'code_reading' && q.options);
  const isTextQ = (q.type === 'short_answer') || (q.type === 'code_reading' && !q.options);
  const canSubmit = revealed ? false : (isChoiceQ ? selected !== null : textAnswer.trim().length > 3);

  return (
    <div className="max-w-3xl mx-auto p-4 md:p-8">
      <div className="flex items-center justify-between mb-6">
        <button onClick={() => navigate(`/learn/${mod.id}`)} className="flex items-center gap-2 text-[#888] hover:text-[#b0b0b0] text-sm transition-colors">
          <ArrowLeft size={16} /> Exit Quiz
        </button>
        <div className="flex items-center gap-4">
          {challengeMode && (
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#111] border border-[#1a1a1a]"
              style={{ borderColor: timerColor + '40' }}>
              <Timer size={14} style={{ color: timerColor }} />
              <span className="font-mono text-sm font-semibold" style={{ color: timerColor }}>
                {String(mins).padStart(2, '0')}:{String(secs).padStart(2, '0')}
              </span>
            </div>
          )}
          <span className="text-[#888] font-mono text-sm">{current + 1} / {questions.length}</span>
        </div>
      </div>

      <div className="mb-4 h-1.5 bg-[#1a1a1a] rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ backgroundColor: mod.color }}
          initial={{ width: 0 }}
          animate={{ width: `${((current + (revealed ? 1 : 0)) / questions.length) * 100}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -30 }}
          transition={{ duration: 0.2 }}
          className="bg-[#111] border border-[#1a1a1a] rounded-2xl overflow-hidden"
        >
          <div className="p-4 border-b border-[#1a1a1a] flex items-center justify-between">
            <span className="text-[#888] font-mono text-xs uppercase">
              {q.type.replace(/_/g, ' ')}
            </span>
            <span className="font-mono text-xs px-2 py-1 rounded"
              style={{ color: mod.color, backgroundColor: mod.color + '15', border: `1px solid ${mod.color}30` }}>
              {q.marks} mark{q.marks > 1 ? 's' : ''}
            </span>
          </div>

          <div className="p-6 space-y-4">
            {q.codeSnippet && (
              <div className="rounded-xl overflow-hidden border border-[#1a1a1a]">
                <button
                  onClick={() => setCodeOpen(o => !o)}
                  className="w-full flex items-center justify-between px-4 py-2.5 bg-[#1a2636] hover:bg-[#1e2d40] transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <Code2 size={13} style={{ color: '#3B82F6' }} />
                    <span className="text-[11px] font-mono uppercase tracking-wider" style={{ color: '#3B82F6' }}>Code Snippet</span>
                  </div>
                  <motion.div animate={{ rotate: codeOpen ? 0 : -90 }} transition={{ duration: 0.2 }}>
                    <ChevronDown size={14} style={{ color: '#3B82F6' }} />
                  </motion.div>
                </button>
                <AnimatePresence initial={false}>
                  {codeOpen && (
                    <motion.div
                      initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }}
                      transition={{ duration: 0.2 }} style={{ overflow: 'hidden' }}
                    >
                      <PythonCodeBlock code={q.codeSnippet} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}

            <div>{renderQuestionText(q.question)}</div>

            {q.illustration && (
              <div className="rounded-xl overflow-hidden border border-[#1a1a1a]">
                <button
                  onClick={() => setIllustOpen(o => !o)}
                  className="w-full flex items-center justify-between px-4 py-2.5 bg-[#1a2420] hover:bg-[#1e2d24] transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <Image size={13} style={{ color: '#10B981' }} />
                    <span className="text-[11px] font-mono uppercase tracking-wider" style={{ color: '#10B981' }}>Visual Reference</span>
                  </div>
                  <motion.div animate={{ rotate: illustOpen ? 0 : -90 }} transition={{ duration: 0.2 }}>
                    <ChevronDown size={14} style={{ color: '#10B981' }} />
                  </motion.div>
                </button>
                <AnimatePresence initial={false}>
                  {illustOpen && (
                    <motion.div
                      initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }}
                      transition={{ duration: 0.2 }} style={{ overflow: 'hidden' }}
                    >
                      <img src={q.illustration} alt="Visual reference" className="w-full object-contain bg-[#0d0d0d]" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}

            {isChoiceQ && q.options && (
              <div className="space-y-2.5">
                {q.options.map((opt, i) => {
                  const accent = OPTION_ACCENT[i % 4];
                  const isCorrect = revealed && i === q.correctAnswer;
                  const isWrong = revealed && selected === i && i !== q.correctAnswer;
                  const isSelected = !revealed && selected === i;

                  const borderColor = isCorrect ? green : isWrong ? '#FF4444' : isSelected ? accent : accent + '40';
                  const greenAlpha = colorScheme === 'clear' ? 'rgba(22,101,52,0.08)' : 'rgba(0,255,65,0.08)';
                  const bgColor = isCorrect ? greenAlpha : isWrong ? 'rgba(255,68,68,0.08)' : isSelected ? accent + '18' : accent + '0a';
                  const badgeBg = isCorrect ? green : isWrong ? '#FF4444' : isSelected ? accent : accent + '22';
                  const badgeBorder = isCorrect ? green : isWrong ? '#FF4444' : isSelected ? accent : accent + '55';
                  const badgeText = (isCorrect || isWrong || isSelected) ? (isWrong ? '#fff' : '#0a0a0a') : accent;
                  const optText = isCorrect ? green : isWrong ? '#FF4444' : isSelected ? accent : colorScheme === 'clear' ? '#1a1a1a' : '#D4D4D4';

                  return (
                    <motion.button
                      key={i}
                      onClick={() => !revealed && setSelected(i)}
                      whileHover={!revealed ? { x: 3 } : {}}
                      disabled={revealed}
                      className="w-full flex items-center gap-4 p-4 rounded-xl border text-left transition-all"
                      style={{ borderColor, backgroundColor: bgColor }}
                    >
                      <div
                        className="w-9 h-9 rounded-lg border flex items-center justify-center flex-shrink-0 font-mono text-sm font-bold"
                        style={{ backgroundColor: badgeBg, borderColor: badgeBorder, color: badgeText }}
                      >
                        {['A', 'B', 'C', 'D'][i]}
                      </div>
                      <span className="text-sm leading-relaxed flex-1" style={{ color: optText }}>{opt}</span>
                      {isCorrect && <CheckCircle size={18} style={{ color: green, flexShrink: 0 }} />}
                      {isWrong && <XCircle size={18} style={{ color: '#FF4444', flexShrink: 0 }} />}
                    </motion.button>
                  );
                })}
              </div>
            )}

            {isTextQ && (
              <textarea
                value={textAnswer}
                onChange={e => setTextAnswer(e.target.value)}
                disabled={revealed}
                placeholder="Type your answer here..."
                rows={4}
                className="w-full bg-[#0d0d0d] border border-[#1a1a1a] rounded-xl px-4 py-3 text-[#E0E0E0] text-sm font-mono placeholder-[#333] focus:outline-none focus:border-[#00FF41] resize-none transition-all"
              />
            )}

            {revealed && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="rounded-xl overflow-hidden border border-[#1a1a1a]">
                <button
                  onClick={() => setExplanOpen(o => !o)}
                  className="w-full flex items-center justify-between px-4 py-2.5 bg-[#241a0a] hover:bg-[#2d2010] transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <Lightbulb size={13} style={{ color: '#F59E0B' }} />
                    <span className="text-[11px] font-mono uppercase tracking-wider" style={{ color: '#F59E0B' }}>Explanation</span>
                  </div>
                  <motion.div animate={{ rotate: explanOpen ? 0 : -90 }} transition={{ duration: 0.2 }}>
                    <ChevronDown size={14} style={{ color: '#F59E0B' }} />
                  </motion.div>
                </button>
                <AnimatePresence initial={false}>
                  {explanOpen && (
                    <motion.div
                      initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }}
                      transition={{ duration: 0.2 }} style={{ overflow: 'hidden' }}
                    >
                      <div className="px-4 py-4 bg-[#0d0d0d]">
                        <p className="text-sm leading-relaxed" style={{ color: colorScheme === 'clear' ? '#374151' : '#b0b0b0' }}>{q.explanation}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )}
          </div>

          <div className="px-6 pb-6">
            {!revealed ? (
              <button
                onClick={submitAnswer}
                disabled={!canSubmit}
                className="w-full py-3.5 rounded-xl text-sm font-semibold transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                style={{ backgroundColor: mod.color, color: '#0a0a0a' }}
              >
                Submit Answer
              </button>
            ) : (
              <motion.button
                onClick={nextQuestion}
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="w-full py-3.5 rounded-xl text-sm font-semibold text-[#0a0a0a] flex items-center justify-center gap-2 transition-all hover:brightness-110"
                style={{ backgroundColor: mod.color }}
              >
                {current + 1 >= questions.length ? (
                  <><Trophy size={16} /> View Results</>
                ) : (
                  <>Next Question <ArrowRight size={16} /></>
                )}
              </motion.button>
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

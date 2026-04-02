import { useState, useEffect, useRef, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import { MODULES } from '../data/modules';
import { getChallengesForModule } from '../data/challenges';
import { CodingChallenge, AiFeedback } from '../types';
import {
  ArrowLeft, Play, Send, RotateCcw, Eye, Lightbulb, CheckCircle, XCircle,
  Loader2, Terminal, Zap, ChevronDown, ChevronUp, Timer, Lock, Unlock, Wand2,
  ChevronsLeft, ChevronsRight
} from 'lucide-react';
import ResizeHandle from '../components/ResizeHandle';
import VsCodeEditor from '../components/VsCodeEditor';
import ExampleCodePanel from '../components/ExampleCodePanel';
import WalkthroughPanel from '../components/WalkthroughPanel';
import { useAccentGreen } from '../lib/colors';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

declare global {
  interface Window {
    loadPyodide: (config: { indexURL: string }) => Promise<{
      runPythonAsync: (code: string) => Promise<unknown>;
    }>;
    _pyodide: {
      runPythonAsync: (code: string) => Promise<unknown>;
    } | null;
  }
}

export default function ChallengesPage() {
  const { moduleId } = useParams();
  const navigate = useNavigate();
  const { user, refreshProfile } = useAuth();
  const green = useAccentGreen();
  const mod = MODULES.find(m => m.id === moduleId);
  const challenges = getChallengesForModule(moduleId || '');

  const [selectedChallenge, setSelectedChallenge] = useState<CodingChallenge | null>(null);
  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');
  const [running, setRunning] = useState(false);
  const [pyReady, setPyReady] = useState(false);
  const [pyLoading, setPyLoading] = useState(false);
  const [feedback, setFeedback] = useState<AiFeedback | null>(null);
  const [grading, setGrading] = useState(false);
  const [gradeCooldown, setGradeCooldown] = useState(0);
  const [showSolution, setShowSolution] = useState(false);
  const [showHints, setShowHints] = useState(false);
  const [hintsUnlocked, setHintsUnlocked] = useState(0);
  const [failCount, setFailCount] = useState(0);
  const [walkthrough, setWalkthrough] = useState('');
  const [walkthroughLoading, setWalkthroughLoading] = useState(false);
  const [exampleOutput, setExampleOutput] = useState('');
  const [exampleRunning, setExampleRunning] = useState(false);
  const [leftWidth, setLeftWidth] = useState(280);
  const [exampleWidth, setExampleWidth] = useState(340);
  const [rightWidth, setRightWidth] = useState(400);
  const [leftCollapsed, setLeftCollapsed] = useState(false);
  const [exampleCollapsed, setExampleCollapsed] = useState(false);
  const [rightCollapsed, setRightCollapsed] = useState(false);
  const onDragLeft = useCallback((d: number) => setLeftWidth(w => Math.max(160, Math.min(520, w + d))), []);
  const onDragExample = useCallback((d: number) => setExampleWidth(w => Math.max(200, Math.min(620, w - d))), []);
  const onDragRight = useCallback((d: number) => setRightWidth(w => Math.max(280, Math.min(600, w - d))), []);
  const [passedChallenges, setPassedChallenges] = useState<Set<string>>(new Set());
  const cooldownRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (user) {
      supabase
        .from('code_submissions')
        .select('challenge_id')
        .eq('user_id', user.id)
        .eq('passed', true)
        .then(({ data }) => {
          if (data) setPassedChallenges(new Set(data.map(d => d.challenge_id)));
        });
    }
    return () => { if (cooldownRef.current) clearInterval(cooldownRef.current); };
  }, [user]);

  async function loadPyodide() {
    if (window._pyodide) { setPyReady(true); return; }
    setPyLoading(true);
    try {
      if (!window.loadPyodide) {
        await new Promise<void>((resolve, reject) => {
          const s = document.createElement('script');
          s.src = 'https://cdn.jsdelivr.net/pyodide/v0.24.1/full/pyodide.js';
          s.onload = () => resolve();
          s.onerror = () => reject(new Error('Failed to load Pyodide'));
          document.head.appendChild(s);
        });
      }
      const py = await window.loadPyodide({ indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.24.1/full/' });
      window._pyodide = py;
      setPyReady(true);
    } catch (e) {
      setOutput('ERROR: Failed to load Python environment. Please check your internet connection.');
    }
    setPyLoading(false);
  }

  function selectChallenge(ch: CodingChallenge) {
    setSelectedChallenge(ch);
    setCode(ch.starterCode);
    setOutput('');
    setFeedback(null);
    setShowSolution(false);
    setShowHints(false);
    setHintsUnlocked(0);
    setFailCount(0);
    setWalkthrough('');
    setWalkthroughLoading(false);
    setExampleOutput('');
    setExampleRunning(false);
    if (!pyReady && !pyLoading) loadPyodide();
  }

  async function runCode() {
    if (!window._pyodide || !code.trim()) return;
    setRunning(true);
    setOutput('');
    try {
      const captureCode = `
import sys
from io import StringIO
_stdout = StringIO()
sys.stdout = _stdout
try:
${code.split('\n').map(l => '    ' + l).join('\n')}
except Exception as e:
    print(f"Error: {e}")
finally:
    sys.stdout = sys.__stdout__
_stdout.getvalue()
`;
      const result = await window._pyodide.runPythonAsync(captureCode);
      setOutput(String(result) || '(No output)');
    } catch (e: unknown) {
      setOutput(`Error: ${e instanceof Error ? e.message : String(e)}`);
    }
    setRunning(false);
  }

  async function runExample() {
    if (!window._pyodide || !selectedChallenge) return;
    setExampleRunning(true);
    setExampleOutput('');
    try {
      const exCode = selectedChallenge.exampleCode;
      const captureCode = `
import sys
from io import StringIO
_stdout = StringIO()
sys.stdout = _stdout
try:
${exCode.split('\n').map(l => '    ' + l).join('\n')}
except Exception as e:
    print(f"Error: {e}")
finally:
    sys.stdout = sys.__stdout__
_stdout.getvalue()
`;
      const result = await window._pyodide.runPythonAsync(captureCode);
      setExampleOutput(String(result) || '(No output)');
    } catch (e: unknown) {
      setExampleOutput(`Error: ${e instanceof Error ? e.message : String(e)}`);
    }
    setExampleRunning(false);
  }

  async function submitForGrading() {
    if (!selectedChallenge || !user || gradeCooldown > 0) return;
    setGrading(true);
    setFeedback(null);

    try {
      const response = await fetch(`${SUPABASE_URL}/functions/v1/grade-code`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          code,
          challengeId: selectedChallenge.id,
          challengeDescription: selectedChallenge.description,
          expectedBehavior: selectedChallenge.expectedBehavior,
          hints: selectedChallenge.hints.join('. '),
        }),
      });

      const data = await response.json();
      if (data.error) throw new Error(data.error);

      const fb: AiFeedback = typeof data === 'string' ? JSON.parse(data) : data;
      setFeedback(fb);

      if (!fb.passed) {
        setFailCount(c => c + 1);
      }

      const xp = fb.passed ? selectedChallenge.xpReward : Math.floor(selectedChallenge.xpReward * 0.1);
      await supabase.from('code_submissions').insert({
        user_id: user.id,
        challenge_id: selectedChallenge.id,
        code,
        ai_feedback: fb.feedback,
        ai_score: fb.score,
        passed: fb.passed,
        xp_earned: xp,
      });

      if (fb.passed) {
        setPassedChallenges(prev => new Set([...prev, selectedChallenge.id]));
        const { data: profile } = await supabase.from('profiles').select('total_xp').eq('id', user.id).single();
        if (profile) {
          await supabase.from('profiles').update({ total_xp: (profile.total_xp || 0) + xp }).eq('id', user.id);
        }
        await refreshProfile();
      }
    } catch (e) {
      setFeedback({
        score: 0,
        passed: false,
        feedback: `Grading failed: ${e instanceof Error ? e.message : 'Unknown error'}. Please ensure CLAUDE_API_KEY is configured.`,
        improvements: [],
        vcaa_tip: '',
        pseudocode_connection: '',
      });
    }

    setGrading(false);
    setGradeCooldown(10);
    cooldownRef.current = setInterval(() => {
      setGradeCooldown(c => {
        if (c <= 1) { clearInterval(cooldownRef.current!); return 0; }
        return c - 1;
      });
    }, 1000);
  }

  async function requestWalkthrough() {
    if (!selectedChallenge || walkthroughLoading || !code.trim()) return;
    setWalkthroughLoading(true);
    setWalkthrough('');
    try {
      const response = await fetch(`${SUPABASE_URL}/functions/v1/ai-tutor`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: `You are a supportive coding tutor. Walk through the student's code step-by-step to help them reach the correct solution — do NOT reveal the full answer directly.\n\nStructure your response using markdown:\n## What You've Built So Far\nAnalyse what the student has written. Praise what's correct. Show any correct snippets using \`\`\`python code blocks with proper VSCode-style formatting.\n\n## What Needs Attention\nFor each issue, explain the concept and give a guiding hint — use inline \`code\` for small references and \`\`\`python blocks for multi-line examples. Do NOT write the full fixed solution.\n\n## Next Step\nGive one clear, actionable next step the student should try.\n\n---\nChallenge: ${selectedChallenge.title}\nDescription: ${selectedChallenge.description}\nExpected behaviour: ${selectedChallenge.expectedBehavior}\n\nStudent's current code:\n\`\`\`python\n${code}\n\`\`\`\n\nRemember: guide, don't solve. Use proper markdown headings and code blocks throughout.`,
          moduleId,
          history: [],
        }),
      });
      const data = await response.json();
      setWalkthrough(data.reply || data.message || 'Unable to generate walkthrough.');
    } catch {
      setWalkthrough('Could not connect to AI tutor. Please try again.');
    }
    setWalkthroughLoading(false);
  }

  if (!mod) return <div className="p-8 text-center text-[#888]">Module not found</div>;

  const difficultyColor = { easy: green, medium: '#FFB800', hard: '#FF4444' };

  if (!selectedChallenge) {
    return (
      <div className="max-w-5xl mx-auto p-4 md:p-8">
        <button onClick={() => navigate(`/learn/${mod.id}`)} className="flex items-center gap-2 text-[#888] hover:text-[#b0b0b0] text-sm mb-6 transition-colors">
          <ArrowLeft size={16} /> Back to Module
        </button>
        <div className="mb-8">
          <h1 className="font-display text-2xl font-bold text-[#E0E0E0] mb-2">
            {mod.icon} {mod.title} — Coding Challenges
          </h1>
          <p className="text-[#888] text-sm">Write Python code in-browser with AI-powered grading</p>
        </div>
        <div className="grid md:grid-cols-3 gap-5">
          {challenges.map((ch, i) => {
            const passed = passedChallenges.has(ch.id);
            const dc = difficultyColor[ch.difficulty];
            return (
              <motion.div
                key={ch.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                onClick={() => selectChallenge(ch)}
                className="bg-[#111] border border-[#1a1a1a] rounded-xl p-5 cursor-pointer hover:border-[#333] hover:bg-[#161616] transition-all group"
              >
                <div className="flex items-start justify-between mb-3">
                  <span className="text-xs font-mono font-semibold px-2 py-1 rounded-full border"
                    style={{ color: dc, borderColor: dc + '40', backgroundColor: dc + '10' }}>
                    {ch.difficulty.toUpperCase()}
                  </span>
                  {passed && <CheckCircle size={18} className="text-[#00FF41]" />}
                </div>
                <h3 className="font-display font-semibold text-[#E0E0E0] mb-2 group-hover:text-white">{ch.title}</h3>
                <p className="text-[#888] text-xs leading-relaxed line-clamp-3 mb-4">{ch.description}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <Zap size={12} className="text-[#FFB800]" />
                    <span className="text-[#FFB800] font-mono text-xs font-semibold">{ch.xpReward} XP</span>
                  </div>
                  <span className="text-[#00FF41] text-xs font-mono group-hover:underline">Open Editor →</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    );
  }

  const dc = difficultyColor[selectedChallenge.difficulty];
  const passed = passedChallenges.has(selectedChallenge.id);
  const hints = selectedChallenge.hints;

  return (
    <div className="h-[calc(100vh-0px)] flex flex-col">
      <div className="flex items-center justify-between px-4 py-3 border-b border-[#1a1a1a] bg-[#0d0d0d] flex-shrink-0">
        <div className="flex items-center gap-3">
          <button onClick={() => setSelectedChallenge(null)} className="flex items-center gap-1.5 text-[#888] hover:text-[#b0b0b0] text-sm transition-colors">
            <ArrowLeft size={14} /> Challenges
          </button>
          <span className="text-[#666]">·</span>
          <span className="text-[#E0E0E0] font-medium text-sm">{selectedChallenge.title}</span>
          <span className="text-xs font-mono px-2 py-0.5 rounded-full font-semibold border"
            style={{ color: dc, borderColor: dc + '40', backgroundColor: dc + '10' }}>
            {selectedChallenge.difficulty}
          </span>
          {passed && <span className="text-xs font-mono text-[#00FF41] flex items-center gap-1"><CheckCircle size={12} /> Passed</span>}
        </div>
        <div className="flex items-center gap-2">
          <Zap size={14} className="text-[#FFB800]" />
          <span className="text-[#FFB800] font-mono text-sm font-semibold">{selectedChallenge.xpReward} XP</span>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">

        {/* LEFT: Description */}
        {leftCollapsed ? (
          <div className="flex-shrink-0 border-r border-[#1a1a1a] bg-[#0d0d0d] flex flex-col items-center py-3 gap-3" style={{ width: '32px' }}>
            <button onClick={() => setLeftCollapsed(false)} className="text-[#555] hover:text-[#888] transition-colors" title="Expand description">
              <ChevronsRight size={14} />
            </button>
            <span className="text-[#444] text-[9px] font-mono uppercase tracking-widest flex-1 flex items-center" style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>
              Description
            </span>
          </div>
        ) : (
          <div className="flex-shrink-0 border-r border-[#1a1a1a] bg-[#0d0d0d] flex flex-col overflow-hidden" style={{ width: `${leftWidth}px` }}>
            <div className="flex items-center justify-between px-3 py-2 border-b border-[#1a1a1a] flex-shrink-0">
              <span className="text-[#b0b0b0] text-[10px] font-mono uppercase tracking-wider">Description</span>
              <button onClick={() => setLeftCollapsed(true)} className="text-[#555] hover:text-[#888] transition-colors" title="Collapse">
                <ChevronsLeft size={13} />
              </button>
            </div>
            <div className="overflow-y-auto flex-1 p-4 space-y-4">
          <div>
            <p className="text-[#b0b0b0] text-xs font-mono uppercase tracking-wider mb-2">Challenge</p>
            <p className="text-[#E0E0E0] text-sm leading-relaxed">{selectedChallenge.description}</p>
          </div>
          <div>
            <p className="text-[#b0b0b0] text-xs font-mono uppercase tracking-wider mb-2">Expected Behaviour</p>
            <p className="text-[#888] text-xs leading-relaxed">{selectedChallenge.expectedBehavior}</p>
          </div>

          <div className="space-y-2">
            <button
              onClick={() => setShowHints(h => !h)}
              className="w-full flex items-center justify-between text-[#FFB800] text-xs font-mono px-3 py-2 rounded-lg bg-[#FFB800]/10 border border-[#FFB800]/20 hover:bg-[#FFB800]/15 transition-all"
            >
              <span className="flex items-center gap-2"><Lightbulb size={12} /> Hints ({hintsUnlocked + 1}/{Math.min(hints.length, 3)})</span>
              {showHints ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
            </button>

            <AnimatePresence>
              {showHints && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <div className="space-y-2 pt-1">
                    {hints[0] && (
                      <div className="rounded-lg border border-[#FFB800]/20 bg-[#FFB800]/5 p-3">
                        <p className="text-[#FFB800] text-[10px] font-mono uppercase mb-1">Hint 1 — Free</p>
                        <p className="text-[#b0b0b0] text-xs leading-relaxed">{hints[0]}</p>
                      </div>
                    )}

                    {hints[1] && (
                      hintsUnlocked >= 1 ? (
                        <motion.div
                          initial={{ opacity: 0, y: -6 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="rounded-lg border border-[#00D4FF]/20 bg-[#00D4FF]/5 p-3"
                        >
                          <p className="text-[#00D4FF] text-[10px] font-mono uppercase mb-1">Hint 2 — Unlocked</p>
                          <p className="text-[#b0b0b0] text-xs leading-relaxed">{hints[1]}</p>
                        </motion.div>
                      ) : (
                        <button
                          onClick={() => setHintsUnlocked(1)}
                          className="w-full flex items-center gap-2 px-3 py-2.5 rounded-lg border border-[#1a1a1a] bg-[#111] text-[#888] text-xs font-mono hover:border-[#00D4FF]/30 hover:text-[#00D4FF] transition-all group"
                        >
                          <Lock size={11} className="group-hover:hidden" />
                          <Unlock size={11} className="hidden group-hover:block text-[#00D4FF]" />
                          Unlock Hint 2
                        </button>
                      )
                    )}

                    {hints[2] && failCount >= 3 && (
                      hintsUnlocked >= 2 ? (
                        <motion.div
                          initial={{ opacity: 0, y: -6 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="rounded-lg border border-[#FF4444]/20 bg-[#FF4444]/5 p-3"
                        >
                          <p className="text-[#FF4444] text-[10px] font-mono uppercase mb-1">Hint 3 — Final</p>
                          <p className="text-[#b0b0b0] text-xs leading-relaxed">{hints[2]}</p>
                        </motion.div>
                      ) : (
                        <button
                          onClick={() => setHintsUnlocked(2)}
                          className="w-full flex items-center gap-2 px-3 py-2.5 rounded-lg border border-[#FF4444]/20 bg-[#FF4444]/5 text-[#FF4444] text-xs font-mono hover:bg-[#FF4444]/10 transition-all"
                        >
                          <Unlock size={11} />
                          Unlock Final Hint (3 fails reached)
                        </button>
                      )
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {failCount >= 3 && (
            <button
              onClick={() => setShowSolution(s => !s)}
              className="w-full flex items-center gap-2 justify-center text-[#888] text-xs font-mono px-3 py-2 rounded-lg bg-[#1a1a1a] border border-[#222] hover:border-[#333] transition-all"
            >
              <Eye size={12} /> {showSolution ? 'Hide' : 'View'} Sample Solution
            </button>
          )}
          {showSolution && (
            <pre className="text-[#888] text-[10px] font-mono bg-[#111] border border-[#1a1a1a] rounded-xl p-3 overflow-auto max-h-48">
              {selectedChallenge.sampleSolution}
            </pre>
          )}
            </div>
          </div>
        )}

        <ResizeHandle onDrag={onDragLeft} />

        <div className="flex-1 flex overflow-hidden min-w-0">
          {/* LEFT: Student challenge editor */}
          <div className="flex-1 flex flex-col overflow-hidden min-w-0">
            <div className="flex-shrink-0" style={{ background: '#252526', borderBottom: '1px solid #1e1e1e' }}>
              <div className="flex items-center" style={{ background: '#2D2D2D' }}>
                <div className="flex items-center gap-2 px-4 py-2 border-r border-b-0 border-[#1e1e1e]"
                  style={{ background: '#1E1E1E', borderBottom: '2px solid #007ACC' }}>
                  <Terminal size={12} style={{ color: '#519ABA' }} />
                  <span style={{ color: '#D4D4D4', fontFamily: 'Consolas, monospace', fontSize: '12px' }}>main.py</span>
                </div>
                <div className="flex-1" />
                <div className="flex items-center gap-2 px-3">
                  {pyLoading && (
                    <span style={{ color: '#858585', fontFamily: 'Consolas, monospace', fontSize: '11px' }}
                      className="flex items-center gap-1">
                      <Loader2 size={11} className="animate-spin" /> Loading Python...
                    </span>
                  )}
                  {pyReady && (
                    <span className="flex items-center gap-1.5" style={{ color: '#4EC9B0', fontFamily: 'Consolas, monospace', fontSize: '11px' }}>
                      <span className="w-1.5 h-1.5 rounded-full" style={{ background: '#4EC9B0' }} />
                      Python Ready
                    </span>
                  )}
                  <button
                    onClick={runCode}
                    disabled={running || !pyReady}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{ background: '#0E639C', color: '#fff', fontSize: '11px', fontFamily: 'Consolas, monospace' }}
                  >
                    {running ? <Loader2 size={11} className="animate-spin" /> : <Play size={11} />}
                    Run
                  </button>
                </div>
              </div>
            </div>

            <VsCodeEditor value={code} onChange={setCode} disabled={running} />

            <div style={{ background: '#1E1E1E', borderTop: '1px solid #3c3c3c', minHeight: '100px', maxHeight: '200px', overflowY: 'auto', flexShrink: 0 }}>
              <div className="flex items-center gap-2 px-4 py-1.5" style={{ background: '#252526', borderBottom: '1px solid #3c3c3c' }}>
                <Terminal size={11} style={{ color: '#519ABA' }} />
                <span style={{ color: '#CCCCCC', fontFamily: 'Consolas, monospace', fontSize: '11px', letterSpacing: '0.05em' }}>TERMINAL</span>
              </div>
              {output ? (
                <pre className="px-4 py-3 whitespace-pre-wrap" style={{
                  fontFamily: '"Cascadia Code", Consolas, "Courier New", monospace',
                  fontSize: '12px',
                  lineHeight: '1.5',
                  color: output.toLowerCase().startsWith('error') ? '#F44747' : '#CCCCCC',
                }}>{output}</pre>
              ) : (
                <p className="px-4 py-3" style={{ color: '#6A9955', fontFamily: 'Consolas, monospace', fontSize: '12px' }}>
                  {`> `}Press Run to execute your code...
                </p>
              )}
            </div>
          </div>

          {/* Example code panel (with resize handle before it) */}
          <ResizeHandle onDrag={onDragExample} />
          {exampleCollapsed ? (
            <div className="flex-shrink-0 flex flex-col items-center py-3 gap-3" style={{ width: '32px', background: '#1E1E1E', borderLeft: '1px solid #3c3c3c' }}>
              <button onClick={() => setExampleCollapsed(false)} className="transition-colors" style={{ color: '#555' }} onMouseOver={e => (e.currentTarget.style.color = '#4EC9B0')} onMouseOut={e => (e.currentTarget.style.color = '#555')} title="Expand example">
                <ChevronsLeft size={14} />
              </button>
              <span className="text-[#444] text-[9px] font-mono uppercase tracking-widest flex-1 flex items-center" style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>
                Example
              </span>
            </div>
          ) : (
            <ExampleCodePanel
              code={selectedChallenge.exampleCode}
              title={selectedChallenge.exampleTitle}
              pyReady={pyReady}
              pyLoading={pyLoading}
              running={exampleRunning}
              output={exampleOutput}
              onRun={runExample}
              onCollapse={() => setExampleCollapsed(true)}
              style={{ width: `${exampleWidth}px`, flexShrink: 0 }}
            />
          )}
        </div>

        <ResizeHandle onDrag={onDragRight} />

        {/* RIGHT: AI Grader */}
        {rightCollapsed ? (
          <div className="flex-shrink-0 border-l border-[#1a1a1a] bg-[#0d0d0d] flex flex-col items-center py-3 gap-3" style={{ width: '32px' }}>
            <button onClick={() => setRightCollapsed(false)} className="text-[#555] hover:text-[#888] transition-colors" title="Expand AI Grader">
              <ChevronsLeft size={14} />
            </button>
            <span className="text-[#444] text-[9px] font-mono uppercase tracking-widest flex-1 flex items-center" style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>
              AI Grader
            </span>
          </div>
        ) : (
          <div className="flex-shrink-0 border-l border-[#1a1a1a] bg-[#0d0d0d] flex flex-col overflow-hidden" style={{ width: `${rightWidth}px` }}>
            <div className="flex items-center justify-between px-4 py-2 border-b border-[#1a1a1a] flex-shrink-0">
              <span className="text-[#b0b0b0] text-xs font-mono uppercase tracking-wider">AI Grader</span>
              <div className="flex items-center gap-2">
                <button onClick={() => setCode(selectedChallenge.starterCode)} className="text-[#555] hover:text-[#888] transition-colors" title="Reset code">
                  <RotateCcw size={13} />
                </button>
                <button onClick={() => setRightCollapsed(true)} className="text-[#555] hover:text-[#888] transition-colors" title="Collapse">
                  <ChevronsRight size={13} />
                </button>
              </div>
            </div>
            <div className="overflow-y-auto flex-1 p-4 space-y-0">

          <button
            onClick={submitForGrading}
            disabled={grading || gradeCooldown > 0 || !code.trim()}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold transition-all mb-3 disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ backgroundColor: mod.color, color: '#0a0a0a' }}
          >
            {grading ? (
              <><Loader2 size={16} className="animate-spin" /> Grading...</>
            ) : gradeCooldown > 0 ? (
              <><Timer size={16} /> Wait {gradeCooldown}s</>
            ) : (
              <><Send size={16} /> Submit for AI Grading</>
            )}
          </button>

          <button
            onClick={requestWalkthrough}
            disabled={walkthroughLoading || !code.trim()}
            className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-semibold border border-[#00D4FF]/30 text-[#00D4FF] bg-[#00D4FF]/5 hover:bg-[#00D4FF]/10 transition-all mb-4 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {walkthroughLoading ? (
              <><Loader2 size={13} className="animate-spin" /> Analysing your code...</>
            ) : (
              <><Wand2 size={13} /> Walk Through My Code</>
            )}
          </button>

          <AnimatePresence>
            {walkthrough && !walkthroughLoading && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="mb-4 bg-[#00D4FF]/5 border border-[#00D4FF]/20 rounded-xl p-4"
              >
                <p className="text-[#00D4FF] text-[10px] font-mono uppercase mb-3 tracking-wider">Code Walkthrough</p>
                <WalkthroughPanel
                  content={walkthrough}
                  sampleSolution={selectedChallenge.sampleSolution}
                />
              </motion.div>
            )}
          </AnimatePresence>

          {!feedback && !grading && !walkthrough && (
            <div className="bg-[#111] border border-[#1a1a1a] rounded-xl p-4">
              <p className="text-[#888] text-xs font-mono text-center">
                Write your code, run it to test, then submit for AI feedback and grading.
              </p>
            </div>
          )}

          {grading && (
            <div className="bg-[#111] border border-[#1a1a1a] rounded-xl p-6 text-center">
              <Loader2 size={24} className="text-[#00FF41] animate-spin mx-auto mb-3" />
              <p className="text-[#b0b0b0] text-xs font-mono">AI is reviewing your code...</p>
              <p className="text-[#888] text-[10px] mt-1">Checking OOP principles & VCAA alignment</p>
            </div>
          )}

          <AnimatePresence>
            {feedback && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
                <div className={`rounded-xl p-4 border ${feedback.passed ? 'border-[#00FF41]/30 bg-[#00FF41]/5' : 'border-[#FF4444]/30 bg-[#FF4444]/5'}`}>
                  <div className="flex items-center gap-3 mb-2">
                    {feedback.passed
                      ? <CheckCircle size={20} className="text-[#00FF41]" />
                      : <XCircle size={20} className="text-[#FF4444]" />
                    }
                    <div>
                      <p className={`font-semibold text-sm ${feedback.passed ? 'text-[#00FF41]' : 'text-[#FF4444]'}`}>
                        {feedback.passed ? 'Challenge Passed!' : 'Not Quite Yet'}
                      </p>
                      <p className="text-[#888] text-[10px] font-mono">Score: {feedback.score}/100</p>
                    </div>
                    <span className="ml-auto font-display text-2xl font-bold" style={{ color: feedback.passed ? green : '#FF4444' }}>
                      {feedback.score}
                    </span>
                  </div>
                  <div className="h-1.5 bg-[#1a1a1a] rounded-full overflow-hidden">
                    <div className="h-full rounded-full transition-all duration-1000"
                      style={{ width: `${feedback.score}%`, backgroundColor: feedback.passed ? green : '#FF4444' }} />
                  </div>
                </div>

                <div className="bg-[#111] border border-[#1a1a1a] rounded-xl p-4">
                  <p className="text-[#b0b0b0] text-xs font-mono uppercase mb-2">Feedback</p>
                  <p className="text-[#b0b0b0] text-xs leading-relaxed">{feedback.feedback}</p>
                </div>

                {feedback.improvements.length > 0 && (
                  <div className="bg-[#111] border border-[#1a1a1a] rounded-xl p-4">
                    <p className="text-[#FFB800] text-xs font-mono uppercase mb-2">Improvements</p>
                    <div className="space-y-1">
                      {feedback.improvements.map((imp, i) => (
                        <div key={i} className="flex gap-2 text-[#b0b0b0] text-xs">
                          <span className="text-[#FFB800] flex-shrink-0">▸</span>
                          <span>{imp}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {feedback.vcaa_tip && (
                  <div className="bg-[#FF4444]/5 border border-[#FF4444]/20 rounded-xl p-4">
                    <p className="text-[#FF4444] text-xs font-mono uppercase mb-2">VCAA Exam Tip</p>
                    <p className="text-[#b0b0b0] text-xs leading-relaxed">{feedback.vcaa_tip}</p>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

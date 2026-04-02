import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Loader2, Bot, User, ChevronDown, Sparkles, GripVertical, GripHorizontal } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { MODULES } from '../data/modules';
import PythonCodeBlock from './PythonCodeBlock';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

const MIN_W = 320;
const MAX_W = 800;
const MIN_H = 400;

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const SUGGESTIONS = [
  'Explain encapsulation vs abstraction',
  'How does inheritance appear in VCE exams?',
  'What is polymorphism in simple terms?',
  'Explain constructors with an analogy',
  'What is a UML class diagram?',
  'Show me an encapsulation example in Python',
];

function formatMessage(text: string) {
  const parts = text.split(/(```[\s\S]*?```)/g);
  return parts.map((part, i) => {
    if (part.startsWith('```')) {
      const match = part.match(/^```(\w*)\n?([\s\S]*?)```$/s);
      const lang = (match?.[1] ?? '').toLowerCase();
      const code = (match?.[2] ?? part.replace(/^```\w*\n?/, '').replace(/```$/, '')).trimEnd();
      if (!lang || lang === 'python' || lang === 'py') {
        return <div key={i} className="my-3"><PythonCodeBlock code={code} /></div>;
      }
      return (
        <pre key={i} className="bg-[#1E1E1E] border border-[#333] rounded-lg p-3 text-[#D4D4D4] font-mono text-xs overflow-x-auto my-2 leading-relaxed">
          {code}
        </pre>
      );
    }

    const inlineParts = part.split(/(`[^`]+`|\*\*[^*]+\*\*)/g);
    return (
      <span key={i}>
        {inlineParts.map((p, j) => {
          if (p.startsWith('`') && p.endsWith('`')) {
            return <code key={j} className="text-[#CE9178] bg-[#1E1E1E] px-1.5 py-0.5 rounded text-xs font-mono border border-[#333]">{p.slice(1, -1)}</code>;
          }
          if (p.startsWith('**') && p.endsWith('**')) {
            return <strong key={j} className="text-[#E0E0E0] font-semibold">{p.slice(2, -2)}</strong>;
          }
          return p.split('\n').map((line, k, arr) => (
            <span key={k}>{line}{k < arr.length - 1 && <br />}</span>
          ));
        })}
      </span>
    );
  });
}

export default function AiTutor() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [panelW, setPanelW] = useState(400);
  const [panelH, setPanelH] = useState(560);
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 640);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const location = useLocation();

  const currentModuleId = location.pathname.match(/\/(learn|quiz|challenges)\/([^/]+)/)?.[2];
  const currentModule = MODULES.find(m => m.id === currentModuleId);

  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth < 640);
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, []);

  useEffect(() => {
    if (open) {
      setTimeout(() => messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
    }
  }, [messages, open]);

  const startWidthResize = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const startX = e.clientX;
    const startW = panelW;

    const onMove = (ev: MouseEvent) => {
      const dw = startX - ev.clientX;
      setPanelW(Math.max(MIN_W, Math.min(MAX_W, window.innerWidth - 48, startW + dw)));
    };
    const onUp = () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseup', onUp);
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    };
    document.body.style.cursor = 'col-resize';
    document.body.style.userSelect = 'none';
    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseup', onUp);
  }, [panelW]);

  const startHeightResize = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const startY = e.clientY;
    const startH = panelH;

    const onMove = (ev: MouseEvent) => {
      const dh = startY - ev.clientY;
      setPanelH(Math.max(MIN_H, Math.min(window.innerHeight - 120, startH + dh)));
    };
    const onUp = () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseup', onUp);
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    };
    document.body.style.cursor = 'row-resize';
    document.body.style.userSelect = 'none';
    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseup', onUp);
  }, [panelH]);

  async function sendMessage(text: string) {
    if (!text.trim() || loading) return;
    setError('');
    const userMsg: Message = { role: 'user', content: text };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch(`${SUPABASE_URL}/functions/v1/ai-tutor`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: newMessages.map(m => ({ role: m.role, content: m.content })),
          currentTopic: currentModule?.title || 'General OOP',
        }),
      });

      const data = await response.json();
      if (data.error) throw new Error(data.error);
      setMessages(prev => [...prev, { role: 'assistant', content: data.message }]);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to get response. Please ensure CLAUDE_API_KEY is configured.');
    }
    setLoading(false);
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter' && !e.shiftKey && !isMobile) {
      e.preventDefault();
      sendMessage(input);
    }
  }

  const mobileStyle: React.CSSProperties = {
    position: 'fixed',
    left: 0,
    right: 0,
    bottom: 0,
    top: 'auto',
    width: '100%',
    height: '82vh',
    zIndex: 50,
    borderRadius: '20px 20px 0 0',
  };

  const desktopStyle: React.CSSProperties = {
    position: 'fixed',
    bottom: 24,
    right: 24,
    width: panelW,
    height: panelH,
    zIndex: 50,
    borderRadius: '16px',
  };

  return (
    <>
      <motion.button
        onClick={() => setOpen(o => !o)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-[#00FF41] text-[#0a0a0a] flex items-center justify-center shadow-lg"
        style={{ boxShadow: '0 0 20px rgba(0, 255, 65, 0.4)' }}
      >
        {open ? <X size={22} /> : <MessageSquare size={22} />}
      </motion.button>

      <AnimatePresence>
        {open && (
          <>
            {isMobile && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-40 bg-black/50"
                onClick={() => setOpen(false)}
              />
            )}
            <motion.div
              key="panel"
              initial={isMobile ? { y: '100%' } : { opacity: 0, scale: 0.95, y: 20 }}
              animate={isMobile ? { y: 0 } : { opacity: 1, scale: 1, y: 0 }}
              exit={isMobile ? { y: '100%' } : { opacity: 0, scale: 0.95, y: 20 }}
              transition={isMobile ? { type: 'spring', stiffness: 300, damping: 30 } : { duration: 0.2 }}
              style={isMobile ? mobileStyle : desktopStyle}
              className="bg-[#0d0d0d] border border-[#1a1a1a] shadow-2xl flex flex-col overflow-hidden"
            >
              {!isMobile && (
                <div
                  onMouseDown={startHeightResize}
                  className="absolute top-0 left-0 right-0 h-2.5 cursor-row-resize z-20 flex items-center justify-center group"
                  style={{ borderRadius: '16px 16px 0 0' }}
                >
                  <div className="w-8 h-1 rounded-full bg-[#333] group-hover:bg-[#007ACC] transition-colors duration-150 flex items-center justify-center">
                    <GripHorizontal size={8} className="text-[#555] group-hover:text-[#007ACC]" />
                  </div>
                </div>
              )}

              {isMobile && (
                <div className="flex items-center justify-center pt-3 pb-1 flex-shrink-0">
                  <div className="w-10 h-1 rounded-full bg-[#333]" />
                </div>
              )}

              <div className="flex items-center justify-between px-5 py-3.5 border-b border-[#1a1a1a] bg-[#111] flex-shrink-0" style={{ marginTop: isMobile ? 0 : '10px' }}>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#00FF41]/10 border border-[#00FF41]/30 flex items-center justify-center flex-shrink-0">
                    <Sparkles size={16} className="text-[#00FF41]" />
                  </div>
                  <div>
                    <p className="text-[#E0E0E0] font-display font-semibold text-sm">AI OOP Tutor</p>
                    <p className="text-[#888] font-mono text-[10px]">
                      {currentModule ? `Context: ${currentModule.title}` : 'VCAA-aligned assistance'}
                    </p>
                  </div>
                </div>
                <button onClick={() => setOpen(false)} className="text-[#777] hover:text-[#b0b0b0] transition-colors p-1">
                  <ChevronDown size={18} />
                </button>
              </div>

              <div className="flex flex-1 overflow-hidden">
                {!isMobile && (
                  <div
                    onMouseDown={startWidthResize}
                    className="absolute left-0 top-12 bottom-0 w-2.5 cursor-col-resize z-20 flex items-center justify-center group"
                    style={{ borderRadius: '0 0 0 16px' }}
                  >
                    <div className="h-8 w-1 rounded-full bg-[#333] group-hover:bg-[#007ACC] transition-colors duration-150 flex items-center justify-center">
                      <GripVertical size={8} className="text-[#555] group-hover:text-[#007ACC]" />
                    </div>
                  </div>
                )}

                <div className="flex-1 flex flex-col overflow-hidden" style={{ paddingLeft: isMobile ? 0 : '10px' }}>
                  <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {messages.length === 0 && (
                      <div className="space-y-4">
                        <div className="bg-[#111] border border-[#1a1a1a] rounded-xl p-4">
                          <div className="flex items-center gap-2 mb-2">
                            <Bot size={16} className="text-[#00FF41]" />
                            <span className="text-[#00FF41] font-mono text-xs">AI Tutor</span>
                          </div>
                          <p className="text-[#b0b0b0] text-sm leading-relaxed">
                            G'day! I'm your VCAA-aligned OOP tutor. Ask me anything about Object-Oriented Programming for your VCE Software Development exam.
                          </p>
                        </div>
                        <div>
                          <p className="text-[#888] font-mono text-[10px] uppercase tracking-wider mb-2">Suggested Questions</p>
                          <div className="space-y-2">
                            {SUGGESTIONS.map(s => (
                              <button
                                key={s}
                                onClick={() => sendMessage(s)}
                                className="w-full text-left text-xs text-[#b0b0b0] px-3 py-2 rounded-lg bg-[#111] border border-[#1a1a1a] hover:border-[#333] hover:text-[#E0E0E0] transition-all"
                              >
                                {s}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}

                    {messages.map((msg, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
                      >
                        <div className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 ${
                          msg.role === 'user' ? 'bg-[#00FF41]/10 border border-[#00FF41]/30' : 'bg-[#1a1a1a] border border-[#2a2a2a]'
                        }`}>
                          {msg.role === 'user'
                            ? <User size={13} className="text-[#00FF41]" />
                            : <Bot size={13} className="text-[#b0b0b0]" />
                          }
                        </div>
                        <div className={`flex-1 min-w-0 rounded-xl p-3 text-sm leading-relaxed ${
                          msg.role === 'user'
                            ? 'bg-[#00FF41]/10 border border-[#00FF41]/20 text-[#E0E0E0]'
                            : 'bg-[#111] border border-[#1a1a1a] text-[#b0b0b0]'
                        }`}>
                          <div className="overflow-x-hidden">{formatMessage(msg.content)}</div>
                        </div>
                      </motion.div>
                    ))}

                    {loading && (
                      <div className="flex gap-3">
                        <div className="w-7 h-7 rounded-lg bg-[#1a1a1a] border border-[#2a2a2a] flex items-center justify-center flex-shrink-0">
                          <Bot size={13} className="text-[#b0b0b0]" />
                        </div>
                        <div className="bg-[#111] border border-[#1a1a1a] rounded-xl p-3 flex items-center gap-2">
                          <Loader2 size={14} className="text-[#00FF41] animate-spin" />
                          <span className="text-[#888] text-xs font-mono">Thinking...</span>
                        </div>
                      </div>
                    )}

                    {error && (
                      <div className="bg-[#FF4444]/10 border border-[#FF4444]/30 rounded-xl p-3">
                        <p className="text-[#FF4444] text-xs font-mono">{error}</p>
                      </div>
                    )}

                    <div ref={messagesEndRef} />
                  </div>

                  <div className="p-4 border-t border-[#1a1a1a] flex-shrink-0">
                    <div className="flex gap-3 items-end">
                      <textarea
                        ref={inputRef}
                        value={input}
                        onChange={e => setInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Ask about OOP..."
                        rows={1}
                        className="flex-1 bg-[#111] border border-[#1a1a1a] rounded-xl px-4 py-3 text-[#E0E0E0] text-sm font-mono placeholder-[#333] focus:outline-none focus:border-[#00FF41]/50 resize-none transition-all"
                        style={{ maxHeight: '120px' }}
                      />
                      <button
                        onClick={() => sendMessage(input)}
                        disabled={!input.trim() || loading}
                        className="w-10 h-10 rounded-xl bg-[#00FF41] text-[#0a0a0a] flex items-center justify-center flex-shrink-0 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#00cc33] transition-all"
                      >
                        <Send size={15} />
                      </button>
                    </div>
                    {!isMobile && (
                      <p className="text-[#666] text-[9px] font-mono text-center mt-2">Enter to send · Shift+Enter for new line</p>
                    )}
                    {isMobile && (
                      <p className="text-[#666] text-[9px] font-mono text-center mt-2">Tap send button to submit</p>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, X, Loader2, BookOpen, Lightbulb, Code2, AlertTriangle } from 'lucide-react';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

interface ExplainResult {
  explanation: string;
  analogy: string;
  code_example: string;
  exam_tip: string;
}

interface TriggerPos {
  x: number;
  y: number;
}

export default function HighlightExplain() {
  const [triggerPos, setTriggerPos] = useState<TriggerPos | null>(null);
  const [selectedTerm, setSelectedTerm] = useState('');
  const [result, setResult] = useState<ExplainResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [panelPos, setPanelPos] = useState<TriggerPos | null>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const loadingRef = useRef(false);
  const selectedTermRef = useRef('');
  const triggerPosRef = useRef<TriggerPos | null>(null);

  const dismiss = useCallback(() => {
    setTriggerPos(null);
    triggerPosRef.current = null;
    setResult(null);
    setSelectedTerm('');
    selectedTermRef.current = '';
    setPanelPos(null);
    loadingRef.current = false;
    setLoading(false);
  }, []);

  const triggerExplain = useCallback(async (term: string, pos: TriggerPos) => {
    if (!term || loadingRef.current) return;
    loadingRef.current = true;
    setLoading(true);
    setResult(null);
    setPanelPos(pos);

    try {
      const response = await fetch(`${SUPABASE_URL}/functions/v1/explain-term`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ term }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.error || data?.message || `Server error (${response.status})`);
      }
      if (data.error) {
        throw new Error(data.error);
      }

      const result: ExplainResult = {
        explanation: data.explanation || '',
        analogy: data.analogy || '',
        code_example: data.code_example || '',
        exam_tip: data.exam_tip || '',
      };

      if (!result.explanation) {
        throw new Error('No explanation returned. Please try again.');
      }

      setResult(result);
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Could not load explanation. Please try again.';
      setResult({
        explanation: msg,
        analogy: '',
        code_example: '',
        exam_tip: '',
      });
    } finally {
      loadingRef.current = false;
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    function handleMouseUp(e: MouseEvent) {
      if (e.button !== 0) return;
      const target = e.target as HTMLElement;
      if (target.closest('[data-highlight-ignore]')) return;

      setTimeout(() => {
        const sel = window.getSelection();
        const text = sel?.toString().trim() ?? '';

        if (!text || text.length < 2 || text.length > 120) {
          if (!target.closest('[data-highlight-panel]')) {
            setTriggerPos(null);
            triggerPosRef.current = null;
          }
          return;
        }

        if (target.closest('[data-highlight-panel]')) return;

        setSelectedTerm(text);
        selectedTermRef.current = text;
        const pos = { x: e.clientX, y: e.clientY };
        setTriggerPos(pos);
        triggerPosRef.current = pos;
        setResult(null);
      }, 10);
    }

    function handleContextMenu(e: MouseEvent) {
      const target = e.target as HTMLElement;
      if (target.closest('[data-highlight-ignore]') || target.closest('[data-highlight-panel]')) return;

      const existingSel = window.getSelection()?.toString().trim() ?? '';
      if (existingSel && existingSel.length >= 2 && existingSel.length <= 120) {
        e.preventDefault();
        const term = existingSel;
        const pos = { x: e.clientX, y: e.clientY };
        setSelectedTerm(term);
        selectedTermRef.current = term;
        setTriggerPos(null);
        triggerPosRef.current = null;
        triggerExplain(term, pos);
        return;
      }

      const range = document.caretRangeFromPoint?.(e.clientX, e.clientY);
      if (!range) return;

      const textNode = range.startContainer;
      if (textNode.nodeType !== Node.TEXT_NODE) return;

      const fullText = textNode.textContent ?? '';
      let start = range.startOffset;
      let end = range.startOffset;

      while (start > 0 && /\w/.test(fullText[start - 1])) start--;
      while (end < fullText.length && /\w/.test(fullText[end])) end++;

      const word = fullText.slice(start, end).trim();
      if (!word || word.length < 2) return;

      e.preventDefault();

      const wordRange = document.createRange();
      wordRange.setStart(textNode, start);
      wordRange.setEnd(textNode, end);
      const sel = window.getSelection();
      sel?.removeAllRanges();
      sel?.addRange(wordRange);

      const pos = { x: e.clientX, y: e.clientY };
      setSelectedTerm(word);
      selectedTermRef.current = word;
      setTriggerPos(null);
      triggerPosRef.current = null;
      triggerExplain(word, pos);
    }

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') dismiss();
    }

    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [dismiss, triggerExplain]);

  async function explain() {
    const term = selectedTermRef.current || selectedTerm;
    const pos = triggerPosRef.current || triggerPos;
    if (!term || !pos || loadingRef.current) return;
    setTriggerPos(null);
    triggerPosRef.current = null;
    await triggerExplain(term, pos);
  }

  const panelX = panelPos ? Math.min(Math.max(8, panelPos.x - 20), window.innerWidth - 360) : 0;
  const panelY = panelPos
    ? Math.min(panelPos.y + 16, window.innerHeight - 440)
    : 0;

  const displayTerm = selectedTermRef.current || selectedTerm;

  return (
    <>
      <AnimatePresence>
        {triggerPos && (
          <motion.button
            data-highlight-ignore
            key="trigger"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            onClick={explain}
            style={{
              position: 'fixed',
              left: Math.min(triggerPos.x, window.innerWidth - 160),
              top: Math.max(8, triggerPos.y - 44),
              zIndex: 9999,
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#FFB800] text-[#0a0a0a] text-xs font-semibold shadow-lg hover:bg-[#ffc833] transition-colors"
          >
            <Sparkles size={12} />
            Explain this
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {(loading || result) && panelPos && (
          <motion.div
            data-highlight-panel
            ref={panelRef}
            key="panel"
            initial={{ opacity: 0, y: 8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 300, damping: 24 }}
            style={{
              position: 'fixed',
              left: panelX,
              top: Math.max(8, panelY),
              zIndex: 9998,
              width: 340,
            }}
            className="bg-[#111] border border-[#222] rounded-2xl shadow-2xl overflow-hidden"
          >
            <div className="flex items-center justify-between px-4 py-3 border-b border-[#1a1a1a]">
              <div className="flex items-center gap-2">
                <Sparkles size={13} className="text-[#FFB800]" />
                <span className="text-[#E0E0E0] text-xs font-semibold truncate max-w-[220px]">
                  {displayTerm}
                </span>
              </div>
              <button
                data-highlight-ignore
                onClick={dismiss}
                className="text-[#777] hover:text-[#b0b0b0] transition-colors flex-shrink-0 p-1"
              >
                <X size={14} />
              </button>
            </div>

            {loading && (
              <div className="flex items-center justify-center py-10 gap-3">
                <Loader2 size={18} className="text-[#FFB800] animate-spin" />
                <span className="text-[#b0b0b0] text-xs font-mono">Looking that up...</span>
              </div>
            )}

            {result && !loading && (
              <div className="p-4 space-y-3 max-h-[380px] overflow-y-auto">
                <div className="flex gap-2.5">
                  <BookOpen size={13} className="text-[#00FF41] mt-0.5 flex-shrink-0" />
                  <p className="text-[#D4D4D4] text-xs leading-relaxed">{result.explanation}</p>
                </div>

                {result.analogy && (
                  <div className="flex gap-2.5">
                    <Lightbulb size={13} className="text-[#FFB800] mt-0.5 flex-shrink-0" />
                    <p className="text-[#C8C8C8] text-xs leading-relaxed">{result.analogy}</p>
                  </div>
                )}

                {result.code_example && (
                  <div className="rounded-lg bg-[#1E1E1E] border border-[#333] p-3">
                    <div className="flex items-center gap-1.5 mb-2">
                      <Code2 size={10} className="text-[#569CD6]" />
                      <span className="text-[#858585] text-[9px] font-mono uppercase tracking-wider">Example</span>
                    </div>
                    <pre className="text-[#D4D4D4] font-mono text-[10px] leading-relaxed whitespace-pre-wrap overflow-x-auto">
                      {result.code_example}
                    </pre>
                  </div>
                )}

                {result.exam_tip && (
                  <div className="flex gap-2.5 bg-[#FF4444]/8 border border-[#FF4444]/20 rounded-lg p-3">
                    <AlertTriangle size={12} className="text-[#FF6B6B] mt-0.5 flex-shrink-0" />
                    <p className="text-[#C8C8C8] text-[10px] leading-relaxed">{result.exam_tip}</p>
                  </div>
                )}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

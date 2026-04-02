import { useState, useCallback } from 'react';
import { Play, Loader2, Copy, Check, X } from 'lucide-react';
import { useAccentGreen } from '../lib/colors';

const KEYWORDS = new Set([
  'False', 'None', 'True', 'and', 'as', 'assert', 'async', 'await',
  'break', 'class', 'continue', 'def', 'del', 'elif', 'else', 'except',
  'finally', 'for', 'from', 'global', 'if', 'import', 'in', 'is',
  'lambda', 'nonlocal', 'not', 'or', 'pass', 'raise', 'return', 'try',
  'while', 'with', 'yield',
]);

const BUILTINS = new Set([
  'print', 'range', 'len', 'list', 'dict', 'set', 'tuple', 'str', 'int',
  'float', 'bool', 'type', 'super', 'isinstance', 'hasattr', 'getattr',
  'setattr', 'enumerate', 'zip', 'map', 'filter', 'sorted', 'reversed',
  'abs', 'max', 'min', 'sum', 'round', 'input', 'open', 'repr', 'id',
  'object', 'property', 'staticmethod', 'classmethod',
  'Exception', 'ValueError', 'TypeError', 'AttributeError', 'IndexError',
  'KeyError', 'StopIteration', 'math',
]);

type TokenType = 'keyword' | 'builtin' | 'string' | 'comment' | 'number'
  | 'identifier' | 'fnName' | 'className' | 'self' | 'decorator' | 'other';

interface Token { type: TokenType; value: string }

function tokenizeLine(line: string, inMultiline: string | null): [Token[], string | null] {
  const tokens: Token[] = [];
  let i = 0;
  let multilineState = inMultiline;

  if (multilineState) {
    const closeIdx = line.indexOf(multilineState);
    if (closeIdx === -1) {
      tokens.push({ type: 'string', value: line });
      return [tokens, multilineState];
    }
    tokens.push({ type: 'string', value: line.slice(0, closeIdx + multilineState.length) });
    i = closeIdx + multilineState.length;
    multilineState = null;
  }

  let prevType: TokenType | null = null;

  while (i < line.length) {
    if (line[i] === '#') {
      tokens.push({ type: 'comment', value: line.slice(i) });
      break;
    }

    if (line[i] === '@') {
      let j = i + 1;
      while (j < line.length && /[\w.]/.test(line[j])) j++;
      tokens.push({ type: 'decorator', value: line.slice(i, j) });
      i = j;
      prevType = 'decorator';
      continue;
    }

    const strPrefixMatch = line.slice(i).match(/^(f|b|r|rb|br|fr|rf)?(['"])/i);
    if (strPrefixMatch) {
      const prefix = strPrefixMatch[1] || '';
      const q = strPrefixMatch[2];
      const start = i;
      i += prefix.length + 1;
      const tripleQ = line[i] === q && line[i + 1] === q;
      if (tripleQ) {
        i += 2;
        const closeIdx = line.indexOf(q + q + q, i);
        if (closeIdx === -1) {
          tokens.push({ type: 'string', value: line.slice(start) });
          return [tokens, q + q + q];
        }
        tokens.push({ type: 'string', value: line.slice(start, closeIdx + 3) });
        i = closeIdx + 3;
      } else {
        while (i < line.length && line[i] !== q) {
          if (line[i] === '\\') i++;
          i++;
        }
        if (i < line.length) i++;
        tokens.push({ type: 'string', value: line.slice(start, i) });
      }
      prevType = 'string';
      continue;
    }

    if (/\d/.test(line[i]) || (line[i] === '.' && /\d/.test(line[i + 1] || ''))) {
      let j = i;
      while (j < line.length && /[\d.eExXoObBjJ]/.test(line[j])) {
        if ((line[j] === 'e' || line[j] === 'E') && (line[j + 1] === '+' || line[j + 1] === '-')) j++;
        j++;
      }
      tokens.push({ type: 'number', value: line.slice(i, j) });
      i = j;
      prevType = 'number';
      continue;
    }

    if (/[a-zA-Z_]/.test(line[i])) {
      let j = i;
      while (j < line.length && /\w/.test(line[j])) j++;
      const word = line.slice(i, j);
      let type: TokenType;
      if (KEYWORDS.has(word)) {
        type = 'keyword';
      } else if (word === 'self' || word === 'cls') {
        type = 'self';
      } else if (BUILTINS.has(word)) {
        type = 'builtin';
      } else if (prevType === 'keyword') {
        const lastKw = tokens[tokens.length - 1]?.value;
        type = lastKw === 'def' ? 'fnName' : lastKw === 'class' ? 'className' : 'identifier';
      } else {
        type = 'identifier';
      }
      tokens.push({ type, value: word });
      i = j;
      prevType = type;
      continue;
    }

    tokens.push({ type: 'other', value: line[i] });
    i++;
    prevType = 'other';
  }

  return [tokens, multilineState];
}

const COLOR: Record<TokenType, string> = {
  keyword: '#569CD6',
  builtin: '#4EC9B0',
  string: '#CE9178',
  comment: '#6A9955',
  number: '#B5CEA8',
  identifier: '#D4D4D4',
  fnName: '#DCDCAA',
  className: '#4EC9B0',
  self: '#9CDCFE',
  decorator: '#DCDCAA',
  other: '#D4D4D4',
};

function renderTokens(tokens: Token[]) {
  return tokens.map((tok, i) => (
    <span key={i} style={{ color: COLOR[tok.type] }}>{tok.value}</span>
  ));
}

let pyodideInstance: any = null;
let pyodidePromise: Promise<any> | null = null;

async function getPyodide(): Promise<any> {
  if (pyodideInstance) return pyodideInstance;
  if (!pyodidePromise) {
    pyodidePromise = (async () => {
      if (!(window as any).loadPyodide) {
        await new Promise<void>((resolve, reject) => {
          const el = document.createElement('script');
          el.src = 'https://cdn.jsdelivr.net/pyodide/v0.25.1/full/pyodide.js';
          el.onload = () => resolve();
          el.onerror = () => reject(new Error('Failed to load Python runtime'));
          document.head.appendChild(el);
        });
      }
      pyodideInstance = await (window as any).loadPyodide();
      return pyodideInstance;
    })();
  }
  return pyodidePromise;
}

export default function PythonCodeBlock({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);
  const [status, setStatus] = useState<'idle' | 'loading' | 'running'>('idle');
  const [output, setOutput] = useState<string | null>(null);
  const [isError, setIsError] = useState(false);
  const green = useAccentGreen();

  function copy() {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  const run = useCallback(async () => {
    setOutput(null);
    setIsError(false);

    const isFirstLoad = !pyodideInstance;
    setStatus(isFirstLoad ? 'loading' : 'running');

    try {
      const py = await getPyodide();
      setStatus('running');

      let out = '';
      py.setStdout({ batched: (s: string) => { out += s; } });
      py.setStderr({ batched: (s: string) => { out += s; } });

      await py.runPythonAsync(code);
      setOutput(out.trim() || '(no output)');
      setIsError(false);
    } catch (e: any) {
      const msg: string = e.message || String(e);
      const lines = msg.split('\n');
      const relevant = lines
        .filter((l: string) => !l.startsWith('  File "<exec>"'))
        .slice(-8)
        .join('\n');
      setOutput(relevant || msg);
      setIsError(true);
    } finally {
      setStatus('idle');
    }
  }, [code]);

  const rawLines = code.split('\n');
  let multiline: string | null = null;
  const highlightedLines = rawLines.map((line) => {
    const [tokens, next] = tokenizeLine(line, multiline);
    multiline = next;
    return tokens;
  });

  return (
    <div className="rounded-xl overflow-hidden border border-[#333333] shadow-lg">
      <div className="flex items-center justify-between px-4 py-2.5 bg-[#252526] border-b border-[#333333]">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#FF5F57]" />
          <div className="w-3 h-3 rounded-full bg-[#FEBC2E]" />
          <div className="w-3 h-3 rounded-full bg-[#28C840]" />
          <span className="text-[#858585] font-mono text-xs ml-2">solution.py</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={copy}
            className="flex items-center gap-1 text-[#858585] hover:text-[#D4D4D4] font-mono text-[10px] transition-colors px-2 py-1 rounded hover:bg-[#2d2d2d]"
          >
            {copied ? <><Check size={10} /> COPIED</> : <><Copy size={10} /> COPY</>}
          </button>
          <button
            onClick={run}
            disabled={status !== 'idle'}
            className="flex items-center gap-1.5 px-3 py-1 rounded text-xs font-semibold transition-all border disabled:opacity-60 disabled:cursor-not-allowed"
            style={{
              backgroundColor: green === '#00FF41' ? 'rgba(0,255,65,0.1)' : 'rgba(22,101,52,0.1)',
              color: green,
              borderColor: green === '#00FF41' ? 'rgba(0,255,65,0.25)' : 'rgba(22,101,52,0.3)',
            }}
          >
            {status === 'loading' ? (
              <><Loader2 size={11} className="animate-spin" />Loading Python...</>
            ) : status === 'running' ? (
              <><Loader2 size={11} className="animate-spin" />Running...</>
            ) : (
              <><Play size={11} fill="currentColor" />Run</>
            )}
          </button>
        </div>
      </div>

      <pre className="overflow-x-auto bg-[#1E1E1E] text-[13px] font-mono leading-[1.6] py-4">
        <code>
          {highlightedLines.map((tokens, i) => (
            <div key={i} className="flex hover:bg-[#ffffff08] px-0">
              <span
                className="select-none text-right pr-4 pl-4 border-r border-[#333333] min-w-[3.5rem] inline-block flex-shrink-0"
                style={{ color: '#636363' }}
              >
                {i + 1}
              </span>
              <span className="pl-4 pr-4 flex-1">{renderTokens(tokens)}</span>
            </div>
          ))}
        </code>
      </pre>

      {output !== null && (
        <div className="border-t border-[#333333]">
          <div className="flex items-center justify-between px-4 py-2 bg-[#1E1E1E] border-b border-[#333333]">
            <div className="flex items-center gap-3">
              <span className="text-[10px] font-mono tracking-wider text-[#858585] uppercase">Output</span>
              <span
                className="text-[10px] font-mono"
                style={{ color: isError ? '#F44747' : green }}
              >
                {isError ? '● Error' : '● OK'}
              </span>
            </div>
            <button
              onClick={() => setOutput(null)}
              className="text-[#636363] hover:text-[#D4D4D4] transition-colors rounded p-0.5 hover:bg-[#2d2d2d]"
            >
              <X size={13} />
            </button>
          </div>
          <pre
            className="p-4 font-mono text-[13px] leading-relaxed max-h-60 overflow-y-auto bg-[#1E1E1E]"
            style={{ color: isError ? '#F44747' : '#D4D4D4' }}
          >
            {output}
          </pre>
        </div>
      )}
    </div>
  );
}

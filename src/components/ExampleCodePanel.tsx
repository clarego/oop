import { Play, Loader2, BookOpen, Terminal, ChevronsRight } from 'lucide-react';
import { highlightPython } from '../utils/pythonHighlight';

interface Props {
  code: string;
  title: string;
  pyReady: boolean;
  pyLoading: boolean;
  running: boolean;
  output: string;
  onRun: () => void;
  onCollapse?: () => void;
  style?: React.CSSProperties;
}

const FONT = '"Fira Code", "Cascadia Code", "JetBrains Mono", Consolas, "Courier New", monospace';

export default function ExampleCodePanel({ code, title, pyReady, pyLoading, running, output, onRun, onCollapse, style }: Props) {
  const lines = code.split('\n');
  const lineNums = Array.from({ length: lines.length }, (_, i) => i + 1);

  return (
    <div className="flex flex-col overflow-hidden" style={{ background: '#1E1E1E', borderLeft: '1px solid #3c3c3c', minWidth: 0, ...style }}>
      <div className="flex-shrink-0" style={{ background: '#252526', borderBottom: '1px solid #1e1e1e' }}>
        <div className="flex items-center" style={{ background: '#2D2D2D' }}>
          <div
            className="flex items-center gap-2 px-4 py-2 border-r border-[#1e1e1e] flex-shrink-0"
            style={{ background: '#1E1E1E', borderBottom: '2px solid #4EC9B0' }}
          >
            <BookOpen size={12} style={{ color: '#4EC9B0' }} />
            <span style={{ color: '#D4D4D4', fontFamily: 'Consolas, monospace', fontSize: '12px' }}>example.py</span>
          </div>
          <div className="flex-1 px-3 min-w-0 overflow-hidden">
            <span
              className="block truncate"
              style={{ color: '#858585', fontFamily: 'Consolas, monospace', fontSize: '11px' }}
            >
              {title}
            </span>
          </div>
          <div className="flex items-center gap-2 px-3 flex-shrink-0">
            {onCollapse && (
              <button
                onClick={onCollapse}
                className="text-[#858585] hover:text-[#CCCCCC] transition-colors"
                title="Collapse example panel"
              >
                <ChevronsRight size={13} />
              </button>
            )}
            {pyLoading && (
              <span
                className="flex items-center gap-1"
                style={{ color: '#858585', fontFamily: 'Consolas, monospace', fontSize: '11px' }}
              >
                <Loader2 size={11} className="animate-spin" /> Loading...
              </span>
            )}
            <button
              onClick={onRun}
              disabled={running || !pyReady}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ background: '#4EC9B0', color: '#0a0a0a', fontSize: '11px', fontFamily: 'Consolas, monospace' }}
            >
              {running ? <Loader2 size={11} className="animate-spin" /> : <Play size={11} />}
              Run Example
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden" style={{ fontFamily: FONT }}>
        <div
          className="select-none flex-shrink-0 text-right overflow-hidden"
          style={{
            background: '#1E1E1E',
            color: '#858585',
            fontFamily: FONT,
            fontSize: '13px',
            lineHeight: '1.6',
            padding: '16px 12px 16px 16px',
            minWidth: '52px',
            userSelect: 'none',
          }}
        >
          {lineNums.map(n => <div key={n}>{n}</div>)}
        </div>

        <div
          className="flex-1 overflow-auto"
          style={{
            fontFamily: FONT,
            fontSize: '13px',
            lineHeight: '1.6',
            padding: '16px 16px 16px 0',
            color: '#D4D4D4',
            whiteSpace: 'pre',
            overflowWrap: 'normal',
            tabSize: 4,
          }}
        >
          {highlightPython(code)}
        </div>
      </div>

      <div
        style={{
          background: '#1E1E1E',
          borderTop: '1px solid #3c3c3c',
          minHeight: '80px',
          maxHeight: '150px',
          overflowY: 'auto',
          flexShrink: 0,
        }}
      >
        <div className="flex items-center gap-2 px-4 py-1.5" style={{ background: '#252526', borderBottom: '1px solid #3c3c3c' }}>
          <Terminal size={11} style={{ color: '#4EC9B0' }} />
          <span style={{ color: '#CCCCCC', fontFamily: 'Consolas, monospace', fontSize: '11px', letterSpacing: '0.05em' }}>
            EXAMPLE OUTPUT
          </span>
        </div>
        {output ? (
          <pre
            className="px-4 py-3 whitespace-pre-wrap"
            style={{
              fontFamily: '"Cascadia Code", Consolas, "Courier New", monospace',
              fontSize: '12px',
              lineHeight: '1.5',
              color: output.toLowerCase().startsWith('error') ? '#F44747' : '#CCCCCC',
            }}
          >
            {output}
          </pre>
        ) : (
          <p className="px-4 py-3" style={{ color: '#6A9955', fontFamily: 'Consolas, monospace', fontSize: '12px' }}>
            {`> `}Run the example to see output...
          </p>
        )}
      </div>
    </div>
  );
}

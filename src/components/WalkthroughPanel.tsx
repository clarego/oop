import { useState, ReactNode } from 'react';
import { highlightPython } from '../utils/pythonHighlight';
import { useAccentGreen } from '../lib/colors';

interface Props {
  content: string;
  sampleSolution: string;
}

function parseInline(text: string, keyPrefix: string, green: string): ReactNode[] {
  const parts = text.split(/(\*\*[^*]+\*\*|`[^`]+`)/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong key={`${keyPrefix}-b-${i}`} style={{ color: '#E0E0E0', fontWeight: 600 }}>
          {part.slice(2, -2)}
        </strong>
      );
    }
    if (part.startsWith('`') && part.endsWith('`') && part.length > 2) {
      return (
        <code
          key={`${keyPrefix}-ic-${i}`}
          style={{
            color: green,
            background: green === '#00FF41' ? 'rgba(0,255,65,0.08)' : 'rgba(22,101,52,0.1)',
            padding: '1px 5px',
            borderRadius: '3px',
            fontFamily: '"Fira Code", Consolas, monospace',
            fontSize: '11px',
          }}
        >
          {part.slice(1, -1)}
        </code>
      );
    }
    return <span key={`${keyPrefix}-t-${i}`}>{part}</span>;
  });
}

function VsCodeBlock({ code, keyId }: { code: string; keyId: string }) {
  return (
    <div
      key={keyId}
      style={{
        background: '#1E1E1E',
        borderRadius: '8px',
        border: '1px solid #3c3c3c',
        overflow: 'hidden',
        margin: '8px 0',
      }}
    >
      <div
        style={{
          background: '#252526',
          padding: '3px 12px',
          borderBottom: '1px solid #3c3c3c',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
        }}
      >
        <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#519ABA' }} />
        <span
          style={{
            color: '#858585',
            fontFamily: 'Consolas, monospace',
            fontSize: '10px',
            letterSpacing: '0.06em',
          }}
        >
          PYTHON
        </span>
      </div>
      <pre
        style={{
          fontFamily: '"Fira Code", "Cascadia Code", "JetBrains Mono", Consolas, monospace',
          fontSize: '12px',
          lineHeight: '1.65',
          padding: '12px 16px',
          margin: 0,
          overflowX: 'auto',
          background: 'transparent',
          whiteSpace: 'pre',
        }}
      >
        {highlightPython(code)}
      </pre>
    </div>
  );
}

function parseSections(text: string, green: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  const segments = text.split(/(```(?:python|py)?\n[\s\S]*?```)/g);

  segments.forEach((seg, segIdx) => {
    if (seg.startsWith('```')) {
      const code = seg.replace(/^```(?:python|py)?\n?/, '').replace(/\n?```$/, '');
      nodes.push(<VsCodeBlock key={`code-${segIdx}`} code={code} keyId={`cb-${segIdx}`} />);
      return;
    }

    const lines = seg.split('\n');
    let listItems: ReactNode[] = [];
    let lc = 0;

    function flushList() {
      if (listItems.length > 0) {
        nodes.push(
          <ul
            key={`ul-${segIdx}-${lc++}`}
            style={{ margin: '4px 0', padding: 0, listStyle: 'none' }}
          >
            {listItems}
          </ul>
        );
        listItems = [];
      }
    }

    lines.forEach((line, lineIdx) => {
      const kp = `${segIdx}-${lineIdx}`;

      if (/^-{3,}$/.test(line.trim())) {
        flushList();
        nodes.push(
          <hr
            key={`hr-${kp}`}
            style={{ border: 'none', borderTop: '1px solid #2a2a2a', margin: '10px 0' }}
          />
        );
        return;
      }

      if (line.startsWith('### ')) {
        flushList();
        nodes.push(
          <h3
            key={`h3-${kp}`}
            style={{
              color: '#4EC9B0',
              fontFamily: 'Consolas, monospace',
              fontSize: '10px',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              margin: '14px 0 5px',
            }}
          >
            {parseInline(line.slice(4), `h3-${kp}`, green)}
          </h3>
        );
        return;
      }

      if (line.startsWith('## ')) {
        flushList();
        nodes.push(
          <h2
            key={`h2-${kp}`}
            style={{
              color: '#00D4FF',
              fontFamily: 'Consolas, monospace',
              fontSize: '10px',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              margin: '16px 0 5px',
              paddingBottom: '4px',
              borderBottom: '1px solid rgba(0,212,255,0.15)',
            }}
          >
            {parseInline(line.slice(3), `h2-${kp}`, green)}
          </h2>
        );
        return;
      }

      if (line.startsWith('# ')) {
        flushList();
        nodes.push(
          <h1
            key={`h1-${kp}`}
            style={{ color: '#E0E0E0', fontSize: '13px', fontWeight: 700, margin: '14px 0 5px' }}
          >
            {parseInline(line.slice(2), `h1-${kp}`, green)}
          </h1>
        );
        return;
      }

      if (/^[-*] /.test(line)) {
        listItems.push(
          <li
            key={`li-${kp}`}
            style={{
              display: 'flex',
              gap: '8px',
              marginBottom: '4px',
              color: '#b0b0b0',
              fontSize: '11px',
              lineHeight: '1.55',
            }}
          >
            <span style={{ color: green, flexShrink: 0, marginTop: '1px', fontSize: '10px' }}>▸</span>
            <span>{parseInline(line.slice(2), `li-${kp}`, green)}</span>
          </li>
        );
        return;
      }

      if (line.trim() === '') {
        flushList();
        if (lineIdx > 0 && lineIdx < lines.length - 1) {
          nodes.push(<div key={`sp-${kp}`} style={{ height: '5px' }} />);
        }
        return;
      }

      flushList();
      nodes.push(
        <p
          key={`p-${kp}`}
          style={{ color: '#b0b0b0', fontSize: '11px', lineHeight: '1.6', margin: '2px 0' }}
        >
          {parseInline(line, `p-${kp}`, green)}
        </p>
      );
    });

    flushList();
  });

  return nodes;
}

export default function WalkthroughPanel({ content, sampleSolution }: Props) {
  const [showAnswer, setShowAnswer] = useState(false);
  const green = useAccentGreen();

  return (
    <div>
      <div>{parseSections(content, green)}</div>

      <div
        style={{
          marginTop: '16px',
          paddingTop: '12px',
          borderTop: '1px solid #1e2a2a',
        }}
      >
        <button
          onClick={() => setShowAnswer(s => !s)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            cursor: 'pointer',
            background: 'none',
            border: 'none',
            padding: '0',
            width: '100%',
          }}
        >
          <div
            style={{
              width: '14px',
              height: '14px',
              border: `1.5px solid ${showAnswer ? green : '#444'}`,
              borderRadius: '3px',
              background: showAnswer ? green : 'transparent',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              transition: 'all 0.15s',
            }}
          >
            {showAnswer && (
              <svg width="9" height="7" viewBox="0 0 9 7" fill="none">
                <path
                  d="M1 3.5L3.5 6L8 1"
                  stroke="#0a0a0a"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}
          </div>
          <span
            style={{
              color: showAnswer ? green : '#777',
              fontSize: '10px',
              fontFamily: 'Consolas, monospace',
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
              transition: 'color 0.15s',
            }}
          >
            Show Sample Answer
          </span>
        </button>

        {showAnswer && (
          <div style={{ marginTop: '8px' }}>
            <VsCodeBlock code={sampleSolution} keyId="answer-block" />
          </div>
        )}
      </div>
    </div>
  );
}

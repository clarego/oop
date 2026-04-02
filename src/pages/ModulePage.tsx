import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MODULES } from '../data/modules';
import { ModuleSection } from '../types';
import {
  ArrowLeft, BookOpen, HelpCircle, Code2, ChevronLeft, ChevronRight,
  Lightbulb, Terminal, FileCode, AlertTriangle
} from 'lucide-react';
import ModuleAnimation from '../components/ModuleAnimation';
import PythonCodeBlock from '../components/PythonCodeBlock';
import { useAccentGreen } from '../lib/colors';

function CodeBlock({ code, language }: { code: string; language?: string }) {
  const [copied, setCopied] = useState(false);

  function copy() {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  const lines = code.split('\n');

  function highlightPython(line: string): React.ReactNode {
    if (language === 'text' || !language) {
      return <span className="text-[#E0E0E0]">{line}</span>;
    }
    const parts: React.ReactNode[] = [];
    let remaining = line;
    let key = 0;

    if (remaining.match(/^\s*#/)) {
      return <span className="text-[#6272a4] italic">{line}</span>;
    }
    if (remaining.match(/^\s*"""/)) {
      return <span className="text-[#f1fa8c]">{line}</span>;
    }

    const keywords = ['class ', 'def ', 'return ', 'if ', 'else:', 'elif ', 'for ', 'in ', 'import ', 'from ', 'pass', 'self', 'super', 'True', 'False', 'None', 'not ', 'and ', 'or '];
    let result = line;
    return <span className="text-[#E0E0E0]">{result}</span>;
  }

  return (
    <div className="relative rounded-xl overflow-hidden border border-[#1a1a1a]">
      <div className="flex items-center justify-between px-4 py-2 bg-[#0d1117] border-b border-[#1a1a1a]">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#FF4444]" />
          <div className="w-3 h-3 rounded-full bg-[#FFB800]" />
          <div className="w-3 h-3 rounded-full bg-[#00FF41]" />
          <span className="text-[#888] font-mono text-xs ml-2">
            {language === 'text' ? 'pseudocode' : language || 'python'}
          </span>
        </div>
        <button
          onClick={copy}
          className="text-[#888] hover:text-[#b0b0b0] font-mono text-[10px] transition-colors px-2 py-1 rounded hover:bg-[#1a1a1a]"
        >
          {copied ? 'COPIED!' : 'COPY'}
        </button>
      </div>
      <pre className="p-5 overflow-x-auto bg-[#0d1117] text-sm font-mono leading-relaxed">
        <code>
          {lines.map((line, i) => (
            <div key={i} className="flex">
              <span className="select-none text-[#666] mr-4 text-right min-w-[2ch]">{i + 1}</span>
              <span className="text-[#E0E0E0]">{line}</span>
            </div>
          ))}
        </code>
      </pre>
    </div>
  );
}

function renderMarkdown(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*|`[^`]+`)/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={i} className="text-[#E0E0E0] font-semibold">{part.slice(2, -2)}</strong>;
    }
    if (part.startsWith('`') && part.endsWith('`')) {
      return <code key={i} className="text-[#00FF41] bg-[#00FF41]/10 px-1.5 py-0.5 rounded font-mono text-sm">{part.slice(1, -1)}</code>;
    }
    return part;
  });
}

const CONCEPT_IMAGES: Record<string, string> = {
  'classes-objects': '/classes-objects.webp',
  'attributes-methods': '/attributes-methods.webp',
  'constructors': '/constructors.webp',
  'encapsulation': '/encapsulation.webp',
  'inheritance': '/inheritance.webp',
  'abstraction': '/abstraction.webp',
  'polymorphism': '/polymorphism.webp',
  'object-descriptions-uml': '/uml-diagram.webp',
};

const MODULE_ILLUSTRATIONS: Record<string, { src: string; caption: string }> = {
  'classes-objects':      { src: '/illus-classes-objects.webp',   caption: 'Figure 1 — A class (blueprint) creates multiple distinct object instances, each with their own attribute values.' },
  'attributes-methods':   { src: '/illus-attributes-methods.webp', caption: 'Figure 2 — Attributes describe what an object IS (state); methods describe what it DOES (behaviour).' },
  'constructors':         { src: '/illus-constructors.webp',       caption: 'Figure 3 — The __init__ constructor receives parameters and assembles a fully initialised object.' },
  'encapsulation':        { src: '/illus-encapsulation.webp',      caption: 'Figure 4 — Encapsulation exposes a public interface while keeping internal data private and protected.' },
  'inheritance':          { src: '/illus-inheritance.webp',        caption: 'Figure 5 — Child classes inherit all attributes and methods from the parent, and can add their own.' },
  'polymorphism':         { src: '/illus-polymorphism.webp',       caption: 'Figure 6 — The same method name produces different behaviour depending on which class the object belongs to.' },
  'abstraction':          { src: '/illus-abstraction.webp',        caption: 'Figure 7 — Abstraction hides internal complexity, exposing only the interface the user needs.' },
};

function Section({ section, moduleId }: { section: ModuleSection; moduleId?: string }) {
  const green = useAccentGreen();
  const icons: Record<string, typeof Lightbulb> = {
    definition: BookOpen,
    analogy: Lightbulb,
    code: FileCode,
    pseudocode: Terminal,
    exam_tip: AlertTriangle,
    table: Code2,
  };

  const colors: Record<string, string> = {
    definition: '#00D4FF',
    analogy: '#FFB800',
    code: green,
    pseudocode: '#00D4FF',
    exam_tip: '#FF4444',
    table: green,
  };

  const Icon = icons[section.type] || BookOpen;
  const color = colors[section.type] || green;

  function renderContent(content: string) {
    if (section.type === 'code') {
      if (!section.language || section.language === 'python') {
        return <PythonCodeBlock code={content} />;
      }
      return <CodeBlock code={content} language={section.language} />;
    }
    if (section.type === 'pseudocode') {
      return <CodeBlock code={content} language={section.language} />;
    }

    if (section.type === 'table') {
      const lines = content.split('\n');
      const tableStart = lines.findIndex(l => l.includes('|'));
      const preText = lines.slice(0, tableStart).join('\n');
      const tableLines = lines.slice(tableStart);

      const headerLine = tableLines[0];
      const cols = headerLine.split('|').map(c => c.trim()).filter(Boolean);
      const dataLines = tableLines.slice(2).filter(l => l.includes('|'));

      return (
        <div>
          {preText && (
            <p className="text-[#b0b0b0] text-sm leading-relaxed mb-4">
              {preText.split('\n').map((l, i) => <span key={i}>{l}<br /></span>)}
            </p>
          )}
          <div className="overflow-x-auto rounded-xl border border-[#1a1a1a]">
            <table className="w-full text-sm font-mono">
              <thead>
                <tr className="bg-[#111]">
                  {cols.map((c, i) => (
                    <th key={i} className="px-4 py-3 text-left text-[#00FF41] font-semibold border-b border-[#1a1a1a] whitespace-nowrap">
                      {c}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {dataLines.map((row, ri) => {
                  const cells = row.split('|').map(c => c.trim()).filter(Boolean);
                  return (
                    <tr key={ri} className="border-b border-[#111] hover:bg-[#0d0d0d] transition-colors">
                      {cells.map((cell, ci) => (
                        <td key={ci} className="px-4 py-2.5 text-[#b0b0b0]">{cell}</td>
                      ))}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      );
    }

    const paragraphs = content.split('\n\n');
    return (
      <div className="space-y-3">
        {paragraphs.map((para, pi) => {
          if (para.startsWith('```')) {
            const codeContent = para.replace(/```[a-z]*\n?/, '').replace(/```$/, '');
            return (
              <pre key={pi} className="bg-[#0d1117] border border-[#1a1a1a] rounded-xl p-4 overflow-x-auto font-mono text-sm text-[#E0E0E0] leading-relaxed">
                {codeContent}
              </pre>
            );
          }
          const lines = para.split('\n');
          return (
            <div key={pi}>
              {lines.map((line, li) => {
                if (line.startsWith('- ') || line.startsWith('• ')) {
                  return (
                    <div key={li} className="flex gap-2 text-[#b0b0b0] text-sm leading-relaxed ml-2 mb-1">
                      <span style={{ color }} className="flex-shrink-0 mt-1">▸</span>
                      <span>{renderMarkdown(line.slice(2))}</span>
                    </div>
                  );
                }
                if (line.match(/^\d+\. /)) {
                  return (
                    <div key={li} className="flex gap-2 text-[#b0b0b0] text-sm leading-relaxed mb-1">
                      <span style={{ color }} className="flex-shrink-0 font-mono text-xs mt-1 min-w-[1.5rem]">{line.match(/^\d+/)?.[0]}.</span>
                      <span>{renderMarkdown(line.replace(/^\d+\. /, ''))}</span>
                    </div>
                  );
                }
                return <p key={li} className="text-[#b0b0b0] text-sm leading-relaxed">{renderMarkdown(line)}</p>;
              })}
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div className={`bg-[#111] border rounded-xl p-6 ${section.type === 'exam_tip' ? 'border-[#FF4444]/30' : 'border-[#1a1a1a]'}`}
      style={section.type === 'exam_tip' ? { backgroundColor: '#FF4444' + '08' } : {}}>
      <div className="flex items-center gap-3 mb-4">
        <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
          style={{ backgroundColor: color + '15', border: `1px solid ${color}30` }}>
          <Icon size={16} style={{ color }} />
        </div>
        <h3 className="font-display font-semibold" style={{ color }}>{section.title}</h3>
      </div>
      {moduleId && (section.type === 'analogy' || (section.type === 'definition' && moduleId === 'object-descriptions-uml')) && CONCEPT_IMAGES[moduleId] && (
        <div className="mb-5 rounded-xl overflow-hidden border border-[#1a1a1a]">
          <img
            src={CONCEPT_IMAGES[moduleId]}
            alt={`Visual illustration for ${section.title}`}
            className="w-full object-contain"
          />
        </div>
      )}
      {renderContent(section.content)}
      {moduleId && section.type === 'analogy' && MODULE_ILLUSTRATIONS[moduleId] && (
        <div className="mt-6">
          <div className="rounded-xl overflow-hidden border border-[#1a1a1a] bg-[#0d0d0d]">
            <img
              src={MODULE_ILLUSTRATIONS[moduleId].src}
              alt={MODULE_ILLUSTRATIONS[moduleId].caption}
              className="w-full object-contain"
            />
          </div>
          <p className="text-[#888] text-xs font-mono mt-2 px-1 text-center italic leading-relaxed">
            {MODULE_ILLUSTRATIONS[moduleId].caption}
          </p>
        </div>
      )}
    </div>
  );
}

export default function ModulePage() {
  const { moduleId } = useParams();
  const navigate = useNavigate();
  const mod = MODULES.find(m => m.id === moduleId);
  const [activeSection, setActiveSection] = useState(0);

  if (!mod) {
    return (
      <div className="p-8 text-center">
        <p className="text-[#888]">Module not found</p>
        <button onClick={() => navigate('/learn')} className="btn-secondary mt-4">Back to Modules</button>
      </div>
    );
  }

  const currentSection = mod.sections[activeSection];
  const idx = MODULES.findIndex(m => m.id === moduleId);
  const prev = idx > 0 ? MODULES[idx - 1] : null;
  const next = idx < MODULES.length - 1 ? MODULES[idx + 1] : null;

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-8">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
        <button
          onClick={() => navigate('/learn')}
          className="flex items-center gap-2 text-[#888] hover:text-[#b0b0b0] text-sm mb-4 transition-colors"
        >
          <ArrowLeft size={16} />
          All Modules
        </button>

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-4">
            <div
              className="w-14 h-14 rounded-xl text-3xl flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: mod.color + '15', border: `1px solid ${mod.color}30` }}
            >
              {mod.icon}
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[#888] font-mono text-xs">MODULE {String(mod.number).padStart(2, '0')}</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full"
                  style={{ color: mod.color, backgroundColor: mod.color + '15', border: `1px solid ${mod.color}30` }}>
                  VCAA UNIT 3
                </span>
              </div>
              <h1 className="font-display text-2xl font-bold text-[#E0E0E0]">{mod.title}</h1>
              <p className="text-[#b0b0b0] text-sm">{mod.subtitle}</p>
            </div>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => navigate(`/quiz/${mod.id}`)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all"
              style={{ backgroundColor: mod.color + '15', color: mod.color, border: `1px solid ${mod.color}30` }}
            >
              <HelpCircle size={15} />
              Take Quiz
            </button>
            <button
              onClick={() => navigate(`/challenges/${mod.id}`)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold text-[#00D4FF] bg-[#00D4FF]/10 border border-[#00D4FF]/20 transition-all hover:bg-[#00D4FF]/20"
            >
              <Code2 size={15} />
              Challenges
            </button>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mt-4">
          {mod.keyTerms.map(t => (
            <span key={t} className="text-[10px] font-mono px-2 py-1 rounded bg-[#1a1a1a] text-[#888] border border-[#222]">{t}</span>
          ))}
        </div>
      </motion.div>

      <ModuleAnimation moduleId={mod.id} />

      <div className="flex overflow-x-auto gap-2 pb-2 mb-6 scrollbar-hide">
        {mod.sections.map((s, i) => {
          const icons: Record<string, string> = { definition: '📖', analogy: '💡', code: '💻', pseudocode: '📋', exam_tip: '⚠️', table: '📊' };
          return (
            <button
              key={i}
              onClick={() => setActiveSection(i)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-mono whitespace-nowrap transition-all flex-shrink-0 ${
                activeSection === i
                  ? 'text-[#0a0a0a] font-semibold'
                  : 'text-[#888] bg-[#111] border border-[#1a1a1a] hover:border-[#333] hover:text-[#b0b0b0]'
              }`}
              style={activeSection === i ? { backgroundColor: mod.color, border: `1px solid ${mod.color}` } : {}}
            >
              <span>{icons[s.type] || '📄'}</span>
              {s.title}
            </button>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeSection}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.2 }}
        >
          <Section section={currentSection} moduleId={mod.id} />
        </motion.div>
      </AnimatePresence>

      <div className="flex items-center justify-between mt-8 pt-6 border-t border-[#1a1a1a]">
        <button
          onClick={() => activeSection > 0 ? setActiveSection(s => s - 1) : navigate(`/learn/${prev?.id}`)}
          disabled={activeSection === 0 && !prev}
          className="flex items-center gap-2 text-[#888] hover:text-[#b0b0b0] text-sm transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <ChevronLeft size={16} />
          {activeSection > 0 ? 'Previous Section' : prev ? `Module ${prev.number}` : 'Back'}
        </button>

        <div className="flex gap-1.5">
          {mod.sections.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveSection(i)}
              className="w-2 h-2 rounded-full transition-all"
              style={{ backgroundColor: i === activeSection ? mod.color : '#2a2a2a' }}
            />
          ))}
        </div>

        <button
          onClick={() => activeSection < mod.sections.length - 1 ? setActiveSection(s => s + 1) : navigate(`/learn/${next?.id}`)}
          disabled={activeSection === mod.sections.length - 1 && !next}
          className="flex items-center gap-2 text-sm font-semibold transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          style={{ color: mod.color }}
        >
          {activeSection < mod.sections.length - 1 ? 'Next Section' : next ? `Module ${next.number}` : 'Done'}
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}

import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Terminal, BookOpen, Trophy, Code2, Zap, ArrowRight, Shield, Layers, GitBranch, Box } from 'lucide-react';
import { useAccentGreen } from '../lib/colors';

export default function Landing() {
  const navigate = useNavigate();
  const green = useAccentGreen();

  const modules = [
    { icon: Box, title: 'Classes & Objects', color: green },
    { icon: Layers, title: 'Attributes & Methods', color: '#00D4FF' },
    { icon: Terminal, title: 'Constructors', color: '#FFB800' },
    { icon: Shield, title: 'Encapsulation', color: '#FF4444' },
    { icon: GitBranch, title: 'Inheritance', color: green },
    { icon: Zap, title: 'Abstraction', color: '#00D4FF' },
    { icon: Code2, title: 'Polymorphism', color: '#FFB800' },
    { icon: BookOpen, title: 'UML & Object Descriptions', color: green },
  ];

  const features = [
    {
      icon: BookOpen,
      title: '8 Interactive Modules',
      desc: 'VCAA-aligned OOP content with real-world analogies, code examples, and pseudocode.',
      color: green,
    },
    {
      icon: Code2,
      title: 'Python Code Editor',
      desc: 'Write and run Python directly in the browser with instant feedback.',
      color: '#00D4FF',
    },
    {
      icon: Zap,
      title: 'AI-Powered Grading',
      desc: 'Get detailed feedback on your code from an AI tutor trained on VCAA standards.',
      color: '#FFB800',
    },
    {
      icon: Trophy,
      title: 'Leaderboard & XP',
      desc: 'Earn XP, climb the leaderboard, and track your progress across all topics.',
      color: '#FF4444',
    },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a] overflow-x-hidden">
      <div className="fixed inset-0 matrix-bg opacity-40 pointer-events-none" />
      <div className="fixed inset-0 scan-line pointer-events-none" />

      <header className="relative z-10 border-b border-[#1a1a1a] bg-[#0a0a0a]/90 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#00FF41]/10 border border-[#00FF41]/30 flex items-center justify-center">
              <Terminal size={18} className="text-[#00FF41]" />
            </div>
            <div>
              <p className="text-[#00FF41] font-mono text-sm font-semibold tracking-wider">OOP MASTERY</p>
              <p className="text-[#888] font-mono text-[10px]">VCE Software Development</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/auth')}
              className="text-[#b0b0b0] hover:text-[#E0E0E0] text-sm font-medium px-4 py-2 rounded-lg hover:bg-[#1a1a1a] transition-all"
            >
              Sign In
            </button>
            <button
              onClick={() => navigate('/auth')}
              className="btn-primary text-sm"
            >
              Get Started
            </button>
          </div>
        </div>
      </header>

      <section className="relative z-10 max-w-7xl mx-auto px-4 pt-20 pb-24 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#00FF41]/30 bg-[#00FF41]/5 mb-8">
            <div className="w-2 h-2 rounded-full bg-[#00FF41] animate-pulse" />
            <span className="text-[#00FF41] font-mono text-xs">VCAA 2025–2028 Study Design — Units 3 & 4</span>
          </div>

          <h1 className="font-display text-5xl md:text-7xl font-bold text-[#E0E0E0] mb-6 leading-tight">
            Master{' '}
            <span className="text-[#00FF41] glow-green">OOP</span>
            {' '}for{' '}
            <span className="text-[#00D4FF] glow-cyan">VCE</span>
            <br />
            <span className="text-[#b0b0b0] text-4xl md:text-5xl">Software Development</span>
          </h1>

          <p className="text-[#b0b0b0] text-lg md:text-xl max-w-3xl mx-auto mb-10 leading-relaxed">
            A cyberpunk training academy for Year 12 students. Learn all 8 OOP principles
            with interactive modules, AI-graded coding challenges, and VCAA exam prep.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              onClick={() => navigate('/auth')}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="btn-primary text-base px-8 py-3 flex items-center gap-2 justify-center"
            >
              Start Training <ArrowRight size={18} />
            </motion.button>
            <motion.button
              onClick={() => navigate('/auth')}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="btn-secondary text-base px-8 py-3"
            >
              View Modules
            </motion.button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-20 relative"
        >
          <div className="bg-[#111] border border-[#222] rounded-2xl overflow-hidden max-w-3xl mx-auto shadow-2xl">
            <div className="bg-[#0d0d0d] px-4 py-3 flex items-center gap-2 border-b border-[#222]">
              <div className="w-3 h-3 rounded-full bg-[#FF4444]" />
              <div className="w-3 h-3 rounded-full bg-[#FFB800]" />
              <div className="w-3 h-3 rounded-full bg-[#00FF41]" />
              <span className="text-[#888] font-mono text-xs ml-3">python — oop_mastery.py</span>
            </div>
            <div className="p-6 text-left font-mono text-sm">
              <div className="text-[#6272a4]"># VCE Software Development — OOP Example</div>
              <div className="mt-2">
                <span className="text-[#ff79c6]">class </span>
                <span className="text-[#8be9fd]">Student</span>
                <span className="text-[#E0E0E0]">:</span>
              </div>
              <div className="ml-4 text-[#6272a4]">"""A VCE student — demonstrating OOP principles."""</div>
              <div className="ml-4 mt-2">
                <span className="text-[#ff79c6]">def </span>
                <span className="text-[#50fa7b]">__init__</span>
                <span className="text-[#E0E0E0]">(self, name, year):</span>
              </div>
              <div className="ml-8 text-[#E0E0E0]">self.name = name</div>
              <div className="ml-8 text-[#E0E0E0]">self.year = year</div>
              <div className="ml-8 text-[#E0E0E0]">self.__xp = <span className="text-[#bd93f9]">0</span></div>
              <div className="ml-8 text-[#6272a4]"># Encapsulation: private attribute</div>
              <div className="mt-3 ml-4">
                <span className="text-[#ff79c6]">def </span>
                <span className="text-[#50fa7b]">earn_xp</span>
                <span className="text-[#E0E0E0]">(self, amount):</span>
              </div>
              <div className="ml-8 text-[#E0E0E0]">self.__xp += amount</div>
              <div className="ml-8 text-[#E0E0E0]"><span className="text-[#ff79c6]">return </span>self.__xp</div>
              <div className="mt-4 text-[#6272a4]"># Instantiation — creating an object</div>
              <div className="mt-1 text-[#E0E0E0]">
                student = <span className="text-[#8be9fd]">Student</span>(<span className="text-[#f1fa8c]">"Aisha"</span>, <span className="text-[#bd93f9]">12</span>)
              </div>
              <div className="text-[#E0E0E0]">
                student.earn_xp(<span className="text-[#bd93f9]">100</span>)
              </div>
              <div className="mt-2 flex items-center gap-2">
                <span className="text-[#00FF41]">▶</span>
                <span className="text-[#00FF41] terminal-cursor">XP earned: 100</span>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      <section className="relative z-10 bg-[#0d0d0d] border-y border-[#1a1a1a] py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl font-bold text-[#E0E0E0] mb-3">8 OOP Modules</h2>
            <p className="text-[#b0b0b0] text-sm">Complete all modules to achieve OOP Mastery rank</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {modules.map((mod, i) => (
              <motion.div
                key={mod.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                className="bg-[#111] border border-[#1a1a1a] rounded-xl p-4 text-center hover:border-[#333] transition-all cursor-default"
              >
                <div
                  className="w-10 h-10 rounded-lg mx-auto mb-3 flex items-center justify-center"
                  style={{ backgroundColor: mod.color + '15', border: `1px solid ${mod.color}30` }}
                >
                  <mod.icon size={20} style={{ color: mod.color }} />
                </div>
                <p className="text-[#E0E0E0] text-sm font-medium leading-tight">{mod.title}</p>
                <div className="flex items-center justify-center gap-1 mt-2">
                  <span className="text-[10px] font-mono text-[#888]">MODULE {String(i + 1).padStart(2, '0')}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative z-10 max-w-7xl mx-auto px-4 py-20">
        <div className="text-center mb-14">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-[#E0E0E0] mb-4">
            Everything You Need to <span className="text-[#00FF41] glow-green">Ace the Exam</span>
          </h2>
          <p className="text-[#b0b0b0] max-w-2xl mx-auto">
            Built specifically for VCAA VCE Applied Computing 2025–2028 Study Design.
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-[#111] border border-[#1a1a1a] rounded-xl p-6 flex gap-5 hover:border-[#2a2a2a] transition-all"
            >
              <div
                className="w-12 h-12 rounded-xl flex-shrink-0 flex items-center justify-center"
                style={{ backgroundColor: f.color + '15', border: `1px solid ${f.color}30` }}
              >
                <f.icon size={22} style={{ color: f.color }} />
              </div>
              <div>
                <h3 className="font-display text-lg font-semibold text-[#E0E0E0] mb-2">{f.title}</h3>
                <p className="text-[#b0b0b0] text-sm leading-relaxed">{f.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="relative z-10 bg-[#0d0d0d] border-t border-[#1a1a1a] py-16">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <Terminal size={40} className="text-[#00FF41] mx-auto mb-6 glow-green" />
          <h2 className="font-display text-3xl md:text-4xl font-bold text-[#E0E0E0] mb-4">
            Ready to Begin Training?
          </h2>
          <p className="text-[#b0b0b0] mb-8">
            Join VCE Software Development students mastering OOP for their exams.
          </p>
          <motion.button
            onClick={() => navigate('/auth')}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="btn-primary text-base px-10 py-3 flex items-center gap-2 mx-auto"
          >
            Initialise Training <ArrowRight size={18} />
          </motion.button>
        </div>
      </section>

      <footer className="border-t border-[#1a1a1a] py-8 text-center">
        <p className="text-[#888] font-mono text-xs">
          OOP MASTERY — VCE Software Development · VCAA 2025–2028 · Unit 3 Outcome 1
        </p>
      </footer>
    </div>
  );
}

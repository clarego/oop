import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { Terminal, ArrowRight, Loader2, Check } from 'lucide-react';

const AVATARS = [
  '🎯', '🚀', '💻', '🔥', '⚡', '🌟',
  '🎮', '🦊', '🐺', '🦅', '🐉', '🤖',
  '🎸', '🏆', '💎', '🌈', '🎭', '🦁',
  '🐼', '🦋', '🌙', '☀️', '🍀', '🎪',
  '🦄', '🐲', '🍄', '🌺', '🎨', '🔮',
];

export default function Auth() {
  const { joinWithName } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [school, setSchool] = useState('');
  const [avatar, setAvatar] = useState('🎯');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleJoin() {
    const trimmed = name.trim();
    if (trimmed.length < 2) {
      setError('Please enter at least 2 characters for your name.');
      return;
    }
    setLoading(true);
    setError('');
    const { error: err } = await joinWithName(trimmed, school.trim(), avatar);
    if (err) {
      setError('Something went wrong. Please try again.');
      setLoading(false);
      return;
    }
    navigate('/dashboard');
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-4 relative overflow-hidden">
      <div className="fixed inset-0 matrix-bg opacity-20 pointer-events-none" />
      <div className="fixed inset-0 scan-line pointer-events-none opacity-30" />

      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="relative z-10 w-full max-w-md"
      >
        <div className="bg-[#111] border border-[#1a1a1a] rounded-2xl overflow-hidden shadow-2xl">
          <div className="bg-[#0d0d0d] px-4 py-3 flex items-center gap-2 border-b border-[#1a1a1a]">
            <div className="w-3 h-3 rounded-full bg-[#FF4444]" />
            <div className="w-3 h-3 rounded-full bg-[#FFB800]" />
            <div className="w-3 h-3 rounded-full bg-[#00FF41]" />
            <div className="flex items-center gap-2 ml-3">
              <Terminal size={12} className="text-[#00FF41]" />
              <span className="text-[#888] font-mono text-xs">welcome.sh — OOP Mastery</span>
            </div>
          </div>

          <div className="p-8">
            <div className="text-center mb-8">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                className="w-16 h-16 rounded-2xl bg-[#00FF41]/10 border border-[#00FF41]/20 flex items-center justify-center mx-auto mb-4"
              >
                <Terminal size={28} className="text-[#00FF41]" />
              </motion.div>
              <h1 className="font-display text-2xl font-bold text-[#E0E0E0] mb-2">
                Welcome to OOP Mastery
              </h1>
              <p className="text-[#888] text-sm leading-relaxed">
                No password needed — pick your avatar and enter your name to start.
              </p>
            </div>

            <div className="mb-6">
              <p className="text-[#b0b0b0] text-xs font-mono uppercase tracking-wider mb-3">
                Pick your avatar
              </p>
              <div className="grid grid-cols-6 gap-2">
                {AVATARS.map((em) => (
                  <motion.button
                    key={em}
                    onClick={() => setAvatar(em)}
                    whileHover={{ scale: 1.15 }}
                    whileTap={{ scale: 0.9 }}
                    className={`relative h-11 rounded-xl text-xl transition-all flex items-center justify-center ${
                      avatar === em
                        ? 'bg-[#00FF41]/15 border-2 border-[#00FF41]/60'
                        : 'bg-[#1a1a1a] border border-[#222] hover:border-[#333]'
                    }`}
                  >
                    {em}
                    {avatar === em && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#00FF41] flex items-center justify-center"
                      >
                        <Check size={9} className="text-[#0a0a0a]" />
                      </motion.div>
                    )}
                  </motion.button>
                ))}
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-[#b0b0b0] text-xs font-mono uppercase tracking-wider mb-2">
                Your Name <span className="text-[#FF4444]">*</span>
              </label>
              <div className="flex items-center gap-3 bg-[#0d0d0d] border border-[#1a1a1a] rounded-xl px-4 py-3 focus-within:border-[#00FF41]/40 transition-all">
                <span className="text-2xl leading-none">{avatar}</span>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => { setName(e.target.value); setError(''); }}
                  onKeyDown={(e) => e.key === 'Enter' && handleJoin()}
                  placeholder="e.g. Alex Chen"
                  maxLength={30}
                  autoFocus
                  className="flex-1 bg-transparent text-[#E0E0E0] text-sm placeholder-[#333] focus:outline-none"
                />
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-[#b0b0b0] text-xs font-mono uppercase tracking-wider mb-2">
                School{' '}
                <span className="text-[#777] font-sans normal-case">(optional)</span>
              </label>
              <input
                type="text"
                value={school}
                onChange={(e) => setSchool(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleJoin()}
                placeholder="e.g. Melbourne High School"
                maxLength={60}
                className="w-full bg-[#0d0d0d] border border-[#1a1a1a] rounded-xl px-4 py-3 text-[#E0E0E0] text-sm placeholder-[#333] focus:outline-none focus:border-[#00FF41]/30 transition-all"
              />
            </div>

            <AnimatePresence>
              {error && (
                <motion.p
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="text-[#FF4444] text-xs font-mono mb-4 bg-[#FF4444]/5 border border-[#FF4444]/20 rounded-lg px-3 py-2"
                >
                  {error}
                </motion.p>
              )}
            </AnimatePresence>

            <motion.button
              onClick={handleJoin}
              disabled={loading || name.trim().length < 2}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full btn-primary py-3.5 flex items-center justify-center gap-2 text-base disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Setting up your profile...
                </>
              ) : (
                <>
                  Let's Go!
                  <ArrowRight size={18} />
                </>
              )}
            </motion.button>

            <p className="text-center text-[#666] text-[11px] font-mono mt-5 leading-relaxed">
              Your progress saves automatically to this browser.
              <br />
              No email or password required.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

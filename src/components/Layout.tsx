import { useState, useCallback, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { useTheme, ColorScheme } from '../contexts/ThemeContext';
import { getRankTier } from '../types';
import {
  LayoutDashboard, BookOpen, Trophy, LogOut, Menu, X, Zap, Terminal, ChevronRight, Check,
  Moon, Sun, Cpu, PanelLeftClose, PanelLeftOpen,
} from 'lucide-react';
import AiTutor from './AiTutor';
import HighlightExplain from './HighlightExplain';

const MIN_SIDEBAR = 200;
const MAX_SIDEBAR = 400;
const DEFAULT_SIDEBAR = 256;

const SCHEME_CONFIG: Record<ColorScheme, { icon: React.ElementType; label: string; color: string }> = {
  dark:   { icon: Moon,     label: 'Dark',   color: '#00D4FF' },
  clear:  { icon: Sun,      label: 'Clear',  color: '#FFB800' },
  hacker: { icon: Cpu,      label: 'Hacker', color: '#00FF41' },
};

const AVATARS = [
  '🎯', '🚀', '💻', '🔥', '⚡', '🌟',
  '🎮', '🦊', '🐺', '🦅', '🐉', '🤖',
  '🎸', '🏆', '💎', '🌈', '🎭', '🦁',
  '🐼', '🦋', '🌙', '☀️', '🍀', '🎪',
  '🦄', '🐲', '🍄', '🌺', '🎨', '🔮',
];

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const { profile, signOut, updateProfile } = useAuth();
  const { colorScheme, fontSize, setColorScheme, increaseFontSize, decreaseFontSize } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [emojiPickerOpen, setEmojiPickerOpen] = useState(false);
  const [savingEmoji, setSavingEmoji] = useState(false);
  const [sidebarWidth, setSidebarWidth] = useState(DEFAULT_SIDEBAR);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const navItems = [
    { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/learn', label: 'Learn', icon: BookOpen },
    { path: '/leaderboard', label: 'Leaderboard', icon: Trophy },
  ];

  const rank = profile ? getRankTier(profile.total_xp) : null;

  async function handleSignOut() {
    await signOut();
    navigate('/');
  }

  async function changeEmoji(em: string) {
    if (!profile || savingEmoji) return;
    setSavingEmoji(true);
    await updateProfile({ avatar_emoji: em });
    setSavingEmoji(false);
    setEmojiPickerOpen(false);
  }

  const handleSidebarResize = useCallback((delta: number) => {
    setSidebarWidth(w => Math.max(MIN_SIDEBAR, Math.min(MAX_SIDEBAR, w + delta)));
  }, []);

  const effectiveWidth = sidebarCollapsed ? 0 : sidebarWidth;
  const [isDesktop, setIsDesktop] = useState(() => window.innerWidth >= 1024);

  useEffect(() => {
    const handler = () => setIsDesktop(window.innerWidth >= 1024);
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, []);

  const mainMarginLeft = isDesktop ? effectiveWidth : 0;

  return (
    <div className="min-h-screen flex">
      <aside
        className="fixed inset-y-0 left-0 z-50 bg-[#0d0d0d] border-r border-[#1a1a1a] flex flex-col transition-transform duration-300"
        style={{
          width: sidebarWidth,
          transform: isDesktop
            ? (sidebarCollapsed ? 'translateX(-100%)' : 'translateX(0)')
            : (mobileOpen ? 'translateX(0)' : 'translateX(-100%)'),
        }}
      >
        <div className="p-5 border-b border-[#1a1a1a] flex-shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-8 h-8 rounded bg-[#00FF41]/10 border border-[#00FF41]/30 flex items-center justify-center flex-shrink-0">
                <Terminal size={16} className="text-[#00FF41]" />
              </div>
              <div className="min-w-0">
                <p className="text-[#00FF41] font-mono text-xs font-semibold tracking-wider truncate">OOP MASTERY</p>
                <p className="text-[#888] font-mono text-[10px]">VCE Software Dev</p>
              </div>
            </div>
            <button
              onClick={() => { setSidebarCollapsed(true); setMobileOpen(false); }}
              className="hidden lg:flex items-center justify-center w-7 h-7 rounded-lg text-[#555] hover:text-[#b0b0b0] hover:bg-[#1a1a1a] transition-all flex-shrink-0"
              title="Collapse sidebar"
            >
              <PanelLeftClose size={14} />
            </button>
            <button
              onClick={() => setMobileOpen(false)}
              className="lg:hidden flex items-center justify-center w-7 h-7 rounded-lg text-[#555] hover:text-[#b0b0b0] hover:bg-[#1a1a1a] transition-all"
            >
              <X size={14} />
            </button>
          </div>
        </div>

        {profile && (
          <div className="p-4 border-b border-[#1a1a1a] flex-shrink-0">
            <div className="flex items-center gap-3 mb-3">
              <button
                onClick={() => setEmojiPickerOpen(true)}
                title="Change avatar"
                className="w-10 h-10 rounded-lg bg-[#1a1a1a] border border-[#2a2a2a] flex items-center justify-center text-xl hover:border-[#00FF41]/40 hover:scale-105 transition-all cursor-pointer flex-shrink-0"
              >
                {profile.avatar_emoji}
              </button>
              <div className="flex-1 min-w-0">
                <p className="text-[#E0E0E0] text-sm font-semibold truncate">{profile.display_name}</p>
                {rank && (
                  <p className="text-[10px] font-mono" style={{ color: colorScheme === 'clear' ? rank.clearColor : rank.color }}>
                    {rank.emoji} {rank.name}
                  </p>
                )}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Zap size={12} style={{ color: colorScheme === 'clear' ? '#92400e' : '#FFB800', flexShrink: 0 }} />
              <div className="flex-1 rounded-full h-1.5 overflow-hidden" style={{ backgroundColor: colorScheme === 'clear' ? '#c8cace' : '#1a1a1a' }}>
                <div
                  className="h-full xp-bar rounded-full"
                  style={{ width: `${Math.min(100, (profile.total_xp % 200) / 2)}%` }}
                />
              </div>
              <span className="font-mono text-[10px] font-semibold whitespace-nowrap" style={{ color: colorScheme === 'clear' ? '#92400e' : '#FFB800' }}>{profile.total_xp} XP</span>
            </div>
          </div>
        )}

        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {navItems.map(({ path, label, icon: Icon }) => {
            const active = location.pathname === path || location.pathname.startsWith(path + '/');
            return (
              <Link
                key={path}
                to={path}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200
                  ${active
                    ? 'bg-[#00FF41]/10 text-[#00FF41] border border-[#00FF41]/20'
                    : 'text-[#b0b0b0] hover:text-[#E0E0E0] hover:bg-[#1a1a1a]'
                  }`}
              >
                <Icon size={16} className={active ? 'text-[#00FF41]' : 'text-current'} />
                <span className="text-sm font-medium truncate">{label}</span>
                {active && <ChevronRight size={14} className="ml-auto text-[#00FF41]/60 flex-shrink-0" />}
              </Link>
            );
          })}
        </nav>

        <div className="p-3 border-t border-[#1a1a1a] space-y-3 flex-shrink-0">
          <div>
            <p className="text-[10px] font-mono text-[#888] px-1 mb-1.5 tracking-wider">APPEARANCE</p>
            <div className="flex gap-1">
              {(Object.entries(SCHEME_CONFIG) as [ColorScheme, typeof SCHEME_CONFIG[ColorScheme]][]).map(([scheme, cfg]) => {
                const Icon = cfg.icon;
                const active = colorScheme === scheme;
                return (
                  <button
                    key={scheme}
                    onClick={() => setColorScheme(scheme)}
                    title={cfg.label}
                    className="flex-1 flex flex-col items-center gap-1 py-2 rounded-lg text-[9px] font-mono transition-all"
                    style={{
                      backgroundColor: active ? cfg.color + '18' : 'transparent',
                      color: active ? cfg.color : '#666',
                      border: `1px solid ${active ? cfg.color + '40' : 'transparent'}`,
                    }}
                  >
                    <Icon size={13} />
                    {cfg.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex items-center gap-2 px-1">
            <span className="text-[10px] font-mono text-[#888] tracking-wider flex-1">FONT SIZE</span>
            <div className="flex items-center gap-1">
              <button
                onClick={decreaseFontSize}
                disabled={fontSize === 'xs'}
                className="w-7 h-7 rounded flex items-center justify-center text-[#888] hover:text-[#b0b0b0] bg-[#1a1a1a] border border-[#2a2a2a] disabled:opacity-30 disabled:cursor-not-allowed text-sm font-mono transition-all hover:bg-[#222]"
              >−</button>
              <span className="text-[10px] font-mono text-[#888] w-7 text-center uppercase">{fontSize}</span>
              <button
                onClick={increaseFontSize}
                disabled={fontSize === 'xl'}
                className="w-7 h-7 rounded flex items-center justify-center text-[#888] hover:text-[#b0b0b0] bg-[#1a1a1a] border border-[#2a2a2a] disabled:opacity-30 disabled:cursor-not-allowed text-sm font-mono transition-all hover:bg-[#222]"
              >+</button>
            </div>
          </div>

          <button
            onClick={handleSignOut}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-[#888] hover:text-[#FF4444] hover:bg-[#FF4444]/5 transition-all duration-200"
          >
            <LogOut size={16} />
            <span className="text-sm font-medium">Sign Out</span>
          </button>
        </div>

        <div
          className="absolute top-0 right-0 bottom-0 w-1 cursor-col-resize group hidden lg:flex items-center justify-center"
          onMouseDown={(e) => {
            e.preventDefault();
            e.stopPropagation();
            let prevX = e.clientX;
            const onMove = (ev: MouseEvent) => {
              const delta = ev.clientX - prevX;
              prevX = ev.clientX;
              if (delta !== 0) handleSidebarResize(delta);
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
          }}
        >
          <div className="absolute inset-y-0 right-0 w-px bg-[#2a2a2a] group-hover:bg-[#007ACC] transition-colors duration-100" />
          <div className="absolute inset-y-0 -left-1 -right-1" />
        </div>
      </aside>

      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <AnimatePresence>
        {sidebarCollapsed && (
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
            onClick={() => setSidebarCollapsed(false)}
            className="hidden lg:flex fixed top-4 left-2 z-40 items-center justify-center w-8 h-8 rounded-lg bg-[#111] border border-[#2a2a2a] text-[#888] hover:text-[#00FF41] hover:border-[#00FF41]/30 transition-all shadow-lg"
            title="Expand sidebar"
          >
            <PanelLeftOpen size={14} />
          </motion.button>
        )}
      </AnimatePresence>

      <div
        className="flex-1 flex flex-col min-h-screen transition-[margin-left] duration-300"
        style={{ marginLeft: mainMarginLeft }}
      >
        <header className="sticky top-0 z-30 bg-[#0a0a0a]/95 backdrop-blur-sm border-b border-[#1a1a1a] px-4 py-3 flex items-center gap-4 lg:hidden">
          <button
            onClick={() => setMobileOpen(true)}
            className="p-2 rounded-lg text-[#b0b0b0] hover:text-[#E0E0E0] hover:bg-[#1a1a1a] transition-all"
          >
            <Menu size={20} />
          </button>
          <div className="flex items-center gap-2">
            <Terminal size={16} className="text-[#00FF41]" />
            <span className="text-[#00FF41] font-mono text-sm font-semibold">OOP MASTERY</span>
          </div>
        </header>

        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>

      <AiTutor />
      <HighlightExplain />

      <AnimatePresence>
        {emojiPickerOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm"
              onClick={() => setEmojiPickerOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              className="fixed z-[70] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#111] border border-[#222] rounded-2xl p-6 w-80 shadow-2xl"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-display font-semibold text-[#E0E0E0]">Change Avatar</h3>
                <button
                  onClick={() => setEmojiPickerOpen(false)}
                  className="text-[#888] hover:text-[#b0b0b0] transition-colors"
                >
                  <X size={18} />
                </button>
              </div>
              <div className="grid grid-cols-6 gap-2">
                {AVATARS.map((em) => (
                  <motion.button
                    key={em}
                    onClick={() => changeEmoji(em)}
                    whileHover={{ scale: 1.15 }}
                    whileTap={{ scale: 0.9 }}
                    disabled={savingEmoji}
                    className={`relative h-11 rounded-xl text-xl flex items-center justify-center transition-all ${
                      profile?.avatar_emoji === em
                        ? 'bg-[#00FF41]/15 border-2 border-[#00FF41]/60'
                        : 'bg-[#1a1a1a] border border-[#222] hover:border-[#333]'
                    }`}
                  >
                    {em}
                    {profile?.avatar_emoji === em && (
                      <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#00FF41] flex items-center justify-center">
                        <Check size={9} className="text-[#0a0a0a]" />
                      </div>
                    )}
                  </motion.button>
                ))}
              </div>
              <p className="text-[#888] text-[11px] font-mono text-center mt-4">
                Click your avatar in the sidebar anytime to change it.
              </p>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

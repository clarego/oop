import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import Landing from './pages/Landing';
import Auth from './pages/Auth';
import Dashboard from './pages/Dashboard';
import Learn from './pages/Learn';
import ModulePage from './pages/ModulePage';
import QuizPage from './pages/QuizPage';
import ChallengesPage from './pages/ChallengesPage';
import Leaderboard from './pages/Leaderboard';
import Layout from './components/Layout';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, profile, loading } = useAuth();
  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-2 border-[#00FF41] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-[#00FF41] font-mono text-sm animate-pulse">INITIALISING SYSTEM...</p>
        </div>
      </div>
    );
  }
  return (user && profile) ? <>{children}</> : <Navigate to="/auth" replace />;
}

function PublicRoute({ children }: { children: React.ReactNode }) {
  const { user, profile, loading } = useAuth();
  if (loading) return null;
  return (user && profile) ? <Navigate to="/dashboard" replace /> : <>{children}</>;
}

export default function App() {
  return (
    <ThemeProvider>
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PublicRoute><Landing /></PublicRoute>} />
          <Route path="/auth" element={<PublicRoute><Auth /></PublicRoute>} />
          <Route path="/dashboard" element={<ProtectedRoute><Layout><Dashboard /></Layout></ProtectedRoute>} />
          <Route path="/learn" element={<ProtectedRoute><Layout><Learn /></Layout></ProtectedRoute>} />
          <Route path="/learn/:moduleId" element={<ProtectedRoute><Layout><ModulePage /></Layout></ProtectedRoute>} />
          <Route path="/quiz/:moduleId" element={<ProtectedRoute><Layout><QuizPage /></Layout></ProtectedRoute>} />
          <Route path="/challenges/:moduleId" element={<ProtectedRoute><Layout><ChallengesPage /></Layout></ProtectedRoute>} />
          <Route path="/leaderboard" element={<ProtectedRoute><Layout><Leaderboard /></Layout></ProtectedRoute>} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
    </ThemeProvider>
  );
}

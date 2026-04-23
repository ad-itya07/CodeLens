import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import { ProjectProvider } from './context/ProjectContext';
import DashboardLayout from './layouts/DashboardLayout';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import ProjectChat from './pages/ProjectChat';
import HowItWorks from './pages/HowItWorks';
import ProtectedRoute from './components/ProtectedRoute';
import { useAuth } from './context/AuthContext';
import { AnimatePresence } from 'framer-motion';

const AuthRedirect = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return children;
  if (user) return <Navigate to="/dashboard" replace />;
  return children;
};

const AnimatedRoutes = () => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<AuthRedirect><LandingPage /></AuthRedirect>} />
        <Route path="/login" element={<AuthRedirect><LoginPage /></AuthRedirect>} />
        <Route path="/register" element={<AuthRedirect><RegisterPage /></AuthRedirect>} />

        <Route element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/chat/:id" element={<ProjectChat />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <ProjectProvider>
          <Toaster position="top-right" toastOptions={{
            style: {
              background: '#161B22',
              color: '#E6EDF3',
              border: '1px solid #21262D',
              borderRadius: '12px',
              fontSize: '14px',
            },
          }} />
          <AnimatedRoutes />
        </ProjectProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;

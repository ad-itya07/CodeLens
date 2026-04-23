import React from 'react';
import { Outlet, Navigate, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LayoutDashboard, MessageSquare, LogOut, Github, Zap } from 'lucide-react';
import { useProject } from '../context/ProjectContext';
import { motion, AnimatePresence } from 'framer-motion';
import Skeleton from '../components/Skeleton';
import { pageTransition } from '../lib/animations';

const DashboardLayout = () => {
    const { user, loading, logout } = useAuth();
    const { repos, activeRepo, isFetching } = useProject();
    const location = useLocation();

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-background">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
        );
    }

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    const navItems = [
        { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
        { name: 'Chat', path: activeRepo ? `/chat/${activeRepo.id}` : '/dashboard', icon: MessageSquare, disabled: !activeRepo },
        { name: 'How It Works', path: '/how-it-works', icon: Zap },
    ];

    return (
        <div className="flex h-screen bg-background text-foreground overflow-hidden">
            {/* Sidebar */}
            <aside className="w-64 bg-[#0D1117] border-r border-[#21262D] flex flex-col">
                <div className="p-6 flex items-center gap-3">
                    <div className="bg-primary/20 p-2 rounded-lg">
                        <Github className="w-6 h-6 text-primary" />
                    </div>
                    <h1 className="text-xl font-bold tracking-tight text-[#E6EDF3]">CodeLens</h1>
                </div>

                <nav className="flex-1 px-3 space-y-1 mt-4">
                    {navItems.map((item) => {
                        const isActive = location.pathname === item.path;
                        return (
                            <Link
                                key={item.name}
                                to={item.path}
                                className={`relative flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group overflow-hidden ${isActive
                                        ? 'nav-active-glow bg-[rgba(47,129,247,0.08)] text-primary'
                                        : 'text-[#8B949E] hover:text-[#E6EDF3]'
                                    } ${item.disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
                                onClick={(e) => item.disabled && e.preventDefault()}
                            >
                                {/* Hover slide-in background */}
                                {!isActive && (
                                    <span className="absolute inset-0 bg-[#161B22] rounded-xl scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-200 -z-[1]" />
                                )}
                                <item.icon className="w-5 h-5 relative z-[1]" />
                                <span className="font-medium relative z-[1]">{item.name}</span>
                            </Link>
                        );
                    })}

                    <div className="pt-8 pb-2 px-4">
                        <h2 className="text-[10px] font-semibold text-[#8B949E] uppercase tracking-widest">Repositories</h2>
                    </div>

                    <div className="space-y-1 overflow-y-auto max-h-[40vh] custom-scrollbar">
                        {isFetching ? (
                            Array(3).fill(0).map((_, i) => (
                                <div key={i} className="flex items-center gap-3 px-4 py-3">
                                    <Skeleton className="w-2 h-2 rounded-full" />
                                    <Skeleton className="h-4 flex-1" />
                                </div>
                            ))
                        ) : repos.length === 0 ? (
                            <p className="px-4 py-2 text-xs text-[#8B949E] italic">No repositories added</p>
                        ) : (
                            repos.map((repo) => (
                                <Link
                                    key={repo.id}
                                    to={`/chat/${repo.id}`}
                                    className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm transition-all group ${activeRepo?.id === repo.id
                                            ? 'bg-[#161B22] text-[#E6EDF3] border border-[#30363D]'
                                            : 'text-[#8B949E] hover:bg-[#161B22]/50 hover:text-[#E6EDF3]'
                                        } ${repo.status !== 'READY' ? 'opacity-50 cursor-not-allowed' : ''}`}
                                    onClick={(e) => repo.status !== 'READY' && e.preventDefault()}
                                >
                                    <div className={`w-2 h-2 rounded-full flex-shrink-0 ${repo.status === 'READY'
                                            ? 'bg-[#3DDC84] status-pulse'
                                            : repo.status === 'PENDING'
                                                ? 'bg-yellow-500/50'
                                                : repo.status === 'PARSING' || repo.status === 'EMBEDDING'
                                                    ? 'bg-primary animate-pulse'
                                                    : repo.status === 'FAILED'
                                                        ? 'bg-[#F85149]'
                                                        : 'bg-[#30363D]'
                                        }`} />
                                    <span className="truncate">{repo.repoUrl.split('/').pop()}</span>
                                </Link>
                            ))
                        )}
                    </div>
                </nav>

                <div className="p-4 border-t border-[#21262D] space-y-3">
                    <div className="flex items-center gap-3 px-3 py-2">
                        <div className="avatar-ring">
                            <div className="w-8 h-8 rounded-full bg-[#0D1117] flex items-center justify-center text-primary font-bold text-xs">
                                {user.name?.charAt(0).toUpperCase()}
                            </div>
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium truncate text-[#E6EDF3]">{user.name}</p>
                            <p className="text-xs text-[#8B949E] truncate">{user.email}</p>
                        </div>
                    </div>
                    <button
                        onClick={logout}
                        className="flex items-center gap-3 w-full px-3 py-2 rounded-lg text-sm text-[#F85149] hover:bg-[#F85149]/10 transition-all"
                    >
                        <LogOut className="w-4 h-4" />
                        <span>Logout</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col overflow-hidden relative">
                <div className="absolute inset-0 pointer-events-none" style={{
                    background: 'radial-gradient(ellipse at 20% 50%, rgba(47, 129, 247, 0.04) 0%, transparent 60%)'
                }}></div>
                <AnimatePresence mode="wait">
                    <motion.div
                        key={location.pathname}
                        variants={pageTransition}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        className="flex-1 flex flex-col overflow-hidden"
                    >
                        <Outlet />
                    </motion.div>
                </AnimatePresence>
            </main>
        </div>
    );
};

export default DashboardLayout;

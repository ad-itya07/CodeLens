import React from 'react';
import { Outlet, Navigate, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LayoutDashboard, MessageSquare, LogOut, Github, PlusCircle, Search } from 'lucide-react';
import { useProject } from '../context/ProjectContext';
import Skeleton from '../components/Skeleton';

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
    ];

    return (
        <div className="flex h-screen bg-background text-foreground overflow-hidden">
            {/* Sidebar */}
            <aside className="w-64 bg-card border-r border-border flex flex-col">
                <div className="p-6 flex items-center gap-3">
                    <div className="bg-primary/20 p-2 rounded-lg">
                        <Github className="w-6 h-6 text-primary" />
                    </div>
                    <h1 className="text-xl font-bold tracking-tight">CodeLens</h1>
                </div>

                <nav className="flex-1 px-4 space-y-2 mt-4">
                    {navItems.map((item) => (
                        <Link
                            key={item.name}
                            to={item.path}
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${location.pathname === item.path
                                ? 'bg-primary/10 text-primary shadow-sm'
                                : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
                                } ${item.disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
                            onClick={(e) => item.disabled && e.preventDefault()}
                        >
                            <item.icon className="w-5 h-5" />
                            <span className="font-medium">{item.name}</span>
                        </Link>
                    ))}

                    <div className="pt-8 pb-2 px-4">
                        <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Repositories</h2>
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
                            <p className="px-4 py-2 text-xs text-muted-foreground italic">No repositories added</p>
                        ) : (
                            repos.map((repo) => (
                                <Link
                                    key={repo.id}
                                    to={`/chat/${repo.id}`}
                                    className={`flex items-center gap-3 px-4 py-2 rounded-lg text-sm transition-all ${activeRepo?.id === repo.id
                                        ? 'bg-secondary text-foreground border border-border'
                                        : 'text-muted-foreground hover:bg-secondary/50 hover:text-foreground'
                                        }`}
                                >
                                    <div className={`w-2 h-2 rounded-full ${repo.status === 'READY' ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]' :
                                        repo.status === 'PENDING' ? 'bg-yellow-500/50' :
                                            repo.status === 'PARSING' || repo.status === 'EMBEDDING' ? 'bg-blue-500 animate-pulse shadow-[0_0_8px_rgba(59,130,246,0.5)]' :
                                                repo.status === 'FAILED' ? 'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]' : 'bg-muted'
                                        }`} />
                                    <span className="truncate">{repo.repoUrl.split('/').pop()}</span>
                                </Link>
                            ))
                        )}
                    </div>
                </nav>

                <div className="p-4 border-t border-border space-y-4">
                    <div className="flex items-center gap-3 px-4 py-2">
                        <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-xs">
                            {user.name?.charAt(0).toUpperCase()}
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium truncate">{user.name}</p>
                            <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                        </div>
                    </div>
                    <button
                        onClick={logout}
                        className="flex items-center gap-3 w-full px-4 py-2 rounded-lg text-sm text-red-400 hover:bg-red-400/10 transition-all"
                    >
                        <LogOut className="w-4 h-4" />
                        <span>Logout</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col overflow-hidden relative">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(59,130,246,0.05),transparent_50%)] pointer-events-none"></div>
                <Outlet />
            </main>
        </div>
    );
};

export default DashboardLayout;

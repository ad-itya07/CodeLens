import React, { useState } from 'react';
import { useProject } from '../context/ProjectContext';
import { Plus, Github, ExternalLink, Clock, CheckCircle2, AlertCircle, Loader2, Search, RefreshCw } from 'lucide-react';
import { Link } from 'react-router-dom';
import Skeleton from '../components/Skeleton';
import { useProjectStatusPolling } from '../hooks/useProjectStatusPolling';

const Dashboard = () => {
    const { repos, addRepo, loading, isFetching, queries, updateRepo } = useProject();
    const [githubUrl, setGithubUrl] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);

    const { isReconnecting } = useProjectStatusPolling(repos, updateRepo);

    const handleAddRepo = async (e) => {
        e.preventDefault();
        const success = await addRepo(githubUrl);
        if (success) {
            setGithubUrl('');
            setIsModalOpen(false);
        }
    };

    const getStatusIcon = (status) => {
        switch (status?.toUpperCase()) {
            case 'READY': return <CheckCircle2 className="w-5 h-5 text-green-500 shadow-[0_0_8px_rgba(34,197,94,0.3)]" />;
            case 'PENDING':
            case 'PARSING':
            case 'EMBEDDING':
            case 'PROCESSING': return <Loader2 className="w-5 h-5 text-blue-500 animate-spin shadow-[0_0_8px_rgba(59,130,246,0.3)]" />;
            case 'FAILED': return <AlertCircle className="w-5 h-5 text-red-500 shadow-[0_0_8px_rgba(239,68,68,0.3)]" />;
            default: return <Clock className="w-5 h-5 text-yellow-500/50" />;
        }
    };

    const numEntries = repos.reduce((acc, repo) => {
        const count = repo.status === 'READY' 
            ? (repo.entries?.length || repo.totalEntities || 0)
            : (repo.totalEntities || 0);
        return acc + count;
    }, 0);
    return (
        <div className="p-8 max-w-7xl mx-auto w-full space-y-8 overflow-y-auto h-full custom-scrollbar">
            <div className="flex justify-between items-end">
                <div className="space-y-1">
                    <h1 className="text-3xl font-bold tracking-tight">Your Projects</h1>
                    <p className="text-muted-foreground text-lg">Manage and explore your indexed repositories</p>
                </div>
                <div className="flex items-center gap-4">
                    {isReconnecting && (
                        <div className="flex items-center gap-2 text-yellow-500 text-sm font-medium animate-pulse">
                            <RefreshCw className="w-4 h-4 animate-spin" />
                            Reconnecting...
                        </div>
                    )}
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="bg-primary text-primary-foreground px-6 py-3 rounded-2xl font-semibold flex items-center gap-2 hover:opacity-90 transition-all shadow-lg shadow-primary/20"
                    >
                        <Plus className="w-5 h-5" />
                        Add Repository
                    </button>
                </div>
            </div>

            {/* Stats / Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                    { label: 'Total Projects', value: repos.length, color: 'bg-blue-500/10 text-blue-500' },
                    { label: 'Indexed Files', value: numEntries, color: 'bg-green-500/10 text-green-500' },
                    { label: 'Questions Saved', value: queries.length, color: 'bg-purple-500/10 text-purple-500' },
                ].map((stat) => (
                    <div key={stat.label} className="bg-card border border-border p-6 rounded-3xl space-y-2">
                        <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                        {isFetching ? (
                            <Skeleton className="h-9 w-16" />
                        ) : (
                            <p className={`text-3xl font-bold ${stat.color.split(' ')[1]}`}>{stat.value}</p>
                        )}
                    </div>
                ))}
            </div>

            {/* Repo Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {isFetching ? (
                    Array(3).fill(0).map((_, i) => (
                        <div key={i} className="bg-card border border-border p-6 rounded-3xl space-y-6">
                            <div className="flex justify-between items-start">
                                <Skeleton className="w-12 h-12 rounded-2xl" />
                                <Skeleton className="w-5 h-5 rounded-full" />
                            </div>
                            <div className="space-y-2">
                                <Skeleton className="h-7 w-3/4" />
                                <Skeleton className="h-4 w-full" />
                            </div>
                            <div className="pt-6 border-t border-border flex justify-between">
                                <Skeleton className="h-4 w-16" />
                                <Skeleton className="h-4 w-12" />
                            </div>
                        </div>
                    ))
                ) : repos.length === 0 ? (
                    <div className="col-span-full py-20 text-center space-y-4 bg-secondary/20 rounded-3xl border-2 border-dashed border-border">
                        <div className="bg-secondary w-16 h-16 rounded-full flex items-center justify-center mx-auto">
                            <Search className="w-8 h-8 text-muted-foreground" />
                        </div>
                        <div className="space-y-1">
                            <p className="text-xl font-semibold">No repositories yet</p>
                            <p className="text-muted-foreground">Add your first GitHub repository to get started</p>
                        </div>
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="text-primary font-semibold hover:underline"
                        >
                            Add Repository Now
                        </button>
                    </div>
                ) : (
                    repos.map((repo) => {
                        const repoPercent = repo.percent ?? (repo.totalEntities > 0 ? Math.round((repo.completedEntities / repo.totalEntities) * 100) : 0);

                        return (
                            <Link
                                key={repo.id}
                                to={repo.status === 'READY' ? `/chat/${repo.id}` : '#'}
                                onClick={(e) => repo.status !== 'READY' && e.preventDefault()}
                                className={`group bg-card border border-border p-6 rounded-3xl transition-all duration-300 flex flex-col justify-between ${repo.status === 'READY' ? 'hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/5 cursor-pointer' : 'opacity-60 cursor-not-allowed'}`}
                            >
                                <div className="space-y-4">
                                    <div className="flex justify-between items-start">
                                        <div className={`p-3 rounded-2xl transition-colors ${repo.status === 'READY' ? 'bg-secondary group-hover:bg-primary/10' : 'bg-secondary/50'}`}>
                                            <Github className={`w-6 h-6 ${repo.status === 'READY' ? 'text-muted-foreground group-hover:text-primary' : 'text-muted-foreground/50'}`} />
                                        </div>
                                        {getStatusIcon(repo.status)}
                                    </div>
                                    <div>
                                        <h3 className={`text-xl font-bold truncate ${repo.status === 'READY' ? 'group-hover:text-primary transition-colors' : 'text-muted-foreground'}`}>
                                            {repo.repoUrl?.split('/').pop() || 'Unnamed Repo'}
                                        </h3>
                                        <p className="text-sm text-muted-foreground truncate mt-1">{repo.repoUrl}</p>
                                    </div>
                                </div>

                                <div className="mt-6 space-y-4">
                                    {repo.status === 'EMBEDDING' && (
                                        <div className="space-y-2">
                                            <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                                                <span>Embedding Progress</span>
                                                <span>{repoPercent}%</span>
                                            </div>
                                            <div className="h-1.5 w-full bg-secondary rounded-full overflow-hidden">
                                                <div
                                                    className="h-full bg-primary transition-all duration-500 ease-out"
                                                    style={{ width: `${repoPercent}%` }}
                                                />
                                            </div>
                                            <div className="text-[10px] text-muted-foreground text-right">
                                                {repo.completedEntities || 0} / {repo.totalEntities || 0} entities
                                            </div>
                                        </div>
                                    )}

                                    <div className="pt-4 border-t border-border flex items-center justify-between">
                                        <div className="flex flex-col">
                                            <span className={`text-[10px] font-bold uppercase tracking-widest ${repo.status === 'READY' ? 'text-primary' : 'text-muted-foreground'}`}>
                                                {repo.status || 'Pending'}
                                            </span>
                                            {repo.currentStep && repo.status !== 'READY' && repo.status !== 'FAILED' && (
                                                <span className="text-[10px] text-muted-foreground/70 truncate max-w-[150px]">
                                                    {repo.currentStep}
                                                </span>
                                            )}
                                        </div>
                                        {repo.status !== 'READY' && (
                                            <div className="flex flex-col items-end">
                                                <span className="text-[10px] font-medium text-muted-foreground italic">
                                                    {repo.status === 'FAILED' ? 'Indexing failed' :
                                                        repo.status === 'PENDING' ? 'Queued...' : 'Indexing...'}
                                                </span>
                                                {repo.status === 'FAILED' && (
                                                    <button
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            e.stopPropagation();
                                                            addRepo(repo.repoUrl);
                                                        }}
                                                        className="text-[10px] text-primary hover:underline font-bold mt-1"
                                                    >
                                                        Retry
                                                    </button>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </Link>
                        );
                    })
                )}
            </div>

            {/* Add Repo Modal */}
            {
                isModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
                        <div className="bg-card border border-border w-full max-w-lg rounded-3xl shadow-2xl p-8 space-y-6 animate-in fade-in zoom-in duration-200">
                            <div className="space-y-2 text-center">
                                <h2 className="text-2xl font-bold">Add New Repository</h2>
                                <p className="text-muted-foreground">Enter the GitHub URL of the project you want to index</p>
                            </div>

                            <form onSubmit={handleAddRepo} className="space-y-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium ml-1">Repository URL</label>
                                    <input
                                        type="url"
                                        required
                                        value={githubUrl}
                                        onChange={(e) => setGithubUrl(e.target.value)}
                                        placeholder="https://github.com/username/repo"
                                        className="w-full bg-secondary border border-border rounded-xl py-3 px-4 focus:ring-2 focus:ring-primary/50 outline-none transition-all"
                                    />
                                </div>

                                <div className="flex gap-3 pt-2">
                                    <button
                                        type="button"
                                        onClick={() => setIsModalOpen(false)}
                                        className="flex-1 px-4 py-3 rounded-xl border border-border font-semibold hover:bg-secondary transition-all"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="flex-1 bg-primary text-primary-foreground px-4 py-3 rounded-xl font-semibold hover:opacity-90 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                                    >
                                        {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Start Indexing'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )
            }
        </div>
    );
};

export default Dashboard;

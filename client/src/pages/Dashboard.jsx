import React, { useState } from 'react';
import { useProject } from '../context/ProjectContext';
import { Plus, Github, Clock, CheckCircle2, AlertCircle, Loader2, Search, RefreshCw } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Skeleton from '../components/Skeleton';
import { useProjectStatusPolling } from '../hooks/useProjectStatusPolling';
import { useCountUp, staggerContainer, cardEntrance, scaleIn } from '../lib/animations';

// Count-up stat display
const StatNumber = ({ value, className }) => {
    const display = useCountUp(value);
    return <span className={className}>{display}</span>;
};

// Indexing step definitions
const INDEXING_STEPS = [
    { key: 'PENDING', label: 'Queued', icon: Clock },
    { key: 'PARSING', label: 'Parsing', icon: Loader2 },
    { key: 'EMBEDDING', label: 'Embedding', icon: Loader2 },
];

const getStepIndex = (status) => {
    switch (status?.toUpperCase()) {
        case 'PENDING': return 0;
        case 'PARSING': return 1;
        case 'EMBEDDING': return 2;
        case 'READY': return 3;
        default: return -1;
    }
};

const IndexingProgress = ({ repo }) => {
    const currentIdx = getStepIndex(repo.status);
    const repoPercent = repo.percent ?? (repo.totalEntities > 0 ? Math.round((repo.completedEntities / repo.totalEntities) * 100) : 0);

    return (
        <div className="space-y-3">
            {/* Horizontal stepper */}
            <div className="flex items-center gap-1">
                {INDEXING_STEPS.map((step, idx) => {
                    const isCompleted = currentIdx > idx;
                    const isActive = currentIdx === idx;
                    const StepIcon = step.icon;

                    return (
                        <React.Fragment key={step.key}>
                            <div className="flex flex-col items-center gap-1 flex-1">
                                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold transition-all ${isCompleted
                                        ? 'bg-[#3DDC84]/20 text-[#3DDC84]'
                                        : isActive
                                            ? 'bg-primary/20 text-primary ring-2 ring-primary/30 animate-pulse'
                                            : 'bg-[#161B22] text-[#8B949E]'
                                    }`}>
                                    {isCompleted ? (
                                        <motion.div {...scaleIn}>
                                            <CheckCircle2 className="w-3.5 h-3.5" />
                                        </motion.div>
                                    ) : isActive ? (
                                        <StepIcon className="w-3 h-3 animate-spin" />
                                    ) : (
                                        <span>{idx + 1}</span>
                                    )}
                                </div>
                                <span className={`text-[8px] font-bold uppercase tracking-widest ${isActive ? 'text-primary' : isCompleted ? 'text-[#3DDC84]' : 'text-[#8B949E]/50'
                                    }`}>
                                    {step.label}
                                </span>
                            </div>
                            {idx < INDEXING_STEPS.length - 1 && (
                                <div className="h-[2px] flex-1 bg-[#21262D] rounded-full overflow-hidden -mt-4">
                                    <div
                                        className="h-full bg-[#3DDC84] transition-all duration-500"
                                        style={{ width: isCompleted ? '100%' : '0%' }}
                                    />
                                </div>
                            )}
                        </React.Fragment>
                    );
                })}
            </div>

            {/* Progress bar for embedding */}
            {repo.status === 'EMBEDDING' && (
                <div className="space-y-1">
                    <div className="h-1 w-full bg-[#161B22] rounded-full overflow-hidden">
                        <motion.div
                            className="h-full bg-primary"
                            initial={{ width: 0 }}
                            animate={{ width: `${repoPercent}%` }}
                            transition={{ duration: 0.5, ease: 'easeOut' }}
                        />
                    </div>
                    <div className="flex justify-between text-[8px] text-[#8B949E] font-medium">
                        <span>{repo.completedEntities || 0} / {repo.totalEntities || 0} entities</span>
                        <span>{repoPercent}%</span>
                    </div>
                </div>
            )}
        </div>
    );
};

const Dashboard = () => {
    const { repos, addRepo, loading, isFetching, queries, updateRepo } = useProject();
    const [githubUrl, setGithubUrl] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [addBtnHover, setAddBtnHover] = useState(false);

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
            case 'READY':
                return (
                    <motion.div {...scaleIn}>
                        <CheckCircle2 className="w-5 h-5 text-[#3DDC84]" />
                    </motion.div>
                );
            case 'PENDING':
            case 'PARSING':
            case 'EMBEDDING':
            case 'PROCESSING':
                return <Loader2 className="w-5 h-5 text-primary animate-spin" />;
            case 'FAILED':
                return <AlertCircle className="w-5 h-5 text-[#F85149]" />;
            default:
                return <Clock className="w-5 h-5 text-[#8B949E]/50" />;
        }
    };

    const numEntries = repos.reduce((acc, repo) => {
        const count = repo.status === 'READY'
            ? (repo.entries?.length || repo.totalEntities || 0)
            : (repo.totalEntities || 0);
        return acc + count;
    }, 0);

    const stats = [
        { label: 'Total Projects', value: repos.length, color: 'text-primary', glow: 'glow-blue' },
        { label: 'Indexed Files', value: numEntries, color: 'text-[#3DDC84]', glow: 'glow-green' },
        { label: 'Questions Saved', value: queries.length, color: 'text-[#A371F7]', glow: 'glow-violet' },
    ];

    return (
        <div className="p-8 max-w-7xl mx-auto w-full space-y-8 overflow-y-auto h-full custom-scrollbar">
            {/* Header */}
            <div className="flex justify-between items-end">
                <div className="space-y-1">
                    <h1 className="text-3xl font-bold tracking-tight text-[#E6EDF3]">Your Projects</h1>
                    <p className="text-[#8B949E] text-lg">Manage and explore your indexed repositories</p>
                </div>
                <div className="flex items-center gap-4">
                    {isReconnecting && (
                        <div className="flex items-center gap-2 text-yellow-500 text-sm font-medium animate-pulse">
                            <RefreshCw className="w-4 h-4 animate-spin" />
                            Reconnecting...
                        </div>
                    )}
                    <motion.button
                        onClick={() => setIsModalOpen(true)}
                        onHoverStart={() => setAddBtnHover(true)}
                        onHoverEnd={() => setAddBtnHover(false)}
                        className="gradient-btn text-white px-6 py-3 rounded-2xl font-semibold flex items-center gap-2 transition-all"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <motion.div
                            animate={{ rotate: addBtnHover ? 90 : 0 }}
                            transition={{ duration: 0.2 }}
                        >
                            <Plus className="w-5 h-5" />
                        </motion.div>
                        Add Repository
                    </motion.button>
                </div>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {stats.map((stat, i) => (
                    <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1, duration: 0.4 }}
                        whileHover={{ y: -2, boxShadow: '0 8px 30px rgba(0,0,0,0.3)' }}
                        className="glass p-6 rounded-xl space-y-2 cursor-default"
                    >
                        <p className="text-sm font-medium text-[#8B949E]">{stat.label}</p>
                        {isFetching ? (
                            <Skeleton className="h-9 w-16" />
                        ) : (
                            <p className={`text-3xl font-bold ${stat.color} ${stat.glow}`}>
                                <StatNumber value={stat.value} />
                            </p>
                        )}
                    </motion.div>
                ))}
            </div>

            {/* Repo Grid */}
            <motion.div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                variants={staggerContainer}
                initial="initial"
                animate="animate"
            >
                {isFetching ? (
                    Array(3).fill(0).map((_, i) => (
                        <div key={i} className="glass p-6 rounded-2xl space-y-6">
                            <div className="flex justify-between items-start">
                                <Skeleton className="w-12 h-12 rounded-2xl" />
                                <Skeleton className="w-5 h-5 rounded-full" />
                            </div>
                            <div className="space-y-2">
                                <Skeleton className="h-7 w-3/4" />
                                <Skeleton className="h-4 w-full" />
                            </div>
                            <div className="pt-6 border-t border-[#21262D] flex justify-between">
                                <Skeleton className="h-4 w-16" />
                                <Skeleton className="h-4 w-12" />
                            </div>
                        </div>
                    ))
                ) : repos.length === 0 ? (
                    <div className="col-span-full py-20 text-center space-y-4 glass rounded-3xl border-2 border-dashed border-[#21262D]">
                        <div className="bg-[#161B22] w-16 h-16 rounded-full flex items-center justify-center mx-auto">
                            <Search className="w-8 h-8 text-[#8B949E]" />
                        </div>
                        <div className="space-y-1">
                            <p className="text-xl font-semibold text-[#E6EDF3]">No repositories yet</p>
                            <p className="text-[#8B949E]">Add your first GitHub repository to get started</p>
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
                        const isIndexing = ['PENDING', 'PARSING', 'EMBEDDING'].includes(repo.status?.toUpperCase());
                        const isFailed = repo.status === 'FAILED';
                        const isReady = repo.status === 'READY';

                        return (
                            <motion.div key={repo.id} variants={cardEntrance}>
                                <Link
                                    to={isReady ? `/chat/${repo.id}` : '#'}
                                    onClick={(e) => !isReady && e.preventDefault()}
                                    className={`group block glass shimmer-hover p-6 rounded-2xl transition-all duration-300 flex flex-col justify-between ${isReady
                                            ? 'hover:border-primary/40 hover:shadow-2xl hover:shadow-primary/5 cursor-pointer'
                                            : isFailed
                                                ? 'border-[#F85149]/20'
                                                : 'opacity-80 cursor-not-allowed'
                                        } ${isIndexing && !isFailed ? 'border-beam' : ''}`}
                                >
                                    <div className="space-y-4">
                                        <div className="flex justify-between items-start">
                                            <div className={`p-3 rounded-2xl transition-colors ${isReady
                                                    ? 'bg-[#161B22] group-hover:bg-primary/10'
                                                    : 'bg-[#161B22]/50'
                                                }`}>
                                                <Github className={`w-6 h-6 ${isReady
                                                        ? 'text-[#8B949E] group-hover:text-primary'
                                                        : 'text-[#8B949E]/50'
                                                    }`} />
                                            </div>
                                            {getStatusIcon(repo.status)}
                                        </div>
                                        <div>
                                            <h3 className={`text-xl font-bold truncate ${isReady
                                                    ? 'text-[#E6EDF3] group-hover:text-primary transition-colors'
                                                    : 'text-[#8B949E]'
                                                }`}>
                                                {repo.repoUrl?.split('/').pop() || 'Unnamed Repo'}
                                            </h3>
                                            <p className="text-sm text-[#8B949E] truncate mt-1">{repo.repoUrl}</p>
                                        </div>
                                    </div>

                                    <div className="mt-6 space-y-4">
                                        {/* Indexing progress stepper */}
                                        {isIndexing && <IndexingProgress repo={repo} />}

                                        <div className="pt-4 border-t border-[#21262D] flex items-center justify-between">
                                            <div className="flex flex-col">
                                                {isReady ? (
                                                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest bg-[rgba(61,220,132,0.1)] text-[#3DDC84] border border-[rgba(61,220,132,0.2)]">
                                                        Ready
                                                    </span>
                                                ) : (
                                                    <span className={`text-[10px] font-bold uppercase tracking-widest ${isFailed ? 'text-[#F85149]' : 'text-[#8B949E]'
                                                        }`}>
                                                        {repo.status || 'Pending'}
                                                    </span>
                                                )}
                                                {repo.currentStep && !isReady && !isFailed && (
                                                    <span className="text-[10px] text-[#8B949E]/70 truncate max-w-[150px] mt-0.5">
                                                        {repo.currentStep}
                                                    </span>
                                                )}
                                            </div>
                                            {!isReady && (
                                                <div className="flex flex-col items-end">
                                                    <span className="text-[10px] font-medium text-[#8B949E] italic">
                                                        {isFailed ? 'Import failed' :
                                                            repo.status === 'PENDING' ? 'Queued...' : 'Indexing...'}
                                                    </span>
                                                    {isFailed && (
                                                        <span
                                                            className="text-[10px] text-primary hover:underline font-bold mt-1"
                                                        >
                                                            Check repository access and try again.
                                                        </span>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        );
                    })
                )}
            </motion.div>

            {/* Add Repo Modal */}
            <AnimatePresence>
                {isModalOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#080C10]/80 backdrop-blur-sm"
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.92, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.92, y: 20 }}
                            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                            className="glass-elevated w-full max-w-lg rounded-3xl shadow-2xl p-8 space-y-6"
                        >
                            <div className="space-y-2 text-center">
                                <h2 className="text-2xl font-bold text-[#E6EDF3]">Add a New Public Repository</h2>
                                <p className="text-[#8B949E]">Enter the GitHub URL of the project you want to index</p>
                            </div>

                            <form onSubmit={handleAddRepo} className="space-y-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium ml-1 text-[#8B949E]">Repository URL</label>
                                    <input
                                        type="url"
                                        required
                                        value={githubUrl}
                                        onChange={(e) => setGithubUrl(e.target.value)}
                                        placeholder="https://github.com/username/repo"
                                        className="w-full bg-[#0D1117] border border-[#21262D] rounded-xl py-3 px-4 text-[#E6EDF3] placeholder:text-[#8B949E]/50 focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all"
                                    />
                                </div>

                                <div className="flex gap-3 pt-2">
                                    <button
                                        type="button"
                                        onClick={() => setIsModalOpen(false)}
                                        className="flex-1 px-4 py-3 rounded-xl border border-[#21262D] font-semibold text-[#8B949E] hover:bg-[#161B22] transition-all"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="flex-1 gradient-btn text-white px-4 py-3 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                                    >
                                        {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Start Indexing'}
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Dashboard;

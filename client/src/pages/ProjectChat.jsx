import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useProject } from '../context/ProjectContext';
import { Github, ExternalLink, Search, Sparkles, Loader2, ArrowLeft, MoreVertical, MessageSquare, Save, X, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import QueryModal from '../components/QueryModal';
import SavedQueriesCard from '../components/SavedQueriesCard';
import QuerySlider from '../components/QuerySlider';

const ProjectChat = () => {
    const { id } = useParams();
    const { repos, queries, askQuestion, setActiveRepo: setContextActiveRepo, loading } = useProject();
    const [query, setQuery] = useState('');
    const [activeRepo, setActiveRepo] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [currentResponse, setCurrentResponse] = useState(null);
    const [showSlider, setShowSlider] = useState(false);
    const [selectedSavedQuery, setSelectedSavedQuery] = useState(null);

    useEffect(() => {
        const repo = repos.find(r => String(r.id) === String(id));
        if (repo) {
            setContextActiveRepo(repo);
            setActiveRepo(repo);
        }
    }, [id, repos, setContextActiveRepo]);

    const handleAsk = async (e) => {
        e.preventDefault();
        if (!query.trim() || loading) return;

        const res = await askQuestion(id, query);
        if (res) {
            setCurrentResponse({
                query: query,
                answer: res.answer,
                codeResults: res.codeResults
            });
            setShowModal(true);
            setQuery('');
        }
    };

    const handleOpenSavedQuery = (savedQuery) => {
        setSelectedSavedQuery(savedQuery);
        setShowSlider(true);
    };

    if (!activeRepo) {
        return (
            <div className="flex-1 flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
        );
    }

    return (
        <div className="flex-1 flex flex-col h-full bg-[#0a0f1a] text-white overflow-hidden relative">
            {/* Header */}
            <header className="h-16 border-b border-white/10 px-8 flex items-center justify-between bg-[#0a0f1a]/80 backdrop-blur-md z-10">
                <div className="flex items-center gap-4">
                    <Link to="/dashboard" className="p-2 hover:bg-white/5 rounded-lg transition-colors">
                        <ArrowLeft className="w-5 h-5 text-gray-400" />
                    </Link>
                    <h2 className="font-bold text-lg tracking-tight">{activeRepo.repoUrl.split('/').pop()}</h2>
                </div>
            </header>

            {/* Main Content Grid */}
            <div className="flex-1 p-8 overflow-y-auto custom-scrollbar">
                <div className="max-w-7xl mx-auto space-y-6">

                    {/* Top Card: Linked Repository */}
                    <div className="bg-[#0d1526] border border-[#1e2d4d] rounded-2xl p-6 flex items-center justify-between group hover:border-primary/50 transition-all duration-300">
                        <div className="flex items-center gap-4">
                            <div className="bg-primary/20 p-3 rounded-xl">
                                <Github className="w-6 h-6 text-primary" />
                            </div>
                            <div>
                                <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider">Linked Repository</h3>
                                <a
                                    href={activeRepo.repoUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-primary hover:underline flex items-center gap-2 mt-1 font-medium"
                                >
                                    {activeRepo.repoUrl}
                                    <ExternalLink className="w-4 h-4" />
                                </a>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Bottom Left: Ask a Question */}
                        <div className="bg-[#0d1526] border border-[#1e2d4d] rounded-3xl p-8 space-y-6 flex flex-col shadow-2xl">
                            <div className="flex items-center gap-3">
                                <div className="bg-primary/20 p-2.5 rounded-xl">
                                    <MessageSquare className="w-6 h-6 text-primary" />
                                </div>
                                <h3 className="text-xl font-bold tracking-tight">Ask a Question</h3>
                            </div>

                            <form onSubmit={handleAsk} className="flex-1 flex flex-col space-y-4">
                                <div className="flex-1 relative">
                                    <textarea
                                        value={query}
                                        onChange={(e) => setQuery(e.target.value)}
                                        placeholder="Which file should I edit to change the home page?"
                                        className="w-full h-full min-h-[200px] bg-[#162033] border border-[#2d3d5c] rounded-2xl p-6 text-gray-200 placeholder:text-gray-500 focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all resize-none custom-scrollbar"
                                    />
                                    <div className="absolute bottom-4 right-4 text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                                        Powered by AI
                                    </div>
                                </div>
                                <button
                                    type="submit"
                                    disabled={!query.trim() || loading}
                                    className="w-full bg-primary hover:bg-primary/90 text-[#0a0f1a] font-bold py-4 rounded-2xl transition-all shadow-lg shadow-primary/20 flex items-center justify-center gap-2 disabled:opacity-50 group"
                                >
                                    {loading ? (
                                        <Loader2 className="w-6 h-6 animate-spin" />
                                    ) : (
                                        <>
                                            <Bot className="w-5 h-5" />
                                            Ask CodeLens
                                        </>
                                    )}
                                </button>
                            </form>

                            <div className="pt-4 space-y-3">
                                <p className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em] ml-1">Suggestions</p>
                                <div className="flex flex-wrap gap-2">
                                    {["Project structure", "Auth logic", "DB schema"].map(s => (
                                        <button
                                            key={s}
                                            onClick={() => setQuery(prev => prev + (prev ? ' ' : '') + s)}
                                            className="px-3 py-1.5 bg-[#162033] border border-[#2d3d5c] rounded-lg text-xs font-medium text-gray-400 hover:text-primary hover:border-primary/50 transition-all"
                                        >
                                            {s}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Bottom Right: Saved Queries */}
                        <SavedQueriesCard
                            projectId={id}
                            onOpenQuery={handleOpenSavedQuery}
                        />
                    </div>
                </div>
            </div>

            {/* Modal for Response */}
            <AnimatePresence>
                {showModal && (
                    <QueryModal
                        response={currentResponse}
                        onClose={() => setShowModal(false)}
                        projectId={id}
                    />
                )}
            </AnimatePresence>

            {/* Slider for Saved Query */}
            <AnimatePresence>
                {showSlider && (
                    <QuerySlider
                        query={selectedSavedQuery}
                        onClose={() => setShowSlider(false)}
                    />
                )}
            </AnimatePresence>
        </div>
    );
};

// Helper Bot icon if not imported
const Bot = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 8V4H8" /><rect width="16" height="12" x="4" y="8" rx="2" /><path d="M2 14h2" /><path d="M20 14h2" /><path d="M15 13v2" /><path d="M9 13v2" />
    </svg>
);

export default ProjectChat;

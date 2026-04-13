import React from 'react';
import { motion } from 'framer-motion';
import { X, FileText, Sparkles, Clock, Calendar, Bookmark } from 'lucide-react';
import SourceCard from './SourceCard';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const QuerySlider = ({ query, onClose }) => {
    if (!query) return null;

    return (
        <div className="fixed inset-0 z-50 flex overflow-hidden">
            {/* Backdrop */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
                className="absolute inset-0 bg-[#0a0f1a]/80 backdrop-blur-sm"
            />

            {/* Slider Content */}
            <motion.div
                initial={{ x: '-100%' }}
                animate={{ x: 0 }}
                exit={{ x: '-100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className="relative w-full max-w-2xl bg-[#0d1526] border-r border-white/10 shadow-2xl flex flex-col h-full"
            >
                {/* Header */}
                <div className="p-8 border-b border-white/5 flex items-center justify-between bg-[#111a2e]">
                    <div className="flex items-center gap-4">
                        <div className="bg-primary/20 p-3 rounded-2xl">
                            <Bookmark className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                            <h3 className="font-bold text-xl tracking-tight">Saved Analysis</h3>
                            <div className="flex items-center gap-3 mt-1">
                                <div className="flex items-center gap-1 text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                                    <Calendar className="w-3 h-3" />
                                    {new Date(query.createdAt).toLocaleDateString()}
                                </div>
                                <div className="w-1 h-1 rounded-full bg-gray-600"></div>
                                <div className="flex items-center gap-1 text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                                    <Clock className="w-3 h-3" />
                                    {new Date(query.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </div>
                            </div>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-3 hover:bg-white/5 rounded-2xl text-gray-400 transition-colors border border-white/5"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                {/* Body */}
                <div className="flex-1 overflow-y-auto p-8 space-y-10 custom-scrollbar">
                    {/* Query Section */}
                    <div className="space-y-3">
                        <h4 className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em]">Original Query</h4>
                        <div className="bg-[#162033] border border-[#2d3d5c] p-6 rounded-2xl">
                            <p className="text-lg font-semibold text-white/90 leading-relaxed">
                                {query.query}
                            </p>
                        </div>
                    </div>

                    {/* Answer Section */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-2">
                            <Sparkles className="w-4 h-4 text-primary" />
                            <h4 className="text-[10px] font-bold text-primary uppercase tracking-[0.2em]">AI Response</h4>
                        </div>
                        <div className="markdown-content text-base leading-relaxed text-gray-300 whitespace-pre-wrap">
                            <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                {query.answer}
                            </ReactMarkdown>
                        </div>
                    </div>

                    {/* Sources Section */}
                    {query.codeResults && query.codeResults.length > 0 && (
                        <div className="space-y-4 pt-6 border-t border-white/5">
                            <h4 className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em] flex items-center gap-2">
                                <FileText className="w-4 h-4" /> Referenced Code
                            </h4>
                            <div className="grid grid-cols-1 gap-4">
                                {query.codeResults.map((source, idx) => (
                                    <SourceCard key={idx} source={source} />
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="p-8 border-t border-white/5 bg-[#111a2e] flex gap-4">
                    <button
                        onClick={onClose}
                        className="flex-1 py-4 rounded-2xl font-bold text-gray-400 bg-white/5 hover:bg-white/10 transition-all border border-white/5"
                    >
                        Close Analysis
                    </button>
                </div>
            </motion.div>
        </div>
    );
};

export default QuerySlider;

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { useProject } from '../context/ProjectContext';
import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { motion } from 'framer-motion';
import { X, Sparkles, Save, Loader2, FileText, Check } from 'lucide-react';
import SourceCard from './SourceCard';

const QueryModal = ({ response, onClose, projectId }) => {
    const { saveQuery } = useProject();
    const [displayedAnswer, setDisplayedAnswer] = useState('');
    const [isTyping, setIsTyping] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [isSaved, setIsSaved] = useState(false);

    useEffect(() => {
        if (response?.status === 'error') {
            setDisplayedAnswer(response.explanation || 'LLM services are down please try again later');
            setIsTyping(false);
            return;
        }
        if (!response?.answer) return;

        let index = 0;
        const interval = setInterval(() => {
            setDisplayedAnswer((prev) => prev + response.answer[index]);
            index++;
            if (index >= response.answer.length) {
                clearInterval(interval);
                setIsTyping(false);
            }
        }, 15);

        return () => clearInterval(interval);
    }, [response]);

    const handleSave = async () => {
        setIsSaving(true);
        const success = await saveQuery({
            projectId,
            query: response.query,
            answer: response.answer,
            codeResults: response.codeResults
        });
        if (success) {
            setIsSaved(true);
            toast.success('Query saved successfully');
        } else {
            toast.error('Failed to save query');
        }
        setIsSaving(false);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0a0f1a]/90 backdrop-blur-sm">
            <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="bg-[#0d1526] border border-[#1e2d4d] w-full max-w-4xl max-h-[90vh] rounded-[2.5rem] shadow-2xl flex flex-col overflow-hidden"
            >
                {/* Modal Header */}
                <div className="p-6 border-b border-white/5 flex items-center justify-between bg-[#111a2e]">
                    <div className="flex items-center gap-3">
                        <div className="bg-primary/20 p-2 rounded-lg">
                            <Sparkles className="w-5 h-5 text-primary" />
                        </div>
                        <h3 className="font-bold text-lg">AI Analysis</h3>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-white/5 rounded-full text-gray-400 transition-colors"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                {/* Modal Body */}
                <div className="flex-1 overflow-y-auto p-8 space-y-8 custom-scrollbar">
                    {/* User Query Echo */}
                    <div className="space-y-2">
                        <h4 className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em]">Your Question</h4>
                        <p className="text-xl font-semibold text-white/90">{response.query}</p>
                    </div>

                    {/* AI Answer */}
                    <div className="space-y-4">
                        <h4 className="text-[10px] font-bold text-primary uppercase tracking-[0.2em]">Response</h4>
                        <div className="bg-[#162033] p-8 rounded-3xl border border-[#2d3d5c]/50 min-h-[100px]">
                            <div className="markdown-content text-base leading-relaxed text-gray-300">
                                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                    {displayedAnswer}
                                </ReactMarkdown>
                                {isTyping && <span className="inline-block w-2 h-5 ml-1 bg-primary animate-pulse align-middle"></span>}
                            </div>
                        </div>
                    </div>

                    {/* Code Results */}
                    {!isTyping && response.codeResults && response.codeResults.length > 0 && (
                        <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <h4 className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em] flex items-center gap-2">
                                <FileText className="w-4 h-4" /> Relevant Code Snippets
                            </h4>
                            <div className="grid grid-cols-1 gap-4">
                                {response.codeResults.map((source, idx) => (
                                    <SourceCard key={idx} source={source} />
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Modal Footer */}
                <div className="p-6 border-t border-white/5 bg-[#111a2e] flex justify-end gap-4">
                    <button
                        onClick={onClose}
                        className="px-6 py-3 rounded-xl font-bold text-gray-400 hover:bg-white/5 transition-all"
                    >
                        Close
                    </button>
                    <button
                        onClick={handleSave}
                        disabled={isSaving || isSaved || isTyping || response?.status === 'error'}
                        className={`px-8 py-3 rounded-xl font-bold flex items-center gap-2 transition-all ${isSaved
                            ? 'bg-green-500/20 text-green-500 border border-green-500/30'
                            : 'bg-primary text-[#0a0f1a] hover:opacity-90 shadow-lg shadow-primary/20'
                            } disabled:opacity-50`}
                    >
                        {isSaving ? <Loader2 className="w-5 h-5 animate-spin" /> : isSaved ? <Check className="w-5 h-5" /> : <Save className="w-5 h-5" />}
                        {isSaved ? 'Saved' : 'Save Analysis'}
                    </button>
                </div>
            </motion.div>
        </div>
    );
};

export default QueryModal;

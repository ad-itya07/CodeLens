import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { useProject } from '../context/ProjectContext';
import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { motion } from 'framer-motion';
import { X, Sparkles, Save, Loader2, FileText, Check } from 'lucide-react';
import SourceCard from './SourceCard';
import { messageEntrance, typingDot } from '../lib/animations';

// Typing indicator with Framer Motion bounce
const TypingIndicator = () => (
    <div className="flex items-center gap-1.5 py-2">
        {[0, 1, 2].map((i) => (
            <motion.div
                key={i}
                className="w-2 h-2 rounded-full bg-primary"
                animate={typingDot(i * 0.15).animate}
            />
        ))}
    </div>
);

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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#080C10]/90 backdrop-blur-sm">
            <motion.div
                initial={{ opacity: 0, scale: 0.92, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.92, y: 20 }}
                transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                className="glass-elevated w-full max-w-4xl max-h-[90vh] rounded-[2rem] shadow-2xl flex flex-col overflow-hidden"
            >
                {/* Modal Header */}
                <div className="p-6 border-b border-[#21262D] flex items-center justify-between bg-[#0D1117]">
                    <div className="flex items-center gap-3">
                        <div className="bg-primary/10 p-2 rounded-lg">
                            <Sparkles className="w-5 h-5 text-primary" />
                        </div>
                        <h3 className="font-bold text-lg text-[#E6EDF3]">AI Analysis</h3>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-[#161B22] rounded-full text-[#8B949E] transition-colors"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                {/* Modal Body */}
                <div className="flex-1 overflow-y-auto p-8 space-y-8 custom-scrollbar">
                    {/* User Query Echo */}
                    <motion.div className="space-y-2" {...messageEntrance}>
                        <h4 className="text-[10px] font-bold text-[#8B949E] uppercase tracking-[0.2em]">Your Question</h4>
                        <div className="ml-auto max-w-[80%] p-4 rounded-2xl" style={{
                            background: 'rgba(47, 129, 247, 0.12)',
                            border: '1px solid rgba(47, 129, 247, 0.2)',
                        }}>
                            <p className="text-base font-semibold text-[#E6EDF3]">{response.query}</p>
                        </div>
                    </motion.div>

                    {/* AI Answer */}
                    <motion.div
                        className="space-y-4"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.15 }}
                    >
                        <h4 className="text-[10px] font-bold text-primary uppercase tracking-[0.2em]">Response</h4>
                        <div className="glass p-8 rounded-2xl min-h-[100px]">
                            <div className="markdown-content text-base leading-relaxed text-[#E6EDF3]/80">
                                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                    {displayedAnswer}
                                </ReactMarkdown>
                                {isTyping && <TypingIndicator />}
                            </div>
                        </div>
                    </motion.div>

                    {/* Code Results */}
                    {!isTyping && response.codeResults && response.codeResults.length > 0 && (
                        <motion.div
                            className="space-y-4"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                        >
                            <h4 className="text-[10px] font-bold text-[#8B949E] uppercase tracking-[0.2em] flex items-center gap-2">
                                <FileText className="w-4 h-4" /> Relevant Code Snippets
                            </h4>
                            <div className="grid grid-cols-1 gap-4">
                                {response.codeResults.map((source, idx) => (
                                    <SourceCard key={idx} source={source} />
                                ))}
                            </div>
                        </motion.div>
                    )}
                </div>

                {/* Modal Footer */}
                <div className="p-6 border-t border-[#21262D] bg-[#0D1117] flex justify-end gap-4">
                    <button
                        onClick={onClose}
                        className="px-6 py-3 rounded-xl font-bold text-[#8B949E] hover:bg-[#161B22] transition-all"
                    >
                        Close
                    </button>
                    <button
                        onClick={handleSave}
                        disabled={isSaving || isSaved || isTyping || response?.status === 'error'}
                        className={`px-8 py-3 rounded-xl font-bold flex items-center gap-2 transition-all ${isSaved
                            ? 'bg-[#3DDC84]/20 text-[#3DDC84] border border-[#3DDC84]/30'
                            : 'gradient-btn text-white'
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

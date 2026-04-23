import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Code, FileText, ExternalLink, Copy, Check } from 'lucide-react';
import toast from 'react-hot-toast';

const SourceCard = ({ source }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(source.code);
        setCopied(true);
        toast.success('Code copied to clipboard');
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="glass rounded-2xl overflow-hidden transition-all duration-300 hover:border-primary/30">
            <div
                className="p-4 flex items-center justify-between cursor-pointer hover:bg-[#161B22]/50 transition-colors"
                onClick={() => setIsExpanded(!isExpanded)}
            >
                <div className="flex items-center gap-3 min-w-0">
                    <div className="bg-primary/10 p-2 rounded-lg">
                        <Code className="w-4 h-4 text-primary" />
                    </div>
                    <div className="min-w-0">
                        <p className="text-sm font-bold truncate text-[#E6EDF3]">{source.name}</p>
                        <p className="text-xs text-[#8B949E] truncate">{source.filePath}</p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    {source.score && (
                        <span className="text-[10px] font-bold bg-primary/15 text-primary px-2 py-0.5 rounded-full uppercase tracking-wider">
                            Score: {source.score}
                        </span>
                    )}
                    {isExpanded ? <ChevronUp className="w-4 h-4 text-[#8B949E]" /> : <ChevronDown className="w-4 h-4 text-[#8B949E]" />}
                </div>
            </div>

            {isExpanded && (
                <div className="border-t border-[#21262D]">
                    <div className="relative group" style={{
                        background: '#0D1117',
                        borderLeft: '3px solid #2F81F7',
                    }}>
                        {/* Language tag + copy button */}
                        <div className="flex items-center justify-between px-4 py-2 border-b border-[#21262D]">
                            <span className="text-[10px] font-bold text-[#8B949E] uppercase tracking-widest">
                                {source.type || 'code'}
                            </span>
                            <button
                                onClick={handleCopy}
                                className="p-1.5 hover:bg-[#161B22] rounded-lg border border-[#21262D] transition-all opacity-0 group-hover:opacity-100"
                            >
                                {copied ? <Check className="w-3.5 h-3.5 text-[#3DDC84]" /> : <Copy className="w-3.5 h-3.5 text-[#8B949E]" />}
                            </button>
                        </div>
                        <div className="p-4">
                            <pre className="text-xs font-mono overflow-x-auto custom-scrollbar leading-relaxed text-[#E6EDF3]/80">
                                <code>{source.code}</code>
                            </pre>
                        </div>
                    </div>
                    <div className="px-4 py-3 bg-[#161B22]/30 flex items-center justify-between">
                        <span className="text-[10px] text-[#8B949E] font-medium uppercase tracking-widest">
                            Type: {source.type}
                        </span>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SourceCard;

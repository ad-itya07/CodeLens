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
        <div className="bg-secondary/30 border border-border rounded-2xl overflow-hidden transition-all duration-300 hover:border-primary/30">
            <div
                className="p-4 flex items-center justify-between cursor-pointer hover:bg-secondary/50 transition-colors"
                onClick={() => setIsExpanded(!isExpanded)}
            >
                <div className="flex items-center gap-3 min-w-0">
                    <div className="bg-primary/10 p-2 rounded-lg">
                        <Code className="w-4 h-4 text-primary" />
                    </div>
                    <div className="min-w-0">
                        <p className="text-sm font-bold truncate">{source.name}</p>
                        <p className="text-xs text-muted-foreground truncate">{source.filePath}</p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    {source.score && (
                        <span className="text-[10px] font-bold bg-primary/20 text-primary px-2 py-0.5 rounded-full uppercase tracking-wider">
                            Score: {source.score}
                        </span>
                    )}
                    {isExpanded ? <ChevronUp className="w-4 h-4 text-muted-foreground" /> : <ChevronDown className="w-4 h-4 text-muted-foreground" />}
                </div>
            </div>

            {isExpanded && (
                <div className="border-t border-border animate-in slide-in-from-top-2 duration-200">
                    <div className="bg-black/40 p-4 relative group">
                        <div className="absolute right-6 top-6 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button
                                onClick={handleCopy}
                                className="p-2 bg-secondary/80 hover:bg-secondary rounded-lg border border-border transition-all"
                            >
                                {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4 text-muted-foreground" />}
                            </button>
                        </div>
                        <pre className="text-xs font-mono overflow-x-auto custom-scrollbar leading-relaxed text-blue-100/80">
                            <code>{source.code}</code>
                        </pre>
                    </div>
                    <div className="px-4 py-3 bg-secondary/20 flex items-center justify-between">
                        <span className="text-[10px] text-muted-foreground font-medium uppercase tracking-widest">
                            Type: {source.type}
                        </span>
                        <button className="text-[10px] text-primary font-bold hover:underline flex items-center gap-1 uppercase tracking-widest">
                            View Full File <ExternalLink className="w-3 h-3" />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SourceCard;

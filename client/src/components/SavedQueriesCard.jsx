import React from 'react';
import { useProject } from '../context/ProjectContext';
import { Bookmark, ChevronRight, Clock, Search } from 'lucide-react';

const SavedQueriesCard = ({ projectId, onOpenQuery }) => {
    const { queries } = useProject();

    const savedQueries = queries.filter(q => String(q.projectId) === String(projectId));

    return (
        <div className="glass rounded-3xl p-8 space-y-6 flex flex-col h-full">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="bg-[#A371F7]/10 p-2.5 rounded-xl">
                        <Bookmark className="w-6 h-6 text-[#A371F7]" />
                    </div>
                    <h3 className="text-xl font-bold tracking-tight text-[#E6EDF3]">Saved Queries</h3>
                </div>
                <span className="text-xs font-bold text-[#8B949E] bg-[#161B22] px-3 py-1 rounded-full border border-[#21262D]">
                    {savedQueries.length} Total
                </span>
            </div>

            <div className="flex-1 overflow-y-auto custom-scrollbar space-y-3 pr-2">
                {savedQueries.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center text-center space-y-4 opacity-40 py-10">
                        <Search className="w-12 h-12 text-[#8B949E]" />
                        <p className="text-sm font-medium text-[#8B949E]">No saved queries yet.<br />Ask a question to get started.</p>
                    </div>
                ) : (
                    savedQueries.map((q) => (
                        <button
                            key={q.id}
                            onClick={() => onOpenQuery(q)}
                            className="w-full bg-[#0D1117] border border-[#21262D] p-4 rounded-2xl flex items-center justify-between group hover:border-primary/40 hover:bg-[#161B22] transition-all text-left"
                        >
                            <div className="flex-1 min-w-0 pr-4">
                                <p className="text-sm font-bold text-[#E6EDF3]/90 truncate group-hover:text-[#E6EDF3] transition-colors">
                                    {q.query}
                                </p>
                                <div className="flex items-center gap-2 mt-1">
                                    <Clock className="w-3 h-3 text-[#8B949E]" />
                                    <span className="text-[10px] font-bold text-[#8B949E] uppercase tracking-widest">
                                        {new Date(q.createdAt).toLocaleDateString()}
                                    </span>
                                </div>
                            </div>
                            <div className="bg-[#161B22] p-2 rounded-lg border border-[#21262D] group-hover:bg-primary/10 group-hover:border-primary/30 transition-all">
                                <ChevronRight className="w-4 h-4 text-[#8B949E] group-hover:text-primary" />
                            </div>
                        </button>
                    ))
                )}
            </div>

            <div className="pt-4 border-t border-[#21262D]">
                <button className="w-full py-3 text-xs font-bold text-[#8B949E] hover:text-primary transition-colors uppercase tracking-[0.2em]">
                    View All Activity
                </button>
            </div>
        </div>
    );
};

export default SavedQueriesCard;

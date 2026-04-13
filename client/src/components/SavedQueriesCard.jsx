import React from 'react';
import { useProject } from '../context/ProjectContext';
import { Bookmark, ChevronRight, Clock, Search } from 'lucide-react';

const SavedQueriesCard = ({ projectId, onOpenQuery }) => {
    const { queries } = useProject();

    const savedQueries = queries.filter(q => String(q.projectId) === String(projectId));

    return (
        <div className="bg-[#0d1526] border border-[#1e2d4d] rounded-3xl p-8 space-y-6 flex flex-col shadow-2xl h-full">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="bg-primary/20 p-2.5 rounded-xl">
                        <Bookmark className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold tracking-tight">Saved Queries</h3>
                </div>
                <span className="text-xs font-bold text-gray-500 bg-white/5 px-3 py-1 rounded-full">
                    {savedQueries.length} Total
                </span>
            </div>

            <div className="flex-1 overflow-y-auto custom-scrollbar space-y-3 pr-2">
                {savedQueries.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center text-center space-y-4 opacity-40 py-10">
                        <Search className="w-12 h-12" />
                        <p className="text-sm font-medium">No saved queries yet.<br />Ask a question to get started.</p>
                    </div>
                ) : (
                    savedQueries.map((q) => (
                        <button
                            key={q.id}
                            onClick={() => onOpenQuery(q)}
                            className="w-full bg-[#162033] border border-[#2d3d5c] p-4 rounded-2xl flex items-center justify-between group hover:border-primary/50 hover:bg-[#1c2942] transition-all text-left"
                        >
                            <div className="flex-1 min-w-0 pr-4">
                                <p className="text-sm font-bold text-gray-200 truncate group-hover:text-white transition-colors">
                                    {q.query}
                                </p>
                                <div className="flex items-center gap-2 mt-1">
                                    <Clock className="w-3 h-3 text-gray-500" />
                                    <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                                        {new Date(q.createdAt).toLocaleDateString()}
                                    </span>
                                </div>
                            </div>
                            <div className="bg-white/5 p-2 rounded-lg group-hover:bg-primary/20 transition-all">
                                <ChevronRight className="w-4 h-4 text-gray-500 group-hover:text-primary" />
                            </div>
                        </button>
                    ))
                )}
            </div>

            <div className="pt-4 border-t border-white/5">
                <button className="w-full py-3 text-xs font-bold text-gray-500 hover:text-primary transition-colors uppercase tracking-[0.2em]">
                    View All Activity
                </button>
            </div>
        </div>
    );
};

export default SavedQueriesCard;

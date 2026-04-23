import React from 'react';
import { motion } from 'framer-motion';
import { Github, Code, Zap, Search, Sparkles, Bot, FileText, Database, Layers, Cpu } from 'lucide-react';

const HowItWorks = () => {
    const steps = [
        {
            title: "Repository Cloning",
            desc: "When you add a GitHub URL, CodeLens securely clones the repository to a temporary environment. We ensure that only the necessary source files are processed, respecting your project's privacy and security.",
            icon: <Github className="w-8 h-8" />,
            color: "text-primary",
            barColor: "bg-primary",
            bg: "bg-primary/10",
            details: ["Secure SSH/HTTPS cloning", "Temporary processing environment", "Automatic cleanup"]
        },
        {
            title: "AST-Based Parsing",
            desc: "After cloning, we use Abstract Syntax Trees (AST) to parse your code. Instead of simple text splitting, we intelligently identify functions, classes, variables, and their relationships to maintain semantic context.",
            icon: <Code className="w-8 h-8" />,
            color: "text-[#3DDC84]",
            barColor: "bg-[#3DDC84]",
            bg: "bg-[#3DDC84]/10",
            details: ["Language-aware parsing", "Entity extraction", "Relationship mapping"]
        },
        {
            title: "Vector Embeddings",
            desc: "Every code entity is transformed into a high-dimensional vector embedding using the Xenova library. This allows us to represent the 'meaning' of your code in a mathematical space that AI can understand.",
            icon: <Zap className="w-8 h-8" />,
            color: "text-[#E3B341]",
            barColor: "bg-[#E3B341]",
            bg: "bg-[#E3B341]/10",
            details: ["Xenova transformers", "Semantic vector space", "Efficient indexing"]
        },
        {
            title: "Query Embedding",
            desc: "When you ask a question, we generate a vector embedding for your query using the same model. This ensures that your natural language question can be compared directly with your code's embeddings.",
            icon: <Search className="w-8 h-8" />,
            color: "text-[#A371F7]",
            barColor: "bg-[#A371F7]",
            bg: "bg-[#A371F7]/10",
            details: ["Real-time query processing", "Semantic matching", "Multi-language support"]
        },
        {
            title: "Relevancy Scoring",
            desc: "We use a sophisticated scoring system to calculate the similarity between your query and the code entities. We rank the results to find the most relevant snippets that could answer your question.",
            icon: <Sparkles className="w-8 h-8" />,
            color: "text-[#F778BA]",
            barColor: "bg-[#F778BA]",
            bg: "bg-[#F778BA]/10",
            details: ["Cosine similarity", "Contextual ranking", "Top-K retrieval"]
        },
        {
            title: "Context Creation",
            desc: "The top 3-7 most relevant code entities are selected and formatted into a concise context block. This ensures the LLM has exactly the information it needs without being overwhelmed by irrelevant code.",
            icon: <Layers className="w-8 h-8" />,
            color: "text-[#FFA657]",
            barColor: "bg-[#FFA657]",
            bg: "bg-[#FFA657]/10",
            details: ["Dynamic context window", "Snippet formatting", "Token optimization"]
        },
        {
            title: "AI Explanation",
            desc: "Finally, the context and your query are passed to a Large Language Model (LLM). The AI uses the provided code snippets to generate a clean, accurate, and easy-to-understand explanation.",
            icon: <Bot className="w-8 h-8" />,
            color: "text-[#79C0FF]",
            barColor: "bg-[#79C0FF]",
            bg: "bg-[#79C0FF]/10",
            details: ["Context-aware generation", "Markdown formatting", "Source referencing"]
        }
    ];

    return (
        <div className="p-8 max-w-7xl mx-auto w-full space-y-12 overflow-y-auto h-full custom-scrollbar">
            <div className="space-y-4 text-center max-w-3xl mx-auto">
                <motion.h1
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-4xl md:text-5xl font-black tracking-tight text-[#E6EDF3]"
                >
                    How <span className="text-primary">CodeLens</span> Works
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-[#8B949E] text-lg"
                >
                    A deep dive into the technical pipeline that transforms raw code into intelligent insights.
                </motion.p>
            </div>

            <div className="grid grid-cols-1 gap-12 relative">
                {/* Vertical Line */}
                <div className="absolute left-1/2 top-0 bottom-0 w-px hidden lg:block" style={{
                    background: 'linear-gradient(180deg, transparent, #21262D, transparent)'
                }} />

                {steps.map((step, i) => (
                    <motion.div
                        key={i}
                        initial="initial"
                        whileHover="hover"
                        viewport={{ once: true, margin: "-100px" }}
                        className={`flex flex-col lg:flex-row items-center gap-8 ${i % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}
                    >
                        {/* Content */}
                        <motion.div
                            initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className={`flex-1 space-y-6 ${i % 2 === 0 ? 'lg:text-right' : 'lg:text-left'}`}
                        >
                            <div className={`inline-flex items-center justify-center p-4 rounded-3xl ${step.bg} ${step.color}`}>
                                {step.icon}
                            </div>
                            <div className="space-y-2">
                                <h3 className="text-2xl font-bold tracking-tight text-[#E6EDF3]">{step.title}</h3>
                                <p className="text-[#8B949E] leading-relaxed">
                                    {step.desc}
                                </p>
                            </div>
                            <div className={`flex flex-wrap gap-2 ${i % 2 === 0 ? 'lg:justify-end' : 'lg:justify-start'}`}>
                                {step.details.map((detail, idx) => (
                                    <span key={idx} className="px-3 py-1 bg-[#161B22] border border-[#21262D] rounded-full text-[10px] font-bold uppercase tracking-widest text-[#8B949E]">
                                        {detail}
                                    </span>
                                ))}
                            </div>
                        </motion.div>

                        {/* Center Point */}
                        <div className="relative z-10 hidden lg:flex items-center justify-center w-12 h-12 rounded-full border-4 border-[#21262D]" style={{ background: '#080C10' }}>
                            <div className={`w-3 h-3 rounded-full ${step.color.replace('text-', 'bg-').replace('[', '[').replace(']', ']')}`} />
                        </div>

                        {/* Visual/Illustration Placeholder */}
                        <div className="flex-1 w-full aspect-video glass rounded-[2.5rem] overflow-hidden relative group">
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className={`p-8 rounded-full ${step.bg} opacity-20 group-hover:scale-110 transition-transform duration-500`}>
                                    {React.cloneElement(step.icon, { className: "w-24 h-24" })}
                                </div>
                            </div>
                            <div className="absolute bottom-6 left-6 right-6">
                                <div className="h-1 w-full bg-[#161B22] rounded-full overflow-hidden">
                                    <motion.div
                                        variants={{
                                            initial: { width: 0 },
                                            hover: { width: "100%" }
                                        }}
                                        transition={{ duration: 1, ease: "easeInOut" }}
                                        className={`h-full ${step.barColor}`}
                                    />
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Technical Stack */}
            <div className="pt-20 space-y-12">
                <div className="text-center space-y-4">
                    <h2 className="text-3xl font-bold tracking-tight text-[#E6EDF3]">The Tech Stack</h2>
                    <p className="text-[#8B949E]">Built with modern, high-performance technologies.</p>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {[
                        { name: "Prisma", icon: <Database className="w-6 h-6" />, desc: "Type-safe ORM" },
                        { name: "Xenova", icon: <Cpu className="w-6 h-6" />, desc: "Client-side ML" },
                        { name: "Framer Motion", icon: <Zap className="w-6 h-6" />, desc: "Fluid animations" },
                        { name: "Lucide", icon: <Sparkles className="w-6 h-6" />, desc: "Beautiful icons" }
                    ].map((tech) => (
                        <div key={tech.name} className="p-6 glass rounded-3xl text-center space-y-3 hover:border-primary/30 transition-all">
                            <div className="mx-auto w-12 h-12 bg-[#161B22] rounded-2xl flex items-center justify-center text-primary">
                                {tech.icon}
                            </div>
                            <div>
                                <h4 className="font-bold text-[#E6EDF3]">{tech.name}</h4>
                                <p className="text-xs text-[#8B949E]">{tech.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default HowItWorks;

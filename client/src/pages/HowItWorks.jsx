import React from 'react';
import { motion } from 'framer-motion';
import { Github, Code, Zap, Search, Sparkles, Bot, FileText, Database, Layers, Cpu } from 'lucide-react';

const HowItWorks = () => {
    const steps = [
        {
            title: "Repository Cloning",
            desc: "When you add a GitHub URL, CodeLens securely clones the repository to a temporary environment. We ensure that only the necessary source files are processed, respecting your project's privacy and security.",
            icon: <Github className="w-8 h-8" />,
            color: "text-blue-500",
            bg: "bg-blue-500/10",
            details: ["Secure SSH/HTTPS cloning", "Temporary processing environment", "Automatic cleanup"]
        },
        {
            title: "AST-Based Parsing",
            desc: "After cloning, we use Abstract Syntax Trees (AST) to parse your code. Instead of simple text splitting, we intelligently identify functions, classes, variables, and their relationships to maintain semantic context.",
            icon: <Code className="w-8 h-8" />,
            color: "text-green-500",
            bg: "bg-green-500/10",
            details: ["Language-aware parsing", "Entity extraction", "Relationship mapping"]
        },
        {
            title: "Vector Embeddings",
            desc: "Every code entity is transformed into a high-dimensional vector embedding using the Xenova library. This allows us to represent the 'meaning' of your code in a mathematical space that AI can understand.",
            icon: <Zap className="w-8 h-8" />,
            color: "text-yellow-500",
            bg: "bg-yellow-500/10",
            details: ["Xenova transformers", "Semantic vector space", "Efficient indexing"]
        },
        {
            title: "Query Embedding",
            desc: "When you ask a question, we generate a vector embedding for your query using the same model. This ensures that your natural language question can be compared directly with your code's embeddings.",
            icon: <Search className="w-8 h-8" />,
            color: "text-purple-500",
            bg: "bg-purple-500/10",
            details: ["Real-time query processing", "Semantic matching", "Multi-language support"]
        },
        {
            title: "Relevancy Scoring",
            desc: "We use a sophisticated scoring system to calculate the similarity between your query and the code entities. We rank the results to find the most relevant snippets that could answer your question.",
            icon: <Sparkles className="w-8 h-8" />,
            color: "text-pink-500",
            bg: "bg-pink-500/10",
            details: ["Cosine similarity", "Contextual ranking", "Top-K retrieval"]
        },
        {
            title: "Context Creation",
            desc: "The top 3-7 most relevant code entities are selected and formatted into a concise context block. This ensures the LLM has exactly the information it needs without being overwhelmed by irrelevant code.",
            icon: <Layers className="w-8 h-8" />,
            color: "text-orange-500",
            bg: "bg-orange-500/10",
            details: ["Dynamic context window", "Snippet formatting", "Token optimization"]
        },
        {
            title: "AI Explanation",
            desc: "Finally, the context and your query are passed to a Large Language Model (LLM). The AI uses the provided code snippets to generate a clean, accurate, and easy-to-understand explanation.",
            icon: <Bot className="w-8 h-8" />,
            color: "text-cyan-500",
            bg: "bg-cyan-500/10",
            details: ["Context-aware generation", "Markdown formatting", "Source referencing"]
        }
    ];

    return (
        <div className="p-8 max-w-7xl mx-auto w-full space-y-12 overflow-y-auto h-full custom-scrollbar">
            <div className="space-y-4 text-center max-w-3xl mx-auto">
                <motion.h1
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-4xl md:text-5xl font-black tracking-tight"
                >
                    How <span className="text-primary">CodeLens</span> Works
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-muted-foreground text-lg"
                >
                    A deep dive into the technical pipeline that transforms raw code into intelligent insights.
                </motion.p>
            </div>

            <div className="grid grid-cols-1 gap-12 relative">
                {/* Vertical Line */}
                <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-border to-transparent hidden lg:block" />

                {steps.map((step, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        className={`flex flex-col lg:flex-row items-center gap-8 ${i % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}
                    >
                        {/* Content */}
                        <div className={`flex-1 space-y-6 ${i % 2 === 0 ? 'lg:text-right' : 'lg:text-left'}`}>
                            <div className={`inline-flex items-center justify-center p-4 rounded-3xl ${step.bg} ${step.color} shadow-lg shadow-current/5`}>
                                {step.icon}
                            </div>
                            <div className="space-y-2">
                                <h3 className="text-2xl font-bold tracking-tight">{step.title}</h3>
                                <p className="text-muted-foreground leading-relaxed">
                                    {step.desc}
                                </p>
                            </div>
                            <div className={`flex flex-wrap gap-2 ${i % 2 === 0 ? 'lg:justify-end' : 'lg:justify-start'}`}>
                                {step.details.map((detail, idx) => (
                                    <span key={idx} className="px-3 py-1 bg-secondary/50 border border-border rounded-full text-[10px] font-bold uppercase tracking-widest text-gray-400">
                                        {detail}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Center Point */}
                        <div className="relative z-10 hidden lg:flex items-center justify-center w-12 h-12 rounded-full bg-background border-4 border-border">
                            <div className={`w-3 h-3 rounded-full ${step.color.replace('text-', 'bg-')}`} />
                        </div>

                        {/* Visual/Illustration Placeholder */}
                        <div className="flex-1 w-full aspect-video bg-card border border-border rounded-[2.5rem] overflow-hidden relative group">
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className={`p-8 rounded-full ${step.bg} opacity-20 group-hover:scale-110 transition-transform duration-500`}>
                                    {React.cloneElement(step.icon, { className: "w-24 h-24" })}
                                </div>
                            </div>
                            <div className="absolute bottom-6 left-6 right-6">
                                <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        whileInView={{ width: "100%" }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 1, delay: 0.5 }}
                                        className={`h-full ${step.color.replace('text-', 'bg-')}`}
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
                    <h2 className="text-3xl font-bold tracking-tight">The Tech Stack</h2>
                    <p className="text-muted-foreground">Built with modern, high-performance technologies.</p>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {[
                        { name: "Prisma", icon: <Database className="w-6 h-6" />, desc: "Type-safe ORM" },
                        { name: "Xenova", icon: <Cpu className="w-6 h-6" />, desc: "Client-side ML" },
                        { name: "Framer Motion", icon: <Zap className="w-6 h-6" />, desc: "Fluid animations" },
                        { name: "Lucide", icon: <Sparkles className="w-6 h-6" />, desc: "Beautiful icons" }
                    ].map((tech) => (
                        <div key={tech.name} className="p-6 bg-card border border-border rounded-3xl text-center space-y-3 hover:border-primary/30 transition-all">
                            <div className="mx-auto w-12 h-12 bg-secondary rounded-2xl flex items-center justify-center text-primary">
                                {tech.icon}
                            </div>
                            <div>
                                <h4 className="font-bold">{tech.name}</h4>
                                <p className="text-xs text-muted-foreground">{tech.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default HowItWorks;

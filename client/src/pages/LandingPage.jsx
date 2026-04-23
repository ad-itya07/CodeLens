import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Github, Sparkles, Code, MessageSquare, Bookmark, ArrowRight, Zap, Shield, Globe, Bot, Search } from 'lucide-react';
import { AnimatePresence } from 'framer-motion';
import image1 from '../assets/image1.webp';
import image2 from '../assets/image2.webp';
import image3 from '../assets/image3.webp';
import image4 from '../assets/image4.webp';

const LandingPage = () => {
    const [activeSlide, setActiveSlide] = React.useState(0);
    const slides = [image1, image2, image4, image3];

    React.useEffect(() => {
        const timer = setInterval(() => {
            setActiveSlide((prev) => (prev + 1) % slides.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="min-h-screen text-[#E6EDF3] overflow-x-hidden selection:bg-primary/30 selection:text-primary" style={{ background: '#080C10' }}>
            {/* Navigation */}
            <nav className="fixed top-0 w-full z-50 backdrop-blur-xl border-b border-[#21262D]/50" style={{ background: 'rgba(8,12,16,0.8)' }}>
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                    <div className="flex items-center gap-2 group cursor-pointer">
                        <div className="bg-primary p-2 rounded-xl shadow-lg shadow-primary/20 group-hover:scale-110 transition-transform">
                            <Code className="w-6 h-6 text-white" />
                        </div>
                        <span className="text-xl font-bold tracking-tighter">CodeLens</span>
                    </div>
                    <div className="hidden md:flex items-center gap-8 text-sm font-medium text-[#8B949E]">
                        <a href="#features" className="hover:text-primary transition-colors">Features</a>
                        <a href="#how-it-works" className="hover:text-primary transition-colors">How it Works</a>
                    </div>
                    <div className="flex items-center gap-4">
                        <Link to="/login" className="text-sm font-bold text-[#8B949E] hover:text-[#E6EDF3] transition-colors">Login</Link>
                        <Link
                            to="/register"
                            className="gradient-btn text-white px-6 py-2.5 rounded-xl font-bold text-sm transition-all"
                        >
                            Get Started
                        </Link>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="relative pt-40 pb-20 px-6 overflow-hidden">
                {/* Background Glows */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] blur-[120px] rounded-full -z-10 opacity-40" style={{ background: 'rgba(47,129,247,0.1)' }} />
                <div className="absolute top-40 -left-20 w-[400px] h-[400px] blur-[100px] rounded-full -z-10 opacity-20" style={{ background: 'rgba(163,113,247,0.1)' }} />

                <div className="max-w-7xl mx-auto text-center space-y-8 relative">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="inline-flex items-center gap-2 px-4 py-2 border rounded-full text-xs font-bold text-primary uppercase tracking-widest"
                        style={{ background: 'rgba(47,129,247,0.05)', borderColor: 'rgba(47,129,247,0.15)' }}
                    >
                        <Sparkles className="w-4 h-4" />
                        AI-Powered Codebase Intelligence
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[1.1]"
                    >
                        Understand your <br />
                        <span className="text-transparent bg-clip-text" style={{
                            backgroundImage: 'linear-gradient(135deg, #2F81F7, #A371F7, #2F81F7)',
                            backgroundSize: '200% auto',
                        }}>JS/TS codebase</span> in seconds.
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="max-w-2xl mx-auto text-lg md:text-xl text-[#8B949E] leading-relaxed"
                    >
                        CodeLens indexes your GitHub repositories and provides instant, AI-driven insights. Ask questions, explore logic, and save your analysis effortlessly.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
                    >
                        <Link
                            to="/register"
                            className="w-full sm:w-auto gradient-btn text-white px-10 py-4 rounded-2xl font-black text-lg hover:scale-105 transition-all flex items-center justify-center gap-2"
                        >
                            Start Indexing Now
                            <ArrowRight className="w-5 h-5" />
                        </Link>
                        <a
                            href="#features"
                            className="w-full sm:w-auto px-10 py-4 rounded-2xl font-bold text-lg border border-[#21262D] hover:bg-[#161B22] transition-all flex items-center justify-center gap-2"
                        >
                            View Features
                        </a>
                    </motion.div>

                    {/* App Preview Carousel */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.5 }}
                        className="pt-20 relative"
                    >
                        <div className="relative mx-auto max-w-5xl group">
                            <div className="absolute -inset-1 rounded-[2.5rem] blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200" style={{
                                background: 'linear-gradient(135deg, #2F81F7, #A371F7)'
                            }}></div>
                            <div className="relative bg-[#0D1117] border border-[#21262D] rounded-[2rem] overflow-hidden shadow-2xl aspect-video">
                                <AnimatePresence mode="wait">
                                    <motion.img
                                        key={activeSlide}
                                        src={slides[activeSlide]}
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 1.05 }}
                                        transition={{ duration: 0.5 }}
                                        className="w-full h-full object-contain"
                                        style={{ background: '#080C10' }}
                                        alt={`App Preview ${activeSlide + 1}`}
                                    />
                                </AnimatePresence>

                                {/* Carousel Indicators */}
                                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
                                    {slides.map((_, i) => (
                                        <button
                                            key={i}
                                            onClick={() => setActiveSlide(i)}
                                            className={`w-2 h-2 rounded-full transition-all ${activeSlide === i ? 'w-8 bg-primary' : 'bg-[#30363D] hover:bg-[#8B949E]'
                                                }`}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Features Section */}
            <section id="features" className="py-32 px-6 relative">
                <div className="max-w-7xl mx-auto space-y-20">
                    <div className="text-center space-y-4">
                        <h2 className="text-4xl md:text-5xl font-black tracking-tight">Supercharge your workflow.</h2>
                        <p className="text-[#8B949E] max-w-xl mx-auto">Everything you need to master complex codebases without the headache.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                icon: <Zap className="w-8 h-8 text-primary" />,
                                title: "Instant Indexing",
                                desc: "Connect your GitHub repo and let our system parse and embed your entire codebase in minutes."
                            },
                            {
                                icon: <MessageSquare className="w-8 h-8 text-[#79C0FF]" />,
                                title: "Natural Language Queries",
                                desc: "Ask questions like \"How does the auth flow work?\" and get precise, context-aware answers."
                            },
                            {
                                icon: <Bookmark className="w-8 h-8 text-[#A371F7]" />,
                                title: "Saved Analysis",
                                desc: "Save important insights and revisit them anytime with our structured history system."
                            },
                            {
                                icon: <Code className="w-8 h-8 text-[#3DDC84]" />,
                                title: "Source Referencing",
                                desc: "Every answer comes with direct links to the relevant code snippets for full transparency."
                            },
                            {
                                icon: <Shield className="w-8 h-8 text-[#F85149]" />,
                                title: "Secure & Private",
                                desc: "Your code is indexed securely. We prioritize your privacy and data integrity."
                            },
                            {
                                icon: <Globe className="w-8 h-8 text-[#E3B341]" />,
                                title: "Global Search",
                                desc: "Search across all your indexed projects from a single, unified dashboard."
                            }
                        ].map((feature, i) => (
                            <motion.div
                                key={i}
                                whileHover={{ y: -8 }}
                                className="p-8 glass shimmer-hover rounded-[2rem] space-y-4 hover:border-primary/30 transition-all group"
                            >
                                <div className="bg-[#161B22] w-16 h-16 rounded-2xl flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                                    {feature.icon}
                                </div>
                                <h3 className="text-xl font-bold">{feature.title}</h3>
                                <p className="text-[#8B949E] leading-relaxed text-sm">{feature.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* How it Works Section */}
            <section id="how-it-works" className="py-32 px-6 relative overflow-hidden">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] blur-[120px] rounded-full -z-10 opacity-30" style={{ background: 'rgba(47,129,247,0.05)' }} />

                <div className="max-w-7xl mx-auto space-y-20">
                    <div className="text-center space-y-4">
                        <h2 className="text-4xl md:text-5xl font-black tracking-tight">How it Works</h2>
                        <p className="text-[#8B949E] max-w-2xl mx-auto">A deep dive into the technical pipeline that powers CodeLens intelligence.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 relative">
                        <div className="hidden lg:block absolute top-1/2 left-0 w-full h-px -translate-y-1/2 -z-10" style={{
                            background: 'linear-gradient(90deg, transparent, rgba(33,38,45,0.5), transparent)'
                        }} />

                        {[
                            { step: "01", title: "Clone & Queue", desc: "We securely clone your repository and queue it for background processing.", icon: <Github className="w-6 h-6" /> },
                            { step: "02", title: "AST Parsing", desc: "Our engine uses Abstract Syntax Trees to intelligently chunk code into functions, classes, and variables.", icon: <Code className="w-6 h-6" /> },
                            { step: "03", title: "Vector Embeddings", desc: "Using Xenova, we generate high-dimensional vector embeddings for every code entity.", icon: <Zap className="w-6 h-6" /> },
                            { step: "04", title: "Query Mapping", desc: "When you ask a question, we embed your query and map it against our indexed code entities.", icon: <Search className="w-6 h-6" /> },
                            { step: "05", title: "Relevancy Scoring", desc: "Our scoring system identifies the top 3-7 most relevant entities for your specific query.", icon: <Sparkles className="w-6 h-6" /> },
                            { step: "06", title: "LLM Explanation", desc: "The selected context is passed to an LLM to provide a precise, context-aware explanation.", icon: <Bot className="w-6 h-6" /> }
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="relative p-8 glass shimmer-hover rounded-[2.5rem] space-y-6 group hover:border-primary/30 transition-all"
                            >
                                <div className="absolute -top-4 -right-4 w-12 h-12 border border-[#21262D] rounded-2xl flex items-center justify-center text-primary font-black text-sm shadow-xl" style={{ background: '#080C10' }}>
                                    {item.step}
                                </div>
                                <div className="bg-[#161B22] w-14 h-14 rounded-2xl flex items-center justify-center group-hover:bg-primary/10 transition-colors text-primary">
                                    {item.icon}
                                </div>
                                <div className="space-y-2">
                                    <h3 className="text-xl font-bold">{item.title}</h3>
                                    <p className="text-[#8B949E] text-sm leading-relaxed">{item.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-32 px-6">
                <div className="max-w-5xl mx-auto rounded-[3rem] p-12 md:p-20 text-center space-y-8 relative overflow-hidden shadow-2xl" style={{
                    background: 'linear-gradient(135deg, #2F81F7, #A371F7)',
                    boxShadow: '0 0 60px rgba(47,129,247,0.2)'
                }}>
                    <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 pointer-events-none" />
                    <h2 className="text-4xl md:text-6xl font-black text-white tracking-tight">Ready to see clearly?</h2>
                    <p className="text-white/70 text-lg md:text-xl max-w-xl mx-auto font-medium">
                        Join hundreds of developers who are saving hours every week with CodeLens.
                    </p>
                    <div className="pt-4">
                        <Link
                            to="/register"
                            className="bg-[#080C10] text-[#E6EDF3] px-12 py-5 rounded-2xl font-black text-xl hover:scale-105 transition-all shadow-2xl inline-block"
                        >
                            Get Started for Free
                        </Link>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-20 px-6 border-t border-[#21262D]">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
                    <div className="flex items-center gap-2">
                        <div className="bg-primary p-1.5 rounded-lg">
                            <Code className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-lg font-bold tracking-tighter">CodeLens</span>
                    </div>
                    <p className="text-[#8B949E] text-sm">© 2026 CodeLens AI. All rights reserved.</p>
                    <div className="flex items-center gap-6">
                        <a href="https://github.com/ad-itya07/CodeLens" target="_blank" rel="noopener noreferrer" className="text-[#8B949E] hover:text-[#E6EDF3] transition-colors"><Github className="w-5 h-5" /></a>
                        <a href="#" className="text-[#8B949E] hover:text-[#E6EDF3] text-sm font-medium transition-colors">Privacy</a>
                        <a href="#" className="text-[#8B949E] hover:text-[#E6EDF3] text-sm font-medium transition-colors">Terms</a>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;

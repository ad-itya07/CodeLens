import React from 'react';
import { motion as Motion } from 'framer-motion';
import {
    Network,
    GitFork,
    ExternalLink,
    Code2,
    Boxes,
    Share2,
    Activity,
    FileCode,
    Cpu,
    ArrowRight,
    CheckCircle2,
    GitGraph,
    FolderTree,
    Workflow,
    ShieldAlert,
    Gauge,
    Link2,
    Terminal,
    GitBranch,
    Binary
} from 'lucide-react';
import { fadeInUp } from '../lib/animations';

const CodeGraph = () => {
    // Model Entities
    const modeledEntities = [
        {
            name: "Files",
            icon: <FileCode className="w-5 h-5" />,
            desc: "Physical file hierarchy, file paths, and module entrypoints across the repository."
        },
        {
            name: "Code Entities",
            icon: <Code2 className="w-5 h-5" />,
            desc: "Functions, methods, classes, interfaces, types, and exported top-level declarations."
        },
        {
            name: "Dependencies",
            icon: <GitFork className="w-5 h-5" />,
            desc: "Internal cross-module dependencies and external third-party package references."
        },
        {
            name: "Modules",
            icon: <Boxes className="w-5 h-5" />,
            desc: "Logical directory boundaries, packages, and domain component partitions."
        }
    ];

    // Model Relationships
    const relationships = [
        { name: "Imports", desc: "Module dependency wiring", badge: "Static / Dynamic" },
        { name: "Exports", desc: "Public API declarations", badge: "Named / Default" },
        { name: "Calls", desc: "Function & method invocations", badge: "Call Graph" },
        { name: "Extends", desc: "Class & interface inheritance", badge: "OOP Hierarchy" },
        { name: "Implements", desc: "Interface contract realization", badge: "Type System" },
        { name: "Instantiates", desc: "Constructor & instance creation", badge: "Runtime Binding" },
        { name: "References", desc: "Identifier usage across scopes", badge: "Cross-Reference" }
    ];

    // Pipeline Steps
    const pipelineSteps = [
        {
            step: "01",
            title: "Clone Repository",
            desc: "Fetches the latest repository snapshot into an isolated, ephemeral workspace.",
            icon: <GitBranch className="w-4 h-4 text-primary" />
        },
        {
            step: "02",
            title: "Metadata & Package Config",
            desc: "Inspects package.json, workspace configs, manifests, and project dependency trees.",
            icon: <Terminal className="w-4 h-4 text-[#3DDC84]" />
        },
        {
            step: "03",
            title: "Path Configuration",
            desc: "Resolves module aliases, tsconfig paths, base URLs, and directory mappings.",
            icon: <FolderTree className="w-4 h-4 text-[#E3B341]" />
        },
        {
            step: "04",
            title: "Code Entity Extraction",
            desc: "Traverses Babel ASTs to discover functions, classes, interfaces, and variables.",
            icon: <Code2 className="w-4 h-4 text-[#A371F7]" />
        },
        {
            step: "05",
            title: "Relationship Resolution",
            desc: "Resolves cross-file calls, imports, extensions, references, and type connections.",
            icon: <Workflow className="w-4 h-4 text-[#F778BA]" />
        },
        {
            step: "06",
            title: "Graph Construction",
            desc: "Assembles canonical directed graph of nodes and typed relationship edges.",
            icon: <GitGraph className="w-4 h-4 text-[#FFA657]" />
        },
        {
            step: "07",
            title: "Repository Ready",
            desc: "Stores graph topology in PostgreSQL and exposes deep architectural analytics.",
            icon: <CheckCircle2 className="w-4 h-4 text-[#3DDC84]" />
        }
    ];

    // Analytics Capabilities
    const analyticsCapabilities = [
        {
            title: "Cycle Detection",
            desc: "Identifies circular import loops and circular dependency chains across modules that can cause runtime bugs or tight coupling.",
            tag: "Topology"
        },
        {
            title: "Dependency Analysis",
            desc: "Maps direct, indirect, and transitive dependencies between files, directories, and external packages with full depth tracing.",
            tag: "Dependencies"
        },
        {
            title: "Impact Analysis",
            desc: "Calculates the blast radius of changes to a specific code entity by traversing all downstream consumers and dependents.",
            tag: "Refactoring"
        },
        {
            title: "Dependency Ordering",
            desc: "Computes deterministic topological build and execution orderings based on directed acyclic graph traversals.",
            tag: "Build Graph"
        },
        {
            title: "Connectivity Analysis",
            desc: "Measures graph connectivity density, identifies isolated clusters, unreachable dead code, and high-centrality hubs.",
            tag: "Structural"
        },
        {
            title: "Call-Path Analysis",
            desc: "Traces exact invocation flows and execution paths from public API entrypoints down to low-level internal utility functions.",
            tag: "Call Graph"
        },
        {
            title: "Fan-In / Fan-Out Analysis",
            desc: "Evaluates architectural modularity by quantifying incoming callers (fan-in) versus outgoing dependencies (fan-out) per entity.",
            tag: "Modularity"
        },
        {
            title: "Repository Health Index",
            desc: "Synthesizes multi-factor graph structural signals into a normalized health score highlighting architectural risk areas.",
            tag: "Metrics"
        }
    ];

    // Health Index Signals
    const healthSignals = [
        { name: "Cycles", metric: "Circular loop count & recursion depth", color: "text-[#F85149]" },
        { name: "Coupling", metric: "Afferent vs efferent dependency ratio", color: "text-[#FFA657]" },
        { name: "Fan-In", metric: "Incoming dependency pressure on core entities", color: "text-[#3DDC84]" },
        { name: "Fan-Out", metric: "Outgoing dependency sprawl & complexity", color: "text-[#E3B341]" },
        { name: "Dependencies", metric: "External package reliance & surface area", color: "text-[#A371F7]" },
        { name: "Module Structure", metric: "Directory cohesion & architectural isolation", color: "text-primary" }
    ];

    // Comparison Rows
    const comparisonData = [
        {
            aspect: "Primary Focus",
            codelens: "Semantic code understanding & natural language QA",
            codegraph: "Structural code understanding & topological analysis"
        },
        {
            aspect: "Core Mechanism",
            codelens: "Vector embeddings, cosine similarity & LLM RAG",
            codegraph: "Babel AST parsing, symbol binding & graph traversal"
        },
        {
            aspect: "Query Model",
            codelens: "Natural language questions and semantic intent",
            codegraph: "Deterministic graph queries, paths, cycles & metrics"
        },
        {
            aspect: "Output Type",
            codelens: "RAG-powered conversational explanations with cited sources",
            codegraph: "Static repository insights, dependency maps & health scores"
        },
        {
            aspect: "Core Value",
            codelens: "Finds and explains relevant code logic across the repo",
            codegraph: "Maps how code connects, depends, and architecturally scales"
        }
    ];

    // Tech Stack
    const techStack = [
        { name: "TypeScript", role: "Type-safe domain modeling & graph structures", badge: "Language" },
        { name: "Babel", role: "AST parsing & JS/TS syntax extraction", badge: "Parser" },
        { name: "PostgreSQL", role: "Relational persistence for graph nodes & edges", badge: "Storage" },
        { name: "Redis", role: "Fast in-memory caching & state store", badge: "Cache" },
        { name: "BullMQ", role: "Asynchronous distributed job queue processing", badge: "Queue" }
    ];

    return (
        <div className="p-6 md:p-8 max-w-7xl mx-auto w-full space-y-12 overflow-y-auto h-full custom-scrollbar">
            {/* Header Section */}
            <Motion.div
                initial="initial"
                animate="animate"
                variants={fadeInUp}
                className="space-y-6"
            >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#21262D]">
                    <div className="space-y-2">
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#161B22] border border-[#21262D] rounded-full text-xs font-mono text-primary">
                            <Network className="w-3.5 h-3.5" />
                            <span>Static Code Intelligence Platform</span>
                        </div>
                        <h1 className="text-3xl md:text-4xl font-black tracking-tight text-[#E6EDF3] flex items-center gap-3">
                            CodeGraph
                        </h1>
                        <p className="text-[#8B949E] text-base md:text-lg max-w-3xl leading-relaxed">
                            CodeGraph analyzes JavaScript and TypeScript repositories by transforming source code into a structured code graph, enabling developers to understand code relationships, dependencies, architecture, and structural health.
                        </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
                        <a
                            href="https://codegraph-client.vercel.app/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="gradient-btn text-white px-5 py-2.5 rounded-xl font-semibold text-sm inline-flex items-center gap-2 transition-all hover:scale-[1.02]"
                        >
                            <span>Open CodeGraph</span>
                            <ExternalLink className="w-4 h-4" />
                        </a>
                        <a
                            href="https://github.com/ad-itya07/CodeGraph"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-4 py-2.5 bg-[#161B22] border border-[#21262D] hover:border-[#30363D] hover:bg-[#21262D]/50 text-[#E6EDF3] rounded-xl font-medium text-sm inline-flex items-center gap-2 transition-all"
                        >
                            <span>GitHub</span>
                            <ExternalLink className="w-3.5 h-3.5 text-[#8B949E]" />
                        </a>
                        <a
                            href="https://codegraph-client.vercel.app/docs"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-4 py-2.5 bg-[#161B22] border border-[#21262D] hover:border-[#30363D] hover:bg-[#21262D]/50 text-[#E6EDF3] rounded-xl font-medium text-sm inline-flex items-center gap-2 transition-all"
                        >
                            <span>Documentation</span>
                            <ExternalLink className="w-3.5 h-3.5 text-[#8B949E]" />
                        </a>
                    </div>
                </div>
            </Motion.div>

            {/* Core Concept Section */}
            <Motion.section
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="space-y-6"
            >
                <div className="space-y-1">
                    <h2 className="text-xl md:text-2xl font-bold tracking-tight text-[#E6EDF3] flex items-center gap-2">
                        <Share2 className="w-5 h-5 text-primary" />
                        Core Concept & Mental Model
                    </h2>
                    <p className="text-[#8B949E] text-sm">
                        How CodeGraph abstracts source code into a canonical directed graph.
                    </p>
                </div>

                {/* Conceptual Flow Diagram */}
                <div className="glass p-6 rounded-2xl border border-[#21262D] space-y-4">
                    <p className="text-xs font-semibold text-[#8B949E] uppercase tracking-wider">
                        Conceptual Transformation Flow
                    </p>
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                        {[
                            { label: "Repository", sub: "Raw Source Code" },
                            { label: "Babel AST", sub: "Syntax Parse Trees" },
                            { label: "Code Entities + Relationships", sub: "Extracted Declarations" },
                            { label: "Canonical Code Graph", sub: "Directed Topology" },
                            { label: "Graph Analytics", sub: "Algorithms & Metrics" },
                            { label: "Repository Insights", sub: "Health & Architecture" }
                        ].map((node, idx) => (
                            <div key={node.label} className="relative flex flex-col justify-between p-3.5 bg-[#0D1117] border border-[#21262D] rounded-xl space-y-2 group hover:border-primary/40 transition-colors">
                                <div className="flex items-center justify-between">
                                    <span className="text-[10px] font-mono font-bold text-primary">0{idx + 1}</span>
                                    {idx < 5 && (
                                        <ArrowRight className="w-3 h-3 text-[#8B949E] hidden lg:block absolute -right-2.5 top-1/2 -translate-y-1/2 z-10" />
                                    )}
                                </div>
                                <div>
                                    <h4 className="text-xs font-bold text-[#E6EDF3] leading-snug">{node.label}</h4>
                                    <p className="text-[10px] text-[#8B949E] mt-0.5">{node.sub}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Modeled Entities & Relationships Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    {/* Modeled Units */}
                    <div className="lg:col-span-5 space-y-3">
                        <h3 className="text-sm font-semibold text-[#E6EDF3] flex items-center gap-2">
                            <Boxes className="w-4 h-4 text-primary" />
                            Modeled Repository Units
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {modeEntitiesCard(modeledEntities)}
                        </div>
                    </div>

                    {/* Modeled Relationships */}
                    <div className="lg:col-span-7 space-y-3">
                        <h3 className="text-sm font-semibold text-[#E6EDF3] flex items-center gap-2">
                            <Link2 className="w-4 h-4 text-[#3DDC84]" />
                            Resolved Entity Relationships
                        </h3>
                        <div className="glass p-4 rounded-2xl border border-[#21262D] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-2.5">
                            {relationships.map((rel) => (
                                <div key={rel.name} className="p-3 bg-[#0D1117] border border-[#21262D]/70 rounded-xl space-y-1">
                                    <div className="flex items-center justify-between">
                                        <span className="text-xs font-mono font-bold text-[#E6EDF3]">{rel.name}</span>
                                        <span className="text-[9px] font-mono px-1.5 py-0.5 bg-[#161B22] text-[#8B949E] rounded">
                                            {rel.badge}
                                        </span>
                                    </div>
                                    <p className="text-[11px] text-[#8B949E]">{rel.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </Motion.section>

            {/* Analysis Pipeline Section */}
            <Motion.section
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="space-y-6"
            >
                <div className="space-y-1">
                    <h2 className="text-xl md:text-2xl font-bold tracking-tight text-[#E6EDF3] flex items-center gap-2">
                        <Workflow className="w-5 h-5 text-[#3DDC84]" />
                        Analysis Pipeline
                    </h2>
                    <p className="text-[#8B949E] text-sm">
                        The 7-stage deterministic extraction and relationship resolution pipeline.
                    </p>
                </div>

                <div className="glass p-6 rounded-2xl border border-[#21262D]">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-4 relative">
                        {pipelineSteps.map((step) => (
                            <div key={step.step} className="relative flex flex-col justify-between p-4 bg-[#0D1117] border border-[#21262D] rounded-xl space-y-3 group hover:border-[#30363D] transition-colors">
                                <div className="flex items-center justify-between">
                                    <span className="text-xs font-mono font-semibold text-[#8B949E]">{step.step}</span>
                                    <div className="p-1.5 bg-[#161B22] rounded-lg border border-[#21262D]">
                                        {step.icon}
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <h4 className="text-xs font-bold text-[#E6EDF3] leading-snug">{step.title}</h4>
                                    <p className="text-[11px] text-[#8B949E] leading-relaxed">{step.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </Motion.section>

            {/* Graph Analytics Section */}
            <Motion.section
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="space-y-6"
            >
                <div className="space-y-1">
                    <h2 className="text-xl md:text-2xl font-bold tracking-tight text-[#E6EDF3] flex items-center gap-2">
                        <Activity className="w-5 h-5 text-[#A371F7]" />
                        Graph Analytics Capabilities
                    </h2>
                    <p className="text-[#8B949E] text-sm">
                        Implemented structural algorithms operating directly on the canonical code graph.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {analyticsCapabilities.map((item) => (
                        <div
                            key={item.title}
                            className="glass p-5 rounded-2xl border border-[#21262D] hover:border-primary/30 transition-all flex flex-col justify-between space-y-3"
                        >
                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-sm font-bold text-[#E6EDF3]">{item.title}</h3>
                                    <span className="text-[10px] font-mono px-2 py-0.5 bg-[#161B22] border border-[#21262D] rounded-full text-[#8B949E]">
                                        {item.tag}
                                    </span>
                                </div>
                                <p className="text-xs text-[#8B949E] leading-relaxed">{item.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </Motion.section>

            {/* Repository Health Index Section */}
            <Motion.section
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="space-y-6"
            >
                <div className="space-y-1">
                    <h2 className="text-xl md:text-2xl font-bold tracking-tight text-[#E6EDF3] flex items-center gap-2">
                        <Gauge className="w-5 h-5 text-[#E3B341]" />
                        Repository Health Index
                    </h2>
                    <p className="text-[#8B949E] text-sm">
                        A composite architectural health metric computed across six core structural signals.
                    </p>
                </div>

                <div className="glass p-6 rounded-2xl border border-[#21262D] space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {healthSignals.map((signal) => (
                            <div key={signal.name} className="p-4 bg-[#0D1117] border border-[#21262D] rounded-xl space-y-1.5">
                                <div className="flex items-center justify-between">
                                    <span className={`text-xs font-bold ${signal.color}`}>{signal.name}</span>
                                    <span className="text-[10px] font-mono text-[#8B949E]">Structural Signal</span>
                                </div>
                                <p className="text-xs text-[#8B949E] leading-relaxed">{signal.metric}</p>
                            </div>
                        ))}
                    </div>

                    <div className="p-4 bg-[#161B22]/60 border border-[#21262D] rounded-xl flex items-start gap-3 text-xs text-[#8B949E] leading-relaxed">
                        <ShieldAlert className="w-4 h-4 text-[#E3B341] flex-shrink-0 mt-0.5" />
                        <div>
                            <span className="font-semibold text-[#E6EDF3]">Structural Evaluation Scope:</span> The Repository Health Index provides an objective structural perspective on repository organization, coupling, and modularity based on static graph metrics. It is designed as an architectural guide rather than an absolute measure of general software quality.
                        </div>
                    </div>
                </div>
            </Motion.section>

            {/* CodeGraph vs CodeLens Section */}
            <Motion.section
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="space-y-6"
            >
                <div className="space-y-1">
                    <h2 className="text-xl md:text-2xl font-bold tracking-tight text-[#E6EDF3] flex items-center gap-2">
                        <Binary className="w-5 h-5 text-primary" />
                        CodeGraph vs. CodeLens
                    </h2>
                    <p className="text-[#8B949E] text-sm">
                        Two complementary layers of codebase understanding within the same ecosystem.
                    </p>
                </div>

                <div className="glass rounded-2xl border border-[#21262D] overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-xs border-collapse">
                            <thead>
                                <tr className="border-b border-[#21262D] bg-[#0D1117]">
                                    <th className="p-4 font-bold text-[#8B949E] uppercase tracking-wider w-1/4">Dimension</th>
                                    <th className="p-4 font-bold text-primary uppercase tracking-wider w-3/8">CodeLens (Semantic)</th>
                                    <th className="p-4 font-bold text-[#3DDC84] uppercase tracking-wider w-3/8">CodeGraph (Structural)</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[#21262D]/60">
                                {comparisonData.map((row) => (
                                    <tr key={row.aspect} className="hover:bg-[#161B22]/40 transition-colors">
                                        <td className="p-4 font-semibold text-[#E6EDF3] align-top">{row.aspect}</td>
                                        <td className="p-4 text-[#8B949E] align-top leading-relaxed">{row.codelens}</td>
                                        <td className="p-4 text-[#E6EDF3] align-top leading-relaxed">{row.codegraph}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </Motion.section>

            {/* Technical Stack Section */}
            <Motion.section
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="space-y-6"
            >
                <div className="space-y-1">
                    <h2 className="text-xl md:text-2xl font-bold tracking-tight text-[#E6EDF3] flex items-center gap-2">
                        <Cpu className="w-5 h-5 text-primary" />
                        Technical Stack
                    </h2>
                    <p className="text-[#8B949E] text-sm">
                        Technologies powering CodeGraph's AST extraction and graph processing engine.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                    {techStack.map((tech) => (
                        <div key={tech.name} className="glass p-4 rounded-xl border border-[#21262D] space-y-2 hover:border-[#30363D] transition-colors">
                            <div className="flex items-center justify-between">
                                <h4 className="text-sm font-bold text-[#E6EDF3]">{tech.name}</h4>
                                <span className="text-[10px] font-mono px-2 py-0.5 bg-[#161B22] text-[#8B949E] rounded">
                                    {tech.badge}
                                </span>
                            </div>
                            <p className="text-xs text-[#8B949E] leading-relaxed">{tech.role}</p>
                        </div>
                    ))}
                </div>
            </Motion.section>

            {/* Resources & Links Footer */}
            <Motion.section
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="pt-4 border-t border-[#21262D]"
            >
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="text-xs text-[#8B949E]">
                        CodeGraph Static Code Intelligence &bull; JavaScript &amp; TypeScript Repositories
                    </div>
                    <div className="flex items-center gap-4 text-xs font-medium">
                        <a
                            href="https://codegraph-client.vercel.app/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary hover:underline inline-flex items-center gap-1"
                        >
                            <span>Live App</span>
                            <ExternalLink className="w-3 h-3" />
                        </a>
                        <span className="text-[#21262D]">&bull;</span>
                        <a
                            href="https://github.com/ad-itya07/CodeGraph"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#8B949E] hover:text-[#E6EDF3] transition-colors inline-flex items-center gap-1"
                        >
                            <span>GitHub</span>
                            <ExternalLink className="w-3 h-3" />
                        </a>
                        <span className="text-[#21262D]">&bull;</span>
                        <a
                            href="https://codegraph-client.vercel.app/docs"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#8B949E] hover:text-[#E6EDF3] transition-colors inline-flex items-center gap-1"
                        >
                            <span>Documentation</span>
                            <ExternalLink className="w-3 h-3" />
                        </a>
                    </div>
                </div>
            </Motion.section>
        </div>
    );
};

// Helper renderer for modeled entities
const modeEntitiesCard = (entities) => {
    return entities.map((entity) => (
        <div key={entity.name} className="glass p-4 rounded-xl border border-[#21262D] space-y-2">
            <div className="flex items-center gap-2 text-primary">
                {entity.icon}
                <h4 className="text-xs font-bold text-[#E6EDF3]">{entity.name}</h4>
            </div>
            <p className="text-[11px] text-[#8B949E] leading-relaxed">{entity.desc}</p>
        </div>
    ));
};

export default CodeGraph;

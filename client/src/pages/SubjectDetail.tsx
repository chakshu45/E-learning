import { motion } from "framer-motion";
import { useState } from "react";
import { useParams, Link } from "react-router-dom";

// Data extracted from previous individual pages
const subjectData: Record<string, any> = {
    "devops-cloud": {
        title: "DevOps & Cloud",
        color: "blue",
        roadmap: [
            { title: "Linux & Shell", desc: "Command line, permissions, and scripting.", status: "Foundation" },
            { title: "Docker", desc: "Containerization and orchestration basics.", status: "Core" },
            { title: "Kubernetes", desc: "Scaling and managing container workloads.", status: "Advanced" },
            { title: "AWS/Azure", desc: "Cloud providers and their core services.", status: "Expert" }
        ],
        topics: [
            { id: "cicd", title: "CI/CD Pipelines", content: "<p>Continuous Integration and Continuous Deployment are core to DevOps.</p>" },
            { id: "k8s", title: "K8s Architecture", content: "<p>Master the control plane and worker nodes.</p>" }
        ],
        pdf: "docker-cheat-sheet.pdf"
    },
    "springboot": {
        title: "Spring Boot",
        color: "green",
        roadmap: [
            { title: "Java Fundamentals", desc: "Core Java, Lambdas, and Streams.", status: "Prerequisite" },
            { title: "Spring Core", desc: "IoC, Dependency Injection, and Beans.", status: "Foundation" },
            { title: "Spring Boot Intro", desc: "Auto-configuration and Starters.", status: "Core" },
            { title: "REST APIs", desc: "Controllers, Mappings, and DTOs.", status: "Essential" }
        ],
        topics: [
            { id: "ioc", title: "Inversion of Control", content: "<p>Spring's core mechanism for DI.</p>" },
            { id: "annotations", title: "Key Annotations", content: "<p>@SpringBootApplication, @RestController, etc.</p>" }
        ],
        pdf: "spring-boot-cheat-sheet.pdf"
    },
    "dbms": {
        title: "Database Management",
        color: "emerald",
        roadmap: [
            { title: "SQL Basics", desc: "SELECT, JOIN, and GROUP BY.", status: "Foundation" },
            { title: "Normalization", desc: "1NF, 2NF, 3NF, and BCNF.", status: "Core" },
            { title: "Indexing", desc: "B-Trees and Hashing.", status: "Advanced" }
        ],
        topics: [
            { id: "acid", title: "ACID Properties", content: "<p>Atomicity, Consistency, Isolation, Durability.</p>" }
        ],
        pdf: "computer-networks-cheat-sheet.pdf" // Reusing available
    },
    "computer-networks": {
        title: "Computer Networks",
        color: "indigo",
        roadmap: [
            { title: "OSI Model", desc: "Layer 1 to Layer 7.", status: "Foundation" },
            { title: "TCP/IP", desc: "IP Addressing and Routing.", status: "Core" }
        ],
        topics: [
            { id: "layers", title: "Network Layers", content: "<p>Understanding the stack.</p>" }
        ],
        pdf: "computer-networks-cheat-sheet.pdf"
    },
    "operating-systems": {
        title: "Operating Systems",
        color: "orange",
        roadmap: [
            { title: "Process Management", desc: "Threads and Scheduling.", status: "Core" },
            { title: "Memory Management", desc: "Paging and Virtual Memory.", status: "Advanced" }
        ],
        topics: [
            { id: "kernel", title: "Kernel Architecture", content: "<p>The heart of the OS.</p>" }
        ],
        pdf: "computer-networks-cheat-sheet.pdf"
    },
    "fullstack-mern": {
        title: "Full Stack MERN",
        color: "fuchsia",
        roadmap: [
            { title: "Frontend", desc: "React and State Management.", status: "Core" },
            { title: "Backend", desc: "Node, Express, and APIs.", status: "Core" }
        ],
        topics: [
            { id: "react", title: "React Hooks", content: "<p>useState, useEffect, etc.</p>" }
        ],
        pdf: "react-cheat-sheet.pdf"
    }
};

export default function SubjectDetail() {
    const { id } = useParams();
    const data = subjectData[id as string];
    const [activeTopic, setActiveTopic] = useState(data?.topics[0]?.id);

    if (!data) return <div className="text-center py-20">Subject Roadmap Not Found.</div>;

    const handleDownload = () => {
        const link = document.createElement('a');
        link.href = `/pdfs/${data.pdf}`;
        link.download = `${data.title}_Cheat_Sheet.pdf`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="min-h-screen pt-24 pb-20 bg-[#fdfdff] dark:bg-slate-950">
            <div className="max-w-7xl mx-auto px-4">
                <header className="mb-20 text-center">
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={`inline-block px-4 py-1 mb-6 text-xs font-black tracking-widest text-${data.color}-600 bg-${data.color}-50 dark:bg-${data.color}-900/30 rounded-full uppercase`}>
                        {data.title} REPOSITORY
                    </motion.div>
                    <h1 className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white mb-6">
                        {data.title} <span className="text-gradient">Mastery</span>
                    </h1>
                    <p className="text-xl text-slate-500 max-w-2xl mx-auto font-medium">Explore the roadmap and core concepts to master {data.title}.</p>
                </header>

                <section className="mb-24">
                    <div className={`premium-card bg-gradient-to-r from-${data.color}-600 to-${data.color}-700 text-white p-10 flex flex-col md:flex-row items-center justify-between border-none shadow-2xl shadow-${data.color}-500/40`}>
                        <div className="mb-8 md:mb-0">
                            <h2 className="text-4xl font-black mb-4">{data.title} Quick Reference</h2>
                            <p className="opacity-90 text-lg max-w-xl">Everything you need for daily development and interviews.</p>
                        </div>
                        <button
                            onClick={handleDownload}
                            className="px-10 py-5 bg-white text-indigo-600 font-black text-xl rounded-2xl hover:scale-105 active:scale-95 transition-all shadow-xl"
                        >
                            Download PDF 📄
                        </button>
                    </div>
                </section>

                <section className="mb-32">
                    <h2 className="text-3xl font-black mb-12 text-slate-900 dark:text-white text-center">Developer Roadmap</h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {data.roadmap.map((step: any, i: number) => (
                            <motion.div key={i} whileHover={{ y: -5 }} className="glass-panel p-8 rounded-[2rem] border-slate-100 dark:border-slate-800">
                                <div className={`w-10 h-10 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold mb-6`}>{i + 1}</div>
                                <h3 className="text-xl font-black text-slate-900 dark:text-white mb-2">{step.title}</h3>
                                <p className="text-slate-500 text-sm font-medium">{step.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </section>

                <section className="grid lg:grid-cols-3 gap-16">
                    <div className="space-y-4">
                        <h3 className="text-2xl font-black mb-8 text-slate-900 dark:text-white">Core Concepts</h3>
                        {data.topics.map((topic: any) => (
                            <button
                                key={topic.id}
                                onClick={() => setActiveTopic(topic.id)}
                                className={`w-full text-left p-6 rounded-2xl border-2 transition-all ${activeTopic === topic.id
                                    ? "bg-white dark:bg-slate-900 border-indigo-600 shadow-xl"
                                    : "bg-transparent border-slate-100 dark:border-slate-800 text-slate-500"
                                    }`}
                            >
                                <h4 className="font-black">{topic.title}</h4>
                            </button>
                        ))}
                    </div>
                    <div className="lg:col-span-2">
                        <motion.div
                            key={activeTopic}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="bg-white dark:bg-slate-900 p-12 rounded-[3rem] border border-slate-100 dark:border-slate-800 shadow-xl"
                        >
                            <h2 className="text-4xl font-black mb-8 text-slate-900 dark:text-white">
                                {data.topics.find((t: any) => t.id === activeTopic)?.title}
                            </h2>
                            <div
                                className="prose prose-indigo dark:prose-invert max-w-none"
                                dangerouslySetInnerHTML={{ __html: data.topics.find((t: any) => t.id === activeTopic)?.content || "" }}
                            />
                        </motion.div>
                    </div>
                </section>
                
                <div className="mt-20 text-center">
                    <Link to="/subjects" className="text-indigo-600 font-bold hover:underline">← Back to Study Materials</Link>
                </div>
            </div>
        </div>
    );
}

"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const subjects = [
    {
        id: "devops-cloud",
        title: "DevOps & Cloud",
        desc: "Master CI/CD, Docker, Kubernetes, and Cloud providers.",
        icon: "☁️",
        color: "bg-blue-500",
        roadmap: ["Linux", "Docker", "AWS", "K8s"]
    },
    {
        id: "computer-networks",
        title: "Computer Networks",
        desc: "Deep dive into TCP/IP, OSI model, and network security.",
        icon: "🌐",
        color: "bg-indigo-500",
        roadmap: ["OSI Model", "TCP/IP", "Routing", "Security"]
    },
    {
        id: "springboot",
        title: "Spring Boot",
        desc: "Build enterprise-grade microservices with Java and Spring.",
        icon: "🍃",
        color: "bg-green-500",
        roadmap: ["Spring Core", "REST APIs", "Hibernate", "Microservices"]
    },
    {
        id: "fullstack-mern",
        title: "Full Stack MERN",
        desc: "Become a professional developer with MongoDB, Express, React, and Node.",
        icon: "🚀",
        color: "bg-fuchsia-500",
        roadmap: ["MongoDB", "Express", "React", "Node.js"]
    },
    {
        id: "operating-systems",
        title: "Operating Systems",
        desc: "Understand kernel architecture, process management, and memory.",
        icon: "💻",
        color: "bg-orange-500",
        roadmap: ["Processes", "Threads", "Memory", "Scheduling"]
    },
    {
        id: "dbms",
        title: "Database Management",
        desc: "Master SQL, NoSQL, Normalization, and ACID properties.",
        icon: "🗄️",
        color: "bg-emerald-500",
        roadmap: ["SQL", "Relational Algebra", "Indexing", "ACID"]
    }
];

export default function SubjectsPage() {
    return (
        <div className="min-h-screen pt-32 pb-20 bg-slate-50 dark:bg-slate-950">
            <div className="max-w-7xl mx-auto px-4">
                <header className="text-center mb-24">
                    <motion.h1 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white mb-6"
                    >
                        Study <span className="text-gradient">Materials</span>
                    </motion.h1>
                    <p className="text-xl text-slate-500 dark:text-slate-400 max-w-2xl mx-auto font-medium">
                        Comprehensive roadmaps, core concepts, and cheat sheets for the most in-demand technologies.
                    </p>
                </header>

                <div className="grid md:grid-cols-2 gap-8">
                    {subjects.map((subject, idx) => (
                        <motion.div
                            key={subject.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            whileHover={{ y: -10 }}
                            className="premium-card group"
                        >
                            <div className="flex items-start justify-between mb-8">
                                <div className={`w-16 h-16 ${subject.color} text-white rounded-2xl flex items-center justify-center text-3xl shadow-lg`}>
                                    {subject.icon}
                                </div>
                                <Link 
                                    href={`/subjects/${subject.id}`}
                                    className="px-6 py-2 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-bold rounded-xl hover:bg-indigo-600 hover:text-white transition-all"
                                >
                                    Explore
                                </Link>
                            </div>
                            <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-4">{subject.title}</h2>
                            <p className="text-slate-500 dark:text-slate-400 mb-8 font-medium">{subject.desc}</p>
                            
                            <div className="flex flex-wrap gap-2">
                                {subject.roadmap.map(item => (
                                    <span key={item} className="px-3 py-1 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 text-xs font-bold text-slate-400 rounded-lg">
                                        {item}
                                    </span>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}

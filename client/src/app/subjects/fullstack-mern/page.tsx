"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Link from "next/link";

const roadmap = [
    { title: "Frontend (React)", desc: "Components, Hooks, and State Management.", status: "Client" },
    { title: "Backend (Node.js)", desc: "Event loop, NPM, and Modules.", status: "Server" },
    { title: "API (Express)", desc: "Middleware, Routing, and Error Handling.", status: "Server" },
    { title: "Database (MongoDB)", desc: "Collections, Documents, and Mongoose.", status: "Database" },
    { title: "Authentication", desc: "JWT, Cookies, and Protected Routes.", status: "Security" },
    { title: "Deployment", desc: "Heroku, Vercel, and CI/CD.", status: "DevOps" },
];

const topics = [
    {
        id: "mern-architecture",
        title: "MERN Stack Architecture",
        content: `
            <div class="space-y-4">
                <p>MERN stands for MongoDB, Express, React, and Node. It's a JavaScript-only stack.</p>
                <div class="flex flex-col space-y-2">
                    <div class="p-3 bg-blue-500 text-white rounded-lg text-center font-bold">React (Client)</div>
                    <div class="flex justify-center py-2">
                        <svg class="w-6 h-6 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg>
                    </div>
                    <div class="p-3 bg-slate-800 text-white rounded-lg text-center font-bold">Express & Node (Server)</div>
                    <div class="flex justify-center py-2">
                        <svg class="w-6 h-6 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg>
                    </div>
                    <div class="p-3 bg-green-600 text-white rounded-lg text-center font-bold">MongoDB (Database)</div>
                </div>
            </div>
        `
    },
    {
        id: "mongoose",
        title: "Mongoose ODM",
        content: `
            <div class="space-y-4">
                <p>Mongoose provides a straight-forward, schema-based solution to model your application data.</p>
                <div class="bg-slate-900 rounded-lg p-4 font-mono text-xs text-indigo-400">
                    <p>const userSchema = new mongoose.Schema({</p>
                    <p class="pl-4 text-white">name: String,</p>
                    <p class="pl-4 text-white">email: { type: String, unique: true }</p>
                    <p>});</p>
                    <p>const User = mongoose.model('User', userSchema);</p>
                </div>
            </div>
        `
    },
    {
        id: "hooks",
        title: "React Hooks",
        content: `
            <div class="space-y-4">
                <p>Hooks let you use state and other React features without writing a class.</p>
                <ul class="list-disc list-inside space-y-2 text-sm">
                    <li><strong>useState:</strong> Adds local state to components.</li>
                    <li><strong>useEffect:</strong> Handles side effects like data fetching.</li>
                    <li><strong>useContext:</strong> Accesses global state.</li>
                    <li><strong>useMemo/useCallback:</strong> For performance optimization.</li>
                </ul>
            </div>
        `
    }
];

export default function MERNPage() {
    const [activeTopic, setActiveTopic] = useState(topics[0].id);

    const handleDownload = () => {
        const link = document.createElement('a');
        link.href = '/pdfs/react-cheat-sheet.pdf';
        link.download = 'MERN_Stack_Cheat_Sheet.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="min-h-screen pt-24 pb-20 bg-[#fdfdff] dark:bg-slate-950">
            <div className="max-w-7xl mx-auto px-4">
                <header className="mb-20 text-center">
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="inline-block px-4 py-1 mb-6 text-xs font-black tracking-widest text-fuchsia-600 bg-fuchsia-50 dark:bg-fuchsia-900/30 rounded-full">
                        FULL STACK REPOSITORY
                    </motion.div>
                    <h1 className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white mb-6">
                        Full Stack <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-fuchsia-600">MERN</span>
                    </h1>
                    <p className="text-xl text-slate-500 max-w-2xl mx-auto font-medium">Build complete web applications from scratch using the most popular JavaScript stack.</p>
                </header>

                <section className="mb-24">
                    <div className="premium-card bg-gradient-to-r from-blue-600 to-fuchsia-600 text-white p-10 flex flex-col md:flex-row items-center justify-between border-none shadow-2xl shadow-fuchsia-500/40">
                        <div className="mb-8 md:mb-0">
                            <h2 className="text-4xl font-black mb-4">MERN Stack Masterclass Cheat Sheet</h2>
                            <p className="text-blue-100 text-lg max-w-xl">A complete guide to React, Node, Express, and MongoDB in one handy PDF.</p>
                        </div>
                        <button 
                            onClick={handleDownload}
                            className="px-10 py-5 bg-white text-fuchsia-600 font-black text-xl rounded-2xl hover:scale-105 active:scale-95 transition-all shadow-xl"
                        >
                            Download PDF 📄
                        </button>
                    </div>
                </section>

                <section className="mb-32">
                    <h2 className="text-3xl font-black mb-12 text-slate-900 dark:text-white">Developer Roadmap</h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {roadmap.map((step, i) => (
                            <motion.div key={i} whileHover={{ y: -5 }} className="glass-panel p-8 rounded-[2rem] border-slate-100 dark:border-slate-800">
                                <div className="w-10 h-10 bg-fuchsia-600 text-white rounded-full flex items-center justify-center font-bold mb-6">{i+1}</div>
                                <h3 className="text-xl font-black text-slate-900 dark:text-white mb-2">{step.title}</h3>
                                <p className="text-slate-500 text-sm font-medium">{step.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </section>

                <section className="grid lg:grid-cols-3 gap-16">
                    <div className="space-y-4">
                        <h3 className="text-2xl font-black mb-8 text-slate-900 dark:text-white">Core Concepts</h3>
                        {topics.map(topic => (
                            <button
                                key={topic.id}
                                onClick={() => setActiveTopic(topic.id)}
                                className={`w-full text-left p-6 rounded-2xl border-2 transition-all ${
                                    activeTopic === topic.id 
                                    ? "bg-white dark:bg-slate-900 border-fuchsia-600 shadow-xl" 
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
                                {topics.find(t => t.id === activeTopic)?.title}
                            </h2>
                            <div 
                                className="prose prose-fuchsia dark:prose-invert max-w-none"
                                dangerouslySetInnerHTML={{ __html: topics.find(t => t.id === activeTopic)?.content || "" }}
                            />
                        </motion.div>
                    </div>
                </section>

                {/* Footer Call to Action */}
                <footer className="mt-32 text-center border-t border-slate-200 dark:border-slate-800 pt-20">
                    <p className="text-slate-500 dark:text-slate-400 mb-8">Ready to test your knowledge?</p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <Link href="/courses" className="px-8 py-4 bg-fuchsia-600 text-white font-bold rounded-2xl hover:bg-fuchsia-700 transition-all">
                            Enroll in MERN Stack Bootcamp
                        </Link>
                        <a href="https://www.geeksforgeeks.org/mern-stack/" target="_blank" className="px-8 py-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white font-bold rounded-2xl hover:bg-slate-50 transition-all">
                            Visit GeeksforGeeks
                        </a>
                    </div>
                </footer>
            </div>
        </div>
    );
}

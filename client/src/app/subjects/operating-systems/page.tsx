"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Link from "next/link";

const roadmap = [
    { title: "Introduction", desc: "History, types of OS, and system calls.", status: "Foundation" },
    { title: "Process Management", desc: "Processes, Threads, and CPU Scheduling.", status: "Core" },
    { title: "Synchronization", desc: "Semaphores, Mutex, and Deadlocks.", status: "Core" },
    { title: "Memory Management", desc: "Paging, Segmentation, and Virtual Memory.", status: "Advanced" },
    { title: "Storage & File Systems", desc: "Disk scheduling and directory structure.", status: "Advanced" },
    { title: "Security & Protection", desc: "Authentication and Access control.", status: "Mastery" },
];

const topics = [
    {
        id: "process-states",
        title: "Process States & Transitions",
        content: `
            <div class="space-y-4">
                <p>A process in an operating system can be in one of the following states:</p>
                <div class="grid grid-cols-2 md:grid-cols-5 gap-2 text-center text-xs font-bold">
                    <div class="p-3 bg-slate-100 dark:bg-slate-800 rounded-lg">New</div>
                    <div class="p-3 bg-blue-100 dark:bg-blue-900/40 text-blue-600 rounded-lg">Ready</div>
                    <div class="p-3 bg-green-100 dark:bg-green-900/40 text-green-600 rounded-lg">Running</div>
                    <div class="p-3 bg-orange-100 dark:bg-orange-900/40 text-orange-600 rounded-lg">Waiting</div>
                    <div class="p-3 bg-rose-100 dark:bg-rose-900/40 text-rose-600 rounded-lg">Terminated</div>
                </div>
                <div class="p-4 border-l-4 border-indigo-500 bg-slate-50 dark:bg-slate-800 italic text-sm">
                    "A process is a program in execution. It is more than just the program code, which is sometimes known as the text section."
                </div>
            </div>
        `
    },
    {
        id: "scheduling",
        title: "CPU Scheduling Algorithms",
        content: `
            <div class="space-y-4">
                <p>The goal of CPU scheduling is to maximize CPU utilization and throughput.</p>
                <div class="grid gap-3">
                    <div class="p-4 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl">
                        <h4 class="font-black text-indigo-600 mb-1">FCFS</h4>
                        <p class="text-sm">First Come First Served. Simple but suffers from Convoy Effect.</p>
                    </div>
                    <div class="p-4 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl">
                        <h4 class="font-black text-indigo-600 mb-1">SJF</h4>
                        <p class="text-sm">Shortest Job First. Optimal for minimum average waiting time.</p>
                    </div>
                    <div class="p-4 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl">
                        <h4 class="font-black text-indigo-600 mb-1">Round Robin</h4>
                        <p class="text-sm">Preemptive scheduling using time quantums. Best for time-sharing systems.</p>
                    </div>
                </div>
            </div>
        `
    },
    {
        id: "virtual-memory",
        title: "Virtual Memory & Paging",
        content: `
            <div class="space-y-4">
                <p>Virtual memory allows execution of processes that are not completely in memory.</p>
                <div class="bg-slate-900 rounded-xl p-6 font-mono text-xs text-indigo-400">
                    <p># Logical Address -> Page Table -> Physical Address</p>
                    <p class="text-white mt-2">Page Fault: Occurs when a page being referenced is not in physical memory.</p>
                    <p class="text-slate-500 mt-2">// LRU Algorithm: Least Recently Used (Common replacement policy)</p>
                </div>
            </div>
        `
    }
];

export default function OSPage() {
    const [activeTopic, setActiveTopic] = useState(topics[0].id);

    const handleDownload = () => {
        const link = document.createElement('a');
        link.href = '/pdfs/operating-systems-cheat-sheet.pdf';
        link.download = 'Operating_Systems_Cheat_Sheet.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="min-h-screen pt-24 pb-20 bg-[#fdfdff] dark:bg-slate-950">
            <div className="max-w-7xl mx-auto px-4">
                <header className="mb-20 text-center">
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="inline-block px-4 py-1 mb-6 text-xs font-black tracking-widest text-orange-600 bg-orange-50 dark:bg-orange-900/30 rounded-full">
                        ENGINEERING CORE
                    </motion.div>
                    <h1 className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white mb-6">
                        Operating <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-600">Systems</span>
                    </h1>
                    <p className="text-xl text-slate-500 max-w-2xl mx-auto font-medium">Master the software that bridges the gap between hardware and users.</p>
                </header>

                <section className="mb-24">
                    <div className="premium-card bg-gradient-to-r from-orange-600 to-amber-600 text-white p-10 flex flex-col md:flex-row items-center justify-between border-none shadow-2xl shadow-orange-500/40">
                        <div className="mb-8 md:mb-0">
                            <h2 className="text-4xl font-black mb-4">OS Interview Cheat Sheet</h2>
                            <p className="text-orange-100 text-lg max-w-xl">Deadlocks, Paging, System Calls, and Scheduling in one single-page PDF.</p>
                        </div>
                        <button 
                            onClick={handleDownload}
                            className="px-10 py-5 bg-white text-orange-600 font-black text-xl rounded-2xl hover:scale-105 active:scale-95 transition-all shadow-xl"
                        >
                            Download PDF 📄
                        </button>
                    </div>
                </section>

                <section className="mb-32">
                    <h2 className="text-3xl font-black mb-12 text-slate-900 dark:text-white">Learning Roadmap</h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {roadmap.map((step, i) => (
                            <motion.div key={i} whileHover={{ y: -5 }} className="glass-panel p-8 rounded-[2rem] border-slate-100 dark:border-slate-800">
                                <div className="w-10 h-10 bg-orange-600 text-white rounded-full flex items-center justify-center font-bold mb-6">{i+1}</div>
                                <h3 className="text-xl font-black text-slate-900 dark:text-white mb-2">{step.title}</h3>
                                <p className="text-slate-500 text-sm font-medium">{step.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </section>

                <section className="grid lg:grid-cols-3 gap-16">
                    <div className="space-y-4">
                        <h3 className="text-2xl font-black mb-8 text-slate-900 dark:text-white">Core Topics</h3>
                        {topics.map(topic => (
                            <button
                                key={topic.id}
                                onClick={() => setActiveTopic(topic.id)}
                                className={`w-full text-left p-6 rounded-2xl border-2 transition-all ${
                                    activeTopic === topic.id 
                                    ? "bg-white dark:bg-slate-900 border-orange-600 shadow-xl" 
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
                                className="prose prose-orange dark:prose-invert max-w-none"
                                dangerouslySetInnerHTML={{ __html: topics.find(t => t.id === activeTopic)?.content || "" }}
                            />
                        </motion.div>
                    </div>
                </section>

                {/* Footer Call to Action */}
                <footer className="mt-32 text-center border-t border-slate-200 dark:border-slate-800 pt-20">
                    <p className="text-slate-500 dark:text-slate-400 mb-8">Ready to test your knowledge?</p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <Link href="/courses" className="px-8 py-4 bg-orange-600 text-white font-bold rounded-2xl hover:bg-orange-700 transition-all">
                            Enroll in Operating Systems Bootcamp
                        </Link>
                        <a href="https://www.geeksforgeeks.org/operating-systems/" target="_blank" className="px-8 py-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white font-bold rounded-2xl hover:bg-slate-50 transition-all">
                            Visit GeeksforGeeks
                        </a>
                    </div>
                </footer>
            </div>
        </div>
    );
}

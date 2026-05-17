"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { useRouter } from "next/navigation";

const subjects = [
    { id: "Data Structures", icon: "📊", color: "bg-blue-500" },
    { id: "Algorithms", icon: "🧮", color: "bg-indigo-500" },
    { id: "Operating Systems", icon: "💻", color: "bg-orange-500" },
    { id: "DBMS", icon: "🗄️", color: "bg-emerald-500" },
    { id: "Computer Networks", icon: "🌐", color: "bg-cyan-500" },
    { id: "OOPs", icon: "🏗️", color: "bg-amber-500" },
    { id: "Software Engineering", icon: "📋", color: "bg-rose-500" },
    { id: "Web Development", icon: "🌍", color: "bg-fuchsia-500" },
    { id: "Cloud Computing", icon: "☁️", color: "bg-sky-500" },
    { id: "Cyber Security", icon: "🛡️", color: "bg-slate-800" },
];

export default function PracticeHub() {
    const router = useRouter();
    const [selectedSubject, setSelectedSubject] = useState("");
    const [config, setConfig] = useState({
        difficulty: "Medium",
        questions: 10,
        mode: "Timed"
    });

    const handleStart = () => {
        if (!selectedSubject) return;
        // Navigate to the test arena with query params
        const params = new URLSearchParams({
            subject: selectedSubject,
            difficulty: config.difficulty,
            questions: config.questions.toString(),
            mode: config.mode
        });
        router.push(`/practice/arena?${params.toString()}`);
    };

    return (
        <div className="min-h-screen pt-32 pb-20 bg-[#fdfdff] dark:bg-slate-950">
            <div className="max-w-7xl mx-auto px-4">
                <header className="text-center mb-20">
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="inline-block px-4 py-1 mb-6 text-xs font-black tracking-widest text-indigo-600 bg-indigo-50 dark:bg-indigo-900/30 rounded-full uppercase">
                        Practice Arena
                    </motion.div>
                    <h1 className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white mb-6">
                        Sharpen Your <span className="text-gradient">Skills</span>
                    </h1>
                    <p className="text-xl text-slate-500 dark:text-slate-400 max-w-2xl mx-auto font-medium">
                        Select a subject, configure your challenge, and enter the arena to master core engineering concepts.
                    </p>
                </header>

                <div className="grid lg:grid-cols-3 gap-12">
                    {/* Subject Grid */}
                    <div className="lg:col-span-2 grid md:grid-cols-2 gap-4">
                        {subjects.map((subject) => (
                            <button
                                key={subject.id}
                                onClick={() => setSelectedSubject(subject.id)}
                                className={`p-6 rounded-[2rem] border-2 transition-all flex items-center space-x-4 ${
                                    selectedSubject === subject.id
                                    ? "bg-white dark:bg-slate-900 border-indigo-600 shadow-xl"
                                    : "bg-transparent border-slate-100 dark:border-slate-800 hover:border-indigo-300"
                                }`}
                            >
                                <div className={`w-12 h-12 ${subject.color} text-white rounded-xl flex items-center justify-center text-2xl shadow-lg`}>
                                    {subject.icon}
                                </div>
                                <span className="text-lg font-black text-slate-800 dark:text-white">{subject.id}</span>
                            </button>
                        ))}
                    </div>

                    {/* Config Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="glass-panel p-8 rounded-[2.5rem] border-slate-100 dark:border-slate-800 sticky top-32">
                            <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-8">Test Configuration</h3>
                            
                            <div className="space-y-8">
                                <div>
                                    <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Difficulty</label>
                                    <div className="grid grid-cols-3 gap-2">
                                        {["Easy", "Medium", "Hard"].map(d => (
                                            <button
                                                key={d}
                                                onClick={() => setConfig({...config, difficulty: d})}
                                                className={`py-2 rounded-xl font-bold text-sm border-2 transition-all ${
                                                    config.difficulty === d
                                                    ? "bg-indigo-600 border-indigo-600 text-white"
                                                    : "bg-slate-50 dark:bg-slate-800 border-transparent text-slate-500"
                                                }`}
                                            >
                                                {d}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Questions</label>
                                    <div className="grid grid-cols-3 gap-2">
                                        {[10, 20, 30].map(q => (
                                            <button
                                                key={q}
                                                onClick={() => setConfig({...config, questions: q})}
                                                className={`py-2 rounded-xl font-bold text-sm border-2 transition-all ${
                                                    config.questions === q
                                                    ? "bg-indigo-600 border-indigo-600 text-white"
                                                    : "bg-slate-50 dark:bg-slate-800 border-transparent text-slate-500"
                                                }`}
                                            >
                                                {q}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Mode</label>
                                    <div className="grid grid-cols-2 gap-2">
                                        {["Timed", "Untimed"].map(m => (
                                            <button
                                                key={m}
                                                onClick={() => setConfig({...config, mode: m})}
                                                className={`py-2 rounded-xl font-bold text-sm border-2 transition-all ${
                                                    config.mode === m
                                                    ? "bg-indigo-600 border-indigo-600 text-white"
                                                    : "bg-slate-50 dark:bg-slate-800 border-transparent text-slate-500"
                                                }`}
                                            >
                                                {m}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <button
                                    onClick={handleStart}
                                    disabled={!selectedSubject}
                                    className="w-full py-5 bg-indigo-600 text-white rounded-[2rem] font-black text-xl shadow-2xl shadow-indigo-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:grayscale"
                                >
                                    Enter Arena 🚀
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

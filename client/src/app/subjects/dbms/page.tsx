"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Link from "next/link";

const roadmap = [
    { title: "Introduction", desc: "Data, Databases, and DBMS Architecture.", status: "Foundation" },
    { title: "ER Modeling", desc: "Entities, Attributes, and Relationships.", status: "Core" },
    { title: "Relational Model", desc: "SQL, Relational Algebra, and Calculus.", status: "Core" },
    { title: "Normalization", desc: "1NF, 2NF, 3NF, and BCNF.", status: "Advanced" },
    { title: "Transactions", desc: "ACID properties and Concurrency Control.", status: "Advanced" },
    { title: "Indexing & Hashing", desc: "B-Trees, B+ Trees, and Query Optimization.", status: "Mastery" },
];

const topics = [
    {
        id: "acid-properties",
        title: "ACID Properties",
        content: `
            <div class="space-y-4">
                <p>ACID is a set of properties that guarantee database transactions are processed reliably.</p>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div class="p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl border border-emerald-100 dark:border-emerald-800">
                        <h4 class="font-bold text-emerald-600 mb-1">Atomicity</h4>
                        <p class="text-xs text-slate-500">Either all operations of the transaction are reflected in the database or none are.</p>
                    </div>
                    <div class="p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl border border-emerald-100 dark:border-emerald-800">
                        <h4 class="font-bold text-emerald-600 mb-1">Consistency</h4>
                        <p class="text-xs text-slate-500">Execution of a transaction in isolation preserves the consistency of the database.</p>
                    </div>
                    <div class="p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl border border-emerald-100 dark:border-emerald-800">
                        <h4 class="font-bold text-emerald-600 mb-1">Isolation</h4>
                        <p class="text-xs text-slate-500">Transactions are unaware of other concurrently executing transactions.</p>
                    </div>
                    <div class="p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl border border-emerald-100 dark:border-emerald-800">
                        <h4 class="font-bold text-emerald-600 mb-1">Durability</h4>
                        <p class="text-xs text-slate-500">After a transaction completes successfully, the changes it has made to the database persist.</p>
                    </div>
                </div>
            </div>
        `
    },
    {
        id: "normalization",
        title: "Database Normalization",
        content: `
            <div class="space-y-4">
                <p>Normalization is the process of organizing data in a database to reduce redundancy.</p>
                <div class="space-y-3">
                    <div class="flex items-center space-x-3 p-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700">
                        <span class="font-black text-emerald-600">1NF</span>
                        <span class="text-sm">Atomic values, no repeating groups.</span>
                    </div>
                    <div class="flex items-center space-x-3 p-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700">
                        <span class="font-black text-emerald-600">2NF</span>
                        <span class="text-sm">In 1NF and no partial dependencies.</span>
                    </div>
                    <div class="flex items-center space-x-3 p-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700">
                        <span class="font-black text-emerald-600">3NF</span>
                        <span class="text-sm">In 2NF and no transitive dependencies.</span>
                    </div>
                </div>
            </div>
        `
    },
    {
        id: "sql-essentials",
        title: "SQL Quick Reference",
        content: `
            <div class="space-y-4">
                <p>Essential SQL commands for every database engineer.</p>
                <div class="bg-slate-900 rounded-xl p-6 font-mono text-xs text-emerald-400">
                    <p>-- Create Table</p>
                    <p class="text-white">CREATE TABLE Users (id INT PRIMARY KEY, name VARCHAR(50));</p>
                    <p class="mt-2">-- Join Query</p>
                    <p class="text-white">SELECT * FROM Orders O JOIN Users U ON O.user_id = U.id;</p>
                    <p class="mt-2">-- Aggregation</p>
                    <p class="text-white">SELECT category, AVG(price) FROM Products GROUP BY category;</p>
                </div>
            </div>
        `
    }
];

export default function DBMSPage() {
    const [activeTopic, setActiveTopic] = useState(topics[0].id);

    const handleDownload = () => {
        const link = document.createElement('a');
        link.href = '/pdfs/dbms-cheat-sheet.pdf';
        link.download = 'DBMS_Mastery_Cheat_Sheet.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="min-h-screen pt-24 pb-20 bg-[#fdfdff] dark:bg-slate-950">
            <div className="max-w-7xl mx-auto px-4">
                <header className="mb-20 text-center">
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="inline-block px-4 py-1 mb-6 text-xs font-black tracking-widest text-emerald-600 bg-emerald-50 dark:bg-emerald-900/30 rounded-full">
                        ENGINEERING CORE
                    </motion.div>
                    <h1 className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white mb-6">
                        Database <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-700">Management</span>
                    </h1>
                    <p className="text-xl text-slate-500 max-w-2xl mx-auto font-medium">Design, implement, and optimize robust data storage systems.</p>
                </header>

                <section className="mb-24">
                    <div className="premium-card bg-gradient-to-r from-emerald-600 to-teal-700 text-white p-10 flex flex-col md:flex-row items-center justify-between border-none shadow-2xl shadow-emerald-500/40">
                        <div className="mb-8 md:mb-0">
                            <h2 className="text-4xl font-black mb-4">SQL & DBMS Master Cheat Sheet</h2>
                            <p className="text-emerald-100 text-lg max-w-xl">SQL Syntax, Normalization Rules, and ACID properties in a high-res PDF.</p>
                        </div>
                        <button 
                            onClick={handleDownload}
                            className="px-10 py-5 bg-white text-emerald-600 font-black text-xl rounded-2xl hover:scale-105 active:scale-95 transition-all shadow-xl"
                        >
                            Download PDF 📄
                        </button>
                    </div>
                </section>

                <section className="mb-32">
                    <h2 className="text-3xl font-black mb-12 text-slate-900 dark:text-white">Engineering Roadmap</h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {roadmap.map((step, i) => (
                            <motion.div key={i} whileHover={{ y: -5 }} className="glass-panel p-8 rounded-[2rem] border-slate-100 dark:border-slate-800">
                                <div className="w-10 h-10 bg-emerald-600 text-white rounded-full flex items-center justify-center font-bold mb-6">{i+1}</div>
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
                                    ? "bg-white dark:bg-slate-900 border-emerald-600 shadow-xl" 
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
                                className="prose prose-emerald dark:prose-invert max-w-none"
                                dangerouslySetInnerHTML={{ __html: topics.find(t => t.id === activeTopic)?.content || "" }}
                            />
                        </motion.div>
                    </div>
                </section>

                {/* Footer Call to Action */}
                <footer className="mt-32 text-center border-t border-slate-200 dark:border-slate-800 pt-20">
                    <p className="text-slate-500 dark:text-slate-400 mb-8">Ready to test your knowledge?</p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <Link href="/courses" className="px-8 py-4 bg-emerald-600 text-white font-bold rounded-2xl hover:bg-emerald-700 transition-all">
                            Enroll in DBMS Bootcamp
                        </Link>
                        <a href="https://www.geeksforgeeks.org/dbms/" target="_blank" className="px-8 py-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white font-bold rounded-2xl hover:bg-slate-50 transition-all">
                            Visit GeeksforGeeks
                        </a>
                    </div>
                </footer>
            </div>
        </div>
    );
}

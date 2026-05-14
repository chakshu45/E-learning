"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Link from "next/link";

const roadmap = [
    { title: "Physical Layer", desc: "Bits, signals, cables, and hubs.", status: "Foundation" },
    { title: "Data Link Layer", desc: "Frames, MAC addresses, and Switches.", status: "Core" },
    { title: "Network Layer", desc: "IP addresses, Routers, and ICMP.", status: "Core" },
    { title: "Transport Layer", desc: "TCP, UDP, and Port numbers.", status: "Advanced" },
    { title: "Session & Presentation", desc: "Encryption, compression, and dialog control.", status: "Specialized" },
    { title: "Application Layer", desc: "HTTP, DNS, FTP, and SMTP.", status: "Mastery" },
];

const topics = [
    {
        id: "osi-model",
        title: "OSI Model Explained",
        content: `
            <div class="space-y-4">
                <p>The Open Systems Interconnection (OSI) model is a conceptual framework that describes the functions of a networking system.</p>
                <div class="grid gap-2 text-sm">
                    <div class="p-3 bg-indigo-600 text-white rounded-lg flex justify-between items-center font-bold">
                        <span>Layer 7: Application</span>
                        <span class="text-[10px] opacity-70">HTTP, DNS</span>
                    </div>
                    <div class="p-3 bg-indigo-500 text-white rounded-lg flex justify-between items-center font-bold">
                        <span>Layer 6: Presentation</span>
                        <span class="text-[10px] opacity-70">SSL, JPG</span>
                    </div>
                    <div class="p-3 bg-indigo-400 text-white rounded-lg flex justify-between items-center font-bold">
                        <span>Layer 5: Session</span>
                        <span class="text-[10px] opacity-70">RPC, NetBIOS</span>
                    </div>
                    <div class="p-3 bg-violet-600 text-white rounded-lg flex justify-between items-center font-bold">
                        <span>Layer 4: Transport</span>
                        <span class="text-[10px] opacity-70">TCP, UDP</span>
                    </div>
                    <div class="p-3 bg-violet-500 text-white rounded-lg flex justify-between items-center font-bold">
                        <span>Layer 3: Network</span>
                        <span class="text-[10px] opacity-70">IP, ICMP</span>
                    </div>
                    <div class="p-3 bg-violet-400 text-white rounded-lg flex justify-between items-center font-bold">
                        <span>Layer 2: Data Link</span>
                        <span class="text-[10px] opacity-70">MAC, ARP</span>
                    </div>
                    <div class="p-3 bg-slate-700 text-white rounded-lg flex justify-between items-center font-bold">
                        <span>Layer 1: Physical</span>
                        <span class="text-[10px] opacity-70">Hubs, Cables</span>
                    </div>
                </div>
            </div>
        `
    },
    {
        id: "tcp-vs-udp",
        title: "TCP vs UDP",
        content: `
            <div class="space-y-4">
                <p>The two main protocols at the Transport Layer serve very different purposes:</p>
                <div class="grid md:grid-cols-2 gap-4">
                    <div class="p-4 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-100 dark:border-green-800">
                        <h4 class="font-bold text-green-600 mb-2">TCP (Transmission Control Protocol)</h4>
                        <ul class="text-xs space-y-1 list-disc list-inside">
                            <li>Connection-oriented</li>
                            <li>Reliable (Error checking)</li>
                            <li>Guaranteed delivery</li>
                            <li>Slower (Handshakes)</li>
                            <li>Use: Web browsing, Email</li>
                        </ul>
                    </div>
                    <div class="p-4 bg-orange-50 dark:bg-orange-900/20 rounded-xl border border-orange-100 dark:border-orange-800">
                        <h4 class="font-bold text-orange-600 mb-2">UDP (User Datagram Protocol)</h4>
                        <ul class="text-xs space-y-1 list-disc list-inside">
                            <li>Connectionless</li>
                            <li>Unreliable (Best effort)</li>
                            <li>No guarantee</li>
                            <li>Faster (No overhead)</li>
                            <li>Use: Streaming, Gaming, VoIP</li>
                        </ul>
                    </div>
                </div>
            </div>
        `
    },
    {
        id: "ip-addressing",
        title: "IP Addressing (IPv4)",
        content: `
            <div class="space-y-4">
                <p>IPv4 addresses are 32-bit numbers usually expressed in dotted-decimal notation.</p>
                <div class="bg-slate-900 rounded-xl p-6 font-mono text-center">
                    <span class="text-indigo-400 text-3xl font-black">192 . 168 . 1 . 25</span>
                </div>
                <div class="grid grid-cols-2 gap-4 text-sm">
                    <div class="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                        <strong>Public IP:</strong> Visible to the entire internet.
                    </div>
                    <div class="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                        <strong>Private IP:</strong> Used within a local network (LAN).
                    </div>
                </div>
            </div>
        `
    }
];

export default function CNPage() {
    const [activeTopic, setActiveTopic] = useState(topics[0].id);

    const handleDownload = () => {
        const link = document.createElement('a');
        link.href = '/pdfs/computer-networks-cheat-sheet.pdf';
        link.download = 'Computer_Networks_Cheat_Sheet.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="min-h-screen pt-24 pb-20 bg-[#fdfdff] dark:bg-slate-950">
            <div className="max-w-7xl mx-auto px-4">
                {/* Hero */}
                <header className="mb-20 text-center">
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="inline-block px-4 py-1 mb-6 text-xs font-black tracking-widest text-indigo-600 bg-indigo-50 dark:bg-indigo-900/30 rounded-full">
                        SUBJECT REPOSITORY
                    </motion.div>
                    <h1 className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white mb-6">
                        Computer <span className="text-gradient">Networks</span>
                    </h1>
                    <p className="text-xl text-slate-500 max-w-2xl mx-auto font-medium">The backbone of the digital world. Learn how data travels across the globe.</p>
                </header>

                {/* Cheat Sheet Section */}
                <section className="mb-24">
                    <div className="premium-card bg-gradient-to-r from-indigo-600 to-violet-600 text-white p-10 flex flex-col md:flex-row items-center justify-between border-none shadow-2xl shadow-indigo-500/40">
                        <div className="mb-8 md:mb-0">
                            <h2 className="text-4xl font-black mb-4">Ultimate Networking Cheat Sheet</h2>
                            <p className="text-indigo-100 text-lg max-w-xl">Get all protocols, port numbers, and OSI layers in a single page high-quality PDF.</p>
                        </div>
                        <button 
                            onClick={handleDownload}
                            className="px-10 py-5 bg-white text-indigo-600 font-black text-xl rounded-2xl hover:scale-105 active:scale-95 transition-all shadow-xl"
                        >
                            Download PDF 📄
                        </button>
                    </div>
                </section>

                {/* Roadmap */}
                <section className="mb-32">
                    <h2 className="text-3xl font-black mb-12 text-slate-900 dark:text-white">Learning Roadmap</h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {roadmap.map((step, i) => (
                            <motion.div key={i} whileHover={{ y: -5 }} className="glass-panel p-8 rounded-[2rem] border-slate-100 dark:border-slate-800">
                                <div className="w-10 h-10 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold mb-6">{i+1}</div>
                                <h3 className="text-xl font-black text-slate-900 dark:text-white mb-2">{step.title}</h3>
                                <p className="text-slate-500 text-sm font-medium">{step.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* Content */}
                <section className="grid lg:grid-cols-3 gap-16">
                    <div className="space-y-4">
                        <h3 className="text-2xl font-black mb-8 text-slate-900 dark:text-white">Core Concepts</h3>
                        {topics.map(topic => (
                            <button
                                key={topic.id}
                                onClick={() => setActiveTopic(topic.id)}
                                className={`w-full text-left p-6 rounded-2xl border-2 transition-all ${
                                    activeTopic === topic.id 
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
                                {topics.find(t => t.id === activeTopic)?.title}
                            </h2>
                            <div 
                                className="prose prose-indigo dark:prose-invert max-w-none"
                                dangerouslySetInnerHTML={{ __html: topics.find(t => t.id === activeTopic)?.content || "" }}
                            />
                        </motion.div>
                    </div>
                </section>
            </div>
        </div>
    );
}

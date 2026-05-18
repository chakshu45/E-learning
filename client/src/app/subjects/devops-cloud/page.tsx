"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Link from "next/link";

const roadmap = [
    { title: "Linux & Networking", desc: "Master the command line, file systems, and SSH.", status: "Foundational" },
    { title: "Version Control (Git)", desc: "Branching, merging, and collaboration on GitHub.", status: "Essential" },
    { title: "Cloud Computing", desc: "IaaS, PaaS, SaaS on AWS, Azure or GCP.", status: "Core" },
    { title: "Containerization", desc: "Docker, container images, and registries.", status: "Advanced" },
    { title: "Orchestration", desc: "Kubernetes, Pods, Deployments, and Services.", status: "Advanced" },
    { title: "CI/CD & Monitoring", desc: "Jenkins, GitHub Actions, Prometheus, Grafana.", status: "Mastery" },
];

const topics = [
    {
        id: "cloud-models",
        title: "Cloud Service Models",
        content: `
            <div class="space-y-4">
                <p>Cloud computing services are divided into three main categories. Think of them as levels of management:</p>
                <div class="grid md:grid-cols-3 gap-4">
                    <div class="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-100 dark:border-blue-800">
                        <h4 class="font-bold text-blue-600 mb-1">IaaS</h4>
                        <p class="text-sm">Infrastructure as a Service. You rent servers (VMs), storage, and networks. (e.g., AWS EC2)</p>
                    </div>
                    <div class="p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-xl border border-indigo-100 dark:border-indigo-800">
                        <h4 class="font-bold text-indigo-600 mb-1">PaaS</h4>
                        <p class="text-sm">Platform as a Service. You bring the code, they handle the OS and runtime. (e.g., AWS Elastic Beanstalk)</p>
                    </div>
                    <div class="p-4 bg-violet-50 dark:bg-violet-900/20 rounded-xl border border-violet-100 dark:border-violet-800">
                        <h4 class="font-bold text-violet-600 mb-1">SaaS</h4>
                        <p class="text-sm">Software as a Service. You use the application directly over the web. (e.g., Gmail, Slack)</p>
                    </div>
                </div>
                <div class="mt-4 p-4 bg-slate-100 dark:bg-slate-800 rounded-xl">
                    <p class="text-xs font-mono uppercase text-slate-400 mb-2">Key Reference: GeeksforGeeks</p>
                    <p class="italic text-sm">"Cloud computing is the on-demand availability of computer system resources, especially data storage and computing power, without direct active management by the user."</p>
                </div>
            </div>
        `
    },
    {
        id: "devops-lifecycle",
        title: "DevOps Lifecycle",
        content: `
            <div class="space-y-4">
                <p>The DevOps lifecycle is an infinite loop consisting of several phases:</p>
                <ol class="list-decimal list-inside space-y-2 text-sm">
                    <li><strong>Plan:</strong> Define project requirements and goals.</li>
                    <li><strong>Code:</strong> Writing and reviewing code.</li>
                    <li><strong>Build:</strong> Converting code into executable artifacts.</li>
                    <li><strong>Test:</strong> Automated testing to ensure quality.</li>
                    <li><strong>Release:</strong> Preparing code for deployment.</li>
                    <li><strong>Deploy:</strong> Moving code to production.</li>
                    <li><strong>Operate:</strong> Managing the app in production.</li>
                    <li><strong>Monitor:</strong> Tracking performance and user feedback.</li>
                </ol>
                <div class="p-4 border-l-4 border-indigo-500 bg-slate-50 dark:bg-slate-800">
                    <p class="text-sm italic font-medium">Tip: DevOps is 80% culture and 20% tools. Focus on collaboration first!</p>
                </div>
            </div>
        `
    },
    {
        id: "docker-101",
        title: "Docker Essentials",
        content: `
            <div class="space-y-4">
                <p>Docker allows you to package an application with all of its dependencies into a standardized unit called a container.</p>
                <div class="bg-slate-900 rounded-lg p-4 font-mono text-sm text-indigo-400">
                    <div class="flex items-center space-x-2 mb-2">
                        <div class="w-3 h-3 bg-red-500 rounded-full"></div>
                        <div class="w-3 h-3 bg-yellow-500 rounded-full"></div>
                        <div class="w-3 h-3 bg-green-500 rounded-full"></div>
                    </div>
                    <p># Build an image</p>
                    <p class="text-white">docker build -t my-app .</p>
                    <p class="mt-2"># Run a container</p>
                    <p class="text-white">docker run -p 3000:3000 my-app</p>
                </div>
                <p class="text-sm">Reference from W3Schools: "Containers are lightweight and contain everything needed to run the application, so you do not need to rely on what is currently installed on the host."</p>
            </div>
        `
    }
];

export default function DevOpsPage() {
    const [activeTopic, setActiveTopic] = useState(topics[0].id);

    const handleDownload = () => {
        const link = document.createElement('a');
        link.href = '/pdfs/docker-cheat-sheet.pdf';
        link.download = 'DevOps_Docker_Cheat_Sheet.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="min-h-screen pt-24 pb-20 bg-[#fdfdff] dark:bg-slate-950">
            <div className="max-w-7xl mx-auto px-4">
                {/* Hero Section */}
                <header className="mb-20 text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="inline-block px-4 py-1 mb-6 text-xs font-black tracking-widest text-indigo-600 uppercase bg-indigo-50 rounded-full dark:bg-indigo-900/30"
                    >
                        Study Materials
                    </motion.div>
                    <motion.h1 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white leading-tight mb-6"
                    >
                        DevOps & <span className="text-gradient">Cloud</span> Engineering
                    </motion.h1>
                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="mt-6 text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto font-medium"
                    >
                        Your structured guide to the modern cloud landscape, curated from industry-standard resources.
                    </motion.p>
                </header>

                {/* Cheat Sheet Section */}
                <section className="mb-24">
                    <div className="premium-card bg-gradient-to-r from-indigo-600 to-violet-600 text-white p-10 flex flex-col md:flex-row items-center justify-between border-none shadow-2xl shadow-indigo-500/40">
                        <div className="mb-8 md:mb-0">
                            <h2 className="text-4xl font-black mb-4">DevOps Mastery Cheat Sheet</h2>
                            <p className="text-indigo-100 text-lg max-w-xl">A complete overview of Docker, Kubernetes, and AWS CLI commands in a printable PDF.</p>
                        </div>
                        <button 
                            onClick={handleDownload}
                            className="px-10 py-5 bg-white text-indigo-600 font-black text-xl rounded-2xl hover:scale-105 active:scale-95 transition-all shadow-xl"
                        >
                            Download PDF 📄
                        </button>
                    </div>
                </section>

                {/* Roadmap Stepper */}
                <section className="mb-32">
                    <h2 className="text-3xl font-black mb-12 text-slate-900 dark:text-white">Learning Roadmap</h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {roadmap.map((step, i) => (
                            <motion.div 
                                key={i} 
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className="glass-panel p-8 rounded-[2rem] border-slate-100 dark:border-slate-800"
                            >
                                <div className="w-10 h-10 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold mb-6">
                                    {i + 1}
                                </div>
                                <h3 className="text-xl font-black text-slate-900 dark:text-white mb-2">{step.title}</h3>
                                <p className="text-slate-500 text-sm font-medium">{step.desc}</p>
                                <span className="mt-4 inline-block text-[10px] font-black uppercase px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-500 rounded">
                                    {step.status}
                                </span>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* Content Explorer */}
                <section className="grid lg:grid-cols-3 gap-16">
                    <div className="space-y-4">
                        <h3 className="text-2xl font-black mb-8 text-slate-900 dark:text-white">Core Topics</h3>
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
                            className="bg-white dark:bg-slate-900 p-12 rounded-[3rem] border border-slate-100 dark:border-slate-800 shadow-xl min-h-[400px]"
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

                {/* Footer Call to Action */}
                <footer className="mt-32 text-center border-t border-slate-200 dark:border-slate-800 pt-20">
                    <p className="text-slate-500 dark:text-slate-400 mb-8">Ready to test your knowledge?</p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <Link href="/courses" className="px-8 py-4 bg-indigo-600 text-white font-bold rounded-2xl hover:bg-indigo-700 transition-all">
                            Enroll in DevOps Bootcamp
                        </Link>
                        <a href="https://www.geeksforgeeks.org/devops-tutorial/" target="_blank" className="px-8 py-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white font-bold rounded-2xl hover:bg-slate-50 transition-all">
                            Visit GeeksforGeeks
                        </a>
                    </div>
                </footer>
            </div>
        </div>
    );
}

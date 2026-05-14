"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Link from "next/link";

const roadmap = [
    { title: "Java Fundamentals", desc: "Core Java, Lambdas, and Streams.", status: "Prerequisite" },
    { title: "Spring Core", desc: "IoC, Dependency Injection, and Beans.", status: "Foundation" },
    { title: "Spring Boot Intro", desc: "Auto-configuration and Starters.", status: "Core" },
    { title: "REST APIs", desc: "Controllers, Mappings, and DTOs.", status: "Essential" },
    { title: "Spring Data JPA", desc: "Repositories, Entities, and Databases.", status: "Advanced" },
    { title: "Spring Security", desc: "Authentication, JWT, and OAuth2.", status: "Mastery" },
];

const topics = [
    {
        id: "ioc-di",
        title: "Inversion of Control (IoC) & DI",
        content: `
            <div class="space-y-4">
                <p>IoC is a design principle where the control of objects or portions of a program is transferred to a container or framework.</p>
                <div class="p-4 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-100 dark:border-green-800">
                    <p class="text-sm font-medium"><strong>Dependency Injection (DI)</strong> is a pattern used to implement IoC, where the container provides the dependencies of an object at runtime.</p>
                </div>
                <div class="bg-slate-900 rounded-lg p-4 font-mono text-xs text-indigo-400">
                    <p>@Service</p>
                    <p>public class UserService {</p>
                    <p class="pl-4 text-slate-500">// DI via constructor</p>
                    <p class="pl-4 text-white">private final UserRepository repo;</p>
                    <p class="pl-4 text-white">public UserService(UserRepository repo) { ... }</p>
                    <p>}</p>
                </div>
            </div>
        `
    },
    {
        id: "starters",
        title: "Spring Boot Starters",
        content: `
            <div class="space-y-4">
                <p>Starters are a set of convenient dependency descriptors that you can include in your application.</p>
                <ul class="list-disc list-inside space-y-2 text-sm">
                    <li><strong>spring-boot-starter-web:</strong> For building RESTful apps using Spring MVC.</li>
                    <li><strong>spring-boot-starter-data-jpa:</strong> For using Spring Data JPA with Hibernate.</li>
                    <li><strong>spring-boot-starter-security:</strong> For adding Spring Security.</li>
                    <li><strong>spring-boot-starter-test:</strong> For testing Spring Boot apps.</li>
                </ul>
            </div>
        `
    },
    {
        id: "annotations",
        title: "Key Annotations",
        content: `
            <div class="space-y-4">
                <p>Spring Boot relies heavily on annotations to reduce boilerplate code.</p>
                <div class="grid gap-3">
                    <div class="flex items-center space-x-4 p-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700">
                        <code class="text-indigo-600 font-bold">@SpringBootApplication</code>
                        <span class="text-xs text-slate-500">Entry point of the app.</span>
                    </div>
                    <div class="flex items-center space-x-4 p-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700">
                        <code class="text-indigo-600 font-bold">@RestController</code>
                        <span class="text-xs text-slate-500">Combines @Controller and @ResponseBody.</span>
                    </div>
                    <div class="flex items-center space-x-4 p-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700">
                        <code class="text-indigo-600 font-bold">@Autowired</code>
                        <span class="text-xs text-slate-500">Marks a constructor/field for DI.</span>
                    </div>
                </div>
            </div>
        `
    }
];

export default function SpringBootPage() {
    const [activeTopic, setActiveTopic] = useState(topics[0].id);

    const handleDownload = () => {
        const link = document.createElement('a');
        link.href = '/pdfs/spring-boot-cheat-sheet.pdf';
        link.download = 'Spring_Boot_Cheat_Sheet.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="min-h-screen pt-24 pb-20 bg-[#fdfdff] dark:bg-slate-950">
            <div className="max-w-7xl mx-auto px-4">
                <header className="mb-20 text-center">
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="inline-block px-4 py-1 mb-6 text-xs font-black tracking-widest text-green-600 bg-green-50 dark:bg-green-900/30 rounded-full">
                        BACKEND REPOSITORY
                    </motion.div>
                    <h1 className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white mb-6">
                        Spring <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-emerald-700">Boot</span>
                    </h1>
                    <p className="text-xl text-slate-500 max-w-2xl mx-auto font-medium">Build fast, secure, and production-ready Java applications with ease.</p>
                </header>

                <section className="mb-24">
                    <div className="premium-card bg-gradient-to-r from-green-600 to-emerald-700 text-white p-10 flex flex-col md:flex-row items-center justify-between border-none shadow-2xl shadow-green-500/40">
                        <div className="mb-8 md:mb-0">
                            <h2 className="text-4xl font-black mb-4">Spring Boot Quick Reference</h2>
                            <p className="text-green-100 text-lg max-w-xl">Every annotation, starter, and command you need for daily development.</p>
                        </div>
                        <button 
                            onClick={handleDownload}
                            className="px-10 py-5 bg-white text-green-600 font-black text-xl rounded-2xl hover:scale-105 active:scale-95 transition-all shadow-xl"
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
                                <div className="w-10 h-10 bg-green-600 text-white rounded-full flex items-center justify-center font-bold mb-6">{i+1}</div>
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
                                    ? "bg-white dark:bg-slate-900 border-green-600 shadow-xl" 
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
                                className="prose prose-green dark:prose-invert max-w-none"
                                dangerouslySetInnerHTML={{ __html: topics.find(t => t.id === activeTopic)?.content || "" }}
                            />
                        </motion.div>
                    </div>
                </section>
            </div>
        </div>
    );
}

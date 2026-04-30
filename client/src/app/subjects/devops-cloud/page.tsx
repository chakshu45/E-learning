"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const materials = [
    {
        title: "Introduction to DevOps",
        type: "PDF Guide",
        description: "Core principles, culture, and the CAMS model.",
        downloadUrl: "#",
        color: "bg-blue-500"
    },
    {
        title: "Docker & Containerization",
        type: "Cheat Sheet",
        description: "Essential commands for Docker CLI and Docker Compose.",
        downloadUrl: "#",
        color: "bg-indigo-500"
    },
    {
        title: "Kubernetes Architecture",
        type: "Video Series",
        description: "Deep dive into Control Plane, Nodes, and Pods.",
        downloadUrl: "#",
        color: "bg-violet-500"
    },
    {
        title: "AWS Certified Solutions Architect",
        type: "Study Notes",
        description: "Key services: EC2, S3, RDS, Lambda, and IAM.",
        downloadUrl: "#",
        color: "bg-orange-500"
    },
    {
        title: "CI/CD Pipelines with Jenkins",
        type: "Handbook",
        description: "Building automated test and deployment pipelines.",
        downloadUrl: "#",
        color: "bg-red-500"
    },
    {
        title: "Terraform Infrastructure as Code",
        type: "Labs",
        description: "Hands-on labs for provisioning multi-cloud resources.",
        downloadUrl: "#",
        color: "bg-purple-500"
    }
];

export default function DevOpsPage() {
    return (
        <div className="min-h-screen pt-24 pb-12 bg-slate-50 dark:bg-slate-950">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-12">
                    <motion.h1 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl font-extrabold text-slate-900 dark:text-white"
                    >
                        DevOps & Cloud Computing
                    </motion.h1>
                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="mt-4 text-xl text-slate-600 dark:text-slate-400 max-w-3xl"
                    >
                        Comprehensive study materials, cheat sheets, and hand-picked resources to master the cloud ecosystem.
                    </motion.p>
                </div>

                {/* Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {materials.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ y: -5 }}
                            className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all"
                        >
                            <div className={`w-12 h-12 ${item.color} rounded-2xl mb-6 flex items-center justify-center text-white`}>
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                </svg>
                            </div>
                            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                                {item.type}
                            </span>
                            <h3 className="text-2xl font-bold mt-2 mb-4 text-slate-900 dark:text-white">
                                {item.title}
                            </h3>
                            <p className="text-slate-600 dark:text-slate-400 mb-8">
                                {item.description}
                            </p>
                            <Link 
                                href={item.downloadUrl}
                                className="inline-flex items-center space-x-2 text-indigo-600 dark:text-indigo-400 font-semibold hover:underline"
                            >
                                <span>Access Material</span>
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </Link>
                        </motion.div>
                    ))}
                </div>

                {/* FAQ/Help Section */}
                <div className="mt-20 p-12 bg-indigo-600 rounded-[3rem] text-white text-center">
                    <h2 className="text-3xl font-bold mb-4">Need personalized guidance?</h2>
                    <p className="text-indigo-100 text-lg mb-8 max-w-2xl mx-auto">
                        Our cloud experts are available for 1-on-1 mentorship to help you clear certifications and master complex workflows.
                    </p>
                    <button className="px-8 py-4 bg-white text-indigo-600 font-bold rounded-2xl hover:bg-indigo-50 transition-all">
                        Talk to a Mentor
                    </button>
                </div>
            </div>
        </div>
    );
}

"use client";

import { useEffect, useState, use } from "react";
import Link from "next/link";
import { fetchData } from "@/utils/api";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip, Legend } from "recharts";
import { motion } from "framer-motion";

export default function PracticeResultsPage({ params: paramsPromise }: { params: Promise<{ id: string }> }) {
    const params = use(paramsPromise);
    const [result, setResult] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getResult = async () => {
            try {
                const data = await fetchData(`/tests/result/${params.id}`);
                setResult(data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        getResult();
    }, [params.id]);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-slate-50 dark:bg-slate-950">
                <div className="relative w-20 h-20">
                    <div className="absolute inset-0 border-4 border-indigo-200 dark:border-slate-800 rounded-full"></div>
                    <div className="absolute inset-0 border-4 border-indigo-600 rounded-full border-t-transparent animate-spin"></div>
                </div>
            </div>
        );
    }

    if (!result) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950">
                <div className="text-center">
                    <h1 className="text-3xl font-black text-slate-900 dark:text-white mb-4">Result Not Found</h1>
                    <Link href="/practice" className="text-indigo-600 font-bold hover:underline">Back to Practice Arena</Link>
                </div>
            </div>
        );
    }

    const pieData = [
        { name: "Correct", value: result.correctAnswersCount, color: "#10b981" },
        { name: "Incorrect", value: result.wrongAnswersCount, color: "#f43f5e" }
    ];

    const formatTime = (seconds: number) => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m}m ${s}s`;
    };

    return (
        <div className="min-h-screen pt-24 pb-20 bg-[#fdfdff] dark:bg-slate-950">
            <div className="max-w-5xl mx-auto px-4">
                <header className="text-center mb-16">
                    <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="inline-block px-4 py-1 mb-4 text-xs font-black tracking-widest text-indigo-600 bg-indigo-50 dark:bg-indigo-900/30 rounded-full uppercase">
                        Test Completed
                    </motion.div>
                    <h1 className="text-5xl font-black text-slate-900 dark:text-white mb-4 tracking-tight">
                        {result.subject} Analysis
                    </h1>
                    <p className="text-slate-500 font-medium">Detailed breakdown of your performance in the {result.difficulty} test.</p>
                </header>

                <div className="grid md:grid-cols-3 gap-8 mb-16">
                    <div className="glass-panel p-8 rounded-[2rem] border-slate-100 dark:border-slate-800 text-center flex flex-col justify-center items-center">
                        <span className="block text-sm font-black text-slate-400 uppercase tracking-widest mb-2">Final Score</span>
                        <span className="text-6xl font-black text-indigo-600">{result.score}</span>
                        <span className="text-slate-500 font-medium mt-2">out of {result.totalQuestions * 4}</span>
                    </div>

                    <div className="glass-panel p-8 rounded-[2rem] border-slate-100 dark:border-slate-800 text-center flex flex-col justify-center items-center">
                        <span className="block text-sm font-black text-slate-400 uppercase tracking-widest mb-2">Accuracy</span>
                        <span className={`text-6xl font-black ${result.accuracy >= 70 ? 'text-emerald-500' : result.accuracy >= 40 ? 'text-amber-500' : 'text-rose-500'}`}>
                            {result.accuracy.toFixed(1)}%
                        </span>
                    </div>

                    <div className="glass-panel p-8 rounded-[2rem] border-slate-100 dark:border-slate-800 text-center flex flex-col justify-center items-center">
                        <span className="block text-sm font-black text-slate-400 uppercase tracking-widest mb-2">Time Taken</span>
                        <span className="text-5xl font-black text-slate-900 dark:text-white">{formatTime(result.timeTaken)}</span>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-12 mb-16">
                    <div className="glass-panel p-8 rounded-[2.5rem] border-slate-100 dark:border-slate-800 flex flex-col items-center justify-center">
                        <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-6">Performance Breakdown</h3>
                        <div className="w-full h-64">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={pieData}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={60}
                                        outerRadius={80}
                                        paddingAngle={5}
                                        dataKey="value"
                                    >
                                        {pieData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Pie>
                                    <RechartsTooltip contentStyle={{ borderRadius: '1rem', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
                                    <Legend />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                    
                    <div className="glass-panel p-8 rounded-[2.5rem] border-slate-100 dark:border-slate-800 flex flex-col justify-center">
                        <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-6">Summary</h3>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center p-4 bg-slate-50 dark:bg-slate-900/50 rounded-xl">
                                <span className="font-bold text-slate-600 dark:text-slate-400">Total Questions</span>
                                <span className="font-black text-slate-900 dark:text-white">{result.totalQuestions}</span>
                            </div>
                            <div className="flex justify-between items-center p-4 bg-emerald-50 dark:bg-emerald-900/10 rounded-xl">
                                <span className="font-bold text-emerald-600">Correct Answers</span>
                                <span className="font-black text-emerald-600">{result.correctAnswersCount}</span>
                            </div>
                            <div className="flex justify-between items-center p-4 bg-rose-50 dark:bg-rose-900/10 rounded-xl">
                                <span className="font-bold text-rose-600">Incorrect/Skipped</span>
                                <span className="font-black text-rose-600">{result.wrongAnswersCount}</span>
                            </div>
                        </div>
                        <div className="mt-8 text-center">
                            <Link href="/dashboard" className="inline-block px-8 py-4 bg-indigo-600 text-white rounded-2xl font-black shadow-lg shadow-indigo-500/30 hover:scale-105 transition-all w-full text-center">
                                Go to Dashboard
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="glass-panel p-8 md:p-12 rounded-[3rem] border-slate-100 dark:border-slate-800">
                    <h3 className="text-3xl font-black text-slate-900 dark:text-white mb-8">Detailed Review</h3>
                    <div className="space-y-6">
                        {result.answers.map((ans: any, idx: number) => (
                            <div key={idx} className={`p-6 rounded-2xl border-2 ${ans.isCorrect ? 'border-emerald-100 bg-emerald-50/50 dark:border-emerald-900/30 dark:bg-emerald-900/10' : 'border-rose-100 bg-rose-50/50 dark:border-rose-900/30 dark:bg-rose-900/10'}`}>
                                <div className="flex items-start justify-between mb-4">
                                    <span className="text-sm font-black uppercase tracking-widest text-slate-500">Q {idx + 1}</span>
                                    {ans.isCorrect ? (
                                        <span className="px-3 py-1 bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 text-xs font-black rounded-full uppercase">Correct</span>
                                    ) : (
                                        <span className="px-3 py-1 bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400 text-xs font-black rounded-full uppercase">Incorrect</span>
                                    )}
                                </div>
                                <p className="text-lg font-bold text-slate-900 dark:text-white mb-6">
                                    {ans.question?.text || "Question text not available"}
                                </p>
                                <div className="grid gap-3">
                                    {ans.question?.options.map((opt: string, optIdx: number) => (
                                        <div 
                                            key={optIdx} 
                                            className={`p-4 rounded-xl flex items-center space-x-4 border ${
                                                optIdx === ans.question.correctAnswer
                                                ? 'bg-emerald-100/50 border-emerald-200 dark:bg-emerald-900/20 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 font-bold'
                                                : optIdx === ans.selectedOption
                                                ? 'bg-rose-100/50 border-rose-200 dark:bg-rose-900/20 dark:border-rose-800 text-rose-800 dark:text-rose-300 font-bold'
                                                : 'bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800 text-slate-600 dark:text-slate-400'
                                            }`}
                                        >
                                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-black ${
                                                optIdx === ans.question.correctAnswer
                                                ? 'bg-emerald-500 text-white'
                                                : optIdx === ans.selectedOption
                                                ? 'bg-rose-500 text-white'
                                                : 'bg-slate-100 dark:bg-slate-800 text-slate-500'
                                            }`}>
                                                {String.fromCharCode(65 + optIdx)}
                                            </div>
                                            <span>{opt}</span>
                                            {optIdx === ans.question.correctAnswer && (
                                                <svg className="w-5 h-5 ml-auto text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
                                            )}
                                            {optIdx === ans.selectedOption && optIdx !== ans.question.correctAnswer && (
                                                <svg className="w-5 h-5 ml-auto text-rose-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12" /></svg>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

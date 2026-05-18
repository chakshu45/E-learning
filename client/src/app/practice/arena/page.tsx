"use client";

import { useState, useEffect, useRef, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { fetchData } from "@/utils/api";

function ArenaContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const subject = searchParams.get("subject");
    const difficulty = searchParams.get("difficulty");
    const limit = searchParams.get("questions") || "10";
    const mode = searchParams.get("mode");

    const [questions, setQuestions] = useState<any[]>([]);
    const [currentIdx, setCurrentIdx] = useState(0);
    const [answers, setAnswers] = useState<Record<number, number>>({});
    const [flagged, setFlagged] = useState<Set<number>>(new Set());
    const [loading, setLoading] = useState(true);
    const [timeLeft, setTimeLeft] = useState(parseInt(limit) * 60); // 1 min per question
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        const loadQuestions = async () => {
            try {
                const data = await fetchData("/tests/start", {
                    method: "POST",
                    body: JSON.stringify({ subject, difficulty, limit })
                });
                setQuestions(data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        loadQuestions();
    }, [subject, difficulty, limit]);

    useEffect(() => {
        if (mode === "Timed" && timeLeft > 0 && !isSubmitting) {
            const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
            return () => clearInterval(timer);
        } else if (timeLeft === 0 && !isSubmitting) {
            handleSubmit();
        }
    }, [timeLeft, mode, isSubmitting]);

    const handleAnswer = (optionIdx: number) => {
        setAnswers({ ...answers, [currentIdx]: optionIdx });
    };

    const toggleFlag = () => {
        const newFlagged = new Set(flagged);
        if (newFlagged.has(currentIdx)) newFlagged.delete(currentIdx);
        else newFlagged.add(currentIdx);
        setFlagged(newFlagged);
    };

    const handleSubmit = async () => {
        setIsSubmitting(true);
        const submissionData = {
            subject,
            difficulty,
            timeTaken: (parseInt(limit) * 60) - timeLeft,
            answers: questions.map((q, idx) => ({
                questionId: q._id,
                selectedOption: answers[idx] ?? -1
            }))
        };

        try {
            const result = await fetchData("/tests/submit", {
                method: "POST",
                body: JSON.stringify(submissionData)
            });
            router.push(`/practice/results/${result._id}`);
        } catch (err) {
            console.error(err);
            setIsSubmitting(false);
        }
    };

    const formatTime = (seconds: number) => {
        const h = Math.floor(seconds / 3600);
        const m = Math.floor((seconds % 3600) / 60);
        const s = seconds % 60;
        return `${h > 0 ? h + ":" : ""}${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    };

    if (loading) return <div className="flex items-center justify-center min-h-screen">Loading Arena...</div>;
    if (questions.length === 0) return <div className="flex items-center justify-center min-h-screen">No questions found.</div>;

    const currentQuestion = questions[currentIdx];

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col">
            {/* Header */}
            <header className="h-20 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-8 fixed top-0 w-full z-50">
                <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-indigo-600 text-white rounded-xl flex items-center justify-center font-bold">
                        {subject?.[0]}
                    </div>
                    <div>
                        <h2 className="font-black text-slate-900 dark:text-white leading-none">{subject}</h2>
                        <span className="text-xs text-slate-500 font-bold uppercase tracking-widest">{difficulty} Difficulty</span>
                    </div>
                </div>

                <div className="flex items-center space-x-8">
                    {mode === "Timed" && (
                        <div className={`flex items-center space-x-3 px-6 py-2 rounded-full border-2 ${timeLeft < 300 ? "border-rose-500 text-rose-500 animate-pulse" : "border-slate-100 dark:border-slate-800 text-slate-700 dark:text-slate-300"}`}>
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            <span className="font-mono text-xl font-black">{formatTime(timeLeft)}</span>
                        </div>
                    )}
                    <button 
                        onClick={handleSubmit}
                        className="px-8 py-3 bg-indigo-600 text-white font-black rounded-xl hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-500/20"
                    >
                        Submit Test
                    </button>
                </div>
            </header>

            <main className="flex-1 mt-20 flex flex-col lg:flex-row overflow-hidden">
                {/* Question Area */}
                <div className="flex-1 p-8 lg:p-16 overflow-y-auto">
                    <div className="max-w-3xl mx-auto">
                        <div className="mb-12 flex items-center justify-between">
                            <span className="text-sm font-black text-indigo-600 uppercase tracking-[0.2em]">Question {currentIdx + 1} of {questions.length}</span>
                            <button 
                                onClick={toggleFlag}
                                className={`flex items-center space-x-2 px-4 py-2 rounded-xl border-2 transition-all ${flagged.has(currentIdx) ? "bg-amber-50 border-amber-500 text-amber-600" : "bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800 text-slate-400"}`}
                            >
                                <svg className="w-5 h-5" fill={flagged.has(currentIdx) ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" /></svg>
                                <span className="font-bold text-xs uppercase">{flagged.has(currentIdx) ? "Flagged" : "Flag for Review"}</span>
                            </button>
                        </div>

                        <h2 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white mb-10 leading-tight">
                            {currentQuestion.text}
                        </h2>

                        <div className="space-y-4">
                            {currentQuestion.options.map((option, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => handleAnswer(idx)}
                                    className={`w-full text-left p-6 rounded-2xl border-2 transition-all flex items-center space-x-6 group ${
                                        answers[currentIdx] === idx
                                        ? "bg-indigo-50 dark:bg-indigo-900/20 border-indigo-600"
                                        : "bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800 hover:border-indigo-200"
                                    }`}
                                >
                                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black transition-all ${
                                        answers[currentIdx] === idx
                                        ? "bg-indigo-600 text-white"
                                        : "bg-slate-100 dark:bg-slate-800 text-slate-500 group-hover:bg-indigo-100"
                                    }`}>
                                        {String.fromCharCode(65 + idx)}
                                    </div>
                                    <span className={`text-lg font-bold ${answers[currentIdx] === idx ? "text-indigo-600 dark:text-indigo-400" : "text-slate-600 dark:text-slate-400"}`}>
                                        {option}
                                    </span>
                                </button>
                            ))}
                        </div>

                        <div className="mt-16 flex items-center justify-between">
                            <button 
                                onClick={() => setCurrentIdx(prev => Math.max(0, prev - 1))}
                                disabled={currentIdx === 0}
                                className="px-8 py-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl font-black text-slate-600 dark:text-slate-400 hover:bg-slate-50 transition-all disabled:opacity-30"
                            >
                                Previous
                            </button>
                            <button 
                                onClick={() => setCurrentIdx(prev => Math.min(questions.length - 1, prev + 1))}
                                disabled={currentIdx === questions.length - 1}
                                className="px-10 py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-2xl font-black hover:scale-105 transition-all disabled:opacity-30"
                            >
                                Next Question
                            </button>
                        </div>
                    </div>
                </div>

                {/* Question Navigator */}
                <aside className="w-full lg:w-80 bg-white dark:bg-slate-900 border-l border-slate-200 dark:border-slate-800 p-8">
                    <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-6">Navigation</h3>
                    <div className="grid grid-cols-5 gap-3">
                        {questions.map((_, idx) => (
                            <button
                                key={idx}
                                onClick={() => setCurrentIdx(idx)}
                                className={`w-full aspect-square rounded-xl flex items-center justify-center text-sm font-black transition-all border-2 ${
                                    currentIdx === idx
                                    ? "bg-indigo-600 border-indigo-600 text-white shadow-lg"
                                    : answers[idx] !== undefined
                                    ? "bg-indigo-50 dark:bg-indigo-900/20 border-indigo-200 text-indigo-600"
                                    : flagged.has(idx)
                                    ? "bg-amber-50 border-amber-400 text-amber-600"
                                    : "bg-transparent border-slate-100 dark:border-slate-800 text-slate-400"
                                }`}
                            >
                                {idx + 1}
                            </button>
                        ))}
                    </div>

                    <div className="mt-10 space-y-4 pt-10 border-t border-slate-100 dark:border-slate-800">
                        <div className="flex items-center justify-between text-xs font-bold uppercase tracking-widest text-slate-400">
                            <span>Attempted</span>
                            <span className="text-indigo-600">{Object.keys(answers).length}</span>
                        </div>
                        <div className="flex items-center justify-between text-xs font-bold uppercase tracking-widest text-slate-400">
                            <span>Flagged</span>
                            <span className="text-amber-500">{flagged.size}</span>
                        </div>
                        <div className="flex items-center justify-between text-xs font-bold uppercase tracking-widest text-slate-400">
                            <span>Remaining</span>
                            <span>{questions.length - Object.keys(answers).length}</span>
                        </div>
                    </div>
                </aside>
            </main>
        </div>
    );
}

export default function ArenaPage() {
    return (
        <Suspense fallback={<div>Loading Arena...</div>}>
            <ArenaContent />
        </Suspense>
    );
}

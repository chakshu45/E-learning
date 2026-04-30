"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const quizCategories = [
    { id: "java", title: "Java Foundations", icon: "☕", questionsCount: 15, difficulty: "Beginner" },
    { id: "dsa", title: "DSA Mock Test", icon: "📊", questionsCount: 20, difficulty: "Hard" },
    { id: "devops", title: "Cloud & DevOps", icon: "☁️", questionsCount: 12, difficulty: "Intermediate" },
    { id: "oops", title: "OOPs Principles", icon: "🧩", questionsCount: 10, difficulty: "Medium" }
];

const mockQuestions: Record<string, any[]> = {
    java: [
        {
            question: "Which of these is NOT a primitive data type in Java?",
            options: ["int", "double", "String", "boolean"],
            correct: 2
        },
        {
            question: "What is the default value of a local variable in Java?",
            options: ["0", "null", "No default value", "Depends on type"],
            correct: 2
        }
    ],
    dsa: [
        {
            question: "What is the time complexity of searching in a balanced Binary Search Tree?",
            options: ["O(1)", "O(n)", "O(log n)", "O(n log n)"],
            correct: 2
        }
    ]
};

export default function PracticePage() {
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
    const [score, setScore] = useState(0);
    const [quizStarted, setQuizStarted] = useState(false);
    const [quizFinished, setQuizFinished] = useState(false);
    const [timeLeft, setTimeLeft] = useState(60);

    const questions = selectedCategory ? mockQuestions[selectedCategory] || [] : [];

    useEffect(() => {
        let timer: any;
        if (quizStarted && !quizFinished && timeLeft > 0) {
            timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
        } else if (timeLeft === 0) {
            setQuizFinished(true);
        }
        return () => clearInterval(timer);
    }, [quizStarted, quizFinished, timeLeft]);

    const handleAnswer = (idx: number) => {
        if (idx === questions[currentQuestionIdx].correct) {
            setScore(prev => prev + 1);
        }

        if (currentQuestionIdx < questions.length - 1) {
            setCurrentQuestionIdx(prev => prev + 1);
        } else {
            setQuizFinished(true);
        }
    };

    const startQuiz = (id: string) => {
        setSelectedCategory(id);
        setQuizStarted(true);
        setCurrentQuestionIdx(0);
        setScore(0);
        setQuizFinished(false);
        setTimeLeft(60);
    };

    return (
        <div className="min-h-screen pt-32 pb-20 bg-slate-50 dark:bg-slate-950">
            <div className="max-w-5xl mx-auto px-4">
                {!quizStarted ? (
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                        <header className="text-center mb-16">
                            <h1 className="text-5xl font-black text-slate-900 dark:text-white mb-6">
                                Practice <span className="text-gradient">Arena</span>
                            </h1>
                            <p className="text-xl text-slate-600 dark:text-slate-400">
                                Test your knowledge with our premium mock tests and subject quizzes.
                            </p>
                        </header>

                        <div className="grid md:grid-cols-2 gap-8">
                            {quizCategories.map(cat => (
                                <button
                                    key={cat.id}
                                    onClick={() => startQuiz(cat.id)}
                                    className="premium-card text-left group hover:border-indigo-600 transition-all"
                                >
                                    <div className="flex items-center space-x-6">
                                        <div className="w-16 h-16 bg-indigo-50 dark:bg-indigo-900/30 rounded-2xl flex items-center justify-center text-3xl group-hover:scale-110 transition-transform">
                                            {cat.icon}
                                        </div>
                                        <div>
                                            <h3 className="text-2xl font-bold text-slate-900 dark:text-white">{cat.title}</h3>
                                            <p className="text-slate-500 dark:text-slate-400 font-medium">
                                                {cat.questionsCount} Questions • {cat.difficulty}
                                            </p>
                                        </div>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </motion.div>
                ) : quizFinished ? (
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }} 
                        animate={{ opacity: 1, scale: 1 }}
                        className="premium-card text-center py-20"
                    >
                        <div className="w-24 h-24 bg-amber-400 rounded-full flex items-center justify-center mx-auto mb-8 shadow-xl shadow-amber-500/20">
                            <svg className="w-12 h-12 text-amber-900" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <h2 className="text-4xl font-black text-slate-900 dark:text-white mb-4">Quiz Completed!</h2>
                        <p className="text-2xl text-slate-500 dark:text-slate-400 mb-12">
                            Your Score: <span className="text-indigo-600 font-black">{score}/{questions.length}</span>
                        </p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <button 
                                onClick={() => setQuizStarted(false)}
                                className="px-10 py-4 bg-indigo-600 text-white font-bold rounded-2xl hover:bg-indigo-700 shadow-xl shadow-indigo-500/20 transition-all"
                            >
                                Try Another Quiz
                            </button>
                            <Link href="/courses" className="px-10 py-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white font-bold rounded-2xl hover:bg-slate-50 transition-all">
                                Back to Learning
                            </Link>
                        </div>
                    </motion.div>
                ) : (
                    <div className="max-w-3xl mx-auto">
                        {/* Quiz Header */}
                        <div className="flex items-center justify-between mb-12">
                            <div className="flex items-center space-x-4">
                                <button onClick={() => setQuizStarted(false)} className="text-slate-400 hover:text-slate-600 transition-colors">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                    </svg>
                                </button>
                                <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                                    {quizCategories.find(c => c.id === selectedCategory)?.title}
                                </h2>
                            </div>
                            <div className="px-6 py-2 bg-rose-50 dark:bg-rose-900/20 text-rose-600 font-black rounded-xl">
                                {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
                            </div>
                        </div>

                        {/* Progress Bar */}
                        <div className="w-full bg-slate-200 dark:bg-slate-800 h-3 rounded-full mb-12 overflow-hidden">
                            <motion.div 
                                className="bg-indigo-600 h-full"
                                initial={{ width: 0 }}
                                animate={{ width: `${((currentQuestionIdx + 1) / questions.length) * 100}%` }}
                            />
                        </div>

                        {/* Question Card */}
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentQuestionIdx}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="premium-card p-12"
                            >
                                <span className="text-xs font-black uppercase tracking-widest text-indigo-600 mb-4 block">
                                    Question {currentQuestionIdx + 1} of {questions.length}
                                </span>
                                <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-10 leading-tight">
                                    {questions[currentQuestionIdx].question}
                                </h3>
                                <div className="space-y-4">
                                    {questions[currentQuestionIdx].options.map((option: string, i: number) => (
                                        <button
                                            key={i}
                                            onClick={() => handleAnswer(i)}
                                            className="w-full text-left p-6 rounded-2xl border border-slate-200 dark:border-slate-800 text-lg font-medium text-slate-600 dark:text-slate-300 hover:border-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-900/10 transition-all flex justify-between items-center group"
                                        >
                                            <span>{option}</span>
                                            <div className="w-6 h-6 rounded-full border-2 border-slate-200 group-hover:border-indigo-600 transition-colors"></div>
                                        </button>
                                    ))}
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                )}
            </div>
        </div>
    );
}

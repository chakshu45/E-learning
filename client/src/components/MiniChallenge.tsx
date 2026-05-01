"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Challenge {
    type: 'typing' | 'drag-drop';
    question: string;
    codeTemplate?: string;
    correctAnswer: string;
    options?: string[];
}

interface MiniChallengeProps {
    challenge: Challenge;
    onComplete: () => void;
}

export default function MiniChallenge({ challenge, onComplete }: MiniChallengeProps) {
    const [userInput, setUserInput] = useState('');
    const [isError, setIsError] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const handleSubmit = () => {
        if (userInput.trim() === challenge.correctAnswer.trim()) {
            setIsSuccess(true);
            setTimeout(() => {
                onComplete();
            }, 1500);
        } else {
            setIsError(true);
            setTimeout(() => setIsError(false), 500);
        }
    };

    return (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-slate-900/90 backdrop-blur-md"
        >
            <motion.div 
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                className="w-full max-w-lg bg-white dark:bg-slate-800 rounded-[2.5rem] p-8 shadow-2xl border border-slate-200 dark:border-slate-700 overflow-hidden relative"
            >
                {/* Success Overlay */}
                <AnimatePresence>
                    {isSuccess && (
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="absolute inset-0 z-10 bg-indigo-600 flex flex-col items-center justify-center text-white"
                        >
                            <motion.div 
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mb-4"
                            >
                                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                </svg>
                            </motion.div>
                            <h2 className="text-2xl font-black">Brilliant!</h2>
                            <p className="text-indigo-100">Proceeding to next lesson...</p>
                        </motion.div>
                    )}
                </AnimatePresence>

                <div className="text-center mb-8">
                    <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                    </div>
                    <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-2">Mini Challenge</h2>
                    <p className="text-slate-500 dark:text-slate-400 font-medium">{challenge.question}</p>
                </div>

                {challenge.type === 'typing' && (
                    <motion.div 
                        animate={isError ? { x: [-10, 10, -10, 10, 0] } : {}}
                        className="space-y-4"
                    >
                        <div className="relative">
                            <textarea 
                                value={userInput}
                                onChange={(e) => setUserInput(e.target.value)}
                                className={`w-full h-32 p-6 bg-slate-50 dark:bg-slate-900 border-2 rounded-3xl outline-none font-mono text-sm transition-colors ${
                                    isError ? 'border-rose-500' : 'border-slate-100 dark:border-slate-700 focus:border-indigo-500'
                                }`}
                                placeholder={challenge.codeTemplate}
                            />
                            {isError && (
                                <p className="text-rose-500 text-xs font-bold mt-2 ml-2">That's not quite right. Try again!</p>
                            )}
                        </div>

                        <button 
                            onClick={handleSubmit}
                            className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-bold text-lg hover:bg-indigo-700 shadow-xl shadow-indigo-500/20 transition-all active:scale-95"
                        >
                            Verify Solution
                        </button>
                    </motion.div>
                )}

                {/* For drag-drop we can implement a simple version or a more complex one */}
                {challenge.type === 'drag-drop' && (
                    <div className="text-center py-10">
                        <p className="text-slate-500">Drag & Drop coming soon in v2!</p>
                        <button onClick={onComplete} className="mt-4 text-indigo-600 font-bold">Skip for now</button>
                    </div>
                )}

                <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-700 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Active Learning</span>
                    <button 
                        onClick={onComplete}
                        className="text-xs font-bold text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
                    >
                        I'll do this later
                    </button>
                </div>
            </motion.div>
        </motion.div>
    );
}

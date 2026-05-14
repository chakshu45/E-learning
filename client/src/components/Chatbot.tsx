"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Chatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { role: "assistant", content: "Hi! I'm SkyAI. How can I help you with your learning journey today?" }
    ]);
    const [input, setInput] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, isTyping]);

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMessage = { role: "user", content: input };
        setMessages(prev => [...prev, userMessage]);
        setInput("");
        setIsTyping(true);

        try {
            const response = await fetch("http://localhost:5000/api/chat", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ message: input, history: messages }),
            });

            if (!response.ok) throw new Error("Failed to reach SkyAI");

            const data = await response.json();
            setMessages(prev => [...prev, { role: "assistant", content: data.reply }]);
        } catch (error) {
            console.error("Chat Error:", error);
            setMessages(prev => [...prev, { role: "assistant", content: "I'm sorry, I'm having trouble connecting right now. Please try again later." }]);
        } finally {
            setIsTyping(false);
        }
    };

    return (
        <div className="fixed bottom-8 right-8 z-[100]">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        className="mb-4 w-96 h-[500px] bg-white dark:bg-slate-900 rounded-[2rem] shadow-2xl border border-slate-200 dark:border-slate-800 flex flex-col overflow-hidden"
                    >
                        {/* Header */}
                        <div className="p-6 bg-indigo-600 text-white flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="font-bold">SkyAI Assistant</h3>
                                    <p className="text-xs text-indigo-100">Always online to help</p>
                                </div>
                            </div>
                            <button onClick={() => setIsOpen(false)} className="hover:bg-white/10 p-2 rounded-lg">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        {/* Messages */}
                        <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-4">
                            {messages.map((msg, i) => (
                                <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                                    <div className={`max-w-[80%] p-4 rounded-2xl text-sm ${
                                        msg.role === "user" 
                                        ? "bg-indigo-600 text-white rounded-tr-none" 
                                        : "bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-tl-none"
                                    }`}>
                                        {msg.content}
                                    </div>
                                </div>
                            ))}
                            {isTyping && (
                                <div className="flex justify-start">
                                    <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-2xl rounded-tl-none">
                                        <div className="flex space-x-1">
                                            <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce"></div>
                                            <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce delay-100"></div>
                                            <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce delay-200"></div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Input */}
                        <div className="p-4 border-t border-slate-100 dark:border-slate-800">
                            <div className="relative">
                                <input
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyPress={(e) => e.key === "Enter" && handleSend()}
                                    placeholder="Ask anything..."
                                    className="w-full pl-4 pr-12 py-3 bg-slate-50 dark:bg-slate-800 border-none rounded-xl focus:ring-2 focus:ring-indigo-500 text-sm dark:text-white"
                                />
                                <button 
                                    onClick={handleSend}
                                    className="absolute right-2 top-1.5 p-1.5 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                                >
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Toggle Button */}
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(!isOpen)}
                className="w-16 h-16 bg-indigo-600 text-white rounded-2xl shadow-2xl flex items-center justify-center hover:bg-indigo-700 transition-all btn-glow"
            >
                {isOpen ? (
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                ) : (
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                    </svg>
                )}
            </motion.button>
        </div>
    );
};

export default Chatbot;

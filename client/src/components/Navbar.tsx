"use client";

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [theme, setTheme] = useState<'light' | 'dark'>('light');
    const { user, logout } = useAuth();

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
        const initialTheme = savedTheme || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
        setTheme(initialTheme);
        document.documentElement.classList.toggle('dark', initialTheme === 'dark');
    }, []);

    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
        document.documentElement.classList.toggle('dark', newTheme === 'dark');
    };

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: "Courses", href: "/courses" },
        { name: "Study Material", href: "/subjects" },
        { name: "Practice", href: "/practice" },
        { name: "Dashboard", href: "/dashboard" }
    ];

    return (
        <motion.nav 
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            className={`fixed w-full z-50 top-0 left-0 transition-all duration-500 ${
                scrolled 
                ? "py-3 bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl border-b border-slate-200/50 dark:border-slate-800/50 shadow-sm" 
                : "py-5 bg-transparent"
            }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center">
                    <div className="flex items-center">
                        <Link href="/" className="flex items-center space-x-3 group">
                            <motion.div 
                                whileHover={{ rotate: 12, scale: 1.1 }}
                                className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/30"
                            >
                                <span className="text-white font-black text-2xl">S</span>
                            </motion.div>
                            <span className="text-2xl font-black tracking-tight text-gradient">
                                LearnWithSky
                            </span>
                        </Link>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-8">
                        {navLinks.map((link, i) => (
                            <motion.div
                                key={link.name}
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                            >
                                <Link 
                                    href={link.href} 
                                    className="relative text-sm font-bold text-slate-600 dark:text-slate-300 hover:text-indigo-600 transition-colors group"
                                >
                                    {link.name}
                                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-indigo-600 transition-all duration-300 group-hover:w-full"></span>
                                </Link>
                            </motion.div>
                        ))}

                        <div className="h-6 w-px bg-slate-200 dark:bg-slate-800"></div>
                        
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.5 }}
                            className="flex items-center space-x-6"
                        >
                            {user ? (
                                <div className="flex items-center space-x-6">
                                    <span className="text-sm font-bold text-slate-900 dark:text-white">Hi, {user.name.split(' ')[0]}</span>
                                    <button 
                                        onClick={logout}
                                        className="text-sm font-bold text-rose-500 hover:text-rose-600 transition-all"
                                    >
                                        Logout
                                    </button>
                                </div>
                            ) : (
                                <>
                                    <Link href="/login" className="text-sm font-bold text-slate-900 dark:text-white hover:text-indigo-600 transition-all">Login</Link>
                                    <Link href="/register" className="px-8 py-3 bg-indigo-600 text-white text-sm font-bold rounded-2xl hover:bg-indigo-700 shadow-xl shadow-indigo-500/20 transition-all transform hover:scale-105 btn-glow">
                                        Join Free
                                    </Link>
                                </>
                            )}

                            {/* Theme Toggle */}
                            <button
                                onClick={toggleTheme}
                                className="w-10 h-10 flex items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 transition-all"
                            >
                                {theme === 'light' ? (
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
                                ) : (
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707M14 12a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                                )}
                            </button>
                        </motion.div>
                    </div>

                    {/* Mobile Button */}
                    <div className="md:hidden flex items-center">
                        <button onClick={() => setIsOpen(!isOpen)} className="text-slate-600 dark:text-slate-300 focus:outline-none">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                {isOpen ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 overflow-hidden"
                    >
                        <div className="px-4 pt-4 pb-6 space-y-2">
                            {navLinks.map((link) => (
                                <Link 
                                    key={link.name}
                                    href={link.href} 
                                    className="block px-4 py-3 text-slate-600 dark:text-slate-300 hover:bg-indigo-50 hover:text-indigo-600 rounded-xl transition-all font-bold"
                                    onClick={() => setIsOpen(false)}
                                >
                                    {link.name}
                                </Link>
                            ))}
                            <div className="pt-4 flex flex-col space-y-3">
                                {user ? (
                                    <>
                                        <div className="px-4 py-3 text-slate-900 dark:text-white font-bold">Hi, {user.name}</div>
                                        <button 
                                            onClick={() => { logout(); setIsOpen(false); }}
                                            className="px-4 py-3 text-rose-500 font-bold border border-rose-100 rounded-xl"
                                        >
                                            Logout
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <Link href="/login" className="px-4 py-3 text-center text-indigo-600 font-bold border border-indigo-100 rounded-xl">Login</Link>
                                        <Link href="/register" className="px-4 py-3 bg-indigo-600 text-white rounded-xl text-center font-bold shadow-lg shadow-indigo-500/20">Join Free</Link>
                                    </>
                                )}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
};

export default Navbar;

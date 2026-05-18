import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { fetchData } from '@/utils/api';
import { motion, AnimatePresence } from 'framer-motion';

const programsData: Record<string, { title: string; href: string }[]> = {
    "Development": [
        { title: "The Complete Web Development Bootcamp", href: "#" },
        { title: "Machine Learning A-Z™: AI, Python & R", href: "#" },
        { title: "100 Days of Code: The Complete Python Pro Bootcamp", href: "#" },
        { title: "The Web Developer Bootcamp 2026", href: "#" },
        { title: "Java Programming Masterclass for Software Developers", href: "#" },
        { title: "React - The Complete Guide (incl Hooks, React Router, Redux)", href: "#" },
        { title: "Next.js 16 & React - The Complete Guide", href: "#" }
    ],
    "Business": [
        { title: "The Complete SQL Bootcamp: Go from Zero to Hero", href: "#" },
        { title: "PMP Certification Exam Prep Course", href: "#" },
        { title: "An Entire MBA in 1 Course by Award Winning Professor", href: "#" },
        { title: "Tableau 2024 A-Z: Hands-On Tableau Training", href: "#" },
        { title: "Agile Crash Course: Agile Project Management", href: "#" }
    ],
    "IT & Software": [
        { title: "AWS Certified Solutions Architect - Associate", href: "#" },
        { title: "CompTIA A+ (220-1101) Core 1 Study Guide", href: "#" },
        { title: "The Complete Networking Fundamentals Course (CCNA)", href: "#" },
        { title: "Docker Technologies for DevOps and Developers", href: "#" },
        { title: "Kubernetes for the Absolute Beginners - Hands-on", href: "#" }
    ],
    "Design": [
        { title: "Ultimate Adobe Photoshop Training: From Beginner to Pro", href: "#" },
        { title: "User Experience Design Essentials - Adobe XD UI UX", href: "#" },
        { title: "Complete Blender Creator: Learn 3D Modelling", href: "#" },
        { title: "Graphic Design Masterclass - Learn GREAT Design", href: "#" }
    ],
    "Marketing": [
        { title: "The Complete Digital Marketing Course - 12 Courses in 1", href: "#" },
        { title: "Ultimate Google Ads Training 2024", href: "#" },
        { title: "Social Media Marketing Mastery", href: "#" },
        { title: "Facebook Ads & Facebook Marketing Mastery Guide", href: "#" }
    ],
    "Finance & Accounting": [
        { title: "The Complete Financial Analyst Course 2024", href: "#" },
        { title: "Stock Market Trading: The Complete Technical Analysis", href: "#" },
        { title: "Accounting & Financial Statement Analysis for Beginners", href: "#" }
    ],
    "Office Productivity": [
        { title: "Microsoft Excel - Excel from Beginner to Advanced", href: "#" },
        { title: "Master Microsoft Excel Macros and VBA", href: "#" },
        { title: "Google Sheets - The Comprehensive Masterclass", href: "#" }
    ]
};

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [theme, setTheme] = useState<'light' | 'dark'>('light');
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    
    // Mega menu state
    const [megaMenuOpen, setMegaMenuOpen] = useState(false);
    const [activeCategory, setActiveCategory] = useState("Development");

    const handleMegaMenuEnroll = async (programTitle: string) => {
        setMegaMenuOpen(false); // Close menu
        
        if (!user) {
            navigate('/login');
            return;
        }
        
        try {
            const courses = await fetchData('/courses');
            if (courses && courses.length > 0) {
                const match = courses.find((c: any) => 
                    programTitle.toLowerCase().includes(c.title.toLowerCase().split(' ')[0]) ||
                    c.title.toLowerCase().includes(programTitle.toLowerCase().split(' ')[0])
                );

                const courseId = match ? match._id : courses[0]._id;
                
                // Fast Track: Auto-enroll the user if they aren't already
                try {
                    await fetchData('/enroll', {
                        method: 'POST',
                        body: JSON.stringify({ courseId })
                    });
                } catch (err: any) {
                    // Ignore "already enrolled" error and just proceed
                    if (!err.message.includes('Already enrolled')) {
                        console.error("Enrollment error:", err);
                    }
                }

                // Redirect directly to the playback area to show videos and notes
                navigate(`/courses/${courseId}/play`);
            } else {
                alert("No courses available right now.");
            }
        } catch (error) {
            console.error(error);
        }
    };

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
        { name: "Dashboard", href: "/dashboard" }
    ];

    return (
        <motion.nav 
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            className={`fixed w-full z-50 top-0 left-0 transition-all duration-700 ${
                scrolled 
                ? "py-3 deep-glass border-b border-white/20 dark:border-white/5 shadow-2xl shadow-indigo-500/5" 
                : "py-6 bg-transparent"
            }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center">
                    <div className="flex items-center">
                        <Link to="/" className="flex items-center space-x-3 group">
                            <motion.div 
                                whileHover={{ rotate: 12, scale: 1.1 }}
                                className="w-11 h-11 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-500/30"
                            >
                                <span className="text-white font-black text-2xl">S</span>
                            </motion.div>
                            <span className="text-2xl font-black tracking-tighter text-gradient">
                                LearnWithSky
                            </span>
                        </Link>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-1">
                        {/* Programs Mega Menu Trigger */}
                        <div 
                            className="relative mr-4"
                            onMouseEnter={() => setMegaMenuOpen(true)}
                            onMouseLeave={() => setMegaMenuOpen(false)}
                        >
                            <button className="flex items-center space-x-2 px-5 py-2.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-2xl font-black text-sm hover:scale-105 active:scale-95 transition-all shadow-xl shadow-slate-900/10 dark:shadow-white/5">
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>
                                <span>Programs</span>
                            </button>

                            {/* Mega Menu Dropdown */}
                            <AnimatePresence>
                                {megaMenuOpen && (
                                    <motion.div 
                                        initial={{ opacity: 0, y: 15, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: 15, scale: 0.95 }}
                                        transition={{ type: "spring", stiffness: 200, damping: 20 }}
                                        className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-[900px] deep-glass rounded-[2rem] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.3)] border border-white/20 dark:border-white/10 flex overflow-hidden z-50 cursor-default glass-border"
                                    >
                                        {/* Left Sidebar */}
                                        <div className="w-1/3 bg-white/40 dark:bg-slate-900/40 border-r border-white/20 dark:border-white/10 py-6 flex flex-col h-[550px] overflow-y-auto custom-scrollbar">
                                            {Object.keys(programsData).map((category) => (
                                                <button
                                                    key={category}
                                                    onMouseEnter={() => setActiveCategory(category)}
                                                    className={`text-left px-8 py-4 text-sm font-black transition-all ${
                                                        activeCategory === category 
                                                        ? "text-indigo-600 dark:text-indigo-400 bg-white/50 dark:bg-slate-800/50 scale-105" 
                                                        : "text-slate-600 dark:text-slate-400 hover:text-indigo-500"
                                                    }`}
                                                >
                                                    {category}
                                                </button>
                                            ))}
                                        </div>

                                        {/* Right Content Area */}
                                        <div className="w-2/3 p-8 bg-transparent h-[550px] overflow-y-auto custom-scrollbar">
                                            <div className="grid grid-cols-2 gap-6">
                                                {programsData[activeCategory]?.map((item, idx) => (
                                                    <motion.div 
                                                        key={idx} 
                                                        initial={{ opacity: 0, y: 10 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        transition={{ delay: idx * 0.05 }}
                                                        className="group premium-card p-5 hover:border-indigo-500/50 flex flex-col justify-between h-full"
                                                    >
                                                        <div className="flex items-start space-x-4 mb-6">
                                                            <div className="w-12 h-12 rounded-2xl bg-indigo-100 dark:bg-indigo-900/30 flex-shrink-0 flex items-center justify-center text-indigo-600">
                                                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                                                            </div>
                                                            <h4 className="font-black text-sm text-slate-900 dark:text-white leading-tight group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                                                                {item.title}
                                                            </h4>
                                                        </div>
                                                        <button 
                                                            onClick={() => handleMegaMenuEnroll(item.title)} 
                                                            className="w-full text-center py-3 bg-indigo-600 text-white rounded-xl text-xs font-black hover:bg-indigo-500 transition-all active:scale-95 shadow-lg shadow-indigo-600/20"
                                                        >
                                                            Fast Track Enroll
                                                        </button>
                                                    </motion.div>
                                                ))}
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {navLinks.map((link, i) => (
                            <motion.div
                                key={link.name}
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className="relative px-4 py-2"
                            >
                                <Link 
                                    to={link.href} 
                                    className="relative z-10 text-sm font-black text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors peer"
                                >
                                    {link.name}
                                </Link>
                                <motion.div 
                                    className="absolute inset-0 bg-indigo-100 dark:bg-indigo-900/30 rounded-xl opacity-0 peer-hover:opacity-100 transition-opacity -z-0"
                                    layoutId="nav-hover"
                                />
                            </motion.div>
                        ))}

                        <div className="h-6 w-px bg-slate-200 dark:bg-slate-800 mx-4"></div>
                        
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.5 }}
                            className="flex items-center space-x-6"
                        >
                            {user ? (
                                <div className="flex items-center space-x-6">
                                    <span className="text-sm font-black text-slate-900 dark:text-white">Hi, {user.name.split(' ')[0]}</span>
                                    <button 
                                        onClick={logout}
                                        className="text-sm font-black text-rose-500 hover:text-rose-600 transition-all"
                                    >
                                        Logout
                                    </button>
                                </div>
                            ) : (
                                <>
                                    <Link to="/login" className="text-sm font-black text-slate-900 dark:text-white hover:text-indigo-600 transition-all">Login</Link>
                                    <Link to="/register" className="px-8 py-3 bg-indigo-600 text-white text-sm font-black rounded-[1.2rem] hover:bg-indigo-700 shadow-xl shadow-indigo-500/30 transition-all transform hover:scale-105 active:scale-95">
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
                                    to={link.href} 
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
                                        <Link to="/login" className="px-4 py-3 text-center text-indigo-600 font-bold border border-indigo-100 rounded-xl">Login</Link>
                                        <Link to="/register" className="px-4 py-3 bg-indigo-600 text-white rounded-xl text-center font-bold shadow-lg shadow-indigo-500/20">Join Free</Link>
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

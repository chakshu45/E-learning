import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { fetchData } from '@/utils/api';
import { motion } from 'framer-motion';

export default function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { login, user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (user) navigate('/dashboard');
    }, [user, navigate]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const data = await fetchData('/auth/register', {
                method: 'POST',
                body: JSON.stringify({ name, email, password }),
            });
            login(data);
            navigate('/dashboard');
        } catch (error: any) {
            console.error("Registration Error:", error);
            alert(error.message || "Failed to create account. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
            {/* Background dynamic elements */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                <motion.div 
                    animate={{ x: [0, -50, 0], y: [0, -30, 0] }}
                    transition={{ duration: 22, repeat: Infinity }}
                    className="absolute top-[-5%] left-[-5%] w-[550px] h-[550px] bg-indigo-500/10 blur-[130px] rounded-full"
                />
                <motion.div 
                    animate={{ x: [0, 60, 0], y: [0, -40, 0] }}
                    transition={{ duration: 18, repeat: Infinity }}
                    className="absolute bottom-[-5%] right-[-5%] w-[500px] h-[500px] bg-rose-500/10 blur-[140px] rounded-full"
                />
            </div>

            <motion.div 
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ type: "spring", stiffness: 100, damping: 20 }}
                className="w-full max-w-md relative z-10"
            >
                <div className="deep-glass p-10 rounded-[3rem] glass-border shadow-2xl">
                    <div className="text-center mb-10">
                        <motion.div 
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", delay: 0.2 }}
                            className="w-20 h-20 bg-indigo-600 rounded-3xl mx-auto mb-6 flex items-center justify-center shadow-xl shadow-indigo-500/30"
                        >
                            <span className="text-white font-black text-4xl">S</span>
                        </motion.div>
                        <h2 className="text-4xl font-black text-slate-900 dark:text-white mb-3 tracking-tight">Join the Elite</h2>
                        <p className="text-slate-500 dark:text-slate-400 font-medium">Start your cinematic learning journey.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <label className="block text-xs font-black text-slate-400 uppercase tracking-widest ml-4">Full Name</label>
                            <input 
                                type="text" 
                                className="w-full px-6 py-4 rounded-2xl bg-white/50 dark:bg-slate-900/50 border-2 border-transparent focus:border-indigo-500 dark:focus:border-indigo-500 outline-none transition-all font-medium text-slate-900 dark:text-white"
                                placeholder="John Doe"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="block text-xs font-black text-slate-400 uppercase tracking-widest ml-4">Email Address</label>
                            <input 
                                type="email" 
                                className="w-full px-6 py-4 rounded-2xl bg-white/50 dark:bg-slate-900/50 border-2 border-transparent focus:border-indigo-500 dark:focus:border-indigo-500 outline-none transition-all font-medium text-slate-900 dark:text-white"
                                placeholder="name@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="block text-xs font-black text-slate-400 uppercase tracking-widest ml-4">Password</label>
                            <input 
                                type="password" 
                                className="w-full px-6 py-4 rounded-2xl bg-white/50 dark:bg-slate-900/50 border-2 border-transparent focus:border-indigo-500 dark:focus:border-indigo-500 outline-none transition-all font-medium text-slate-900 dark:text-white"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>

                        <button 
                            type="submit" 
                            disabled={isLoading}
                            className="w-full relative py-5 bg-indigo-600 text-white rounded-2xl font-black text-xl overflow-hidden shadow-2xl shadow-indigo-500/30 transition-all hover:scale-[1.02] active:scale-[0.98] group"
                        >
                            <span className="relative z-10">{isLoading ? "Creating account..." : "Sign Up"}</span>
                            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-violet-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        </button>
                    </form>

                    <div className="mt-10 text-center">
                        <p className="text-slate-600 dark:text-slate-400 font-medium">
                            Already have an account? <Link to="/login" className="text-indigo-600 font-bold hover:underline">Log in here</Link>
                        </p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}

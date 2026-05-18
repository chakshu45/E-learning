import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { fetchData } from "@/utils/api";
import { useAuth } from "@/context/AuthContext";
import { motion } from "framer-motion";

export default function CourseDetail() {
    const { id } = useParams();
    const { user } = useAuth();
    const navigate = useNavigate();
    const [course, setCourse] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getCourse = async () => {
            try {
                const data = await fetchData(`/courses/${id}`);
                setCourse(data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        getCourse();
    }, [id]);

    const handleEnroll = async () => {
        if (!user) {
            navigate('/login');
            return;
        }

        try {
            const data = await fetchData('/payments/create-checkout-session', {
                method: 'POST',
                body: JSON.stringify({ courseId: id }),
            });
            
            if (data.url) {
                window.location.href = data.url;
            } else {
                throw new Error('Could not initiate payment');
            }
        } catch (error: any) {
            alert(error.message || 'Error occurred during checkout');
        }
    };

    if (loading) return (
        <div className="flex justify-center items-center min-h-screen bg-slate-50 dark:bg-slate-950">
            <div className="relative w-20 h-20">
                <div className="absolute inset-0 border-4 border-indigo-200 dark:border-slate-800 rounded-full"></div>
                <div className="absolute inset-0 border-4 border-indigo-600 rounded-full border-t-transparent animate-spin"></div>
            </div>
        </div>
    );

    if (!course) return <div className="text-center py-20 text-slate-500">Course not found.</div>;

    return (
        <div className="bg-[#fdfdff] dark:bg-slate-950 min-h-screen">
            {/* Header / Hero */}
            <div className="relative overflow-hidden bg-slate-950 text-white py-24 md:py-32">
                <div className="absolute top-0 left-0 w-full h-full">
                    <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-indigo-600/20 blur-[150px] rounded-full"></div>
                    <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-fuchsia-600/20 blur-[120px] rounded-full"></div>
                </div>

                <div className="max-w-7xl mx-auto px-4 relative z-10 grid md:grid-cols-2 gap-16 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <nav className="inline-flex items-center space-x-2 px-4 py-1.5 mb-8 text-xs font-black tracking-widest text-indigo-400 uppercase bg-white/5 border border-white/10 rounded-full">
                            <span>{course.category}</span>
                            <span className="text-white/20">•</span>
                            <span>{course.level}</span>
                        </nav>
                        <h1 className="text-5xl md:text-7xl font-black mb-8 leading-[0.9] tracking-tight">
                            {course.title}
                        </h1>
                        <p className="text-xl md:text-2xl text-slate-400 mb-10 leading-relaxed font-medium">
                            {course.subtitle}
                        </p>
                        <div className="flex items-center space-x-8">
                            <div className="flex items-center space-x-3 bg-white/5 px-4 py-2 rounded-2xl border border-white/10">
                                <span className="text-amber-400 font-black text-2xl">{course.rating}</span>
                                <div className="flex">
                                    {[...Array(5)].map((_, i) => (
                                        <svg key={i} className={`w-5 h-5 ${i < Math.floor(course.rating) ? 'text-amber-400' : 'text-white/10'}`} fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                    ))}
                                </div>
                            </div>
                            <span className="text-slate-500 font-bold uppercase tracking-widest text-sm">{course.numReviews || 0} Students Enrolled</span>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="relative group"
                    >
                        <div className="absolute -inset-4 bg-gradient-to-r from-indigo-600 via-violet-600 to-fuchsia-600 rounded-[3rem] blur-2xl opacity-20 group-hover:opacity-40 transition duration-1000"></div>
                        <div className="relative glass-panel rounded-[2.5rem] overflow-hidden border border-white/10 p-8 shadow-2xl">
                            <img src={course.thumbnail || "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800"} alt="Course" className="rounded-2xl mb-8 aspect-video object-cover" />
                            <div className="flex items-end justify-between mb-10">
                                <div>
                                    <span className="block text-slate-400 text-sm font-black uppercase tracking-widest mb-1">Lifetime Access</span>
                                    <span className="text-6xl font-black">₹{course.price}</span>
                                </div>
                                {course.originalPrice && (
                                    <span className="text-slate-500 line-through text-2xl font-bold mb-1">₹{course.originalPrice}</span>
                                )}
                            </div>

                            <button 
                                onClick={handleEnroll}
                                className="w-full relative px-8 py-6 bg-indigo-600 text-white rounded-[2rem] font-black text-2xl overflow-hidden shadow-2xl shadow-indigo-500/40 transition-all hover:scale-[1.02] active:scale-[0.98] group/btn"
                            >
                                <span className="relative z-10">Enroll Now</span>
                                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-violet-500 opacity-0 group-hover/btn:opacity-100 transition-opacity"></div>
                            </button>
                            <div className="mt-6 flex items-center justify-center space-x-4 text-slate-500 font-medium">
                                <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                                <span>30-Day Money-Back Guarantee</span>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Content Section */}
            <div className="max-w-7xl mx-auto px-4 py-32 grid md:grid-cols-3 gap-24">
                <div className="md:col-span-2">
                    <motion.section 
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mb-24"
                    >
                        <h2 className="text-4xl font-black mb-10 text-slate-900 dark:text-white flex items-center">
                            <span className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900/30 rounded-2xl flex items-center justify-center text-indigo-600 mr-4">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
                            </span>
                            What you'll learn
                        </h2>
                        <div className="premium-card bg-white dark:bg-slate-900/50 backdrop-blur-sm border-slate-100 dark:border-slate-800">
                            <p className="text-xl text-slate-600 dark:text-slate-400 whitespace-pre-line leading-relaxed font-medium">
                                {course.description}
                            </p>
                        </div>
                    </motion.section>
                </div>
                
                <div className="space-y-8">
                    <div className="glass-panel rounded-[2rem] p-8 border-slate-100 dark:border-slate-800">
                        <h3 className="text-2xl font-black mb-6 text-slate-900 dark:text-white">This course includes:</h3>
                        <ul className="space-y-4">
                            {[
                                "25 hours on-demand video",
                                "12 coding exercises",
                                "Full lifetime access",
                                "Access on mobile and TV",
                                "Certificate of completion"
                            ].map((item, i) => (
                                <li key={i} className="flex items-center text-slate-600 dark:text-slate-400 font-medium">
                                    <svg className="w-5 h-5 text-indigo-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

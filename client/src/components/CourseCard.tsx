import { Link } from 'react-router-dom';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import React from 'react';

interface CourseCardProps {
    id: string;
    title: string;
    price: number;
    originalPrice?: number;
    thumbnail: string;
    category: string;
    rating: number;
    index?: number;
}

const CourseCard: React.FC<CourseCardProps> = ({ id, title, price, originalPrice, thumbnail, category, rating, index = 0 }) => {
    const discount = originalPrice ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0;

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x);
    const mouseYSpring = useSpring(y);

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["12deg", "-12deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-12deg", "12deg"]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;
        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", delay: index * 0.05 }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            className="perspective-1000"
        >
            <Link 
                to={`/courses/${id}`} 
                className="group block deep-glass p-4 rounded-[2.5rem] glass-border transition-all duration-500 hover:shadow-indigo-500/20 shadow-2xl overflow-hidden relative"
                style={{ transform: "translateZ(50px)", transformStyle: "preserve-3d" }}
            >
                {/* Glowing Highlight */}
                <div className="absolute -inset-[100%] opacity-0 group-hover:opacity-10 transition-opacity duration-700 pointer-events-none bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 blur-3xl" />

                <div className="relative aspect-[4/3] rounded-[1.8rem] overflow-hidden mb-6" style={{ transform: "translateZ(30px)" }}>
                    <motion.img 
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        src={thumbnail || "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop&q=60"} 
                        alt={title}
                        className="object-cover w-full h-full"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                    
                    <div className="absolute top-4 left-4 flex flex-col space-y-2">
                        <span className="px-4 py-1.5 bg-white/20 backdrop-blur-xl text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-xl border border-white/20">
                            {category}
                        </span>
                        {discount > 0 && (
                            <span className="px-4 py-1.5 bg-indigo-600 text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-xl shadow-lg">
                                {discount}% SAVINGS
                            </span>
                        )}
                    </div>
                </div>
                
                <div className="px-2 pb-2 space-y-4" style={{ transform: "translateZ(40px)" }}>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-1">
                            {[...Array(5)].map((_, i) => (
                                <svg key={i} className={`w-3.5 h-3.5 ${i < Math.floor(rating) ? 'text-indigo-500' : 'text-slate-200 dark:text-slate-800'}`} fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                            ))}
                        </div>
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{rating} RATING</span>
                    </div>
                    
                    <h3 className="text-xl font-black text-slate-900 dark:text-white leading-tight group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-2 min-h-[3rem]">
                        {title}
                    </h3>

                    <div className="flex items-center justify-between pt-6 border-t border-slate-100/50 dark:border-white/5">
                        <div className="flex items-baseline space-x-2">
                            <span className="text-2xl font-black text-indigo-600">₹{price}</span>
                            {originalPrice && (
                                <span className="text-sm text-slate-400 line-through font-bold italic">₹{originalPrice}</span>
                            )}
                        </div>
                        <div className="w-12 h-12 rounded-2xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-all duration-500 shadow-xl">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
                            </svg>
                        </div>
                    </div>
                </div>
            </Link>
        </motion.div>
    );
};

export default CourseCard;

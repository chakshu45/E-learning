import Link from 'next/link';
import { motion } from 'framer-motion';

interface CourseCardProps {
    id: string;
    title: string;
    instructor: string;
    price: number;
    originalPrice?: number;
    thumbnail: string;
    category: string;
    rating: number;
    index?: number;
}

const CourseCard: React.FC<CourseCardProps> = ({ id, title, instructor, price, originalPrice, thumbnail, category, rating, index = 0 }) => {
    const discount = originalPrice ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0;

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
        >
            <Link href={`/courses/${id}`} className="group block premium-card border-none hover:shadow-indigo-500/10">
                <div className="relative aspect-video rounded-[1.5rem] overflow-hidden mb-6">
                    <motion.img 
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.7 }}
                        src={thumbnail || "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop&q=60"} 
                        alt={title}
                        className="object-cover w-full h-full"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="absolute top-4 left-4 flex flex-col space-y-2 z-10">
                        <span className="px-4 py-1.5 bg-white/90 backdrop-blur-md text-slate-900 text-[10px] font-black uppercase tracking-widest rounded-lg shadow-sm">
                            {category}
                        </span>
                        {discount > 0 && (
                            <span className="px-4 py-1.5 bg-indigo-600 text-white text-[10px] font-black uppercase tracking-widest rounded-lg shadow-lg shadow-indigo-500/20">
                                {discount}% OFF
                            </span>
                        )}
                    </div>
                </div>
                
                <div className="space-y-3">
                    <div className="flex items-center space-x-1">
                        {[...Array(5)].map((_, i) => (
                            <svg key={i} className={`w-3.5 h-3.5 ${i < Math.floor(rating) ? 'text-amber-400' : 'text-slate-200'}`} fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                        ))}
                        <span className="text-[10px] font-bold text-slate-400 ml-1">{rating} (1.2k)</span>
                    </div>
                    
                    <h3 className="text-xl font-black text-slate-900 dark:text-white leading-tight group-hover:text-indigo-600 transition-colors line-clamp-2 h-12">
                        {title}
                    </h3>

                    <div className="flex items-center justify-between pt-6 border-t border-slate-50 dark:border-slate-800 mt-4">
                        <div className="flex items-baseline space-x-2">
                            <span className="text-2xl font-black text-slate-900 dark:text-white">₹{price}</span>
                            {originalPrice && (
                                <span className="text-sm text-slate-400 line-through font-medium">₹{originalPrice}</span>
                            )}
                        </div>
                        <motion.div 
                            whileHover={{ x: 5 }}
                            className="w-10 h-10 rounded-full bg-slate-50 dark:bg-slate-800 flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-all duration-500"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </motion.div>
                    </div>
                </div>
            </Link>
        </motion.div>
    );
};

export default CourseCard;


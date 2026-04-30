import Link from 'next/link';

interface CourseCardProps {
    id: string;
    title: string;
    instructor: string;
    price: number;
    thumbnail: string;
    category: string;
    rating: number;
}

const CourseCard: React.FC<CourseCardProps> = ({ id, title, instructor, price, thumbnail, category, rating }) => {
    return (
        <Link href={`/courses/${id}`} className="group block bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-slate-100 dark:border-slate-700 hover:-translate-y-2">
            <div className="relative aspect-video overflow-hidden">
                <img 
                    src={thumbnail || "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop&q=60"} 
                    alt={title}
                    className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-indigo-600 text-white text-xs font-bold rounded-full uppercase tracking-wider">
                        {category}
                    </span>
                </div>
            </div>
            <div className="p-6">
                <div className="flex items-center space-x-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                        <svg key={i} className={`w-4 h-4 ${i < Math.floor(rating) ? 'text-amber-400' : 'text-slate-300'}`} fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                    ))}
                    <span className="text-xs font-medium text-slate-500 ml-1">({rating})</span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1 group-hover:text-indigo-600 transition-colors line-clamp-2">
                    {title}
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">by {instructor}</p>
                <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-50 dark:border-slate-700">
                    <span className="text-2xl font-black text-indigo-600">${price}</span>
                    <span className="text-sm font-bold text-slate-900 dark:text-white group-hover:underline">View Course →</span>
                </div>
            </div>
        </Link>
    );
};

export default CourseCard;

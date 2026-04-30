"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { fetchData } from "@/utils/api";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

export default function CourseDetailPage({ params }: { params: { id: string } }) {
    const { user } = useAuth();
    const router = useRouter();
    const [course, setCourse] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getCourse = async () => {
            try {
                const data = await fetchData(`/courses/${params.id}`);
                setCourse(data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        getCourse();
    }, [params.id]);

    const handleEnroll = async () => {
        if (!user) {
            router.push('/login');
            return;
        }

        try {
            await fetchData('/enroll', {
                method: 'POST',
                body: JSON.stringify({ courseId: params.id }),
            });
            alert('Successfully enrolled!');
            router.push('/dashboard');
        } catch (error: any) {
            alert(error.message || 'Already enrolled or error occurred');
        }
    };

    if (loading) return (
        <div className="flex justify-center items-center min-h-screen">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
        </div>
    );

    if (!course) return <div className="text-center py-20 text-slate-500">Course not found.</div>;

    return (
        <div className="bg-white dark:bg-slate-900 min-h-screen">
            {/* Header / Hero */}
            <div className="bg-slate-900 text-white py-16">
                <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
                    <div>
                        <nav className="text-sm text-indigo-400 font-bold mb-4">
                            {course.category} / {course.level}
                        </nav>
                        <h1 className="text-4xl md:text-5xl font-black mb-6 leading-tight">
                            {course.title}
                        </h1>
                        <p className="text-xl text-slate-300 mb-8">
                            {course.subtitle}
                        </p>
                        <div className="flex items-center space-x-6">
                            <div className="flex items-center space-x-2">
                                <span className="text-amber-400 font-bold">{course.rating}</span>
                                <div className="flex">
                                    {[...Array(5)].map((_, i) => (
                                        <svg key={i} className={`w-4 h-4 ${i < Math.floor(course.rating) ? 'text-amber-400' : 'text-slate-600'}`} fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                    ))}
                                </div>
                            </div>
                            <span className="text-slate-400">{course.numReviews || 0} reviews</span>
                        </div>
                    </div>
                    <div className="relative group">
                        <div className="absolute -inset-1 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
                        <div className="relative bg-slate-800 rounded-2xl overflow-hidden shadow-2xl border border-slate-700 p-6">
                            <img src={course.thumbnail || "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800"} alt="Course" className="rounded-xl mb-6" />
                            <div className="flex items-center justify-between mb-6">
                                <span className="text-4xl font-black">${course.price}</span>
                                <span className="text-slate-400 line-through">${(course.price * 1.5).toFixed(2)}</span>
                            </div>
                            <button 
                                onClick={handleEnroll}
                                className="w-full btn-primary py-4 text-xl mb-4"
                            >
                                Enroll Now
                            </button>
                            <p className="text-center text-sm text-slate-400">30-Day Money-Back Guarantee</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-7xl mx-auto px-4 py-20 grid md:grid-cols-3 gap-16">
                <div className="md:col-span-2">
                    <section className="mb-16">
                        <h2 className="text-3xl font-bold mb-6 text-slate-900 dark:text-white">What you'll learn</h2>
                        <div className="grid sm:grid-cols-2 gap-4">
                            <p className="text-slate-600 dark:text-slate-400 whitespace-pre-line">{course.description}</p>
                        </div>
                    </section>
                </div>

                {/* Sidebar - Instructor Info */}
                <div className="space-y-12">
                    <div className="p-8 bg-slate-50 dark:bg-slate-800 rounded-3xl border border-slate-100 dark:border-slate-700">
                        <h3 className="text-xl font-bold mb-6 text-slate-900 dark:text-white">Your Instructor</h3>
                        <div className="flex items-center space-x-4 mb-4">
                            <img src={course.instructor?.profileImage || "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400"} alt={course.instructor?.name} className="w-16 h-16 rounded-full object-cover" />
                            <div>
                                <h4 className="font-bold text-slate-900 dark:text-white">{course.instructor?.name}</h4>
                                <p className="text-sm text-slate-500">{course.instructor?.role}</p>
                            </div>
                        </div>
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                            {course.instructor?.bio || "Expert instructor dedicated to your success."}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import { fetchData } from "@/utils/api";

export default function Dashboard() {
    const { user } = useAuth();
    const [enrollments, setEnrollments] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getEnrollments = async () => {
            try {
                const data = await fetchData('/enroll/my');
                setEnrollments(data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        if (user) {
            getEnrollments();
        }
    }, [user]);

    return (
        <div className="max-w-7xl mx-auto px-4 py-12">
            <header className="mb-12">
                <h1 className="text-4xl font-black text-slate-900 dark:text-white mb-2">
                    Welcome back, {user?.name || "Learner"}! 👋
                </h1>
                <p className="text-slate-500 dark:text-slate-400 text-lg">
                    {enrollments.length > 0 
                        ? `You are currently learning ${enrollments.length} courses.` 
                        : "Ready to start your learning journey?"}
                </p>
            </header>

            <div className="grid md:grid-cols-4 gap-8">
                {/* Sidebar Stats */}
                <div className="space-y-6">
                    <div className="p-6 bg-indigo-600 rounded-3xl text-white shadow-xl shadow-indigo-500/20">
                        <h3 className="text-indigo-100 text-sm font-bold uppercase tracking-wider mb-1">Learning Status</h3>
                        <div className="text-3xl font-black mb-4">Active</div>
                        <div className="w-full bg-indigo-400/30 rounded-full h-2">
                            <div className="bg-white h-2 rounded-full" style={{ width: '100%' }}></div>
                        </div>
                    </div>
                </div>

                {/* Main Content - Active Courses */}
                <div className="md:col-span-3 space-y-8">
                    <div className="flex items-center justify-between">
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Your Courses</h2>
                        <Link href="/courses" className="text-indigo-600 font-bold hover:underline">Browse More</Link>
                    </div>

                    {loading ? (
                        <div className="flex justify-center py-10">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
                        </div>
                    ) : (
                        <div className="grid gap-6">
                            {enrollments.map(item => (
                                <div key={item._id} className="group p-6 bg-white dark:bg-slate-800 rounded-3xl border border-slate-100 dark:border-slate-700 hover:shadow-xl transition-all duration-300">
                                    <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-6">
                                        <img src={item.course.thumbnail || "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800"} alt={item.course.title} className="w-full sm:w-48 aspect-video rounded-2xl object-cover" />
                                        <div className="flex-1">
                                            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-indigo-600 transition-colors">
                                                {item.course.title}
                                            </h3>
                                            <div className="flex items-center text-sm text-slate-500 dark:text-slate-400 mb-6">
                                                <span>Enrolled on {new Date(item.enrolledAt).toLocaleDateString()}</span>
                                            </div>
                                            <div className="flex items-center space-x-4">
                                                <div className="flex-1 bg-slate-100 dark:bg-slate-700 rounded-full h-2">
                                                    <div className="bg-indigo-600 h-2 rounded-full" style={{ width: `${item.progress}%` }}></div>
                                                </div>
                                                <span className="text-sm font-bold text-slate-900 dark:text-white">{item.progress}%</span>
                                                <Link href={`/courses/${item.course._id}/play`} className="px-6 py-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-full text-sm font-bold hover:bg-slate-800 transition-colors">
                                                    Continue
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            {enrollments.length === 0 && (
                                <div className="text-center py-20 bg-slate-50 dark:bg-slate-800/50 rounded-3xl border-2 border-dashed border-slate-200 dark:border-slate-700">
                                    <p className="text-slate-500 mb-4">You haven't enrolled in any courses yet.</p>
                                    <Link href="/courses" className="btn-primary">Find a Course</Link>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

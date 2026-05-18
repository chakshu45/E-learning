"use client";

import { useEffect, useState, use } from "react";
import { fetchData } from "@/utils/api";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function CoursePlayerPage({ params: paramsPromise }: { params: Promise<{ id: string }> }) {
    const params = use(paramsPromise);
    const { user } = useAuth();
    const router = useRouter();
    const [course, setCourse] = useState<any>(null);
    const [lessons, setLessons] = useState<any[]>([]);
    const [currentLessonIdx, setCurrentLessonIdx] = useState(0);
    const [enrollment, setEnrollment] = useState<any>(null);
    const [isUpdating, setIsUpdating] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user) {
            router.push('/login');
            return;
        }

        const getData = async () => {
            try {
                // Fetch course and its lessons simultaneously
                const [courseData, lessonsData, enrollmentsData] = await Promise.all([
                    fetchData(`/courses/${params.id}`),
                    fetchData(`/lessons/course/${params.id}`),
                    fetchData('/enroll/my')
                ]);
                setCourse(courseData);
                setLessons(lessonsData);
                
                const currentEnrollment = enrollmentsData.find((e: any) => e.course._id === params.id || e.course === params.id);
                setEnrollment(currentEnrollment);
            } catch (error) {
                console.error(error);
                // Redirect if not found or unauthorized
            } finally {
                setLoading(false);
            }
        };
        getData();
    }, [params.id, user, router]);

    const markAsComplete = async () => {
        if (!currentLesson || !enrollment || isUpdating) return;
        
        setIsUpdating(true);
        try {
            const lessonId = currentLesson._id;
            const completedCount = enrollment.completedLessons.includes(lessonId) 
                ? enrollment.completedLessons.length 
                : enrollment.completedLessons.length + 1;
                
            const progress = Math.min(100, Math.round((completedCount / lessons.length) * 100));
            
            const updatedEnrollment = await fetchData(`/enroll/${enrollment._id}/progress`, {
                method: 'PUT',
                body: JSON.stringify({ lessonId, progress })
            });
            
            setEnrollment(updatedEnrollment);
            
            // Auto advance to next lesson if available
            if (currentLessonIdx < lessons.length - 1) {
                setCurrentLessonIdx(currentLessonIdx + 1);
            }
        } catch (error) {
            console.error("Failed to update progress:", error);
        } finally {
            setIsUpdating(false);
        }
    };

    if (loading) return (
        <div className="flex justify-center items-center min-h-screen bg-slate-950">
            <div className="relative w-20 h-20">
                <div className="absolute inset-0 border-4 border-indigo-200 dark:border-slate-800 rounded-full"></div>
                <div className="absolute inset-0 border-4 border-indigo-600 rounded-full border-t-transparent animate-spin"></div>
            </div>
        </div>
    );

    if (!course) return (
        <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white">
            <div className="text-center">
                <h1 className="text-3xl font-black mb-4">Course not found</h1>
                <Link href="/dashboard" className="text-indigo-400 hover:text-indigo-300 underline">Back to Dashboard</Link>
            </div>
        </div>
    );

    const currentLesson = lessons[currentLessonIdx];

    return (
        <div className="flex h-screen pt-16 bg-slate-950 text-white overflow-hidden">
            {/* Main Video Area */}
            <div className="flex-1 flex flex-col h-full overflow-y-auto">
                {currentLesson ? (
                    <div className="w-full aspect-video bg-black flex items-center justify-center relative group">
                        {currentLesson.videoUrl ? (
                            <iframe 
                                src={currentLesson.videoUrl} 
                                className="w-full h-full border-none" 
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                                allowFullScreen
                            ></iframe>
                        ) : (
                            <div className="text-slate-500 font-medium text-lg flex flex-col items-center">
                                <svg className="w-16 h-16 mb-4 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                                <span>No video available for this lesson</span>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="w-full aspect-video bg-slate-900 flex items-center justify-center">
                        <span className="text-slate-500">Select a lesson to begin</span>
                    </div>
                )}

                <div className="p-8 max-w-5xl mx-auto w-full flex-1">
                    {currentLesson && (
                        <>
                            <div className="flex items-center justify-between mb-6">
                                <h1 className="text-3xl font-black tracking-tight">{currentLesson.title}</h1>
                            </div>
                            <div className="prose prose-invert max-w-none">
                                <p className="text-slate-300 leading-relaxed font-medium">
                                    {currentLesson.content || "No detailed content provided for this lesson."}
                                </p>
                            </div>
                            
                            <div className="mt-8 border-t border-slate-800 pt-6 flex items-center justify-between">
                                {enrollment?.completedLessons?.includes(currentLesson._id) ? (
                                    <button disabled className="px-6 py-3 bg-emerald-500/20 text-emerald-500 rounded-xl font-bold flex items-center">
                                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                                        Completed
                                    </button>
                                ) : (
                                    <button onClick={markAsComplete} disabled={isUpdating} className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold transition-colors">
                                        {isUpdating ? "Updating..." : "Mark as Complete"}
                                    </button>
                                )}
                                
                                {enrollment?.progress === 100 && (
                                    <Link href={`/courses/${course._id}/certificate`} className="px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl font-bold shadow-lg shadow-orange-500/30 hover:scale-105 transition-all flex items-center">
                                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" /></svg>
                                        Download Certificate
                                    </Link>
                                )}
                            </div>
                        </>
                    )}
                </div>
            </div>

            {/* Sidebar - Lesson List */}
            <div className="w-96 bg-slate-900 border-l border-slate-800 flex flex-col h-full hidden lg:flex">
                <div className="p-6 border-b border-slate-800">
                    <h2 className="text-xl font-black mb-2">{course.title}</h2>
                    <div className="flex items-center space-x-2 text-sm text-slate-400 font-bold">
                        <span>{lessons.length} Lessons</span>
                        {enrollment && (
                            <>
                                <span>•</span>
                                <span className={enrollment.progress === 100 ? "text-emerald-400" : "text-indigo-400"}>
                                    {enrollment.progress}% Completed
                                </span>
                            </>
                        )}
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto">
                    {lessons.length > 0 ? (
                        <div className="flex flex-col">
                            {lessons.map((lesson, idx) => (
                                <button
                                    key={lesson._id}
                                    onClick={() => setCurrentLessonIdx(idx)}
                                    className={`text-left p-6 border-b border-slate-800/50 transition-all group flex items-start space-x-4 ${
                                        currentLessonIdx === idx 
                                        ? "bg-indigo-900/20 border-l-4 border-l-indigo-500" 
                                        : "hover:bg-slate-800 border-l-4 border-l-transparent"
                                    }`}
                                >
                                    <div className={`mt-1 flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center border-2 text-xs font-black ${
                                        enrollment?.completedLessons?.includes(lesson._id)
                                        ? "border-emerald-500 text-emerald-500 bg-emerald-500/10"
                                        : currentLessonIdx === idx
                                        ? "border-indigo-500 text-indigo-500"
                                        : "border-slate-700 text-slate-500 group-hover:border-slate-500 group-hover:text-slate-300"
                                    }`}>
                                        {enrollment?.completedLessons?.includes(lesson._id) ? (
                                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
                                        ) : (
                                            idx + 1
                                        )}
                                    </div>
                                    <div>
                                        <h3 className={`font-bold ${currentLessonIdx === idx ? "text-white" : "text-slate-300 group-hover:text-white"}`}>
                                            {lesson.title}
                                        </h3>
                                        <div className="flex items-center space-x-3 mt-2 text-xs font-bold text-slate-500">
                                            <span className="flex items-center">
                                                <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                                {lesson.duration || "10:00"}
                                            </span>
                                            {currentLessonIdx === idx && (
                                                <span className="text-indigo-400">Now Playing</span>
                                            )}
                                        </div>
                                    </div>
                                </button>
                            ))}
                        </div>
                    ) : (
                        <div className="p-8 text-center text-slate-500">
                            No lessons available yet.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { fetchData } from "@/utils/api";

export default function PlayCoursePage({ params }: { params: { id: string } }) {
    const [lessons, setLessons] = useState<any[]>([]);
    const [currentLessonIdx, setCurrentLessonIdx] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getLessons = async () => {
            try {
                const data = await fetchData(`/lessons/course/${params.id}`);
                setLessons(data);
                // In a real app, we would also fetch the current enrollment to see progress
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        getLessons();
    }, [params.id]);

    const handleLessonChange = async (idx: number) => {
        setCurrentLessonIdx(idx);
        // Mock progress update - in real app we need the enrollment ID
        // For simplicity, we just console log or call a placeholder
        console.log(`User watched lesson ${lessons[idx]._id}`);
    };

    if (loading) return (
        <div className="flex justify-center items-center min-h-screen">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
        </div>
    );

    if (lessons.length === 0) return (
        <div className="text-center py-20 text-slate-500">
            No lessons available for this course.
        </div>
    );

    const currentLesson = lessons[currentLessonIdx];

    // Function to convert YouTube URL to Embed URL
    const getEmbedUrl = (url: string) => {
        if (!url) return "";
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
        const match = url.match(regExp);
        return (match && match[2].length === 11) ? `https://www.youtube.com/embed/${match[2]}` : url;
    };

    return (
        <div className="flex flex-col lg:flex-row min-h-screen bg-slate-50 dark:bg-slate-900">
            {/* Main Video Area */}
            <div className="flex-1 p-4 lg:p-8">
                <div className="max-w-5xl mx-auto">
                    <div className="aspect-video bg-black rounded-3xl overflow-hidden shadow-2xl mb-8 relative group">
                        <iframe 
                            className="w-full h-full"
                            src={getEmbedUrl(currentLesson.videoUrl)} 
                            title={currentLesson.title}
                            allowFullScreen
                        ></iframe>
                    </div>

                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
                        <div>
                            <h1 className="text-3xl font-black text-slate-900 dark:text-white mb-2">
                                {currentLesson.title}
                            </h1>
                            <p className="text-slate-500 dark:text-slate-400">
                                Lesson {currentLessonIdx + 1} of {lessons.length}
                            </p>
                        </div>
                        <div className="mt-4 md:mt-0 flex space-x-4">
                            <button 
                                onClick={() => handleLessonChange(Math.max(0, currentLessonIdx - 1))}
                                disabled={currentLessonIdx === 0}
                                className="px-6 py-2 border-2 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 rounded-full font-bold hover:bg-slate-100 disabled:opacity-50 transition-colors"
                            >
                                Previous
                            </button>
                            <button 
                                onClick={() => handleLessonChange(Math.min(lessons.length - 1, currentLessonIdx + 1))}
                                disabled={currentLessonIdx === lessons.length - 1}
                                className="px-6 py-2 bg-indigo-600 text-white rounded-full font-bold hover:bg-indigo-700 disabled:opacity-50 transition-colors shadow-lg shadow-indigo-500/20"
                            >
                                Next Lesson
                            </button>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 border border-slate-100 dark:border-slate-700">
                        <h2 className="text-xl font-bold mb-4 text-slate-900 dark:text-white">Lesson Notes</h2>
                        <div className="text-slate-600 dark:text-slate-400 leading-relaxed whitespace-pre-line">
                            {currentLesson.content || "No notes available for this lesson."}
                        </div>
                    </div>
                </div>
            </div>

            {/* Curriculum Sidebar */}
            <div className="w-full lg:w-96 bg-white dark:bg-slate-800 border-l border-slate-200 dark:border-slate-700 overflow-y-auto h-[50vh] lg:h-[calc(100vh-4rem)] sticky top-16">
                <div className="p-6 border-b border-slate-100 dark:border-slate-700">
                    <h2 className="text-xl font-black text-slate-900 dark:text-white">Course Content</h2>
                    <p className="text-sm text-slate-500 mt-1">{lessons.length} Lessons</p>
                </div>
                <div className="divide-y divide-slate-100 dark:divide-slate-700">
                    {lessons.map((lesson, idx) => (
                        <button 
                            key={lesson._id}
                            onClick={() => handleLessonChange(idx)}
                            className={`w-full flex items-center p-6 text-left transition-colors hover:bg-slate-50 dark:hover:bg-slate-700/50 ${currentLessonIdx === idx ? 'bg-indigo-50 dark:bg-indigo-900/20 border-l-4 border-indigo-600' : ''}`}
                        >
                            <div className="flex-1">
                                <h4 className={`font-bold ${currentLessonIdx === idx ? 'text-indigo-600' : 'text-slate-900 dark:text-white'}`}>
                                    {idx + 1}. {lesson.title}
                                </h4>
                                <div className="flex items-center space-x-2 mt-1">
                                    <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                                    </svg>
                                    <span className="text-xs text-slate-500">{lesson.duration}</span>
                                </div>
                            </div>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}

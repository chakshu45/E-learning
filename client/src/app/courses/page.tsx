"use client";

import { useEffect, useState } from "react";
import CourseCard from "@/components/CourseCard";
import { fetchData } from "@/utils/api";

export default function CoursesPage() {
    const [courses, setCourses] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getCourses = async () => {
            try {
                const data = await fetchData('/courses');
                setCourses(data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        getCourses();
    }, []);

    return (
        <div className="max-w-7xl mx-auto px-4 py-12">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-12">
                <div>
                    <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white mb-2">Explore Courses</h1>
                    <p className="text-slate-500 dark:text-slate-400">Choose from over 100,000 online video courses</p>
                </div>
                <div className="mt-6 md:mt-0 flex space-x-4">
                    <input 
                        type="text" 
                        placeholder="Search courses..." 
                        className="px-6 py-3 rounded-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 focus:ring-2 focus:ring-indigo-500 outline-none w-full md:w-80"
                    />
                </div>
            </div>

            {loading ? (
                <div className="flex justify-center py-20">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
                </div>
            ) : (
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {courses.map(course => (
                        <CourseCard 
                            key={course._id} 
                            id={course._id}
                            title={course.title}
                            instructor={course.instructor?.name || "Unknown"}
                            price={course.price}
                            originalPrice={course.originalPrice}
                            thumbnail={course.thumbnail}
                            category={course.category}
                            rating={course.rating}
                        />

                    ))}
                </div>
            )}
            
            {!loading && courses.length === 0 && (
                <div className="text-center py-20">
                    <p className="text-slate-500">No courses found. Start by seeding the database!</p>
                </div>
            )}
        </div>
    );
}

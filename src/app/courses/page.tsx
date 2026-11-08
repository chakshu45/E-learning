"use client";

import { useEffect, useState } from "react";
import CourseCard from "@/components/CourseCard";
import { fetchData } from "@/utils/api";

export default function Courses() {
  const [courses, setCourses] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getCourses = async () => {
      try {
        const data = await fetchData("/courses");
        setCourses(data || []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    getCourses();
  }, []);

  const filteredCourses = courses.filter((c) =>
    c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-12">
        <div>
          <h1 className="text-5xl font-black text-slate-900 dark:text-white mb-3 tracking-tight">
            Explore Courses
          </h1>
          <p className="text-xl text-slate-500 dark:text-slate-400 font-medium">
            Master software engineering, architecture, cloud, and databases.
          </p>
        </div>
        <div className="mt-6 md:mt-0 flex space-x-4">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by title or category..."
            className="px-6 py-3.5 rounded-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 focus:ring-2 focus:ring-indigo-500 outline-none w-full md:w-80 font-medium"
          />
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-24">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredCourses.map((course, idx) => (
            <CourseCard
              key={course._id}
              id={course._id}
              title={course.title}
              price={course.price}
              originalPrice={course.originalPrice}
              thumbnail={course.thumbnail}
              category={course.category}
              rating={course.rating}
              index={idx}
            />
          ))}
        </div>
      )}

      {!loading && filteredCourses.length === 0 && (
        <div className="text-center py-20 deep-glass rounded-3xl p-12">
          <p className="text-xl text-slate-500 font-bold mb-4">No matching courses found.</p>
          <button
            onClick={() => setSearchTerm("")}
            className="px-6 py-2.5 bg-indigo-600 text-white rounded-xl font-bold"
          >
            Clear Search
          </button>
        </div>
      )}
    </div>
  );
}

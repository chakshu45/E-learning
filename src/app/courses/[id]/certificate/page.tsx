"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { fetchData } from "@/utils/api";
import Link from "next/link";

export default function CertificatePage() {
  const params = useParams();
  const id = params?.id as string;
  const { user } = useAuth();
  const router = useRouter();
  const [course, setCourse] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      router.push("/login");
      return;
    }
    const getCourse = async () => {
      try {
        const data = await fetchData(`/courses/${id}`);
        setCourse(data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    if (id) getCourse();
  }, [id, user, router]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-20 px-4 bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center">
      <div className="w-full max-w-4xl bg-white dark:bg-slate-900 border-[12px] border-indigo-600 rounded-[2.5rem] p-12 text-center relative shadow-2xl overflow-hidden mb-12">
        <div className="w-20 h-20 bg-indigo-600 rounded-2xl mx-auto mb-8 flex items-center justify-center shadow-xl shadow-indigo-500/30">
          <span className="text-white font-black text-4xl">S</span>
        </div>

        <h1 className="text-sm font-black uppercase tracking-[0.5em] text-indigo-600 mb-8">
          Certificate of Completion
        </h1>

        <p className="text-slate-500 dark:text-slate-400 font-medium mb-4">
          This is proudly presented to
        </p>
        <h2 className="text-5xl font-black text-slate-900 dark:text-white mb-8 font-serif italic">
          {user?.name || "Distinguished Graduate"}
        </h2>

        <p className="text-slate-500 dark:text-slate-400 font-medium mb-4">
          for successfully completing all curriculum requirements of
        </p>
        <h3 className="text-3xl font-black text-gradient mb-12">
          {course?.title || "Advanced Engineering Program"}
        </h3>

        <div className="flex justify-between items-end mt-20">
          <div className="text-left border-t-2 border-slate-200 dark:border-slate-800 pt-4 w-48">
            <p className="text-xs font-black uppercase tracking-widest text-slate-400">Date Issued</p>
            <p className="font-bold text-slate-900 dark:text-white">
              {new Date().toLocaleDateString()}
            </p>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 bg-amber-400 rounded-full flex items-center justify-center shadow-lg mb-2">
              <svg className="w-8 h-8 text-amber-900" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              Verified by LearnWithSky
            </p>
          </div>
          <div className="text-right border-t-2 border-slate-200 dark:border-slate-800 pt-4 w-48">
            <p className="text-xs font-black uppercase tracking-widest text-slate-400">
              Instructor Signature
            </p>
            <p className="font-serif text-xl text-slate-900 dark:text-white italic">
              Learn With Sky
            </p>
          </div>
        </div>
      </div>

      <div className="flex space-x-4">
        <button
          onClick={() => window.print()}
          className="px-8 py-4 bg-indigo-600 text-white font-bold rounded-2xl shadow-xl hover:bg-indigo-700 transition-all flex items-center space-x-2 cursor-pointer"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          <span>Print / Save PDF</span>
        </button>
        <Link
          href={`/courses/${id}/play`}
          className="px-8 py-4 bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-white font-bold rounded-2xl hover:bg-slate-300 transition-all"
        >
          Back to Course
        </Link>
      </div>
    </div>
  );
}

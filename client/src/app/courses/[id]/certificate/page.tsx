"use client";

import { useEffect, useState, use } from "react";
import { fetchData } from "@/utils/api";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";

export default function CertificatePage({ params: paramsPromise }: { params: Promise<{ id: string }> }) {
    const params = use(paramsPromise);
    const { user } = useAuth();
    const router = useRouter();
    const [course, setCourse] = useState<any>(null);
    const [enrollment, setEnrollment] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user) {
            router.push('/login');
            return;
        }

        const getData = async () => {
            try {
                const [courseData, enrollmentsData] = await Promise.all([
                    fetchData(`/courses/${params.id}`),
                    fetchData('/enroll/my')
                ]);
                
                const currentEnrollment = enrollmentsData.find((e: any) => e.course._id === params.id || e.course === params.id);
                
                if (!currentEnrollment || currentEnrollment.progress < 100) {
                    alert("You must complete the course to view your certificate.");
                    router.push(`/courses/${params.id}/play`);
                    return;
                }
                
                setCourse(courseData);
                setEnrollment(currentEnrollment);
            } catch (error) {
                console.error(error);
                router.push('/dashboard');
            } finally {
                setLoading(false);
            }
        };
        getData();
    }, [params.id, user, router]);

    const handlePrint = () => {
        window.print();
    };

    if (loading) return (
        <div className="flex justify-center items-center min-h-screen bg-slate-50 dark:bg-slate-950">
            <div className="relative w-20 h-20">
                <div className="absolute inset-0 border-4 border-indigo-200 dark:border-slate-800 rounded-full"></div>
                <div className="absolute inset-0 border-4 border-indigo-600 rounded-full border-t-transparent animate-spin"></div>
            </div>
        </div>
    );

    if (!course || !enrollment) return null;

    const completionDate = new Date(enrollment.updatedAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    const certificateId = `LWS-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-20 px-4 print:bg-white print:py-0 print:px-0">
            
            {/* Non-printable controls */}
            <div className="max-w-5xl mx-auto mb-8 flex justify-between items-center print:hidden">
                <Link href={`/courses/${course._id}/play`} className="text-slate-500 font-bold hover:text-indigo-600 transition-colors flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                    Back to Course
                </Link>
                <button onClick={handlePrint} className="px-6 py-3 bg-indigo-600 text-white rounded-xl font-bold shadow-lg shadow-indigo-500/30 hover:scale-105 transition-all flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" /></svg>
                    Print Certificate
                </button>
            </div>

            {/* Certificate Canvas */}
            <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="max-w-5xl mx-auto bg-white rounded-none shadow-[0_20px_50px_rgba(0,0,0,0.1)] border-8 border-indigo-900/10 p-2 print:shadow-none print:border-none print:max-w-full"
            >
                <div className="border-[12px] border-double border-indigo-900/20 p-12 md:p-24 relative overflow-hidden bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] print:p-12">
                    
                    {/* Decorative Elements */}
                    <div className="absolute top-0 left-0 w-64 h-64 bg-indigo-600/5 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-0 right-0 w-96 h-96 bg-fuchsia-600/5 rounded-full blur-3xl"></div>
                    
                    <div className="relative z-10 text-center">
                        <div className="w-24 h-24 bg-indigo-600 rounded-2xl mx-auto flex items-center justify-center mb-8 shadow-xl shadow-indigo-500/20">
                            <span className="text-white font-black text-5xl">S</span>
                        </div>
                        
                        <h2 className="text-2xl font-black text-indigo-900 tracking-[0.3em] uppercase mb-12">
                            Certificate of Completion
                        </h2>
                        
                        <p className="text-lg text-slate-500 font-medium italic mb-6">
                            This is to certify that
                        </p>
                        
                        <h1 className="text-5xl md:text-7xl font-black text-slate-900 mb-6 font-serif">
                            {user.name}
                        </h1>
                        
                        <p className="text-lg text-slate-500 font-medium italic mb-10 max-w-2xl mx-auto">
                            has successfully completed all requirements, modules, and assessments for the course
                        </p>
                        
                        <h3 className="text-3xl md:text-4xl font-black text-indigo-600 mb-16">
                            {course.title}
                        </h3>
                        
                        <div className="flex justify-between items-end mt-24 border-t-2 border-slate-200 pt-8 max-w-4xl mx-auto">
                            <div className="text-left">
                                <span className="block text-xl font-black text-slate-900">{completionDate}</span>
                                <span className="text-sm font-bold text-slate-400 uppercase tracking-widest">Date of Issue</span>
                            </div>
                            
                            <div className="text-center">
                                <div className="w-32 h-32 mx-auto border-4 border-amber-400 rounded-full flex items-center justify-center bg-amber-50 relative -top-6 shadow-xl shadow-amber-500/20 transform rotate-12">
                                    <div className="text-center">
                                        <span className="block text-2xl font-black text-amber-600 leading-none">100%</span>
                                        <span className="text-[10px] font-black text-amber-500 uppercase tracking-widest">Verified</span>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="text-right">
                                <span className="block text-xl font-black text-slate-900 font-serif italic">LearnWithSky</span>
                                <span className="text-sm font-bold text-slate-400 uppercase tracking-widest">Platform Authority</span>
                            </div>
                        </div>
                        
                        <div className="mt-12 text-xs font-mono text-slate-400 text-center uppercase tracking-widest">
                            Certificate ID: {certificateId}
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}

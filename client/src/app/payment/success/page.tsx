"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { fetchData } from "@/utils/api";
import Link from "next/link";

function PaymentSuccessContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const sessionId = searchParams.get("session_id");
    const [status, setStatus] = useState<"loading" | "success" | "error">("loading");

    useEffect(() => {
        if (sessionId) {
            const verify = async () => {
                try {
                    await fetchData("/payments/verify", {
                        method: "POST",
                        body: JSON.stringify({ sessionId }),
                    });
                    setStatus("success");
                    // Redirect to dashboard after a short delay
                    setTimeout(() => {
                        router.push("/dashboard");
                    }, 4000);
                } catch (error) {
                    console.error("Verification failed:", error);
                    setStatus("error");
                }
            };
            verify();
        }
    }, [sessionId, router]);

    if (status === "loading") {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-[#fdfdff] dark:bg-slate-950">
                <div className="relative w-24 h-24 mb-10">
                    <motion.div 
                        animate={{ rotate: 360 }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-0 border-4 border-indigo-100 dark:border-slate-800 rounded-full"
                    ></motion.div>
                    <motion.div 
                        animate={{ rotate: -360 }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-2 border-4 border-t-indigo-600 rounded-full"
                    ></motion.div>
                </div>
                <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Verifying Your Payment</h1>
                <p className="text-slate-500 mt-4 font-medium animate-pulse">Hang tight, we're securing your spot...</p>
            </div>
        );
    }

    if (status === "error") {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-[#fdfdff] dark:bg-slate-950">
                <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="bg-rose-50 dark:bg-rose-900/20 p-8 rounded-[2.5rem] mb-10 border border-rose-100 dark:border-rose-800"
                >
                    <svg className="w-16 h-16 text-rose-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </motion.div>
                <h1 className="text-4xl font-black text-slate-900 dark:text-white mb-4">Something Went Wrong</h1>
                <p className="text-slate-500 mt-2 text-center max-w-md text-lg font-medium leading-relaxed">
                    We couldn't verify your payment. If you've been charged, please contact our 24/7 support team.
                </p>
                <div className="mt-8 p-4 bg-slate-100 dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
                    <code className="text-sm font-mono text-slate-600 dark:text-slate-400">ID: {sessionId}</code>
                </div>
                <Link href="/" className="mt-12 btn-primary px-12 py-5 text-xl font-black rounded-[2rem]">
                    Return Home
                </Link>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-[#fdfdff] dark:bg-slate-950 overflow-hidden relative">
            {/* Celebration Background */}
            <div className="absolute inset-0 pointer-events-none">
                {[...Array(20)].map((_, i) => (
                    <motion.div
                        key={i}
                        initial={{ 
                            top: "100%", 
                            left: `${Math.random() * 100}%`,
                            opacity: 1,
                            scale: Math.random() * 1 + 0.5
                        }}
                        animate={{ 
                            top: "-10%",
                            opacity: 0,
                            rotate: 360
                        }}
                        transition={{ 
                            duration: Math.random() * 3 + 2,
                            repeat: Infinity,
                            delay: Math.random() * 5
                        }}
                        className={`absolute w-4 h-4 rounded-full ${['bg-indigo-500', 'bg-violet-500', 'bg-fuchsia-500', 'bg-cyan-500'][i % 4]}`}
                    />
                ))}
            </div>

            <motion.div 
                initial={{ scale: 0, rotate: -20 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", damping: 12 }}
                className="bg-indigo-50 dark:bg-indigo-900/20 p-10 rounded-[3rem] mb-12 border-4 border-white dark:border-slate-800 shadow-2xl relative z-10"
            >
                <svg className="w-20 h-20 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                </svg>
            </motion.div>
            <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-6xl md:text-8xl font-black text-slate-900 dark:text-white mb-6 text-center tracking-tight z-10"
            >
                You're <span className="text-gradient">Enrolled!</span>
            </motion.h1>
            <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="text-xl md:text-2xl text-slate-500 dark:text-slate-400 text-center mb-12 max-w-2xl font-medium leading-relaxed z-10"
            >
                Welcome to the community. Your journey to mastery begins now. Get ready to transform your career.
            </motion.p>
            <motion.div 
                initial={{ width: 0 }}
                animate={{ width: "200px" }}
                transition={{ delay: 1, duration: 3 }}
                className="h-1.5 bg-indigo-600 rounded-full mb-4 z-10"
            />
            <p className="text-sm font-black text-indigo-600 uppercase tracking-[0.3em] animate-pulse z-10">
                Transporting to Dashboard
            </p>
        </div>
    );
}

export default function PaymentSuccessPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <PaymentSuccessContent />
        </Suspense>
    );
}

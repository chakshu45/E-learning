"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";

function MockCheckoutContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const courseId = searchParams.get("course_id");
    const [isProcessing, setIsProcessing] = useState(false);

    const handleMockPayment = () => {
        setIsProcessing(true);
        setTimeout(() => {
            // Redirect to success page with a mock session ID
            router.push(`/payment/success?session_id=mock_session_${Date.now()}&course_id=${courseId}`);
        }, 2000);
    };

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center p-4">
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-md w-full bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-2xl border border-slate-200 dark:border-slate-800 p-10"
            >
                <div className="text-center mb-10">
                    <div className="w-16 h-16 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6 text-2xl">
                        💳
                    </div>
                    <h1 className="text-3xl font-black text-slate-900 dark:text-white">Secure Checkout</h1>
                    <p className="text-slate-500 mt-2 font-medium">Demo Mode - No real charge will occur</p>
                </div>

                <div className="space-y-6">
                    <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700">
                        <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Card Number</label>
                        <div className="text-lg font-mono text-slate-700 dark:text-slate-200 tracking-[0.2em]">4242 4242 4242 4242</div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700">
                            <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Expiry</label>
                            <div className="text-lg font-mono text-slate-700 dark:text-slate-200">12/26</div>
                        </div>
                        <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700">
                            <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">CVC</label>
                            <div className="text-lg font-mono text-slate-700 dark:text-slate-200">***</div>
                        </div>
                    </div>

                    <button 
                        onClick={handleMockPayment}
                        disabled={isProcessing}
                        className="w-full py-5 bg-indigo-600 text-white rounded-2xl font-black text-xl shadow-xl shadow-indigo-500/20 hover:bg-indigo-700 transition-all disabled:opacity-50"
                    >
                        {isProcessing ? "Processing..." : "Complete Payment"}
                    </button>

                    <button 
                        onClick={() => router.back()}
                        className="w-full py-4 text-slate-500 font-bold hover:text-slate-700 transition-all"
                    >
                        Cancel
                    </button>
                </div>
            </motion.div>
        </div>
    );
}

export default function MockCheckoutPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <MockCheckoutContent />
        </Suspense>
    );
}

"use client";

import { motion } from "framer-motion";

interface CertificateModalProps {
    courseTitle: string;
    studentName: string;
    onClose: () => void;
}

const CertificateModal: React.FC<CertificateModalProps> = ({ courseTitle, studentName, onClose }) => {
    return (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="relative bg-white dark:bg-slate-900 w-full max-w-4xl p-1 shadow-2xl rounded-3xl"
            >
                {/* Certificate Border Container */}
                <div className="border-[12px] border-indigo-600 rounded-[2rem] p-12 text-center relative overflow-hidden bg-white dark:bg-slate-900">
                    {/* Background Pattern */}
                    <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.1] pointer-events-none">
                        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#4f46e5_1px,transparent_1px)] [background-size:20px_20px]"></div>
                    </div>

                    <div className="relative z-10">
                        <div className="w-20 h-20 bg-indigo-600 rounded-2xl mx-auto mb-8 flex items-center justify-center shadow-xl shadow-indigo-500/30">
                            <span className="text-white font-black text-4xl">S</span>
                        </div>

                        <h1 className="text-sm font-black uppercase tracking-[0.5em] text-indigo-600 mb-8">Certificate of Completion</h1>
                        
                        <p className="text-slate-500 dark:text-slate-400 font-medium mb-4">This is to certify that</p>
                        <h2 className="text-5xl font-black text-slate-900 dark:text-white mb-8 font-serif italic">{studentName || "Future Expert"}</h2>
                        
                        <p className="text-slate-500 dark:text-slate-400 font-medium mb-4">has successfully completed the premium course</p>
                        <h3 className="text-3xl font-black text-gradient mb-12">{courseTitle}</h3>

                        <div className="flex justify-between items-end mt-20">
                            <div className="text-left border-t-2 border-slate-200 dark:border-slate-800 pt-4 w-48">
                                <p className="text-xs font-black uppercase tracking-widest text-slate-400">Date Issued</p>
                                <p className="font-bold text-slate-900 dark:text-white">{new Date().toLocaleDateString()}</p>
                            </div>
                            <div className="flex flex-col items-center">
                                <div className="w-16 h-16 bg-amber-400 rounded-full flex items-center justify-center shadow-lg mb-2">
                                    <svg className="w-8 h-8 text-amber-900" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Verified by Sky</p>
                            </div>
                            <div className="text-right border-t-2 border-slate-200 dark:border-slate-800 pt-4 w-48">
                                <p className="text-xs font-black uppercase tracking-widest text-slate-400">Instructor Signature</p>
                                <p className="font-serif text-xl text-slate-900 dark:text-white italic">Anuj Bhaiya</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Close Button */}
                <button 
                    onClick={onClose}
                    className="absolute -top-4 -right-4 w-10 h-10 bg-white dark:bg-slate-800 rounded-full shadow-xl flex items-center justify-center hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors z-20"
                >
                    <svg className="w-6 h-6 text-slate-600 dark:text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
                
                {/* Download Button Overlay */}
                <div className="absolute -bottom-16 left-1/2 -translate-x-1/2">
                    <button 
                        onClick={() => window.print()}
                        className="px-10 py-4 bg-indigo-600 text-white font-black rounded-2xl shadow-2xl hover:bg-indigo-700 transition-all flex items-center space-x-3"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                        <span>Download PDF Certificate</span>
                    </button>
                </div>
            </motion.div>
        </div>
    );
};

export default CertificateModal;

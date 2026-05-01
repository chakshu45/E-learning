"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function Home() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" as any }
    },
  };

  return (
    <div className="relative overflow-hidden bg-white dark:bg-slate-950">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1000px] pointer-events-none">
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
            opacity: [0.1, 0.2, 0.1]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-500/10 blur-[120px] rounded-full"
        ></motion.div>
        <motion.div 
          animate={{ 
            scale: [1.2, 1, 1.2],
            rotate: [0, -90, 0],
            opacity: [0.1, 0.15, 0.1]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute top-[20%] right-[-10%] w-[30%] h-[30%] bg-violet-500/10 blur-[100px] rounded-full"
        ></motion.div>
      </div>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-center"
          >
            <motion.div
              variants={itemVariants}
              className="inline-block px-6 py-2 mb-8 text-sm font-black tracking-widest text-indigo-600 uppercase bg-indigo-50 dark:bg-indigo-900/30 rounded-full shadow-sm"
            >
              The Future of Learning is Here
            </motion.div>
            
            <motion.h1 
              variants={itemVariants}
              className="text-6xl md:text-9xl font-black tracking-tight text-slate-900 dark:text-white leading-[0.85] mb-10"
            >
              Unlock Your <br />
              <span className="text-gradient">Infinite Potential.</span>
            </motion.h1>

            
            <motion.p 
              variants={itemVariants}
              className="max-w-2xl mx-auto text-xl md:text-2xl text-slate-600 dark:text-slate-400 mb-14 font-medium leading-relaxed"
            >
              Experience a premium education platform designed for the modern world. Master technology, design, and business with top-tier instructors.
            </motion.p>

            <motion.div 
              variants={itemVariants}
              className="flex flex-col sm:flex-row justify-center items-center space-y-6 sm:space-y-0 sm:space-x-8"
            >
              <Link href="/courses" className="group relative px-12 py-6 bg-indigo-600 text-white rounded-[2rem] font-bold text-xl hover:bg-indigo-700 transition-all shadow-2xl shadow-indigo-500/40 hover:-translate-y-2 btn-glow">
                Explore Courses
              </Link>
              <Link href="/register" className="px-12 py-6 bg-white dark:bg-slate-900 text-slate-900 dark:text-white border-2 border-slate-100 dark:border-slate-800 rounded-[2rem] font-bold text-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-all hover:-translate-y-2">
                Start Learning Free
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 border-y border-slate-100 dark:border-slate-900 bg-slate-50/50 dark:bg-slate-900/20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
            {[
              { label: "Active Students", value: "10M+" },
              { label: "Premium Courses", value: "1.2K+" },
              { label: "Expert Mentors", value: "450+" },
              { label: "Success Rate", value: "98%" }
            ].map((stat, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <div className="text-5xl font-black text-indigo-600 mb-3">{stat.value}</div>
                <div className="text-xs font-black text-slate-400 uppercase tracking-[0.2em]">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-40">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-24">
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-6">Why Choose LearnWithSky?</h2>
            <p className="text-slate-500 dark:text-slate-400 text-xl max-w-2xl mx-auto">We combine cutting-edge technology with world-class education to help you reach your goals.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-12">
            {[
              { 
                title: "Cinematic Learning", 
                desc: "High-definition video courses filmed in world-class studios for an immersive experience.", 
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                ),
                color: "bg-blue-500"
              },
              { 
                title: "AI-Powered Mentors", 
                desc: "Get instant answers to your questions with our integrated AI learning assistant.", 
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                ),
                color: "bg-indigo-500"
              },
              { 
                title: "Global Credentials", 
                desc: "Earn certificates recognized by the world's leading technology companies.", 
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                ),
                color: "bg-violet-500"
              }
            ].map((feature, idx) => (
              <motion.div 
                key={idx} 
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.15, duration: 0.6 }}
                whileHover={{ y: -10 }}
                className="premium-card group"
              >
                <div className={`w-20 h-20 ${feature.color} text-white rounded-[1.5rem] flex items-center justify-center mb-10 shadow-2xl shadow-${feature.color.split('-')[1]}-500/30 group-hover:scale-110 transition-transform duration-500`}>
                  {feature.icon}
                </div>
                <h3 className="text-3xl font-black mb-6 text-slate-900 dark:text-white leading-tight">{feature.title}</h3>
                <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}


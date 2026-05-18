"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function Home() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40, filter: "blur(10px)" },
    visible: { 
      opacity: 1, 
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 1, ease: [0.16, 1, 0.3, 1] }
    },
  };

  return (
    <div className="relative overflow-hidden bg-[#fdfdff] dark:bg-slate-950 min-h-screen">
      {/* Dynamic Background Blobs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none z-0">
        <motion.div 
          animate={{ 
            x: [0, 100, 0],
            y: [0, 50, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[10%] left-[5%] w-[500px] h-[500px] bg-indigo-400/20 blur-[120px] rounded-full"
        ></motion.div>
        <motion.div 
          animate={{ 
            x: [0, -80, 0],
            y: [0, 100, 0],
            scale: [1.1, 1, 1.1],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[30%] right-[10%] w-[400px] h-[400px] bg-fuchsia-400/20 blur-[100px] rounded-full"
        ></motion.div>
        <motion.div 
          animate={{ 
            scale: [1, 1.3, 1],
            opacity: [0.1, 0.2, 0.1]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-[10%] left-[20%] w-[600px] h-[600px] bg-cyan-400/10 blur-[150px] rounded-full"
        ></motion.div>
      </div>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-center"
          >
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center space-x-2 px-6 py-2 mb-10 text-sm font-black tracking-widest text-indigo-600 uppercase bg-white dark:bg-slate-900 border border-indigo-100 dark:border-slate-800 rounded-full shadow-xl shadow-indigo-500/10"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
              </span>
              <span>Next Generation Learning</span>
            </motion.div>
            
            <motion.h1 
              variants={itemVariants}
              className="text-7xl md:text-[10rem] font-black tracking-tight text-slate-900 dark:text-white leading-[0.8] mb-12"
            >
              Master Your <br />
              <span className="text-gradient">Future Now.</span>
            </motion.h1>

            <motion.p 
              variants={itemVariants}
              className="max-w-2xl mx-auto text-xl md:text-2xl text-slate-600 dark:text-slate-400 mb-16 font-medium leading-relaxed"
            >
              Learn with the world's best instructors on a platform built for performance, creativity, and career growth.
            </motion.p>

            <motion.div 
              variants={itemVariants}
              className="flex flex-col sm:flex-row justify-center items-center gap-8"
            >
              <Link href="/courses" className="group relative px-14 py-7 bg-indigo-600 text-white rounded-[2.5rem] font-black text-xl overflow-hidden shadow-[0_20px_50px_-10px_rgba(79,70,229,0.5)] transition-all hover:scale-105 active:scale-95">
                <span className="relative z-10">Explore All Courses</span>
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-400 to-violet-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </Link>
              <Link href="/register" className="px-14 py-7 bg-white dark:bg-slate-900 text-slate-900 dark:text-white border-2 border-slate-200 dark:border-slate-800 rounded-[2.5rem] font-black text-xl hover:border-indigo-400 transition-all hover:scale-105 active:scale-95 shadow-xl">
                Try For Free
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section with Glassmorphism */}
      <section className="py-24 z-10 relative">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: "Active Students", value: "10M+", color: "text-indigo-500" },
              { label: "Premium Courses", value: "1.2K+", color: "text-fuchsia-500" },
              { label: "Expert Mentors", value: "450+", color: "text-cyan-500" },
              { label: "Success Rate", value: "98%", color: "text-amber-500" }
            ].map((stat, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass-panel rounded-[2rem] p-8 text-center border border-white/40 shadow-2xl"
              >
                <div className={`text-5xl font-black ${stat.color} mb-3 tabular-nums`}>{stat.value}</div>
                <div className="text-xs font-black text-slate-400 uppercase tracking-[0.3em]">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid - Improved Cards */}
      <section className="py-40 z-10 relative">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-32">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white mb-8"
            >
              Why LearnWithSky?
            </motion.h2>
            <p className="text-slate-500 dark:text-slate-400 text-2xl max-w-2xl mx-auto font-medium">Premium features for a premium learning experience.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-12">
            {[
              { 
                title: "Cinematic Content", 
                desc: "4K video production with studio-quality audio and expert editing.", 
                icon: "🎬",
                gradient: "from-blue-500 to-cyan-500"
              },
              { 
                title: "AI Personalization", 
                desc: "Adaptive learning paths that evolve based on your performance.", 
                icon: "⚡",
                gradient: "from-indigo-500 to-violet-500"
              },
              { 
                title: "Elite Certification", 
                desc: "Industry-standard credentials verified on the blockchain.", 
                icon: "🏆",
                gradient: "from-amber-400 to-orange-500"
              }
            ].map((feature, idx) => (
              <motion.div 
                key={idx} 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2, duration: 0.8 }}
                whileHover={{ y: -20, rotate: idx % 2 === 0 ? 1 : -1 }}
                className="premium-card relative group cursor-default h-full"
              >
                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${feature.gradient} opacity-5 blur-3xl group-hover:opacity-20 transition-opacity`}></div>
                <div className={`w-20 h-20 bg-gradient-to-br ${feature.gradient} text-white rounded-[1.5rem] flex items-center justify-center mb-10 text-4xl shadow-2xl transition-transform duration-500 group-hover:rotate-12`}>
                  {feature.icon}
                </div>
                <h3 className="text-3xl font-black mb-6 text-slate-900 dark:text-white leading-tight">{feature.title}</h3>
                <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed font-medium">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}


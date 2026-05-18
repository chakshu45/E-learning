import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import React, { useRef, useState } from "react";

// --- Components ---

const MagneticButton = ({ children, className, href }: { children: React.ReactNode; className?: string; href: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current!.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX, y: middleY });
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
  };

  const { x, y } = position;

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x, y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
    >
      <Link to={href} className={className}>
        {children}
      </Link>
    </motion.div>
  );
};

const TiltCard = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["17.5deg", "-17.5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-17.5deg", "17.5deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className={className}
    >
      <div style={{ transform: "translateZ(75px)", transformStyle: "preserve-3d" }}>
        {children}
      </div>
    </motion.div>
  );
};

// --- Page ---

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
    hidden: { opacity: 0, y: 40, filter: "blur(10px)" },
    visible: { 
      opacity: 1, 
      y: 0,
      filter: "blur(0px)",
      transition: { type: "spring", stiffness: 100, damping: 20 } as const
    },
  };

  return (
    <div className="relative overflow-hidden min-h-screen">
      {/* Background elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none z-0">
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute top-[10%] left-[10%] w-[40vw] h-[40vw] bg-indigo-500/10 blur-[120px] rounded-full"
        />
        <motion.div 
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 12, repeat: Infinity }}
          className="absolute bottom-[10%] right-[10%] w-[35vw] h-[35vw] bg-purple-500/10 blur-[120px] rounded-full"
        />
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
              className="inline-flex items-center space-x-2 px-6 py-2 mb-10 text-sm font-bold tracking-widest text-indigo-600 dark:text-indigo-400 uppercase deep-glass rounded-full glass-border"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
              </span>
              <span>The Future of Learning</span>
            </motion.div>
            
            <motion.h1 
              variants={itemVariants}
              className="text-6xl md:text-[9rem] font-black tracking-tighter text-slate-900 dark:text-white leading-[0.85] mb-12"
            >
              Master Your <br />
              <span className="text-gradient">Potential.</span>
            </motion.h1>

            <motion.p 
              variants={itemVariants}
              className="max-w-2xl mx-auto text-xl md:text-2xl text-slate-600 dark:text-slate-400 mb-16 font-medium leading-relaxed"
            >
              Experience a cinematic learning journey with world-class mentors and AI-powered paths.
            </motion.p>

            <motion.div 
              variants={itemVariants}
              className="flex flex-col sm:flex-row justify-center items-center gap-8"
            >
              <MagneticButton 
                href="/courses" 
                className="group relative px-14 py-7 bg-indigo-600 text-white rounded-[2.5rem] font-black text-xl overflow-hidden shadow-[0_20px_50px_-10px_rgba(79,70,229,0.5)] transition-all hover:shadow-[0_25px_60px_-10px_rgba(79,70,229,0.7)]"
              >
                <span className="relative z-10">Start Learning</span>
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-400 to-violet-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </MagneticButton>
              <MagneticButton 
                href="/register" 
                className="px-14 py-7 deep-glass text-slate-900 dark:text-white rounded-[2.5rem] font-black text-xl hover:bg-white/40 dark:hover:bg-slate-900/60 transition-all shadow-xl glass-border"
              >
                Join Free
              </MagneticButton>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 z-10 relative">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: "Active Learners", value: "10M+", color: "text-indigo-500" },
              { label: "Premium Content", value: "1.2K+", color: "text-purple-500" },
              { label: "Elite Mentors", value: "450+", color: "text-pink-500" },
              { label: "Success Stories", value: "98%", color: "text-amber-500" }
            ].map((stat, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ type: "spring", delay: i * 0.1 }}
                className="deep-glass rounded-[2rem] p-8 text-center glass-border"
              >
                <div className={`text-5xl font-black ${stat.color} mb-3 tabular-nums`}>{stat.value}</div>
                <div className="text-xs font-black text-slate-400 uppercase tracking-[0.3em]">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-40 z-10 relative">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-32">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white mb-8 tracking-tighter"
            >
              Pure Innovation.
            </motion.h2>
            <p className="text-slate-500 dark:text-slate-400 text-2xl max-w-2xl mx-auto font-medium">Built for those who demand more from education.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-12">
            {[
              { 
                title: "Cinematic 4K", 
                desc: "High-production value lessons that feel like a movie, not a lecture.", 
                icon: "🎬",
                gradient: "from-blue-500 to-indigo-500"
              },
              { 
                title: "AI Co-pilot", 
                desc: "Your personal AI tutor available 24/7 to answer complex questions.", 
                icon: "✨",
                gradient: "from-purple-500 to-pink-500"
              },
              { 
                title: "Global Network", 
                desc: "Connect with students and professionals from over 150 countries.", 
                icon: "🌐",
                gradient: "from-amber-400 to-orange-500"
              }
            ].map((feature, idx) => (
              <TiltCard 
                key={idx} 
                className="h-full"
              >
                <div className="premium-card h-full relative group overflow-hidden glass-border">
                  <div className={`absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-br ${feature.gradient} opacity-10 blur-3xl group-hover:opacity-30 transition-opacity`}></div>
                  <div className={`w-20 h-20 bg-gradient-to-br ${feature.gradient} text-white rounded-[1.5rem] flex items-center justify-center mb-10 text-4xl shadow-2xl`}>
                    {feature.icon}
                  </div>
                  <h3 className="text-3xl font-black mb-6 text-slate-900 dark:text-white leading-tight">{feature.title}</h3>
                  <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed font-medium">{feature.desc}</p>
                </div>
              </TiltCard>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

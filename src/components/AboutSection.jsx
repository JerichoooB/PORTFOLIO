import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Terminal, Cpu, Database, Fingerprint } from "lucide-react";
import "../styles/AboutSection.css";

export const AboutSection = ({ aboutRef }) => {
  const stats = [
    { label: "Core Stack", value: "Full-Stack & Web Sec", icon: <Cpu className="text-cyan-400" size={20} /> },
    { label: "Focus Area", value: "Pen Testing & UI", icon: <ShieldCheck className="text-purple-400" size={20} /> },
    { label: "Environment", value: "Secure Linux/Node", icon: <Terminal className="text-cyan-400" size={20} /> },
    { label: "Database", value: "SQL & Relational", icon: <Database className="text-purple-400" size={20} /> },
  ];

  return (
    <div ref={aboutRef} className="about-container pt-48 min-h-screen flex flex-col justify-center">
      <div className="mb-12 flex items-center gap-6">
        <h2 className="font-['Space_Grotesk'] text-3xl font-black text-white md:text-4xl">ABOUT</h2>
        <div className="h-px flex-grow bg-gradient-to-r from-cyan-500/50 via-purple-500/50 to-transparent" />
      </div>

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 items-center">
        
        {/* Interactive & Draggable Cyberpunk ID Card */}
        <div className="lg:col-span-5 relative flex justify-center">
          <motion.div
            initial={{ y: -150, opacity: 0, rotate: -3 }}
            whileInView={{ y: 0, opacity: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 120, damping: 14, delay: 0.1 }}
            drag
            dragConstraints={{ left: -30, right: 30, top: -30, bottom: 30 }}
            whileHover={{ scale: 1.02, cursor: "grab" }}
            whileTap={{ cursor: "grabbing" }}
            className="w-full rounded-3xl border border-cyan-500/30 bg-slate-950/80 p-6 backdrop-blur-2xl shadow-[0_0_40px_rgba(0,240,255,0.15)] relative overflow-hidden group select-none z-10"
          >
            {/* Card Top Lanyard Slot Notch */}
            <div className="absolute top-2 left-1/2 -translate-x-1/2 w-16 h-2 bg-slate-900 rounded-full border border-white/10" />

            <div className="absolute inset-0 bg-[linear-gradient(to_right,#00f0ff05_1px,transparent_1px),linear-gradient(to_bottom,#00f0ff05_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />

            <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-5 pt-2">
              <div className="flex items-center gap-2">
                <Fingerprint className="text-cyan-400 animate-pulse" size={20} />
                <span className="font-['JetBrains_Mono'] text-xs font-bold uppercase tracking-widest text-cyan-400">ID_PASS: 07-RIRI</span>
              </div>
              <span className="rounded bg-purple-500/10 px-2 py-0.5 border border-purple-500/30 font-['JetBrains_Mono'] text-[10px] text-purple-300 uppercase tracking-widest">
                LVL_4_CLEARANCE
              </span>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-6">
              {/* Photo Container */}
              <div className="relative w-32 h-40 rounded-xl overflow-hidden border border-cyan-500/40 bg-slate-900 shadow-[0_0_20px_rgba(0,240,255,0.2)] group/photo flex-shrink-0">
                <img 
                  src="/pfp.jpg" 
                  alt="ID Badge"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover/photo:scale-110" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-cyan-950/60 via-transparent to-transparent opacity-60 pointer-events-none" />
                <div className="absolute bottom-1 left-1 right-1 text-center font-['JetBrains_Mono'] text-[9px] text-cyan-300 tracking-tighter bg-slate-950/80 rounded py-0.5 backdrop-blur-sm">
                  BIOMETRIC_VERIFIED
                </div>
              </div>

              <div className="flex flex-col justify-center text-center sm:text-left">
                <span className="font-['JetBrains_Mono'] text-xs text-slate-400 uppercase tracking-widest mb-1">OPERATOR</span>
                <h4 className="font-['Space_Grotesk'] text-2xl font-black text-white tracking-wide mb-1">RIRI .DEV</h4>
                <p className="font-['Outfit'] text-xs text-cyan-400/90 mb-3 font-medium">Full-Stack Dev & Sec Analyst</p>
                <div className="inline-flex items-center justify-center sm:justify-start gap-2 font-['JetBrains_Mono'] text-[10px] text-slate-400 bg-white/5 px-3 py-1 rounded-lg border border-white/10">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-ping" />
                  STATUS: ACTIVE_NODE
                </div>
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-white/10 flex justify-between items-center font-['JetBrains_Mono'] text-[10px] text-slate-500">
              <span>DRAG TO INTERACT</span>
              <span className="text-cyan-500/60">[SECURE_CREDENTIAL]</span>
            </div>
          </motion.div>
        </div>

        {/* Bio & Details Column */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-2xl border border-white/10 bg-slate-900/60 p-8 backdrop-blur-xl relative overflow-hidden group shadow-[0_0_30px_rgba(0,0,0,0.5)]"
          >
            <h3 className="mb-4 font-['Space_Grotesk'] text-2xl font-bold text-white tracking-tight">
              Profile and Background
            </h3>
            <p className="font-['Outfit'] text-slate-300 leading-relaxed mb-4">
             I’m an Jericho Balayog, an IT student and full-stack developer who enjoys building fast, responsive, and user-friendly web applications. I work on both frontend design and backend development, focusing on creating websites that look good and work smoothly.
            </p>
            <p className="font-['Outfit'] text-slate-400 leading-relaxed">
I also have a growing interest in cybersecurity, where I explore penetration testing, email security, and database protection to better understand how applications can be made safer and more reliable.
            </p>
          </motion.div>

          {/* Stats / Metrics Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -4, borderColor: "rgba(0, 240, 255, 0.5)" }}
                className="rounded-xl border border-white/10 bg-slate-900/40 p-5 backdrop-blur-md flex flex-col justify-between transition-colors shadow-lg"
              >
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/5">
                  {stat.icon}
                </div>
                <div>
                  <span className="block font-['JetBrains_Mono'] text-[11px] uppercase tracking-wider text-slate-500 mb-1">
                    {stat.label}
                  </span>
                  <span className="font-['Space_Grotesk'] text-base font-bold text-white">
                    {stat.value}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
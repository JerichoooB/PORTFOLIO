import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Terminal, Cpu, Database } from "lucide-react";
import "../styles/AboutSection.css";
import { HangingBadge } from "./HangingBadge";

export const AboutSection = ({ aboutRef }) => {
  const stats = [
    { label: "Core Stack", value: "Full-Stack & Web Sec", icon: <Cpu className="text-cyan-400" size={20} /> },
    { label: "Focus Area", value: "Pen Testing & UI", icon: <ShieldCheck className="text-purple-400" size={20} /> },
    { label: "Environment", value: "Secure Linux/Node", icon: <Terminal className="text-cyan-400" size={20} /> },
    { label: "Database", value: "SQL & Relational", icon: <Database className="text-purple-400" size={20} /> },
  ];

  return (
    <div ref={aboutRef} className="about-container flex flex-col justify-center">
      <div className="section-heading"><div><p className="section-kicker">01 / A LITTLE ABOUT ME</p><h2>The person behind the code.</h2></div><p>Developer by practice.<br />Curious by nature.</p></div>

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 items-center">
        
        <div className="lg:col-span-5 relative flex justify-center">
          <HangingBadge />
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
            <h3 className="mb-4 font-display text-2xl font-bold text-white tracking-tight">
              Always building. Always learning.
            </h3>
            <p className="font-sans text-slate-300 leading-relaxed mb-4">
             I’m Jericho Balayog, an IT student and full-stack developer who enjoys building fast, responsive, and user-friendly web applications. I work on both frontend design and backend development, focusing on creating websites that look good and work smoothly.
            </p>
            <p className="font-sans text-slate-400 leading-relaxed">
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
                  <span className="block font-mono text-[11px] uppercase tracking-wider text-slate-500 mb-1">
                    {stat.label}
                  </span>
                  <span className="font-display text-base font-bold text-white">
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
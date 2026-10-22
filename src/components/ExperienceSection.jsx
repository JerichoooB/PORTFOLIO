
import React from "react";
import { motion } from "framer-motion";
import { Briefcase, Calendar, ShieldAlert, Award } from "lucide-react";
import "../styles/ExperienceSection.css";

export const ExperienceSection = ({ experienceRef }) => {
  const experiences = [
    {
      role: "Cybersecurity & Web Dev Intern",
      company: "Independent IT Projects / Lab",
      period: "2025 - Present",
      desc: "Developing secure full-stack applications, analyzing email headers for phishing indicators, and conducting foundational vulnerability assessments.",
      icon: <ShieldAlert className="text-cyan-400" size={20} />
    },
    {
      role: "Full-Stack Student Developer",
      company: "Academic & Personal Portfolio",
      period: "2024 - Present",
      desc: "Building modular web architectures using React, Node.js, PHP, and Python backed by robust PostgreSQL and MySQL database models.",
      icon: <Briefcase className="text-purple-400" size={20} />
    },
    {
      role: "IT Student & CTF Enthusiast",
      company: "University Cyber Labs",
      period: "2023 - Present",
      desc: "Studying network protocols, cryptographic hashing, access control implementations (RBAC), and secure authentication workflows.",
      icon: <Award className="text-cyan-400" size={20} />
    }
  ];

  return (
    <div ref={experienceRef} className="experience-container min-h-screen flex flex-col justify-center">
      <div className="mb-12 flex items-center gap-6">
        <h2 className="font-display text-3xl font-black text-white md:text-4xl">EXPERIENCE</h2>
        <div className="h-px flex-grow bg-gradient-to-r from-cyan-500/50 via-purple-500/50 to-transparent" />
      </div>

      <div className="grid grid-cols-1 gap-6">
        {experiences.map((exp, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.15 }}
            whileHover={{ scale: 1.01, borderColor: "rgba(0, 240, 255, 0.4)" }}
            className="rounded-2xl border border-white/10 bg-slate-900/60 p-6 md:p-8 backdrop-blur-xl relative overflow-hidden shadow-[0_0_30px_rgba(0,0,0,0.4)] transition-colors"
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/5 flex-shrink-0">
                  {exp.icon}
                </div>
                <div>
                  <h3 className="font-display text-xl font-bold text-white">
                    {exp.role}
                  </h3>
                  <span className="font-mono text-xs text-cyan-400 uppercase tracking-wider">
                    {exp.company}
                  </span>
                </div>
              </div>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 font-mono text-xs text-slate-300 w-fit">
                <Calendar size={14} className="text-purple-400" />
                {exp.period}
              </div>
            </div>
            <p className="font-sans text-slate-300 leading-relaxed pl-0 md:pl-16">
              {exp.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
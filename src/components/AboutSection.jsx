import { motion, useReducedMotion } from "framer-motion";
import { ShieldCheck, Terminal, Cpu, Database, CornerDownRight } from "lucide-react";
import "../styles/AboutSection.css";
import { HangingBadge } from "./HangingBadge";

export const AboutSection = ({ aboutRef }) => {
  const reducedMotion = useReducedMotion();
  const stats = [
    { label: "Core Stack", value: "Full-Stack & Web Sec", icon: <Cpu size={20} /> },
    { label: "Focus Area", value: "Pen Testing & UI", icon: <ShieldCheck size={20} /> },
    { label: "Environment", value: "Secure Linux/Node", icon: <Terminal size={20} /> },
    { label: "Database", value: "SQL & Relational", icon: <Database size={20} /> },
  ];

  return (
    <section ref={aboutRef} className="about-container" aria-labelledby="about-heading">
      <div className="section-heading"><div><p className="section-kicker">01 / A LITTLE ABOUT ME</p><h2 id="about-heading">The person behind the code.</h2></div><p>Developer by practice.<br />Curious by nature.</p></div>
      <div className="about-layout">
        <div className="about-badge-panel"><div className="about-badge-halo" aria-hidden="true" /><HangingBadge /></div>
        <div className="about-information">
          <motion.div className="about-bio" initial={reducedMotion ? false : { opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: reducedMotion ? 0 : 0.6 }}>
            <div className="about-bio-heading"><span className="about-bio-mark" aria-hidden="true"><CornerDownRight size={23} /></span><h3>Always building.<br />Always learning.</h3></div>
            <p>I’m Jericho Balayog, an IT student and full-stack developer who enjoys building fast, responsive, and user-friendly web applications. I work on both frontend design and backend development, focusing on creating websites that look good and work smoothly.</p>
            <p>I also have a growing interest in cybersecurity, where I explore penetration testing, email security, and database protection to better understand how applications can be made safer and more reliable.</p>
            <div className="about-bio-rule" aria-hidden="true"><span /><span /><span /></div>
          </motion.div>
          <div className="about-expertise">{stats.map((stat, index) => <motion.div key={stat.label} className="about-expertise-card" initial={reducedMotion ? false : { opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: reducedMotion ? 0 : 0.45, delay: reducedMotion ? 0 : index * 0.07 }}>
            <span className="about-expertise-icon" aria-hidden="true">{stat.icon}</span><div><span className="about-expertise-label">{stat.label}</span><strong>{stat.value}</strong></div><span className="about-expertise-number" aria-hidden="true">0{index + 1}</span>
          </motion.div>)}</div>
        </div>
      </div>
    </section>
  );
};

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Code, Shield, ArrowRight, Terminal as TerminalIcon, Cpu, Volume2, VolumeX } from "lucide-react";
import { FaReact, FaNodeJs, FaPython, FaPhp, FaJava } from "react-icons/fa";
import { SiTailwindcss, SiPostgresql, SiMysql } from "react-icons/si";

import { FloatingParticles } from "./components/FloatingParticles";
import { CustomCursor } from "./components/CustomCursor";
import { StaggeredText } from "./components/StaggeredText";
import { LoadingScreen } from "./components/LoadingScreen";
import { AboutSection } from "./components/AboutSection";
import { ProjectsSection } from "./components/ProjectsSection";
import { ContactSection } from "./components/ContactSection";
import { Footer } from "./components/Footer";
import { MatrixRain } from "./components/MatrixRain";
import { TerminalModal } from "./components/TerminalModal";
import { playClickSfx, playHoverSfx, setMuted, getMuted } from "./utils/soundEffects";

import "./styles/App.css";

export default function App() {
  const [loading, setLoading] = useState(() => {
    return !sessionStorage.getItem("hasLoaded");
  });
  const [progress, setProgress] = useState(loading ? 0 : 100);
  const [terminalText, setTerminalText] = useState("Establishing secure connection...");
  
  const [activeSection, setActiveSection] = useState("home");
  const [matrixActive, setMatrixActive] = useState(false);
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  const homeRef = useRef(null);
  const aboutRef = useRef(null);
  const projectsRef = useRef(null);
  const contactRef = useRef(null);

  // Global key listener for '~' to open terminal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "`" || e.key === "~") {
        e.preventDefault();
        setTerminalOpen((prev) => !prev);
        playClickSfx();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const toggleAudio = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    setMuted(nextMuted);
    playClickSfx();
  };

  const smoothScrollTo = (targetPosition, duration = 800) => {
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let startTime = null;

    const animation = (currentTime) => {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const run = easeInOutQuad(timeElapsed, startPosition, distance, duration);
      window.scrollTo(0, run);
      if (timeElapsed < duration) {
        requestAnimationFrame(animation);
      }
    };

    const easeInOutQuad = (t, b, c, d) => {
      t /= d / 2;
      if (t < 1) return (c / 2) * t * t + b;
      t--;
      return (-c / 2) * (t * (t - 2) - 1) + b;
    };

    requestAnimationFrame(animation);
  };

  const scrollToSection = (ref, sectionName) => {
    playClickSfx();
    if (sectionName === "home") {
      smoothScrollTo(0, 800);
    } else if (ref.current) {
      const headerOffset = 90;
      const elementPosition = ref.current.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      smoothScrollTo(offsetPosition, 800);
    }
    setActiveSection(sectionName);
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 300;

      const aboutPos = aboutRef.current ? aboutRef.current.offsetTop : 500;
      const projectsPos = projectsRef.current ? projectsRef.current.offsetTop : 1200;
      const contactPos = contactRef.current ? contactRef.current.offsetTop : 2200;

      if (scrollPos >= contactPos) {
        setActiveSection("contact");
      } else if (scrollPos >= projectsPos) {
        setActiveSection("projects");
      } else if (scrollPos >= aboutPos) {
        setActiveSection("about");
      } else {
        setActiveSection("home");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const link = document.createElement("link");
    link.href = "https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700&family=Outfit:wght@300;400;500;600&family=Space+Grotesk:wght@500;700;900&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
  }, []);

  const terminalSteps = [
    "Loading vulnerability scanner modules...",
    "Compiling full-stack components...",
    "Establishing secure local nodes...",
    "Encrypting database connections...",
    "Optimizing WebGL shaders...",
    "System override confirmed..."
  ];

  useEffect(() => {
    if (!loading) return;

    if (progress >= 100) {
      const timeout = setTimeout(() => {
        setLoading(false);
        sessionStorage.setItem("hasLoaded", "true");
      }, 900);
      return () => clearTimeout(timeout);
    }
    const timer = setInterval(() => {
      setProgress((prev) => Math.min(prev + Math.floor(Math.random() * 12) + 2, 100));
    }, 100);
    return () => clearInterval(timer);
  }, [progress, loading]);

  useEffect(() => {
    if (!loading) return;

    if (progress >= 100) {
      setTerminalText(terminalSteps[terminalSteps.length - 1]);
      return;
    }
    const interval = setInterval(() => {
      setTerminalText(terminalSteps[Math.floor(Math.random() * (terminalSteps.length - 1))]);
    }, 250);
    return () => clearInterval(interval);
  }, [progress, loading]);

  const skills = [
    { name: "React", icon: <FaReact className="text-cyan-400 text-base" /> },
    { name: "Node.js", icon: <FaNodeJs className="text-green-400 text-base" /> },
    { name: "Python", icon: <FaPython className="text-yellow-400 text-base" /> },
    { name: "PHP", icon: <FaPhp className="text-indigo-400 text-base" /> },
    { name: "Java", icon: <FaJava className="text-red-400 text-base" /> },
    { name: "TailwindCSS", icon: <SiTailwindcss className="text-teal-400 text-base" /> },
    { name: "PostgreSQL", icon: <SiPostgresql className="text-blue-400 text-base" /> },
    { name: "MySQL", icon: <SiMysql className="text-orange-400 text-base" /> },
  ];

  const projects = [
    { 
      title: "Portfolio 1.0", 
      desc: "High-performance cyberpunk-themed personal portfolio web app featuring CRT screen effects, custom cursor, and dynamic component architecture.", 
      tags: ["React", "TailwindCSS", "Framer Motion"],
      image: "/portfolio.png",
      github: "https://github.com/JerichoooB/portfolio1.0"
    },
    { 
      title: "School Management System", 
      desc: "Full-stack school management information system designed to handle student enrollment, records, and administrative database workflows.", 
      tags: ["PHP", "MySQL", "TailwindCSS"],
      image: "/school-system.png",
      github: "https://github.com/JerichoooB/school-system"
    },
    { 
      title: "SQL Database Tool", 
      desc: "Database query optimization and management scripts focused on relational schema design, secure querying, and data auditing.", 
      tags: ["SQL", "PostgreSQL", "Database"],
      image: "/sql.png",
      github: "https://github.com/JerichoooB/sql"
    },
    { 
      title: "Digibag", 
      desc: "Digital inventory and bag management platform featuring user authentication, item categorization, and structured asset tracking.", 
      tags: ["React", "Node.js", "MySQL"],
      image: "/digibag.png",
      github: "https://github.com/JerichoooB/DIGIBAG"
    },
    { 
      title: "Todo List", 
      desc: "Dynamic task management interface built with state preservation, categorization filters, and fluid interactive animations.", 
      tags: ["React", "TailwindCSS", "JavaScript"],
      image: "/todolist.png",
      github: "https://github.com/JerichoooB/todo-list"
    },
    { 
      title: "Memory Game", 
      desc: "Interactive web-based memory matching game built with state management, move counters, and engaging UI feedback.", 
      tags: ["React", "JavaScript", "CSS"],
      image: "/memorygame.png",
      github: "https://github.com/JerichoooB/memorygame"
    }
  ];

  return (
    <div ref={homeRef} className="relative min-h-screen cursor-none overflow-x-hidden bg-[#07090E] font-['Outfit'] text-slate-200 selection:bg-cyan-500/30 selection:text-white">
      
      {/* CRT Scanline Screen Overlay */}
      <div className="fixed inset-0 z-50 pointer-events-none crt-overlay opacity-40" />

      {/* Matrix Code Rain Effect */}
      {matrixActive && <MatrixRain />}

      {/* Enhanced Multi-Layered Cyber Background */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px]" />

        <motion.div 
          animate={{ scale: [1, 1.3, 1], opacity: [0.12, 0.22, 0.12], x: [0, 30, 0] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -left-40 -top-40 h-[650px] w-[650px] rounded-full bg-cyan-600/15 blur-[160px]" 
        />
        <motion.div 
          animate={{ scale: [1, 1.25, 1], opacity: [0.1, 0.18, 0.1], y: [0, -40, 0] }}
          transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute right-0 top-1/2 h-[850px] w-[850px] -translate-y-1/2 translate-x-1/3 rounded-full bg-purple-600/15 blur-[190px]" 
        />
        <motion.div 
          animate={{ scale: [0.9, 1.15, 0.9], opacity: [0.08, 0.15, 0.08] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 4 }}
          className="absolute left-1/4 bottom-[-10%] h-[500px] w-[500px] rounded-full bg-blue-600/15 blur-[140px]" 
        />
      </div>

      <FloatingParticles />
      <CustomCursor />

      {/* Terminal Modal */}
      <TerminalModal 
        isOpen={terminalOpen} 
        onClose={() => setTerminalOpen(false)} 
        scrollToSection={scrollToSection}
        refs={{ aboutRef, projectsRef, contactRef }}
      />

      <AnimatePresence mode="wait">
        {loading ? (
          <LoadingScreen key="preloader" progress={progress} terminalText={terminalText} />
        ) : (
          <div className="relative z-10 flex flex-col min-h-screen">
            
            {/* Fixed Navbar Header */}
            <motion.header
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="fixed top-0 left-0 right-0 z-50 w-full bg-[#07090E]/85 backdrop-blur-xl border-b border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.5)]"
            >
              <div className="mx-auto max-w-7xl flex items-center justify-between px-6 py-4 md:py-5">
                <motion.div whileHover={{ scale: 1.05 }} className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-cyan-500/30 bg-cyan-500/10 text-cyan-400">
                    <img src="/logo.png" alt="Logo" className="w-6 h-6 object-contain" />
                  </div>
                  <span className="font-['Space_Grotesk'] text-2xl font-black tracking-widest text-white">RIRI<span className="text-cyan-500">.DEV</span></span>
                </motion.div>
                
                <div className="hidden items-center gap-8 font-['Outfit'] text-sm font-semibold tracking-wide md:flex">
                  <button 
                    onClick={() => scrollToSection(homeRef, "home")}
                    onMouseEnter={playHoverSfx}
                    className={`cursor-none transition-colors bg-transparent border-none p-0 font-semibold relative ${
                      activeSection === "home" 
                        ? "text-white after:absolute after:-bottom-2 after:left-0 after:h-0.5 after:w-full after:bg-cyan-400 after:shadow-[0_0_10px_rgba(0,240,255,0.8)] after:content-['']" 
                        : "text-slate-400 hover:text-cyan-300"
                    }`}
                  >
                    Home
                  </button>
                  <button 
                    onClick={() => scrollToSection(aboutRef, "about")}
                    onMouseEnter={playHoverSfx}
                    className={`cursor-none transition-colors bg-transparent border-none p-0 font-semibold relative ${
                      activeSection === "about" 
                        ? "text-white after:absolute after:-bottom-2 after:left-0 after:h-0.5 after:w-full after:bg-cyan-400 after:shadow-[0_0_10px_rgba(0,240,255,0.8)] after:content-['']" 
                        : "text-slate-400 hover:text-cyan-300"
                    }`}
                  >
                    About
                  </button>
                  <button 
                    onClick={() => scrollToSection(projectsRef, "projects")} 
                    onMouseEnter={playHoverSfx}
                    className={`cursor-none transition-colors text-left bg-transparent border-none p-0 font-semibold relative ${
                      activeSection === "projects" 
                        ? "text-white after:absolute after:-bottom-2 after:left-0 after:h-0.5 after:w-full after:bg-cyan-400 after:shadow-[0_0_10px_rgba(0,240,255,0.8)] after:content-['']" 
                        : "text-slate-400 hover:text-cyan-300"
                    }`}
                  >
                    Projects
                  </button>
                  <button 
                    onClick={() => scrollToSection(contactRef, "contact")}
                    onMouseEnter={playHoverSfx}
                    className={`cursor-none transition-colors bg-transparent border-none p-0 font-semibold relative ${
                      activeSection === "contact" 
                        ? "text-white after:absolute after:-bottom-2 after:left-0 after:h-0.5 after:w-full after:bg-cyan-400 after:shadow-[0_0_10px_rgba(0,240,255,0.8)] after:content-['']" 
                        : "text-slate-400 hover:text-cyan-300"
                    }`}
                  >
                    Contact
                  </button>
                </div>

                <div className="flex items-center gap-3">
                  {/* Matrix Rain Toggle Button */}
                  <button 
                    onClick={() => { playClickSfx(); setMatrixActive(!matrixActive); }}
                    onMouseEnter={playHoverSfx}
                    title="Toggle Matrix Rain"
                    className={`cursor-none p-2.5 rounded-xl border transition-all ${
                      matrixActive 
                        ? "border-cyan-400 bg-cyan-400/20 text-cyan-300 shadow-[0_0_15px_rgba(0,240,255,0.5)]" 
                        : "border-white/10 bg-white/5 text-slate-400 hover:text-white"
                    }`}
                  >
                    <Cpu size={18} />
                  </button>

                  {/* Terminal Modal Trigger Button */}
                  <button 
                    onClick={() => { playClickSfx(); setTerminalOpen(true); }}
                    onMouseEnter={playHoverSfx}
                    title="Open Terminal (~)"
                    className="cursor-none p-2.5 rounded-xl border border-white/10 bg-white/5 text-slate-400 hover:text-cyan-400 hover:border-cyan-400/40 transition-all"
                  >
                    <TerminalIcon size={18} />
                  </button>

                  {/* Audio Mute Toggle Button */}
                  <button 
                    onClick={toggleAudio}
                    onMouseEnter={playHoverSfx}
                    title={isMuted ? "Unmute SFX" : "Mute SFX"}
                    className="cursor-none p-2.5 rounded-xl border border-white/10 bg-white/5 text-slate-400 hover:text-white transition-all"
                  >
                    {isMuted ? <VolumeX size={18} className="text-red-400" /> : <Volume2 size={18} className="text-cyan-400" />}
                  </button>

                  <motion.button 
                    onClick={() => scrollToSection(contactRef, "contact")}
                    onMouseEnter={playHoverSfx}
                    whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                    className="hidden sm:inline-flex shimmer-btn relative overflow-hidden cursor-none rounded-full border border-cyan-400/50 bg-cyan-950/40 px-6 py-2.5 font-['JetBrains_Mono'] text-xs font-bold text-cyan-400 shadow-[0_0_20px_rgba(0,240,255,0.15)] transition-all hover:bg-cyan-400 hover:text-slate-950 hover:shadow-[0_0_30px_rgba(0,240,255,0.6)]"
                  >
                    Hire Me
                  </motion.button>
                </div>
              </div>
            </motion.header>

            {/* Main Content Area */}
            <motion.main
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mx-auto max-w-7xl cursor-none px-6 pt-24 pb-32 flex-grow w-full"
            >
              {/* Hero Section */}
              <div className="relative z-20 flex min-h-[calc(100vh-140px)] flex-col justify-center py-6">
                <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2">
                  <motion.div
                    variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } } }}
                    initial="hidden" animate="show"
                    className="flex flex-col"
                  >
                    <motion.div variants={{ hidden: { opacity: 0, x: -20 }, show: { opacity: 1, x: 0 } }} className="mb-4 flex items-center gap-3">
                      <div className="flex items-center justify-center rounded-md border border-purple-500/30 bg-purple-500/10 p-1.5">
                        <Shield size={14} className="text-purple-400" />
                      </div>
                      <span className="font-['JetBrains_Mono'] text-xs font-semibold uppercase tracking-widest text-purple-400">Web Dev & Basic Pen Testing</span>
                    </motion.div>
                    
                    <h1 className="mb-4 font-['Space_Grotesk'] text-4xl font-black leading-[1.1] text-white md:text-6xl">
                      <StaggeredText text="DESIGNING SECURE" className="block" />
                      <motion.span 
                        variants={{ hidden: { opacity: 0, filter: "blur(10px)" }, show: { opacity: 1, filter: "blur(0px)" } }}
                        transition={{ duration: 1, delay: 0.6 }}
                        className="mt-2 block filter bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(0,240,255,0.4)]"
                      >
                        DIGITAL EXPERIENCES
                      </motion.span>
                    </h1>
                    
                    <motion.p variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }} className="mb-6 max-w-lg font-['Outfit'] text-base font-light leading-relaxed text-slate-400">
                      Full-stack web developer and security enthusiast specializing in building robust applications and performing foundational penetration testing.
                    </motion.p>
                    
                    <motion.div variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }} className="flex flex-wrap items-center gap-4">
                      <motion.button 
                        onClick={() => scrollToSection(projectsRef, "projects")} 
                        onMouseEnter={playHoverSfx}
                        whileHover={{ scale: 1.05 }} 
                        whileTap={{ scale: 0.95 }} 
                        className="shimmer-btn relative overflow-hidden flex cursor-none items-center gap-2 rounded-xl bg-cyan-400 px-7 py-3.5 font-['Space_Grotesk'] text-base font-bold text-slate-950 shadow-[0_0_20px_rgba(0,240,255,0.4)] transition-all hover:shadow-[0_0_40px_rgba(0,240,255,0.7)]"
                      >
                        Explore My Work <ArrowRight size={18} />
                      </motion.button>
                      <motion.button 
                        onClick={() => { playClickSfx(); setTerminalOpen(true); }}
                        onMouseEnter={playHoverSfx}
                        whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.1)" }} 
                        whileTap={{ scale: 0.95 }} 
                        className="cursor-none rounded-xl border border-white/20 bg-white/5 px-7 py-3.5 font-['Space_Grotesk'] text-base font-bold text-white backdrop-blur-md transition-colors flex items-center gap-2"
                      >
                        <TerminalIcon size={16} className="text-cyan-400" /> Open CLI
                      </motion.button>
                    </motion.div>

                    {/* Skills / Tech Stack Badges */}
                    <motion.div variants={{ hidden: { opacity: 0 }, show: { opacity: 1 } }} className="mt-8 flex flex-wrap gap-3">
                      {skills.map((skill) => (
                        <motion.span 
                          key={skill.name} 
                          onMouseEnter={playHoverSfx}
                          whileHover={{ y: -2, borderColor: "rgba(178,0,255,0.5)" }} 
                          className="flex cursor-none items-center gap-2.5 rounded-full border border-white/10 bg-white/5 px-4 py-2 font-['JetBrains_Mono'] text-xs font-medium text-slate-300 backdrop-blur-sm transition-colors"
                        >
                          {skill.icon} {skill.name}
                        </motion.span>
                      ))}
                    </motion.div>
                  </motion.div>

                  {/* 3D Visual Column */}
                  <motion.div 
                    initial={{ opacity: 0, filter: "blur(20px)" }}
                    animate={{ opacity: 1, filter: "blur(0px)" }}
                    transition={{ delay: 0.8, duration: 1.2 }}
                    className="pointer-events-none relative flex h-[350px] w-full items-center justify-center [perspective:1200px] md:h-[480px]"
                  >
                    <motion.div animate={{ rotate: 360 }} transition={{ duration: 30, repeat: Infinity, ease: "linear" }} className="absolute h-80 w-80 rounded-full border border-dashed border-cyan-500/20" />
                    <motion.div animate={{ rotate: -360 }} transition={{ duration: 25, repeat: Infinity, ease: "linear" }} className="absolute h-[18rem] w-[18rem] rounded-full border border-dotted border-purple-500/20" />

                    <div className="relative h-60 w-60 md:h-80 md:w-80" style={{ transformStyle: "preserve-3d", transform: "rotateX(60deg) rotateZ(-45deg)" }}>
                      <motion.div className="absolute inset-[-10%] rounded-[3rem] border border-cyan-500/10 bg-cyan-900/10 shadow-[0_0_50px_rgba(0,240,255,0.05)]" animate={{ translateZ: [-20, 0, -20] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }} />
                      <motion.div className="absolute inset-0 overflow-hidden rounded-[2.5rem] border border-white/5 border-l-purple-500/60 border-t-purple-500/60 bg-slate-900/60 shadow-[40px_40px_60px_rgba(0,0,0,0.9)] backdrop-blur-xl" animate={{ translateZ: [0, 40, 0] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }} style={{ transformStyle: "preserve-3d" }}>
                        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:16px_16px]" />
                        <motion.div animate={{ top: ['-10%', '110%'] }} transition={{ duration: 4, repeat: Infinity, ease: "linear" }} className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-50 shadow-[0_0_10px_#00F0FF]" />
                      </motion.div>
                      <motion.div className="absolute inset-6 flex items-center justify-center overflow-hidden rounded-3xl border border-cyan-500/30 border-l-cyan-400 border-t-cyan-400 bg-cyan-950/20 shadow-[0_0_40px_rgba(0,240,255,0.15)] backdrop-blur-lg" animate={{ translateZ: [50, 100, 50] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}>
                        <div className="absolute left-4 top-4 h-2 w-2 rounded-full bg-cyan-400 shadow-[0_0_10px_#00F0FF]" />
                        <div className="absolute bottom-4 right-4 h-2 w-2 rounded-full bg-purple-400 shadow-[0_0_10px_#B200FF]" />
                        <motion.div animate={{ rotateZ: 360 }} transition={{ duration: 15, repeat: Infinity, ease: "linear" }} className="absolute h-24 w-24 rounded-full border-2 border-dotted border-purple-400/40" />
                        <motion.div animate={{ rotateZ: -360 }} transition={{ duration: 10, repeat: Infinity, ease: "linear" }} className="absolute h-16 w-16 rounded-full border-4 border-dashed border-cyan-400/50" />
                        <div className="h-12 w-12 rounded-full border border-cyan-300/30 bg-cyan-500/10" />
                      </motion.div>
                      <motion.div className="absolute inset-16 flex items-center justify-center rounded-2xl border border-white/20 bg-white/5 shadow-2xl backdrop-blur-md" animate={{ translateZ: [100, 160, 100] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}>
                        <div className="absolute left-3 top-3 flex flex-col gap-1">
                          <div className="h-1 w-6 rounded bg-white/20" />
                          <div className="h-1 w-4 rounded bg-white/20" />
                        </div>
                        <div className="absolute bottom-3 right-3 flex items-end gap-1">
                          <motion.div animate={{ height: ['4px', '12px', '4px'] }} transition={{ duration: 1, repeat: Infinity }} className="w-1 rounded bg-cyan-400/50" />
                          <motion.div animate={{ height: ['12px', '24px', '12px'] }} transition={{ duration: 1.5, repeat: Infinity }} className="w-1 rounded bg-purple-400/50" />
                          <motion.div animate={{ height: ['8px', '16px', '8px'] }} transition={{ duration: 1.2, repeat: Infinity }} className="w-1 rounded bg-cyan-400/50" />
                        </div>
                        <motion.div animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 180] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-purple-600 to-cyan-400 shadow-[0_0_40px_rgba(178,0,255,0.8)]">
                          <div className="h-5 w-5 rounded-md border border-white/30 bg-slate-900/50" />
                        </motion.div>
                      </motion.div>
                      <motion.div className="absolute left-1/2 top-0 h-3 w-3 rounded-full bg-cyan-300 shadow-[0_0_15px_#00F0FF]" animate={{ translateZ: [120, 200, 120], y: [-20, 20, -20] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }} />
                      <motion.div className="absolute bottom-10 right-0 h-4 w-4 rounded-full bg-purple-400 shadow-[0_0_20px_#B200FF]" animate={{ translateZ: [80, 150, 80], x: [-20, 20, -20] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.5 }} />
                    </div>
                  </motion.div>
                </div>
              </div>

              {/* About Section Component (2nd) */}
              <AboutSection aboutRef={aboutRef} />

              {/* Projects Section Component (3rd) */}
              <ProjectsSection projectsRef={projectsRef} projects={projects} />

              {/* Contact Section Component (4th) */}
              <ContactSection contactRef={contactRef} />

            </motion.main>

            {/* Footer Component */}
            <Footer />
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
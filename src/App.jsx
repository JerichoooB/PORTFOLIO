import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, MotionConfig } from "framer-motion";
import { Terminal as TerminalIcon, Volume2, VolumeX, Menu, X, ArrowRight } from "lucide-react";
import { FaReact, FaNodeJs, FaPython, FaPhp, FaJava } from "react-icons/fa";
import { SiTailwindcss, SiPostgresql, SiMysql } from "react-icons/si";

import { CustomCursor } from "./components/CustomCursor";
import { HeroSection } from "./components/HeroSection";
import { LoadingScreen } from "./components/LoadingScreen";
import { AboutSection } from "./components/AboutSection";
import { ProjectsSection } from "./components/ProjectsSection";
import { ContactSection } from "./components/ContactSection";
import { Footer } from "./components/Footer";
import { MatrixRain } from "./components/MatrixRain";
import { TerminalModal } from "./components/TerminalModal";
import { playClickSfx, playHoverSfx, setMuted } from "./utils/soundEffects";

import "./styles/App.css";

function MatrixRainToggle({ active, onToggle }) {
  return <button type="button" role="switch" aria-checked={active} aria-label="Matrix rain" title={`Turn Matrix rain ${active ? 'off' : 'on'}`} className="matrix-rain-toggle" onClick={onToggle}>
    <span>Matrix rain</span><span className="matrix-toggle-state" aria-hidden="true">{active ? 'On' : 'Off'}</span><span className="matrix-toggle-track" aria-hidden="true"><span /></span>
  </button>;
}

export default function App() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(loading ? 0 : 100);

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const mobileMenuButton = useRef(null);
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
    setMobileMenuOpen(false);
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

  const finishIntro = () => {
    setLoading(false);
  };

  useEffect(() => {
    if (!loading) return;
    const started = performance.now();
    const duration = 1550;
    let frame;
    const update = (now) => {
      const elapsed = now - started;
      setProgress(Math.min(100, Math.round((elapsed / duration) * 100)));
      if (elapsed < duration) frame = requestAnimationFrame(update);
      else {
        setLoading(false);
      }
    };
    frame = requestAnimationFrame(update);
    return () => cancelAnimationFrame(frame);
  }, [loading]);

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
      tags: ["React", "Node.js", "Tailwind CSS", "PostgreSQL"],
      image: "/school-hub.png",
      github: "https://github.com/JerichoooB/school-system",
      live: "https://schoolhub-ri.vercel.app/"
    },
    {
      title: "Recall — School Reviewer",
      desc: "A local-first study companion with spaced-repetition flashcards, PDF and PowerPoint quiz generation, and progress tracking. Study data stays in the browser with offline support.",
      tags: ["React", "Tailwind CSS", "IndexedDB", "PWA"],
      image: "/school-reviewer.png",
      github: "https://github.com/JerichoooB/SCHOOL-REVIEWER",
      live: "https://riri-recall.vercel.app/"
    },
    {
      title: "LifeOS — Personal Life",
      desc: "A personal workspace for tasks, diary entries, goals, habits, and budgeting, with calendar planning, local data storage, and offline PWA support.",
      tags: ["React", "Tailwind CSS", "Framer Motion", "PWA"],
      image: "/personal-life.png",
      github: "https://github.com/JerichoooB/MY-PERSONAL-LIFE-WESBSITE",
      live: "https://ririsos.vercel.app/"
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
      title: "Clover Clothing Shop",
      desc: "Fashion storefront with a responsive catalog, customer accounts, shopping bag, simulated checkout, and administrator tools for inventory and orders.",
      tags: ["React", "TailwindCSS", "Node.js", "PostgreSQL"],
      image: "/clothing-shop.png",
      github: "https://github.com/JerichoooB/CLOTHING-SHOP",
      live: "https://clovercloth.vercel.app/"
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
    <MotionConfig reducedMotion="user">
    <div ref={homeRef} className="site-shell relative min-h-screen overflow-x-hidden bg-[#07090E] font-sans text-slate-200 selection:bg-cyan-500/30 selection:text-white">

      {/* CRT Scanline Screen Overlay */}
      <div className="fixed inset-0 z-50 pointer-events-none crt-overlay opacity-[0.04]" />

      {/* Matrix Code Rain Effect */}
      {matrixActive && <MatrixRain />}

      <div className="site-ambient" aria-hidden="true" />

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
          <LoadingScreen key="preloader" progress={progress} onSkip={finishIntro} />
        ) : (
          <div className="relative z-10 flex flex-col min-h-screen">

            {/* Fixed Navbar Header */}
            <motion.header
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="site-header fixed top-0 left-0 right-0 z-50 w-full bg-[#07090E]/85 backdrop-blur-xl border-b border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.5)]"
            >
              <div className="mx-auto max-w-7xl flex items-center justify-between px-6 py-4 md:py-5">
                <motion.div whileHover={{ scale: 1.05 }} className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-cyan-500/30 bg-cyan-500/10 text-cyan-400">
                    <img src="/logo.png" alt="Logo" className="w-6 h-6 object-contain" />
                  </div>
                  <span className="font-display text-2xl font-black tracking-widest text-white">RIRI<span className="text-cyan-500">.DEV</span></span>
                </motion.div>

                <div className="hidden items-center gap-8 font-sans text-sm font-semibold tracking-wide md:flex">
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

                <div className="header-actions flex items-center gap-3">
                  <div className="desktop-matrix-toggle"><MatrixRainToggle active={matrixActive} onToggle={() => { playClickSfx(); setMatrixActive(value => !value); }} /></div>

                  {/* Terminal Modal Trigger Button */}
                  <button 
                    onClick={() => { playClickSfx(); setTerminalOpen(true); }}
                    onMouseEnter={playHoverSfx}
                    title="Open Terminal (~)" aria-label="Open terminal"
                    className="cursor-none p-2.5 rounded-xl border border-white/10 bg-white/5 text-slate-400 hover:text-cyan-400 hover:border-cyan-400/40 transition-all"
                  >
                    <TerminalIcon size={18} />
                  </button>

                  {/* Audio Mute Toggle Button */}
                  <button 
                    onClick={toggleAudio}
                    onMouseEnter={playHoverSfx}
                    aria-label={isMuted ? "Unmute sound effects" : "Mute sound effects"}
                    title={isMuted ? "Unmute SFX" : "Mute SFX"}
                    className="cursor-none p-2.5 rounded-xl border border-white/10 bg-white/5 text-slate-400 hover:text-white transition-all"
                  >
                    {isMuted ? <VolumeX size={18} className="text-red-400" /> : <Volume2 size={18} className="text-cyan-400" />}
                  </button>

                  <motion.button 
                    onClick={() => scrollToSection(contactRef, "contact")}
                    onMouseEnter={playHoverSfx}
                    whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                    className="hidden sm:inline-flex shimmer-btn relative overflow-hidden cursor-none rounded-full border border-cyan-400/50 bg-cyan-950/40 px-6 py-2.5 font-mono text-xs font-bold text-cyan-400 shadow-[0_0_20px_rgba(0,240,255,0.15)] transition-all hover:bg-cyan-400 hover:text-slate-950 hover:shadow-[0_0_30px_rgba(0,240,255,0.6)]"
                  >
                    Hire Me
                  </motion.button>
                  <button ref={mobileMenuButton} className="mobile-menu-toggle" aria-label={mobileMenuOpen ? "Close navigation" : "Open navigation"} aria-expanded={mobileMenuOpen} aria-controls="mobile-navigation" onClick={() => setMobileMenuOpen(open => !open)}>{mobileMenuOpen ? <X size={21} /> : <Menu size={21} />}</button>
                </div>
              </div>
              {mobileMenuOpen && <nav id="mobile-navigation" className="mobile-navigation" aria-label="Mobile navigation" onKeyDown={event => { if (event.key === 'Escape') { setMobileMenuOpen(false); mobileMenuButton.current?.focus(); } }}>
                {[["home",homeRef],["about",aboutRef],["projects",projectsRef],["contact",contactRef]].map(([name,ref],index) => <button key={name} aria-current={activeSection === name ? 'page' : undefined} onClick={() => { scrollToSection(ref,name); mobileMenuButton.current?.focus(); }}><span>0{index+1}</span>{name}<ArrowRight size={17} /></button>)}
                <div className="mobile-effects"><span>Background effect</span><MatrixRainToggle active={matrixActive} onToggle={() => { playClickSfx(); setMatrixActive(value => !value); }} /></div>
                <p>CODE. CURIOSITY. A LITTLE PERSONALITY.</p>
              </nav>}
            </motion.header>

            {/* Main Content Area */}
            <motion.main
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mx-auto max-w-7xl cursor-none px-6 pt-24 pb-12 flex-grow w-full"
            >
              <HeroSection
                skills={skills}
                onProjects={() => scrollToSection(projectsRef, "projects")}
                onContact={() => scrollToSection(contactRef, "contact")}
                onTerminal={() => { playClickSfx(); setTerminalOpen(true); }}
              />

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
    </MotionConfig>
  );
}
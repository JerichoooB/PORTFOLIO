import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import "../styles/LoadingScreen.css";

export const LoadingScreen = ({ progress, onSkip }) => {
  const reducedMotion = useReducedMotion();
  const stage = progress < 35 ? "A little code." : progress < 75 ? "A little curiosity." : "A world of possibilities.";
  return (
    <motion.div key="preloader" initial={{ opacity: 1 }} exit={{ opacity: 0, y: reducedMotion ? 0 : -18 }} transition={{ duration: reducedMotion ? 0.1 : 0.45 }} className="intro-loader">
      <div className="intro-loader-grid" aria-hidden="true" />
      <div className="intro-loader-top"><span>RIRI<span className="intro-mint">.DEV</span></span><span>PERSONAL PORTFOLIO / 2026</span></div>
      <div className="intro-loader-content">
        <div className="intro-monogram" aria-hidden="true"><span>r.</span><svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="46" className="intro-ring-track" /><circle cx="50" cy="50" r="46" className="intro-ring-progress" pathLength="100" strokeDasharray="100" strokeDashoffset={100-progress} /></svg></div>
        <p className="intro-loader-eyebrow">WELCOME TO MY CORNER OF THE WEB</p>
        <h2>Ideas into <span>experiences.</span></h2>
        <p className="intro-loader-stage" role="status">{stage}</p>
        <div className="intro-loader-progress" role="progressbar" aria-label="Portfolio introduction" aria-valuemin={0} aria-valuemax={100} aria-valuenow={progress}><span style={{ width: `${progress}%` }} /></div>
        <div className="intro-loader-progress-label"><span>{progress === 100 ? "READY WHEN YOU ARE" : "SETTING THE SCENE"}</span><span>{String(progress).padStart(2, "0")}<small> / 100</small></span></div>
      </div>
      <div className="intro-loader-bottom"><span>DEVELOPED WITH INTENTION.</span><button onClick={onSkip}>Skip intro <ArrowRight size={14} /></button></div>
    </motion.div>
  );
};

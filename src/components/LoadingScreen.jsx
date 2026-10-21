import React from "react";
import { motion } from "framer-motion";
import { Terminal } from "lucide-react";
import "../styles/LoadingScreen.css";

export const LoadingScreen = ({ progress, terminalText }) => (
  <motion.div
    key="preloader"
    initial={{ opacity: 1 }}
    exit={{ opacity: 0, scale: 1.05, filter: "blur(15px)" }}
    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    className="fixed inset-0 z-[100] flex cursor-none flex-col items-center justify-center bg-slate-950"
  >
    <div className="relative flex h-72 w-72 items-center justify-center">
      <motion.div
        className="absolute h-full w-full rounded-full border border-cyan-500/20 border-b-purple-500 border-t-cyan-400 shadow-[0_0_40px_rgba(0,240,255,0.2)] mix-blend-screen"
        animate={{ rotateZ: 360, rotateX: 180, scale: [1, 1.05, 1] }}
        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        style={{ transformStyle: "preserve-3d" }}
      />
      <motion.div
        className="absolute h-56 w-56 rounded-full border border-purple-500/20 border-l-cyan-400 border-r-purple-400 mix-blend-screen"
        animate={{ rotateZ: -360, rotateY: 180, scale: [1, 1.1, 1] }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        style={{ transformStyle: "preserve-3d" }}
      />
      <motion.div
        className="absolute h-40 w-40 rounded-full border-2 border-dashed border-white/10 border-t-white/60"
        animate={{ rotateZ: 360 }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
      />
      <div className="absolute text-center">
        <motion.span className="font-['Space_Grotesk'] text-6xl font-black neon-percentage">
          {progress}%
        </motion.span>
      </div>
    </div>
    <div className="mt-16 flex flex-col items-center font-['JetBrains_Mono'] text-sm tracking-widest text-cyan-500/80">
      <div className="mb-2 flex items-center gap-2">
        <Terminal size={14} className="text-purple-400" />
        <p>RIRI.DEV_INIT <motion.span animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 0.8 }}>_</motion.span></p>
      </div>
      <motion.p 
        key={terminalText}
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-xs text-slate-500"
      >
        {terminalText}
      </motion.p>
    </div>
  </motion.div>
);
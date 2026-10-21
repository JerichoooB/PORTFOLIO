import React from "react";
import { ShieldCheck } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="relative z-10 border-t border-white/10 bg-slate-950/80 py-8 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="font-['Space_Grotesk'] text-sm font-bold text-white tracking-widest">RIRI<span className="text-cyan-500">.DEV</span></span>
          <span className="font-['Outfit'] text-xs text-slate-500">© 2026 All rights reserved.</span>
        </div>

        {/* Live Security / Node Status Widget */}
        <div className="flex items-center gap-2 px-4 py-2 rounded-xl border border-cyan-500/30 bg-cyan-950/20 font-['JetBrains_Mono'] text-xs text-cyan-400 shadow-[0_0_15px_rgba(0,240,255,0.1)]">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
          </span>
          <ShieldCheck size={14} className="text-cyan-400 ml-1" />
          <span>Node: Secured [AES-256] | Uptime: 99.9%</span>
        </div>
      </div>
    </footer>
  );
};
import React from "react";
import { Code } from "lucide-react";
import { FaFacebook, FaGithub } from "react-icons/fa";

export const Footer = () => {
  return (
    <footer className="relative z-20 border-t border-white/10 bg-[#07090E]/90 py-10 px-6 backdrop-blur-xl mt-20">
      <div className="mx-auto max-w-7xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-cyan-500/30 bg-cyan-500/10 text-cyan-400">
            <Code size={18} />
          </div>
          <span className="font-['Space_Grotesk'] text-xl font-black tracking-widest text-white">RIRI<span className="text-cyan-500">.DEV</span></span>
        </div>

        <p className="font-['Outfit'] text-xs text-slate-400 text-center">
          © {new Date().getFullYear()} RIRI.DEV. All security nodes secured & encrypted.
        </p>

        <div className="flex items-center gap-4">
          <a href="https://www.facebook.com/jddelacruz.89" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-cyan-400 transition-colors p-2 cursor-none" title="Facebook">
            <FaFacebook size={18} />
          </a>
          <a href="https://github.com/JerichoooB" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-cyan-400 transition-colors p-2 cursor-none" title="GitHub">
            <FaGithub size={18} />
          </a>
        </div>
      </div>
    </footer>
  );
};
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Play } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { playClickSfx, playHoverSfx } from "../utils/soundEffects";
import { ProjectPlaygroundModal } from "./ProjectPlaygroundModal";

export const ProjectsSection = ({ projectsRef, projects }) => {
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <div ref={projectsRef} className="projects-container min-h-screen py-24 flex flex-col justify-center">
      <div className="mb-12 flex items-center gap-6">
        <h2 className="font-['Space_Grotesk'] text-3xl font-black text-white md:text-4xl">PROJECTS</h2>
        <div className="h-px flex-grow bg-gradient-to-r from-cyan-500/50 via-purple-500/50 to-transparent" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project, idx) => (
          <motion.div
            key={project.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            onMouseEnter={playHoverSfx}
            className="group rounded-2xl border border-white/10 bg-slate-900/60 p-6 backdrop-blur-xl flex flex-col justify-between hover:border-cyan-500/50 hover:shadow-[0_0_30px_rgba(0,240,255,0.15)] transition-all"
          >
            <div>
              <div className="h-40 w-full rounded-xl overflow-hidden mb-5 border border-white/10 bg-slate-950 relative">
                <img src={project.image} alt={project.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-100" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60" />
              </div>

              <h3 className="font-['Space_Grotesk'] text-xl font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
                {project.title}
              </h3>
              <p className="font-['Outfit'] text-sm text-slate-400 mb-6 leading-relaxed">
                {project.desc}
              </p>
            </div>

            <div>
              <div className="flex flex-wrap gap-2 mb-6">
                {project.tags.map((tag) => (
                  <span key={tag} className="font-['JetBrains_Mono'] text-[10px] text-cyan-400 bg-cyan-500/10 border border-cyan-500/30 px-2.5 py-1 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-white/10">
                {(project.title === "Memory Game" || project.title === "Todo List") && (
                  <button
                    onClick={() => { playClickSfx(); setSelectedProject(project); }}
                    onMouseEnter={playHoverSfx}
                    className="flex-grow flex items-center justify-center gap-2 rounded-xl bg-cyan-400 px-4 py-2.5 font-['JetBrains_Mono'] text-xs font-bold text-slate-950 shadow-[0_0_15px_rgba(0,240,255,0.3)] hover:shadow-[0_0_25px_rgba(0,240,255,0.6)] transition-all cursor-none"
                  >
                    <Play size={14} /> Play Demo
                  </button>
                )}
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  onMouseEnter={playHoverSfx}
                  onClick={playClickSfx}
                  className="flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 font-['JetBrains_Mono'] text-xs text-slate-300 hover:text-white hover:border-cyan-400/50 transition-colors cursor-none flex-grow"
                >
                  <FaGithub size={14} /> Source Code
                </a>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <ProjectPlaygroundModal
        isOpen={Boolean(selectedProject)}
        onClose={() => setSelectedProject(null)}
        project={selectedProject}
      />
    </div>
  );
};
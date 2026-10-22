import React from "react";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { FaGithub } from "react-icons/fa";

export const FlashlightCard = ({ title, desc, tags, image, github }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -6 }}
      className="group relative rounded-2xl border border-white/10 bg-slate-900/60 p-5 backdrop-blur-xl flex flex-col justify-between overflow-hidden shadow-[0_0_30px_rgba(0,0,0,0.5)]"
    >
      <div>
        {/* Project Image from Public folder */}
        <div className="relative h-48 w-full rounded-xl overflow-hidden border border-white/10 mb-5 bg-slate-950">
          <img 
            src={image} 
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-40" />
        </div>

        <h3 className="font-display text-xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">
          {title}
        </h3>
        <p className="font-sans text-sm text-slate-300 leading-relaxed mb-6">
          {desc}
        </p>
      </div>

      <div>
        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-6">
          {tags.map((tag, i) => (
            <span 
              key={i}
              className="rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 font-mono text-[11px] text-cyan-300"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* GitHub Repository Link Button */}
        {github && (
          <a 
            href={github} 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/5 px-4 py-2 font-display text-xs font-bold text-white transition-all hover:bg-cyan-400 hover:text-slate-950 hover:border-cyan-400"
          >
            <FaGithub size={16} /> View Repository <ExternalLink size={14} />
          </a>
        )}
      </div>
    </motion.div>
  );
};
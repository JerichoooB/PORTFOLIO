import React from "react";
import { FlashlightCard } from "./FlashlightCard";
import "../styles/ProjectsSection.css";

export const ProjectsSection = ({ projectsRef, projects }) => {
  return (
    <div ref={projectsRef} className="projects-container">
      <div className="mb-12 flex items-center gap-6">
        <h2 className="font-['Space_Grotesk'] text-3xl font-black text-white md:text-4xl">PROJECTS</h2>
        <div className="h-px flex-grow bg-gradient-to-r from-cyan-500/50 via-purple-500/50 to-transparent" />
      </div>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, index) => (
          <FlashlightCard 
            key={index} 
            index={index} 
            title={project.title} 
            desc={project.desc} 
            tags={project.tags} 
            image={project.image} 
            github={project.github}
          />
        ))}
      </div>
    </div>
  );
};
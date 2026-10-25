import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Play, Code2, Globe2 } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { ProjectPlaygroundModal } from "./ProjectPlaygroundModal";
import "../styles/ProjectsSection.css";

function ProjectImage({ project }) {
  return <div className="project-browser"><div className="project-browser-bar"><span aria-hidden="true"><i /><i /><i /></span><span>{project.title === 'LifeOS — Personal Life' ? 'lifeos / personal workspace' : project.title === 'Clover Clothing Shop' ? 'clover / storefront' : project.title.toLowerCase()}</span><ArrowUpRight size={13} /></div><div className="project-image"><img src={project.image} alt={`${project.title} website preview`} loading="lazy" /></div></div>;
}

export const ProjectsSection = ({ projectsRef, projects }) => {
  const [selectedProject, setSelectedProject] = useState(null);
  const featured = projects.find(project => project.title === 'LifeOS — Personal Life');
  const others = projects.filter(project => project !== featured);
  return (
    <section ref={projectsRef} id="projects" className="projects-container" aria-labelledby="projects-heading">
      <div className="section-heading"><div><p className="section-kicker">02 / SELECTED WORK</p><h2 id="projects-heading">Ideas, made real.</h2></div><p>A few things I’ve built.<br />Each one, a new thing learned.</p></div>
      {featured && <article className="featured-project">
        <ProjectImage project={featured} />
        <div className="featured-project-copy"><p className="project-overline"><span /> FEATURED PROJECT</p><h3>LifeOS<span>Personal Life</span></h3><p>{featured.desc}</p><div className="project-tags">{featured.tags.map(tag => <span key={tag}>{tag}</span>)}</div><div className="featured-details"><span>01 / PERSONAL WORKSPACE</span><p>Your life, a little more organized.</p></div><div className="flex flex-wrap items-center gap-x-5"><a className="project-source featured-source" href={featured.live} target="_blank" rel="noopener noreferrer"><Globe2 size={16} /> Visit LifeOS <ArrowUpRight size={17} /></a><a className="project-source mt-5" href={featured.github} target="_blank" rel="noopener noreferrer"><FaGithub size={16} /> Source code <ArrowUpRight size={17} /></a></div></div>
      </article>}
      <div className="projects-grid">{others.map((project, index) => <motion.article className="project-card" key={project.title} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.12 }} transition={{ duration: 0.4 }}>
        <ProjectImage project={project} />
        <div className="project-card-copy"><div className="project-card-title"><h3>{project.title}</h3><span>{String(index + 2).padStart(2, '0')}</span></div><p>{project.desc}</p><div className="project-tags">{project.tags.map(tag => <span key={tag}>{tag}</span>)}</div><div className="project-card-actions"><a className="project-source" href={project.github} target="_blank" rel="noopener noreferrer"><Code2 size={15} /> Source code <ArrowUpRight size={15} /></a>{project.live && <a className="project-source project-live" href={project.live} target="_blank" rel="noopener noreferrer"><Globe2 size={15} /> Visit live <ArrowUpRight size={15} /></a>}{project.title === 'Memory Game' && <button className="project-demo" onClick={() => setSelectedProject(project)}><Play size={13} /> Play demo</button>}</div></div>
      </motion.article>)}</div>
      <div className="projects-endnote"><span>BUILT WITH CURIOSITY. REFINED WITH PRACTICE.</span><a href="https://github.com/JerichoooB" target="_blank" rel="noopener noreferrer">More on GitHub <ArrowUpRight size={15} /></a></div>
      <ProjectPlaygroundModal isOpen={Boolean(selectedProject)} onClose={() => setSelectedProject(null)} project={selectedProject} />
    </section>
  );
};

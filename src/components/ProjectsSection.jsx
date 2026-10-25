import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Play, Code2, Globe2, ChevronLeft, ChevronRight } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { ProjectPlaygroundModal } from "./ProjectPlaygroundModal";
import "../styles/ProjectsSection.css";

function ProjectImage({ project }) {
  return <div className="project-browser"><div className="project-browser-bar"><span aria-hidden="true"><i /><i /><i /></span><span>{project.title === 'Clover Clothing Shop' ? 'clover / storefront' : project.title.toLowerCase()}</span><ArrowUpRight size={13} /></div><div className="project-image"><img src={project.image} alt={`${project.title} website preview`} loading="lazy" draggable="false" /></div></div>;
}

function AnimatedProjectCard({ children, className, order = 0 }) {
  const reducedMotion = useReducedMotion();
  return <motion.article
    className={className}
    initial={reducedMotion ? false : { opacity: 0, y: 36, scale: 0.97 }}
    whileInView={{ opacity: 1, y: 0, scale: 1 }}
    viewport={{ once: true, amount: 0.15 }}
    transition={{ duration: reducedMotion ? 0 : 0.65, delay: reducedMotion ? 0 : (order % 3) * 0.09, ease: [0.22, 1, 0.36, 1] }}
    whileHover={reducedMotion ? undefined : { y: -8, scale: 1.008, transition: { type: 'spring', stiffness: 260, damping: 22, delay: 0 } }}
  >{children}</motion.article>;
}

function ProjectCarousel({ projects, onDemo }) {
  const [active, setActive] = useState(0);
  const [spacing, setSpacing] = useState(180);
  const stage = useRef(null);
  const gesture = useRef(null);
  const reducedMotion = useReducedMotion();
  const select = index => setActive((index + projects.length) % projects.length);
  useEffect(() => {
    const observer = new ResizeObserver(([entry]) => setSpacing(Math.min(240, Math.max(70, entry.contentRect.width * 0.24))));
    observer.observe(stage.current);
    return () => observer.disconnect();
  }, []);
  if (!projects.length) return null;
  return <div className="project-carousel" role="region" aria-roledescription="carousel" aria-label="Browse projects"
    onKeyDown={event => {
      if (event.altKey || event.ctrlKey || event.metaKey) return;
      if (event.key === 'ArrowRight') { event.preventDefault(); select(active + 1); }
      if (event.key === 'ArrowLeft') { event.preventDefault(); select(active - 1); }
      if (event.key === 'Home') { event.preventDefault(); select(0); }
      if (event.key === 'End') { event.preventDefault(); select(projects.length - 1); }
    }}>
    <div className="project-carousel-stage" ref={stage}
      onPointerDown={event => { if (!event.isPrimary || event.target.closest('a,button')) return; gesture.current = { x: event.clientX, y: event.clientY, id: event.pointerId }; event.currentTarget.setPointerCapture(event.pointerId); }}
      onPointerUp={event => { const start = gesture.current; gesture.current = null; if (!start || start.id !== event.pointerId) return; const dx = event.clientX - start.x; if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(event.clientY - start.y) * 1.3) select(active + (dx < 0 ? 1 : -1)); if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId); }}
      onPointerCancel={() => { gesture.current = null; }}>
      <div className="project-carousel-glow" aria-hidden="true" />
      {projects.map((project, index) => {
        let offset = (index - active + projects.length) % projects.length;
        if (offset > projects.length / 2) offset -= projects.length;
        const distance = Math.abs(offset), current = distance === 0;
        return <motion.article key={project.title} className="project-card carousel-card" data-active={current} aria-hidden={distance > 2 ? true : undefined}
          initial={false} animate={{ x: offset * spacing, y: distance * 24, scale: current ? 1 : distance === 1 ? 0.84 : 0.68, rotateY: reducedMotion ? 0 : offset * -9, opacity: current ? 1 : distance === 1 ? 0.56 : distance === 2 ? 0.25 : 0, filter: `blur(${current ? 0 : distance === 1 ? 1 : 3}px)` }}
          transition={reducedMotion ? { duration: 0 } : { type: 'spring', stiffness: 170, damping: 24, mass: 0.95 }}
          style={{ zIndex: projects.length - distance, pointerEvents: distance > 2 ? 'none' : 'auto', visibility: distance > 2 ? 'hidden' : 'visible' }}>
          <div className="carousel-card-content" inert={!current ? true : undefined} role={current ? 'group' : undefined} aria-roledescription={current ? 'slide' : undefined} aria-label={current ? `${index + 1} of ${projects.length}: ${project.title}` : undefined}>
            <ProjectImage project={project} />
            <div className="project-card-copy"><div className="project-card-title"><h3>{project.title}</h3><span>{String(index + 2).padStart(2, '0')}</span></div><p>{project.desc}</p><div className="project-tags">{project.tags.map(tag => <span key={tag}>{tag}</span>)}</div><div className="project-card-actions">{project.github && <a className="project-source" href={project.github} target="_blank" rel="noopener noreferrer"><Code2 size={15} /> Source code <ArrowUpRight size={15} /></a>}{project.live && <a className="project-source" href={project.live} target="_blank" rel="noopener noreferrer"><Globe2 size={15} /> Visit site <ArrowUpRight size={15} /></a>}{project.title === 'Memory Game' && <button className="project-demo" onClick={() => onDemo(project)}><Play size={13} /> Play demo</button>}</div></div>
          </div>
          {!current && distance <= 2 && <button className="carousel-select-card" aria-label={`Show ${project.title}`} onClick={() => select(index)} />}
        </motion.article>;
      })}
    </div>
    <div className="project-carousel-controls"><button className="carousel-arrow" onClick={() => select(active - 1)} aria-label="Previous project"><ChevronLeft size={19} /></button><div className="carousel-dots">{projects.map((project, index) => <button key={project.title} aria-label={`Go to ${project.title}`} aria-current={active === index ? 'true' : undefined} onClick={() => select(index)}><span /></button>)}</div><button className="carousel-arrow" onClick={() => select(active + 1)} aria-label="Next project"><ChevronRight size={19} /></button></div>
    <p className="carousel-status" aria-live="polite" aria-atomic="true">{String(active + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')} <span>{projects[active].title}</span></p>
    <p className="carousel-hint">Swipe, select a card, or use the arrow keys</p>
  </div>;
}

export const ProjectsSection = ({ projectsRef, projects }) => {
  const [selectedProject, setSelectedProject] = useState(null);
  const featured = projects.find(project => project.title === 'Clover Clothing Shop');
  const others = projects.filter(project => project !== featured);
  return (
    <section ref={projectsRef} id="projects" className="projects-container" aria-labelledby="projects-heading">
      <div className="section-heading"><div><p className="section-kicker">02 / SELECTED WORK</p><h2 id="projects-heading">Ideas, made real.</h2></div><p>A few things I’ve built.<br />Each one, a new thing learned.</p></div>
      {featured && <AnimatedProjectCard className="featured-project">
        <ProjectImage project={featured} />
        <div className="featured-project-copy"><p className="project-overline"><span /> FEATURED PROJECT</p><h3>Clover<span>Clothing Shop</span></h3><p>{featured.desc}</p><div className="project-tags">{featured.tags.map(tag => <span key={tag}>{tag}</span>)}</div><div className="featured-details"><span>01 / SHOPPING EXPERIENCE</span><p>Considered layouts. Everyday essentials.</p></div><a className="project-source featured-source" href={featured.github} target="_blank" rel="noopener noreferrer"><FaGithub size={16} /> Explore the source <ArrowUpRight size={17} /></a></div>
      </AnimatedProjectCard>}
      <ProjectCarousel projects={others} onDemo={setSelectedProject} />
      <div className="projects-endnote"><span>BUILT WITH CURIOSITY. REFINED WITH PRACTICE.</span><a href="https://github.com/JerichoooB" target="_blank" rel="noopener noreferrer">More on GitHub <ArrowUpRight size={15} /></a></div>
      <ProjectPlaygroundModal isOpen={Boolean(selectedProject)} onClose={() => setSelectedProject(null)} project={selectedProject} />
    </section>
  );
};

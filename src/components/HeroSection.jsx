import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ArrowDown, Terminal, ShieldCheck, Code2 } from "lucide-react";
import "../styles/HeroSection.css";

export function HeroSection({ skills, onProjects, onContact, onTerminal }) {
  const reducedMotion = useReducedMotion();
  return (
    <section className="hero" aria-labelledby="hero-title">
      <motion.div className="hero-copy" initial={reducedMotion ? false : { opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
        <p className="hero-eyebrow"><span /> THE INTERSECTION OF CODE & CURIOSITY</p>
        <p className="hero-intro">Hey, I’m Jericho <span>— aka Riri.</span></p>
        <h1 id="hero-title">Thoughtful code.<br /><span>Stronger digital<br />experiences.</span></h1>
        <p className="hero-description">Full-stack developer. Security enthusiast. I turn ideas into intuitive web applications, with a curious mind and security in the details.</p>
        <div className="hero-actions">
          <button className="hero-primary" onClick={onProjects}>Explore my work <ArrowRight size={18} /></button>
          <button className="hero-secondary" onClick={onContact}>Let’s talk <ArrowRight size={17} /></button>
        </div>
        <div className="hero-stack"><span className="hero-stack-label">MY TOOLKIT</span><div>{skills.map(skill => <span className="hero-tech" key={skill.name}>{skill.icon}{skill.name}</span>)}</div></div>
      </motion.div>
      <motion.div className="hero-visual" initial={reducedMotion ? false : { opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.15 }}>
        <div className="hero-orbit" aria-hidden="true" />
        <div className="hero-editor">
          <div className="hero-editor-bar"><span className="hero-window-dots" aria-hidden="true"><i /><i /><i /></span><span>developer.js</span><Code2 size={15} /></div>
          <div className="hero-editor-body"><div className="hero-code-label">A LITTLE ABOUT ME</div>
            <pre aria-label="Developer profile"><code><span className="code-purple">const</span> developer = {'{'}{'\n'}{'  '}name: <span className="code-mint">"Jericho"</span>,{'\n'}{'  '}alias: <span className="code-mint">"Riri"</span>,{'\n'}{'  '}focus: [{'\n'}{'    '}<span className="code-mint">"Full-stack development"</span>,{'\n'}{'    '}<span className="code-mint">"Web security"</span>{'\n'}{'  '}],{'\n'}{'  '}mindset: <span className="code-mint">"Always learning"</span>{'\n'}{'}'};</code></pre>
            <div className="hero-editor-output"><span>↳</span> Turning curiosity into things that work.<span className="hero-caret" aria-hidden="true" /></div>
          </div>
          <button className="hero-terminal-link" onClick={onTerminal}><Terminal size={15} /><span>Get to know me in the terminal</span><ArrowRight size={15} /></button>
        </div>
        <div className="hero-security"><span className="hero-security-icon"><ShieldCheck size={22} /></span><div><strong>Built with intention.</strong><span>From the interface to the database.</span></div></div>
        <span className="hero-coordinate" aria-hidden="true">&lt; ideas /&gt; → &lt; reality /&gt;</span>
      </motion.div>
      <button className="hero-scroll" onClick={onProjects}><ArrowDown size={15} /> SCROLL TO EXPLORE <span>01 / SELECTED WORK</span></button>
    </section>
  );
}

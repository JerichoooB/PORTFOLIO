import { useEffect, useRef, useId } from "react";
import { motion, useAnimationFrame, useInView, useMotionValue, useReducedMotion } from "framer-motion";
import { Fingerprint, ShieldCheck, MoveHorizontal } from "lucide-react";
import "../styles/HangingBadge.css";

const REST_LENGTH = 174;
const MAX_PULL_LENGTH = 260;
const clamp = (value, min, max) => Math.max(min, Math.min(max, value));

export function HangingBadge() {
  const stage = useRef(null);
  const trigger = useRef(null);
  const started = useRef(false);
  const visible = useInView(trigger, { amount: 0.7 });
  const reducedMotion = useReducedMotion();
  const patternId = useId().replaceAll(':', '');
  const physics = useRef({ angle: -0.32, velocity: 0, length: -110, dropVelocity: 0, userMotion: false, dragging: false, previousX: 0, previousY: 0, previousTime: 0, pointerId: null });
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotate = useMotionValue(0);
  const rope = useMotionValue('M 0 20 L 0 44');
  const opacity = useMotionValue(0);

  useEffect(() => {
    const p = physics.current;
    if (p.dragging) return;
    if (!visible) return;
    started.current = true;
    Object.assign(p, {
      angle: reducedMotion ? 0 : -0.3,
      velocity: 0,
      length: reducedMotion ? REST_LENGTH : -110,
      dropVelocity: 0,
      userMotion: false,
    });
  }, [visible, reducedMotion]);

  useAnimationFrame((_, delta) => {
    if (!started.current || !stage.current) return;
    const p = physics.current;
    // Small bounded steps keep the spring stable after a background tab resumes.
    const duration = Math.min(delta / 1000, 0.05);
    const steps = Math.max(1, Math.ceil(duration / 0.008));
    const dt = duration / steps;
    for (let i = 0; i < steps; i++) {
      if (!reducedMotion || p.userMotion) {
        if (!p.dragging) {
          p.dropVelocity += ((REST_LENGTH - p.length) * 44 - p.dropVelocity * 8) * dt;
          p.length += p.dropVelocity * dt;
          if (p.length > MAX_PULL_LENGTH) { p.length = MAX_PULL_LENGTH; p.dropVelocity *= -0.25; }
          p.velocity += (-14 * Math.sin(p.angle) - 1.55 * p.velocity) * dt;
          p.angle += p.velocity * dt;
          if (Math.abs(p.angle) > 0.65) { p.angle = clamp(p.angle, -0.65, 0.65); p.velocity *= -0.35; }
        }
      }
    }
    const center = stage.current.clientWidth / 2;
    const endX = center + Math.sin(p.angle) * p.length;
    const endY = 22 + Math.cos(p.angle) * p.length;
    const bow = reducedMotion ? 0 : clamp(p.velocity * 8, -14, 14);
    rope.set(`M ${center} 22 Q ${(center + endX) / 2 + bow} ${(22 + endY) / 2} ${endX} ${endY}`);
    x.set(endX); y.set(endY); rotate.set(-p.angle * 180 / Math.PI);
    opacity.set(clamp((p.length + 100) / 100, 0, 1));
  });

  const release = (event) => {
    const p = physics.current;
    if (!p.dragging || event.pointerId !== p.pointerId) return;
    p.dragging = false;
    p.pointerId = null;
    if (event.type === 'pointercancel' || event.timeStamp - p.previousTime > 100) { p.velocity = 0; p.dropVelocity = 0; }
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
  };

  const nudge = (direction = 1) => {
    physics.current.userMotion = true;
    physics.current.velocity += direction * 1.6;
  };

  const pull = () => {
    const p = physics.current;
    p.userMotion = true;
    p.length = Math.min(p.length + 65, MAX_PULL_LENGTH);
    p.dropVelocity = 100;
  };

  return (
    <div className="badge-scene" ref={stage}>
      <div className="badge-drop-trigger" ref={trigger} aria-hidden="true" />
      <div className="badge-scene-label"><span>01 / THE PERSON BEHIND THE CODE</span><span className="badge-live-dot" /></div>
      <div className="badge-anchor" aria-hidden="true"><span /><span /></div>
      <svg className="badge-lanyard" aria-hidden="true">
        <defs><pattern id={patternId} width="5" height="5" patternUnits="userSpaceOnUse" patternTransform="rotate(35)"><rect width="5" height="5" fill="#235554" /><path d="M 0 0 V 5" stroke="#74c3b0" strokeWidth="1.5" opacity=".4" /></pattern></defs>
        <motion.path d={rope} fill="none" stroke="#03090e" strokeWidth="21" />
        <motion.path d={rope} fill="none" stroke={`url(#${patternId})`} strokeWidth="16" />
        <motion.path d={rope} fill="none" stroke="#9cf3d5" strokeOpacity=".35" strokeWidth="1" strokeDasharray="2 5" />
      </svg>
      <motion.div className="badge-suspension" style={{ x, y, rotate, opacity }}>
        <div className="badge-clip" aria-hidden="true"><span /></div>
        <div className="physical-badge" role="group" aria-label="Jericho’s interactive ID badge" tabIndex={0}
          onKeyDown={event => { if (event.key === 'ArrowDown') { event.preventDefault(); pull(); } if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') { event.preventDefault(); nudge(event.key === 'ArrowLeft' ? -1 : 1); } }}
          onPointerDown={event => {
            if ((event.pointerType === 'mouse' && event.button !== 0) || physics.current.dragging) return;
            const p = physics.current;
            p.userMotion = true; p.dragging = true; p.pointerId = event.pointerId; p.velocity = 0; p.dropVelocity = 0; p.previousX = event.clientX; p.previousY = event.clientY; p.previousTime = event.timeStamp;
            event.currentTarget.setPointerCapture(event.pointerId);
          }}
          onPointerMove={event => {
            const p = physics.current;
            if (!p.dragging || event.pointerId !== p.pointerId) return;
            const dx = event.clientX - p.previousX;
            const dy = event.clientY - p.previousY;
            const dt = Math.max((event.timeStamp - p.previousTime) / 1000, 0.008);
            const next = clamp(p.angle + dx / 330, -0.6, 0.6);
            p.velocity = clamp((next - p.angle) / dt, -3, 3);
            // Increasing resistance makes the strap feel elastic rather than freely resizable.
            const extension = Math.max(0, p.length - REST_LENGTH);
            const resistance = 1 / (1 + extension / 65);
            const nextLength = clamp(p.length + dy * resistance, 100, MAX_PULL_LENGTH);
            p.dropVelocity = clamp((nextLength - p.length) / dt, -650, 650);
            p.length = nextLength;
            p.angle = next; p.previousX = event.clientX; p.previousY = event.clientY; p.previousTime = event.timeStamp;
          }}
          onPointerUp={release} onPointerCancel={release} onLostPointerCapture={event => { const p = physics.current; if (p.dragging && p.pointerId === event.pointerId) { p.dragging = false; p.pointerId = null; p.velocity = 0; p.dropVelocity = 0; } }}>
          <div className="badge-slot" aria-hidden="true" />
          <div className="badge-header"><span>RIRI<span>.DEV</span></span><Fingerprint size={23} /></div>
          <div className="badge-category">DEVELOPER ACCESS PASS <span>NO. 007</span></div>
          <div className="badge-photo"><img src="/pfp.jpg" alt="Jericho Balayog" draggable="false" /><span>BUILD. LEARN. REPEAT.</span><div className="badge-photo-corner" /></div>
          <div className="badge-identity"><p>JERICHO BALAYOG</p><h3>Riri<span>.dev</span></h3><span>Full-stack developer / Security enthusiast</span></div>
          <div className="badge-divider" />
          <div className="badge-details"><div><span>DISCIPLINE</span><strong>Code & curiosity</strong></div><div className="badge-foil" aria-label="Decorative holographic seal"><ShieldCheck size={26} /></div></div>
          <div className="badge-footer"><div className="badge-barcode" aria-hidden="true" /><span>RIRI — 007 — DEV</span></div>
        </div>
      </motion.div>
      <div className="badge-scene-bottom"><p><MoveHorizontal size={14} /> PULL, SWING & RELEASE · USE ← ↓ →</p></div>
    </div>
  );
}

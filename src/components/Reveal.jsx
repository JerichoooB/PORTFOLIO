import { motion, useReducedMotion } from 'framer-motion';

const elements = { div: motion.div, article: motion.article };
const ease = [0.22, 1, 0.36, 1];

export function Reveal({ as = 'div', children, delay = 0, lift = false, ...props }) {
  const reducedMotion = useReducedMotion();
  const Element = elements[as];
  return <Element {...props}
    initial={reducedMotion ? false : { opacity: 0, y: 26 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.12 }}
    transition={{ duration: reducedMotion ? 0 : 0.7, delay: reducedMotion ? 0 : delay, ease }}
    whileHover={lift && !reducedMotion ? { y: -5, transition: { type: 'spring', stiffness: 240, damping: 24, delay: 0 } } : undefined}
  >{children}</Element>;
}

import { ArrowUpRight } from "lucide-react";
const currentYear = new Date().getFullYear();
export const Footer = () => (
  <footer className="site-footer"><div><a href="#" className="footer-brand">RIRI<span>.DEV</span></a><p>Thoughtful code. Always learning.</p></div><span>© {currentYear} Jericho Balayog</span><a href="https://github.com/JerichoooB" target="_blank" rel="noopener noreferrer">Made with curiosity <ArrowUpRight size={14} /></a></footer>
);

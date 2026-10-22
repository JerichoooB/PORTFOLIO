import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Send, MessageSquare, CheckCircle2, AlertCircle } from "lucide-react";
import { FaFacebook, FaGithub } from "react-icons/fa";
import "../styles/ContactSection.css";

export const ContactSection = ({ contactRef }) => {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(e.target);
    
    try {
      // Submit through the existing Formspree endpoint.
      const response = await fetch("https://formspree.io/f/xbgdnakk", {
        method: "POST",
        body: formData,
        headers: {
          Accept: "json"
        }
      });

      if (response.ok) {
        setSubmitted(true);
        setLoading(false);
        setTimeout(() => setSubmitted(false), 5000);
      } else {
        const data = await response.json();
        setError(data.error || "Failed to send message. Please try again.");
        setLoading(false);
      }
    } catch {
      setError("Network error. Please check your connection.");
      setLoading(false);
    }
  };

  return (
    <div ref={contactRef} className="contact-container flex flex-col justify-center">
      <div className="section-heading"><div><p className="section-kicker">03 / GET IN TOUCH</p><h2>Let’s build something thoughtful.</h2></div></div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        {/* Info Column */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <div className="rounded-2xl border border-white/10 bg-slate-900/65 p-8 backdrop-blur-xl relative overflow-hidden shadow-[0_0_30px_rgba(0,0,0,0.5)]">
            <h3 className="font-display text-2xl font-bold text-white mb-4">
              Good things start with a conversation.
            </h3>
            <p className="font-sans text-slate-300 leading-relaxed mb-6">
              Have an idea, a question, or a project in mind? I’d love to hear about it. Tell me what you’re thinking, and let’s see what we can create.
            </p>

            <div className="flex flex-col gap-4">
              <a href="mailto:jerichobalayog2@gmail.com" className="flex items-center gap-3 font-mono text-sm text-cyan-300 bg-cyan-500/10 border border-cyan-500/30 px-4 py-3 rounded-xl hover:bg-cyan-500/20 transition-colors cursor-none">
                <Mail size={18} />
                <span>jerichobalayog2@gmail.com</span>
              </a>
              <div className="flex items-center gap-3 font-mono text-sm text-purple-300 bg-purple-500/10 border border-purple-500/30 px-4 py-3 rounded-xl">
                <MessageSquare size={18} />
                <span>Open to collaboration</span>
              </div>
              <div className="flex items-center gap-4 mt-2">
                <a href="https://www.facebook.com/jddelacruz.89" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 font-mono text-xs text-slate-300 bg-white/5 border border-white/10 px-4 py-2.5 rounded-xl hover:text-cyan-400 hover:border-cyan-400 transition-colors cursor-none">
                  <FaFacebook size={16} className="text-cyan-400" /> Facebook
                </a>
                <a href="https://github.com/JerichoooB" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 font-mono text-xs text-slate-300 bg-white/5 border border-white/10 px-4 py-2.5 rounded-xl hover:text-cyan-400 hover:border-cyan-400 transition-colors cursor-none">
                  <FaGithub size={16} className="text-purple-400" /> GitHub
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Form Column */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-7 rounded-2xl border border-cyan-500/30 bg-slate-950/80 p-8 backdrop-blur-2xl shadow-[0_0_40px_rgba(0,240,255,0.15)] relative overflow-hidden"
        >
          {submitted ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <CheckCircle2 className="text-cyan-400 mb-4 animate-bounce" size={48} />
              <h4 className="font-display text-2xl font-bold text-white mb-2">Thanks for reaching out!</h4>
              <p className="font-sans text-slate-400">Your message has been sent. I’ll get back to you soon.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              {error && (
                <div className="flex items-center gap-2 font-mono text-xs text-red-400 bg-red-500/10 border border-red-500/30 p-3 rounded-xl">
                  <AlertCircle size={16} />
                  <span>{error}</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="flex flex-col gap-2">
                  <label htmlFor="contact-name" className="font-mono text-xs text-cyan-400 uppercase tracking-widest">Your name</label>
                  <input 
                    required
                    id="contact-name"
                    autoComplete="name"
                    name="name"
                    type="text" 
                    placeholder="Enter your name" 
                    className="rounded-xl border border-white/10 bg-slate-900/60 px-4 py-3 text-white font-sans placeholder:text-slate-600 focus:border-cyan-400 focus:outline-none transition-colors"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="contact-email" className="font-mono text-xs text-cyan-400 uppercase tracking-widest">Email address</label>
                  <input 
                    required
                    id="contact-email"
                    autoComplete="email"
                    name="email"
                    type="email" 
                    placeholder="you@gmail.com" 
                    className="rounded-xl border border-white/10 bg-slate-900/60 px-4 py-3 text-white font-sans placeholder:text-slate-600 focus:border-cyan-400 focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="contact-message" className="font-mono text-xs text-cyan-400 uppercase tracking-widest">Your message</label>
                <textarea 
                  required
                  id="contact-message"
                  name="message"
                  rows={4} 
                  placeholder="Type your message here..." 
                  className="rounded-xl border border-white/10 bg-slate-900/60 px-4 py-3 text-white font-sans placeholder:text-slate-600 focus:border-cyan-400 focus:outline-none transition-colors resize-none"
                />
              </div>

              <motion.button 
                whileHover={{ scale: 1.02 }} 
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={loading}
                className="shimmer-btn relative overflow-hidden flex items-center justify-center gap-2 rounded-xl bg-cyan-400 px-7 py-4 font-display text-base font-bold text-slate-950 shadow-[0_0_20px_rgba(0,240,255,0.4)] transition-all hover:shadow-[0_0_40px_rgba(0,240,255,0.7)] mt-2 cursor-none disabled:opacity-50"
              >
                {loading ? "Sending..." : <>Send message <Send size={16} /></>}
              </motion.button>
            </form>
          )}
        </motion.div>
      </div>
    </div>
  );
};
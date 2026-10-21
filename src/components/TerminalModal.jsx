import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Terminal as TerminalIcon, X, CornerDownLeft } from "lucide-react";
import { playTerminalSfx, playClickSfx } from "../utils/soundEffects";

export const TerminalModal = ({ isOpen, onClose, scrollToSection, refs }) => {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState([
    { type: "output", text: "RIRI.DEV SECURE TERMINAL v2.5.0" },
    { type: "output", text: "Type 'help' to view available commands or 'sudo hire-riri' for priority dispatch." },
    { type: "output", text: "--------------------------------------------------" },
  ]);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  if (!isOpen) return null;

  const handleCommand = (e) => {
    e.preventDefault();
    const cmd = input.trim().toLowerCase();
    if (!cmd) return;

    playTerminalSfx();
    const newHistory = [...history, { type: "input", text: `> \${input}` }];

    const [command, ...args] = cmd.split(" ");

    switch (command) {
      case "help":
        newHistory.push({
          type: "output",
          text: "AVAILABLE COMMANDS:\n  help         - Display this help menu\n  whoami       - Display operator profile summary\n  skills       - List core technical stack\n  projects     - List secure repository projects\n  contact      - Display transmission channels\n  clear        - Clear terminal screen\n  sudo hire-riri - Trigger priority recruitment ping\n  exit         - Close terminal modal",
        });
        break;
      case "whoami":
        newHistory.push({
          type: "output",
          text: "OPERATOR: RIRI.DEV\nSTATUS: IT Student & Full-Stack / Pen Testing Enthusiast\nLOCATION: Secure Node Active",
        });
        break;
      case "skills":
        newHistory.push({
          type: "output",
          text: "TECH STACK: React, Node.js, Python, PHP, Java, TailwindCSS, PostgreSQL, MySQL",
        });
        break;
      case "projects":
        newHistory.push({
          type: "output",
          text: "PROJECTS:\n1. Portfolio 1.0\n2. School Management System\n3. SQL Database Tool\n4. Digibag\n5. Todo List\n6. Memory Game",
        });
        break;
      case "contact":
        newHistory.push({
          type: "output",
          text: "EMAIL: jerichobalayog2@gmail.com\nGITHUB: github.com/JerichoooB\nFACEBOOK: facebook.com/jddelacruz.89",
        });
        break;
      case "clear":
        setHistory([]);
        setInput("");
        return;
      case "sudo":
        if (args.join(" ") === "hire-riri") {
          newHistory.push({
            type: "output",
            text: "[!] ACCESS GRANTED: Priority recruitment transmission initialized! Redirecting to contact node...",
          });
          setTimeout(() => {
            onClose();
            scrollToSection(refs.contactRef, "contact");
          }, 1200);
        } else {
          newHistory.push({ type: "output", text: `sudo: \${args.join(" ")}: command not found or unauthorized.` });
        }
        break;
      case "exit":
        onClose();
        setInput("");
        return;
      default:
        newHistory.push({ type: "output", text: `Command not recognized: '\${cmd}'. Type 'help' for options.` });
    }

    setHistory(newHistory);
    setInput("");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="w-full max-w-2xl rounded-2xl border border-cyan-500/40 bg-slate-950/95 shadow-[0_0_50px_rgba(0,240,255,0.25)] overflow-hidden flex flex-col h-[450px]"
      >
        {/* Terminal Header */}
        <div className="flex items-center justify-between border-b border-white/10 px-4 py-3 bg-slate-900/80">
          <div className="flex items-center gap-2">
            <TerminalIcon size={16} className="text-cyan-400" />
            <span className="font-['JetBrains_Mono'] text-xs font-bold text-cyan-400 tracking-wider">
              riri@secure-node:~
            </span>
          </div>
          <button
            onClick={() => { playClickSfx(); onClose(); }}
            className="text-slate-400 hover:text-white transition-colors cursor-none p-1"
          >
            <X size={16} />
          </button>
        </div>

        {/* Terminal Body */}
        <div className="flex-grow p-4 overflow-y-auto font-['JetBrains_Mono'] text-xs text-slate-300 space-y-2">
          {history.map((h, i) => (
            <div key={i} className={`whitespace-pre-wrap \${h.type === "input" ? "text-cyan-300 font-bold" : "text-slate-300"}`}>
              {h.text}
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        {/* Terminal Input Form */}
        <form onSubmit={handleCommand} className="border-t border-white/10 p-3 bg-slate-900/50 flex items-center gap-2">
          <span className="font-['JetBrains_Mono'] text-xs text-cyan-400 font-bold">&gt;</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => { playTerminalSfx(); setInput(e.target.value); }}
            placeholder="Type a command (e.g. 'help')..."
            className="flex-grow bg-transparent font-['JetBrains_Mono'] text-xs text-white focus:outline-none placeholder:text-slate-600"
          />
          <button type="submit" className="text-cyan-400 hover:text-white cursor-none p-1">
            <CornerDownLeft size={16} />
          </button>
        </form>
      </motion.div>
    </div>
  );
};

import React, { useState } from "react";
import { motion } from "framer-motion";
import { X, RotateCcw, Check, Plus, Trash2 } from "lucide-react";
import { playClickSfx } from "../utils/soundEffects";

export const ProjectPlaygroundModal = ({ isOpen, onClose, project }) => {
  if (!isOpen || !project) return null;

  // Memory Game State
  const [cards, setCards] = useState(() => {
    const emojis = ["💻", "🛡️", "⚡", "🔒"];
    const duplicated = [...emojis, ...emojis]
      .sort(() => Math.random() - 0.5)
      .map((emoji, idx) => ({ id: idx, emoji, flipped: false, matched: false }));
    return duplicated;
  });
  const [selectedCards, setSelectedCards] = useState([]);
  const [score, setScore] = useState(0);

  // Todo List State
  const [todos, setTodos] = useState([
    { id: 1, text: "Review security headers", completed: true },
    { id: 2, text: "Deploy update to Vercel", completed: false },
  ]);
  const [newTodo, setNewTodo] = useState("");

  const handleCardClick = (id) => {
    playClickSfx();
    if (selectedCards.length === 2) return;
    const clickedCard = cards.find(c => c.id === id);
    if (clickedCard.flipped || clickedCard.matched) return;

    const updated = cards.map(c => c.id === id ? { ...c, flipped: true } : c);
    setCards(updated);
    const newSelected = [...selectedCards, clickedCard];
    setSelectedCards(newSelected);

    if (newSelected.length === 2) {
      if (newSelected[0].emoji === newSelected[1].emoji) {
        setCards(prev => prev.map(c => c.emoji === newSelected[0].emoji ? { ...c, matched: true } : c));
        setScore(s => s + 1);
        setSelectedCards([]);
      } else {
        setTimeout(() => {
          setCards(prev => prev.map(c => c.id === newSelected[0].id || c.id === newSelected[1].id ? { ...c, flipped: false } : c));
          setSelectedCards([]);
        }, 800);
      }
    }
  };

  const resetMemoryGame = () => {
    playClickSfx();
    const emojis = ["💻", "🛡️", "⚡", "🔒"];
    const duplicated = [...emojis, ...emojis]
      .sort(() => Math.random() - 0.5)
      .map((emoji, idx) => ({ id: idx, emoji, flipped: false, matched: false }));
    setCards(duplicated);
    setSelectedCards([]);
    setScore(0);
  };

  const addTodo = (e) => {
    e.preventDefault();
    if (!newTodo.trim()) return;
    playClickSfx();
    setTodos([...todos, { id: Date.now(), text: newTodo, completed: false }]);
    setNewTodo("");
  };

  const toggleTodo = (id) => {
    playClickSfx();
    setTodos(todos.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const deleteTodo = (id) => {
    playClickSfx();
    setTodos(todos.filter(t => t.id !== id));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="w-full max-w-xl rounded-2xl border border-cyan-500/40 bg-slate-950/95 shadow-[0_0_50px_rgba(0,240,255,0.2)] overflow-hidden flex flex-col"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 px-6 py-4 bg-slate-900/80">
          <div>
            <span className="font-['JetBrains_Mono'] text-xs text-cyan-400 font-bold uppercase tracking-widest">Interactive Playground</span>
            <h3 className="font-['Space_Grotesk'] text-xl font-bold text-white">{project.title}</h3>
          </div>
          <button
            onClick={() => { playClickSfx(); onClose(); }}
            className="text-slate-400 hover:text-white transition-colors cursor-none p-1 rounded-lg border border-white/10 bg-white/5"
          >
            <X size={18} />
          </button>
        </div>

        {/* Playground Content */}
        <div className="p-6 max-h-[65vh] overflow-y-auto">
          {project.title === "Memory Game" ? (
            <div className="flex flex-col items-center gap-4">
              <div className="flex justify-between w-full font-['JetBrains_Mono'] text-xs text-slate-300">
                <span>Matches: {score} / 4</span>
                <button onClick={resetMemoryGame} className="flex items-center gap-1 text-cyan-400 hover:underline cursor-none">
                  <RotateCcw size={14} /> Reset Game
                </button>
              </div>
              <div className="grid grid-cols-4 gap-3 w-full">
                {cards.map((card) => (
                  <motion.button
                    key={card.id}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleCardClick(card.id)}
                    className={`h-20 rounded-xl border flex items-center justify-center text-2xl font-bold transition-all cursor-none ${
                      card.flipped || card.matched
                        ? "border-cyan-400 bg-cyan-950/40 text-white shadow-[0_0_15px_rgba(0,240,255,0.3)]"
                        : "border-white/10 bg-slate-900/60 text-transparent hover:border-cyan-500/40"
                    }`}
                  >
                    {card.flipped || card.matched ? card.emoji : "?"}
                  </motion.button>
                ))}
              </div>
              {score === 4 && (
                <div className="font-['JetBrains_Mono'] text-xs text-cyan-400 font-bold mt-2 animate-bounce">
                  [!] Transmission Complete: All Matches Found!
                </div>
              )}
            </div>
          ) : project.title === "Todo List" ? (
            <div className="flex flex-col gap-4">
              <form onSubmit={addTodo} className="flex gap-2">
                <input
                  type="text"
                  value={newTodo}
                  onChange={(e) => setNewTodo(e.target.value)}
                  placeholder="Add a new task..."
                  className="flex-grow rounded-xl border border-white/10 bg-slate-900/60 px-4 py-2.5 text-xs text-white font-['Outfit'] placeholder:text-slate-600 focus:border-cyan-400 focus:outline-none"
                />
                <button type="submit" className="rounded-xl bg-cyan-400 px-4 py-2.5 text-slate-950 font-bold text-xs flex items-center gap-1 cursor-none shadow-[0_0_15px_rgba(0,240,255,0.3)]">
                  <Plus size={16} /> Add
                </button>
              </form>
              <div className="flex flex-col gap-2 max-h-60 overflow-y-auto">
                {todos.map((todo) => (
                  <div key={todo.id} className="flex items-center justify-between p-3 rounded-xl border border-white/10 bg-slate-900/40">
                    <div className="flex items-center gap-3 cursor-none" onClick={() => toggleTodo(todo.id)}>
                      <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${todo.completed ? "border-cyan-400 bg-cyan-400/20 text-cyan-400" : "border-white/30"}`}>
                        {todo.completed && <Check size={12} />}
                      </div>
                      <span className={`font-['Outfit'] text-xs ${todo.completed ? "line-through text-slate-500" : "text-white"}`}>{todo.text}</span>
                    </div>
                    <button onClick={() => deleteTodo(todo.id)} className="text-red-400 hover:text-red-300 cursor-none p-1">
                      <Trash2 size={14} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="font-['Outfit'] text-slate-400 text-sm mb-4">Interactive playground simulation launching soon for this repository.</p>
              <a href={project.github} target="_blank" rel="noopener noreferrer" className="inline-block font-['JetBrains_Mono'] text-xs text-cyan-400 border border-cyan-500/40 px-4 py-2 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20">
                View Source on GitHub
              </a>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

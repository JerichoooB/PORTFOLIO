import React from "react";
import { motion } from "framer-motion";

export const FloatingParticles = () => {
  // Generate 30 glowing cyber particles
  const particles = Array.from({ length: 30 });

  return (
    <div className="pointer-events-none fixed inset-0 z-[1] overflow-hidden">
      {particles.map((_, i) => {
        const randomX = Math.random() * 100;
        const randomY = Math.random() * 100;
        const size = Math.random() * 3 + 1;
        const duration = Math.random() * 15 + 10;
        const delay = Math.random() * 5;

        return (
          <motion.div
            key={i}
            initial={{
              x: `${randomX}vw`,
              y: `${randomY}vh`,
              opacity: Math.random() * 0.5 + 0.2,
            }}
            animate={{
              y: [
                `${randomY}vh`,
                `${(randomY - 35 + 100) % 100}vh`,
                `${randomY}vh`,
              ],
              x: [
                `${randomX}vw`,
                `${randomX + (Math.random() * 10 - 5)}vw`,
                `${randomX}vw`,
              ],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: duration,
              repeat: Infinity,
              ease: "easeInOut",
              delay: delay,
            }}
            style={{
              width: `${size}px`,
              height: `${size}px`,
            }}
            className={`absolute rounded-full ${
              i % 2 === 0
                ? "bg-cyan-400 shadow-[0_0_10px_#00F0FF]"
                : "bg-purple-400 shadow-[0_0_10px_#B200FF]"
            }`}
          />
        );
      })}
    </div>
  );
};
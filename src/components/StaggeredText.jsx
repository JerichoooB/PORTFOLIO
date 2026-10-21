
import React from "react";
import { motion } from "framer-motion";

export const StaggeredText = ({ text, className }) => {
  const words = text.split(" ");
  return (
    <span className={`inline-block ${className}`}>
      {words.map((word, i) => (
        <span key={i} className="mr-[0.25em] inline-block overflow-hidden">
          <motion.span
            variants={{
              hidden: { y: "100%", opacity: 0, rotateZ: 5 },
              show: { y: 0, opacity: 1, rotateZ: 0 }
            }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="inline-block"
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  );
};
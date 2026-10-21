
import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

export const CustomCursor = () => {
  const canvasRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);
  const mouseRef = useRef({ x: -100, y: -100 });
  const pointsRef = useRef([]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    
    const handleMouseOver = (e) => {
      const target = e.target;
      if (target.closest("a") || target.closest("button") || target.closest(".interactive-card")) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseover", handleMouseOver);

    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      
      const resize = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      };
      window.addEventListener("resize", resize);
      resize();

      let animationFrameId;
      const maxAge = 25;

      const render = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        const mouse = mouseRef.current;
        const lastPoint = pointsRef.current[pointsRef.current.length - 1];
        
        if (!lastPoint || lastPoint.x !== mouse.x || lastPoint.y !== mouse.y) {
          pointsRef.current.push({ x: mouse.x, y: mouse.y, age: 0 });
        }

        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.shadowBlur = 10;
        ctx.shadowColor = "#00F0FF";
        
        for (let i = 1; i < pointsRef.current.length; i++) {
          const p1 = pointsRef.current[i - 1];
          const p2 = pointsRef.current[i];
          const opacity = Math.max(0, 1 - (p2.age / maxAge));
          
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = `rgba(0, 240, 255, ${opacity * 0.8})`;
          ctx.lineWidth = (3 * opacity) + 1;
          ctx.stroke();
        }

        pointsRef.current.forEach(p => p.age += 1);
        pointsRef.current = pointsRef.current.filter(p => p.age < maxAge);

        animationFrameId = requestAnimationFrame(render);
      };

      render();

      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("mouseover", handleMouseOver);
        window.removeEventListener("resize", resize);
        cancelAnimationFrame(animationFrameId);
      };
    }
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] hidden md:block">
      <canvas ref={canvasRef} className="absolute inset-0" />
      <motion.div
        className="absolute left-0 top-0 h-2 w-2 rounded-full mix-blend-screen"
        animate={{
          x: mousePosition.x - 4,
          y: mousePosition.y - 4,
          scale: isHovering ? 2.5 : 1,
          backgroundColor: isHovering ? "#B200FF" : "#00F0FF",
          boxShadow: isHovering ? "0 0 20px rgba(178,0,255,1)" : "0 0 10px rgba(0,240,255,0.8)"
        }}
        transition={{
          scale: { type: "spring", stiffness: 300, damping: 20 },
          backgroundColor: { duration: 0.2 },
          boxShadow: { duration: 0.2 },
          x: { duration: 0 },
          y: { duration: 0 }
        }}
      />
    </div>
  );
};
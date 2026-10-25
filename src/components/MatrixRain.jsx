import { useEffect, useRef } from "react";

export const MatrixRain = () => {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const chars = '010101RIRIDEVABCDEF';
    const fontSize = 16;
    let frame, lastFrame = 0, width, height, drops = [];
    const paint = (staticImage = false) => {
      // Fade existing glyphs without covering the background grid with black.
      ctx.globalCompositeOperation = 'destination-out';
      ctx.fillStyle = 'rgba(0,0,0,0.11)';
      ctx.fillRect(0, 0, width, height);
      ctx.globalCompositeOperation = 'source-over';
      ctx.fillStyle = '#91d9be';
      ctx.font = `${fontSize}px monospace`;
      for (let i = 0; i < drops.length; i++) {
        for (let row = 0; row < (staticImage ? 7 : 1); row++) {
          ctx.globalAlpha = staticImage ? (7 - row) / 7 : 1;
          ctx.fillText(chars[Math.floor(Math.random() * chars.length)], i * fontSize, (drops[i] - row) * fontSize);
        }
        if (drops[i] * fontSize > height && Math.random() > 0.975) drops[i] = -Math.random() * 20;
        drops[i]++;
      }
      ctx.globalAlpha = 1;
    };
    const resize = () => {
      width = window.innerWidth; height = window.innerHeight;
      const ratio = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = width * ratio; canvas.height = height * ratio;
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
      drops = Array.from({ length: Math.ceil(width / fontSize) }, () => Math.random() * height / fontSize);
      paint(true);
    };
    const animate = time => {
      if (time - lastFrame > 1000 / 25) { paint(); lastFrame = time; }
      frame = requestAnimationFrame(animate);
    };
    const syncPlayback = () => {
      cancelAnimationFrame(frame);
      if (!preference.matches && !document.hidden) frame = requestAnimationFrame(animate);
    };
    resize(); syncPlayback();
    window.addEventListener('resize', resize);
    preference.addEventListener('change', syncPlayback);
    document.addEventListener('visibilitychange', syncPlayback);
    return () => { cancelAnimationFrame(frame); window.removeEventListener('resize', resize); preference.removeEventListener('change', syncPlayback); document.removeEventListener('visibilitychange', syncPlayback); };
  }, []);
  return <canvas ref={canvasRef} data-matrix-rain aria-hidden="true" className="matrix-rain-canvas" />;
};

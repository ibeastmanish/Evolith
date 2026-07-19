"use client";

import { useEffect, useRef, useCallback } from "react";

interface Star {
  x: number;
  y: number;
  radius: number;
  alpha: number;
  speed: number;
  vx: number;
  vy: number;
}

interface Connection {
  from: number;
  to: number;
  alpha: number;
}

export default function HeroBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const starsRef = useRef<Star[]>([]);
  const connectionsRef = useRef<Connection[]>([]);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const animationRef = useRef<number>(0);

  const initStars = useCallback((width: number, height: number) => {
    const count = Math.min(Math.floor((width * height) / 8000), 200);
    starsRef.current = Array.from({ length: count }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 1.5 + 0.5,
      alpha: Math.random() * 0.6 + 0.2,
      speed: Math.random() * 0.3 + 0.05,
      vx: (Math.random() - 0.5) * 0.15,
      vy: (Math.random() - 0.5) * 0.15,
    }));
  }, []);

  const findConnections = useCallback((maxDist: number) => {
    const stars = starsRef.current;
    const conns: Connection[] = [];
    for (let i = 0; i < stars.length; i++) {
      for (let j = i + 1; j < stars.length; j++) {
        const dx = stars[i].x - stars[j].x;
        const dy = stars[i].y - stars[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < maxDist) {
          conns.push({
            from: i,
            to: j,
            alpha: (1 - dist / maxDist) * 0.15,
          });
        }
      }
    }
    connectionsRef.current = conns;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.scale(dpr, dpr);
      initStars(window.innerWidth, window.innerHeight);
    };

    resize();
    window.addEventListener("resize", resize);

    const handleMouse = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", handleMouse);

    let frameCount = 0;

    const animate = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const stars = starsRef.current;

      ctx.clearRect(0, 0, w, h);

      // Subtle radial gradient glow at center
      const grad = ctx.createRadialGradient(w * 0.5, h * 0.4, 0, w * 0.5, h * 0.4, w * 0.5);
      grad.addColorStop(0, "rgba(124, 92, 255, 0.03)");
      grad.addColorStop(0.5, "rgba(45, 226, 230, 0.01)");
      grad.addColorStop(1, "transparent");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);

      // Update and draw stars
      for (const star of stars) {
        star.x += star.vx;
        star.y += star.vy;

        // Mouse repulsion
        const dx = star.x - mouseRef.current.x;
        const dy = star.y - mouseRef.current.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          const force = (120 - dist) / 120;
          star.x += (dx / dist) * force * 0.5;
          star.y += (dy / dist) * force * 0.5;
        }

        // Wrap around
        if (star.x < 0) star.x = w;
        if (star.x > w) star.x = 0;
        if (star.y < 0) star.y = h;
        if (star.y > h) star.y = 0;

        // Pulsing alpha
        const pulse = Math.sin(frameCount * star.speed * 0.02) * 0.2 + star.alpha;

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(168, 178, 209, ${pulse})`;
        ctx.fill();
      }

      // Draw connections every 3 frames for performance
      if (frameCount % 3 === 0) {
        findConnections(140);
      }

      for (const conn of connectionsRef.current) {
        const from = stars[conn.from];
        const to = stars[conn.to];
        ctx.beginPath();
        ctx.moveTo(from.x, from.y);
        ctx.lineTo(to.x, to.y);
        ctx.strokeStyle = `rgba(124, 92, 255, ${conn.alpha})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }

      frameCount++;
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouse);
      cancelAnimationFrame(animationRef.current);
    };
  }, [initStars, findConnections]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-auto"
      style={{ zIndex: 0 }}
      aria-hidden="true"
    />
  );
}

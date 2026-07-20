"use client";

import { useEffect, useState } from "react";

const equations = [
  { tex: "E = mc^2", x: 12, y: 18, delay: 0 },
  { tex: "R_{\\mu\\nu} - \\frac{1}{2}g_{\\mu\\nu}R = 8\\pi G T_{\\mu\\nu}", x: 70, y: 25, delay: 2 },
  { tex: "i\\hbar\\frac{\\partial}{\\partial t}|\\Psi\\rangle = \\hat{H}|\\Psi\\rangle", x: 20, y: 72, delay: 4 },
  { tex: "S = k_B \\ln \\Omega", x: 78, y: 68, delay: 6 },
  { tex: "\\nabla \\times \\mathbf{E} = -\\frac{\\partial \\mathbf{B}}{\\partial t}", x: 8, y: 45, delay: 1 },
  { tex: "F = G\\frac{m_1 m_2}{r^2}", x: 85, y: 42, delay: 3 },
  { tex: "ds^2 = -c^2dt^2 + dx^2 + dy^2 + dz^2", x: 45, y: 85, delay: 5 },
  { tex: "\\Delta x \\Delta p \\geq \\frac{\\hbar}{2}", x: 55, y: 15, delay: 7 },
];

export default function FloatingEquations() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    queueMicrotask(() => setMounted(true));
  }, []);

  if (!mounted) return null;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {equations.map((eq, i) => (
        <div
          key={i}
          className="absolute text-[var(--ag-text-muted)] opacity-0"
          style={{
            left: `${eq.x}%`,
            top: `${eq.y}%`,
            fontSize: "0.8rem",
            fontFamily: "var(--font-mono)",
            animation: `float-slow 12s ease-in-out infinite, fade-in 2s ease-out ${eq.delay}s forwards`,
            animationDelay: `${eq.delay}s`,
          }}
        >
          {eq.tex}
        </div>
      ))}
    </div>
  );
}

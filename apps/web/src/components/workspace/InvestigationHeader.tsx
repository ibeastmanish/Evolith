"use client";

import { useEffect, useState } from "react";
import { TrendingUp, Calendar, User, Layers } from "lucide-react";
import type { KnowledgeNode } from "@/lib/mock-data";
import { nodeColors, nodeLabels } from "@/lib/constants";

interface InvestigationHeaderProps {
  node: KnowledgeNode;
}

function AnimatedScore({ target }: { target: number }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const duration = 1200;
    const steps = 40;
    const increment = target / steps;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      if (step >= steps) {
        setCount(target);
        clearInterval(timer);
      } else {
        /* Ease-out feel */
        const progress = step / steps;
        const eased = 1 - Math.pow(1 - progress, 3);
        setCount(Math.round(eased * target * 10) / 10);
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [target]);

  return (
    <span style={{ fontFamily: "var(--font-numbers)" }}>
      {count.toFixed(1)}
    </span>
  );
}

export default function InvestigationHeader({ node }: InvestigationHeaderProps) {
  const color = nodeColors[node.type];
  const score = node.evolutionScore ?? node.influenceScore ?? 0;

  return (
    <div className="px-6 pt-4 pb-2">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Left — Topic info */}
        <div className="flex items-center gap-4">
          {/* Type icon */}
          <div
            className="w-10 h-10 rounded-[12px] flex items-center justify-center"
            style={{ background: `${color}15`, border: `1px solid ${color}25` }}
          >
            <Layers size={18} style={{ color }} />
          </div>
          <div>
            <h1 className="text-xl font-semibold text-[var(--ev-text)] tracking-tight">
              {node.label}
            </h1>
            <div className="flex items-center gap-3 mt-0.5">
              <span
                className="text-[10px] px-2 py-0.5 rounded-full font-medium"
                style={{ background: `${color}12`, color, border: `1px solid ${color}20` }}
              >
                {nodeLabels[node.type]}
              </span>
              {node.year && (
                <span className="flex items-center gap-1 text-xs text-[var(--ev-text-muted)]">
                  <Calendar size={11} />
                  {node.year}
                </span>
              )}
              {node.creator && (
                <span className="flex items-center gap-1 text-xs text-[var(--ev-text-muted)]">
                  <User size={11} />
                  {node.creator}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Right — Evolution Score */}
        {score > 0 && (
          <div className="flex items-center gap-2.5 px-4 py-2 rounded-[14px] ev-glass-subtle">
            <TrendingUp size={16} className="text-[var(--ev-accent)]" />
            <div>
              <div className="text-lg font-bold text-[var(--ev-accent)] leading-none">
                <AnimatedScore target={score} />
              </div>
              <div className="text-[9px] text-[var(--ev-text-muted)] uppercase tracking-widest mt-0.5">
                Evolution Score
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

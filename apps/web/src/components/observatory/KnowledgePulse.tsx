"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles, TrendingUp, BookOpen, FlaskConical } from "lucide-react";
import Link from "next/link";
import Card from "@/components/ui/Card";
import { evolutionChains, milestones, nodeColors, type NodeType } from "@/lib/mock-data";

interface KnowledgePulseCardProps {
  chain: typeof evolutionChains[number];
  index: number;
}

function KnowledgePulseCard({ chain, index }: KnowledgePulseCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
    >
      <Link href={`/investigate/${chain.nodeIds[0]}`}>
        <Card variant="glass" padding="lg" className="w-[320px] flex-shrink-0 group cursor-pointer hover:-translate-y-[3px] hover:shadow-[var(--shadow-glow-accent)]">
          {/* Mini evolution chain indicator */}
          <div className="flex items-center gap-1 mb-4">
            {chain.nodeIds.slice(0, 5).map((_, i) => (
              <div key={i} className="flex items-center">
                <div
                  className="w-2 h-2 rounded-full bg-[var(--ev-accent)]"
                  style={{ opacity: 0.4 + i * 0.15 }}
                />
                {i < Math.min(chain.nodeIds.length, 5) - 1 && (
                  <div className="w-4 h-px bg-[var(--ev-accent)] opacity-30" />
                )}
              </div>
            ))}
            {chain.nodeIds.length > 5 && (
              <span className="text-[10px] text-[var(--ev-text-muted)] ml-1">+{chain.nodeIds.length - 5}</span>
            )}
          </div>

          {/* Title */}
          <h3 className="text-lg font-semibold text-[var(--ev-text)] mb-1.5 group-hover:ev-gradient-text transition-all">
            {chain.label}
          </h3>
          <p className="text-sm text-[var(--ev-text-tertiary)] leading-relaxed mb-4 line-clamp-2">
            {chain.description}
          </p>

          {/* Stats */}
          <div className="flex items-center gap-4 text-[11px] text-[var(--ev-text-muted)]">
            <span className="flex items-center gap-1">
              <BookOpen size={12} />
              {chain.paperCount} papers
            </span>
            <span className="flex items-center gap-1">
              <Sparkles size={12} />
              {chain.researcherCount} researchers
            </span>
            <span className="flex items-center gap-1">
              <FlaskConical size={12} />
              {chain.openProblems} open problems
            </span>
          </div>

          {/* Evolution Score */}
          <div className="mt-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <TrendingUp size={14} className="text-[var(--ev-accent)]" />
              <span className="text-sm font-semibold text-[var(--ev-accent)]" style={{ fontFamily: "var(--font-numbers)" }}>
                {chain.evolutionScore.toFixed(1)}
              </span>
              <span className="text-[10px] text-[var(--ev-text-muted)]">evolution score</span>
            </div>
            <ArrowRight size={14} className="text-[var(--ev-text-muted)] group-hover:text-[var(--ev-accent)] group-hover:translate-x-1 transition-all" />
          </div>
        </Card>
      </Link>
    </motion.div>
  );
}

export default function KnowledgePulse() {
  return (
    <section className="py-16 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-xl font-semibold text-[var(--ev-text)] mb-1">Featured Investigations</h2>
            <p className="text-sm text-[var(--ev-text-tertiary)]">Curated evolution chains across technology and science</p>
          </div>
          <Link
            href="/investigate/transformer"
            className="text-sm text-[var(--ev-accent)] hover:text-[var(--ev-accent-hover)] transition-colors flex items-center gap-1"
          >
            Explore all
            <ArrowRight size={14} />
          </Link>
        </div>

        {/* Horizontal Scroll */}
        <div className="flex gap-5 overflow-x-auto pb-4 -mx-6 px-6 scrollbar-hide" style={{ scrollbarWidth: "none" }}>
          {evolutionChains.map((chain, i) => (
            <KnowledgePulseCard key={chain.id} chain={chain} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

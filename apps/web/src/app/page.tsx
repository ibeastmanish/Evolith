"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search, Shuffle } from "lucide-react";
import { useRouter } from "next/navigation";
import HeroBackground from "@/components/landing/HeroBackground";
import TopNav from "@/components/observatory/TopNav";
import KnowledgePulse from "@/components/observatory/KnowledgePulse";
import CommandPalette from "@/components/ui/CommandPalette";
import { useStore } from "@/store/useStore";
import { SITE_CONFIG } from "@/lib/constants";
import { milestones } from "@/lib/mock-data";

const placeholders = [
  "Investigate transformers...",
  "Explore the history of neural networks...",
  "Trace the evolution of computer vision...",
  "Discover how attention changed AI...",
  "Uncover the origins of deep learning...",
];

const trendingTopics = [
  { id: "transformer", label: "Transformers", year: 2017 },
  { id: "gpt-4", label: "GPT-4", year: 2023 },
  { id: "diffusion", label: "Diffusion Models", year: 2020 },
  { id: "agents", label: "AI Agents", year: 2023 },
  { id: "attention", label: "Attention", year: 2014 },
  { id: "rlhf", label: "RLHF", year: 2022 },
];

function AnimatedPlaceholder() {
  const [index, setIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [typing, setTyping] = useState(true);

  useEffect(() => {
    const target = placeholders[index];
    if (typing) {
      if (displayed.length < target.length) {
        const timeout = setTimeout(() => setDisplayed(target.slice(0, displayed.length + 1)), 50);
        return () => clearTimeout(timeout);
      } else {
        const timeout = setTimeout(() => setTyping(false), 2000);
        return () => clearTimeout(timeout);
      }
    } else {
      if (displayed.length > 0) {
        const timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 25);
        return () => clearTimeout(timeout);
      } else {
        const timeout = setTimeout(() => {
          setIndex((i) => (i + 1) % placeholders.length);
          setTyping(true);
        }, 300);
        return () => clearTimeout(timeout);
      }
    }
  }, [displayed, typing, index]);

  return <span className="text-[var(--ev-text-muted)]">{displayed}<span className="animate-pulse">|</span></span>;
}

export default function HomePage() {
  const router = useRouter();
  const { setCommandPaletteOpen } = useStore();

  const handleSurpriseMe = () => {
    const randomTopics = ["transformer", "backpropagation", "gan", "lstm", "resnet", "alexnet", "bert", "gpt-4"];
    const randomId = randomTopics[Math.floor(Math.random() * randomTopics.length)];
    router.push(`/investigate/${randomId}`);
  };

  return (
    <main className="relative min-h-screen">
      {/* Constellation Background */}
      <HeroBackground />

      {/* Command Palette */}
      <CommandPalette />

      {/* Content */}
      <div className="relative z-10">
        <TopNav />

        {/* ── Hero: The Observatory ── */}
        <section className="relative min-h-screen flex flex-col items-center justify-center px-6">
          <div className="relative z-10 max-w-3xl mx-auto text-center">
            {/* Wordmark */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="mb-8"
            >
              <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight">
                <span className="ev-gradient-text">{SITE_CONFIG.name}</span>
              </h1>
              <p className="text-lg text-[var(--ev-text-secondary)] mt-4 max-w-lg mx-auto leading-relaxed">
                Explore how technology evolves. Trace the origins, connections, and future of every breakthrough.
              </p>
            </motion.div>

            {/* Investigation Search Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            >
              <button
                onClick={() => setCommandPaletteOpen(true)}
                className="w-full max-w-[540px] mx-auto flex items-center gap-3 px-6 py-4 rounded-[20px] ev-glass hover:bg-[rgba(255,255,255,0.06)] transition-all duration-200 cursor-text group shadow-[0_8px_32px_rgba(0,0,0,0.3)] hover:shadow-[var(--shadow-glow-accent)] border border-[var(--ev-border)] hover:border-[var(--ev-border-active)]"
              >
                <Search size={20} className="text-[var(--ev-text-muted)] group-hover:text-[var(--ev-accent)] transition-colors flex-shrink-0" />
                <div className="flex-1 text-left text-[15px]">
                  <AnimatedPlaceholder />
                </div>
                <kbd className="hidden sm:inline-flex items-center gap-0.5 px-2 py-1 rounded-lg bg-[var(--ev-elevated)] text-[var(--ev-text-muted)] text-[11px] font-medium border border-[var(--ev-border)]">
                  ⌘K
                </kbd>
              </button>
            </motion.div>

            {/* Trending Topics */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-wrap items-center justify-center gap-2 mt-6"
            >
              {trendingTopics.map((topic) => (
                <button
                  key={topic.id}
                  onClick={() => router.push(`/investigate/${topic.id}`)}
                  className="px-3 py-1.5 rounded-full text-xs font-medium text-[var(--ev-text-secondary)] bg-[var(--ev-surface)] border border-[var(--ev-border)] hover:border-[var(--ev-accent)] hover:text-[var(--ev-accent)] transition-all duration-[120ms] hover:-translate-y-[1px]"
                >
                  {topic.label}
                  <span className="text-[var(--ev-text-muted)] ml-1">{topic.year}</span>
                </button>
              ))}
              <button
                onClick={handleSurpriseMe}
                className="px-3 py-1.5 rounded-full text-xs font-medium text-[var(--ev-accent-secondary)] bg-[var(--ev-accent-secondary-muted)] border border-[rgba(139,92,246,0.2)] hover:border-[var(--ev-accent-secondary)] transition-all duration-[120ms] hover:-translate-y-[1px] flex items-center gap-1"
              >
                <Shuffle size={12} />
                Surprise Me
              </button>
            </motion.div>
          </div>

          {/* Gradient fade at bottom */}
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[var(--ev-background)] to-transparent" />
        </section>

        {/* ── Knowledge Pulse ── */}
        <KnowledgePulse />

        {/* ── Trending Timeline Teaser ── */}
        <section className="py-16 px-6">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-xl font-semibold text-[var(--ev-text)] mb-2">The Evolution of AI</h2>
              <p className="text-sm text-[var(--ev-text-tertiary)]">80 years of breakthroughs, one connected timeline</p>
            </div>

            {/* Horizontal Timeline */}
            <div className="relative overflow-x-auto pb-4" style={{ scrollbarWidth: "none" }}>
              <div className="flex items-center gap-0 min-w-max px-8">
                {milestones
                  .filter((m) => m.significance === "major")
                  .map((milestone, i, arr) => (
                    <motion.div
                      key={milestone.nodeId}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05, duration: 0.3 }}
                      className="flex items-center"
                    >
                      <button
                        onClick={() => router.push(`/investigate/${milestone.nodeId}`)}
                        className="flex flex-col items-center gap-2 group cursor-pointer"
                      >
                        {/* Year */}
                        <span
                          className="text-[11px] font-medium text-[var(--ev-text-muted)] group-hover:text-[var(--ev-accent)] transition-colors"
                          style={{ fontFamily: "var(--font-numbers)" }}
                        >
                          {milestone.year}
                        </span>
                        {/* Dot */}
                        <div className="w-3 h-3 rounded-full bg-[var(--ev-accent)] opacity-60 group-hover:opacity-100 group-hover:shadow-[var(--shadow-glow-accent)] transition-all" />
                        {/* Label */}
                        <span className="text-[11px] text-[var(--ev-text-tertiary)] group-hover:text-[var(--ev-text)] transition-colors max-w-[80px] text-center leading-tight">
                          {milestone.label}
                        </span>
                      </button>
                      {/* Connector */}
                      {i < arr.length - 1 && (
                        <div className="w-12 h-px bg-gradient-to-r from-[var(--ev-accent)] to-[var(--ev-accent)] opacity-20 mx-2 mt-[-18px]" />
                      )}
                    </motion.div>
                  ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Minimal Footer ── */}
        <footer className="border-t border-[var(--ev-border)] py-8 px-6">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-[var(--ev-text-secondary)]">{SITE_CONFIG.name}</span>
              <span className="text-xs text-[var(--ev-text-muted)]">· Open source under MIT License</span>
            </div>
            <div className="flex items-center gap-6">
              <a href={SITE_CONFIG.github} target="_blank" rel="noopener noreferrer" className="text-xs text-[var(--ev-text-muted)] hover:text-[var(--ev-text-secondary)] transition-colors">
                GitHub
              </a>
              <a href="#" className="text-xs text-[var(--ev-text-muted)] hover:text-[var(--ev-text-secondary)] transition-colors">
                Documentation
              </a>
              <a href="#" className="text-xs text-[var(--ev-text-muted)] hover:text-[var(--ev-text-secondary)] transition-colors">
                Contributing
              </a>
            </div>
          </div>
        </footer>
      </div>
    </main>
  );
}

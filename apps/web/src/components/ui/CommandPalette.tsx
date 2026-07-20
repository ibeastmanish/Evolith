"use client";

import { useEffect, useCallback, useRef } from "react";
import { Command } from "cmdk";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Cpu, FileText, Building2, User, Sparkles } from "lucide-react";
import { useStore } from "@/store/useStore";
import { searchNodes, type KnowledgeNode } from "@/lib/mock-data";
import { nodeColors, type NodeType } from "@/lib/constants";
import { useRouter } from "next/navigation";

const typeIcons: Record<NodeType, typeof Cpu> = {
  technology: Cpu,
  paper: FileText,
  company: Building2,
  person: User,
  dataset: Sparkles,
  patent: Sparkles,
};

export default function CommandPalette() {
  const { commandPaletteOpen, setCommandPaletteOpen } = useStore();
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  /* ⌘K listener */
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setCommandPaletteOpen(!commandPaletteOpen);
      }
      if (e.key === "Escape" && commandPaletteOpen) {
        setCommandPaletteOpen(false);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [commandPaletteOpen, setCommandPaletteOpen]);

  const handleSelect = useCallback(
    (nodeId: string) => {
      setCommandPaletteOpen(false);
      router.push(`/investigate/${encodeURIComponent(nodeId)}`);
    },
    [setCommandPaletteOpen, router]
  );

  const renderItem = (node: KnowledgeNode) => {
    const Icon = typeIcons[node.type] || Cpu;
    const color = nodeColors[node.type];
    const score = node.evolutionScore ?? node.influenceScore ?? 0;

    return (
      <Command.Item
        key={node.id}
        value={`${node.label} ${node.description} ${node.field ?? ""}`}
        onSelect={() => handleSelect(node.id)}
        className="flex items-center gap-3 px-4 py-3 rounded-[12px] cursor-pointer transition-colors duration-[120ms] data-[selected=true]:bg-[var(--ev-elevated)] group"
      >
        <div
          className="w-8 h-8 rounded-[10px] flex items-center justify-center flex-shrink-0"
          style={{ background: `${color}15`, border: `1px solid ${color}30` }}
        >
          <Icon size={16} style={{ color }} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-sm font-medium text-[var(--ev-text)] truncate">{node.label}</div>
          <div className="text-xs text-[var(--ev-text-muted)] truncate">
            {node.year} · {node.field ?? node.type}
          </div>
        </div>
        {score > 0 && (
          <div className="flex items-center gap-1 flex-shrink-0">
            <span
              className="text-xs font-medium tabular-nums"
              style={{ fontFamily: "var(--font-numbers)", color }}
            >
              {score.toFixed(1)}
            </span>
          </div>
        )}
        <span
          className="text-[10px] px-2 py-0.5 rounded-full font-medium flex-shrink-0"
          style={{ background: `${color}15`, color, border: `1px solid ${color}25` }}
        >
          {node.type}
        </span>
      </Command.Item>
    );
  };

  return (
    <AnimatePresence>
      {commandPaletteOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm"
            onClick={() => setCommandPaletteOpen(false)}
          />

          {/* Palette */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -10 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-[20vh] left-1/2 -translate-x-1/2 z-[101] w-full max-w-[620px] px-4"
          >
            <Command
              className="ev-glass-strong rounded-[20px] overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.5)]"
              loop
              shouldFilter={false}
            >
              {/* Input */}
              <div className="flex items-center gap-3 px-5 py-4 border-b border-[var(--ev-border)]">
                <Search size={18} className="text-[var(--ev-text-muted)] flex-shrink-0" />
                <Command.Input
                  ref={inputRef}
                  placeholder="Investigate technologies, papers, companies, or people…"
                  className="flex-1 bg-transparent text-[var(--ev-text)] text-[15px] placeholder:text-[var(--ev-text-muted)] outline-none"
                  onValueChange={() => {/* cmdk handles filtering */}}
                />
                <kbd className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-[var(--ev-elevated)] text-[var(--ev-text-muted)] text-[10px] font-medium border border-[var(--ev-border)]">
                  ESC
                </kbd>
              </div>

              {/* Results */}
              <Command.List className="max-h-[400px] overflow-y-auto p-2">
                <Command.Empty className="py-12 text-center text-sm text-[var(--ev-text-muted)]">
                  This branch of knowledge has not yet been mapped.
                </Command.Empty>

                {/* Technologies */}
                <Command.Group heading="Technologies" className="mb-1">
                  <div className="px-3 py-1.5 text-[10px] font-semibold text-[var(--ev-text-muted)] uppercase tracking-widest">
                    Technologies
                  </div>
                  {searchNodes("").filter((n) => n.type === "technology").slice(0, 6).map(renderItem)}
                </Command.Group>

                {/* Papers */}
                <Command.Group heading="Papers" className="mb-1">
                  <div className="px-3 py-1.5 text-[10px] font-semibold text-[var(--ev-text-muted)] uppercase tracking-widest">
                    Papers
                  </div>
                  {searchNodes("").filter((n) => n.type === "paper").slice(0, 4).map(renderItem)}
                </Command.Group>

                {/* Companies */}
                <Command.Group heading="Companies" className="mb-1">
                  <div className="px-3 py-1.5 text-[10px] font-semibold text-[var(--ev-text-muted)] uppercase tracking-widest">
                    Companies
                  </div>
                  {searchNodes("").filter((n) => n.type === "company").slice(0, 4).map(renderItem)}
                </Command.Group>

                {/* People */}
                <Command.Group heading="People" className="mb-1">
                  <div className="px-3 py-1.5 text-[10px] font-semibold text-[var(--ev-text-muted)] uppercase tracking-widest">
                    People
                  </div>
                  {searchNodes("").filter((n) => n.type === "person").slice(0, 4).map(renderItem)}
                </Command.Group>
              </Command.List>

              {/* Footer */}
              <div className="flex items-center justify-between px-5 py-2.5 border-t border-[var(--ev-border)]">
                <span className="text-[10px] text-[var(--ev-text-muted)]">
                  ↑↓ navigate · ↵ investigate · esc close
                </span>
                <span className="text-[10px] text-[var(--ev-accent)] font-medium">
                  Evolith
                </span>
              </div>
            </Command>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

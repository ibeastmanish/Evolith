"use client";

import { motion } from "framer-motion";
import { Orbit, Clock, GitBranch, FileText, Columns2, Brain } from "lucide-react";
import { useStore, type ActiveView } from "@/store/useStore";

const tabs: { id: ActiveView; label: string; icon: typeof Orbit }[] = [
  { id: "universe", label: "Universe", icon: Orbit },
  { id: "timemachine", label: "Time Machine", icon: Clock },
  { id: "tree", label: "Tree", icon: GitBranch },
  { id: "papers", label: "Papers", icon: FileText },
  { id: "parallel", label: "Parallel Evolution", icon: Columns2 },
];

export default function ViewTabs() {
  const { activeView, setActiveView, togglePartner, partnerOpen } = useStore();

  return (
    <div className="px-6 pb-2">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Tabs */}
        <div className="flex items-center gap-1 p-1 rounded-[14px] bg-[var(--ev-surface)] border border-[var(--ev-border)]">
          {tabs.map((tab) => {
            const isActive = activeView === tab.id;
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveView(tab.id)}
                className={`relative flex items-center gap-1.5 px-3 py-1.5 rounded-[10px] text-xs font-medium transition-colors duration-[120ms] ${
                  isActive
                    ? "text-[var(--ev-text)]"
                    : "text-[var(--ev-text-muted)] hover:text-[var(--ev-text-secondary)]"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-[var(--ev-elevated)] rounded-[10px] border border-[var(--ev-border-hover)]"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-1.5">
                  <Icon size={13} />
                  <span className="hidden sm:inline">{tab.label}</span>
                </span>
              </button>
            );
          })}
        </div>

        {/* Research Partner Toggle */}
        <button
          onClick={togglePartner}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-[10px] text-xs font-medium transition-all duration-[120ms] ${
            partnerOpen
              ? "text-[var(--ev-accent)] bg-[var(--ev-accent-muted)] border border-[var(--ev-border-active)]"
              : "text-[var(--ev-text-muted)] hover:text-[var(--ev-text-secondary)] border border-transparent hover:border-[var(--ev-border)]"
          }`}
        >
          <Brain size={14} />
          <span className="hidden sm:inline">Research Partner</span>
          <kbd className="hidden md:inline-flex text-[9px] px-1 py-0.5 rounded bg-[var(--ev-elevated)] text-[var(--ev-text-muted)] border border-[var(--ev-border)]">
            ⌘/
          </kbd>
        </button>
      </div>
    </div>
  );
}

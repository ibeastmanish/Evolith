"use client";

import { useState, useEffect } from "react";
import { Search, Bell, Sparkles } from "lucide-react";
import { useStore } from "@/store/useStore";
import { SITE_CONFIG } from "@/lib/constants";

export default function TopNav() {
  const [scrolled, setScrolled] = useState(false);
  const { setCommandPaletteOpen } = useStore();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "ev-glass-strong py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <a href="/" className="flex items-center gap-2.5 group">
          <div className="w-7 h-7 rounded-[8px] ev-gradient-accent flex items-center justify-center">
            <Sparkles size={14} className="text-white" />
          </div>
          <span className="font-semibold text-[15px] text-[var(--ev-text)] tracking-tight">
            {SITE_CONFIG.name}
          </span>
        </a>

        {/* Center — Investigation trigger */}
        <button
          onClick={() => setCommandPaletteOpen(true)}
          className="hidden sm:flex items-center gap-2.5 px-4 py-2 rounded-[12px] ev-glass-subtle hover:bg-[rgba(255,255,255,0.06)] transition-all duration-[120ms] cursor-pointer group"
        >
          <Search size={14} className="text-[var(--ev-text-muted)] group-hover:text-[var(--ev-text-secondary)]" />
          <span className="text-sm text-[var(--ev-text-muted)] group-hover:text-[var(--ev-text-secondary)]">
            Investigate...
          </span>
          <kbd className="hidden md:inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-md bg-[var(--ev-elevated)] text-[var(--ev-text-muted)] text-[10px] font-medium border border-[var(--ev-border)]">
            ⌘K
          </kbd>
        </button>

        {/* Right */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setCommandPaletteOpen(true)}
            className="sm:hidden p-2 rounded-[10px] hover:bg-[var(--ev-elevated)] transition-colors"
            aria-label="Search"
          >
            <Search size={18} className="text-[var(--ev-text-secondary)]" />
          </button>
          <button
            className="relative p-2 rounded-[10px] hover:bg-[var(--ev-elevated)] transition-colors"
            aria-label="Notifications"
          >
            <Bell size={18} className="text-[var(--ev-text-secondary)]" />
            {/* Subtle blue dot — never red */}
            <div className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-[var(--ev-accent)]" />
          </button>
          <div className="w-8 h-8 rounded-full bg-[var(--ev-elevated)] border border-[var(--ev-border)] flex items-center justify-center text-xs font-medium text-[var(--ev-text-secondary)] ml-1">
            M
          </div>
        </div>
      </div>
    </nav>
  );
}

"use client";

import { useState, useEffect } from "react";
import { SITE_CONFIG } from "@/lib/constants";
import Button from "@/components/ui/Button";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "glass py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-3 group">
          <div className="w-8 h-8 rounded-lg gradient-accent flex items-center justify-center font-bold text-sm text-white">
            AG
          </div>
          <span className="font-[family-name:var(--font-heading)] font-semibold text-lg text-[var(--ag-text-primary)] tracking-tight">
            {SITE_CONFIG.name}
          </span>
        </a>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-8">
          <a href="#features" className="text-sm text-[var(--ag-text-secondary)] hover:text-[var(--ag-text-primary)] transition-colors">
            Features
          </a>
          <a href="#pipeline" className="text-sm text-[var(--ag-text-secondary)] hover:text-[var(--ag-text-primary)] transition-colors">
            How It Works
          </a>
          <a href="#research" className="text-sm text-[var(--ag-text-secondary)] hover:text-[var(--ag-text-primary)] transition-colors">
            Research
          </a>
          <a
            href={SITE_CONFIG.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-[var(--ag-text-secondary)] hover:text-[var(--ag-text-primary)] transition-colors"
          >
            GitHub
          </a>
        </div>

        {/* CTA */}
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" className="hidden sm:inline-flex">
            Documentation
          </Button>
          <a href="/dashboard">
            <Button variant="accent" size="sm">
              Start Research
            </Button>
          </a>
        </div>
      </div>
    </nav>
  );
}

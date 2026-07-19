"use client";

import Button from "@/components/ui/Button";
import { SITE_CONFIG } from "@/lib/constants";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-6">
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[var(--ag-border)] bg-[var(--ag-surface)] mb-8 animate-fade-in">
          <div className="w-2 h-2 rounded-full bg-[var(--ag-highlight)] animate-pulse-glow" />
          <span className="text-xs font-medium text-[var(--ag-text-secondary)]">
            Open Research Platform
          </span>
        </div>

        {/* Headline */}
        <h1 className="font-[family-name:var(--font-heading)] text-[var(--ag-text-primary)] mb-6 animate-slide-up leading-[1.1]">
          Where AI Meets{" "}
          <span className="gradient-text-accent">
            Fundamental Physics
          </span>
        </h1>

        {/* Subtitle */}
        <p
          className="text-lg md:text-xl text-[var(--ag-text-secondary)] max-w-2xl mx-auto mb-10 leading-relaxed opacity-0 animate-slide-up"
          style={{ animationDelay: "150ms" }}
        >
          {SITE_CONFIG.description} Import papers, build knowledge graphs, and generate
          evidence-backed hypotheses with transparent AI reasoning.
        </p>

        {/* CTAs */}
        <div
          className="flex flex-col sm:flex-row items-center justify-center gap-4 opacity-0 animate-slide-up"
          style={{ animationDelay: "300ms" }}
        >
          <a href="/dashboard">
            <Button variant="accent" size="lg" className="min-w-[180px]">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
              </svg>
              Start Research
            </Button>
          </a>
          <a href={SITE_CONFIG.github} target="_blank" rel="noopener noreferrer">
            <Button variant="secondary" size="lg" className="min-w-[180px]">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
              </svg>
              View on GitHub
            </Button>
          </a>
        </div>

        {/* Stats */}
        <div
          className="mt-16 grid grid-cols-3 gap-8 max-w-lg mx-auto opacity-0 animate-slide-up"
          style={{ animationDelay: "500ms" }}
        >
          <div>
            <div className="text-2xl font-bold font-[family-name:var(--font-heading)] text-[var(--ag-text-primary)]">
              15+
            </div>
            <div className="text-xs text-[var(--ag-text-tertiary)] mt-1">Ontology Types</div>
          </div>
          <div>
            <div className="text-2xl font-bold font-[family-name:var(--font-heading)] text-[var(--ag-text-primary)]">
              9
            </div>
            <div className="text-xs text-[var(--ag-text-tertiary)] mt-1">Discovery Metrics</div>
          </div>
          <div>
            <div className="text-2xl font-bold font-[family-name:var(--font-heading)] text-[var(--ag-text-primary)]">
              100%
            </div>
            <div className="text-xs text-[var(--ag-text-tertiary)] mt-1">Evidence-Backed</div>
          </div>
        </div>
      </div>

      {/* Gradient fade at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[var(--ag-background)] to-transparent" />
    </section>
  );
}

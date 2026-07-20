"use client";

import Button from "@/components/ui/Button";
import { SITE_CONFIG } from "@/lib/constants";

export default function OpenSourceSection() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-3xl mx-auto text-center">
        <div className="card p-12">
          <div className="w-14 h-14 rounded-2xl gradient-accent flex items-center justify-center mx-auto mb-6">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
            </svg>
          </div>
          <h2 className="font-[family-name:var(--font-heading)] text-[var(--ag-text-primary)] text-2xl mb-4">
            Open Source & Open Science
          </h2>
          <p className="text-[var(--ag-text-secondary)] mb-8 max-w-lg mx-auto">
            Anti Gravity is open source. Every algorithm, every prompt, every ontology decision is transparent and reproducible. Science should be open.
          </p>
          <div className="flex items-center justify-center gap-4">
            <a href={SITE_CONFIG.github} target="_blank" rel="noopener noreferrer">
              <Button variant="primary" size="lg">
                View Repository
              </Button>
            </a>
            <Button variant="secondary" size="lg">
              Read the Docs
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

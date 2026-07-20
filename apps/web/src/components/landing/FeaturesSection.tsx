"use client";

import Card from "@/components/ui/Card";

const features = [
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--ag-accent)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" />
        <path d="M14 2v6h6" /><path d="M16 13H8" /><path d="M16 17H8" /><path d="M10 9H8" />
      </svg>
    ),
    title: "Paper Import & RAG",
    description: "Import from arXiv, DOI, or PDF. Papers are chunked, embedded, and indexed for retrieval-augmented reasoning.",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--ag-highlight)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3" /><path d="M12 2v4" /><path d="M12 18v4" /><path d="m4.93 4.93 2.83 2.83" />
        <path d="m16.24 16.24 2.83 2.83" /><path d="M2 12h4" /><path d="M18 12h4" />
        <path d="m4.93 19.07 2.83-2.83" /><path d="m16.24 4.93 2.83-2.83" />
      </svg>
    ),
    title: "Knowledge Graph",
    description: "A physics ontology with 15+ node types — theories, equations, particles, experiments — connected by 14 edge types.",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--ag-accent)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        <path d="M8 10h8" /><path d="M8 14h4" />
      </svg>
    ),
    title: "AI Research Assistant",
    description: "Two modes: Research (established science only) and Discovery (exploratory connections). Every claim is evidence-backed.",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--ag-highlight)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
      </svg>
    ),
    title: "Hypothesis Generator",
    description: "Generate evidence-backed hypotheses scored across 9 Discovery metrics: novelty, impact, testability, and more.",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--ag-accent)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 12 11 14 15 10" /><circle cx="12" cy="12" r="10" />
      </svg>
    ),
    title: "Evidence Verification",
    description: "Cross-check every claim against arXiv, Semantic Scholar, and CrossRef. No claim stands on a single source.",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--ag-highlight)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 20h9" /><path d="M16.376 3.622a1 1 0 0 1 3.002 3.002L7.368 18.635a2 2 0 0 1-.855.506l-2.872.838.838-2.872a2 2 0 0 1 .506-.854Z" />
      </svg>
    ),
    title: "Full Provenance",
    description: "Every fact is traceable: claim → paper → section → paragraph → equation, with extraction timestamps and model versions.",
  },
];

export default function FeaturesSection() {
  return (
    <section id="features" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-[family-name:var(--font-heading)] text-[var(--ag-text-primary)] mb-4">
            Built for Scientific Rigor
          </h2>
          <p className="text-[var(--ag-text-secondary)] max-w-xl mx-auto">
            Every feature is designed around one principle: evidence-backed, reproducible research.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 stagger-children">
          {features.map((feature, i) => (
            <Card key={i} variant="interactive" padding="lg">
              <div className="mb-4">{feature.icon}</div>
              <h3 className="font-[family-name:var(--font-heading)] text-base font-semibold text-[var(--ag-text-primary)] mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-[var(--ag-text-tertiary)] leading-relaxed">
                {feature.description}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

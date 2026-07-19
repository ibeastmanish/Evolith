"use client";

import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

const stats = [
  { label: "Papers Imported", value: "0", icon: "📄" },
  { label: "Graph Nodes", value: "0", icon: "🔗" },
  { label: "Hypotheses", value: "0", icon: "✨" },
  { label: "Verified Claims", value: "0", icon: "✓" },
];

const quickActions = [
  { label: "Import a Paper", href: "/dashboard/papers", description: "Add a paper from arXiv, DOI, or PDF" },
  { label: "Ask AI Assistant", href: "/dashboard/assistant", description: "Research or Discovery mode" },
  { label: "Explore Graph", href: "/dashboard/graph", description: "Browse the knowledge graph" },
  { label: "Generate Hypothesis", href: "/dashboard/hypotheses", description: "Create evidence-backed hypotheses" },
];

export default function DashboardOverview() {
  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8">
      {/* Welcome */}
      <div>
        <h1 className="text-2xl font-[family-name:var(--font-heading)] font-semibold text-[var(--ag-text-primary)] mb-2">
          Research Dashboard
        </h1>
        <p className="text-sm text-[var(--ag-text-tertiary)]">
          Import papers, build knowledge, and discover new physics.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.label} variant="default" padding="md">
            <div className="flex items-center justify-between mb-2">
              <span className="text-lg">{stat.icon}</span>
            </div>
            <div className="text-2xl font-bold font-[family-name:var(--font-heading)] text-[var(--ag-text-primary)]">
              {stat.value}
            </div>
            <div className="text-xs text-[var(--ag-text-tertiary)] mt-1">{stat.label}</div>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-sm font-semibold text-[var(--ag-text-secondary)] mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {quickActions.map((action) => (
            <a key={action.label} href={action.href}>
              <Card variant="interactive" padding="md" className="group">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-semibold text-[var(--ag-text-primary)] mb-1">
                      {action.label}
                    </h3>
                    <p className="text-xs text-[var(--ag-text-tertiary)]">{action.description}</p>
                  </div>
                  <svg
                    width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--ag-text-muted)"
                    strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
                    className="group-hover:translate-x-1 transition-transform"
                  >
                    <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
                  </svg>
                </div>
              </Card>
            </a>
          ))}
        </div>
      </div>

      {/* Getting Started */}
      <Card variant="elevated" padding="lg">
        <h2 className="text-base font-[family-name:var(--font-heading)] font-semibold text-[var(--ag-text-primary)] mb-3">
          Getting Started
        </h2>
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full border border-[var(--ag-border)] flex items-center justify-center text-xs text-[var(--ag-text-muted)] flex-shrink-0 mt-0.5">
              1
            </div>
            <div>
              <p className="text-sm text-[var(--ag-text-primary)] font-medium">Import your first paper</p>
              <p className="text-xs text-[var(--ag-text-tertiary)]">
                Go to Papers → enter an arXiv ID, DOI, or upload a PDF.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full border border-[var(--ag-border)] flex items-center justify-center text-xs text-[var(--ag-text-muted)] flex-shrink-0 mt-0.5">
              2
            </div>
            <div>
              <p className="text-sm text-[var(--ag-text-primary)] font-medium">Ask the AI Assistant</p>
              <p className="text-xs text-[var(--ag-text-tertiary)]">
                Switch between Research Mode and Discovery Mode to explore your papers.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full border border-[var(--ag-border)] flex items-center justify-center text-xs text-[var(--ag-text-muted)] flex-shrink-0 mt-0.5">
              3
            </div>
            <div>
              <p className="text-sm text-[var(--ag-text-primary)] font-medium">Generate hypotheses</p>
              <p className="text-xs text-[var(--ag-text-tertiary)]">
                Let the Hypothesis Agent propose evidence-backed explanations with Discovery Scores.
              </p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

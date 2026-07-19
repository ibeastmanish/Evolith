"use client";

import EmptyState from "@/components/ui/EmptyState";
import Button from "@/components/ui/Button";

export default function GraphPage() {
  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-[var(--ag-border)] flex items-center justify-between">
        <div>
          <h1 className="text-lg font-[family-name:var(--font-heading)] font-semibold text-[var(--ag-text-primary)]">
            Knowledge Graph
          </h1>
          <p className="text-xs text-[var(--ag-text-tertiary)] mt-1">
            Physics ontology with 15+ node types and 14 edge types
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm">
            Filters
          </Button>
          <Button variant="secondary" size="sm">
            Version History
          </Button>
        </div>
      </div>

      {/* Graph Area */}
      <div className="flex-1 relative bg-[var(--ag-background)]">
        <EmptyState
          icon={
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="3" /><path d="M12 2v4" /><path d="M12 18v4" />
              <path d="m4.93 4.93 2.83 2.83" /><path d="m16.24 16.24 2.83 2.83" />
              <path d="M2 12h4" /><path d="M18 12h4" />
            </svg>
          }
          title="Knowledge graph is empty"
          description="Import papers to start building the physics knowledge graph. Concepts, equations, and theories will appear as connected nodes."
          action={
            <a href="/dashboard/papers">
              <Button variant="accent" size="sm">
                Import Papers
              </Button>
            </a>
          }
        />
      </div>
    </div>
  );
}

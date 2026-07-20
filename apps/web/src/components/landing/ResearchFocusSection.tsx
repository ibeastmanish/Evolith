"use client";

import Card from "@/components/ui/Card";

const connections = [
  { from: "Quantum Mechanics", to: "Gravity", status: "Unresolved", years: "90+" },
  { from: "General Relativity", to: "Dark Matter", status: "Unresolved", years: "50+" },
  { from: "Dark Energy", to: "Cosmology", status: "Partial", years: "25+" },
  { from: "Standard Model", to: "Beyond SM", status: "Active", years: "50+" },
  { from: "Black Hole Info", to: "Quantum Info", status: "Active", years: "45+" },
  { from: "String Theory", to: "Observations", status: "Unresolved", years: "55+" },
];

export default function ResearchFocusSection() {
  return (
    <section id="research" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-[family-name:var(--font-heading)] text-[var(--ag-text-primary)] mb-4">
            The Missing Links in Physics
          </h2>
          <p className="text-[var(--ag-text-secondary)] max-w-xl mx-auto">
            Anti Gravity helps researchers discover connections between theories that have remained separated for decades.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {connections.map((conn, i) => (
            <Card key={i} variant="default" padding="md">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-sm font-medium text-[var(--ag-text-primary)]">
                  {conn.from}
                </span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--ag-accent)" strokeWidth="2">
                  <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
                </svg>
                <span className="text-sm font-medium text-[var(--ag-text-primary)]">
                  {conn.to}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span
                  className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                    conn.status === "Unresolved"
                      ? "bg-[rgba(239,68,68,0.1)] text-[var(--ag-error)]"
                      : conn.status === "Partial"
                      ? "bg-[rgba(245,158,11,0.1)] text-[var(--ag-warning)]"
                      : "bg-[rgba(45,226,230,0.1)] text-[var(--ag-highlight)]"
                  }`}
                >
                  {conn.status}
                </span>
                <span className="text-xs text-[var(--ag-text-muted)]">
                  {conn.years} years
                </span>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

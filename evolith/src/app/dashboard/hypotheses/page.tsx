"use client";

import { useState } from "react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import RadarChart from "@/components/ui/RadarChart";
import EmptyState from "@/components/ui/EmptyState";
import { discoveryScoreMetrics } from "@/lib/constants";

interface Hypothesis {
  id: string;
  objective: string;
  evidence: string[];
  observed_pattern: string;
  candidate_explanation: string;
  competing_explanations: string[];
  missing_evidence: string[];
  recommended_experiments: string[];
  discovery_score: Record<string, number>;
  reproducibility: {
    model: string;
    prompt_version: string;
    timestamp: string;
  };
}

// Example hypothesis for demo purposes
const exampleHypothesis: Hypothesis = {
  id: "demo-1",
  objective: "Explore connections between Hawking radiation and quantum information preservation",
  evidence: [
    "Hawking (1975): Particle creation near event horizons via quantum field effects",
    "Page (1993): Information should be preserved based on unitarity of quantum mechanics",
    "Maldacena (1997): AdS/CFT correspondence suggests holographic information encoding",
  ],
  observed_pattern:
    "Multiple independent theoretical frameworks converge on the prediction that black hole evaporation must preserve quantum information, yet the precise mechanism remains undefined.",
  candidate_explanation:
    "Information may be encoded in quantum correlations between early and late Hawking radiation quanta, mediated by a non-local transfer mechanism at the Page time.",
  competing_explanations: [
    "Remnant hypothesis: Information is stored in a Planck-scale remnant",
    "Firewall hypothesis: Information is destroyed at the event horizon (AMPS, 2012)",
    "Fuzzball hypothesis: Classical horizons are replaced by string-theoretic microstates",
  ],
  missing_evidence: [
    "No experimental observation of Hawking radiation",
    "No quantum gravity theory to model information transfer mechanism",
    "Page curve has not been directly measured for astrophysical black holes",
  ],
  recommended_experiments: [
    "Analog black hole experiments in Bose-Einstein condensates to detect correlations in emitted phonons",
    "Tabletop quantum gravity simulations using entangled photon pairs",
    "Systematic analysis of holographic entanglement entropy in lattice gauge theory models",
  ],
  discovery_score: {
    novelty: 0.72,
    impact: 0.91,
    evidence: 0.65,
    risk: 0.58,
    confidence: 0.61,
    testability: 0.43,
    consistency: 0.78,
    researchGap: 0.85,
    citationCoverage: 0.69,
  },
  reproducibility: {
    model: "grok-4.5",
    prompt_version: "hypothesis-agent@1.0.0",
    timestamp: new Date().toISOString(),
  },
};

export default function HypothesesPage() {
  const [showExample, setShowExample] = useState(false);
  const [objective, setObjective] = useState("");
  const [assumptions, setAssumptions] = useState("");
  const [constraints, setConstraints] = useState("");
  const [generatedHypothesis, setGeneratedHypothesis] = useState<Hypothesis | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const hypothesis = showExample ? exampleHypothesis : generatedHypothesis;
  
  const handleGenerate = async () => {
    if (!objective.trim() || isLoading) return;
    setIsLoading(true);
    setShowExample(false);
    try {
      const res = await fetch("http://localhost:8000/api/hypothesis/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ objective }),
      });
      if (res.ok) {
        const data = await res.json();
        setGeneratedHypothesis(data);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };
  
  const radarLabels = Object.fromEntries(
    discoveryScoreMetrics.map((m) => [m.key, m.label])
  );

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-[family-name:var(--font-heading)] font-semibold text-[var(--ag-text-primary)] mb-2">
            Hypothesis Generator
          </h1>
          <p className="text-sm text-[var(--ag-text-tertiary)]">
            Generate evidence-backed hypotheses scored across 9 Discovery metrics.
          </p>
        </div>
        <Button variant="secondary" size="sm" onClick={() => setShowExample(!showExample)}>
          {showExample ? "Hide Example" : "Show Example"}
        </Button>
      </div>

      {/* Input Form */}
      <Card variant="elevated" padding="lg">
        <h2 className="text-sm font-semibold text-[var(--ag-text-primary)] mb-4">Research Objective</h2>
        <div className="space-y-4">
          <div>
            <label className="text-xs text-[var(--ag-text-tertiary)] mb-1 block">Objective</label>
            <textarea
              value={objective}
              onChange={(e) => setObjective(e.target.value)}
              placeholder="What do you want to investigate? e.g., 'Explore connections between Hawking radiation and quantum information'"
              rows={2}
              className="w-full px-4 py-3 rounded-[10px] bg-[var(--ag-surface)] border border-[var(--ag-border)] text-sm text-[var(--ag-text-primary)] placeholder:text-[var(--ag-text-muted)] focus:outline-none focus:border-[var(--ag-accent)] transition-colors resize-none"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-[var(--ag-text-tertiary)] mb-1 block">Known Assumptions</label>
              <textarea
                value={assumptions}
                onChange={(e) => setAssumptions(e.target.value)}
                placeholder="One per line"
                rows={3}
                className="w-full px-4 py-3 rounded-[10px] bg-[var(--ag-surface)] border border-[var(--ag-border)] text-sm text-[var(--ag-text-primary)] placeholder:text-[var(--ag-text-muted)] focus:outline-none focus:border-[var(--ag-accent)] transition-colors resize-none"
              />
            </div>
            <div>
              <label className="text-xs text-[var(--ag-text-tertiary)] mb-1 block">Constraints</label>
              <textarea
                value={constraints}
                onChange={(e) => setConstraints(e.target.value)}
                placeholder="One per line"
                rows={3}
                className="w-full px-4 py-3 rounded-[10px] bg-[var(--ag-surface)] border border-[var(--ag-border)] text-sm text-[var(--ag-text-primary)] placeholder:text-[var(--ag-text-muted)] focus:outline-none focus:border-[var(--ag-accent)] transition-colors resize-none"
              />
            </div>
          </div>
          <Button variant="accent" disabled={!objective.trim() || isLoading} onClick={handleGenerate}>
            {isLoading ? "Generating..." : "Generate Hypothesis"}
          </Button>
        </div>
      </Card>

      {/* Hypothesis Result */}
      {hypothesis && (
        <div className="space-y-6 animate-slide-up">
          {/* Discovery Score Radar */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card variant="default" padding="lg" className="lg:col-span-1 flex flex-col items-center">
              <h3 className="text-sm font-semibold text-[var(--ag-text-primary)] mb-4">Discovery Score</h3>
              <RadarChart
                data={hypothesis.discovery_score}
                labels={radarLabels}
                size={260}
              />
            </Card>

            <Card variant="default" padding="lg" className="lg:col-span-2">
              <div className="space-y-4">
                {/* Evidence */}
                <div>
                  <h3 className="text-xs font-semibold text-[var(--ag-text-muted)] uppercase tracking-wider mb-2">
                    Evidence
                  </h3>
                  <ul className="space-y-2">
                    {hypothesis.evidence.map((ev, i) => (
                      <li key={i} className="text-sm text-[var(--ag-text-secondary)] flex items-start gap-2">
                        <Badge variant="verified" className="mt-0.5 flex-shrink-0">Source</Badge>
                        <span>{ev}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Observed Pattern */}
                <div>
                  <h3 className="text-xs font-semibold text-[var(--ag-text-muted)] uppercase tracking-wider mb-2">
                    Observed Pattern
                  </h3>
                  <p className="text-sm text-[var(--ag-text-secondary)] leading-relaxed">
                    {hypothesis.observed_pattern}
                  </p>
                </div>
              </div>
            </Card>
          </div>

          {/* Candidate Explanation */}
          <Card variant="default" padding="lg" className="gradient-border">
            <h3 className="text-xs font-semibold text-[var(--ag-accent)] uppercase tracking-wider mb-2">
              Candidate Explanation
            </h3>
            <p className="text-sm text-[var(--ag-text-primary)] leading-relaxed font-medium">
              {hypothesis.candidate_explanation}
            </p>
          </Card>

          {/* Competing + Missing + Experiments */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card variant="default" padding="md">
              <h3 className="text-xs font-semibold text-[var(--ag-text-muted)] uppercase tracking-wider mb-3">
                Competing Explanations
              </h3>
              <ul className="space-y-2">
                {hypothesis.competing_explanations.map((ce, i) => (
                  <li key={i} className="text-xs text-[var(--ag-text-tertiary)] leading-relaxed">
                    <span className="text-[var(--ag-warning)]">→</span> {ce}
                  </li>
                ))}
              </ul>
            </Card>

            <Card variant="default" padding="md">
              <h3 className="text-xs font-semibold text-[var(--ag-text-muted)] uppercase tracking-wider mb-3">
                Missing Evidence
              </h3>
              <ul className="space-y-2">
                {hypothesis.missing_evidence.map((me, i) => (
                  <li key={i} className="text-xs text-[var(--ag-text-tertiary)] leading-relaxed">
                    <span className="text-[var(--ag-error)]">✕</span> {me}
                  </li>
                ))}
              </ul>
            </Card>

            <Card variant="default" padding="md">
              <h3 className="text-xs font-semibold text-[var(--ag-text-muted)] uppercase tracking-wider mb-3">
                Recommended Experiments
              </h3>
              <ul className="space-y-2">
                {hypothesis.recommended_experiments.map((re, i) => (
                  <li key={i} className="text-xs text-[var(--ag-text-tertiary)] leading-relaxed">
                    <span className="text-[var(--ag-success)]">◉</span> {re}
                  </li>
                ))}
              </ul>
            </Card>
          </div>

          {/* Reproducibility Badge */}
          <Card variant="default" padding="sm" className="inline-flex items-center gap-4">
            <span className="text-xs text-[var(--ag-text-muted)]">Reproducibility:</span>
            <span className="text-xs font-mono text-[var(--ag-text-tertiary)]">
              model={hypothesis.reproducibility.model}
            </span>
            <span className="text-xs font-mono text-[var(--ag-text-tertiary)]">
              prompt={hypothesis.reproducibility.prompt_version}
            </span>
            <span className="text-xs font-mono text-[var(--ag-text-tertiary)]">
              ts={new Date(hypothesis.reproducibility.timestamp).toLocaleDateString()}
            </span>
          </Card>
        </div>
      )}

      {/* Empty state when no hypothesis */}
      {!hypothesis && (
        <EmptyState
          icon={
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
              <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
            </svg>
          }
          title="No hypotheses generated"
          description="Enter a research objective above and click Generate Hypothesis. Or click 'Show Example' to see the Discovery Score in action."
        />
      )}
    </div>
  );
}

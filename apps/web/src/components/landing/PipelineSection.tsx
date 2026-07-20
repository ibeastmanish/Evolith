"use client";

const steps = [
  {
    number: "01",
    title: "Import Papers",
    description: "Import from arXiv, DOI, URL, or drag-and-drop PDFs. The Extraction Agent parses authors, equations, references, and datasets.",
    color: "var(--ag-accent)",
  },
  {
    number: "02",
    title: "Build Knowledge",
    description: "Papers are chunked and embedded into the RAG pipeline. The Knowledge Graph Agent maps concepts using the physics ontology.",
    color: "var(--ag-highlight)",
  },
  {
    number: "03",
    title: "Retrieve & Reason",
    description: "Ask questions in Research Mode or Discovery Mode. The Reasoning Agent retrieves relevant chunks and grounds every answer in evidence.",
    color: "var(--ag-accent)",
  },
  {
    number: "04",
    title: "Generate Hypotheses",
    description: "The Hypothesis Agent proposes explanations following the scientific method: evidence → pattern → explanation → alternatives → gaps.",
    color: "var(--ag-highlight)",
  },
  {
    number: "05",
    title: "Verify & Score",
    description: "Every hypothesis is cross-checked against multiple sources and scored across 9 Discovery metrics with full reproducibility metadata.",
    color: "var(--ag-accent)",
  },
];

export default function PipelineSection() {
  return (
    <section id="pipeline" className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-[family-name:var(--font-heading)] text-[var(--ag-text-primary)] mb-4">
            How It Works
          </h2>
          <p className="text-[var(--ag-text-secondary)] max-w-xl mx-auto">
            A five-stage research pipeline powered by specialized AI agents.
          </p>
        </div>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-[var(--ag-accent)] via-[var(--ag-highlight)] to-[var(--ag-accent)] opacity-30" />

          <div className="space-y-12">
            {steps.map((step, i) => (
              <div key={i} className="relative pl-16 group">
                {/* Circle */}
                <div
                  className="absolute left-3 w-7 h-7 rounded-full border-2 flex items-center justify-center text-xs font-bold font-[family-name:var(--font-mono)] transition-all duration-300 group-hover:scale-110"
                  style={{
                    borderColor: step.color,
                    color: step.color,
                    background: "var(--ag-background)",
                  }}
                >
                  {step.number}
                </div>

                <div className="card-elevated p-6 rounded-[16px] transition-all duration-300 group-hover:border-[var(--ag-border-hover)]">
                  <h3
                    className="font-[family-name:var(--font-heading)] text-base font-semibold mb-2"
                    style={{ color: step.color }}
                  >
                    {step.title}
                  </h3>
                  <p className="text-sm text-[var(--ag-text-tertiary)] leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

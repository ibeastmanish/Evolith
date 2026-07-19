"use client";

import { useState } from "react";

const faqs = [
  {
    question: "What makes Anti Gravity different from ChatGPT or other AI tools?",
    answer:
      "Anti Gravity is not a chatbot. It's a structured research environment with specialized AI agents, a physics ontology, and a retrieval-augmented pipeline. Every AI output includes sources, confidence scores, alternative interpretations, and limitations. The AI is a tool, not an authority — it presents evidence and lets researchers reason.",
  },
  {
    question: "How does Anti Gravity prevent AI hallucinations?",
    answer:
      "Three layers: (1) RAG — every answer is grounded in retrieved paper chunks, not model memory. (2) Verification — claims are cross-checked against arXiv, Semantic Scholar, and CrossRef. (3) Provenance — every fact carries a full trace: paper → section → paragraph → equation → confidence → extraction timestamp.",
  },
  {
    question: "What is the Discovery Score?",
    answer:
      "Every generated hypothesis is scored across 9 metrics: Novelty, Impact, Evidence, Risk, Confidence, Testability, Consistency, Research Gap, and Citation Coverage. Each metric is computed algorithmically and displayed as a radar chart, giving researchers an instant assessment of a hypothesis's strength.",
  },
  {
    question: "What's the difference between Research Mode and Discovery Mode?",
    answer:
      "Research Mode only returns claims backed by existing literature (≥0.7 confidence). Discovery Mode proposes speculative connections and is clearly labeled as exploratory. Users always know whether they're reading established science or exploratory ideas.",
  },
  {
    question: "Is Anti Gravity open source?",
    answer:
      "Yes. Every algorithm, prompt, and ontology decision is transparent and reproducible. Anti Gravity is built on the principle that scientific tools should be open and auditable.",
  },
  {
    question: "What papers can I import?",
    answer:
      "You can import papers via arXiv ID, DOI, direct URL, or PDF upload. The Extraction Agent parses authors, abstracts, references, equations, figures, variables, and datasets from each paper.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="py-24 px-6">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-[family-name:var(--font-heading)] text-[var(--ag-text-primary)] mb-4">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="card overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full text-left p-5 flex items-start justify-between gap-4 hover:bg-[var(--ag-surface-hover)] transition-colors"
                aria-expanded={openIndex === i}
              >
                <span className="font-medium text-sm text-[var(--ag-text-primary)]">
                  {faq.question}
                </span>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="var(--ag-text-tertiary)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={`flex-shrink-0 transition-transform duration-200 ${
                    openIndex === i ? "rotate-180" : ""
                  }`}
                >
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === i ? "max-h-96" : "max-h-0"
                }`}
              >
                <p className="px-5 pb-5 text-sm text-[var(--ag-text-tertiary)] leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

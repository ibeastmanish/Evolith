"use client";

import { useState } from "react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import EmptyState from "@/components/ui/EmptyState";

interface Paper {
  id: string;
  title: string;
  authors: string[];
  source: string;
  status: "importing" | "extracting" | "indexed" | "error";
  abstract?: string;
  importedAt: string;
}

export default function PapersPage() {
  const [papers] = useState<Paper[]>([]);
  const [importInput, setImportInput] = useState("");
  const [importType, setImportType] = useState<"arxiv" | "doi" | "url">("arxiv");

  const handleImport = async () => {
    if (!importInput.trim()) return;
    // TODO: Wire to backend POST /api/papers/import
    alert(`Import ${importType}: ${importInput} — Backend not connected yet`);
    setImportInput("");
  };

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-[family-name:var(--font-heading)] font-semibold text-[var(--ag-text-primary)] mb-2">
          Paper Library
        </h1>
        <p className="text-sm text-[var(--ag-text-tertiary)]">
          Import and manage your research papers. The Extraction Agent will parse metadata, equations, and references.
        </p>
      </div>

      {/* Import Panel */}
      <Card variant="elevated" padding="lg">
        <h2 className="text-sm font-semibold text-[var(--ag-text-primary)] mb-4">Import Paper</h2>
        
        {/* Source type selector */}
        <div className="flex gap-2 mb-4">
          {(["arxiv", "doi", "url"] as const).map((type) => (
            <button
              key={type}
              onClick={() => setImportType(type)}
              className={`px-3 py-1.5 rounded-[8px] text-xs font-medium transition-all ${
                importType === type
                  ? "bg-[var(--ag-accent)] bg-opacity-15 text-[var(--ag-accent)] border border-[var(--ag-accent)] border-opacity-30"
                  : "bg-[var(--ag-surface)] text-[var(--ag-text-tertiary)] border border-[var(--ag-border)] hover:border-[var(--ag-border-hover)]"
              }`}
            >
              {type === "arxiv" ? "arXiv ID" : type === "doi" ? "DOI" : "URL"}
            </button>
          ))}
        </div>

        {/* Input */}
        <div className="flex gap-3">
          <input
            type="text"
            value={importInput}
            onChange={(e) => setImportInput(e.target.value)}
            placeholder={
              importType === "arxiv"
                ? "e.g., 2301.08243"
                : importType === "doi"
                ? "e.g., 10.1038/nature12373"
                : "e.g., https://arxiv.org/abs/2301.08243"
            }
            className="flex-1 px-4 py-2.5 rounded-[10px] bg-[var(--ag-surface)] border border-[var(--ag-border)] text-sm text-[var(--ag-text-primary)] placeholder:text-[var(--ag-text-muted)] focus:outline-none focus:border-[var(--ag-accent)] transition-colors"
            onKeyDown={(e) => e.key === "Enter" && handleImport()}
          />
          <Button variant="accent" onClick={handleImport}>
            Import
          </Button>
        </div>

        <p className="text-xs text-[var(--ag-text-muted)] mt-3">
          Papers are chunked, embedded, and indexed into the RAG pipeline for retrieval-augmented reasoning.
        </p>
      </Card>

      {/* Paper List */}
      {papers.length === 0 ? (
        <EmptyState
          icon={
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" />
              <path d="M14 2v6h6" />
            </svg>
          }
          title="No papers imported"
          description="Import your first paper to start building the knowledge graph. Use an arXiv ID, DOI, or direct URL."
          action={
            <Button variant="secondary" size="sm" onClick={() => document.querySelector("input")?.focus()}>
              Import Your First Paper
            </Button>
          }
        />
      ) : (
        <div className="space-y-3">
          {papers.map((paper) => (
            <Card key={paper.id} variant="interactive" padding="md">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-semibold text-[var(--ag-text-primary)] truncate">
                    {paper.title}
                  </h3>
                  <p className="text-xs text-[var(--ag-text-tertiary)] mt-1">
                    {paper.authors.join(", ")}
                  </p>
                </div>
                <Badge
                  variant={
                    paper.status === "indexed"
                      ? "verified"
                      : paper.status === "error"
                      ? "contradicted"
                      : "default"
                  }
                >
                  {paper.status}
                </Badge>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

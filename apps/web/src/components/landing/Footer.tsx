import { SITE_CONFIG } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="border-t border-[var(--ag-border)] py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-lg gradient-accent flex items-center justify-center font-bold text-sm text-white">
                AG
              </div>
              <span className="font-[family-name:var(--font-heading)] font-semibold text-lg text-[var(--ag-text-primary)]">
                {SITE_CONFIG.name}
              </span>
            </div>
            <p className="text-sm text-[var(--ag-text-tertiary)] leading-relaxed">
              {SITE_CONFIG.tagline}
            </p>
          </div>

          {/* Platform */}
          <div>
            <h4 className="text-sm font-semibold text-[var(--ag-text-primary)] mb-4">Platform</h4>
            <ul className="space-y-2">
              <li><a href="/dashboard" className="text-sm text-[var(--ag-text-tertiary)] hover:text-[var(--ag-text-secondary)] transition-colors">Dashboard</a></li>
              <li><a href="/dashboard/papers" className="text-sm text-[var(--ag-text-tertiary)] hover:text-[var(--ag-text-secondary)] transition-colors">Paper Import</a></li>
              <li><a href="/dashboard/graph" className="text-sm text-[var(--ag-text-tertiary)] hover:text-[var(--ag-text-secondary)] transition-colors">Knowledge Graph</a></li>
              <li><a href="/dashboard/hypotheses" className="text-sm text-[var(--ag-text-tertiary)] hover:text-[var(--ag-text-secondary)] transition-colors">Hypotheses</a></li>
            </ul>
          </div>

          {/* Research */}
          <div>
            <h4 className="text-sm font-semibold text-[var(--ag-text-primary)] mb-4">Research</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-sm text-[var(--ag-text-tertiary)] hover:text-[var(--ag-text-secondary)] transition-colors">Documentation</a></li>
              <li><a href="#" className="text-sm text-[var(--ag-text-tertiary)] hover:text-[var(--ag-text-secondary)] transition-colors">Physics Ontology</a></li>
              <li><a href="#" className="text-sm text-[var(--ag-text-tertiary)] hover:text-[var(--ag-text-secondary)] transition-colors">Architecture</a></li>
              <li><a href="#" className="text-sm text-[var(--ag-text-tertiary)] hover:text-[var(--ag-text-secondary)] transition-colors">Evaluation</a></li>
            </ul>
          </div>

          {/* Community */}
          <div>
            <h4 className="text-sm font-semibold text-[var(--ag-text-primary)] mb-4">Community</h4>
            <ul className="space-y-2">
              <li><a href={SITE_CONFIG.github} target="_blank" rel="noopener noreferrer" className="text-sm text-[var(--ag-text-tertiary)] hover:text-[var(--ag-text-secondary)] transition-colors">GitHub</a></li>
              <li><a href="#" className="text-sm text-[var(--ag-text-tertiary)] hover:text-[var(--ag-text-secondary)] transition-colors">Contributing</a></li>
              <li><a href="#" className="text-sm text-[var(--ag-text-tertiary)] hover:text-[var(--ag-text-secondary)] transition-colors">License</a></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-[var(--ag-border)] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[var(--ag-text-muted)]">
            © {new Date().getFullYear()} {SITE_CONFIG.name}. Open source under MIT License.
          </p>
          <p className="text-xs text-[var(--ag-text-muted)]">
            Built for researchers, by researchers.
          </p>
        </div>
      </div>
    </footer>
  );
}

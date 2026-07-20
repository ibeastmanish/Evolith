"use client";

import { useEffect, useMemo } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";
import TopNav from "@/components/observatory/TopNav";
import CommandPalette from "@/components/ui/CommandPalette";
import InvestigationHeader from "@/components/workspace/InvestigationHeader";
import ViewTabs from "@/components/workspace/ViewTabs";
import TimeMachine from "@/components/workspace/TimeMachine";
import ResearchPartner from "@/components/workspace/ResearchPartner";
import { useStore } from "@/store/useStore";
import { getNode, getGraphData, getNodesAtYear, getEdgesAtYear } from "@/lib/mock-data";

/* Dynamically import the graph (uses canvas, must be client-only) */
const KnowledgeUniverse = dynamic(
  () => import("@/components/workspace/KnowledgeUniverse"),
  { ssr: false }
);

export default function InvestigationPage() {
  const params = useParams();
  const topicId = typeof params.topic === "string" ? params.topic : "";

  const {
    setCurrentTopic,
    setGraphData,
    activeView,
    currentYear,
    partnerOpen,
  } = useStore();

  const topicNode = useMemo(() => getNode(topicId), [topicId]);

  /* Load graph data & set topic */
  useEffect(() => {
    setCurrentTopic(topicId);
    const { nodes, edges } = getGraphData();
    setGraphData({ nodes, edges });
  }, [topicId, setCurrentTopic, setGraphData]);

  /* Filter graph by current year for time machine */
  const visibleData = useMemo(() => {
    const nodes = getNodesAtYear(currentYear);
    const edges = getEdgesAtYear(currentYear);
    return { nodes, edges };
  }, [currentYear]);

  if (!topicNode) {
    return (
      <main className="min-h-screen bg-[var(--ev-background)] flex items-center justify-center">
        <CommandPalette />
        <TopNav />
        <div className="text-center ev-fade-in">
          <div className="text-6xl mb-6">🔭</div>
          <h1 className="text-2xl font-semibold text-[var(--ev-text)] mb-2">
            This branch of knowledge has not yet been mapped
          </h1>
          <p className="text-sm text-[var(--ev-text-tertiary)] mb-6">
            Become the first contributor to chart this territory.
          </p>
          <Link
            href="/"
            className="text-sm text-[var(--ev-accent)] hover:text-[var(--ev-accent-hover)] transition-colors"
          >
            ← Return to Observatory
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[var(--ev-background)]">
      <CommandPalette />
      <TopNav />

      <div className="pt-[72px] flex flex-col h-screen">
        {/* Investigation Header */}
        <InvestigationHeader node={topicNode} />

        {/* View Tabs */}
        <ViewTabs />

        {/* Main Content Area */}
        <div className="flex-1 flex overflow-hidden">
          {/* Canvas Area */}
          <div className="flex-1 relative">
            <AnimatePresence mode="wait">
              {activeView === "universe" && (
                <motion.div
                  key="universe"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="absolute inset-0"
                >
                  <KnowledgeUniverse
                    data={visibleData}
                  />
                </motion.div>
              )}
              {activeView === "timemachine" && (
                <motion.div
                  key="timemachine"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="absolute inset-0 flex flex-col"
                >
                  <div className="flex-1">
                    <KnowledgeUniverse
                      data={visibleData}
                    />
                  </div>
                </motion.div>
              )}
              {activeView === "papers" && (
                <motion.div
                  key="papers"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="absolute inset-0 overflow-y-auto p-6"
                >
                  <PapersView />
                </motion.div>
              )}
              {activeView === "tree" && (
                <motion.div
                  key="tree"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <div className="text-center">
                    <div className="text-4xl mb-4">🌳</div>
                    <p className="text-sm text-[var(--ev-text-tertiary)]">Evolution Tree view coming soon</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Research Partner */}
          <AnimatePresence>
            {partnerOpen && (
              <motion.div
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: 380, opacity: 1 }}
                exit={{ width: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="overflow-hidden border-l border-[var(--ev-border)]"
              >
                <ResearchPartner topicNode={topicNode} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Time Machine Bar (always visible in relevant views) */}
        {(activeView === "universe" || activeView === "timemachine") && (
          <TimeMachine />
        )}
      </div>
    </main>
  );
}

/* ── Papers View ── */
function PapersView() {
  const { graphData } = useStore();
  const papers = graphData.nodes.filter((n) => n.type === "paper");

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {papers.map((paper) => (
        <div
          key={paper.id}
          className="ev-surface-card p-5 cursor-pointer"
        >
          <div className="ev-badge ev-badge-paper mb-3">Paper</div>
          <h3 className="text-sm font-semibold text-[var(--ev-text)] mb-1.5 line-clamp-2">
            {paper.label}
          </h3>
          <p className="text-xs text-[var(--ev-text-tertiary)] mb-3 line-clamp-2">{paper.description}</p>
          <div className="flex items-center justify-between text-[11px] text-[var(--ev-text-muted)]">
            <span>{paper.creator}</span>
            <span style={{ fontFamily: "var(--font-numbers)" }}>
              {paper.year} · {(paper.citationCount ?? 0).toLocaleString()} citations
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

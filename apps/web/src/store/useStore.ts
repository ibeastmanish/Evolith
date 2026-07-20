import { create } from "zustand";
import type { KnowledgeNode, KnowledgeEdge } from "@/lib/mock-data";
import type { KnowledgeLayer } from "@/lib/constants";

/* ── Types ── */

export type ActiveView = "universe" | "timemachine" | "tree" | "papers" | "parallel";

export interface EvolithState {
  /* ── Investigation ── */
  currentTopic: string | null;
  setCurrentTopic: (topic: string | null) => void;

  /* ── Knowledge Universe ── */
  graphData: { nodes: KnowledgeNode[]; edges: KnowledgeEdge[] };
  setGraphData: (data: { nodes: KnowledgeNode[]; edges: KnowledgeEdge[] }) => void;
  appendGraphData: (data: { nodes: KnowledgeNode[]; edges: KnowledgeEdge[] }) => void;

  selectedNodeId: string | null;
  setSelectedNodeId: (id: string | null) => void;

  hoveredNodeId: string | null;
  setHoveredNodeId: (id: string | null) => void;

  hoveredEdge: { source: string; target: string } | null;
  setHoveredEdge: (edge: { source: string; target: string } | null) => void;

  activeLayers: Set<KnowledgeLayer>;
  toggleLayer: (layer: KnowledgeLayer) => void;

  /* ── Time Machine ── */
  currentYear: number;
  setCurrentYear: (year: number) => void;

  isPlaying: boolean;
  setIsPlaying: (playing: boolean) => void;

  playbackSpeed: number;
  setPlaybackSpeed: (speed: number) => void;

  /* ── Views ── */
  activeView: ActiveView;
  setActiveView: (view: ActiveView) => void;

  /* ── Research Partner ── */
  partnerOpen: boolean;
  setPartnerOpen: (open: boolean) => void;
  togglePartner: () => void;

  /* ── Command Palette ── */
  commandPaletteOpen: boolean;
  setCommandPaletteOpen: (open: boolean) => void;

  /* ── Knowledge Replay ── */
  replayActive: boolean;
  setReplayActive: (active: boolean) => void;
}

export const useStore = create<EvolithState>((set) => ({
  /* ── Investigation ── */
  currentTopic: null,
  setCurrentTopic: (topic) => set({ currentTopic: topic }),

  /* ── Knowledge Universe ── */
  graphData: { nodes: [], edges: [] },
  setGraphData: (data) => set({ graphData: data }),
  appendGraphData: (newData) =>
    set((state) => {
      const existingNodeIds = new Set(state.graphData.nodes.map((n) => n.id));
      const newNodes = newData.nodes.filter((n) => !existingNodeIds.has(n.id));

      const getEdgeKey = (e: KnowledgeEdge) => `${e.source}-${e.target}-${e.type}`;
      const existingEdgeKeys = new Set(state.graphData.edges.map(getEdgeKey));
      const newEdges = newData.edges.filter((e) => !existingEdgeKeys.has(getEdgeKey(e)));

      return {
        graphData: {
          nodes: [...state.graphData.nodes, ...newNodes],
          edges: [...state.graphData.edges, ...newEdges],
        },
      };
    }),

  selectedNodeId: null,
  setSelectedNodeId: (id) => set({ selectedNodeId: id }),

  hoveredNodeId: null,
  setHoveredNodeId: (id) => set({ hoveredNodeId: id }),

  hoveredEdge: null,
  setHoveredEdge: (edge) => set({ hoveredEdge: edge }),

  activeLayers: new Set<KnowledgeLayer>(["research", "industry", "people"]),
  toggleLayer: (layer) =>
    set((state) => {
      const next = new Set(state.activeLayers);
      if (next.has(layer)) {
        next.delete(layer);
      } else {
        next.add(layer);
      }
      return { activeLayers: next };
    }),

  /* ── Time Machine ── */
  currentYear: 2026,
  setCurrentYear: (year) => set({ currentYear: year }),

  isPlaying: false,
  setIsPlaying: (playing) => set({ isPlaying: playing }),

  playbackSpeed: 1,
  setPlaybackSpeed: (speed) => set({ playbackSpeed: speed }),

  /* ── Views ── */
  activeView: "universe",
  setActiveView: (view) => set({ activeView: view }),

  /* ── Research Partner ── */
  partnerOpen: false,
  setPartnerOpen: (open) => set({ partnerOpen: open }),
  togglePartner: () => set((state) => ({ partnerOpen: !state.partnerOpen })),

  /* ── Command Palette ── */
  commandPaletteOpen: false,
  setCommandPaletteOpen: (open) => set({ commandPaletteOpen: open }),

  /* ── Knowledge Replay ── */
  replayActive: false,
  setReplayActive: (active) => set({ replayActive: active }),
}));

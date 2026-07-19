/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from 'zustand';

type SelectedEntity = { type: 'node' | 'edge'; data: any } | null;

interface GraphState {
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  selectedEntity: SelectedEntity;
  setSelectedEntity: (entity: SelectedEntity) => void;
  yearFilter: number;
  setYearFilter: (year: number) => void;
  graphData: { nodes: any[]; edges: any[] };
  setGraphData: (data: { nodes: any[]; edges: any[] }) => void;
  appendGraphData: (data: { nodes: any[]; edges: any[] }) => void;
}

export const useStore = create<GraphState>((set) => ({
  searchQuery: '',
  setSearchQuery: (q) => set({ searchQuery: q }),
  selectedEntity: null,
  setSelectedEntity: (entity) => set({ selectedEntity: entity }),
  yearFilter: 2026,
  setYearFilter: (year) => set({ yearFilter: year }),
  graphData: { nodes: [], edges: [] },
  setGraphData: (data) => set({ graphData: data }),
  appendGraphData: (newData) => set((state) => {
    const existingNodeIds = new Set(state.graphData.nodes.map(n => n.id));
    const newNodes = newData.nodes.filter((n: any) => !existingNodeIds.has(n.id));
    
    // For react-force-graph, source and target can become object references. 
    // We get string IDs if it hasn't been parsed yet, or object.id if it has.
    const getEdgeId = (e: any) => {
      const src = typeof e.source === 'object' ? e.source.id : e.source;
      const tgt = typeof e.target === 'object' ? e.target.id : e.target;
      return `${src}-${tgt}-${e.type}`;
    };
    
    const existingEdgeIds = new Set(state.graphData.edges.map(e => getEdgeId(e)));
    const newEdges = newData.edges.filter((e: any) => !existingEdgeIds.has(getEdgeId(e)));
    
    return {
      graphData: {
        nodes: [...state.graphData.nodes, ...newNodes],
        edges: [...state.graphData.edges, ...newEdges]
      }
    };
  })
}));

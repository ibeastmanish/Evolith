/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useRef, useEffect, useState, useCallback } from 'react';
import dynamic from 'next/dynamic';
import { useStore } from '../store/useStore';

// Dynamically import react-force-graph to avoid SSR window errors
const ForceGraph2D = dynamic(() => import('react-force-graph-2d'), { ssr: false });

export default function GraphCanvas() {
  const fgRef = useRef<any>(null);
  const { graphData, appendGraphData, setSelectedEntity } = useStore();
  const [dimensions, setDimensions] = useState({ 
    width: typeof window !== 'undefined' ? window.innerWidth : 800, 
    height: typeof window !== 'undefined' ? window.innerHeight : 600 
  });

  useEffect(() => {
    const handleResize = () => setDimensions({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleNodeClick = useCallback(async (node: any) => {
    setSelectedEntity({ type: 'node', data: node });
    
    // Lazy Expansion
    try {
      const res = await fetch(`http://localhost:8000/api/graph/neighbors/${encodeURIComponent(node.id)}`);
      const data = await res.json();
      if (data.nodes && data.edges) {
        appendGraphData(data);
      }
    } catch (e) {
      console.error("Failed to load neighbors", e);
    }
    
    if (fgRef.current) {
      fgRef.current.centerAt(node.x, node.y, 1000);
      fgRef.current.zoom(2, 1000);
    }
  }, [appendGraphData, setSelectedEntity]);

  const handleLinkClick = useCallback((link: any) => {
    setSelectedEntity({ type: 'edge', data: link });
  }, [setSelectedEntity]);

  return (
    <div className="absolute inset-0 z-0 bg-neutral-950">
      <ForceGraph2D
        ref={fgRef}
        width={dimensions.width}
        height={dimensions.height}
        graphData={{ nodes: graphData.nodes, links: graphData.edges }}
        nodeLabel="id"
        nodeColor={(node: any) => node.group === 'center' ? '#3b82f6' : '#60a5fa'}
        nodeRelSize={6}
        linkColor={() => 'rgba(255,255,255,0.15)'}
        linkDirectionalArrowLength={3.5}
        linkDirectionalArrowRelPos={1}
        onNodeClick={handleNodeClick}
        onLinkClick={handleLinkClick}
        backgroundColor="#0a0a0a"
      />
    </div>
  );
}

/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useRef, useMemo } from "react";
import * as PIXI from "pixi.js";
import * as d3 from "d3-force";
import { useStore } from "@/store/useStore";
import { nodeColors, edgeColors, type EdgeType } from "@/lib/constants";

interface KnowledgeUniverseProps {
  data: { nodes: any[]; edges: any[] };
}

export default function KnowledgeUniverse({ data }: KnowledgeUniverseProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const appRef = useRef<PIXI.Application | null>(null);
  const simulationRef = useRef<any>(null);

  const { activeLayers } = useStore();

  const graphData = useMemo(() => {
    const activeLayerSet = activeLayers;
    const filteredNodes = data.nodes.filter((n) =>
      n.layers?.some((l: any) => activeLayerSet.has(l))
    );
    const filteredNodeIds = new Set(filteredNodes.map((n) => n.id));
    const filteredEdges = data.edges.filter(
      (e) => filteredNodeIds.has(e.source) && filteredNodeIds.has(e.target)
    );
    
    // Deep copy for D3
    return {
      nodes: filteredNodes.map(n => ({ ...n })),
      links: filteredEdges.map(e => ({ ...e }))
    };
  }, [data, activeLayers]);

  useEffect(() => {
    if (!containerRef.current) return;

    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;

    // 1. Setup Pixi Application
    const app = new PIXI.Application();
    
    // In Pixi v8, init is async
    (async () => {
      await app.init({
        width,
        height,
        backgroundColor: 0x000000,
        backgroundAlpha: 0,
        resolution: window.devicePixelRatio || 1,
        autoDensity: true,
        antialias: true
      });
      
      if (!containerRef.current) return;
      containerRef.current.appendChild(app.canvas);
      appRef.current = app;

      // Viewport container for panning/zooming
      const viewport = new PIXI.Container();
      viewport.position.set(width / 2, height / 2); // Center Origin
      app.stage.addChild(viewport);

      // Graphics layers
      const linkGraphics = new PIXI.Graphics();
      const nodeContainer = new PIXI.Container();
      viewport.addChild(linkGraphics);
      viewport.addChild(nodeContainer);

      // 2. Setup D3 Force Simulation
      const simulation = d3.forceSimulation(graphData.nodes as any)
        .force("link", d3.forceLink(graphData.links).id((d: any) => d.id).distance(100))
        .force("charge", d3.forceManyBody().strength(-300))
        .force("center", d3.forceCenter(0, 0))
        .force("collide", d3.forceCollide().radius(20));
        
      simulationRef.current = simulation;

      // Create Pixi objects for nodes
      const nodeSprites = new Map<string, PIXI.Graphics>();
      graphData.nodes.forEach((node: any) => {
        const gfx = new PIXI.Graphics();
        const color = new PIXI.Color(nodeColors[node.type as keyof typeof nodeColors] || "#4F8CFF").toNumber();
        
        // Pixi v8 drawing API
        gfx.circle(0, 0, 8)
           .fill({ color, alpha: 0.2 })
           .stroke({ width: 1, color, alpha: 0.8 });
        
        // Basic Label
        const text = new PIXI.Text({
          text: node.label || node.id, 
          style: {
            fontFamily: 'Inter',
            fontSize: 10,
            fill: 0xD1D5DB,
            align: 'center'
          }
        });
        text.anchor.set(0.5, -1);
        gfx.addChild(text);
        
        nodeSprites.set(node.id, gfx);
        nodeContainer.addChild(gfx);
      });

      // 3. Tick Event
      simulation.on("tick", () => {
        // Draw links
        linkGraphics.clear();
        graphData.links.forEach((link: any) => {
          const color = new PIXI.Color(edgeColors[link.type as EdgeType] || "#4B5563").toNumber();
          linkGraphics.moveTo(link.source.x, link.source.y)
                      .lineTo(link.target.x, link.target.y)
                      .stroke({ width: 1.5, color, alpha: 0.4 });
        });

        // Update node positions
        graphData.nodes.forEach((node: any) => {
          const sprite = nodeSprites.get(node.id);
          if (sprite) {
            sprite.x = node.x;
            sprite.y = node.y;
          }
        });
      });

      // Basic Panning
      let dragging = false;
      let lastPos = { x: 0, y: 0 };
      
      const onPointerDown = (e: any) => { dragging = true; lastPos = { x: e.clientX, y: e.clientY }; };
      const onPointerUp = () => { dragging = false; };
      const onPointerMove = (e: any) => {
        if (dragging) {
          viewport.x += e.clientX - lastPos.x;
          viewport.y += e.clientY - lastPos.y;
          lastPos = { x: e.clientX, y: e.clientY };
        }
      };
      
      app.canvas.addEventListener?.('pointerdown', onPointerDown);
      window.addEventListener('pointerup', onPointerUp);
      window.addEventListener('pointermove', onPointerMove);

      return () => {
        simulation.stop();
        app.destroy(true, { children: true });
        window.removeEventListener('pointerup', onPointerUp);
        window.removeEventListener('pointermove', onPointerMove);
      };
    })();
  }, [graphData]);

  return <div ref={containerRef} className="w-full h-full relative" />;
}

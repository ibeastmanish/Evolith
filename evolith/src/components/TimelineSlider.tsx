"use client";
import React from 'react';
import { useStore } from '../store/useStore';

export default function TimelineSlider() {
  const { yearFilter, setYearFilter } = useStore();

  return (
    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-full max-w-2xl bg-neutral-900/80 backdrop-blur-xl p-5 rounded-2xl border border-neutral-800 shadow-2xl z-10 flex items-center gap-6">
      <span className="text-sm font-mono text-neutral-500">1990</span>
      <input 
        type="range" 
        min="1990" 
        max="2026" 
        value={yearFilter}
        onChange={(e) => setYearFilter(parseInt(e.target.value))}
        className="flex-1 accent-blue-500 h-1.5 bg-neutral-800 rounded-lg appearance-none cursor-pointer"
      />
      <div className="flex flex-col items-center w-16">
        <span className="text-2xl font-bold text-white font-mono">{yearFilter}</span>
      </div>
    </div>
  );
}

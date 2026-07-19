"use client";
import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { useStore } from '../store/useStore';

export default function TopBar() {
  const [query, setQuery] = useState('');
  const { setGraphData } = useStore();

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query) return;
    
    try {
      const res = await fetch(`http://localhost:8000/api/graph/neighbors/${encodeURIComponent(query)}`);
      const data = await res.json();
      if (data.nodes && data.edges) {
        setGraphData(data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="absolute top-6 left-6 z-10 flex gap-4 items-center pointer-events-none">
      <div className="bg-neutral-900/90 backdrop-blur-xl px-6 py-3 rounded-2xl border border-neutral-800 shadow-2xl pointer-events-auto">
        <h1 className="text-lg font-bold bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent tracking-tight">Evolith</h1>
      </div>
      
      <form onSubmit={handleSearch} className="relative pointer-events-auto">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500" size={18} />
        <input 
          type="text" 
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for a technology..." 
          className="bg-neutral-900/90 backdrop-blur-xl border border-neutral-800 text-white pl-11 pr-4 py-3 rounded-2xl w-80 shadow-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all placeholder:text-neutral-600 text-sm"
        />
      </form>
    </div>
  );
}
